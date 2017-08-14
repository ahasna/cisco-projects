# This code is to get gyroscope data from Cisco IR809 using ssh and sends it over MQTT to the IoT Dashboard.

# importing needed packages and libraries   
import paramiko
import paho.mqtt.client as paho
import time
import paho.mqtt.publish as publish
import json
import math

# Functions to test the MQTT connection, and view the messages from the CLI
def on_publish(client, userdata, mid):
	print("mid: "+str(mid))

def on_subscribe(mosq, obj, mid, granted_qos):
    print("Subscribed: " + str(mid) + " " + str(granted_qos))

def on_log(mosq, obj, level, string):
    print(string)

def on_message(mosq, obj, msg):
    print(msg.topic + " " + str(msg.qos) + " " + str(msg.payload))

# Defining MQTT connection:
mqtt_broker = "iotdemo.adt-emear.net" # For testing purposes we used this broker.
mqtt_broker_port = 8080
mqtt_topic = "adt/gyroir809"

client = paho.Client()
client.on_message = on_message
client.on_publish = on_publish
client.on_subscribe = on_subscribe
client.on_log = on_log
# Please make sure to specify the path to the certificate as an argument for tls_set() method.
client.tls_set("./ca-certificates.crt")
client.connect(mqtt_broker,mqtt_broker_port)
client.loop_start()
client.subscribe(mqtt_topic)

# Defining ssh variables to ssh from the container to the router's IOS: 

sshClient = "your devic's IP address"  
port = 22
userName = 'username'
password = 'password'

# Mathematical variables to calculate the angles to be used in moving the 3D Model on the dashboard.

M_PI = 3.14159265359
angleX = 0 
angleY = 0 

while True:
    # startin ssh connection, it is inside the loop to avoid connection timeout, when trying to get data continuously.
	
	ssh = paramiko.SSHClient()
	ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
	ssh.connect(sshClient, port = port, username = userName, password = password, look_for_keys=False)
	# executing the command of getting gyroscope values over ssh and assigning it to variables. 
	stdin, stdout, stderr = ssh.exec_command('show platform gyroscope')
	# readind the first line of the table of values we get, since it is the latest update at every reading, then decoding it from unicode to string.
	output = stdout.readlines()
	line = output[1].encode('ascii','ignore').strip()
	elementInLine = line.split()
	
	# converting string into float to use the values later in the code to calculate the angle that moves the 3D model in the dashboard.
	# date = (elementInLine[0])
	# time = (elementInLine[1])
	GX = float(elementInLine[2])
	GY = float(elementInLine[3])
	GZ = float(elementInLine[4])
	XLX = float(elementInLine[5])
	XLY = float(elementInLine[6])
	XLZ = float(elementInLine[7])
		
    # The process of transforming the gyroscope data to angles to be used in the dashboard to update the 3d model.
    # For more details refer to: https://robotics.stackexchange.com/questions/6953/how-to-calculate-euler-angles-from-gyroscope-output

	angleX = GX # + angleX
	angleY = GY # + angleY 
	accelAngleX = math.atan2(XLY, XLZ) * 180/M_PI
	accelAngleY = math.atan2(-XLX, math.sqrt(XLY*XLY + XLZ*XLZ) * 180/M_PI)
	angleY = 0.002*angleX + 0.098*XLX # angelY and angelX are flipped to give more sensible 3D view.
	angleX = 0.002*angleY + 0.098*XLY
	#angleX = 0.5*angleX + 0.5*XLX
	#angleY = 0.5*angleY + 0.5*XLY
	
			
	send_msg = {
	"devid":"JMX1951X00E",
	'temp': "undefined",
	"proto": "tcp",
	"rssi": 0,
	"l": 0,
	"h": 0, 
	"b":[False, False], 
	"m":[0,0,0], 
	"g":[0,angleX,angleY], 
	"p":0,
	"o":[0,0,0], 
	"type": "IR809G"
	}
 
	# MQTT message:		
	(rc, mid) = client.publish("adt/gyroir809", payload = json.dumps(send_msg), qos = 1)

	#time.sleep(1)
