import fnmatch
import glob
import os

oldcwd = os.getcwd()

paths = []
pycpaths = ['/usr/local/lib/python*/encodings/*.pyc', '/usr/local/lib/python*/encodings/**/.pyc']

with open('../customize/keeplist.txt', 'r') as inf:
    for line in inf:
        line = line.strip()
        if len(line) > 0:
            if line[0] == '#':
                continue
            if ' #' in line:
                line = line.split(" #")[0]
            line = line.strip()
            paths.append(os.path.normpath(line))

os.chdir('root')

for globpath in glob.iglob(r'./usr/local/lib/python*/**/*', recursive=True):
    if os.path.isfile(globpath):
        globpath = globpath[1:]
        should_keep = False
        for path in paths:
            if fnmatch.fnmatch(globpath, path):
                should_keep = True
                break
        if globpath.endswith('.pyc'):
            should_keep = False
            for path in pycpaths:
                if fnmatch.fnmatch(globpath, path):
                    should_keep = True
                    break
        if not should_keep:
            print("Removing to slim data bundle:", globpath[1:])
            os.remove(globpath[1:])


os.chdir(oldcwd)
