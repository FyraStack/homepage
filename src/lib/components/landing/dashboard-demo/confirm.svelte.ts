interface ConfirmRequest {
  confirmLabel: string;
  confirmWord?: string;
  description: string;
  title: string;
}

class ConfirmController {
  open = $state(false);
  request = $state<ConfirmRequest | null>(null);
  #settlePending: ((ok: boolean) => void) | null = null;

  ask(opts: ConfirmRequest): Promise<boolean> {
    this.settleOnce(false);
    return new Promise<boolean>((resolve) => {
      this.#settlePending = resolve;
      this.request = opts;
      this.open = true;
    });
  }

  settleOnce(ok: boolean) {
    const settle = this.#settlePending;
    this.#settlePending = null;
    settle?.(ok);
  }
}

export const confirmController = new ConfirmController();

export function confirmDestructive(opts: {
  title: string;
  description: string;
  confirmLabel?: string;
  confirmWord?: string;
}): Promise<boolean> {
  return confirmController.ask({ confirmLabel: "Delete", ...opts });
}
