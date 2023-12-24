#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sys
import requests
import soft404

###
# usage:
#   - The script prints the URL to stdout if it is unlikely to be a soft 404. 
#
#   echo 'http://somesite.com/asdas.html' | python3 soft_404_check.py 
#   cat URL_LIST | python3 soft_404_check.py 2>/dev/null | DO_SOMETHING_ELSE

# requires:
#   pip3 install soft404
#   pip3 install parsel

from urllib.parse import urlparse

def ins(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98'
    }

    prob = soft404.probability(requests.get(url, verify=False, allow_redirects=False, headers=headers).text)

    if prob < 0.4:
        print(url)

def read_in():
    lines = sys.stdin.readlines()
    for i in range(len(lines)):
    	lines[i] = lines[i].replace('\n','')
    return lines

def main():
    lines = read_in()
    for x in lines:
        ins(x)

if __name__ == '__main__':
    main()