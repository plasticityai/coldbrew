const utils = require('../utils');
const { expect } = require('chai');

describe('Bridge Variables', function() {
  describe('Transfer JavaScript --> Python', async function() {
    it('should allow getting all types of JavaScript variables in Python via get_variable', async function () {
      var result = utils.eval(this, async () => {
        try {
          window.a = 5;
          window.b = "test";
          window.c = [5, "test"];
          window.d = {"test": 5, "test2": undefined};
          window.e = null;
          Coldbrew.run("from collections import Counter");
          window.f = Coldbrew.getVariable('Counter');
          window.g = Date;
          window.h = await Coldbrew.getVariableAsync('Counter');
          window.i = undefined;
          window.j = Promise.resolve(5);
          window.k = Promise.resolve(undefined);
          Coldbrew.run("assert Coldbrew.get_variable('a') == 5");
          Coldbrew.run("assert Coldbrew.get_variable('b') == 'test'");
          Coldbrew.run("assert Coldbrew.get_variable('c') == [5, 'test']");
          Coldbrew.run("assert Coldbrew.get_variable('d') == {'test': 5, 'test2': None}");
          Coldbrew.run("assert Coldbrew.get_variable('e') == None");
          Coldbrew.run("assert Coldbrew.get_variable('f') == Counter");
          Coldbrew.run("assert Coldbrew.JavaScriptVariable.is_javascript_variable(Coldbrew.get_variable('g'))");
          await Coldbrew.runAsync("assert Coldbrew.get_variable('h') == Counter");
          Coldbrew.run("assert Coldbrew.get_variable('i') == None");
          await Coldbrew.runAsync("assert Coldbrew.get_variable('j') == 5");
          await Coldbrew.runAsync("assert Coldbrew.get_variable('k') == None");
        } catch (e) {
          return JSON.stringify([e.message, e.stack]);
        }
        return true;
      });
      return expect(result).to.eventually.be.true;
    });

    it('should allow getting all types of JavaScript variables in Python via get_variable while running asynchronously', async function () {
      var result = utils.eval(this, async () => {
        try {
          window.a = 5;
          window.b = "test";
          window.c = [5, "test"];
          window.d = {"test": 5, "test2": undefined};
          window.e = null;
          Coldbrew.run("from collections import Counter");
          window.f = Coldbrew.getVariable('Counter');
          window.g = Date;
          window.h = await Coldbrew.getVariableAsync('Counter');
          window.i = undefined;
          window.j = Promise.resolve(5);
          window.k = Promise.resolve(undefined);
          await Coldbrew.runAsync("assert Coldbrew.get_variable('a') == 5");
          await Coldbrew.runAsync("assert Coldbrew.get_variable('b') == 'test'");
          await Coldbrew.runAsync("assert Coldbrew.get_variable('c') == [5, 'test']");
          await Coldbrew.runAsync("assert Coldbrew.get_variable('d') == {'test': 5, 'test2': None}");
          await Coldbrew.runAsync("assert Coldbrew.get_variable('e') == None");
          await Coldbrew.runAsync("assert Coldbrew.get_variable('f') == Counter");
          await Coldbrew.runAsync("assert Coldbrew.JavaScriptVariable.is_javascript_variable(Coldbrew.get_variable('g'))");
          await Coldbrew.runAsync("assert Coldbrew.get_variable('h') == Counter");
          await Coldbrew.runAsync("assert Coldbrew.get_variable('i') == None");
          await Coldbrew.runAsync("assert Coldbrew.get_variable('j') == 5");
          await Coldbrew.runAsync("assert Coldbrew.get_variable('k') == None");
        } catch (e) {
          return JSON.stringify([e.message, e.stack]);
        }
        return true;
      });
      return expect(result).to.eventually.be.true;
    });

    it('should allow getting all types of JavaScript variables in Python via run_function return value', async function () {
      var result = utils.eval(this, async () => {
        try {
          window.getVar = function (v) {
            return eval(v);
          };
          window.a = 5;
          window.b = "test";
          window.c = [5, "test"];
          window.d = {"test": 5, "test2": undefined};
          window.e = null;
          Coldbrew.run("from collections import Counter");
          window.f = Coldbrew.getVariable('Counter');
          window.g = Date;
          window.h = await Coldbrew.getVariableAsync('Counter');
          window.i = undefined;
          window.j = Promise.resolve(5);
          window.k = Promise.resolve(undefined);
          Coldbrew.run("assert Coldbrew.run_function('getVar', 'a') == 5");
          Coldbrew.run("assert Coldbrew.run_function('getVar', 'b') == 'test'");
          Coldbrew.run("assert Coldbrew.run_function('getVar', 'c') == [5, 'test']");
          Coldbrew.run("assert Coldbrew.run_function('getVar', 'd') == {'test': 5, 'test2': None}");
          Coldbrew.run("assert Coldbrew.run_function('getVar', 'e') == None");
          Coldbrew.run("assert Coldbrew.run_function('getVar', 'f') == Counter");
          Coldbrew.run("assert Coldbrew.JavaScriptVariable.is_javascript_variable(Coldbrew.run_function('getVar', 'Date'))");
          await Coldbrew.runAsync("assert Coldbrew.run_function('getVar', 'h') == Counter");
          Coldbrew.run("assert Coldbrew.run_function('getVar', 'i') == None");
          await Coldbrew.runAsync("assert Coldbrew.run_function('getVar', 'j') == 5");
          await Coldbrew.runAsync("assert Coldbrew.run_function('getVar', 'k') == None");
        } catch (e) {
          return JSON.stringify([e.message, e.stack]);
        }
        return true;
      });
      return expect(result).to.eventually.be.true;
    });

    it('should allow getting all types of JavaScript variables in Python via run_function return value while running asynchronously', async function () {
      var result = utils.eval(this, async () => {
        try {
          window.getVar = function (v) {
            return eval(v);
          };
          window.a = 5;
          window.b = "test";
          window.c = [5, "test"];
          window.d = {"test": 5, "test2": undefined};
          window.e = null;
          Coldbrew.run("from collections import Counter");
          window.f = Coldbrew.getVariable('Counter');
          window.g = Date;
          window.h = await Coldbrew.getVariableAsync('Counter');
          window.i = undefined;
          window.j = Promise.resolve(5);
          window.k = Promise.resolve(undefined);
          await Coldbrew.runAsync("assert Coldbrew.run_function('getVar', 'a') == 5");
          await Coldbrew.runAsync("assert Coldbrew.run_function('getVar', 'b') == 'test'");
          await Coldbrew.runAsync("assert Coldbrew.run_function('getVar', 'c') == [5, 'test']");
          await Coldbrew.runAsync("assert Coldbrew.run_function('getVar', 'd') == {'test': 5, 'test2': None}");
          await Coldbrew.runAsync("assert Coldbrew.run_function('getVar', 'e') == None");
          await Coldbrew.runAsync("assert Coldbrew.run_function('getVar', 'f') == Counter");
          await Coldbrew.runAsync("assert Coldbrew.JavaScriptVariable.is_javascript_variable(Coldbrew.run_function('getVar', 'Date'))");
          await Coldbrew.runAsync("assert Coldbrew.run_function('getVar', 'h') == Counter");
          await Coldbrew.runAsync("assert Coldbrew.run_function('getVar', 'i') == None");
          await Coldbrew.runAsync("assert Coldbrew.run_function('getVar', 'j') == 5");
          await Coldbrew.runAsync("assert Coldbrew.run_function('getVar', 'k') == None");
        } catch (e) {
          return JSON.stringify([e.message, e.stack]);
        }
        return true;
      });
      return expect(result).to.eventually.be.true;
    });

    it('should allow getting all types of JavaScript variables in Python via runFunction arguments', async function () {
      var result = utils.eval(this, async () => {
        try {
          Coldbrew.run('def get_vars(*args):\n\tglobal a, b, c, d, e, f, g, h, i, j, k\n\ta, b, c, d, e, f, g, h, i, j, k = args');
          window.a = 5;
          window.b = "test";
          window.c = [5, "test"];
          window.d = {"test": 5, "test2": undefined};
          window.e = null;
          Coldbrew.run("from collections import Counter");
          window.f = Coldbrew.getVariable('Counter');
          window.g = Date;
          window.h = null;
          window.i = undefined;
          window.j = null;
          window.k = null;
          Coldbrew.runFunction('get_vars', a, b, c, d, e, f, g, h, i, j, k);
          Coldbrew.run("assert a == 5");
          Coldbrew.run("assert b == 'test'");
          Coldbrew.run("assert c == [5, 'test']");
          Coldbrew.run("assert d == {'test': 5, 'test2': None}");
          Coldbrew.run("assert e == None");
          Coldbrew.run("assert f == Counter");
          Coldbrew.run("assert Coldbrew.JavaScriptVariable.is_javascript_variable(g)");
          Coldbrew.run("assert h == None");
          Coldbrew.run("assert i == None");
          Coldbrew.run("assert j == None");
          Coldbrew.run("assert k == None");
        } catch (e) {
          return JSON.stringify([e.message, e.stack]);
        }
        return true;
      });
      return expect(result).to.eventually.be.true;
    });

    it('should allow getting all types of JavaScript variables in Python via runFunction keyword arguments', async function () {
      var result = utils.eval(this, async () => {
        try {
          Coldbrew.run('def get_vars(**kwargs):\n\tglobal a, b, c, d, e, f, g, h, i, j, k\n\tkeys=list(kwargs.keys())\n\tkeys.sort()\n\ta, b, c, d, e, f, g, h, i, j, k = [kwargs[k] for k in keys]');
          window.a = 5;
          window.b = "test";
          window.c = [5, "test"];
          window.d = {"test": 5, "test2": undefined};
          window.e = null;
          Coldbrew.run("from collections import Counter");
          window.f = Coldbrew.getVariable('Counter');
          window.g = Date;
          window.h = null;
          window.i = undefined;
          window.j = null;
          window.k = null;
          Coldbrew.runFunction('get_vars', Coldbrew.PythonKeywords({a, b, c, d, e, f, g, h, i, j, k}));
          Coldbrew.run("assert a == 5");
          Coldbrew.run("assert b == 'test'");
          Coldbrew.run("assert c == [5, 'test']");
          Coldbrew.run("assert d == {'test': 5, 'test2': None}");
          Coldbrew.run("assert e == None");
          Coldbrew.run("assert f == Counter");
          Coldbrew.run("assert Coldbrew.JavaScriptVariable.is_javascript_variable(g)");
          Coldbrew.run("assert h == None");
          Coldbrew.run("assert i == None");
          Coldbrew.run("assert j == None");
          Coldbrew.run("assert k == None");
        } catch (e) {
          return JSON.stringify([e.message, e.stack]);
        }
        return true;
      });
      return expect(result).to.eventually.be.true;
    });

    it('should allow getting all types of JavaScript variables in Python via runFunctionAsync arguments', async function () {
      var result = utils.eval(this, async () => {
        try {
          Coldbrew.run('def get_vars(*args):\n\tglobal a, b, c, d, e, f, g, h, i, j, k\n\ta, b, c, d, e, f, g, h, i, j, k = args');
          window.a = 5;
          window.b = "test";
          window.c = [5, "test"];
          window.d = {"test": 5, "test2": undefined};
          window.e = null;
          Coldbrew.run("from collections import Counter");
          window.f = Coldbrew.getVariable('Counter');
          window.g = Date;
          window.h = await Coldbrew.getVariableAsync('Counter');
          window.i = undefined;
          window.j = Promise.resolve(5);
          window.k = Promise.resolve(undefined);
          await Coldbrew.runFunctionAsync('get_vars', a, b, c, d, e, f, g, h, i, j, k);
          Coldbrew.run("assert a == 5");
          Coldbrew.run("assert b == 'test'");
          Coldbrew.run("assert c == [5, 'test']");
          Coldbrew.run("assert d == {'test': 5, 'test2': None}");
          Coldbrew.run("assert e == None");
          Coldbrew.run("assert f == Counter");
          Coldbrew.run("assert Coldbrew.JavaScriptVariable.is_javascript_variable(g)");
          Coldbrew.run("assert h == Counter");
          Coldbrew.run("assert i == None");
          Coldbrew.run("assert j == 5");
          Coldbrew.run("assert k == None");
        } catch (e) {
          return JSON.stringify([e.message, e.stack]);
        }
        return true;
      });
      return expect(result).to.eventually.be.true;
    });

    it('should allow getting all types of JavaScript variables in Python via runFunctionAsync keyword arguments', async function () {
      var result = utils.eval(this, async () => {
        try {
          Coldbrew.run('def get_vars(**kwargs):\n\tglobal a, b, c, d, e, f, g, h, i, j, k\n\tkeys=list(kwargs.keys())\n\tkeys.sort()\n\ta, b, c, d, e, f, g, h, i, j, k = [kwargs[k] for k in keys]');
          window.a = 5;
          window.b = "test";
          window.c = [5, "test"];
          window.d = {"test": 5, "test2": undefined};
          window.e = null;
          Coldbrew.run("from collections import Counter");
          window.f = Coldbrew.getVariable('Counter');
          window.g = Date;
          window.h = await Coldbrew.getVariableAsync('Counter');
          window.i = undefined;
          window.j = Promise.resolve(5);
          window.k = Promise.resolve(undefined);
          await Coldbrew.runFunctionAsync('get_vars', Coldbrew.PythonKeywords({a, b, c, d, e, f, g, h, i, j, k}));
          Coldbrew.run("assert a == 5");
          Coldbrew.run("assert b == 'test'");
          Coldbrew.run("assert c == [5, 'test']");
          Coldbrew.run("assert d == {'test': 5, 'test2': None}");
          Coldbrew.run("assert e == None");
          Coldbrew.run("assert f == Counter");
          Coldbrew.run("assert Coldbrew.JavaScriptVariable.is_javascript_variable(g)");
          Coldbrew.run("assert h == Counter");
          Coldbrew.run("assert i == None");
          Coldbrew.run("assert j == 5");
          Coldbrew.run("assert k == None");
        } catch (e) {
          return JSON.stringify([e.message, e.stack]);
        }
        return true;
      });
      return expect(result).to.eventually.be.true;
    });

    it('should allow getting all types of JavaScript variables in Python via get_variable in worker mode', async function () {
      await utils.eval(this, async () => {
        Coldbrew.unload();
        return Coldbrew.load({worker: true});
      });
      var result = utils.eval(this, async () => {
        try {
          window.a = 5;
          window.b = "test";
          window.c = [5, "test"];
          window.d = {"test": 5, "test2": undefined};
          window.e = null;
          await Coldbrew.run("from collections import Counter");
          window.f = await Coldbrew.getVariable('Counter');
          window.g = Date;
          window.h = await Coldbrew.getVariableAsync('Counter');
          window.i = undefined;
          window.j = Promise.resolve(5);
          window.k = Promise.resolve(undefined);
          await Coldbrew.run("assert Coldbrew.get_variable('a') == 5");
          await Coldbrew.run("assert Coldbrew.get_variable('b') == 'test'");
          await Coldbrew.run("assert Coldbrew.get_variable('c') == [5, 'test']");
          await Coldbrew.run("assert Coldbrew.get_variable('d') == {'test': 5, 'test2': None}");
          await Coldbrew.run("assert Coldbrew.get_variable('e') == None");
          await Coldbrew.run("assert Coldbrew.get_variable('f') == Counter");
          await Coldbrew.run("assert Coldbrew.JavaScriptVariable.is_javascript_variable(Coldbrew.get_variable('g'))");
          await Coldbrew.runAsync("assert Coldbrew.get_variable('h') == Counter");
          await Coldbrew.run("assert Coldbrew.get_variable('i') == None");
          await Coldbrew.runAsync("assert Coldbrew.get_variable('j') == 5");
          await Coldbrew.runAsync("assert Coldbrew.get_variable('k') == None");
        } catch (e) {
          return JSON.stringify([e.message, e.stack]);
        }
        return true;
      });
      return expect(result).to.eventually.be.true;
    });

    it('should allow getting all types of JavaScript variables in Python via get_variable while running asynchronously in worker mode', async function () {
      await utils.eval(this, async () => {
        Coldbrew.unload();
        return Coldbrew.load({worker: true});
      });
      var result = utils.eval(this, async () => {
        try {
          window.a = 5;
          window.b = "test";
          window.c = [5, "test"];
          window.d = {"test": 5, "test2": undefined};
          window.e = null;
          await Coldbrew.run("from collections import Counter");
          window.f = await Coldbrew.getVariable('Counter');
          window.g = Date;
          window.h = await Coldbrew.getVariableAsync('Counter');
          window.i = undefined;
          window.j = Promise.resolve(5);
          window.k = Promise.resolve(undefined);
          await Coldbrew.runAsync("assert Coldbrew.get_variable('a') == 5");
          await Coldbrew.runAsync("assert Coldbrew.get_variable('b') == 'test'");
          await Coldbrew.runAsync("assert Coldbrew.get_variable('c') == [5, 'test']");
          await Coldbrew.runAsync("assert Coldbrew.get_variable('d') == {'test': 5, 'test2': None}");
          await Coldbrew.runAsync("assert Coldbrew.get_variable('e') == None");
          await Coldbrew.runAsync("assert Coldbrew.get_variable('f') == Counter");
          await Coldbrew.runAsync("assert Coldbrew.JavaScriptVariable.is_javascript_variable(Coldbrew.get_variable('g'))");
          await Coldbrew.runAsync("assert Coldbrew.get_variable('h') == Counter");
          await Coldbrew.runAsync("assert Coldbrew.get_variable('i') == None");
          await Coldbrew.runAsync("assert Coldbrew.get_variable('j') == 5");
          await Coldbrew.runAsync("assert Coldbrew.get_variable('k') == None");
        } catch (e) {
          return JSON.stringify([e.message, e.stack]);
        }
        return true;
      });
      return expect(result).to.eventually.be.true;
    });

    it('should allow getting all types of JavaScript variables in Python via run_function return value in worker mode', async function () {
      await utils.eval(this, async () => {
        Coldbrew.unload();
        return Coldbrew.load({worker: true});
      });
      var result = utils.eval(this, async () => {
        try {
          window.getVar = function (v) {
            return eval(v);
          };
          window.a = 5;
          window.b = "test";
          window.c = [5, "test"];
          window.d = {"test": 5, "test2": undefined};
          window.e = null;
          await Coldbrew.run("from collections import Counter");
          window.f = await Coldbrew.getVariable('Counter');
          window.g = Date;
          window.h = await Coldbrew.getVariableAsync('Counter');
          window.i = undefined;
          window.j = Promise.resolve(5);
          window.k = Promise.resolve(undefined);
          await Coldbrew.run("assert Coldbrew.run_function('getVar', 'a') == 5");
          await Coldbrew.run("assert Coldbrew.run_function('getVar', 'b') == 'test'");
          await Coldbrew.run("assert Coldbrew.run_function('getVar', 'c') == [5, 'test']");
          await Coldbrew.run("assert Coldbrew.run_function('getVar', 'd') == {'test': 5, 'test2': None}");
          await Coldbrew.run("assert Coldbrew.run_function('getVar', 'e') == None");
          await Coldbrew.run("assert Coldbrew.run_function('getVar', 'f') == Counter");
          await Coldbrew.run("assert Coldbrew.JavaScriptVariable.is_javascript_variable(Coldbrew.run_function('getVar', 'Date'))");
          await Coldbrew.runAsync("assert Coldbrew.run_function('getVar', 'h') == Counter");
          await Coldbrew.run("assert Coldbrew.run_function('getVar', 'i') == None");
          await Coldbrew.runAsync("assert Coldbrew.run_function('getVar', 'j') == 5");
          await Coldbrew.runAsync("assert Coldbrew.run_function('getVar', 'k') == None");
        } catch (e) {
          return JSON.stringify([e.message, e.stack]);
        }
        return true;
      });
      return expect(result).to.eventually.be.true;
    });

    it('should allow getting all types of JavaScript variables in Python via run_function return value while running asynchronously in worker mode', async function () {
      await utils.eval(this, async () => {
        Coldbrew.unload();
        return Coldbrew.load({worker: true});
      });
      var result = utils.eval(this, async () => {
        try {
          window.getVar = function (v) {
            return eval(v);
          };
          window.a = 5;
          window.b = "test";
          window.c = [5, "test"];
          window.d = {"test": 5, "test2": undefined};
          window.e = null;
          await Coldbrew.run("from collections import Counter");
          window.f = await Coldbrew.getVariable('Counter');
          window.g = Date;
          window.h = await Coldbrew.getVariableAsync('Counter');
          window.i = undefined;
          window.j = Promise.resolve(5);
          window.k = Promise.resolve(undefined);
          await Coldbrew.runAsync("assert Coldbrew.run_function('getVar', 'a') == 5");
          await Coldbrew.runAsync("assert Coldbrew.run_function('getVar', 'b') == 'test'");
          await Coldbrew.runAsync("assert Coldbrew.run_function('getVar', 'c') == [5, 'test']");
          await Coldbrew.runAsync("assert Coldbrew.run_function('getVar', 'd') == {'test': 5, 'test2': None}");
          await Coldbrew.runAsync("assert Coldbrew.run_function('getVar', 'e') == None");
          await Coldbrew.runAsync("assert Coldbrew.run_function('getVar', 'f') == Counter");
          await Coldbrew.runAsync("assert Coldbrew.JavaScriptVariable.is_javascript_variable(Coldbrew.run_function('getVar', 'Date'))");
          await Coldbrew.runAsync("assert Coldbrew.run_function('getVar', 'h') == Counter");
          await Coldbrew.runAsync("assert Coldbrew.run_function('getVar', 'i') == None");
          await Coldbrew.runAsync("assert Coldbrew.run_function('getVar', 'j') == 5");
          await Coldbrew.runAsync("assert Coldbrew.run_function('getVar', 'k') == None");
        } catch (e) {
          return JSON.stringify([e.message, e.stack]);
        }
        return true;
      });
      return expect(result).to.eventually.be.true;
    });

    it('should allow getting all types of JavaScript variables in Python via runFunction arguments in worker mode', async function () {
      await utils.eval(this, async () => {
        Coldbrew.unload();
        return Coldbrew.load({worker: true});
      });
      var result = utils.eval(this, async () => {
        try {
          await Coldbrew.run('def get_vars(*args):\n\tglobal a, b, c, d, e, f, g, h, i, j, k\n\ta, b, c, d, e, f, g, h, i, j, k = args');
          window.a = 5;
          window.b = "test";
          window.c = [5, "test"];
          window.d = {"test": 5, "test2": undefined};
          window.e = null;
          await Coldbrew.run("from collections import Counter");
          window.f = await Coldbrew.getVariable('Counter');
          window.g = Date;
          window.h = null;
          window.i = undefined;
          window.j = null;
          window.k = null;
          await Coldbrew.runFunction('get_vars', a, b, c, d, e, f, g, h, i, j, k);
          await Coldbrew.run("assert a == 5");
          await Coldbrew.run("assert b == 'test'");
          await Coldbrew.run("assert c == [5, 'test']");
          await Coldbrew.run("assert d == {'test': 5, 'test2': None}");
          await Coldbrew.run("assert e == None");
          await Coldbrew.run("assert f == Counter");
          await Coldbrew.run("assert Coldbrew.JavaScriptVariable.is_javascript_variable(g)");
          await Coldbrew.run("assert h == None");
          await Coldbrew.run("assert i == None");
          await Coldbrew.run("assert j == None");
          await Coldbrew.run("assert k == None");
        } catch (e) {
          return JSON.stringify([e.message, e.stack]);
        }
        return true;
      });
      return expect(result).to.eventually.be.true;
    });

    it('should allow getting all types of JavaScript variables in Python via runFunction keyword arguments in worker mode', async function () {
      await utils.eval(this, async () => {
        Coldbrew.unload();
        return Coldbrew.load({worker: true});
      });
      var result = utils.eval(this, async () => {
        try {
          await Coldbrew.run('def get_vars(**kwargs):\n\tglobal a, b, c, d, e, f, g, h, i, j, k\n\tkeys=list(kwargs.keys())\n\tkeys.sort()\n\ta, b, c, d, e, f, g, h, i, j, k = [kwargs[k] for k in keys]');
          window.a = 5;
          window.b = "test";
          window.c = [5, "test"];
          window.d = {"test": 5, "test2": undefined};
          window.e = null;
          await Coldbrew.run("from collections import Counter");
          window.f = await Coldbrew.getVariable('Counter');
          window.g = Date;
          window.h = null;
          window.i = undefined;
          window.j = null;
          window.k = null;
          await Coldbrew.runFunction('get_vars', Coldbrew.PythonKeywords({a, b, c, d, e, f, g, h, i, j, k}));
          await Coldbrew.run("assert a == 5");
          await Coldbrew.run("assert b == 'test'");
          await Coldbrew.run("assert c == [5, 'test']");
          await Coldbrew.run("assert d == {'test': 5, 'test2': None}");
          await Coldbrew.run("assert e == None");
          await Coldbrew.run("assert f == Counter");
          await Coldbrew.run("assert Coldbrew.JavaScriptVariable.is_javascript_variable(g)");
          await Coldbrew.run("assert h == None");
          await Coldbrew.run("assert i == None");
          await Coldbrew.run("assert j == None");
          await Coldbrew.run("assert k == None");
        } catch (e) {
          return JSON.stringify([e.message, e.stack]);
        }
        return true;
      });
      return expect(result).to.eventually.be.true;
    });

    it('should allow getting all types of JavaScript variables in Python via runFunctionAsync arguments in worker mode', async function () {
      await utils.eval(this, async () => {
        Coldbrew.unload();
        return Coldbrew.load({worker: true});
      });
      var result = utils.eval(this, async () => {
        try {
          await Coldbrew.run('def get_vars(*args):\n\tglobal a, b, c, d, e, f, g, h, i, j, k\n\ta, b, c, d, e, f, g, h, i, j, k = args');
          window.a = 5;
          window.b = "test";
          window.c = [5, "test"];
          window.d = {"test": 5, "test2": undefined};
          window.e = null;
          await Coldbrew.run("from collections import Counter");
          window.f = await Coldbrew.getVariable('Counter');
          window.g = Date;
          window.h = await Coldbrew.getVariableAsync('Counter');
          window.i = undefined;
          window.j = Promise.resolve(5);
          window.k = Promise.resolve(undefined);
          await Coldbrew.runFunctionAsync('get_vars', a, b, c, d, e, f, g, h, i, j, k);
          await Coldbrew.run("assert a == 5");
          await Coldbrew.run("assert b == 'test'");
          await Coldbrew.run("assert c == [5, 'test']");
          await Coldbrew.run("assert d == {'test': 5, 'test2': None}");
          await Coldbrew.run("assert e == None");
          await Coldbrew.run("assert f == Counter");
          await Coldbrew.run("assert Coldbrew.JavaScriptVariable.is_javascript_variable(g)");
          await Coldbrew.run("assert h == Counter");
          await Coldbrew.run("assert i == None");
          await Coldbrew.run("assert j == 5");
          await Coldbrew.run("assert k == None");
        } catch (e) {
          return JSON.stringify([e.message, e.stack]);
        }
        return true;
      });
      return expect(result).to.eventually.be.true;
    });

    it('should allow getting all types of JavaScript variables in Python via runFunctionAsync keyword arguments in worker mode', async function () {
      await utils.eval(this, async () => {
        Coldbrew.unload();
        return Coldbrew.load({worker: true});
      });
      var result = utils.eval(this, async () => {
        try {
          await Coldbrew.run('def get_vars(**kwargs):\n\tglobal a, b, c, d, e, f, g, h, i, j, k\n\tkeys=list(kwargs.keys())\n\tkeys.sort()\n\ta, b, c, d, e, f, g, h, i, j, k = [kwargs[k] for k in keys]');
          window.a = 5;
          window.b = "test";
          window.c = [5, "test"];
          window.d = {"test": 5, "test2": undefined};
          window.e = null;
          await Coldbrew.run("from collections import Counter");
          window.f = await Coldbrew.getVariable('Counter');
          window.g = Date;
          window.h = await Coldbrew.getVariableAsync('Counter');
          window.i = undefined;
          window.j = Promise.resolve(5);
          window.k = Promise.resolve(undefined);
          await Coldbrew.runFunctionAsync('get_vars', Coldbrew.PythonKeywords({a, b, c, d, e, f, g, h, i, j, k}));
          await Coldbrew.run("assert a == 5");
          await Coldbrew.run("assert b == 'test'");
          await Coldbrew.run("assert c == [5, 'test']");
          await Coldbrew.run("assert d == {'test': 5, 'test2': None}");
          await Coldbrew.run("assert e == None");
          await Coldbrew.run("assert f == Counter");
          await Coldbrew.run("assert Coldbrew.JavaScriptVariable.is_javascript_variable(g)");
          await Coldbrew.run("assert h == Counter");
          await Coldbrew.run("assert i == None");
          await Coldbrew.run("assert j == 5");
          await Coldbrew.run("assert k == None");
        } catch (e) {
          return JSON.stringify([e.message, e.stack]);
        }
        return true;
      });
      return expect(result).to.eventually.be.true;
    });
  });
});