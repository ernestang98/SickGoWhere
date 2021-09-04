#!/usr/bin/env/bash

git pull
git add .
git commit -m "auto script"
git push
git push heroku master
heroku logs --tail