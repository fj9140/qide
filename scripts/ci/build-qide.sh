#!/usr/bin/env bash
set -u -e -o pipefail

cd $(dirname $0)/../..

source ./scripts/ci/utils.sh

PACKAGES=(
    util
    auth
    common
)
NODE_PACKAGES=(cli)

PWD=`pwd`

DIST=${PWD}/dist/@qide

build() {
    for NAME in ${PACKAGES[@]}
    do
        echo "===== PACKAGAIN ${NAME}"
        if ! containsElement "${NAME}" "${NODE_PACKAGES[@]}"; then
            node --max_old_space_size=4096 ${PWD}/scripts/build/packing ${NAME}
        else
            echo "no yet!!!"
        fi
    done

    updateVersionReferences ${DIST}
}

build

echo 'FINISHED!'
