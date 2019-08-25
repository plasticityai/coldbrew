import os
import sys

oldcwd = os.getcwd()
site_packages = '../customize/requirements/lib/python/site-packages/'
found = True
try:
    os.chdir(site_packages)
except:
    found = False

in_file = sys.argv[1]
out_file = sys.argv[2]
py_inits = []
imports = []

if found:
    for root, dirs, files in os.walk('.'):
        root = root[2:]
        for file in files:
            if file.endswith('.so') and '.cpython' in file:
                module = file.split('.cpython')[0]
                prefix = root.replace('/', '.')
                if len(prefix) > 0:
                    full_module = prefix+'.'+module
                else:
                    full_module = module
                py_inits.append('PyMODINIT_FUNC PyInit_'+module+'(void);')
                imports.append(' '*4+'PyImport_AppendInittab("'+full_module+'", PyInit_'+module+');')

os.chdir(oldcwd)

with open(in_file, 'r') as inf:
    with open(out_file, 'w+') as outf:
        source = inf.read()
        new_source = source
        new_source = source.replace('// ***REQUIREMENTS_PYINITS*** *DO NOT TOUCH*', '\n'.join(py_inits))
        new_source = new_source.replace('// ***REQUIREMENTS_IMPORTS*** *DO NOT TOUCH*', '\n'.join(imports))
        outf.write(new_source)