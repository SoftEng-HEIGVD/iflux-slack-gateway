//var iFluxClient = require('iflux-node-client');
var iFluxClient = require('../iflux-node-client/index.js').Client;
var Event = require('../iflux-node-client/index.js').Event;


var client = new iFluxClient("http://localhost:3000");
var event = {
	'ts' : 'now'
}

var e1 = new Event("temperatureEvent", { temp : 22.5, location : "room 1" });
var e2 = new Event("riot", { riskLevel : "high", location : "train station" }, new Date());

client.notifyEvent(e1);
client.notifyEvent(e2);