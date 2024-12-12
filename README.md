basicproject
============

This is a Django/React starter project with lots of batteries included.
I created it to get started on new projects more quickly and stay up-to-date on
the tools I like to use. I hope you'll get something out of it too.


Getting Started
---------------

macOS
-----

1. Install the following:

    * Command Line Tools package - `xcode-select --install`
    * [Homebrew](http://brew.sh/)
    * [Docker](https://docs.docker.com/get-docker/)
    * Node.js - `brew install node@22`


2. To start the backend and watch for code changes, run the
   following in a terminal window:

    ```
    git clone https://github.com/johnthedebs/basicproject.git
    cd basicproject
    # OR
    django-admin startproject <project_name> --template https://github.com/johnthedebs/basicproject/archive/main.zip
    cd <project_name>

    docker-compose up -d
    docker-compose exec -it app bash
    $ runserver
    ```


3. To build the frontend and watch for code changes, run the
   following in a second terminal window:

    ```
    npm install
    npm start
    ```


4. Visit `localhost:8000` in a browser


Testing
-------

Cypress tests with `npm run test` or `npm run test-headless`.

https://docs.cypress.io/guides/getting-started/writing-your-first-test.html#Write-your-first-test


New Deploy Checklist
--------------------

* Set SECRET_KEY in settings.py
* `npm install` in `ops/lets` directory
* Fill out `ops/lets/config/example-settings.js` and rename to `settings.js`
* Set SENTRY_DSN in vite.config.ts
* https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/
