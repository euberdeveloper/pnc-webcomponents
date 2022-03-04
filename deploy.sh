#!/bin/bash

echo "Build webcomponents"
npm install
npm run build
rm -rf node_modules

echo "Removing any pre-existing static file"
cd webcomponents
rm -rf *
cd ..

echo "Passing all the new static files from dist to webcomponents"
cp dist/*.js webcomponents -rf
cp dist/*.js.map webcomponents -rf

echo "Finished!!!";