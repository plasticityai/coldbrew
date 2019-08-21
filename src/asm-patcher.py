#!/usr/bin/env python2
# Copyright 2014 The Emscripten Authors.  All rights reserved.
# Emscripten is available under two separate licenses, the MIT license and the
# University of Illinois/NCSA Open Source License.  Both these licenses can be
# found in the LICENSE file.

"""Processes asm.js code.
# Based off of an old copy of emterpretify.py
"""

from __future__ import print_function
import os
import sys
import json
import shutil
import fnmatch


sys.path.insert(1, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from tools import asm_module, shared

config = shared.Configuration()
temp_files = config.get_temp_files()

if __name__ == '__main__':

  infile = sys.argv[1]
  outfile = sys.argv[2]
  print("ASM Patcher: ", infile, outfile, len(open(infile, 'r').read()), len(open(outfile, 'r').read()))
  # print(open(infile, 'r').read())
  # asm = asm_module.AsmModule(infile)

  # lines = asm.funcs_js.split('\n')
  # asm.funcs_js = None
  # func = None

  # # second pass, finalize trampolines
  # for i in range(len(lines)):
  #   line = lines[i]
  #   if line.startswith('function ') and '}' not in line:
  #     assert not func
  #     func = line.split(' ')[1].split('(')[0]
  #   elif line.startswith('}'):
  #     assert func
  #     func = None

  # asm.funcs_js = '\n'.join(lines)


  # asm.write(outfile)

  # temp_files.clean()