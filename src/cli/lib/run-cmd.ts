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
    // The standard output of the command.
    //
    stdout: string;

    //
    // The standard error of the command.
    //
    stderr: string;
}

export async function runCmd(command: string, options?: ExecOptions): Promise<IRunCmdResult> {
    return new Promise<IRunCmdResult>((resolve) => {
        exec(command, options || {}, (error, stdout, stderr) => {
            resolve({
                error: error === null ? undefined : error,
                stdout: stdout as string,
                stderr: stderr as string,
            });
        });
    });    
};