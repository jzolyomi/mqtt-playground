import mqtt from "mqtt";
import { useState, useEffect } from "react";
import { MQTTConnectButton } from "./MQTTConnection";

export default function MQTTPublishSubscribe() {
  //MQTT Client and Status Message
  const [client, setClient] = useState(null);
  const [connectStatus, setConnectStatus] = useState("Disconnected");
  //Hostname and port
  const [hostname, setHostname] = useState("wss://broker.emqx.io/mqtt");
  const [port, setPort] = useState(8084);
  //Incoming messages
  const [incomingMessages, setIncomingMessages] = useState([]);

  //MQTT options
  const mqttOptions = {
    clientId: "codeandgeek_" + Math.random().toString(16).substring(2, 8),
    // ws -> 8083; wss -> 8084
    port: port,
  };

  function MQTTConnect() {
    setConnectStatus("Connecting...");
    setClient(mqtt.connect(hostname, mqttOptions));
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
        setIncomingMessages((incomingMessages) => [
          ...incomingMessages,
          {
            date: datenow,
            topic: topic,
            message: message,
          },
        ]);
      });
    }
  }, [client]);

  return (
    <div className="container-fluid">
      <h3>MQTT Publish and Subscribe example</h3>
      <MQTTConnectionPanel
        client={client}
        connectStatus={connectStatus}
        MQTTConnect={MQTTConnect}
        MQTTDisconnect={MQTTDisconnect}
        setHostname={setHostname}
        setPort={setPort}
      />
      <br />
      <MQTTPublishPanel client={client} />
      <br />
      <MQTTSubscribePanel
        incomingMessages={incomingMessages}
        setIncomingMessages={setIncomingMessages}
      />
    </div>
  );
}

function MQTTConnectionPanel({
  connectStatus,
  MQTTConnect,
  MQTTDisconnect,
  setHostname,
  setPort,
  client,
}) {
  return (
    <div className="card">
      <div className="card-body">
        <b>MQTT Broker Connection</b>
        <div className="row">
          <div className="col-sm-5">
            <label>Hostname:</label>
            <input
              type="text"
              className="form-control"
              defaultValue="wss://broker.emqx.io/mqtt"
              onChange={(e) => setHostname(e.target.value)}
            />
          </div>
          <div className="col-sm-2">
            <label>Port:</label>
            <input
              type="number"
              className="form-control"
              defaultValue="8084"
              onChange={(e) => setPort(e.target.value)}
            />
          </div>
          <div className="col-sm-4">
            <label>
              <b>{connectStatus}</b>
            </label>
            <MQTTConnectButton
              client={client}
              MQTTConnect={MQTTConnect}
              MQTTDisconnect={MQTTDisconnect}
            />
          </div>
        </div>
      </div>
      <div className="card-footer text-muted">
        MQTT Broker connection status: <b>{connectStatus}</b>
      </div>
    </div>
  );
}

function MQTTPublishPanel({ client }) {
  //Topic and message state
  const [topic, setTopic] = useState("codeandgeek/connection");
  const [message, setMessage] = useState("Test message");
  //Status log at the card footer
  const [status, setStatus] = useState("-");

  //Sand message handler
  function publishMessage(topic, message) {
    if (client != null && client.connected) {
      let datenow = new Date().toLocaleTimeString();
      client.publish(topic, message);
      setStatus(
        datenow + ": message (" + message + ") sent to topic: " + topic,
      );
    } else {
      setStatus("Error! Client is not connected!");
    }
  }

  return (
    <div className="card">
      <div className="card-body">
        <b>MQTT Broker Publish</b>
        <div className="row">
          <div className="col-sm-5">
            <label>Topic:</label>
            <input
              type="text"
              className="form-control"
              defaultValue={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          <div className="col-sm-5">
            <label>Message:</label>
            <input
              type="text"
              className="form-control"
              defaultValue={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="col-sm-2">
            <label>
              <b>Click to Send</b>
            </label>
            <button
              className="btn btn-primary form-control"
              onClick={() => publishMessage(topic, message)}
            >
              Send
            </button>
          </div>
        </div>
      </div>
      <div className="card-footer text-muted">Status: {status}</div>
    </div>
  );
}

function MQTTSubscribePanel({ incomingMessages, setIncomingMessages }) {
  return (
    <div className="card">
      <div className="card-body">
        <b>MQTT Broker Subscribe and incoming messages</b>
        <div className="row">
          <div className="col-sm-5">
            <label>Subscribe to topic:</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-sm-3">
            <label>
              <b>Status</b>
            </label>
            <button className="btn btn-primary form-control">Subscribe</button>
          </div>
        </div>
        Subscribed topics:
        <div className="row">
          <div className="col-sm-5">
            <input type="text" className="form-control" disabled />
          </div>
          <div className="col-sm-3">
            <button className="btn btn-danger form-control">UnSubscribe</button>
          </div>
        </div>
        <hr />
        Incoming messages:
        <button
          className="btn btn-sm btn-danger"
          onClick={() => setIncomingMessages([])}
        >
          Clear incoming messages
        </button>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Time</th>
              <th scope="col">Topic</th>
              <th scope="col">Message</th>
            </tr>
          </thead>
          <tbody>
            {incomingMessages.map(function (message, index) {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{message.date}</td>
                  <td>{message.topic}</td>
                  <td>{message.message.toString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
