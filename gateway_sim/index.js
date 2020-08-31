var mqtt = require("mqtt");

var client = null;
let conn = false;
let timer = null;

let brokerUrl = "ws://broker.hivemq.com:8000/mqtt";
let opt = {
  clientId: "service-" + parseInt(Math.random() * 100000),
  connectTimeout: 5000,
  //hostname: "broker.hivemq.com",
  //port: 8000,
  //path: "/mqtt",
};
let rtime = 2000;

client = mqtt.connect(brokerUrl, opt);
client.on("connect", function() {
  client.subscribe("gateway/sensor", function(err) {
    if (!err) {
      console.log("Subscribe | topic: gateway/sensor");
      conn = true;
      beginRead();
    } else {
      console.log(err);
    }
  });
});

client.on("message", function(topic, message) {
  // message is Buffer
  //console.log(message.toString());
  //client.end();
});

function sendRnd() {
  if (conn) {
    client.publish("gateway/sensor", rndMinMax(0.01, 1.01, 4));
  } else {
    client = mqtt.connect(brokerUrl, opt);
  }
}

function rndMinMax(min, max, fix) {
  return (Math.random() * (max - min) + min).toFixed(fix);
}

function beginRead() {
  timer = setInterval(sendRnd, rtime);
}

function endRead() {
  clearInterval(timer);
  timer = null;
}
