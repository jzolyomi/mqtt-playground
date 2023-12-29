//Standard MQTT.js Connection/Subscribe/Publish test scripts found on EMQX.com
//https://www.emqx.com/en/blog/how-to-use-mqtt-in-react
import { useState, useEffect } from "react";
import mqtt from "mqtt";

export default function MQTT_Connection() {
  const [client, setClient] = useState(null);
  const [connectStatus, setConnectStatus] = useState("Not Connected");
  const [incomingMessage, setIncomingMessage] = useState("");

  const mqttOptions = {
    clientId: "codeandgeek_" + Math.random().toString(16).substring(2, 8),
    // ws -> 8083; wss -> 8084
    port: 8084,
  };

  function MQTTConnect() {
    setConnectStatus("Connecting...");
    setClient(mqtt.connect("wss://broker.emqx.io/mqtt", mqttOptions));
  }

  useEffect(() => {
    if (client) {
      client.on("connect", () => {
        console.log(client);
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
      <p>Connection Status: {connectStatus}</p>
      <p>Last incoming message: {incomingMessage}</p>
      <button onClick={MQTTConnect}>Connect To MQTT Broker</button>
    </div>
  );
}
