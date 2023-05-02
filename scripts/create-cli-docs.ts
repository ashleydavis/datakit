//
// Creates CLI documentation from metadata in the code.
//
// Usage:
//
//      npx ts-node ./scripts/create-cli-docs
//
// Output:
// 
//      ./docs/cli.md
//

import * as fs from 'fs';
import handlebars from 'handlebars';
import { documentation as map  } from "../src/cli/map";

const docs = [
    map,
];

async function main() {
    
    const template = handlebars.compile(fs.readFileSync('./scripts/cli-docs-template.md', 'utf8'));
    const markdownContent = template(docs);
    const outputFileName = './docs/cli.md';
    fs.writeFileSync(outputFileName, markdownContent);
    console.log(`>> ${outputFileName}`);
}

main()
    .catch(err => {
        console.error(`Failed:`);
        console.error(err);
    });