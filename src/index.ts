#!/usr/bin/env node

import { config } from "dotenv"
import { exec } from "child_process"
import { program } from "commander"
import ora  from "ora"
import chalk from "chalk"
import { ChatGPTAPI } from "chatgpt"

config()

const handleCommit = async (options: string) => {
    const spinner = ora("Asking chatgpt for suggestions...").start()

    // run a "git diff" command to get the diff across the repo

    await new Promise(resolve => setTimeout(resolve, 5000))

    exec("git diff", async (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error}`)
            return
        }
        if (stderr) {
            console.log(`error (std): ${stderr}`)
            return
        }

        const query = `
        Generate a commit message for the following diff:
    
        ${stdout.toString()}
        `.trimStart()

        console.log(query)
        try {

            const chatgpt = new ChatGPTAPI({
                apiKey: process.env.OPENAI_API_KEY!!
            })
            
            const res = await chatgpt.sendMessage('Hello World!')
            console.log(res.text.toString())

        } catch (e: any) {
            console.log(chalk.red("An error occurred: ", e))
            process.exit(1)
        }
    })
    spinner.stop()
}

program
    .option("-c, --commit", "Commit changes")
    .action(handleCommit)

program.parse()

const options = program.opts()