This Is
=======

A Django skeleton project set up the way I like to roll. The requirements file will install Django with the following apps:

    django-debug-toolbar
    django-extensions
    django-staticfiles

as well as some supporting packages.

Benefits
========

Advantages over a vanilla `django-admin.py startproject` include:

 * The settings.py file is configured with the essentials
 * Admin is enabled with autodiscover
 * An apps/ directory is set up for your apps
 * The django-staticfiles app is set up
 * An index page is set up (with jQuery and jQueryUI)
 * Basic Compass project set up
 * The django-debug-toolbar app is set up (and disabled by default)

To Get Started
==============

    git clone git@github.com:johnthedebs/basicproject.git
    cd basicproject
    mkvirtualenv basicproject --no-site-packages # optional
    pip install -r requirements.txt
    python manage.py syncdb
    python manage.py runserver

To Rename
=========

Change instances of "basicproject" to your project name (the directory name and in settings.py).

