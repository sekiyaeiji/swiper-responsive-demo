#!/bin/sh

pug -O src/html/data/*.json -P src/html/page/ --out dist
