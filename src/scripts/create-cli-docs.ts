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
import { documentation as map  } from "../cli/map";
import { documentation as length  } from "../cli/length";
import { documentation as transform  } from "../cli/transform";

const docs = [
    length,
    map,
    transform,
];

async function main() {
    
    const template = handlebars.compile(fs.readFileSync(`${__dirname}/cli-docs-template.md`, 'utf8'));
    const markdownContent = template({ docs });
    const outputFileName = './docs/cli.md';
    fs.writeFileSync(outputFileName, markdownContent);
    console.log(`>> ${outputFileName}`);
}

main()
    .catch(err => {
        console.error(`Failed:`);
        console.error(err);
    });