[datakit](../README.md) / ICsvInputConfig

# Interface: ICsvInputConfig

Configuration for CSV deserialization.

## Table of contents

### Properties

- [columnNames](ICsvInputConfig.md#columnnames)
- [dynamicTyping](ICsvInputConfig.md#dynamictyping)
- [parser](ICsvInputConfig.md#parser)
- [skipEmptyLines](ICsvInputConfig.md#skipemptylines)

## Properties

### columnNames

• `Optional` **columnNames**: `string`[]

Optionally specifies the column names (when enabled, assumes that the header row is not read from the CSV data).
Default: undefined

#### Defined in

[index.ts:111](https://github.com/ashleydavis/datakit/blob/4dc37ce/src/index.ts#L111)

___

### dynamicTyping

• `Optional` **dynamicTyping**: `boolean`

Automatically pick types based on what the value looks like.
Default: false.

#### Defined in

[index.ts:117](https://github.com/ashleydavis/datakit/blob/4dc37ce/src/index.ts#L117)

___

### parser

• `Optional` **parser**: [`IColumnParserConfig`](IColumnParserConfig.md)

Configure parsing for named columns in the CSV data.

#### Defined in

[index.ts:105](https://github.com/ashleydavis/datakit/blob/4dc37ce/src/index.ts#L105)

___

### skipEmptyLines

• `Optional` **skipEmptyLines**: `boolean`

Skip empty lines in the input.
Default: true

#### Defined in

[index.ts:123](https://github.com/ashleydavis/datakit/blob/4dc37ce/src/index.ts#L123)
