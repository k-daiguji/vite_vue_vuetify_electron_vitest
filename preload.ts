const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("webAPI", {
  selectFolder: async (path) => await ipcRenderer.invoke("select-folder", path),
});

window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(`${type}-version`, process.versions[type]);
  }
});
