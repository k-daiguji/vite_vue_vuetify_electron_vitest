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
    const directory = { path: "", files: [""] };
    const directories = dialog.showOpenDialogSync({
      properties: ["openDirectory"],
      title: "フォルダ(単独選択)",
      defaultPath: path,
    }) ?? [];
    directory.path = directories[0];
    directory.files = fs.readdirSync(directory.path)
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
