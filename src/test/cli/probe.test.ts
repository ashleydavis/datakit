import { expect } from 'chai';
import mock from 'mock-require';

const mockIo: any = {};
mock('../../lib/io', mockIo);
mock.reRequire('../../cli/probe');

import { main } from '../../cli/probe';

describe('cli/probe', () => {
  it('can probe empty data set', async () => {
    mockIo.inputData = async () => {
      return [];
    };

    let output: any[] | undefined = undefined;
    mockIo.outputData = async (argv: string[], data: any[]) => {
      output = data;
    };

    await main([`r => ({ a: r.a + 1 })`]);

    expect(output).to.eql([]);
  });

  it('can probe over items without altering data', async () => {
    const input = [{ a: 1 }, { a: 2 }, { a: 3 }];
    mockIo.inputData = async () => {
      return input;
    };

    let output: any[] | undefined = undefined;
    mockIo.outputData = async (argv: string[], data: any[]) => {
      output = data;
    };

    await main([`r => r.a`]);

    const expectedOutput = [{ a: 1 }, { a: 2 }, { a: 3 }];
    expect(output).to.eql(expectedOutput);
  });
});
