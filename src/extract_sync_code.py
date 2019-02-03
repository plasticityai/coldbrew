import os
import re
import sys

async_funcs = [func.strip() for func in open('extract_sync_code_arg_1.tmp', 'r').read().replace('"', '').replace('_coldbrew_sync', '').split(",")]
python_funcs = [func.strip() for func in open('extract_sync_code_arg_2.tmp', 'r').read().replace('"', '').split(",")]
all_funcs = set(async_funcs+python_funcs)

with open(sys.argv[1], 'r') as inf:
    start = False
    lbuff = []
    for line in inf:
        if line.startswith('function '):
         func_name = line.split('function ')[1].strip().split('(')[0]
         if func_name in async_funcs:
            start = True
        if start:
            wline = line.replace('\n', '')
            if wline.startswith('function '):
                wline = wline.replace('(', '_coldbrew_sync(')
            else:
                func_invokes = re.findall(r'(_[A-Za-z_0-9]+?)\(', wline)
                for func_invoke in func_invokes:
                    if func_invoke in async_funcs:
                        wline = wline.replace(func_invoke+'(', func_invoke+'_coldbrew_sync(')
            lbuff.append(wline)

        if start and line.startswith('}'):
            start = False
            print('\n'.join(lbuff))
            lbuff = []


