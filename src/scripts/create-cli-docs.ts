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
import { IDocumentation } from '../lib/command';

import { documentation as distinct  } from "../cli/distinct";
import { documentation as filter  } from "../cli/filter";
import { documentation as formatTable  } from "../cli/format-table";
import { documentation as formatTree  } from "../cli/format-tree";
import { documentation as fromCsv  } from "../cli/from-csv";
import { documentation as fromYaml  } from "../cli/from-yaml";
import { documentation as group } from "../cli/group";
import { documentation as intersect } from "../cli/intersect";
import { documentation as length  } from "../cli/length";
import { documentation as map  } from "../cli/map";
import { documentation as reduce  } from "../cli/reduce";
import { documentation as skip  } from "../cli/skip";
import { documentation as orderBy  } from "../cli/sort";
import { documentation as take  } from "../cli/take";
import { documentation as toCsv  } from "../cli/to-csv";
import { documentation as toObject  } from "../cli/to-object";
import { documentation as toYaml  } from "../cli/to-yaml";
import { documentation as transform  } from "../cli/transform";

const docs: IDocumentation[] = [
    distinct,
    filter,
    formatTable,
    formatTree,
    fromCsv,
    fromYaml,
    group,
    intersect,
    length,
    map,
    orderBy,
    reduce,
    skip,
    take,
    toCsv,
    toObject,
    toYaml,
    transform,
];

async function main() {
    
    const template = handlebars.compile(fs.readFileSync(`${__dirname}/cli-docs-template.md`, 'utf8'));
    for (const doco of docs) {
        if (doco.inputCount === undefined) {
            doco.inputCount = 1;
        }
    }

    handlebars.registerHelper('optionNames', function (optionNames: string[]) {
        return optionNames.map(name => `--${name}`).join(", ");;
    })

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