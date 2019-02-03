Upgrading to a new version of Python requires a few steps:

1. Replace all references to `3.5.2` in the project (the directory name `3.5.2`, references inside `3.5.2/Makefile`, references inside `src/Makefile`, and references in the `README.md` file).

2. Update the `3.5.2/checksums` file to match the checksum of the new version of Python you wish to upgrade to.

3. We patch the Python source code in a few places to make it compatible with Emscripten and running asynchronously. These patches can be found in `3.5.2/patches/`, they must be updated to be compatible with the new version's source code.

4. Update the `SQLITE_VERSION` version variable in `3.5.2/Makefile` to update the version of SQLite Python's `sqlite3` uses. You may also need to change the URL that in `3.5.2/Makefile` that uses `SQLITE_VERSION` to download SQLite if it changes in the future.

5. We patch `emterpretify.py` in a few places in `src/Makefile` to extract out synchronous function bodies and branch to them if not running asynchronously, if Emscripten ever updates that file, those patches may need to be updated. 

6. We make a small patch to `StackIR.cpp` of binaryen in the the `Dockerfile` to fix an error thrown when performing `-O3` optimization with extracted synchronous function bodies. The patch basically exits the function before a failing assertion happens. This may need to be updated if in the future `binaryen` is updated.

7. In `3.52/SyncPathCreator.cpp` there is a list of functions that are run asynchronously. This list is mostly made up of functions that are advised by `-s EMTERPRETIFY_ADVISE=1`. There are a few extra in there. In the future, run `-s EMTERPRETIFY_ADVISE=1` and union the results with the existing list in `3.52/SyncPatchCreator.cpp` when upgrading the version of Python. Then test running code asynchronously. If crashes happen, turn on DEBUG mode, and find the name of the symbols that are on the stack that are being run synchronously, that should be run asynchronously (and then add them to `3.52/SyncPathCreator.cpp`). Right now, we also patch `PyObject_Call` and `PyCFunction_Call` to call `_coldbrew_pre_func_ptr_call` and `_coldbrew_post_func_ptr_call` before and after function pointer executions. In the future, there might be other locations where this happens, so more patches might need to be added.