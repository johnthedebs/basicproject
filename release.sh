#!/usr/bin/env bash


if [ "$1" == "" ]; then 
    echo "No release version specified!"
    exit 1;
fi
echo "$1"

git fetch -p
git checkout staging
git pull --rebase=false
git checkout master
git pull --rebase=false
git merge staging --no-ff -m "Release v$1"
git tag -f "v$1"
git push
git push --tags
git checkout staging
git merge master
git push
