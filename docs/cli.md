# Installation

Install globally for the command line tools:

```bash
npm install -g datakit
```

# Help

Use `--help` for each command to display help for it on the command line.

For example:

```bash
map --help
```

# Commands

- [filter](#filter)
- [format-table](#format-table)
- [format-tree](#format-tree)
- [length](#length)
- [map](#map)
- [transform](#transform)

# filter

Creates an output dataset by filtering the input dataset through the predicate function. Works just like `array.filter` in JavaScript.

## Syntax

```bash
filter <input-file> <predicate-fn> [<output-file>]
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
- **predicate-fn** - A JavaScript predicate function that is passed each record in the dataset and returns true/truthy to keep the record or false/falsy to rmeove the record. Specifying a file name will load the JavaScript code from the file.
- **output-file** - The name of a file (json, csv or yaml) to output the resulting dataset to. Omitting this causes JSON output to be written to standard output.

## Examples

### Reads JSON data from standard input, applies the filter and writes to standard output

```bash
command-that-produces-json | filter - "record => record.id === '1234'"
```
### Reads data from a file, applies the filter and writes to standard output

```bash
filter input-file.csv "record => record.id === '1234'"
```
### Reads data from a file, applies the filter and writes output to another file

```bash
filter input-file.csv "record => record.id === '1234'" output-file.csv
```
### Loads a JavaScript file for the filter function

```bash
filter input-file.csv my-filter.js output-file.csv
```
# format-table

Formats JSON data to table rendered in ascii.

## Syntax

```bash
format-table <input-file>
```

## Inputs

Input can be one of the following:

- JSON file
- CSV file
- Yaml file
- JSON formatted array on standard input.

## Outputs

Output can be one of the following:

- A table rendered in ascii output to standard output.

## Arguments

- **input-file** - Can be an input file name (json, csv or  yaml) or a hypen to indicate reading JSON data from standard input.

## Examples

### Reads JSON data from standard input, renders the data to an ascii table on standard output

```bash
command-that-produces-json | format-table -
```
### Reads data from a JSON file, renders the data to an ascii table on standard output

```bash
format-table input-file.json
```
### Reads data from a Yaml file, renders the data to an ascii table on standard output

```bash
format-table input-file.yaml
```
# format-tree

Formats JSON data to tree rendered in ascii.

## Syntax

```bash
format-tree <input-file>
```

## Inputs

Input can be one of the following:

- JSON file
- CSV file
- Yaml file
- JSON formatted array on standard input.

## Outputs

Output can be one of the following:

- A tree rendered in ascii output to standard output.

## Arguments

- **input-file** - Can be an input file name (json, csv or  yaml) or a hypen to indicate reading JSON data from standard input.

## Examples

### Reads JSON data from standard input, renders the data to an ascii tree on standard output

```bash
command-that-produces-json | format-tree -
```
### Reads data from a JSON file, renders the data to an ascii tree on standard output

```bash
format-tree input-file.json
```
### Reads data from a Yaml file, renders the data to an ascii tree on standard output

```bash
format-tree input-file.yaml
```
# length

Gets the number of records in a dataset. Works just like `array.length` in JavaScript.

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

Creates an output dataset by calling the transformer function on every record of the input dataset. Works just like `array.map` in JavaScript.

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
- **transformer-fn** - A JavaScript function to transform each record of the input dataset. Specifying a file name will load the JavaScript code from the file.
- **output-file** - The name of a file (json, csv or yaml) to output the resulting dataset to. Omitting this causes JSON output to be written to standard output.

## Examples

### Reads JSON data from standard input, applies the transformation and writes to standard output

```bash
command-that-produces-json | map - "record => record.x"
```
### Reads data from a file, applies the transformation and writes to standard output

```bash
map input-file.csv "record => record.x"
```
### Reads data from a file, applies the transformation and writes output to another file

```bash
map input-file.csv "record => record.x" output-file.csv
```
### Loads a JavaScript file for the transformation

```bash
map input-file.csv my-transformation.js
```
# transform

Transforms an entire dataset through a user defined function.

## Syntax

```bash
transform <input-file> <transformer-fn> [<output-file>]
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
- **transformer-fn** - A JavaScript function to transform the input dataset. Specifying a file name will load the JavaScript code from the file.
- **output-file** - The name of a file (json, csv or yaml) to output the resulting dataset to. Omitting this causes JSON output to be written to standard output.

## Examples

### Reads JSON data from standard input, applies the transformation and writes to standard output

```bash
command-that-produces-json | transform - "dataset => transform(dataset)"
```
### Reads data from a file, applies the transformation and writes to standard output

```bash
transform input-file.csv "dataset => transform(dataset)"
```
### Reads data from a file, applies the transformation and writes output to another file

```bash
transform input-file.csv "dataset => transform(dataset)" output-file.csv
```
### Loads a JavaScript file for the transformation

```bash
transform input-file.csv my-transformation.js
```
