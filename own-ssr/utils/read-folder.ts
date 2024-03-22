import { readdirSync } from "fs";
import path from "path";

export function* readEveryFile(dirURL: string): Generator<string> {
  const files = readdirSync(dirURL, { withFileTypes: true });
  for (const file of files) {
    const localPath = path.join(dirURL, file.name);

    if (file.isDirectory()) {
      yield* readEveryFile(localPath);
    } else {
      yield localPath;
    }
  }
}
