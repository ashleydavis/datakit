# Commands

{{#each docs}}
- [{{this.name}}](#{{this.name}})
{{/each}}

{{#each docs}}
# {{this.name}}

{{this.desc}}

## Syntax

```bash
{{{this.syntax}}}
```

## Inputs

Input can be one of the following:

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

## Examples

{{#each this.examples}}
### {{this.name}}

```bash
{{{this.cmd}}}
```
{{/each}}
{{/each}}