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
import { documentation as filter  } from "../cli/filter";
import { documentation as formatTable  } from "../cli/format-table";
import { documentation as formatTree  } from "../cli/format-tree";
import { documentation as fromCsv  } from "../cli/from-csv";
import { documentation as fromYaml  } from "../cli/from-yaml";
import { documentation as group  } from "../cli/group";
import { documentation as length  } from "../cli/length";
import { documentation as map  } from "../cli/map";
import { documentation as toCsv  } from "../cli/to-csv";
import { documentation as toYaml  } from "../cli/to-yaml";
import { documentation as transform  } from "../cli/transform";

const docs = [
    filter,
    formatTable,
    formatTree,
    fromCsv,
    fromYaml,
    group,
    length,
    map,
    toCsv,
    toYaml,
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