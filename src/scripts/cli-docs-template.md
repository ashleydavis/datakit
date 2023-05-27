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

{{#each docs}}
- [{{this.name}}](#{{this.name}})
{{/each}}

{{#each docs}}
# {{this.name}}

{{{this.desc}}}

## Syntax

```bash
{{{this.syntax}}}
```

## Inputs

Input can be {{this.inputCount}} of the following:

{{#each this.inputs}}
- {{this}}
{{/each}}

## Outputs

Output can be one of the following:

{{#each this.outputs}}
- {{this}}
{{/each}}

## Arguments

{{#each this.args}}
- **{{this.name}}** - {{this.desc}}
{{/each}}

{{#if this.options}}
## Options

{{#each this.options}}
- **{{optionNames this.names}}={{this.placeholder}}**
  - {{this.desc}} 
  - Example: --{{this.names.[0]}}={{this.example}}
{{/each}}

{{/if}}
{{#if this.notes}}
## Notes

{{#each this.notes}}
- {{this}}
{{/each}}
{{/if}}

## Examples

{{#each this.examples}}
### {{this.name}}

```bash
{{{this.cmd}}}
```
{{/each}}
{{/each}}