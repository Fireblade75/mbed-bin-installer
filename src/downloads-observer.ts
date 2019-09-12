import { watch } from "chokidar";
import downloadsFolder from "downloads-folder";
import path from "path";
import { Observable, Subscriber } from "rxjs";

const downloads = downloadsFolder();

export const DownloadsObserver = new Observable<string>((subscriber: Subscriber<string>) => {
    const watcher = watch(path.join(downloads, "*.bin"));
    watcher.on("add", (filePath) => {
        subscriber.next(filePath);
    });
});
