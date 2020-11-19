const commands = require("../commands")

const inquirer = require("inquirer")


const inquire = (prompts, prevAnswers = {}, cb) => {
  if (prompts.length <= 0) {
    if (cb) { cb(prevAnswers) }
    return
  }
  prompt = prompts.shift()

  if (Array.isArray(prompt.choices) && prompt.choices.length > (prompt.pageSize || 7)) {
    prompt.choices.push(new inquirer.Separator())
  }

  inquirer.prompt(prompt)
    .then( (answers) => {
      if (answers.command) {
        prompts = prompts.concat(commands[answers.command].args)
      }
      if (prevAnswers) {
        // TODO: Merge prevAnswers with answers
        // then run inquire again with new prompts
        answers = Object.assign({}, prevAnswers, answers)
      }

      inquire(prompts, answers, cb)
    })
    .catch( err => console.error(err) )
}


module.exports = inquire
