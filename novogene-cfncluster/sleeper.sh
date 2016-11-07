#!/bin/sh
#
# Usage: sleeper.sh [time]]
# default for time is 60 seconds
# -- our name ---
#$ -N Sleeper
#$ -S /bin/sh
/bin/echo I am running on host `hostname`.
/bin/echo Sleeping now at: `date`
time=60
if [ $# -ge 1 ]; then
 time=$1
fi
sleep $time
echo Now it is: `date`
