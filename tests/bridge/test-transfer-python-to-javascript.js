const utils = require('../utils');
const { expect } = require('chai');

describe.only('Bridge Variables', function() {
  describe.only('Transfer Python --> JavaScript', function() {
    it('should allow getting all types of Python variables in JavaScript via getVariable', async function () {
      var a = utils.eval(this, () => {
        Coldbrew.run("a = 5");
        return Coldbrew.getVariable("a");
      });
      var b = utils.eval(this, () => {
        Coldbrew.run("b = 'test'");
        return Coldbrew.getVariable("b");
      });
      var c = utils.eval(this, () => {
        Coldbrew.run("c = [5, 'test']");
        return Coldbrew.getVariable("c");
      });
      var d = utils.eval(this, () => {
        Coldbrew.run("d = {'test': 5}");
        return Coldbrew.getVariable("d");
      });
      var e = utils.eval(this, () => {
        Coldbrew.run("e = None");
        return Coldbrew.getVariable("e");
      });
      var f = utils.eval(this, () => {
        Coldbrew.run("f = Coldbrew.get_variable('Date')");
        return Coldbrew.getVariable("f") === Date;
      });
      var g = utils.eval(this, () => {
        Coldbrew.run("from collections import Counter");
        Coldbrew.run("g = Counter");
        return Coldbrew.PythonVariable.isPythonVariable(Coldbrew.getVariable("Counter"));
      });
      return Promise.all([
        expect(a).to.eventually.equal(5),
        expect(b).to.eventually.equal('test'),
        expect(c).to.eventually.be.an('array').that.includes(5).and.includes('test'),
        expect(d).to.eventually.be.an('object').that.includes({'test': 5}),
        expect(e).to.eventually.be.null,
        expect(f).to.eventually.be.true,
        expect(g).to.eventually.be.true,
      ]);
    });
    it('should allow getting all types of Python variables in JavaScript via getVariableAsync', async function () {
      var a = await utils.eval(this, () => {
        Coldbrew.run("a = 5");
        return Coldbrew.getVariableAsync("a");
      });
      var b = await utils.eval(this, () => {
        Coldbrew.run("b = 'test'");
        return Coldbrew.getVariableAsync("b");
      });
      var c = await utils.eval(this, () => {
        Coldbrew.run("c = [5, 'test']");
        return Coldbrew.getVariableAsync("c");
      });
      var d = await utils.eval(this, () => {
        Coldbrew.run("d = {'test': 5}");
        return Coldbrew.getVariableAsync("d");
      });
      var e = await utils.eval(this, () => {
        Coldbrew.run("e = None");
        return Coldbrew.getVariableAsync("e");
      });
      var f = await utils.eval(this, async () => {
        Coldbrew.run("f = Coldbrew.get_variable('Date')");
        return (await Coldbrew.getVariableAsync("f")) === Date;
      });
      var g = await utils.eval(this, async () => {
        Coldbrew.run("from collections import Counter");
        Coldbrew.run("g = Counter");
        return Coldbrew.PythonVariable.isPythonVariable(await Coldbrew.getVariableAsync("Counter"));
      });
      expect(a).to.equal(5);
      expect(b).to.equal('test');
      expect(c).to.be.an('array').that.includes(5).and.includes('test');
      expect(d).to.be.an('object').that.includes({'test': 5});
      expect(e).to.be.null;
      expect(f).to.be.true;
      expect(g).to.be.true;
    });
    it('should allow getting all types of Python variables in JavaScript via runFunction return value', async function () {
      await utils.eval(this, () => {
        Coldbrew.run('def get_var(var):\n\treturn eval(var)')
      });
      var a = utils.eval(this, () => {
        Coldbrew.run("a = 5");
        return Coldbrew.runFunction("get_var", "a");
      });
      var b = utils.eval(this, () => {
        Coldbrew.run("b = 'test'");
        return Coldbrew.runFunction("get_var", "b");
      });
      var c = utils.eval(this, () => {
        Coldbrew.run("c = [5, 'test']");
        return Coldbrew.runFunction("get_var", "c");
      });
      var d = utils.eval(this, () => {
        Coldbrew.run("d = {'test': 5}");
        return Coldbrew.runFunction("get_var", "d");
      });
      var e = utils.eval(this, () => {
        Coldbrew.run("e = None");
        return Coldbrew.runFunction("get_var", "e");
      });
      var f = utils.eval(this, () => {
        Coldbrew.run("f = Coldbrew.get_variable('Date')");
        return Coldbrew.runFunction("get_var", "f") === Date;
      });
      var g = utils.eval(this, () => {
        Coldbrew.run("from collections import Counter");
        Coldbrew.run("g = Counter");
        return Coldbrew.PythonVariable.isPythonVariable(Coldbrew.runFunction("get_var", "Counter"));
      });
      return Promise.all([
        expect(a).to.eventually.equal(5),
        expect(b).to.eventually.equal('test'),
        expect(c).to.eventually.be.an('array').that.includes(5).and.includes('test'),
        expect(d).to.eventually.be.an('object').that.includes({'test': 5}),
        expect(e).to.eventually.be.null,
        expect(f).to.eventually.be.true,
        expect(g).to.eventually.be.true,
      ]);
    });
    it('should allow getting all types of Python variables in JavaScript via runFunctionAsync return value', async function () {
      await utils.eval(this, () => {
        Coldbrew.run('def get_var(var):\n\treturn eval(var)')
      });
      var a = await utils.eval(this, () => {
        Coldbrew.run("a = 5");
        return Coldbrew.runFunctionAsync("get_var", "a");
      });
      var b = await utils.eval(this, () => {
        Coldbrew.run("b = 'test'");
        return Coldbrew.runFunctionAsync("get_var", "b");
      });
      var c = await utils.eval(this, () => {
        Coldbrew.run("c = [5, 'test']");
        return Coldbrew.runFunctionAsync("get_var", "c");
      });
      var d = await utils.eval(this, () => {
        Coldbrew.run("d = {'test': 5}");
        return Coldbrew.runFunctionAsync("get_var", "d");
      });
      var e = await utils.eval(this, () => {
        Coldbrew.run("e = None");
        return Coldbrew.runFunctionAsync("get_var", "e");
      });
      var f = await utils.eval(this, async () => {
        Coldbrew.run("f = Coldbrew.get_variable('Date')");
        return (await Coldbrew.runFunctionAsync("get_var", "f")) === Date;
      });
      var g = await utils.eval(this, async () => {
        Coldbrew.run("from collections import Counter");
        Coldbrew.run("g = Counter");
        return Coldbrew.PythonVariable.isPythonVariable(await Coldbrew.runFunctionAsync("get_var", "Counter"));
      });
      expect(a).to.equal(5);
      expect(b).to.equal('test');
      expect(c).to.be.an('array').that.includes(5).and.includes('test');
      expect(d).to.be.an('object').that.includes({'test': 5});
      expect(e).to.be.null;
      expect(f).to.be.true;
      expect(g).to.be.true;
    });
    it('should allow getting all types of Python variables in JavaScript via run_function arguments', async function () {
      var {a, b, c, d, e, f, g} = await utils.eval(this, () => {
        var result;
        window.get_vars = function(a, b, c, d, e, f, g) {
          result = {a, b, c, d, e, f: f === Date, g: Coldbrew.PythonVariable.isPythonVariable(g)};
        };
        Coldbrew.run("a = 5");
        Coldbrew.run("b = 'test'");
        Coldbrew.run("c = [5, 'test']");
        Coldbrew.run("d = {'test': 5}");
        Coldbrew.run("e = None");
        Coldbrew.run("f = Coldbrew.get_variable('Date')");
        Coldbrew.run("from collections import Counter");
        Coldbrew.run("g = Counter");
        Coldbrew.run("Coldbrew.run_function('get_vars', a, b, c, d, e, f, g)");
        return result;
      });
      expect(a).to.equal(5);
      expect(b).to.equal('test');
      expect(c).to.be.an('array').that.includes(5).and.includes('test');
      expect(d).to.be.an('object').that.includes({'test': 5});
      expect(e).to.be.null;
      expect(f).to.be.true;
      expect(g).to.be.true;
    });
  });
});