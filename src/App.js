import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./Navigation";
import Home from "./pages/Home";
import MQTT_Connection from "./pages/MQTT_Connection";

function App() {
  return (
    <div>
      <Navigation />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mqtt-connection" element={<MQTT_Connection />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
