import { app, BrowserWindow, ipcMain, dialog } from "electron";
import * as path from "path";
import * as fs from "fs";

async function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.ts"),
    },
  });

  ipcMain.handle("select-folder", (_, path) => {
    const directories = dialog.showOpenDialogSync({
      properties: ["openDirectory"],
      title: "フォルダ(単独選択)",
      defaultPath: path,
    }) ?? [];
    return directories[0];
  });

  ipcMain.handle("create-folder", (_, path) => {
    let newPath = path;
    let i = 1;
    while (fs.existsSync(newPath)) {
      newPath = path + ` (${i})`
      i++;
    }
    fs.mkdirSync(newPath);
    return newPath;
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
