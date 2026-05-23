import React from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

// Side-effect imports — order matters: each module reads globals set by the
// previous one (data -> icons -> tweaks -> shell -> client screens -> pro screens).
import "./data.js";
import "./icons.jsx";
import "./tweaks-panel.jsx";
import "./shell.jsx";
import "./screens-client.jsx";
import "./screens-pro.jsx";
import App from "./app.jsx";

createRoot(document.getElementById("root")).render(<App />);
