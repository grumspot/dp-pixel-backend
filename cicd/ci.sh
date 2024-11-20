#!/bin/bash

set -e

PROJECT_PATH=${PROJECT_PATH:-$(dirname $PWD)}
GIT_COMMIT_HASH=$(git rev-parse HEAD)
IMAGE_NAME="dynamicpricing-pixel-backend"
IMAGE_TAG="$IMAGE_NAME:$GIT_COMMIT_HASH"

function build_docker_image() {
  echo "--- Building docker image ---"
  docker build -t $IMAGE_TAG -f docker/Dockerfile .
}

cd $PROJECT_PATH
build_docker_image
