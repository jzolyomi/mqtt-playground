export default function Home() {
  return (
    <div className="container-fluid">
      <h3>Welcome to my MQTT Playground</h3>
      <p>
        MQTT is a lightweight publish/subscribe message transport protocol used
        by IOT applications to send data over TCP/IP.
        <br />
        Eclipse Paho is an MQTT client library available for most of the common
        programming languages. In this pages collect most of the common usage of
        the script and also have some fun with MQTT IOT applications.
      </p>
      <p>The page source code is available on my github page:</p>
      <p>
        <a
          href="https://github.com/jzolyomi/mqtt-playground"
          target="_blank"
          rel="noreferrer"
        >
          MQTT Playground source code on github
        </a>
      </p>
      <p>The following tutorials are available:</p>
      <ol>
        <li>
          <a href="/mqtt-connection">MQTT Connection example</a>
        </li>
      </ol>
    </div>
  );
}
