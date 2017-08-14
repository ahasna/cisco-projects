# This is another version of the python script that reads the gyroscope data from IR809 and sends it over MQTT to the dashboard.
# After having some issues with running containers on the IR809, we decided to go this. More details can be found here: https://git.adt-emear.net/ahasna/ir809-gyroscope/blob/gos-no-ssh/

import paho.mqtt.client as paho
import time
import paho.mqtt.publish as publish
import json
import math

# Functions to test the MQTT connection from the CLI
def on_publish(client, userdata, mid):
    print("mid: "+str(mid))

def on_subscribe(mosq, obj, mid, granted_qos):
    print("Subscribed: " + str(mid) + " " + str(granted_qos))

def on_log(mosq, obj, level, string):
    print(string)

def on_message(mosq, obj, msg):
    print(msg.topic + " " + str(msg.qos) + " " + str(msg.payload))

# Defining MQTT connection:
# mqtt_broker = "iot.eclipse.org" # For testing purposes we used this broker.
mqtt_broker = "iotdemo.adt-emear.net" 
mqtt_broker_port = 8080
mqtt_topic = "adt/gyroir809"

client = paho.Client()
# Please make sure to pass the full path to the certificate as an argument for tls_set() method.
client.tls_set("./python/ca-certificates.crt")
client.on_message = on_message
client.on_publish = on_publish
client.on_subscribe = on_subscribe
client.on_log = on_log
client.connect(mqtt_broker,mqtt_broker_port)
client.loop_start()
client.subscribe(mqtt_topic)

# Mathematical variables to calculate the angles to be used in moving the 3D Model on the dashboard.
M_PI = 3.14159265359
angleX = 0 
angleY = 0 

while True:
    # Since this code is running on the GOS we used /dev/ttyS3 to get Gyroscope data from, where the first line in this file in every time we open is the latest reading.
    file = open('/dev/ttyS3','r')
    firstLine = file.readline() # reading the first line from ttyS3
    elementInLine = firstLine.split() # splitting the first line, since it is one string

    
    # Please notice that the index of the gyroscope values is different when we get Gyroscope data from ttyS3 that when we get from the IOS using the command "show platform gyroscope-data"
    GX = float(elementInLine[1])
    GY = float(elementInLine[2])
    GZ = float(elementInLine[3])
    XLX = float(elementInLine[4])
    XLY = float(elementInLine[5])
    XLZ = float(elementInLine[6])
        
    # The process of transforming the gyroscope data to angles to be used in the dashboard to update the 3d model.
    # For more details refer to: https://robotics.stackexchange.com/questions/6953/how-to-calculate-euler-angles-from-gyroscope-output
    angleX = GX # + angleX
    angleY = GY # + angleY 
    accelAngleX = math.atan2(XLY, XLZ) * 180/M_PI
    accelAngleY = math.atan2(-XLX, math.sqrt(XLY*XLY + XLZ*XLZ) * 180/M_PI)
    angleX = 0.002*angleX + 0.098*XLX
    angleY = 0.002*angleY + 0.098*XLY
    #angleX = 0.5*angleX + 0.5*XLX
    #angleY = 0.5*angleY + 0.5*XLY
    
    # MQTT message:     
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
 
    # MQTT publish:     
    (rc, mid) = client.publish(mqtt_topic, payload = json.dumps(send_msg), qos = 1)

    #time.sleep(1)


