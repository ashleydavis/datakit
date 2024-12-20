# datakit

Simple toolkit for reading and writing data CSV and JSON files in JavaScript and TypeScript under Node.js.

[API docs](./docs/README.md)

[CLI docs](./docs/cli.md)

[Support my work](https://www.codecapers.com.au/about#support-my-work)

## Install

Install using npm:

```bash
npm install --save datakit
```

Install globally for the command line tools:

```bash
npm install -g datakit
```

## Read and write CSV files (JavaScript)

Ready to see some code?

Here's an example of transforming a CSV file using JavaScript:

```javascript
const { readCsv, writeCsv } = require("datakit");

function transform(record) {
    // Your function to transform a data record.
}

async function main() {
    const data = await readCsv("./some/file.csv");
    const transformed = data.map(transform);
    await writeCsv("./an/output/file.csv", transformed);
}

main()
    .then(() => console.log("Done"))
    .catch(err => {
        console.error("Something went wrong.");
        console.error(err && err.stack || err);
    });
```

## Read and write JSON files (TypeScript)

Here's a similar code example using TypeScript.

This time we are reading and writing JSON files:

```typescript
import { readJson, writeJson } from "datakit";

function transform(record: InputT): OutputT {
    // Your function to transform a data record.
}

async function main(): Promise<void> {
    const data = await readJson("./some/file.json");
    const transformed = data.map(transform);
    await writeJson("./an/output/file.json", transformed);
}

main()
    .then(() => console.log("Done"))
    .catch(err => {
        console.error("Something went wrong.");
        console.error(err && err.stack || err);
    });
```

You can also read and write YAML files using similar functions.

## Need to do more?

Consider using [Data-Forge](http://data-forge-js.com/) for data transformation, analysis and visualization in JavaScript and TypeScript.

## Support the developer 

<a target="_blank" href="https://www.codecapers.com.au/about#support-my-work">Click here to **support the developer.**</a>
