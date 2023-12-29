export default function MQTTPublishSubscribe() {
  return (
    <div className="container-fluid">
      <h3>MQTT Publish and Subscribe example</h3>
      <MQTTConnectionPanel />
      <br />
      <MQTTPublishPanel />
      <br />
      <MQTTSubscribePanel />
    </div>
  );
}

function MQTTConnectionPanel() {
  return (
    <div className="card">
      <div className="card-body">
        MQTT Broker Connection
        <div className="row">
          <div className="col-sm-5">
            <label>Hostname:</label>
            <input
              type="text"
              className="form-control"
              defaultValue="wss://broker.emqx.io/mqtt"
            />
          </div>
          <div className="col-sm-2">
            <label>Port:</label>
            <input type="number" className="form-control" defaultValue="8084" />
          </div>
          <div className="col-sm-3">
            <label>
              <b>Disconnected</b>
            </label>
            <button className="btn btn-primary"> Connect</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MQTTSubscribePanel() {
  return (
    <div className="card">
      <div className="card-body">MQTT Broker Subscribe Panel</div>
    </div>
  );
}

function MQTTPublishPanel() {
  return (
    <div className="card">
      <div className="card-body">MQTT Broker Publish Panel</div>
    </div>
  );
}
