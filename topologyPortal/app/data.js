//Topology data array, each topology element is an object.
var topologyData = {
	nodes: [
		{
			id: 0,
			name: "LoRa Sensor",
			type: "Sensor",
			topology_icon:"lora",
			x:-87.51742387157809,
			y:-33.59507071927445

		},
		{
			id: 1,
			name: "Bosch XDK 1",
			type: "Sensor",
			topology_icon:"xdk",
			x:-72.03094056957748,
			y:86.54568014174187
		},
		{
			id: 2,
			name: "RPI Sensor",
			type: "Sensor",
			topology_icon:"rpisensor",
			x: -74.02624299995418,
			y:126.91725762155218
		},
		{
			id: 3,
			name: "LoRa Gateway",
			type: "gateway",
			topology_icon:"wabler",
		    x:-1.9322601680625962,
			y:-3.6215067787083974
		},
		{
			id: 4,
			name: "Smart Plug",
			type: "Actiator",
			topology_icon:"smartplug",
			x:-159.7177602751796,
			y:-79.21326050225245
		}, 
		{ 

			id: 5,
			name: "Actility Cloud",
			type: "Cloud",
			topology_icon:"cld",
			x:91.83790992260847,
			y:-54.41347801623378
		}, 

		{ 
			id: 6,
			name: "ADT IoT Gateway",
			type: "Gateway",
			topology_icon:"gw",
			x: 93,
			y:46
		},		
		{ 
			id: 7,
			name: "CAM",
			type: "Dashboard",
			topology_icon:"cam",
			x:75.10265642146722,
			y:188.21791986829152
		},	
		{ 
			id: 8,
			name: "Real Time Dashboard",
			type: "Dashboard",
			topology_icon:"rtdashboard",
			x: 143,
			y: 190
		},	
		{ 
			id: 9,
			name: "MQTT Broker",
			type: "MQTT",
			topology_icon:"mqtt",
			x: 116.8609379501766 ,
			y: 109.56278124099646 
		},
		{
			id: 10,
			name: "Bosch XDK 2",
			type: "Sensor",
			topology_icon:"xdk",
			x:-156.6200415871833,
			y:-32.39568678502029
		},
		{
			id: 11,
			name: "Adeunis",
			type: "Sensor",
			topology_icon:"adeunis",
			x:-156.53841298773017,
			y:8.685933538317114
		},
		{
			id: 12,
			//name:"TCP",
			type:"Sensor",
			topology_icon:"tcp",
			x: 26.27545667813739,
			y: 108.768171756154

		}	
	],

	links: [ 
		{
			id: 0,
			source: "LoRa Sensor",
			target: "LoRa Gateway",
			color:"#37E83C",
			width: "5px",
			label: "LoRa / 868 MHz"
		},
		{
			
			id: 1,
			source: "LoRa Gateway",
			target: "Actility Cloud",
			color:"#FFC43D",
			width: "5px",
			label: "TCP",

		},
		{
			id: 2,
			source: "Actility Cloud",
			target: "ADT IoT Gateway",
			color:"#E85D9A",
			width: "5px",
			label: "HTTP Post"
		},
		{
			id: 3,
			source: "ADT IoT Gateway",
			target: "MQTT Broker",
			color:"#B23DFF",
			width: "5px"
		},
		{
			id: 4,
			source: "MQTT Broker",
			target:"Real Time Dashboard",
			color:"#B23DFF",
			width: "5px",
			label: "mqtt"
		},
		{
			id: 5,
			source: "MQTT Broker",
			target:"CAM",
			color:"#B23DFF",
			width: "5px",
			label: "mqtt"

		},
		{
			id: 6,
			source: "Smart Plug",
			target: "LoRa Sensor",
			color:"#37E83C",
			width: "5px",
		},	
		/*{
			id: 7,
			source: "Bosch XDK 1",
			target: "MQTT Broker",
			color:"#FFC43D",
			width: "10px",
			label: "TCP"
		},	
		{
			id: 8,
			source: "RPI Sensor",
			target: "MQTT Broker",
			color:"#FFC43D",
			width: "10px",
			label: "TCP"
		},*/
		{
			id: 9,
			source: "Bosch XDK 2",
			target: "LoRa Sensor",
			color:"#37E83C",
			width: "5px",
		},		
		{
			id: 10,
			source: "Adeunis",
			target: "LoRa Sensor",
			color:"#37E83C",
			width: "5px",
		},		
		{
			id: 11,
			source: "RPI Sensor",
			target: "12", //TCP,
			color:"#FFC43D",
			width: "5px",
		},		
		{
			id: 12,
			source: "Bosch XDK 1",
			target: "12", //TCP
			color:"#FFC43D",
			width: "5px",
		},		
		{
			id: 13,
			source: "12",
			target: "MQTT Broker", //TCP
			color:"#FFC43D",
			width: "5px",
		}
	
	],
		"nodeSet": [
		{ 
			"nodes": ["Smart Plug","Bosch XDK 2","Adeunis","LoRa Sensor"],
			"topology_icon": "lora",
			x: -87.51742387157809,
			y: -33.59507071927445,
		},
		{ 
			"nodes": ["Bosch XDK 1","RPI Sensor","12"],
			"topology_icon": "tcp",
			x: 26.275456678137388,
			y: 108.768171756154
		},

		
	],

	
};

