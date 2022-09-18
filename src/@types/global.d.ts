interface Window {
    webAPI: {
        setTitle(title: string): Promise<void>
        selectFolder(path: string): Promise<{ path: string, files: string[] }>
    }
}

declare var window: Window & typeof globalThis