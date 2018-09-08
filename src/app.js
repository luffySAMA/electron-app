import "./stylesheets/main.css";

// Small helpers you might want to keep
import "./helpers/context_menu.js";
import "./helpers/external_links.js";


import electron from "electron";
import jetpack from "fs-jetpack";
const app = electron.remote.app;
const appDir = jetpack.cwd(app.getAppPath());
const manifest = appDir.read("package.json", "json");
window.location.href = manifest.homepage;