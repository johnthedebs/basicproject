module.exports = {
  "stage": {
    message : "Which stage?",
    type    : "list",
    name    : "stage",
    choices : [
      "staging",
      "production",
    ],
  },
  "role" : {
    message : "Which role?",
    type    : "list",
    name    : "role",
    choices : [
      "web",
      "worker",
    ],
  },
}
