export {};

declare global {
  interface Window {
    botpressWebChat?: {
      init: (opts: Record<string, unknown>) => void;
      sendEvent: (e: { type: string }) => void;
    };
  }
}
