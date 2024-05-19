import { createRoot } from "react-dom/client";
import styles from "./style.css?inline";
import { LogoSmall } from "@src/icons/selidor";

export function Control() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <button className="w-full h-full p-2 hover:bg-[#e8eaed12] rounded-full">
        <LogoSmall className="w-full h-full" />
      </button>
    </div>
  );
}

setTimeout(() => {
  const attachmentTarget = document.querySelector<HTMLDivElement>(
    ".input-buttons-wrapper-bottom",
  );
  if (!attachmentTarget) {
    console.error("Can't find attachment target");
    return;
  }

  const attachmentPoint = document.createElement("div");
  attachmentTarget?.appendChild(attachmentPoint);
  const shadow = attachmentPoint.attachShadow({ mode: "closed" });

  const rootContainer = document.createElement("div");
  rootContainer.className = "h-12 w-12";
  shadow.appendChild(rootContainer);
  const style = document.createElement("style");
  style.innerHTML = styles;
  shadow.appendChild(style);

  if (import.meta.env.DEV) {
    console.log("rootContainer", rootContainer);
  }

  const root = createRoot(rootContainer);
  root.render(<Control />);
}, 300);
