import type { Component } from "solid-js";
import Terminal from "./components/terminal/Terminal";

const style = "bg-display-100 text-monitor-100 min-h-screen text-xs crt ";

const App: Component = () => {
  return (
    <div class={style}>
      <Terminal />
    </div>
  );
};

export default App;
