#!/usr/bin/env bash

set -u -e -o pipefail

DEBUG=false
PACKAGES=(
  auth
)
NODE_PACKAGES=(cli)

build() {
  for NAME in ${PACKAGES[@]}
  do
    echo "====== PACKAGING ${NAME}"

    if ! containsElement "${NAME}" "${NODE_PACKAGES[@]}"; then

    else
      echo "not yet!!!"
    fi

  done
}

build

echo 'FINISHED!'
