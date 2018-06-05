#!/bin/bash

function flumine_build {
    find test/ -name *.ts | xargs node out/src/main.js
}

function flumine_run {
    node "out/gen/test/$1/main.js"
}

function flumine_watch {
    npm run build:watch
}