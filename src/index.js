import { createRoot } from "react-dom/client";
import { StrictMode } from 'react';
import '../src/style.css';

import App from "./App";

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)