/// <reference path="typings/main/ambient/node/index.d.ts" />
import fs = require('fs');
import p = require('path');

interface FileItem {
    path: String;
    contents: string[];
}

class FileReader {
    getFiles(path: string, depth: number = 0) {

        let fileTree = [];
        let files = fs.readdirSync(path);

        for (let file of files) {
            let filePath = p.join(path, file);
            let stats = fs.statSync(filePath);

            fileTree.push(
                this.fileItemFor(stats, filePath, depth)
            );
        }

        return fileTree;
    }
    
    private fileItemFor(stats, filePath: string, depth: number): FileItem {
        return {
            path: filePath,
            contents: stats.isDirectory() ? this.getFiles(filePath, (depth + 1)) : []
        };
    }
}

class LimitedFileReader extends FileReader {
    constructor(public maxDepth: number) {
        super();
    }

    getFiles(path: string, depth = 0) {
        if (depth > this.maxDepth) {
            return [];
        }

        return super.getFiles(path, depth);
    }
}

let fileReader = new LimitedFileReader(2);
let files = fileReader.getFiles('.');

console.log(JSON.stringify(files, null, 2));
