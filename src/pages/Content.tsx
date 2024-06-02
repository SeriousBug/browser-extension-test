import { useEffect } from "react";
import { createRoot } from "react-dom/client";

function TestComponent() {
  useEffect(() => {
    console.log("errors");
  }, []);

  return <div>Foo Barr</div>;
}

function attachShadow<E extends Element = Element>(target: E | null) {
  if (!target) {
    throw new Error();
  }
  const shadowTarget = document.createElement("div");
  target.appendChild(shadowTarget);
  const shadow = shadowTarget.attachShadow({ mode: "closed" });
  const rootContainer = document.createElement("div");
  shadow.appendChild(rootContainer);
  return shadow;
}

const MAX_INIT_ATTEMPTS = 12;
let isInitialized = false;

function init(attempts: number = 0) {
  if (isInitialized || attempts > MAX_INIT_ATTEMPTS) return;
  try {
    const buttonTarget = document.querySelector("body");
    const rootContainer = attachShadow(buttonTarget);
    const root = createRoot(rootContainer);
    root.render(<TestComponent />);
    isInitialized = true;
  } catch (error) {
    // 10ms, 20ms, 40ms, 80ms, 160ms, 320ms, 640ms, 1280ms, 2560ms, 5120ms, 10240ms, 20480ms
    setTimeout(() => init(attempts + 1), Math.pow(2, attempts) * 10);
  }
}

init();
console.log("hello from content");
