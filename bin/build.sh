#!/bin/sh

echo "\n\n\n*** build ***"
npm run clean &&  npm-run-all -p build:*
