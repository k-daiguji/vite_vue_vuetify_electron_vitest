import { app, BrowserWindow, ipcMain, dialog } from "electron";
import path from "path";

async function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  ipcMain.handle("select-folder", (_, path) => {
    let directory = { path: "", files: [] };
    const directories = dialog.showOpenDialogSync({
      properties: ["openDirectory"],
      title: "フォルダ(単独選択)",
      defaultPath: path,
    }) ?? [];
    directory.path = directories[0];
    directory.files = require('fs').readdirSync(directory.path)
    return directory;
  });

  await win.loadURL("http://localhost:5173/");
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
