# Commands

Use `--help` for each command to display help for it on the command line.

For example:

```bash
map --help
```

- [length](#length)
- [map](#map)

# length

Gets the number of records in a dataset.

## Syntax

```bash
length <input-file>
```

## Inputs

Input can be one of the following:

- JSON file
- CSV file
- Yaml file
- JSON formatted array on standard input.

## Outputs

Output can be one of the following:

- Prints the number of records in the input dataset.

## Arguments

- **input-file** - Can be an input file name (json, csv or  yaml) or a hypen to indicate reading JSON data from standard input.

## Examples

### Reads JSON data from standard input, outputs the number of records

```bash
command-that-produces-json | length -
```
### Reads data from a file, outputs the number of records

```bash
length input-file.csv
```
# map

Creates an output dataset by calling the transformer function on every record of the input dataset.

## Syntax

```bash
map <input-file> <transformer-fn> [<output-file>]
```

## Inputs

Input can be one of the following:

- JSON file
- CSV file
- Yaml file
- JSON formatted array on standard input.

## Outputs

Output can be one of the following:

- JSON file
- CSV file
- Yaml file
- JSON formatted array on standard output.

## Arguments

- **input-file** - Can be an input file name (json, csv or  yaml) or a hypen to indicate reading JSON data from standard input.
- **transformer-fn** - A JavaScript function to transform each record of the input dataset. Specifying a file name will load the JavaScript from the file.
- **output-file** - The name of a file (json, csv or yaml) to output the resulting dataset to. Omitting this causes the output to written to standard output instead of a file.

## Examples

### Reads JSON data from standard input, applies the transformation and writes to standard output

```bash
command-that-produces-json | map - "r => r.x"
```
### Reads data from a file, applies the transformation and writes to standard output

```bash
map input-file.csv "r -> r.x"
```
### Reads data from a file, applies the transformation and writes output to another file

```bash
map input-file.csv "r -> r.x" output-file.csv
```
### Loads a JavaScript file for the transformation

```bash
map input-file.csv my-transformation.js
```
