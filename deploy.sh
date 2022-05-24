#!/usr/bin/env sh


# abort on errors
set -e

# build
yarn build

# navigate into the build output directory
cd dist

git config user.email "meil"
git config user.name "user"

git init
git checkout -b main
git add -A
git commit -m 'deploy'

git push -f git@github.com:Rome00/moVi.git main:gh-pages

cd -