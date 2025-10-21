import { resolve as resolveTsNode, load, transformSource, getFormat } from 'ts-node/esm';

import { createMatchPath } from 'tsconfig-paths';
import path from 'path'
import fs from 'fs'

const tsConfig = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'tsconfig.json'), 'utf8'));
const { baseUrl, paths } = tsConfig.compilerOptions;

const matchPath = createMatchPath(path.join(process.cwd(), baseUrl), paths);

export { load, transformSource, getFormat };

export const resolve = (specifier, context, defaultResolve)  => {
    const resolvedPath = matchPath(specifier, undefined, undefined, ['.ts', '.tsx', '.js', '.jsx', '.json']);

    if (resolvedPath) {
        specifier = 'file://' + resolvedPath;
    }

    return resolveTsNode(specifier, context, defaultResolve);
}