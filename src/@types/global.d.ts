interface Window {
  webAPI: {
    setTitle(title: string): Promise<void>;
    selectFolder(path: string): Promise<string>;
    createFolder(path: string): Promise<string>;
  };
}

declare let window: Window & typeof globalThis;
