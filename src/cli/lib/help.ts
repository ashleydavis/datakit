
export const standardCmdInputs = [
    "JSON file",
    "CSV file", 
    "Yaml file",
    "JSON formatted array on standard input.",
];

export const standardCmdOutputs = [
    "JSON file",
    "CSV file", 
    "Yaml file",
    "JSON formatted array on standard output.",
];

export const standardInputFileHelp = {
    name: "input-file",
    desc: "Can be an input file name (json, csv or  yaml) or a hypen to indicate reading JSON data from standard input.",
};

export const standardOutputFileHelp = {
    name: "output-file",
    desc: "The name of a file (json, csv or yaml) to output the resulting dataset to. Omitting this causes JSON output to be written to standard output.",
};