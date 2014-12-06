#!/bin/bash -ex

OLD_PWD=$PWD

WD=${MASTER_WD:-"/tmp/sproutcore_master_$$"}
IP=${IP:-"127.0.0.1"}
PORT=${PORT:-"4020"}

echo "Running in $WD..."

/bin/mkdir -p ${WD} || /bin/true
cd ${WD}

git clone https://github.com/sproutcore/abbot.git
cat > Gemfile <<EOF
source "http://rubygems.org"
gem "sproutcore", :path => "./abbot/"
EOF
pwd
bundle install --binstubs
ln -s ${OLD_PWD} sproutcore-cocktails
cd sproutcore-cocktails


if [ -z ${TRAVIS_JOB_ID} ]; then
    # not running under travis, stay in foreground until stopped
    sc-server --host=${IP} --port=${PORT} --allow-from-ips=${ALLOW_IPS:-"*.*.*.*"}
else
    # running under travis, daemonize
    ( sc-server --host=${IP} --port=${PORT} --allow-from-ips=${ALLOW_IPS:-"*.*.*.*"} & ) || /bin/true
fi
cd ${OLD_PWD}
#rm -rf ${WD}