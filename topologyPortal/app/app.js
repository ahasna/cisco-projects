(function(nx){
	//instantiate NeXt app
	var app = new nx.ui.Application();

	

	// configruration object for next
	var topologyConfig = {
		
		//node configuration
		"nodeConfig": {
			"label": "model.name",
			"iconType": "model.topology_icon",
			"color":"model.color" 
		},

		//links configuration
		"linkConfig": { 
			"linkType": "curve",
			"color": "model.color",
			"width": "model.width",
			"label":"model.label"
		
		},

		"nodeSetConfig": { 
			"iconType":"model.topology_icon",
			"color": "model.color",
			"width": "model.width",
			"label":"model.label"
		},

		//choose between showing the icons if "true", and to show only dots if "false"
	  "showIcon": true,

		//automatically position the nodes using dataProcessor
	  //"dataProcessor": "nextforce",

	  	// width 100% if true
	  'adaptive': true,
	    // canvas size
	  'width': 1500,
	  'height': 900,
	  // moves the labels in order to avoid overlay
	  'enableSmartLabel': true,
	  // smooth scaling. may slow down, if true
	  'enableGradualScaling': true,
	  // if true, two nodes can have more than one link
	  'supportMultipleLink': true,
	  // enable scaling
	  "scalable": true,
	  //enebles using nodes' names for the links
	  'identityKey': 'name',

	};


	//instantiate Topology class
	var topology = new nx.graphic.Topology(topologyConfig);
	
	//register new icons: 
	topology.registerIcon("lora", "images/LoRa.png", 60, 60);
	topology.registerIcon("smartplug", "images/smartplug.png",60,60);
	topology.registerIcon("xdk", "images/xdk.png",40,40);
	topology.registerIcon("wabler", "images/wablerIR829.png",100,100);
	topology.registerIcon("rtdashboard", "images/RTDashboard.png",100,100);
	topology.registerIcon("cam", "images/CAM.png",100,100);
	topology.registerIcon("rpisensor", "images/RPBasedsensor.png",60,60);
	topology.registerIcon("mqtt", "images/MQTT-icon.png",100,100);
	topology.registerIcon("cld", "images/cloud.png",100,100);
	topology.registerIcon("adeunis", "images/ftd_lora_868_face.png",80,80);
	topology.registerIcon("tcp", "images/TCP.png",60,60);
	topology.registerIcon("gw", "images/ADT-Gateway.png",80,80);
	

	//load the topology data from the file data.js
	topology.on("ready", function(){
    // load topology data
	topology.data(topologyData);
  });

	//bind the topology object to the app
	topology.attach(app);


	//our app must run is a specefic container. Here it is the container with an id="topology-container"
	app.container(document.getElementById("topology-container"));


})(nx);

