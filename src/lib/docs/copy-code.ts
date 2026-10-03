import type { Attachment } from "svelte/attachments";

const resetDelayMs = 1500;

export const copyCodeButtons: Attachment<HTMLElement> = (container) => {
  const onClick = async (event: MouseEvent) => {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>(
      "[data-copy-code]"
    );
    if (!button) {
      return;
    }
    const source =
      button.closest("[data-copy-source]") ??
      button.closest(".docs-code")?.querySelector("pre");
    const text =
      source?.getAttribute("data-copy-source") || source?.textContent;
    if (!text) {
      return;
    }
    await navigator.clipboard.writeText(text.trimEnd());
    const label = button.lastChild;
    if (!label) {
      return;
    }
    const idleText = button.textContent?.trim() ?? "Copy";
    button.dataset.state = "copied";
    label.textContent = "Copied";
    setTimeout(() => {
      delete button.dataset.state;
      label.textContent = idleText;
    }, resetDelayMs);
  };
  container.addEventListener("click", onClick);
  return () => container.removeEventListener("click", onClick);
};
