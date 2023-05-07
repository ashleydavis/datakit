[datakit](../README.md) / ICsvOutputConfig

# Interface: ICsvOutputConfig

Configuration for CSV serialization.

## Table of contents

### Properties

- [columnNames](ICsvOutputConfig.md#columnnames)
- [formatter](ICsvOutputConfig.md#formatter)
- [header](ICsvOutputConfig.md#header)

## Properties

### columnNames

• `Optional` **columnNames**: `string`[]

Names of columns to output.

#### Defined in

[index.ts:525](https://github.com/data-forge-notebook/datakit/blob/a275a26/src/index.ts#L525)

___

### formatter

• `Optional` **formatter**: [`IColumnFormatterConfig`](IColumnFormatterConfig.md)

Configures formatting for named columns in the CSV data.

#### Defined in

[index.ts:514](https://github.com/data-forge-notebook/datakit/blob/a275a26/src/index.ts#L514)

___

### header

• `Optional` **header**: `boolean`

Enable or disable output of the CSV header line.
Defaults to true.

#### Defined in

[index.ts:520](https://github.com/data-forge-notebook/datakit/blob/a275a26/src/index.ts#L520)
