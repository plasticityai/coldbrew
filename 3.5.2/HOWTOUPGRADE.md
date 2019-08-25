Upgrading to a new version of Python requires a few steps:

1. Replace all references to `3.5.2` in the project (the directory name `3.5.2`, references inside `3.5.2/Makefile`, references inside `src/Makefile`, references inside `build.sh` and `shell.sh`, and references in the `README.md` file).

2. Update the `3.5.2/checksums` file to match the checksum of the new version of Python you wish to upgrade to.

3. We patch the Python source code in a few places to make it compatible with Emscripten and running asynchronously. These patches can be found in `3.5.2/patches/`, they must be updated to be compatible with the new version's source code.

4. Update the `SQLITE_VERSION` version variable in `3.5.2/Makefile` to update the version of SQLite Python's `sqlite3` uses. You may also need to change the URL that in `3.5.2/Makefile` that uses `SQLITE_VERSION` to download SQLite if it changes in the future.

5. In `src/Makefile` there is a list of functions that are run asynchronously (`ASYNC_FUNCS`). This list is mostly made up of functions that are advised by `-s EMTERPRETIFY_ADVISE=1`. There are a few extra in there. In the future, run `-s EMTERPRETIFY_ADVISE=1` and union the results with the existing list in `src/Makefile` when upgrading the version of Python. Then test running code asynchronously. If crashes happen, turn on DEBUG mode, and find the name of the symbols that are on the stack when a sleep occurs, that should be run asynchronously (and then add them to `ASYNC_FUNCS`). Right now, we also patch `PyObject_Call` and `PyCFunction_Call` to call `_coldbrew_pre_func_ptr_call` and `_coldbrew_post_func_ptr_call` before and after function pointer executions (indirect calls). In the future, there might be other locations where this happens, so more patches might need to be added.

6. Update the list of `requiredModules` in `getUnusedModules` in `src/module.js.pre.js`. `requiredModules` is a list of built-in modules that are not imported (can't be detected by `list(sys.modules.keys())`) but are actually required for Python to even compile.