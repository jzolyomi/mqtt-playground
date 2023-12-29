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
        <b>MQTT Broker Connection</b>
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
          <div className="col-sm-2">
            <label>
              <b>Disconnected</b>
            </label>
            <button className="btn btn-primary form-control"> Connect</button>
          </div>
        </div>
      </div>
      <div className="card-footer text-muted">
        MQTT Broker connection status: <b>Disconnected</b>
      </div>
    </div>
  );
}

function MQTTPublishPanel() {
  return (
    <div className="card">
      <div className="card-body">
        <b>MQTT Broker Publish</b>
        <div className="row">
          <div className="col-sm-5">
            <label>Topic:</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-sm-5">
            <label>Message:</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-sm-2">
            <label>
              <b>Status</b>
            </label>
            <button className="btn btn-primary form-control">Send</button>
          </div>
        </div>
      </div>
      <div className="card-footer text-muted">log</div>
    </div>
  );
}

function MQTTSubscribePanel() {
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
        <button className="btn btn-sm btn-danger">
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
            <tr>
              <th scope="row">1</th>
              <td>2023.12.29 16:40</td>
              <td>test/topic</td>
              <td>test message. hello world</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
