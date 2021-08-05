require("./common/error.helper");
const { app } = require("electron");

const search = require("./windows/search");

const initApp = () => {
    search.showBrowserWindow();
};

app.on("ready", initApp);

app.on("web-contents-created", (_, contents) => {
    contents.on("will-navigate", (event) => event.preventDefault());
    contents.setWindowOpenHandler(() => {
        action: "deny";
    });
});
