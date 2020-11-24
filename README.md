basicproject
============

This is a Django/React starter project with lots of batteries included.
I created it to get started on new projects more quickly and stay
up-to-date on the tools I like to use. I'm hoping you'll get something
out of it too.


Getting Started
---------------

macOS
-----

1. Install the following:

    * Command Line Tools package - `xcode-select --install`
    * [Vagrant](https://www.vagrantup.com/downloads.html)
    * [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
    * [Homebrew](http://brew.sh/)
    * Ansible - `brew install ansible`
    * Node.js - `brew install node@14`


2. To start the backend and watch for code changes, run the
   following in a terminal window:

    ```
    git clone https://github.com/johnthedebs/basicproject.git
    cd basicproject
    # OR
    django-admin startproject <project_name> --template https://github.com/johnthedebs/basicproject/archive/main.zip
    cd <project_name>

    vagrant up
    vagrant ssh
    runserver
    ```


3. To build the frontend and watch for code changes, run the
   following in a second terminal window:

    ```
    npm install
    npm start
    ```


4. Visit `localhost:8080` in a browser


Testing
-------

Cypress tests with `npm run test` or `npm run test-headless`.

https://docs.cypress.io/guides/getting-started/writing-your-first-test.html#Write-your-first-test


New Deploy Checklist
--------------------

* Set SECRET_KEY in settings.py
* Rename ops/host_vars/basicproject
    * Set hostname, user, ansile_ssh_host, and ansible_ssh_user
    * Change ops/production to reflect host_vars file name
* Set hostname, site_name, site_path in group_vars
* Fill out `ops/lets/config/example-settings.js` and rename to `settings.js`
* In conf/production.py
    * Set ALLOWED_HOSTS, ADMINS, SENTRY_DSN
* Set SENTRY_DSN in conf/webpack.config.js
* https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/
