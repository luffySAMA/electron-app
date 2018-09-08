// This is main process of Electron, started as first thing when your
// app starts. It runs through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

import path from "path";
import url from "url";
import { app, Menu, dialog } from "electron";
import { autoUpdater } from "electron-updater";
import { devMenuTemplate } from "./menu/dev_menu_template";
import { editMenuTemplate } from "./menu/edit_menu_template";
import createWindow from "./helpers/window";

// Special module holding environment variables which you declared
// in config/env_xxx.json file.
import env from "env";

const setApplicationMenu = () => {
  const menus = [...editMenuTemplate];
  if (env.name !== "production") {
    // menus.push(devMenuTemplate);
  }
  Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};

// Save userData in separate folders for each environment.
// Thanks to this you can use production and development versions of the app
// on same machine like those are two separate apps.
if (env.name !== "production") {
  const userDataPath = app.getPath("userData");
  app.setPath("userData", `${userDataPath} (${env.name})`);
}
app.commandLine.appendSwitch("--disable-http-cache");
app.on("ready", () => {
  setApplicationMenu();

  const mainWindow = createWindow("main", {
    width: 1000,
    height: 600
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "app.html"),
      protocol: "file:",
      slashes: true
    })
  );

});

app.on("window-all-closed", () => {
  app.quit();
});

autoUpdater.autoInstallOnAppQuit = false;

autoUpdater.on('update-downloaded', (info) => {
  const options = {
    type: 'info',
    title: `有更新！`,
    message: `${app.getName()}有新版${info.version}发布了，是否现在更新?`,
    buttons: ["现在更新", "下次再说"]
  }
  dialog.showMessageBox(options, (index) => {
    if (index == 0) {
      autoUpdater.quitAndInstall();
    }
  })

});

app.on('ready', function () {
  autoUpdater.checkForUpdatesAndNotify();
});
