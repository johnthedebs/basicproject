This Is
=======

A Django skeleton project set up the way I like to roll. The
requirements file will install Django with the following apps:

    django-compressor
    django-debug-toolbar
    django-extensions
    django-uni-form

as well as some supporting packages. See `requirements.txt` for a more
complete list.

It also takes care of the initial Django configuration that needs to be
done for most projects, so that you can get started quickly.

To Get Started
==============

From your terminal with pip, virtualenv, virtualenvwrapper, and django 1.4+ installed:

    django-admin.py startproject --template=https://github.com/johnthedebs/basicproject.git <project_name>
    cd <project_name>
    mkvirtualenv <project_name>
    pip install -r requirements.txt
    python manage.py syncdb
    python manage.py runserver

That's it! Visit http://localhost:8000/ to see the fruits of your labor.

Guidelines & Assumptions
========================

The project starts with one app, core, which serves as the main app. It
contains the root URLconf and a basic index view to start with; you can
expand it as you see fit.

New custom apps should be at the same level in the directory hierarchy
as core. You can run `django-admin.py startapp <app_name>` from the root
of your project to add new apps.

The folders `static/scripts` and `static/styles` are set to be ignored by git,
with the assumption that their contents are generated using something like
CoffeeScript and Compass, respectively.

Benefits
========

Advantages over a vanilla `django-admin.py startproject` include:

 * The settings.py file is configured with the essentials
 * The Django admin is enabled with autodiscover
 * Django's staticfiles is installed and set up
 * The django-debug-toolbar app is installed and set up (but disabled by default)
 * An index page is set up (with the latest jQuery and jQueryUI)
 * Several common Django apps are included
 * A basic Compass project is set up
 * You can rename the project directory without configuration
