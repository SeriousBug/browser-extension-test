import { createRoot } from "react-dom/client";
import styles from "./style.css?inline";
import { LogoSmall } from "@src/icons/selidor";
import { createPortal } from "react-dom";
import { useHover } from "@src/lib/useHover";
import { clsx } from "@src/lib/clsx";

type PortalProps = { portal: HTMLElement | DocumentFragment };

export function Control({ portal }: PortalProps) {
  const { isHovering, bindHover } = useHover();

  return (
    <div className="w-12 h-12 flex justify-center items-center">
      <button
        className="w-full h-full p-2 hover:bg-[#e8eaed12] rounded-full relative"
        {...bindHover}
      >
        <LogoSmall aria-label="" className="w-full h-full" />
      </button>
      {createPortal(
        <div
          className={clsx(
            "absolute top-12 left-12",
            isHovering ? "visible" : "hidden",
          )}
        >
          Use your Selidor prompts
        </div>,
        portal,
      )}
    </div>
  );
}

function attachStyles(target: HTMLElement | DocumentFragment) {
  const style = document.createElement("style");
  style.innerHTML = styles;
  target.appendChild(style);
}

function attachShadow<E extends Element = Element>(target: E | null) {
  if (!target) {
    throw new Error("Can't find attachment target");
  }
  const shadowTarget = document.createElement("div");
  target.appendChild(shadowTarget);
  const shadow = shadowTarget.attachShadow({ mode: "closed" });
  const rootContainer = document.createElement("div");
  shadow.appendChild(rootContainer);
  attachStyles(shadow);
  return shadow;
}

setTimeout(() => {
  const buttonTarget = document.querySelector(".input-buttons-wrapper-bottom");
  const rootContainer = attachShadow(buttonTarget);
  const root = createRoot(rootContainer);
  const portalContainer = attachShadow(document.body);
  root.render(<Control portal={portalContainer} />);
}, 300);
