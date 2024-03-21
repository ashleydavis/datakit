//
// Loads globals that are automatically accessible from user code.
//

import chalk from 'chalk';
import { runCmd } from './run-cmd';

declare var globalThis: any;
globalThis.chalk = chalk;
globalThis.runCmd = runCmd;
