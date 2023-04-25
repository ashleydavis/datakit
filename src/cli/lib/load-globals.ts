//
// Loads globals that are automatically accessible from user code.
//

import chalk from 'chalk';

declare var globalThis: any;
globalThis.chalk = chalk;
