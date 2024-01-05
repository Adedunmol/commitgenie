#!/usr/bin/env node

// import chalk from "chalk"
// import ora  from "ora"

// const spinner = ora("Asking chatgpt for suggestions...").start()

// spinner.stop()

// console.log(chalk.greenBright("Asked chatgpt..."))

import { program } from "commander"


program
    .option("-c, --commit", "Commit changes")
    .action(options => {
        console.log(options)
    })

program.parse()

const options = program.opts()