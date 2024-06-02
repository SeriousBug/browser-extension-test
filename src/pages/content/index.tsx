import { createRoot } from "react-dom/client";
import styles from "./style.css?inline";
import { LogoSmall } from "@src/icons/selidor";
import { createPortal } from "react-dom";
import { clsx } from "@src/lib/clsx";
import { useTooltip } from "@src/lib/useTooltip";
import { useToggle } from "@src/lib/useToggle";
import { AnimatePresence, motion } from "framer-motion";
import { SShadowError } from "@src/lib/error";

type PortalProps = { portal: HTMLElement | DocumentFragment };

export function Control({ portal }: PortalProps) {
  const { isHovering, bindTarget, bindTooltip } =
    useTooltip<HTMLButtonElement>();

  const { isOpen, open, close } = useToggle({ default: false });

  return (
    <div className="w-12 h-12 flex justify-center items-center">
      <button
        className="w-full h-full p-2 hover:bg-[#e8eaed12] rounded-full relative"
        onClick={open}
        {...bindTarget}
      >
        <LogoSmall aria-label="" className="w-full h-full" />
      </button>
      {createPortal(
        <div
          className={clsx(
            "absolute z-10 bg-gray-800 text-white p-2 rounded-lg transition-opacity duration-200 pointer-events-none cursor-default text-xs",
            isHovering ? "opacity-100" : "opacity-0",
          )}
          {...bindTooltip}
        >
          Use your Selidor prompts
        </div>,
        portal,
      )}
      {createPortal(<Modal isOpen={isOpen} onClose={close} />, portal)}
    </div>
  );
}

const MODAL = "fixed left-0 top-0 bottom-0 right-0 z-20";

function Modal({ isOpen, onClose }: { isOpen: boolean; onClose?: () => void }) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className={clsx(MODAL, "bg-black bg-opacity-50 backdrop-blur")}
          />
          <motion.div
            initial={{ opacity: 0, y: 200 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 200 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className={clsx(MODAL, "flex justify-center items-center")}
            aria-hidden
            onClick={onClose}
          >
            <div className="bg-white p-4 rounded-lg">
              <div className="flex flex-row gap-4">
                <h2 className="text-xl">Modal</h2>
                <button onClick={onClose}>Close</button>
              </div>
              <p>Content</p>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}

function attachStyles(target: HTMLElement | DocumentFragment) {
  const style = document.createElement("style");
  style.innerHTML = styles;
  target.appendChild(style);
}

function attachShadow<E extends Element = Element>(target: E | null) {
  if (!target) {
    throw new SShadowError({});
  }
  const shadowTarget = document.createElement("div");
  target.appendChild(shadowTarget);
  const shadow = shadowTarget.attachShadow({ mode: "closed" });
  const rootContainer = document.createElement("div");
  shadow.appendChild(rootContainer);
  attachStyles(shadow);
  return shadow;
}

const MAX_INIT_ATTEMPTS = 12;
let isInitialized = false;

function init(attempts: number = 0) {
  if (isInitialized || attempts > MAX_INIT_ATTEMPTS) return;
  try {
    const buttonTarget = document.querySelector(
      ".input-buttons-wrapper-bottom",
    );
    const rootContainer = attachShadow(buttonTarget);
    const root = createRoot(rootContainer);
    const portalContainer = attachShadow(document.body);
    root.render(<Control portal={portalContainer} />);
    isInitialized = true;
  } catch (error) {
    // 10ms, 20ms, 40ms, 80ms, 160ms, 320ms, 640ms, 1280ms, 2560ms, 5120ms, 10240ms, 20480ms
    setTimeout(() => init(attempts + 1), Math.pow(2, attempts) * 10);
  }
}

init();
