import json
import sys

module_file = open(sys.argv[1]).read()
thread_file = open(sys.argv[2]).read()

print(module_file.replace('locateFile(pthreadMainJs)', '''URL.createObjectURL(new Blob(["const BLOB_SCRIPT_SOURCE='"+SCRIPT_SOURCE+"';\\n\\n"+'''+json.dumps(thread_file)+'''], {type: 'application/javascript'}))'''))