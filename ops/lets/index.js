#!/usr/bin/env node

const fs = require("fs")

const checkDependencies = require("./helpers/checkDependencies")
const inquire           = require("./helpers/inquire")
const commands          = require("./commands")

const argv  = require("yargs").argv
const chalk = require("chalk")


let answers = {}
let prompts = [{
  message  : "Which command would you like to run?",
  type     : "list",
  name     : "command",
  choices  : Object.keys(commands),
  pageSize : 15,
}]


// Read/parse config and handle missing config or dependencies
const varsFilePath = `${process.env.HOME}/.basicproject/ops-vars.json`
let config
try {
  config = JSON.parse(fs.readFileSync(varsFilePath, { encoding: "utf8" }))
  config.ssh_user = "deploy"
} catch (error) {
  console.log(chalk.yellow(`No config file found at \`${varsFilePath}\``))
  console.log(chalk.yellow("Running `setup` command now to populate the config file\n"))
  answers = { command: "setup" }
}

checkDependencies()

// Match incoming arguments up to a command, then arguments that the
// command calls for (prompts)
argv._.forEach( (arg, i) => {
  const prompt = prompts.shift()
  if (!prompt) {
    console.log(chalk.red("Too many args provided!"))
    console.log(`Unsure what to do with: ${argv._.slice(i).join(" ")} `)
    process.exit(1)
  } else if (prompt.type === "input" || prompt.choices.includes(arg)) {
    answers[prompt.name] = arg
    if (i === 0) {
      prompts = prompts.concat(commands[arg].args)
    }
  } else {
    console.log(chalk.red(`Invalid ${prompt.name}: ${arg}\n`))
    console.log(chalk.bold("Valid options include:"))
    console.log(`${prompt.choices.join("\n")}`)
    process.exit(1)
  }
})

// Any prompts that didn't have an argument matched up with them above
// get asked directly to the user
inquire(prompts, answers, (args) => {
  commands[args.command].run(args, config)
})
