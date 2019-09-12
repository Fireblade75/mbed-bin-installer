import { DownloadsObserver } from "./downloads-observer";

DownloadsObserver.subscribe(
    (path) => {
        console.log(`File created: ${path}`);
    },
);
