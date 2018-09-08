# electron-app

将任意网站打包成桌面应用

## 如何使用

```bash
git clone https://github.com/luffySAMA/electron-app.git
cd electron-app
npm install
npm start
```

## 启动项目

```bash
npm start
```

将会运行一个窗口

## 打包

```bash
npm run release
```

将会在`dist`目录生成一个`.exe`的安装包

## 配置打包参数

* 修改英文名： 

    修改`package.json`中的`name`，用于安装时的文件夹路径

* 修改中文名： 

    修改`package.json`中的`productName`，产品名，在安装包、开始菜单、桌面快捷方式等许多地方都会显示

* 修改logo： 

    替换`resources/icon.ico`

    ico需要包含16x16,32x32,48x48,64x64,128x1128,256x256尺寸的图片

* 修改启动页：

    修改`package.json`中的`homepage`

* 修改appid： 

    修改`package.json`中`build`的`appId`，每个应用的appid要唯一

* 修改版本号： 

    修改`package.json`中的`version`，用于安装包名称

* 修改公司名：

    修改`package.json`中的`author`，会显示在windows系统的“程序与功能”里面

* 32位和64位：

默认情况下打包是根据当前电脑是32位还是64位来打的。

通过在`package.json`的`build`中添加如下属性，可以选择打包成32位还是64位。如果同时打32位和64位，那么最终会打成一个安装包，在安装的时候，会自动选择安装多少位的版本。


```json
  "build":{
    "win": {
      "target": ["nsis:ia32", "nsis:x64"]
    }
  }
```

* web安装包

  普通的安装包大小约30多M，如果是32位+64位的安装包，则会是60多M，而web版的安装包则非常小，只有几百K，它在安装的时候再根据操作系统位数去下载相应的安装包并安装。

  web安装包的配置方法，[点击这里](docs/NSIS-WEB.md)

  *有了web版的安装包，还可以很顺理成章地实现 `自动更新`*

* 更多详细配置:

    https://www.electron.build/configuration/configuration
