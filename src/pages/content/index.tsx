import { createRoot } from "react-dom/client";
import "./style.css";
import { LogoSmall } from "@src/icons/selidor";

export function Control() {
  return (
    <div className="w-12 h-12 flex justify-center items-center">
      <button className="p-2 hover:bg-[#e8eaed12] rounded-full">
        <LogoSmall />
      </button>
    </div>
  );
}

setTimeout(() => {
  const editor = document.querySelector<HTMLDivElement>(
    ".input-buttons-wrapper-bottom",
  );

  console.log("DEV", import.meta.env.DEV);
  console.log("PROD", import.meta.env.PROD);
  console.log("MODE", import.meta.env.MODE);
  const id = `selidor-root-${(Math.random() * 100_000).toString()}`;

  const div = document.createElement("div");
  div.id = id;
  editor?.prepend(div);

  const rootContainer = document.getElementById(id);
  console.log(rootContainer === div);
  if (import.meta.env.DEV) {
    console.log("rootContainer", rootContainer);
  }

  if (!rootContainer) throw new Error("Can't find Content root element");
  const root = createRoot(rootContainer);
  root.render(<Control />);
}, 300);
