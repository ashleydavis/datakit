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
- [from-csv](#from-csv)
- [from-yaml](#from-yaml)
- [group](#group)
- [intersect](#intersect)
- [length](#length)
- [map](#map)
- [to-csv](#to-csv)
- [to-yaml](#to-yaml)
- [transform](#transform)

# filter

Creates an output dataset by filtering the input dataset through the predicate function. Works just like `array.filter` in JavaScript.

## Syntax

```bash
filter <input-file> <predicate-fn> [<output-file>]
```

## Inputs

Input can be 1 of the following:

- JSON file
- CSV file
- YAML file
- JSON formatted array on standard input.

## Outputs

Output can be one of the following:

- JSON file
- CSV file
- YAML file
- JSON formatted array on standard output.

## Arguments

- **input-file** - Can be an input file name (json, csv or yaml) or a hypen to indicate reading JSON data from standard input.
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

Formats data to table rendered in ascii.

## Syntax

```bash
format-table <input-file>
```

## Inputs

Input can be 1 of the following:

- JSON file
- CSV file
- YAML file
- JSON formatted array on standard input.

## Outputs

Output can be one of the following:

- A table rendered in ascii output to standard output.

## Arguments

- **input-file** - Can be an input file name (json, csv or yaml) or a hypen to indicate reading JSON data from standard input.


## Examples

### Reads JSON data from standard input, renders the data to an ascii table on standard output

```bash
command-that-produces-json | format-table -
```
### Reads data from a JSON file, renders the data to an ascii table on standard output

```bash
format-table input-file.json
```
### Reads data from a YAML file, renders the data to an ascii table on standard output

```bash
format-table input-file.yaml
```
# format-tree

Formats data to tree rendered in ascii.

## Syntax

```bash
format-tree <input-file>
```

## Inputs

Input can be 1 of the following:

- JSON file
- CSV file
- YAML file
- JSON formatted array on standard input.

## Outputs

Output can be one of the following:

- A tree rendered in ascii output to standard output.

## Arguments

- **input-file** - Can be an input file name (json, csv or yaml) or a hypen to indicate reading JSON data from standard input.


## Examples

### Reads JSON data from standard input, renders the data to an ascii tree on standard output

```bash
command-that-produces-json | format-tree -
```
### Reads data from a JSON file, renders the data to an ascii tree on standard output

```bash
format-tree input-file.json
```
### Reads data from a YAML file, renders the data to an ascii tree on standard output

```bash
format-tree input-file.yaml
```
# from-csv

Converts data from the CSV (comma separated values) data format to the JSON data format.

## Syntax

```bash
from-csv <csv-input-file> [<output-file>]
```

## Inputs

Input can be 1 of the following:

- CSV file
- CSV formatted data on standard input

## Outputs

Output can be one of the following:

- JSON file
- CSV file
- YAML file
- JSON formatted array on standard output.

## Arguments

- **input-file** - Can be an input file name (must be a CSV file) or a hypen to indicate reading CSV data from standard input.
- **output-file** - The name of a file (json, csv or yaml) to output the resulting dataset to. Omitting this causes JSON output to be written to standard output.


## Examples

### Reads CSV data from standard input and writes JSON data to standard output

```bash
command-that-produces-csv | from-csv -
```
### Reads data from a CSV file and writes JSON data to standard output

```bash
from-csv input-file.csv
```
### Reads data from a CSV file and writes output to a YAML data file

```bash
from-csv input-file.csv output-file.yaml
```
### Reads data from a CSV file and writes output to a Json data file

```bash
from-csv input-file.csv output-file.json
```
# from-yaml

Converts data from the YAML data format to the JSON data format.

## Syntax

```bash
from-yaml <yaml-input-file> [<output-file>]
```

## Inputs

Input can be 1 of the following:

- YAML file
- YAML formatted data on standard input

## Outputs

Output can be one of the following:

- JSON file
- CSV file
- YAML file
- JSON formatted array on standard output.

## Arguments

- **input-file** - Can be an input file name (must be a YAML file) or a hypen to indicate reading YAML data from standard input.
- **output-file** - The name of a file (json, csv or yaml) to output the resulting dataset to. Omitting this causes JSON output to be written to standard output.


## Examples

### Reads YAML data from standard input and writes JSON data to standard output

```bash
command-that-produces-yaml | from-yaml -
```
### Reads data from a YAML file and writes JSON data to standard output

```bash
from-yaml input-file.yaml
```
### Reads data from a YAML file and writes output to a CSV data file

```bash
from-yaml input-file.yaml output-file.csv
```
### Reads data from a YAML file and writes output to a JSON data file

```bash
from-yaml input-file.yaml output-file.json
```
# group

Organises records from an input dataset into groups based on a key.

## Syntax

```bash
group <input-file> <key-selector-fn> [<output-file>]
```

## Inputs

Input can be 1 of the following:

- JSON file
- CSV file
- YAML file
- JSON formatted array on standard input.

## Outputs

Output can be one of the following:

- JSON file
- CSV file
- YAML file
- JSON formatted array on standard output.

## Arguments

- **input-file** - Can be an input file name (json, csv or yaml) or a hypen to indicate reading JSON data from standard input.
- **key-selector-fn** - A JavaScript function to select the grouping key for each record of the input dataset. Specifying a file name will load the JavaScript code from the file.
- **output-file** - The name of a file (json, csv or yaml) to output the resulting dataset to. Omitting this causes JSON output to be written to standard output.


## Examples

### Reads JSON data from standard input, groups by &quot;department&quot; and writes the groups to standard output

```bash
command-that-produces-json | group - "record => record.department"
```
### Reads data from a file, groups by &quot;department&quot; and writes the groups to standard output

```bash
group input-file.csv "record => record.department"
```
### Reads data from a file, groups by &quot;department&quot; and counts total sales, writing the output to a file

```bash
group input-file.csv "r => r.department" | map - "g => ({ department: g.key, totalSales: g.records.length })" output-file.csv
```
# intersect

Aggregates two data sets with common keys kind of like an SQL join.

## Syntax

```bash
intersect <left-input-file> <left-key-selector-fn> <right-input-file> <right-key-selector-fn> <merge-fn> [<output-file>]
```

## Inputs

Input can be 2 of the following:

- JSON file
- CSV file
- YAML file
- JSON formatted array on standard input.

## Outputs

Output can be one of the following:

- JSON file
- CSV file
- YAML file
- JSON formatted array on standard output.

## Arguments

- **left-input-file** - Can be an input file name (json, csv or yaml) or a hypen to indicate reading JSON data from standard input.
- **left-key-selector-fn** - A JavaScript function to select the join key for each record of the left dataset. Specifying a file name will load the JavaScript code from the file.
- **right-input-file** - Can be an input file name (json, csv or yaml) or a hypen to indicate reading JSON data from standard input.
- **right-key-selector-fn** - A JavaScript function to select the join key for each record of the right dataset. Specifying a file name will load the JavaScript code from the file.
- **merge-fn** - A JavaScript function to merge records from left and right datasets. Specifying a file name will load the JavaScript code from the file.
- **output-file** - The name of a file (json, csv or yaml) to output the resulting dataset to. Omitting this causes JSON output to be written to standard output.

## Notes

- You can only read input data from standard input from one of the left or right datasets.

## Examples

### Reads two JSON files and merges the datasets based on the &quot;email&quot; field, writes output to a JSON file

```bash
intersect left-input.json "r => r.email" right-input.json "r => r.email" "(left, right) => ({ ...left, ...right })" output.json
```
# length

Gets the number of records in a dataset. Works just like `array.length` in JavaScript.

## Syntax

```bash
length <input-file>
```

## Inputs

Input can be 1 of the following:

- JSON file
- CSV file
- YAML file
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

Input can be 1 of the following:

- JSON file
- CSV file
- YAML file
- JSON formatted array on standard input.

## Outputs

Output can be one of the following:

- JSON file
- CSV file
- YAML file
- JSON formatted array on standard output.

## Arguments

- **input-file** - Can be an input file name (json, csv or yaml) or a hypen to indicate reading JSON data from standard input.
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
# to-csv

Converts data from the JSON data format to the CSV data format.

## Syntax

```bash
to-csv <input-file> [<csv-output-file>]
```

## Inputs

Input can be 1 of the following:

- JSON file
- CSV file
- YAML file
- JSON formatted array on standard input.

## Outputs

Output can be one of the following:

- CSV file
- CSV formatted data on standard output

## Arguments

- **input-file** - Can be an input file name (json, csv or yaml) or a hypen to indicate reading JSON data from standard input.
- **csv-output-file** - The name of a file (must be a CSV file) to output the resulting dataset to. Omitting this causes CSV data to be written to standard output.


## Examples

### Reads JSON data from standard input and writes CSV data to standard output

```bash
command-that-produces-json | to-csv -
```
### Reads JSON data from standard input and writes a CSV data file

```bash
command-that-produces-json | to-csv output-file.csv
```
### Reads a JSON data file and writes a CSV data file

```bash
to-csv input-file.json output-file.csv
```
### Reads a YAML data file and writes a CSV data file

```bash
to-csv input-file.yaml output-file.csv
```
# to-yaml

Converts data from the JSON data format to the YAML data format.

## Syntax

```bash
to-yaml <input-file> [<yaml-output-file>]
```

## Inputs

Input can be 1 of the following:

- JSON file
- CSV file
- YAML file
- JSON formatted array on standard input.

## Outputs

Output can be one of the following:

- YAML file
- YAML formatted data on standard output

## Arguments

- **input-file** - Can be an input file name (json, csv or yaml) or a hypen to indicate reading JSON data from standard input.
- **yaml-output-file** - The name of a file (must be a YAML file) to output the resulting dataset to. Omitting this causes YAML data to be written to standard output.


## Examples

### Reads JSON data from standard input and writes YAML data to standard output

```bash
command-that-produces-json | to-yaml -
```
### Reads JSON data from standard input and writes a YAML data file

```bash
command-that-produces-json | to-yaml output-file.yaml
```
### Reads a JSON data file and writes a YAML data file

```bash
to-yaml input-file.json output-file.yaml
```
### Reads a CSV data file and writes a YAML data file

```bash
to-yaml input-file.csv output-file.yaml
```
# transform

Transforms an entire dataset through a user defined function.

## Syntax

```bash
transform <input-file> <transformer-fn> [<output-file>]
```

## Inputs

Input can be 1 of the following:

- JSON file
- CSV file
- YAML file
- JSON formatted array on standard input.

## Outputs

Output can be one of the following:

- JSON file
- CSV file
- YAML file
- JSON formatted array on standard output.

## Arguments

- **input-file** - Can be an input file name (json, csv or yaml) or a hypen to indicate reading JSON data from standard input.
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
