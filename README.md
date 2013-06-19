This Is
=======

A Django skeleton project set up the way I like to roll. This sets up a vagrant
VM, provisions it to host a django project, and configures the included
project to run on it with a bunch of common apps and helpful defaults.


To Get Started
==============

From your terminal with git and django 1.4+ installed:

    git clone https://github.com/johnthedebs/basicproject.git
    django-admin.py startproject --template=./basicproject/ <project_name>
    cd <project_name>
    vagrant up
    vagrant ssh
    runserver

That's it! Visit http://localhost:8080/ to see the fruits of your labor.


Guidelines & Assumptions
========================

The project starts with one app, `core`, which serves as the main app. It
contains the root URLconf and a basic index view to start with; you can
expand it as you see fit.

New custom apps should be at the same level in the directory hierarchy
as core. You can run `django-admin.py startapp <app_name>` from the root
of your project to add new apps.

The folders `static/scripts` and `static/styles` are set to be ignored
by git, with the assumption that their contents are generated using
something like CoffeeScript and Compass, respectively. Both are
installed in the VM, and the necessary config for a basic Compass setup
is included in the project code.
