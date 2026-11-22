import { useEffect } from "react";

const TRIGGER_SELECTOR = "button, a, [role='button'], [data-icon-hover], .group";

function isInsideCurrentTarget(target: EventTarget | null, root: Element) {
  return target instanceof Node && root.contains(target);
}

function dispatchToIcons(root: Element, eventName: "gaan-icon-play" | "gaan-icon-reset") {
  root.querySelectorAll<HTMLElement>("[data-animated-icon]").forEach((icon) => {
    icon.dispatchEvent(new Event(eventName));
  });
}

/** Delegates parent hover and keyboard-focus triggers to Lucide Animated icons. */
export function AnimatedIconObserver() {
  useEffect(() => {
    const triggerFrom = (event: Event) => {
      const origin = event.target;
      if (!(origin instanceof Element)) return null;
      return origin.closest(TRIGGER_SELECTOR);
    };

    const relatedTargetOf = (event: Event) =>
      event instanceof MouseEvent ? event.relatedTarget : (event as FocusEvent).relatedTarget;

    const onEnter = (event: Event) => {
      const root = triggerFrom(event);
      if (!root || isInsideCurrentTarget(relatedTargetOf(event), root)) return;
      dispatchToIcons(root, "gaan-icon-play");
    };
    const onLeave = (event: Event) => {
      const root = triggerFrom(event);
      if (!root || isInsideCurrentTarget(relatedTargetOf(event), root)) return;
      dispatchToIcons(root, "gaan-icon-reset");
    };

    document.addEventListener("pointerover", onEnter, true);
    document.addEventListener("pointerout", onLeave, true);
    document.addEventListener("focusin", onEnter, true);
    document.addEventListener("focusout", onLeave, true);
    return () => {
      document.removeEventListener("pointerover", onEnter, true);
      document.removeEventListener("pointerout", onLeave, true);
      document.removeEventListener("focusin", onEnter, true);
      document.removeEventListener("focusout", onLeave, true);
    };
  }, []);

  return null;
}
