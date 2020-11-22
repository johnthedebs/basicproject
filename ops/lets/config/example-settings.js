module.exports = {
  "projectName": "basicproject",
  "opsVarsPath": `${process.env["HOME"]}/.basicproject/ops-vars.json`,
  "servers": {
    production: {
        web: "",
        worker: "",
    },
    staging: {
        web: "",
        worker: "",
    },
  },
  "resetStagingDbCommands": [
      `sudo runuser -l postgres -c "dropdb basicproject"`,
      `sudo runuser -l postgres -c "createdb basicproject"`,
      "python manage.py migrate",
  ],
  "setupPrompts": [
    {
      message : "Enter your AWS access key",
      type    : "input",
      name    : "aws_access_key",
    },
    {
      message : "Enter your AWS secret key",
      type    : "password",
      name    : "aws_secret_key",
    },
  ],
  "tailLogCommands": {
    "web"    : "sudo journalctl -u web.service -f -n 100",
    "worker" : "sudo journalctl -u worker.service -f -n 100",
  },
  "pushRelease": false,
}
