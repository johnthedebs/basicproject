This Is
=======

A Django skeleton project set up the way I like to roll. The requirements file will install Django with the following apps:

    django-debug-toolbar
    django-extensions
    django-staticfiles

as well as some supporting packages. See `requirements.txt` for a more complete list.

It also takes care of the initial Django configuration that needs to be done for most projects, so that you can get started quickly.

To Get Started
==============

From your terminal:

    git clone git@github.com:johnthedebs/basicproject.git
    cd basicproject
    mkvirtualenv basicproject --no-site-packages # optional
    pip install -r requirements.txt
    python manage.py syncdb
    python manage.py runserver

Then change instances of "basicproject" to your project name (the project directory name and twice in settings.py).

After that, you're ready to go!

Benefits
========

Advantages over a vanilla `django-admin.py startproject` include:

 * The settings.py file is configured with the essentials
 * The Django admin is enabled with autodiscover
 * The django-staticfiles app is install and set up
 * The django-debug-toolbar app is installed and set up (but disabled by default)
 * An apps/ directory is set up for your apps
 * An index page is set up (with the latest jQuery and jQueryUI)
 * A few common Django apps are included
 * A basic Compass project is set up
