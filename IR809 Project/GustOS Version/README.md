## Running Python App on IR809 GuestOS:

#### After having some issues with Containers on IR809 we decided to run the code directly on the Guest-OS.

### 1- Python Script: 
#### The major change in the python script, is that we don't need ssh connection anymore to get gyroscope-data using the command "show platform gyroscope-data", because we are getting this data directly from /dev/ttyS3.

### 2- GuestOS: 
#### Next step is to run the Python script as a service on startup, which can be done as the following:

        $ crontab -e
        @reboot sleep 120 && python /home/cisco/myscript.py &

##### save and reboot. (Notice that we used a sleep time of two minutes, because the script is not going to start until the network is ready)
##### check running processes: 
       $ ps -ef | grep py 
##### and your script should be running in the background.