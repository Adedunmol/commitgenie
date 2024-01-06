#!/usr/bin/env node

// console.log(chalk.greenBright("Asked chatgpt..."))

import { exec } from "child_process"
import { program } from "commander"
import ora  from "ora"
import chalk from "chalk"
import { resolve } from "path"

const handleCommit = async (options: string) => {
    const spinner = ora("Asking chatgpt for suggestions...").start()

    // run a "git diff" command to get the diff across the repo

    await new Promise(resolve => setTimeout(resolve, 5000))

    exec("git diff", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error}`)
            return
        }
        if (stderr) {
            console.log(`error: ${stderr}`)
            return
        }
        console.log(stdout)
    })

    spinner.stop()
}

program
    .option("-c, --commit", "Commit changes")
    .action(handleCommit)

program.parse()

const options = program.opts()