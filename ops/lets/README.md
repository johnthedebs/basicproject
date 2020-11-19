lets
====

Lets centralizes the most commonly used ops commands in a discoverable
CLI. It is implemented as a series of node scripts that occasionally
call out to external CLI tools (such as Ansible and the AWS CLI).


Setup
-----

Node v14 LTS or greater is required. Make sure to install it before
installing lets.

You'll also need to install `ansible` to use most of
lets's features. Installing via homebrew is recommend:

    brew install ansible

Once lets and its dependencies are installed, you can configure it with:

    lets setup


Usage
-----

To use lets, simply run `lets` in your terminal and you will be
presented with all the supported commands. After selecting a command
from the list, you will be prompted for the command's arguments and the
command will execute once all required arguments have been selected.

You can shortcut this prompting process by directly running `lets`
followed by the desired command and all (or only some) of the required
arguments. You will be prompted for any required arguments not entered.
