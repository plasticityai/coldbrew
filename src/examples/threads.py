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
    threads = list()
    print("Shared variable `x` is currently %s." % x)
    print("Main thread spawning 3 threads...")
    for index in range(3):
        t = threading.Thread(target=worker, args=(index,))
        threads.append(t)
        t.start()
    for index, thread in enumerate(threads):
        thread.join()
    print("All 3 threads done.")
    print("Shared variable `x` is now %s." % x)