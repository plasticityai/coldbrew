# This program implements calculating the n-th term of the Fibonacci sequence using three ways. 
# It is useful for quickly benchmarking and understanding how much slower Coldbrew is than a 
# native CPython interpreter.
#
# There are 3 Fibonacci implementations that test various types of workloads
# 1) Recursive Fibonacci - Helps test workloads that are that are CPU bound and function call heavy
# 2) Iterative Fibonacci - Helps test workloads that are CPU bound and not function call heavy
# 3) FileIO Iterative Fibonacci - Helps test workloads that are IO bound

import argparse
import json
import os
import tempfile
import time

def fib(n):
    if n < 2:
        return n
    return fib(n-2) + fib(n-1)

def fibi(n):
    a, b = 0, 1
    for i in range(0, n):
        a, b = b, a + b
    return a

def fibf(n):
    tempf = os.path.join(tempfile.gettempdir(), 'fib.json')
    a, b = 0, 1
    with open(tempf, 'w+') as fp:
        json.dump((a, b), fp)
    for i in range(0, n):
        with open(tempf, 'r') as fp:
            a, b = json.load(fp)
        a, b = b, a + b
        with open(tempf, 'w+') as fp:
            json.dump((a, b), fp)
    return a


parser = argparse.ArgumentParser(description="calculates fib(N)")
parser.add_argument("n", type=int, help="up to what term to calculate the fibonacci sequence to")
parser.add_argument("-v", "--verbose", action="store_true")
group = parser.add_mutually_exclusive_group()
group.add_argument("-i", "--iterative", action="store_true")
group.add_argument("-f", "--fileio", action="store_true")
args = parser.parse_args()
if args.iterative:
    fib_func = fibi
elif args.fileio:
    fib_func = fibf
else:
    fib_func = fib
btime = time.time()
answer = fib_func(args.n)
etime = time.time()
if args.verbose:
    print("fib(%d) = %d took %f seconds to calculate" % (args.n, answer, etime-btime))
else:
    print(answer)