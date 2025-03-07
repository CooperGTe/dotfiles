import { App } from "astal/gtk3"
import request from "./request";
import styles from "./styles/styles.scss"
import windows from "./windows";

App.start({
    icons: `./assets`,
    css: styles,
    requestHandler(req, res) {
        request(req, res);
    },
    main() {
        windows.map((win) => App.get_monitors().map(win));
    },
})
