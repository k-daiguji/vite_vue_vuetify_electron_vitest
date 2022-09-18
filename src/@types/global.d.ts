interface Window {
  webAPI: {
    setTitle(title: string): Promise<void>;
    selectFolder(path: string): Promise<{ path: string; files: string[] }>;
  };
}

declare let window: Window & typeof globalThis;
