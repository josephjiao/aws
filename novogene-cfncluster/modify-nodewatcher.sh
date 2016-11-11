#!/bin/bash
wget https://s3-ap-northeast-1.amazonaws.com/jiaoyang-pub/nodewatcher.patch

rm -f /usr/local/lib/python2.7/site-packages/nodewatcher/nodewatcher.pyc

/usr/bin/patch /usr/local/lib/python2.7/site-packages/nodewatcher/nodewatcher.py ./nodewatcher.patch

/usr/local/bin/supervisorctl restart nodewatcher

