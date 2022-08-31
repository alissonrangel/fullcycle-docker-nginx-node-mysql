#!/bin/bash
dockerize -wait tcp://db:3306 -timeout 30s docker-entrypoint.sh & node index.js
