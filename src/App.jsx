import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div class="p-3 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3">
        Example element with utilities
      </div>
    </>
  );
}

export default App;
