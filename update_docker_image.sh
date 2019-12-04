#!/usr/bin/env bash
if [[ $EUID -ne 0 ]]; then
  echo "This script must be run as root" 
  exit 1
fi
yarn
docker build -t genetic_path_finder .
rm -rf build
docker stop genetic_path_finder || true
docker rm genetic_path_finder || true
docker run -p 3003:3003 -d --name genetic_path_finder genetic_path_finder