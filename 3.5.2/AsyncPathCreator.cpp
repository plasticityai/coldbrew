#include "llvm/Pass.h"
#include "llvm/IR/Function.h"
#include "llvm/Support/raw_ostream.h"

using namespace llvm;

namespace {
struct AsyncPathCreator : public FunctionPass {
  static char ID;
  AsyncPathCreator() : FunctionPass(ID) {}

  bool runOnFunction(Function &F) override {
    StringRef Name = F.getName();
    F.setLinkage(GlobalValue::LinkOnceAnyLinkage);
    if (F.isDeclaration())
          return false;
    if (
      Name.equals("PyEval_EvalCode") ||
      Name.equals("PyEval_EvalCodeEx") || 
      Name.equals("PyEval_EvalFrame") || 
      Name.equals("PyEval_EvalFrameEx") || 
      Name.equals("PyImport_ExecCodeModule") || 
      Name.equals("PyImport_ExecCodeModuleEx") || 
      Name.equals("PyImport_ExecCodeModuleObject") || 
      Name.equals("PyImport_ExecCodeModuleWithPathnames") || 
      Name.equals("PyImport_ImportFrozenModule") || 
      Name.equals("PyImport_ImportFrozenModuleObject") || 
      Name.equals("PyRun_AnyFile") || 
      Name.equals("PyRun_AnyFileEx") || 
      Name.equals("PyRun_AnyFileExFlags") || 
      Name.equals("PyRun_AnyFileFlags") || 
      Name.equals("PyRun_File") || 
      Name.equals("PyRun_FileEx") || 
      Name.equals("PyRun_FileExFlags") || 
      Name.equals("PyRun_FileFlags") || 
      Name.equals("PyRun_InteractiveLoop") || 
      Name.equals("PyRun_InteractiveLoopFlags") || 
      Name.equals("PyRun_InteractiveOne") || 
      Name.equals("PyRun_InteractiveOneFlags") || 
      Name.equals("PyRun_InteractiveOneObject") || 
      Name.equals("PyRun_SimpleFile") || 
      Name.equals("PyRun_SimpleFileEx") || 
      Name.equals("PyRun_SimpleFileExFlags") || 
      Name.equals("PyRun_SimpleString") || 
      Name.equals("PyRun_SimpleStringFlags") || 
      Name.equals("PyRun_String") || 
      Name.equals("PyRun_StringFlags") || 
      Name.equals("Py_FrozenMain") || 
      Name.equals("Py_Initialize") || 
      Name.equals("Py_InitializeEx") || 
      Name.equals("Py_Main") || 
      Name.equals("Py_NewInterpreter") || 
      Name.equals("_PyEval_EvalCodeWithName") || 
      Name.equals("_PyGen_Finalize") || 
      Name.equals("_PyGen_Send") || 
      Name.equals("_Py_InitializeEx_Private") || 
      Name.equals("_coldbrew_yield_to_javascript") || 
      Name.equals("_imp_init_frozen") || 
      Name.equals("builtin___build_class__") || 
      Name.equals("builtin_eval") || 
      Name.equals("builtin_exec") || 
      Name.equals("coro_wrapper_close") || 
      Name.equals("coro_wrapper_iternext") || 
      Name.equals("coro_wrapper_send") || 
      Name.equals("coro_wrapper_throw") || 
      Name.equals("fast_function") || 
      Name.equals("frame_clear") || 
      Name.equals("function_call") || 
      Name.equals("gen_close") || 
      Name.equals("gen_close_iter") || 
      Name.equals("gen_iternext") || 
      Name.equals("gen_send_ex") || 
      Name.equals("gen_throw") || 
      Name.equals("import_init") || 
      Name.equals("zipimporter_load_module")
    ) {
      errs() << "Modifying: ";
      errs().write_escaped(F.getName()) << '\n';
      F.setName(Name + "_coldbrew_async");
      return true;
    } else {
      // errs() << "Ignoring: ";
      // errs().write_escaped(F.getName()) << '\n';
      // F.setName(Name + "_ignore"); // To prevent duplicate symbols
      return true;
    }
  }
}; // end of struct AsyncPathCreator
}  // end of anonymous namespace

char AsyncPathCreator::ID = 0;
static RegisterPass<AsyncPathCreator> X("asyncify", "Creates a function call path on libpython that can be async-ified. It renames that function call path, so that when linked with the original libpython, both the async call path and regular call path can be used.",
                             false /* Only looks at CFG */,
                             false /* Analysis Pass */);
