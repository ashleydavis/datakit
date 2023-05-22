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

[index.ts:521](https://github.com/data-forge-notebook/datakit/blob/90dde73/src/index.ts#L521)

___

### formatter

• `Optional` **formatter**: [`IColumnFormatterConfig`](IColumnFormatterConfig.md)

Configures formatting for named columns in the CSV data.

#### Defined in

[index.ts:510](https://github.com/data-forge-notebook/datakit/blob/90dde73/src/index.ts#L510)

___

### header

• `Optional` **header**: `boolean`

Enable or disable output of the CSV header line.
Defaults to true.

#### Defined in

[index.ts:516](https://github.com/data-forge-notebook/datakit/blob/90dde73/src/index.ts#L516)
