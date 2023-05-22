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

- [distinct](#distinct)
- [filter](#filter)
- [format-table](#format-table)
- [format-tree](#format-tree)
- [from-csv](#from-csv)
- [from-yaml](#from-yaml)
- [group](#group)
- [intersect](#intersect)
- [length](#length)
- [map](#map)
- [orderBy](#orderBy)
- [reduce](#reduce)
- [skip](#skip)
- [take](#take)
- [to-csv](#to-csv)
- [to-object](#to-object)
- [to-yaml](#to-yaml)
- [transform](#transform)

# distinct

Returns the set of distinct values from the input dataset. Removes duplicate values from the dataset.

## Syntax

```bash
distinct [<input-file>] [<output-file>]
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
- JSON formatted data on standard output.

## Arguments

- **input-file** - Can be an input file name (json, csv or yaml) or a hypen to indicate reading JSON data from standard input. Can be omitted if there are no further arguments.
- **output-file** - The name of a file (json, csv or yaml) to output the resulting dataset to. Omitting this causes JSON output to be written to standard output.


## Examples

### Reads JSON data from standard input, removes duplicate values and writes to standard output

```bash
command-that-produces-json | distinct -
```
### Reads data from a file, removes duplicate values and writes to standard output

```bash
distinct input-file.csv
```
### Reads data from a file, removes duplicate values and writes output to another file

```bash
distinct input-file.csv output-file.csv
```
# filter

Creates an output dataset by filtering the input dataset through the predicate function. Works just like `array.filter` in JavaScript.

## Syntax

```bash
filter <predicate-fn> [<input-file>] [<output-file>]
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
- JSON formatted data on standard output.

## Arguments

- **predicate-fn** - A JavaScript predicate function that is passed each record in the dataset and returns true/truthy to keep the record or false/falsy to rmeove the record. Specifying a file name will load the JavaScript code from the file.
- **input-file** - Can be an input file name (json, csv or yaml) or a hypen to indicate reading JSON data from standard input. Can be omitted if there are no further arguments.
- **output-file** - The name of a file (json, csv or yaml) to output the resulting dataset to. Omitting this causes JSON output to be written to standard output.


## Examples

### Reads JSON data from standard input, applies the filter and writes to standard output

```bash
command-that-produces-json | filter "record => record.id === '1234'"
```
### Reads data from a file, applies the filter and writes to standard output

```bash
filter "record => record.id === '1234'" input-file.csv
```
### Reads data from a file, applies the filter and writes output to another file

```bash
filter "record => record.id === '1234'"  input-file.csv output-file.csv
```
### Reads JSON data from standard input, applies the filter and writes output to another file

```bash
command-that-produces-json | filter "record => record.id === '1234'" - output-file.csv
```
### Loads a JavaScript file for the filter function

```bash
filter --file my-filter.js input-file.csv output-file.csv
```
# format-table

Formats data to table rendered in ascii.

## Syntax

```bash
format-table [<input-file>]
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

- **input-file** - Can be an input file name (json, csv or yaml) or a hypen to indicate reading JSON data from standard input. Can be omitted if there are no further arguments.


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
format-tree [<input-file>]
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

- **input-file** - Can be an input file name (json, csv or yaml) or a hypen to indicate reading JSON data from standard input. Can be omitted if there are no further arguments.


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
from-csv [<csv-input-file>] [<output-file>]
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
- JSON formatted data on standard output.

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
from-yaml [<yaml-input-file>] [<output-file>]
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
- JSON formatted data on standard output.

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
group <key-selector-fn> [<input-file>] [<output-file>]
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
- JSON formatted data on standard output.

## Arguments

- **input-file** - Can be an input file name (json, csv or yaml) or a hypen to indicate reading JSON data from standard input. Can be omitted if there are no further arguments.
- **key-selector-fn** - A JavaScript function to select the grouping key for each record of the input dataset. Specifying a file name will load the JavaScript code from the file.
- **output-file** - The name of a file (json, csv or yaml) to output the resulting dataset to. Omitting this causes JSON output to be written to standard output.


## Examples

### Reads JSON data from standard input, groups by &quot;department&quot; and writes the groups to standard output

```bash
command-that-produces-json | group "record => record.department"
```
### Reads data from a file, groups by &quot;department&quot; and writes the groups to standard output

```bash
group "record => record.department" input-file.csv
```
### Reads data from a file, groups by &quot;department&quot; and counts total sales, writing the output to a file

```bash
group input-file.csv "r => r.department" | map - "g => ({ department: g.key, totalSales: g.records.length })" output-file.csv
```
# intersect

Aggregates two data sets with common keys kind of like an SQL join.

## Syntax

```bash
intersect <left-key-selector-fn> <left-input-file> <right-key-selector-fn> <right-input-file> <merge-fn> [<output-file>]
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
- JSON formatted data on standard output.

## Arguments

- **left-key-selector-fn** - A JavaScript function to select the join key for each record of the left dataset. Specifying a file name will load the JavaScript code from the file.
- **left-input-file** - Can be an input file name (json, csv or yaml) or a hypen to indicate reading JSON data from standard input. Can be omitted if there are no further arguments.
- **right-key-selector-fn** - A JavaScript function to select the join key for each record of the right dataset. Specifying a file name will load the JavaScript code from the file.
- **right-input-file** - Can be an input file name (json, csv or yaml) or a hypen to indicate reading JSON data from standard input. Can be omitted if there are no further arguments.
- **merge-fn** - A JavaScript function to merge records from left and right datasets. Specifying a file name will load the JavaScript code from the file.
- **output-file** - The name of a file (json, csv or yaml) to output the resulting dataset to. Omitting this causes JSON output to be written to standard output.

## Notes

- You can only read input data from standard input from one of the left or right datasets.

## Examples

### Reads two JSON files and merges the datasets based on the &quot;email&quot; field, writes output to a JSON file

```bash
intersect "r => r.email" left-input.json "r => r.email" right-input.json "(left, right) => ({ ...left, ...right })" output.json
```
# length

Gets the number of records in a dataset. Works just like `array.length` in JavaScript.

## Syntax

```bash
length [<input-file>]
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
map <transformer-fn> [<input-file>] [<output-file>]
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
- JSON formatted data on standard output.

## Arguments

- **transformer-fn** - A JavaScript function to transform each record of the input dataset. Specifying a file name will load the JavaScript code from the file.
- **input-file** - Can be an input file name (json, csv or yaml) or a hypen to indicate reading JSON data from standard input. Can be omitted if there are no further arguments.
- **output-file** - The name of a file (json, csv or yaml) to output the resulting dataset to. Omitting this causes JSON output to be written to standard output.


## Examples

### Reads JSON data from standard input, applies the transformation and writes to standard output

```bash
command-that-produces-json | map "record => record.x"
```
### Reads data from a file, applies the transformation and writes to standard output

```bash
map "record => record.x" input-file.csv
```
### Reads data from a file, applies the transformation and writes output to another file

```bash
map "record => record.x"  input-file.csv output-file.csv
```
### Reads JSON data from standard input, applies the transformation and writes output to another file

```bash
command-that-produces-json | map "record => record.x" - output-file.csv
```
### Loads a JavaScript file for the transformation

```bash
map --file my-transformation.js input-file.csv output-file.csv
```
# orderBy

Sorts the input dataset by the requested criteria and outputs the sorted dataset. Works a bit like `array.sort` in JavaScript, but really it's way more advanced.

## Syntax

```bash
orderBy (<sort-fn> [<sort-direction>])+ [<input-file>] [<output-file>]
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
- JSON formatted data on standard output.

## Arguments

- **sort-fn** - A JavaScript function to select the sort key from each record of the input dataset. Specifying a file name will load the JavaScript code from the file.
- **sort-direction** - Optional sort direction that may be &quot;ascending&quot; or &quot;descending&quot;. Defaults to &quot;ascending&quot;.
- **input-file** - Can be an input file name (json, csv or yaml) or a hypen to indicate reading JSON data from standard input. Can be omitted if there are no further arguments.
- **output-file** - The name of a file (json, csv or yaml) to output the resulting dataset to. Omitting this causes JSON output to be written to standard output.

## Notes

- The sort function and sort direction can be stacked up to create nested levels of sorting.

## Examples

### Reads JSON data from standard input, sorts by email and writes to standard output

```bash
command-that-produces-json | orderBy "record => record.email"
```
### Reads data from a file, sorts by email and writes to standard output

```bash
orderBy "record => record.email" input-file.csv 
```
### Reads data from a file, sorts by email and writes output to another file

```bash
orderBy "record => record.email" input-file.csv output-file.csv
```
### Loads the sort function from a JavaScript file

```bash
orderBy --file my-sort-fn.js input-file.csv
```
### Reads JSON data from standard input, sorts by name and then by age (a nested sort) and writes to standard output

```bash
orderBy "r => r.email" "r => r.age" - output-file.csv
```
### Reads JSON data from standard input, sorts by age (oldest to youngest) and writes to standard output

```bash
orderBy "r => r.age" descending - output-file.csv
```
# reduce

Reduces or aggregates an input dataset to some output value by repeatedly calling the reducer function on every record of the input. Works just like `array.reduce` in JavaScript.

## Syntax

```bash
reduce <reducer-fn> <seed-value> [<input-file>] [<output-file>]
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
- JSON formatted data on standard output.

## Arguments

- **reducer-fn** - A JavaScript &quot;reducer&quot; function called for each record of the input dataset. Specifying a file name will load the JavaScript code from the file.
- **seed-value** - JSON value that is used as the initial accumulator value for the reduction.
- **input-file** - Can be an input file name (json, csv or yaml) or a hypen to indicate reading JSON data from standard input. Can be omitted if there are no further arguments.
- **output-file** - The name of a file (json, csv or yaml) to output the resulting dataset to. Omitting this causes JSON output to be written to standard output.


## Examples

### Reads JSON data from standard input, applies the reduction to compute total sales and writes to standard output

```bash
command-that-produces-json | reduce "(a, r) => a + r.sales" 0
```
### Reads data from a file, applies the reduction and writes to standard output

```bash
reduce "(a, r) => a + r.sales" 0 input-file.json
```
### Reads data from a file, applies the reduction and writes output to another file

```bash
reduce "(a, r) => a + r.sales" 0 input-file.csv output-file.csv
```
### Reads JSON data from standard input, applies the reduction and writes output to another file

```bash
command-that-produces-json | reduce "(a, r) => a + r.sales" 0 - output-file.csv
```
### Loads a JavaScript file for the transformation

```bash
reduce input-file.yaml my-reducer.js 0
```
# skip

Skips the first X records of the input dataset and writes the remaining records to the output dataset.

## Syntax

```bash
skip <skip-number> [<input-file>] [<output-file>]
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
- JSON formatted data on standard output.

## Arguments

- **skip-number** - The number of records to skip.
- **input-file** - Can be an input file name (json, csv or yaml) or a hypen to indicate reading JSON data from standard input. Can be omitted if there are no further arguments.
- **output-file** - The name of a file (json, csv or yaml) to output the resulting dataset to. Omitting this causes JSON output to be written to standard output.


## Examples

### Reads JSON data from standard input, skips 3 records and writes remaining records to standard output

```bash
command-that-produces-json | skip 3
```
### Reads data from a file, skips 3 records and writes remaining records to standard output

```bash
skip 3 input-file.csv
```
### Reads data from a file, skips 3 records and writes remaining records to another file

```bash
skip 3  input-file.csv output-file.csv
```
### Reads JSON data from standard input, skips 3 records and writes remaining records to a file

```bash
command-that-produces-json | skip 3 - output-file.csv
```
# take

Takes the first X records of the input dataset and writes them to the output dataset.

## Syntax

```bash
take <take-number> [<input-file>] [<output-file>]
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
- JSON formatted data on standard output.

## Arguments

- **take-number** - The number of records to take.
- **input-file** - Can be an input file name (json, csv or yaml) or a hypen to indicate reading JSON data from standard input. Can be omitted if there are no further arguments.
- **output-file** - The name of a file (json, csv or yaml) to output the resulting dataset to. Omitting this causes JSON output to be written to standard output.


## Examples

### Reads JSON data from standard input, takes 3 records and writes them to standard output

```bash
command-that-produces-json | take 3
```
### Reads data from a file, takes 3 records and writes them to standard output

```bash
take 3 input-file.csv
```
### Reads data from a file, takes 3 records and writes them to another file

```bash
take 3 input-file.csv output-file.csv
```
### Reads JSON data from standard input, takes 3 records and writes them to a file

```bash
command-that-produces-json | take 3 - output-file.csv
```
# to-csv

Converts data from the JSON data format to the CSV data format.

## Syntax

```bash
to-csv [<input-file>] [<csv-output-file>]
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

- **input-file** - Can be an input file name (json, csv or yaml) or a hypen to indicate reading JSON data from standard input. Can be omitted if there are no further arguments.
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
# to-object

Creates a JSON object from key/value pairs extracted from the input dataset.

## Syntax

```bash
to-object <key-selector-fn> <value-selector-fn> [<input-file>] [<output-file>]
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
- YAML file
- JSON formatted data on standard output.

## Arguments

- **key-selector-fn** - A JavaScript function to select the key from each record of the input dataset. Specifying a file name will load the JavaScript code from the file.
- **value-selector-fn** - A JavaScript function to select the value from each record of the input dataset. Specifying a file name will load the JavaScript code from the file.
- **input-file** - Can be an input file name (json, csv or yaml) or a hypen to indicate reading JSON data from standard input. Can be omitted if there are no further arguments.
- **output-file** - The name of a file (json, csv or yaml) to output the resulting dataset to. Omitting this causes JSON output to be written to standard output.

## Notes

- Unlike many other datakit commands the to-object command cannot output to the CSV format.

## Examples

### Reads JSON data from standard input and writes the JSON object to standard output

```bash
command-that-produces-json | to-object "r => r.key" "r => r.value"
```
### Reads data from a file and writes the JSON object to standard output

```bash
to-object "r => r.key" "r => r.value"  input-file.csv
```
### Reads data from a file and writes the JSON object to a file

```bash
to-object "r => r.key" "r => r.value" input-file.csv output-file.json
```
### Loads JavaScript files for the key and value selector functions

```bash
to-object --file my-key-selector.js --file my-value-selector.js input-file.csv
```
### Reads JSON data from standard inputand writes the JSON object to a file

```bash
to-object "r => r.key" "r => r.value" - output-file.json
```
# to-yaml

Converts data from the JSON data format to the YAML data format.

## Syntax

```bash
to-yaml [<input-file>] [<yaml-output-file>]
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

- **input-file** - Can be an input file name (json, csv or yaml) or a hypen to indicate reading JSON data from standard input. Can be omitted if there are no further arguments.
- **yaml-output-file** - The name of a file (must be a YAML file) to output the resulting dataset to. Omitting this causes YAML data to be written to standard output.


## Examples

### Reads JSON data from standard input and writes YAML data to standard output

```bash
command-that-produces-json | to-yaml
```
### Reads JSON data from standard input and writes a YAML data file

```bash
command-that-produces-json | to-yaml - output-file.yaml
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
transform <transformer-fn> [<input-file>] [<output-file>]
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
- JSON formatted data on standard output.

## Arguments

- **transformer-fn** - A JavaScript function to transform the input dataset. Specifying a file name will load the JavaScript code from the file.
- **input-file** - Can be an input file name (json, csv or yaml) or a hypen to indicate reading JSON data from standard input. Can be omitted if there are no further arguments.
- **output-file** - The name of a file (json, csv or yaml) to output the resulting dataset to. Omitting this causes JSON output to be written to standard output.


## Examples

### Reads JSON data from standard input, applies the transformation and writes to standard output

```bash
command-that-produces-json | transform "dataset => transform(dataset)"
```
### Reads data from a file, applies the transformation and writes to standard output

```bash
transform "dataset => transform(dataset)" input-file.csv
```
### Reads data from a file, applies the transformation and writes output to another file

```bash
transform "dataset => transform(dataset)" input-file.csv output-file.csv
```
### Reads JSON data from standard input, applies the transformation and writes output to a file

```bash
command-that-produces-json | transform "dataset => transform(dataset)" - output-file.csv
```
### Loads a JavaScript file for the transformation

```bash
transform --file my-transformation.js input-file.csv
```
