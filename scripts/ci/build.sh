#!/bin/bash

set -e

cd $(dirname $0)/../..

buildQide(){
  ./scripts/ci/build-qide.sh
}

buildQide
