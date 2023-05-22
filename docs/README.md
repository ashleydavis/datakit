datakit

# datakit

## Table of contents

### Interfaces

- [IColumnFormatterConfig](interfaces/IColumnFormatterConfig.md)
- [IColumnParserConfig](interfaces/IColumnParserConfig.md)
- [ICsvInputConfig](interfaces/ICsvInputConfig.md)
- [ICsvOutputConfig](interfaces/ICsvOutputConfig.md)
- [IFieldDesc](interfaces/IFieldDesc.md)
- [IFieldFormatterConfig](interfaces/IFieldFormatterConfig.md)
- [IFieldParserConfig](interfaces/IFieldParserConfig.md)
- [IJsonInputConfig](interfaces/IJsonInputConfig.md)
- [IJsonOutputConfig](interfaces/IJsonOutputConfig.md)

### Functions

- [fromCsv](README.md#fromcsv)
- [fromJson](README.md#fromjson)
- [fromObject](README.md#fromobject)
- [fromYaml](README.md#fromyaml)
- [readCsv](README.md#readcsv)
- [readCsvSync](README.md#readcsvsync)
- [readFile](README.md#readfile)
- [readJson](README.md#readjson)
- [readJsonSync](README.md#readjsonsync)
- [readYaml](README.md#readyaml)
- [readYamlSync](README.md#readyamlsync)
- [toCsv](README.md#tocsv)
- [toJson](README.md#tojson)
- [toYaml](README.md#toyaml)
- [writeCsv](README.md#writecsv)
- [writeCsvSync](README.md#writecsvsync)
- [writeFile](README.md#writefile)
- [writeJson](README.md#writejson)
- [writeJsonSync](README.md#writejsonsync)
- [writeYaml](README.md#writeyaml)
- [writeYamlSync](README.md#writeyamlsync)

## Functions

### fromCsv

▸ **fromCsv**<`RecordT`\>(`csvTextString`, `config?`): `RecordT`[]

Deserialize CSV text to a JavaScript array.
Each element of the array contains fields that match the columns from the CSV data.

#### Type parameters

| Name |
| :------ |
| `RecordT` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `csvTextString` | `string` | The CSV text to deserialize. |
| `config?` | [`ICsvInputConfig`](interfaces/ICsvInputConfig.md) | Optional configuration options for parsing the CSV data. |

#### Returns

`RecordT`[]

Returns an array of JavaScript objects that were deserialized from the CSV text.

#### Defined in

[index.ts:135](https://github.com/data-forge-notebook/datakit/blob/90dde73/src/index.ts#L135)

___

### fromJson

▸ **fromJson**<`RecordT`\>(`jsonTextString`, `config?`): `RecordT`[]

Deserialize JSON text to a JavaScript array.

#### Type parameters

| Name |
| :------ |
| `RecordT` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `jsonTextString` | `string` | The JSON text to deserialize. |
| `config?` | [`IJsonInputConfig`](interfaces/IJsonInputConfig.md) | - |

#### Returns

`RecordT`[]

Returns an array of JavaScript objects that were deserialized from the JSON text.

#### Defined in

[index.ts:64](https://github.com/data-forge-notebook/datakit/blob/90dde73/src/index.ts#L64)

___

### fromObject

▸ **fromObject**(`obj`): [`IFieldDesc`](interfaces/IFieldDesc.md)[]

Convert a regular JavaScript object to 'tablular data'.
Each element of the matches a field from the object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `any` | The JavaScript object to convert to a dataframe. |

#### Returns

[`IFieldDesc`](interfaces/IFieldDesc.md)[]

Returns an array with an element describing each field.

#### Defined in

[index.ts:30](https://github.com/data-forge-notebook/datakit/blob/90dde73/src/index.ts#L30)

___

### fromYaml

▸ **fromYaml**<`RecordT`\>(`yamlTextString`): `RecordT`[]

Deserialize YAML text to a JavaScript array.

#### Type parameters

| Name |
| :------ |
| `RecordT` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `yamlTextString` | `string` | The YAML text to deserialize. |

#### Returns

`RecordT`[]

Returns an array of JavaScript objects that were deserialized from the YAML text.

#### Defined in

[index.ts:217](https://github.com/data-forge-notebook/datakit/blob/90dde73/src/index.ts#L217)

___

### readCsv

▸ **readCsv**<`RecordT`\>(`filePath`, `config?`): `Promise`<`RecordT`[]\>

Asynchronously deserialize a CSV file to a JavaScript array.
Each element of the array contains fields that match the columns from the CSV file.

**`Example`**

```ts
<pre>

const data = await datakit.readCsv("my-data-file.csv");
console.log(data);
</pre>

const config = {
    dynamicTyping: true,
    // ... other options ...
};
const data = await datakit.readCsv("my-data-file.csv", config);
console.log(data);
</pre>
```

#### Type parameters

| Name |
| :------ |
| `RecordT` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filePath` | `string` | Path to the file to be loaded. |
| `config?` | [`ICsvInputConfig`](interfaces/ICsvInputConfig.md) | Optional configuration file for parsing. |

#### Returns

`Promise`<`RecordT`[]\>

Returns a promise for the loaded data.

#### Defined in

[index.ts:284](https://github.com/data-forge-notebook/datakit/blob/90dde73/src/index.ts#L284)

___

### readCsvSync

▸ **readCsvSync**<`RecordT`\>(`filePath`, `config?`): `RecordT`[]

Synchronously deserialize a CSV file to a JavaScript array.
Each element of the array contains fields that match the columns from the CSV file.

**`Example`**

```ts
<pre>

const data = datakit.readCsvSync("my-data-file.csv");
console.log(data);
</pre>
```

**`Example`**

```ts
<pre>

const config = {
    dynamicTyping: true,
    // ... other options ...
};
const data = datakit.readCsvSync("my-data-file.csv", config);
console.log(data);
</pre>
```

#### Type parameters

| Name |
| :------ |
| `RecordT` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filePath` | `string` | Path to the file to be loaded. |
| `config?` | [`ICsvInputConfig`](interfaces/ICsvInputConfig.md) | Optional configuration file for parsing. |

#### Returns

`RecordT`[]

Returns the loaded data.

#### Defined in

[index.ts:375](https://github.com/data-forge-notebook/datakit/blob/90dde73/src/index.ts#L375)

___

### readFile

▸ **readFile**(`filePath`): `Promise`<`string`\>

Like fs.readFile but returns a promise for the file data.

**`Example`**

```ts
<pre>

const data = await datakit.readFile("some-data-file.txt");
console.log(data);
</pre>
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filePath` | `string` | Path to the file to be loaded. |

#### Returns

`Promise`<`string`\>

A promise that is resolved with the contents of the file.

#### Defined in

[index.ts:241](https://github.com/data-forge-notebook/datakit/blob/90dde73/src/index.ts#L241)

___

### readJson

▸ **readJson**<`RecordT`\>(`filePath`): `Promise`<`RecordT`[]\>

Asynchronously deserialize a JSON file to a JavaScript array.

**`Example`**

```ts
<pre>

const data = await datakit.readJson("my-data-file.json");
console.log(data);
</pre>
```

#### Type parameters

| Name |
| :------ |
| `RecordT` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filePath` | `string` | Path to the file to be loaded. |

#### Returns

`Promise`<`RecordT`[]\>

Returns a promise for the loaded data.

#### Defined in

[index.ts:314](https://github.com/data-forge-notebook/datakit/blob/90dde73/src/index.ts#L314)

___

### readJsonSync

▸ **readJsonSync**<`RecordT`\>(`filePath`): `RecordT`[]

Synchronously deserialize a JSON file to a JavaScript array.

**`Example`**

```ts
<pre>

const data = datakit.readJsonSync("my-data-file.json");
console.log(data);
</pre>
```

#### Type parameters

| Name |
| :------ |
| `RecordT` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filePath` | `string` | Path to the file to be loaded. |

#### Returns

`RecordT`[]

Returns the loaded data.

#### Defined in

[index.ts:405](https://github.com/data-forge-notebook/datakit/blob/90dde73/src/index.ts#L405)

___

### readYaml

▸ **readYaml**<`RecordT`\>(`filePath`): `Promise`<`RecordT`[]\>

Asynchronously deserialize a YAML file to a JavaScript array.

**`Example`**

```ts
<pre>

const data = await datakit.readYaml("my-data-file.yaml");
console.log(data);
</pre>
```

#### Type parameters

| Name |
| :------ |
| `RecordT` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filePath` | `string` | Path to the file to be loaded. |

#### Returns

`Promise`<`RecordT`[]\>

Returns a promise for the loaded data.

#### Defined in

[index.ts:338](https://github.com/data-forge-notebook/datakit/blob/90dde73/src/index.ts#L338)

___

### readYamlSync

▸ **readYamlSync**<`RecordT`\>(`filePath`): `RecordT`[]

Synchronously deserialize a YAML file to a JavaScript array.

**`Example`**

```ts
<pre>

const data = datakit.readYamlSync("my-data-file.yaml");
console.log(data);
</pre>
```

#### Type parameters

| Name |
| :------ |
| `RecordT` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filePath` | `string` | Path to the file to be loaded. |

#### Returns

`RecordT`[]

Returns the loaded data.

#### Defined in

[index.ts:429](https://github.com/data-forge-notebook/datakit/blob/90dde73/src/index.ts#L429)

___

### toCsv

▸ **toCsv**(`input`, `config?`): `string`

Serialize a JavaScript array to the CSV data format.
Columns in the CSV file match fields from the objects in the array.

**`Example`**

```ts
<pre>

const data = [ ... JavaScript array of data ... ];
const csvData = datakit.toCsv(data);
console.log(csvData);
</pre>
```

**`Example`**

```ts
<pre>

const data = [ ... JavaScript array of data ... ];
const config = {
    header: false,
    // ... other options ...
};
const csvData = datakit.toCsv(data, config);
console.log(csvData);
</pre>
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `any`[] | The data to be serialized. |
| `config?` | [`ICsvOutputConfig`](interfaces/ICsvOutputConfig.md) | - |

#### Returns

`string`

Returns a string in the CSV data format that represents the data.

#### Defined in

[index.ts:552](https://github.com/data-forge-notebook/datakit/blob/90dde73/src/index.ts#L552)

___

### toJson

▸ **toJson**(`input`, `config?`): `string`

Serialize a JavaScript array to the JSON data format.

**`Example`**

```ts
<pre>

const data = ... JavaScript data ...;
const jsonData = datakit.toJson(data);
console.log(jsonData);
</pre>
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `any`[] | The data to be serialized. |
| `config?` | [`IJsonOutputConfig`](interfaces/IJsonOutputConfig.md) | - |

#### Returns

`string`

Returns a string in the JSON data format that represents the data.

#### Defined in

[index.ts:472](https://github.com/data-forge-notebook/datakit/blob/90dde73/src/index.ts#L472)

___

### toYaml

▸ **toYaml**(`input`): `string`

Serialize a JavaScript array to the YAML data format.

**`Example`**

```ts
<pre>

const data = [ ... JavaScript array of data ... ];
const yamlData = datakit.toYaml(data);
console.log(yamlData);
</pre>
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `any`[] | The data to be serialized. |

#### Returns

`string`

Returns a string in the YAML data format that represents the data.

#### Defined in

[index.ts:600](https://github.com/data-forge-notebook/datakit/blob/90dde73/src/index.ts#L600)

___

### writeCsv

▸ **writeCsv**(`filePath`, `input`, `config?`): `Promise`<`void`\>

Asynchronously serialize a JavaScript array to a CSV file.
The fields in the objects of the array become the columns in the CSV file.

**`Example`**

```ts
<pre>

const data = [ ... JavaScript array of data ... ];
await datakit.writeCsv("my-data-file.csv", data);
</pre>
```

**`Example`**

```ts
<pre>
const config = {
    // ... Options for serialization ...
};
const data = [ ... JavaScript array of data ... ];
await datakit.writeCsv("my-data-file.csv", config);
</pre>
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filePath` | `string` | Path to the file to be written. |
| `input` | `any`[] | - |
| `config?` | [`ICsvOutputConfig`](interfaces/ICsvOutputConfig.md) | Optional configuration file for parsing. |

#### Returns

`Promise`<`void`\>

Returns a promise that resolves when the file has been written.

#### Defined in

[index.ts:665](https://github.com/data-forge-notebook/datakit/blob/90dde73/src/index.ts#L665)

___

### writeCsvSync

▸ **writeCsvSync**(`filePath`, `input`, `config?`): `void`

Synchronously serialize a JavaScript array to a CSV file.
The fields in the objects of the array become the columns in the CSV file.

**`Example`**

```ts
<pre>

const data = [ ... JavaScript array of data ... ];
datakit.writeCsvSync("my-data-file.csv", data);
</pre>
```

**`Example`**

```ts
<pre>

const config = {
    // ... Options for serialization ...
};
const data = [ ... JavaScript array of data ... ];
datakit.writeCsvSync("my-data-file.csv", config);
</pre>
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filePath` | `string` | Path to the file to be written. |
| `input` | `any`[] | - |
| `config?` | [`ICsvOutputConfig`](interfaces/ICsvOutputConfig.md) | Optional configuration file for parsing. |

#### Returns

`void`

#### Defined in

[index.ts:708](https://github.com/data-forge-notebook/datakit/blob/90dde73/src/index.ts#L708)

___

### writeFile

▸ **writeFile**(`filePath`, `data`): `Promise`<`void`\>

Like fs.writeFile but returns a promise for completion of the asynchronous file write.

**`Example`**

```ts
<pre>

const data = "... JavaScript string with text data ...";
await datakit.writeFile("some-data-file.txt", data);
</pre>
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filePath` | `string` | Path to the file to be written. |
| `data` | `string` | Data to be written the to file. |

#### Returns

`Promise`<`void`\>

A promise that is resolved when the file has been written.

#### Defined in

[index.ts:621](https://github.com/data-forge-notebook/datakit/blob/90dde73/src/index.ts#L621)

___

### writeJson

▸ **writeJson**(`filePath`, `input`): `Promise`<`void`\>

Asynchronously serialize a JavaScript array to a JSON file.

**`Example`**

```ts
<pre>

const data = [ ... JavaScript array of data ... ];
await datakit.writeJson("my-data-file.json", data);
</pre>
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filePath` | `string` | Path to the file to be written. |
| `input` | `any`[] | - |

#### Returns

`Promise`<`void`\>

Returns a promise that resolves when the file has been written.

#### Defined in

[index.ts:742](https://github.com/data-forge-notebook/datakit/blob/90dde73/src/index.ts#L742)

___

### writeJsonSync

▸ **writeJsonSync**(`filePath`, `input`): `void`

Synchronously serialize a JavaScript array to a JSON file.

**`Example`**

```ts
<pre>

const data = [ ... JavaScript array of data ... ];
datakit.writeJsonSync("my-data-file.json", data);
</pre>
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filePath` | `string` | Path to the file to be written. |
| `input` | `any`[] | - |

#### Returns

`void`

Returns a promise that resolves when the file has been written.

#### Defined in

[index.ts:765](https://github.com/data-forge-notebook/datakit/blob/90dde73/src/index.ts#L765)

___

### writeYaml

▸ **writeYaml**(`filePath`, `input`): `Promise`<`void`\>

Asynchronously serialize a JavaScript array to a YAML file.

**`Example`**

```ts
<pre>

const data = [ ... JavaScript array of data ... ];
await datakit.writeYaml("my-data-file.yaml", data);
</pre>
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filePath` | `string` | Path to the file to be written. |
| `input` | `any`[] | - |

#### Returns

`Promise`<`void`\>

Returns a promise that resolves when the file has been written.

#### Defined in

[index.ts:789](https://github.com/data-forge-notebook/datakit/blob/90dde73/src/index.ts#L789)

___

### writeYamlSync

▸ **writeYamlSync**(`filePath`, `input`): `void`

Synchronously serialize a JavaScript array to a Yaml file.

**`Example`**

```ts
<pre>

const data = [ ... JavaScript array of data ... ];
datakit.writeYamlSync("my-data-file.yaml", data);
</pre>
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filePath` | `string` | Path to the file to be written. |
| `input` | `any`[] | - |

#### Returns

`void`

Returns a promise that resolves when the file has been written.

#### Defined in

[index.ts:812](https://github.com/data-forge-notebook/datakit/blob/90dde73/src/index.ts#L812)
