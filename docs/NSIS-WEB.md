# Electron Web 安装包配置方法

  web版的安装包首先要选择一个发布源，也就是安装包存放的地方，有 BintrayOptions, GenericServerOptions, GitHub, S3Options, SpacesOptions 可供选择,这里我选择 Github。

## 1. 配置 github

  **第一步**，首先要在 github 上新建一个项目，新建的时候勾上"Initialize this repository with a README" 选项

  ![create-repo.png](https://i.loli.net/2018/09/08/5b938b677e0ca.png)

  今后我们的安装包将会上传到这个项目的 `release` 页面下，因此这个项目不需要写代码，我们只是用到这个项目的 release 功能而已。勾上 initialize 是为了 github 自动帮我们初始化项目，否则没有初始化的项目是不能使用 release 功能的。

  **第二步**，创建 GH_TOKEN。每次发布安装包的时候当然不可能手动上传，通过 GH_TOKEN，我们可以用程序调用 github 的 api 来自动上传文件。
  
  <a href="https://github.com/settings/tokens" target="_blank">点击这里</a> 或者 在 github 的个人设置中，找到developer settings，然后点 Personal access token，来到如下页面，点击右上方的 "Generate new toke" 按钮 

  ![personal-access-token.png](https://i.loli.net/2018/09/08/5b938b67648ed.png)

  接下来给 token 随便取一个名字，选择 scope 只勾选 repo 就可以了

  ![select-scope.png](https://i.loli.net/2018/09/08/5b938b678112c.png)

  最后点击最底下的 Generate 按钮，将会得到一个 GH_TOKEN，记得把这个 token 在本地用文件保存下来。

  **第三步**，设置临时的环境变量

  windows 系统

  ``` bash
  set GH_TOKEN=xxxxxxxxxxxxxxx
  ```
  linux 系统

  ``` bash
  export GH_TOKEN=xxxxxxxxxxxxxxx
  ```

## 2. 配置`package.json`

  现在修改 `package.json` 中的 `build` 属性

  首先 把原先的 `nsis` 改为 `nsisWeb`

  然后 把 `target` 改为 `nsis-web`

  接下来设置 `publish` 属性

  * `provider` 填 `github`
  * `repo` 填刚刚在 github 上新建的项目名，注意不是项目的 url
  * `owner` 就填我的 github 的账户名
  * `releaseType` 我选的是 `releaseType`，有三个选项“draft” | “prerelease” | “release” 默认是 `draft`

  修改完之后的文件内容如下 

```json
{
  "build": {
    "nsisWeb":{
      "artifactName": "${productName}_Setup_${version}.${ext}",
      "oneClick": false,
      "perMachine": false,
      "allowToChangeInstallationDirectory": true
    },
    "win": {
      "target": [
        {
          "target": "nsis-web",
          "arch": [
            "x64",
            "ia32"
          ]
        }
      ]
    },
    "publish": {
      "provider": "github",
      "repo": "electron-app",
      "owner": "luffySAMA",
      "releaseType":"release"
    }
  }
}
```

  好了，现在运行 `npm run release` 就会在 github 项目的 release 里面看到

![release.png](https://i.loli.net/2018/09/08/5b938b6775d8e.png)
  
  其中 `yiqiban-web-setup-3.3.1.exe` 就是 web 版的安装包，而另外两个 `.7z`的是实际的安装包，我们只要让用户下载 web 版的安装包就可以了。