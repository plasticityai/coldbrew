#include <string>
#include "llvm/Pass.h"
#include "llvm/IR/Function.h"
#include "llvm/Support/raw_ostream.h"

using namespace llvm;

namespace {
struct SyncPathCreator : public FunctionPass {
  static char ID;
  SyncPathCreator() : FunctionPass(ID) {}

  bool runOnFunction(Function &F) override {
    StringRef Name = F.getName();
    F.setLinkage(GlobalValue::LinkOnceAnyLinkage);
    if (F.isDeclaration())
          return false;
    if (true) {
      errs() << "Modifying: ";
      errs().write_escaped(F.getName()) << '\n';
      F.setName(Name + "_coldbrew_sync");
      return true;
    } else {
      errs() << "Ignoring: ";
      errs().write_escaped(F.getName()) << '\n';
      return true;
    }
  }
}; // end of struct SyncPathCreator
}  // end of anonymous namespace

char SyncPathCreator::ID = 0;
static RegisterPass<SyncPathCreator> X("syncify", "Creates a function call path on libpython that can be kept sync while the other path is async-ified. It renames that function call path, so that when linked with the original libpython, both the sync call path and regular call path can be used.",
                             false /* Only looks at CFG */,
                             false /* Analysis Pass */);