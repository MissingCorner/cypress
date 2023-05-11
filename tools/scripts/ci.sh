#!/usr/bin/env sh
set -e

yarn nx run-many --target=lint --parallel=6 --quiet --all
yarn nx format:check --parallel=6 --quiet --loglevel=error --all
