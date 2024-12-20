import { inputData, outputData } from '../lib/io';
import { invokeUserFn, loadUserFn } from './lib/user-fn';
import { verifyInputArray } from '../lib/verify';
import {
  standardCmdInputs,
  standardCmdOutputs,
  standardInputFileHelp,
  standardOutputFileHelp,
} from './lib/help';

export async function main(argv: string[]): Promise<void> {
  const { fn, details } = loadUserFn(argv, `record => transform(record)`);

  const data = await inputData(argv);
  verifyInputArray(data, 'map');

  data.map((record: any) => {
    const result = invokeUserFn(() => fn(record), details);
    // TODO: Allow user to override this?
    console.log(result);
    return record;
  });

  await outputData(argv, data);
}

const command = 'probe';

export const documentation = {
  name: command,
  desc: 'Logs the value returned from the supplied user function without changing the output. Useful for inspecting a value at a point in the pipeline without having to change subsequent steps.',
  syntax: `${command} <transformer-fn> [<input-file>] [<output-file>]`,
  inputs: standardCmdInputs,
  outputs: standardCmdOutputs,
  args: [
    {
      name: 'transformer-fn',
      desc: 'A JavaScript function to produce a value for the input dataset. Specifying a file name will load the JavaScript code from the file.',
    },
    standardInputFileHelp,
    standardOutputFileHelp,
  ],
  examples: [
    {
      name: 'Reads JSON data from standard input, probes the data and unaltered data to standard output',
      cmd: `command-that-produces-json | ${command} "record => record.x"`,
    },
    {
      name: 'Reads data from a file, probes the data and writes unaltered data to standard output',
      cmd: `${command} "record => record.x" input-file.csv`,
    },
    {
      name: 'Reads data from a file, probes the data and writes output unaltered to another file',
      cmd: `${command} "record => record.x" input-file.csv output-file.csv`,
    },
    {
      name: 'Reads JSON data from standard input, probes the data and writes output to another file',
      cmd: `command-that-produces-json | ${command} "record => record.x" - output-file.csv`,
    },
    {
      name: 'Loads a JavaScript file for the transformation',
      cmd: `${command} --file my-transformation.js input-file.csv output-file.csv`,
    },
  ],
};
