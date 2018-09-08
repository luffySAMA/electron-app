const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu
const app = electron.app
import jetpack from "fs-jetpack";
const appDir = jetpack.cwd(app.getAppPath());

// Holy crap! This is browser window with HTML and stuff, but I can read
// files from disk like it's node.js! Welcome to Electron world :)
const manifest = appDir.read("package.json", "json");
const homepage = manifest.homepage;

export const editMenuTemplate =
[{
  label: "文件",
  submenu: [{
      label: "打开新窗口",
      accelerator: 'CmdOrCtrl+N',
      click: function(item) {
        let win = new BrowserWindow({ width: 800, height: 600 })
        win.on('closed', () => {
            win = null
        })

          win.loadURL(homepage);
      }
  }, {
      label: '退出',
      accelerator: 'CmdOrCtrl+Q',
      role: "quit"
  }]
}, {
  label: '编辑',
  submenu: [{
      label: '撤销',
      accelerator: 'CmdOrCtrl+Z',
      role: 'undo'
  }, {
      label: '重做',
      accelerator: 'Shift+CmdOrCtrl+Z',
      role: 'redo'
  }, {
      type: 'separator'
  }, {
      label: '剪切',
      accelerator: 'CmdOrCtrl+X',
      role: 'cut'
  }, {
      label: '复制',
      accelerator: 'CmdOrCtrl+C',
      role: 'copy'
  }, {
      label: '粘贴',
      accelerator: 'CmdOrCtrl+V',
      role: 'paste'
  }, {
      label: '全选',
      accelerator: 'CmdOrCtrl+A',
      role: 'selectall'
  }]
}, {
  label: '显示',
  submenu: [{
          label: '重新载入',
          accelerator: 'CmdOrCtrl+R',
          role: 'forcereload'
      }, {
          label: '切换全屏',
          accelerator: (function() {
              if (process.platform === 'darwin') {
                  return 'Ctrl+Command+F'
              } else {
                  return 'F11'
              }
          })(),
          click: function(item, focusedWindow) {
              if (focusedWindow) {
                  focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
              }
          }
      }, {
          label: '切换开发者工具',
          accelerator: (function() {
              if (process.platform === 'darwin') {
                  return 'Alt+Command+I'
              } else {
                  return 'Ctrl+Shift+I'
              }
          })(),
          click: function(item, focusedWindow) {
              if (focusedWindow) {
                  focusedWindow.toggleDevTools()
              }
          }
      }
      /*, {
        type: 'separator'
      }, {
        label: '应用程序菜单演示',
        click: function (item, focusedWindow) {
          if (focusedWindow) {
            const options = {
              type: 'info',
              title: '应用程序菜单演示',
              buttons: ['好的'],
              message: '此演示用于 "菜单" 部分, 展示如何在应用程序菜单中创建可点击的菜单项.'
            }
            electron.dialog.showMessageBox(focusedWindow, options, function () {})
          }
        }
      }*/
  ]
}, {
  label: '窗口',
  role: 'window',
  submenu: [{
      label: '最小化',
      accelerator: 'CmdOrCtrl+M',
      role: 'minimize'
  }, {
      label: '关闭',
      accelerator: 'CmdOrCtrl+W',
      role: 'close'
  }, {
      type: 'separator'
  }, {
      label: '重新打开窗口',
      accelerator: 'CmdOrCtrl+Shift+T',
      enabled: false,
      key: 'reopenMenuItem',
      click: function() {
          app.emit('activate')
      }
  }]
}, {
  label: '帮助',
  role: 'help',
  submenu: [{
      label: '关于',
      click: function() {
        const options = {
            type: 'info',
            title: `关于`,
            message: `关于${manifest.productName}\n当前版本 ${manifest.version}`,
            buttons: []
          }
          electron.dialog.showMessageBox(options)
      }
  }]
}]
