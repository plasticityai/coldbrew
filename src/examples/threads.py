import sys
import threading
import time

x = 0

def worker(index):
    global x
    print("Thread %s: sleeping for 2 seconds..." % index)
    time.sleep(2)
    print("Thread %s: done sleeping." % index)
    print("Thread %s: incrementing `x`." % index)
    x += 1
    print("Thread %s: done." % index)

if __name__ == "__main__":
    num_threads = 3
    if len(sys.argv) > 1:
        num_threads = int(sys.argv[1])
    threads = list()
    print("Shared variable `x` is currently %s." % x)
    print("Main thread spawning %d thread(s)..." % num_threads)
    for index in range(num_threads):
        t = threading.Thread(target=worker, args=(index,))
        threads.append(t)
        t.start()
    for index, thread in enumerate(threads):
        thread.join()
    print("All %d thread(s) done." % num_threads)
    print("Shared variable `x` is now %s." % x)