#!/bin/sh
while true; do
	for (( i = 0; i < 10; i++)); do
	  sleep 1
	  qsub -r y ./sleeper.sh
	done 
	sleep 5000
done
