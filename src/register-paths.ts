import { register } from "tsconfig-paths";
import { readFileSync } from "fs";
import { resolve } from "path";

const tsconfig = JSON.parse(readFileSync(resolve("tsconfig.json"), "utf-8"));

if (tsconfig.compilerOptions?.baseUrl && tsconfig.compilerOptions?.paths) {
    const baseUrl = resolve(tsconfig.compilerOptions.baseUrl);
    register({
        baseUrl,
        paths: tsconfig.compilerOptions.paths,
    });
}
