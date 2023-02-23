import * as fs from "fs";

export function writeJsonFile(path: string, file: any) {
    fs.writeFileSync(path, JSON.stringify(file, null, 4));
}
