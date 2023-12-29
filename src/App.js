import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./Navigation";
import Home from "./pages/Home";
import MQTTConnection from "./pages/MQTTConnection";

function App() {
  return (
    <div>
      <Navigation />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mqtt-connection" element={<MQTTConnection />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
