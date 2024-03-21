import { exec, ExecOptions } from "child_process"

//
// The result of running a command.
//
export interface IRunCmdResult {
    //
    // The error that occurred while running the command, if it failed.
    //
    error: Error | undefined;

    //
    // The exit code of the command.
    //
    //fio:
    // code: number | undefined;

    //
    // The standard output of the command.
    //
    stdout: string;

    //
    // The standard error of the command.
    //
    stderr: string;
}

export async function runCmd(command: string, options: { encoding: BufferEncoding; } & ExecOptions): Promise<IRunCmdResult> {
    // args = args || [];
    options = options || {};

    // console.log("Running cmd: " + command + " " + args.join(' ')); //fio;

    return new Promise<IRunCmdResult>((resolve) => {
        exec(command, options, (error, stdout, stderr) => {
            resolve({
                error: error === null ? undefined : error,
                stdout: stdout,
                stderr: stderr,                        
            });
        });
    });    
};