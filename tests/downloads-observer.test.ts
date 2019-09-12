import { fail } from "assert";
import { expect } from "chai";
import downloadsFolder from "downloads-folder";
import fs from "fs";
import path from "path";
import { setTimeout } from "timers";
import { DownloadsObserver } from "../src/downloads-observer";

const filename = "hello.bin";
let downloads: string;

describe("Downloads Observer", () => {
    before((done) => {
        downloads = downloadsFolder();
        const filePath = path.join(downloads, filename);
        if (fs.existsSync(filePath)) {
            fail(`Can not run test: ${filePath} already exists.`);
        }
        done();
    });

    it("subscribe test", (done) => {
        const filePath = path.join(downloads, filename);
        DownloadsObserver.subscribe({
            complete: () => {
                fail("unexpected complete event");
            },
            error: (err: any) => {
                fail("unexpected error " + err);
            },
            next: (value: string) => {
                expect(value).to.be.equal(filePath);
                done();
            },
        });

        fs.writeFile(filePath, "{}", (err) => {
            if (err) {
                fail(`Could not write test file to disk: ${err}`);
            }
        });
    });

    it("delete test", (done) => {
        const filePath = path.join(downloads, filename);
        DownloadsObserver.subscribe({
            complete: () => {
                fail("unexpected complete event");
            },
            error: (err: any) => {
                fail("unexpected error " + err);
            },
            next: (value: string) => {
                fail("unexpected next event: " + value);
            },
        });
        fs.unlink(filePath, (err) => {
            if (err) {
                fail(`Could not remove test file from disk: ${err}`);
            }
            setTimeout((done), 25);
        });
    });
});
