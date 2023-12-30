//Standard MQTT.js Connection/Subscribe/Publish test scripts found on EMQX.com
//https://www.emqx.com/en/blog/how-to-use-mqtt-in-react
import { useState, useEffect } from "react";
import mqtt from "mqtt";

export default function MQTT_Connection() {
  //MQTT Client
  const [client, setClient] = useState(null);
  //Simple Status message
  const [connectStatus, setConnectStatus] = useState("Disconnected");
  //Storage for incoming messages
  const [incomingMessage, setIncomingMessage] = useState("");

  //MQTT options
  const mqttOptions = {
    clientId: "codeandgeek_" + Math.random().toString(16).substring(2, 8),
    // ws -> 8083; wss -> 8084
    port: 8084,
  };

  function MQTTConnect() {
    setConnectStatus("Connecting...");
    setClient(mqtt.connect("wss://broker.emqx.io/mqtt", mqttOptions));
  }

  function MQTTDisconnect() {
    if (client) {
      client.end(() => {
        setConnectStatus("Disconnected");
      });
    }
  }

  useEffect(() => {
    if (client) {
      client.on("connect", () => {
        setConnectStatus("Connected!");
        //subscribe to a test topic to listen to incoming messages
        client.subscribe("codeandgeek/connection");
        //send a test message to the same topic
        client.publish("codeandgeek/connection", "Hello World");
      });

      client.on("message", (topic, message) => {
        let datenow = new Date().toLocaleTimeString();
        setIncomingMessage(datenow + ":[" + topic + "] " + message.toString());
      });
    }
  }, [client]);

  return (
    <div className="container-fluid">
      <h3>MQTT Connection Example</h3>
      <p>The following source code found on EMQX.com</p>
      <p>
        <a
          href="https://www.emqx.com/en/blog/how-to-use-mqtt-in-react"
          target="_blank"
          rel="noreferrer"
        >
          EMQX.com | How to use MQTT in react
        </a>
      </p>
      <p>You can read my blog post about how this script works here:</p>
      <p>
        <a
          href="https://codeandgeek.com/mqtt-connection-in-react-with-mqtt-js"
          target="_blank"
          rel="noreferrer"
        >
          CodeAndGeek | MQTT Connection in React with MQTT.js
        </a>
      </p>
      <hr />
      <p>
        MQTT client connection Status: <b>{connectStatus}</b>
      </p>
      <p>Last incoming message: {incomingMessage}</p>
      <MQTTConnectButton
        client={client}
        MQTTConnect={MQTTConnect}
        MQTTDisconnect={MQTTDisconnect}
      />
    </div>
  );
}

//Connection button component
export function MQTTConnectButton({ client, MQTTConnect, MQTTDisconnect }) {
  //Based on the client's connected property render the connect or disconnect button
  if (client != null && client.connected) {
    return (
      <button className="btn btn-danger" onClick={MQTTDisconnect}>
        Disconnect From Broker
      </button>
    );
  } else {
    return (
      <button className="btn btn-primary" onClick={MQTTConnect}>
        Connect To Broker
      </button>
    );
  }
}
