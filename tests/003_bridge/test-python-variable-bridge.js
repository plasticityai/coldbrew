const utils = require('../utils');
const { expect } = require('chai');

describe('Bridge Variables', function() {
  describe('Python Variables in JavaScript', async function() {
    it('should allow interaction with a PythonVariable in JavaScript', async function () {
      var result = utils.eval(this, async () => {
        try {
          Coldbrew.run("from collections import Counter");
          Coldbrew.run("counter_1 = Counter(['a', 'a', 'a',  'b', 'b', 'c'])");
          Coldbrew.run("class MyClass:\n\tdef __init__(self, **kwargs):\n\t\tself.a = kwargs['a']\n\tdef to_json(self):\n\t\treturn '5'\n\tdef keyword_func(self, **kwargs):\n\t\treturn kwargs['a']");
          var Counter = Coldbrew.getVariable('Counter');
          var counter1 = Coldbrew.getVariable('counter_1');
          var MyClass = Coldbrew.getVariable('MyClass');
          assert(Coldbrew.getVariable('"'+Counter.__uid__+'" in Coldbrew._vars'));
          assert(Counter.__type__ === 'type');
          assert(Counter.__destroyed__ === false);
          assert(['__type__', '__uid__', '__inspect__', '__destroy__', '__destroyed__', 'toString', 'toJSON', '__init__', 'mostCommon'].every(k => Counter.__inspect__().indexOf(k) > -1));
          assert(typeof Counter.fooUndefinedValue === 'undefined');
          assert(counter1.a === 3);
          assert(Coldbrew.PythonVariable.isPythonVariable(Counter.__init__));
          assert(('fooUndefinedValue' in Counter) === false);
          assert(('a' in counter1) === true);
          assert(('__init__' in Counter) === true);
          assert(Counter.toString().indexOf('collections.Counter') > -1);
          assert(JSON.stringify(Counter.toString()) === Counter.toJSON());
          var myclass = new MyClass(Coldbrew.PythonKeywords({a: 7}));
          assert(myclass.a === 7);
          assert(myclass.keyword_func(Coldbrew.PythonKeywords({a: 7})) === 7);
          assert((new Counter(['a', 'a', 'a',  'b', 'b', 'c'])).mostCommon()[0][0] === "a");
          myclass.to_json = 10;
          assert(myclass.to_json === 10);
          counter1.d = 5;
          assert(counter1.mostCommon()[0][0] === "d");
          delete counter1.fooUndefinedValue;
          delete myclass.to_json;
          delete counter1.d;
          assert(myclass.toJSON() === JSON.stringify(5));
          assert(counter1.mostCommon()[0][0] === "a");
          var iter = [];
          for (x of counter1) {
            iter.push(x);
          }
          assert(iter.length == 3 && iter[0] === "a");
          var asyncIter = [];
          for await (x of counter1) {
            asyncIter.push(x);
          }
          assert(asyncIter.length == 3 && asyncIter[0] === "a");
          assert(['__type__', '__uid__', '__inspect__', '__destroy__', '__destroyed__', 'toString', 'toJSON', 'mostCommon'].every(k => Object.getOwnPropertyNames(counter1).indexOf(k) > -1));
          Counter.__destroy__();
          assert(Counter.__destroyed__ === true);
          assert(Coldbrew.getVariable('"'+Counter.__uid__+'" in Coldbrew._vars') === false);
          assert(Object.keys(Coldbrew.getVariable('Coldbrew._vars')).length !== 0);
          Coldbrew.destroyAllVariables();
          assert(Object.keys(Coldbrew.getVariable('Coldbrew._vars')).length === 0);
          Coldbrew.run('assert Coldbrew._get_variable("Object.keys(Coldbrew._slots).length") == 0');
        } catch (e) {
          return JSON.stringify([e.message, e.stack]);
        }
        return true;
      });
      return expect(result).to.eventually.be.true;
    });

    it('should allow interaction with an asynchronous PythonVariable in JavaScript', async function () {
      var result = utils.eval(this, async () => {
        try {
          Coldbrew.run("from collections import Counter");
          Coldbrew.run("counter_1 = Counter(['a', 'a', 'a',  'b', 'b', 'c'])");
          Coldbrew.run("class MyClass:\n\tdef __init__(self, **kwargs):\n\t\tself.a = kwargs['a']\n\tdef to_json(self):\n\t\treturn '5'\n\tdef keyword_func(self, **kwargs):\n\t\treturn kwargs['a']");
          var Counter = await Coldbrew.getVariableAsync('Counter');
          var counter1 = await Coldbrew.getVariableAsync('counter_1');
          var MyClass = await Coldbrew.getVariableAsync('MyClass');
          assert(await Coldbrew.getVariableAsync('"'+Counter.__uid__+'" in Coldbrew._vars'));
          assert(Counter.__type__ === 'type');
          assert(Counter.__destroyed__ === false);
          assert(['__type__', '__uid__', '__inspect__', '__destroy__', '__destroyed__', 'toString', 'toJSON', '__init__', 'mostCommon'].every(k => Counter.__inspect__().indexOf(k) > -1));
          assert(typeof Counter.fooUndefinedValue === 'undefined');
          assert(await counter1.a === 3);
          assert(await Coldbrew.PythonVariable.isPythonVariable(Counter.__init__));
          assert(('fooUndefinedValue' in Counter) === false);
          assert(('a' in counter1) === true);
          assert(('__init__' in Counter) === true);
          assert((await Counter.toString()).indexOf('collections.Counter') > -1);
          assert(JSON.stringify(await Counter.toString()) === await Counter.toJSON());
          var myclass = new MyClass(Coldbrew.PythonKeywords({a: 7}));
          assert(await myclass.a === 7);
          assert(await myclass.keyword_func(Coldbrew.PythonKeywords({a: 7})) === 7);
          assert((await (new Counter(['a', 'a', 'a',  'b', 'b', 'c'])).mostCommon())[0][0] === "a");
          myclass.to_json = 10;
          await defer();
          assert(await myclass.to_json === 10);
          counter1.d = 5;
          await defer();
          assert((await counter1.mostCommon())[0][0] === "d");
          delete counter1.fooUndefinedValue;
          delete myclass.to_json;
          delete counter1.d;
          assert(await myclass.toJSON() === JSON.stringify(5));
          assert((await counter1.mostCommon())[0][0] === "a");
          var iter = [];
          for (x of counter1) {
            iter.push(await x);
          }
          assert(iter.length == 3 && iter[0] === "a");
          var asyncIter = [];
          for await (x of counter1) {
            asyncIter.push(x);
          }
          assert(asyncIter.length == 3 && asyncIter[0] === "a");
          assert(['__type__', '__uid__', '__inspect__', '__destroy__', '__destroyed__', 'toString', 'toJSON'].every(k => Object.getOwnPropertyNames(counter1).indexOf(k) > -1));
          Counter.__destroy__();
          assert(Counter.__destroyed__ === true);
          assert((await Coldbrew.getVariableAsync('"'+Counter.__uid__+'" in Coldbrew._vars')) === false);
          Coldbrew.run("import urllib.request");
          var urllib = Coldbrew.getVariableAsync('urllib');
          assert((await urllib.request.urlopen("http://coldbrew.plasticity.ai/remote/example.txt").read().toString()).indexOf('downloaded from a remote server') > -1);
          assert(Object.keys(await Coldbrew.getVariableAsync('Coldbrew._vars')).length !== 0);
          Coldbrew.destroyAllVariables();
          assert(Object.keys(await Coldbrew.getVariableAsync('Coldbrew._vars')).length === 0);
          await Coldbrew.runAsync('assert Coldbrew._get_variable("Object.keys(Coldbrew._slots).length") == 0');
        } catch (e) {
          return JSON.stringify([e.message, e.stack]);
        }
        return true;
      });
      return expect(result).to.eventually.be.true;
    });

    it('should allow interaction with a PythonVariable in JavaScript in worker mode', async function () {
      await utils.eval(this, async () => {
        Coldbrew.unload();
        return Coldbrew.load({worker: true});
      });
      var result = utils.eval(this, async () => {
        try {
          await Coldbrew.run("from collections import Counter");
          await Coldbrew.run("counter_1 = Counter(['a', 'a', 'a',  'b', 'b', 'c'])");
          await Coldbrew.run("class MyClass:\n\tdef __init__(self, **kwargs):\n\t\tself.a = kwargs['a']\n\tdef to_json(self):\n\t\treturn '5'\n\tdef keyword_func(self, **kwargs):\n\t\treturn kwargs['a']");
          var Counter = Coldbrew.getVariable('Counter');
          await Counter;
          var counter1 = Coldbrew.getVariable('counter_1');
          await counter1;
          var MyClass = Coldbrew.getVariable('MyClass');
          await MyClass;
          assert(await Coldbrew.getVariable('"'+await Counter.__uid__+'" in Coldbrew._vars'));
          assert(await Counter.__type__ === 'type');
          assert(await Counter.__destroyed__ === false);
          assert(['__type__', '__uid__', '__inspect__', '__destroy__', '__destroyed__', 'toString', 'toJSON', '__init__', 'mostCommon'].every(async k => (await Counter.__inspect__()).indexOf(k) > -1));
          assert(typeof await Counter.fooUndefinedValue === 'undefined');
          assert(await counter1.a === 3);
          assert(await Coldbrew.PythonVariable.isPythonVariable(Counter.__init__));
          assert((await Counter.toString()).indexOf('collections.Counter') > -1);
          assert(JSON.stringify(await Counter.toString()) === await Counter.toJSON());
          var myclass = new MyClass(Coldbrew.PythonKeywords({a: 7}));
          assert(await myclass.a === 7);
          assert(await myclass.keyword_func(Coldbrew.PythonKeywords({a: 7})) === 7);
          assert((await (new Counter(['a', 'a', 'a',  'b', 'b', 'c'])).mostCommon())[0][0] === "a");
          myclass.to_json = 10;
          await defer();
          assert(await myclass.to_json === 10);
          counter1.d = 5;
          await defer();
          assert((await counter1.mostCommon())[0][0] === "d");
          delete counter1.fooUndefinedValue;
          delete myclass.to_json;
          delete counter1.d;
          await defer();
          await myclass.toJSON();
          assert(await myclass.toJSON() === JSON.stringify(5));
          assert((await counter1.mostCommon())[0][0] === "a");
          var asyncIter = [];
          for await (x of counter1) {
            asyncIter.push(x);
          }
          assert(asyncIter.length == 3 && asyncIter[0] === "a");
          assert(['__type__', '__uid__', '__inspect__', '__destroy__', '__destroyed__', 'toString', 'toJSON'].every(async k => (await Counter.__inspect__()).indexOf(k) > -1));
          await Counter.__destroy__();
          assert(await Counter.__destroyed__ === true);
          assert((await Coldbrew.getVariable('"'+await Counter.__uid__+'" in Coldbrew._vars')) === false);
          await Coldbrew.run("import urllib.request");
          var urllib = Coldbrew.getVariable('urllib');
          assert((await urllib.request.urlopen("http://coldbrew.plasticity.ai/remote/example.txt").read().toString()).indexOf('downloaded from a remote server') > -1);
          assert(Object.keys(await Coldbrew.getVariable('Coldbrew._vars')).length !== 0);
          await Coldbrew.destroyAllVariables();
          assert(Object.keys(await Coldbrew.getVariable('Coldbrew._vars')).length === 0);
          await Coldbrew.run('assert Coldbrew._get_variable("Object.keys(Coldbrew._slots).length") == 0');
        } catch (e) {
          return JSON.stringify([e.message, e.stack]);
        }
        return true;
      });
      return expect(result).to.eventually.be.true;
    });

    it('should allow interaction with an asynchronous PythonVariable in JavaScript in worker mode', async function () {
      await utils.eval(this, async () => {
        Coldbrew.unload();
        return Coldbrew.load({worker: true});
      });
      var result = utils.eval(this, async () => {
        try {
          await Coldbrew.run("from collections import Counter");
          await Coldbrew.run("counter_1 = Counter(['a', 'a', 'a',  'b', 'b', 'c'])");
          await Coldbrew.run("class MyClass:\n\tdef __init__(self, **kwargs):\n\t\tself.a = kwargs['a']\n\tdef to_json(self):\n\t\treturn '5'\n\tdef keyword_func(self, **kwargs):\n\t\treturn kwargs['a']");
          var Counter = Coldbrew.getVariableAsync('Counter');
          await Counter;
          var counter1 = Coldbrew.getVariableAsync('counter_1');
          await counter1;
          var MyClass = Coldbrew.getVariableAsync('MyClass');
          await MyClass;
          assert(await Coldbrew.getVariableAsync('"'+await Counter.__uid__+'" in Coldbrew._vars'));
          assert(await Counter.__type__ === 'type');
          assert(await Counter.__destroyed__ === false);
          assert(['__type__', '__uid__', '__inspect__', '__destroy__', '__destroyed__', 'toString', 'toJSON', '__init__', 'mostCommon'].every(async k => (await Counter.__inspect__()).indexOf(k) > -1));
          assert(typeof await Counter.fooUndefinedValue === 'undefined');
          assert(await counter1.a === 3);
          assert(await Coldbrew.PythonVariable.isPythonVariable(Counter.__init__));
          assert((await Counter.toString()).indexOf('collections.Counter') > -1);
          assert(JSON.stringify(await Counter.toString()) === await Counter.toJSON());
          var myclass = new MyClass(Coldbrew.PythonKeywords({a: 7}));
          assert(await myclass.a === 7);
          assert(await myclass.keyword_func(Coldbrew.PythonKeywords({a: 7})) === 7);
          assert((await (new Counter(['a', 'a', 'a',  'b', 'b', 'c'])).mostCommon())[0][0] === "a");
          myclass.to_json = 10;
          await defer();
          assert(await myclass.to_json === 10);
          counter1.d = 5;
          await defer();
          assert((await counter1.mostCommon())[0][0] === "d");
          delete counter1.fooUndefinedValue;
          delete myclass.to_json;
          delete counter1.d;
          await defer();
          await myclass.toJSON();
          assert(await myclass.toJSON() === JSON.stringify(5));
          assert((await counter1.mostCommon())[0][0] === "a");
          var asyncIter = [];
          for await (x of counter1) {
            asyncIter.push(x);
          }
          assert(asyncIter.length == 3 && asyncIter[0] === "a");
          assert(['__type__', '__uid__', '__inspect__', '__destroy__', '__destroyed__', 'toString', 'toJSON'].every(async k => (await Counter.__inspect__()).indexOf(k) > -1));
          await Counter.__destroy__();
          assert(await Counter.__destroyed__ === true);
          assert((await Coldbrew.getVariableAsync('"'+await Counter.__uid__+'" in Coldbrew._vars')) === false);
          await Coldbrew.run("import urllib.request");
          var urllib = Coldbrew.getVariableAsync('urllib');
          assert((await urllib.request.urlopen("http://coldbrew.plasticity.ai/remote/example.txt").read().toString()).indexOf('downloaded from a remote server') > -1);
          assert(Object.keys(await Coldbrew.getVariableAsync('Coldbrew._vars')).length !== 0);
          await Coldbrew.destroyAllVariables();
          assert(Object.keys(await Coldbrew.getVariableAsync('Coldbrew._vars')).length === 0);
          await Coldbrew.runAsync('assert Coldbrew._get_variable("Object.keys(Coldbrew._slots).length") == 0');
        } catch (e) {
          return JSON.stringify([e.message, e.stack]);
        }
        return true;
      });
      return expect(result).to.eventually.be.true;
    });
    
    it('should attach debugging information to a PythonVariable', async function () {
      var result = utils.eval(this, async () => {
        try {
          Coldbrew.run("from collections import Counter");
          Coldbrew.run("counter_1 = Counter(['a', 'a', 'a',  'b', 'b', 'c'])");
          Coldbrew.run("class MyClass:\n\tdef __init__(self, **kwargs):\n\t\tself.a = kwargs['a']\n\tdef to_json(self):\n\t\treturn '5'\n\tdef keyword_func(self, **kwargs):\n\t\treturn kwargs['a']");
          var Counter = Coldbrew.getVariable('Counter');
          var counter1 = Coldbrew.getVariable('counter_1');
          assert(Counter.__proto__.__type__  === 'type');
          assert(typeof Counter.__proto__.__class__ !== 'undefined');
          assert(typeof Counter.__proto__.__dir__ !== 'undefined');
          assert(counter1.__proto__.__type__  === 'Counter');
          assert(typeof counter1.__proto__.mostCommon  !== 'undefined');
        } catch (e) {
          return JSON.stringify([e.message, e.stack]);
        }
        return true;
      });
      return expect(result).to.eventually.be.true;
    });

    it('should allow you to disable transformVariableCasing', async function () {
      await utils.eval(this, async () => {
        Coldbrew.unload();
        return Coldbrew.load({transformVariableCasing: false});
      });
      var result = utils.eval(this, async () => {
        try {
          Coldbrew.run("from collections import Counter");
          var Counter = Coldbrew.getVariable('Counter');
          Coldbrew.run("counter_1 = Counter(['a', 'a', 'a',  'b', 'b', 'c'])");
          var counter1 = Coldbrew.getVariable('counter_1');
          assert(typeof counter1.most_common !== 'undefined');
          assert(typeof counter1.mostCommon === 'undefined');
        } catch (e) {
          return JSON.stringify([e.message, e.stack]);
        }
        return true;
      });
      return expect(result).to.eventually.be.true;
    });
  });
});