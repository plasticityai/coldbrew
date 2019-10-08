const utils = require('../utils');
const { expect } = require('chai');

describe('Bridge Variables', function() {
  describe('JavaScript Variables in Python', async function() {
    it('should allow interaction with a JavaScriptVariable in Python', async function () {
      var result = utils.eval(this, async () => {
        try {
          class MyClassLength {
            constructor() {
              this.length = 5;
            }
          }
          class MyClassSize {
            constructor() {
              this.size = 6;
            }
          }
          class MyClassSizeFunc {
            size() {
              return 7;
            }
          }
          class MyClassPromise {
            doAsync() {
              return Promise.resolve(8);
            }
          }
          class MyClassUndefined {
            constructor() {
              this.foo = undefined;
            }
          }
          window.MyClassLength = MyClassLength;
          window.MyClassSize = MyClassSize;
          window.MyClassSizeFunc = MyClassSizeFunc;
          window.MyClassPromise = MyClassPromise;
          window.MyClassUndefined = MyClassUndefined;
          window.date1 = new Date();
          window.map1 = new Map([['a', 1], ['b', 2], ['c', 3]]);
          Coldbrew.run('my_class_length = Coldbrew.get_variable("new MyClassLength()")');
          Coldbrew.run('my_class_size = Coldbrew.get_variable("new MyClassSize()")');
          Coldbrew.run('my_class_size_func = Coldbrew.get_variable("new MyClassSizeFunc()")');
          Coldbrew.run('my_class_promise = Coldbrew.get_variable("new MyClassPromise()")');
          Coldbrew.run('my_class_undefined = Coldbrew.get_variable("new MyClassUndefined()")');
          Coldbrew.run('Date = Coldbrew.get_variable("Date")');
          Coldbrew.run('Map = Coldbrew.get_variable("Map")');
          Coldbrew.run('date_1 = Coldbrew.get_variable("date1")');
          Coldbrew.run('map_1 = Coldbrew.get_variable("map1")');
          Coldbrew.run('assert Date.__type__ == "Function"');
          Coldbrew.run('assert date_1.__type__ == "Date"');
          Coldbrew.run('assert "function Map() {" in str(Map)');
          Coldbrew.run('assert "<JavaScriptVariable \'Map\'>" in repr(Map)');
          Coldbrew.run('assert "[object Map]" in str(map_1)');
          Coldbrew.run('assert "JavaScriptVariable Map.instance at" in repr(map_1)');
          Coldbrew.run('assert set(map_1.__inspect__()) == set(dir(map_1))');
          Coldbrew.run('assert set(["__type__", "__uid__", "__inspect__", "__destroy__", "__destroyed__", "constructor", "__str__", "__repr__", "entries", "for_each"]).issubset(set(dir(map_1)))');
          Coldbrew.run('assert date_1.__destroyed__ == False');
          Coldbrew.run('assert Coldbrew._get_variable("typeof Coldbrew._vars[\'"+map_1.__uid__+"\'] !== \'undefined\'")');
          Coldbrew.run('assert date_1.get_full_year() > 2000 and date_1.get_full_year() < 4000');
          Coldbrew.run('assert date_1["get_full_year"]() > 2000 and date_1["get_full_year"]() < 4000');
          Coldbrew.run('assert (Date())["get_full_year"]() > 2000 and (Date())["get_full_year"]() < 4000');
          Coldbrew.run('assert map_1.entries().next()["value"] == ["a", 1]');
          Coldbrew.run('try:\n\tdate_1.foo_undefined_value\n\tassert False\nexcept Exception as e:\n\tassert isinstance(e, AttributeError)');
          Coldbrew.run('try:\n\tdel date_1.foo_undefined_value\n\tassert False\nexcept Exception as e:\n\tassert isinstance(e, AttributeError)');
          Coldbrew.run('try:\n\tnext(iter(date_1))\n\tassert False\nexcept Exception as e:\n\tassert isinstance(e, TypeError)');
          Coldbrew.run('date_1.foo = 5');
          Coldbrew.run('date_1["bar"] = 5');
          Coldbrew.run('assert "foo_undefined_value" not in date_1');
          Coldbrew.run('assert "foo" in date_1');
          Coldbrew.run('assert "bar" in date_1');
          Coldbrew.run('assert date_1.foo == 5');
          Coldbrew.run('assert date_1["bar"] == 5');
          Coldbrew.run('del date_1.bar');
          Coldbrew.run('del date_1["foo"]');
          Coldbrew.run('assert "foo" not in date_1');
          Coldbrew.run('assert "bar" not in date_1');
          Coldbrew.run('assert "getFullYear" in date_1');
          Coldbrew.run('assert "get_full_year" in date_1');
          Coldbrew.run('assert my_class_undefined.foo == None');
          Coldbrew.run('assert "foo" in my_class_undefined');
          Coldbrew.run('del my_class_undefined.foo');
          Coldbrew.run('try:\n\tmy_class_undefined.foo\n\tassert False\nexcept Exception as e:\n\tassert isinstance(e, AttributeError)');
          Coldbrew.run('assert len(my_class_length) == 5');
          Coldbrew.run('assert len(my_class_size) == 6');
          Coldbrew.run('assert len(my_class_size_func) == 7');
          Coldbrew.run('try:\n\tlen(date_1)\n\tassert False\nexcept Exception as e:\n\tassert isinstance(e, AttributeError)');
          await Coldbrew.runAsync('assert my_class_promise.doAsync() == 8');
          Coldbrew.run('assert list(map_1) == [["a", 1], ["b", 2], ["c", 3]]');
          Coldbrew.run('map_1.set("d", 4)');
          Coldbrew.run('assert map_1.get("d") == 4');
          Coldbrew.run('map_1.__destroy__()');
          Coldbrew.run('assert map_1.__destroyed__ == True');
          Coldbrew.run('assert Coldbrew._get_variable("typeof Coldbrew._vars[\'"+map_1.__uid__+"\'] === \'undefined\'")');
          Coldbrew.run('date_1_uid = date_1.__uid__');
          Coldbrew.run('assert Coldbrew._get_variable("typeof Coldbrew._vars[\'"+date_1_uid+"\'] !== \'undefined\'")');
          Coldbrew.run('del date_1')
          Coldbrew.run('assert Coldbrew._get_variable("typeof Coldbrew._vars[\'"+date_1_uid+"\'] === \'undefined\'")');
          Coldbrew.run('assert Coldbrew._get_variable("Object.keys(Coldbrew._vars).length") != 0');
          Coldbrew.run('Coldbrew.destroy_all_variables()');
          Coldbrew.run('assert Coldbrew._get_variable("Object.keys(Coldbrew._vars).length") == 0');
          Coldbrew.run('assert Coldbrew._get_variable("Object.keys(Coldbrew._promises_resolved_values).length") == 0');
          Coldbrew.run('assert Coldbrew._get_variable("Object.keys(Coldbrew._main_thread_vars).length") == 0');
          assert(Object.keys(Coldbrew._main_thread_vars).length == 0);
          Coldbrew.run('assert Coldbrew._get_variable("Coldbrew._pending_main_thread_vars ? Coldbrew._pending_main_thread_vars.size : 0") == 0');
        } catch (e) {
          return JSON.stringify([e.message, e.stack]);
        }
        return true;
      });
      return expect(result).to.eventually.be.true;
    });

    it('should allow interaction with a JavaScriptVariable in Python while running asynchronously', async function () {
      var result = utils.eval(this, async () => {
        try {
          class MyClassLength {
            constructor() {
              this.length = 5;
            }
          }
          class MyClassSize {
            constructor() {
              this.size = 6;
            }
          }
          class MyClassSizeFunc {
            size() {
              return 7;
            }
          }
          class MyClassPromise {
            doAsync() {
              return Promise.resolve(8);
            }
          }
          class MyClassUndefined {
            constructor() {
              this.foo = undefined;
            }
          }
          window.MyClassLength = MyClassLength;
          window.MyClassSize = MyClassSize;
          window.MyClassSizeFunc = MyClassSizeFunc;
          window.MyClassPromise = MyClassPromise;
          window.MyClassUndefined = MyClassUndefined;
          window.date1 = new Date();
          window.map1 = new Map([['a', 1], ['b', 2], ['c', 3]]);
          await Coldbrew.runAsync('my_class_length = Coldbrew.get_variable("new MyClassLength()")');
          await Coldbrew.runAsync('my_class_size = Coldbrew.get_variable("new MyClassSize()")');
          await Coldbrew.runAsync('my_class_size_func = Coldbrew.get_variable("new MyClassSizeFunc()")');
          await Coldbrew.runAsync('my_class_promise = Coldbrew.get_variable("new MyClassPromise()")');
          await Coldbrew.runAsync('my_class_undefined = Coldbrew.get_variable("new MyClassUndefined()")');
          await Coldbrew.runAsync('Date = Coldbrew.get_variable("Date")');
          await Coldbrew.runAsync('Map = Coldbrew.get_variable("Map")');
          await Coldbrew.runAsync('date_1 = Coldbrew.get_variable("date1")');
          await Coldbrew.runAsync('map_1 = Coldbrew.get_variable("map1")');
          await Coldbrew.runAsync('assert Date.__type__ == "Function"');
          await Coldbrew.runAsync('assert date_1.__type__ == "Date"');
          await Coldbrew.runAsync('assert "function Map() {" in str(Map)');
          await Coldbrew.runAsync('assert "<JavaScriptVariable \'Map\'>" in repr(Map)');
          await Coldbrew.runAsync('assert "[object Map]" in str(map_1)');
          await Coldbrew.runAsync('assert "JavaScriptVariable Map.instance at" in repr(map_1)');
          await Coldbrew.runAsync('assert set(map_1.__inspect__()) == set(dir(map_1))');
          await Coldbrew.runAsync('assert set(["__type__", "__uid__", "__inspect__", "__destroy__", "__destroyed__", "constructor", "__str__", "__repr__", "entries", "for_each"]).issubset(set(dir(map_1)))');
          await Coldbrew.runAsync('assert date_1.__destroyed__ == False');
          await Coldbrew.runAsync('assert Coldbrew._get_variable("typeof Coldbrew._vars[\'"+map_1.__uid__+"\'] !== \'undefined\'")');
          await Coldbrew.runAsync('assert date_1.get_full_year() > 2000 and date_1.get_full_year() < 4000');
          await Coldbrew.runAsync('assert date_1["get_full_year"]() > 2000 and date_1["get_full_year"]() < 4000');
          await Coldbrew.runAsync('assert (Date())["get_full_year"]() > 2000 and (Date())["get_full_year"]() < 4000');
          await Coldbrew.runAsync('assert map_1.entries().next()["value"] == ["a", 1]');
          await Coldbrew.runAsync('try:\n\tdate_1.foo_undefined_value\n\tassert False\nexcept Exception as e:\n\tassert isinstance(e, AttributeError)');
          await Coldbrew.runAsync('try:\n\tdel date_1.foo_undefined_value\n\tassert False\nexcept Exception as e:\n\tassert isinstance(e, AttributeError)');
          await Coldbrew.runAsync('try:\n\tnext(iter(date_1))\n\tassert False\nexcept Exception as e:\n\tassert isinstance(e, TypeError)');
          await Coldbrew.runAsync('date_1.foo = 5');
          await Coldbrew.runAsync('date_1["bar"] = 5');
          await Coldbrew.runAsync('assert "foo_undefined_value" not in date_1');
          await Coldbrew.runAsync('assert "foo" in date_1');
          await Coldbrew.runAsync('assert "bar" in date_1');
          await Coldbrew.runAsync('assert date_1.foo == 5');
          await Coldbrew.runAsync('assert date_1["bar"] == 5');
          await Coldbrew.runAsync('del date_1.bar');
          await Coldbrew.runAsync('del date_1["foo"]');
          await Coldbrew.runAsync('assert "foo" not in date_1');
          await Coldbrew.runAsync('assert "bar" not in date_1');
          await Coldbrew.runAsync('assert "getFullYear" in date_1');
          await Coldbrew.runAsync('assert "get_full_year" in date_1');
          await Coldbrew.runAsync('assert my_class_undefined.foo == None');
          await Coldbrew.runAsync('assert "foo" in my_class_undefined');
          await Coldbrew.runAsync('del my_class_undefined.foo');
          await Coldbrew.runAsync('try:\n\tmy_class_undefined.foo\n\tassert False\nexcept Exception as e:\n\tassert isinstance(e, AttributeError)');
          await Coldbrew.runAsync('assert len(my_class_length) == 5');
          await Coldbrew.runAsync('assert len(my_class_size) == 6');
          await Coldbrew.runAsync('assert len(my_class_size_func) == 7');
          await Coldbrew.runAsync('try:\n\tlen(date_1)\n\tassert False\nexcept Exception as e:\n\tassert isinstance(e, AttributeError)');
          await Coldbrew.runAsync('assert my_class_promise.doAsync() == 8');
          await Coldbrew.runAsync('assert list(map_1) == [["a", 1], ["b", 2], ["c", 3]]');
          await Coldbrew.runAsync('map_1.set("d", 4)');
          await Coldbrew.runAsync('assert map_1.get("d") == 4');
          await Coldbrew.runAsync('map_1.__destroy__()');
          await Coldbrew.runAsync('assert map_1.__destroyed__ == True');
          await Coldbrew.runAsync('assert Coldbrew._get_variable("typeof Coldbrew._vars[\'"+map_1.__uid__+"\'] === \'undefined\'")');
          await Coldbrew.runAsync('date_1_uid = date_1.__uid__');
          await Coldbrew.runAsync('assert Coldbrew._get_variable("typeof Coldbrew._vars[\'"+date_1_uid+"\'] !== \'undefined\'")');
          await Coldbrew.runAsync('del date_1');
          await Coldbrew.runAsync('assert Coldbrew._get_variable("typeof Coldbrew._vars[\'"+date_1_uid+"\'] === \'undefined\'")');
          await Coldbrew.runAsync('assert Coldbrew._get_variable("Object.keys(Coldbrew._vars).length") != 0');
          await Coldbrew.runAsync('Coldbrew.destroy_all_variables()');
          await Coldbrew.runAsync('assert Coldbrew._get_variable("Object.keys(Coldbrew._vars).length") == 0');
          await Coldbrew.runAsync('assert Coldbrew._get_variable("Object.keys(Coldbrew._promises_resolved_values).length") == 0');
          await Coldbrew.runAsync('assert Coldbrew._get_variable("Object.keys(Coldbrew._main_thread_vars).length") == 0');
          assert(Object.keys(Coldbrew._main_thread_vars).length == 0);
          await Coldbrew.runAsync('assert Coldbrew._get_variable("Coldbrew._pending_main_thread_vars ? Coldbrew._pending_main_thread_vars.size : 0") == 0');
        } catch (e) {
          return JSON.stringify([e.message, e.stack]);
        }
        return true;
      });
      return expect(result).to.eventually.be.true;
    });

    it('should allow interaction with a JavaScriptVariable in Python in worker mode', async function () {
      await utils.eval(this, async () => {
        Coldbrew.unload();
        return Coldbrew.load({worker: true});
      });
      var result = utils.eval(this, async () => {
        try {
          class MyClassLength {
            constructor() {
              this.length = 5;
            }
          }
          class MyClassSize {
            constructor() {
              this.size = 6;
            }
          }
          class MyClassSizeFunc {
            size() {
              return 7;
            }
          }
          class MyClassPromise {
            doAsync() {
              return Promise.resolve(8);
            }
          }
          class MyClassUndefined {
            constructor() {
              this.foo = undefined;
            }
          }
          window.MyClassLength = MyClassLength;
          window.MyClassSize = MyClassSize;
          window.MyClassSizeFunc = MyClassSizeFunc;
          window.MyClassPromise = MyClassPromise;
          window.MyClassUndefined = MyClassUndefined;
          window.date1 = new Date();
          window.map1 = new Map([['a', 1], ['b', 2], ['c', 3]]);
          await Coldbrew.run('my_class_length = Coldbrew.get_variable("new MyClassLength()")');
          await Coldbrew.run('my_class_size = Coldbrew.get_variable("new MyClassSize()")');
          await Coldbrew.run('my_class_size_func = Coldbrew.get_variable("new MyClassSizeFunc()")');
          await Coldbrew.run('my_class_promise = Coldbrew.get_variable("new MyClassPromise()")');
          await Coldbrew.run('my_class_undefined = Coldbrew.get_variable("new MyClassUndefined()")');
          await Coldbrew.run('Date = Coldbrew.get_variable("Date")');
          await Coldbrew.run('Map = Coldbrew.get_variable("Map")');
          await Coldbrew.run('date_1 = Coldbrew.get_variable("date1")');
          await Coldbrew.run('map_1 = Coldbrew.get_variable("map1")');
          await Coldbrew.run('assert Date.__type__ == "Function"');
          await Coldbrew.run('assert date_1.__type__ == "Date"');
          await Coldbrew.run('assert "function Map() {" in str(Map)');
          await Coldbrew.run('assert "<JavaScriptVariable \'Map\'>" in repr(Map)');
          await Coldbrew.run('assert "[object Map]" in str(map_1)');
          await Coldbrew.run('assert "JavaScriptVariable Map.instance at" in repr(map_1)');
          await Coldbrew.run('assert set(map_1.__inspect__()) == set(dir(map_1))');
          await Coldbrew.run('assert set(["__type__", "__uid__", "__inspect__", "__destroy__", "__destroyed__", "constructor", "__str__", "__repr__", "entries", "for_each"]).issubset(set(dir(map_1)))');
          await Coldbrew.run('assert date_1.__destroyed__ == False');
          await Coldbrew.run('assert Coldbrew._get_variable("typeof Coldbrew._vars[\'"+map_1.__uid__+"\'] !== \'undefined\'")');
          await Coldbrew.run('assert date_1.get_full_year() > 2000 and date_1.get_full_year() < 4000');
          await Coldbrew.run('assert date_1["get_full_year"]() > 2000 and date_1["get_full_year"]() < 4000');
          await Coldbrew.run('assert (Date())["get_full_year"]() > 2000 and (Date())["get_full_year"]() < 4000');
          await Coldbrew.run('assert map_1.entries().next()["value"] == ["a", 1]');
          await Coldbrew.run('try:\n\tdate_1.foo_undefined_value\n\tassert False\nexcept Exception as e:\n\tassert isinstance(e, AttributeError)');
          await Coldbrew.run('try:\n\tdel date_1.foo_undefined_value\n\tassert False\nexcept Exception as e:\n\tassert isinstance(e, AttributeError)');
          await Coldbrew.run('try:\n\tnext(iter(date_1))\n\tassert False\nexcept Exception as e:\n\tassert isinstance(e, TypeError)');
          await Coldbrew.run('date_1.foo = 5');
          await Coldbrew.run('date_1["bar"] = 5');
          await Coldbrew.run('assert "foo_undefined_value" not in date_1');
          await Coldbrew.run('assert "foo" in date_1');
          await Coldbrew.run('assert "bar" in date_1');
          await Coldbrew.run('assert date_1.foo == 5');
          await Coldbrew.run('assert date_1["bar"] == 5');
          await Coldbrew.run('del date_1.bar');
          await Coldbrew.run('del date_1["foo"]');
          await Coldbrew.run('assert "foo" not in date_1');
          await Coldbrew.run('assert "bar" not in date_1');
          await Coldbrew.run('assert "getFullYear" in date_1');
          await Coldbrew.run('assert "get_full_year" in date_1');
          await Coldbrew.run('assert my_class_undefined.foo == None');
          await Coldbrew.run('assert "foo" in my_class_undefined');
          await Coldbrew.run('del my_class_undefined.foo');
          await Coldbrew.run('try:\n\tmy_class_undefined.foo\n\tassert False\nexcept Exception as e:\n\tassert isinstance(e, AttributeError)');
          await Coldbrew.run('assert len(my_class_length) == 5');
          await Coldbrew.run('assert len(my_class_size) == 6');
          await Coldbrew.run('assert len(my_class_size_func) == 7');
          await Coldbrew.run('try:\n\tlen(date_1)\n\tassert False\nexcept Exception as e:\n\tassert isinstance(e, AttributeError)');
          await Coldbrew.runAsync('assert my_class_promise.doAsync() == 8');
          await Coldbrew.run('assert list(map_1) == [["a", 1], ["b", 2], ["c", 3]]');
          await Coldbrew.run('map_1.set("d", 4)');
          await Coldbrew.run('assert map_1.get("d") == 4');
          await Coldbrew.run('map_1.__destroy__()');
          await Coldbrew.run('assert map_1.__destroyed__ == True');
          await Coldbrew.run('assert Coldbrew._get_variable("typeof Coldbrew._vars[\'"+map_1.__uid__+"\'] === \'undefined\'")');
          await Coldbrew.run('date_1_uid = date_1.__uid__');
          await Coldbrew.run('assert Coldbrew._get_variable("typeof Coldbrew._vars[\'"+date_1_uid+"\'] !== \'undefined\'")');
          await Coldbrew.run('del date_1');
          await Coldbrew.run('assert Coldbrew._get_variable("typeof Coldbrew._vars[\'"+date_1_uid+"\'] === \'undefined\'")');
          await Coldbrew.run('assert Coldbrew._get_variable("Object.keys(Coldbrew._vars).length") != 0');
          await Coldbrew.run('Coldbrew.destroy_all_variables()');
          await Coldbrew.run('assert Coldbrew._get_variable("Object.keys(Coldbrew._vars).length") == 0');
          await Coldbrew.run('assert Coldbrew._get_variable("Object.keys(Coldbrew._promises_resolved_values).length") == 0');
          await Coldbrew.run('assert Coldbrew._get_variable("Object.keys(Coldbrew._main_thread_vars).length") == 0');
          assert(Object.keys(Coldbrew._main_thread_vars).length == 0);
          await Coldbrew.run('assert Coldbrew._get_variable("Coldbrew._pending_main_thread_vars ? Coldbrew._pending_main_thread_vars.size : 0") == 0');
        } catch (e) {
          return JSON.stringify([e.message, e.stack]);
        }
        return true;
      });
      return expect(result).to.eventually.be.true;
    });

    it('should allow interaction with a JavaScriptVariable in Python while running asynchronously in worker mode', async function () {
      await utils.eval(this, async () => {
        Coldbrew.unload();
        return Coldbrew.load({worker: true});
      });
      var result = utils.eval(this, async () => {
        try {
          class MyClassLength {
            constructor() {
              this.length = 5;
            }
          }
          class MyClassSize {
            constructor() {
              this.size = 6;
            }
          }
          class MyClassSizeFunc {
            size() {
              return 7;
            }
          }
          class MyClassPromise {
            doAsync() {
              return Promise.resolve(8);
            }
          }
          class MyClassUndefined {
            constructor() {
              this.foo = undefined;
            }
          }
          window.MyClassLength = MyClassLength;
          window.MyClassSize = MyClassSize;
          window.MyClassSizeFunc = MyClassSizeFunc;
          window.MyClassPromise = MyClassPromise;
          window.MyClassUndefined = MyClassUndefined;
          window.date1 = new Date();
          window.map1 = new Map([['a', 1], ['b', 2], ['c', 3]]);
          await Coldbrew.runAsync('my_class_length = Coldbrew.get_variable("new MyClassLength()")');
          await Coldbrew.runAsync('my_class_size = Coldbrew.get_variable("new MyClassSize()")');
          await Coldbrew.runAsync('my_class_size_func = Coldbrew.get_variable("new MyClassSizeFunc()")');
          await Coldbrew.runAsync('my_class_promise = Coldbrew.get_variable("new MyClassPromise()")');
          await Coldbrew.runAsync('my_class_undefined = Coldbrew.get_variable("new MyClassUndefined()")');
          await Coldbrew.runAsync('Date = Coldbrew.get_variable("Date")');
          await Coldbrew.runAsync('Map = Coldbrew.get_variable("Map")');
          await Coldbrew.runAsync('date_1 = Coldbrew.get_variable("date1")');
          await Coldbrew.runAsync('map_1 = Coldbrew.get_variable("map1")');
          await Coldbrew.runAsync('assert Date.__type__ == "Function"');
          await Coldbrew.runAsync('assert date_1.__type__ == "Date"');
          await Coldbrew.runAsync('assert "function Map() {" in str(Map)');
          await Coldbrew.runAsync('assert "<JavaScriptVariable \'Map\'>" in repr(Map)');
          await Coldbrew.runAsync('assert "[object Map]" in str(map_1)');
          await Coldbrew.runAsync('assert "JavaScriptVariable Map.instance at" in repr(map_1)');
          await Coldbrew.runAsync('assert set(map_1.__inspect__()) == set(dir(map_1))');
          await Coldbrew.runAsync('assert set(["__type__", "__uid__", "__inspect__", "__destroy__", "__destroyed__", "constructor", "__str__", "__repr__", "entries", "for_each"]).issubset(set(dir(map_1)))');
          await Coldbrew.runAsync('assert date_1.__destroyed__ == False');
          await Coldbrew.runAsync('assert Coldbrew._get_variable("typeof Coldbrew._vars[\'"+map_1.__uid__+"\'] !== \'undefined\'")');
          await Coldbrew.runAsync('assert date_1.get_full_year() > 2000 and date_1.get_full_year() < 4000');
          await Coldbrew.runAsync('assert date_1["get_full_year"]() > 2000 and date_1["get_full_year"]() < 4000');
          await Coldbrew.runAsync('assert (Date())["get_full_year"]() > 2000 and (Date())["get_full_year"]() < 4000');
          await Coldbrew.runAsync('assert map_1.entries().next()["value"] == ["a", 1]');
          await Coldbrew.runAsync('try:\n\tdate_1.foo_undefined_value\n\tassert False\nexcept Exception as e:\n\tassert isinstance(e, AttributeError)');
          await Coldbrew.runAsync('try:\n\tdel date_1.foo_undefined_value\n\tassert False\nexcept Exception as e:\n\tassert isinstance(e, AttributeError)');
          await Coldbrew.runAsync('try:\n\tnext(iter(date_1))\n\tassert False\nexcept Exception as e:\n\tassert isinstance(e, TypeError)');
          await Coldbrew.runAsync('date_1.foo = 5');
          await Coldbrew.runAsync('date_1["bar"] = 5');
          await Coldbrew.runAsync('assert "foo_undefined_value" not in date_1');
          await Coldbrew.runAsync('assert "foo" in date_1');
          await Coldbrew.runAsync('assert "bar" in date_1');
          await Coldbrew.runAsync('assert date_1.foo == 5');
          await Coldbrew.runAsync('assert date_1["bar"] == 5');
          await Coldbrew.runAsync('del date_1.bar');
          await Coldbrew.runAsync('del date_1["foo"]');
          await Coldbrew.runAsync('assert "foo" not in date_1');
          await Coldbrew.runAsync('assert "bar" not in date_1');
          await Coldbrew.runAsync('assert "getFullYear" in date_1');
          await Coldbrew.runAsync('assert "get_full_year" in date_1');
          await Coldbrew.runAsync('assert my_class_undefined.foo == None');
          await Coldbrew.runAsync('assert "foo" in my_class_undefined');
          await Coldbrew.runAsync('del my_class_undefined.foo');
          await Coldbrew.runAsync('try:\n\tmy_class_undefined.foo\n\tassert False\nexcept Exception as e:\n\tassert isinstance(e, AttributeError)');
          await Coldbrew.runAsync('assert len(my_class_length) == 5');
          await Coldbrew.runAsync('assert len(my_class_size) == 6');
          await Coldbrew.runAsync('assert len(my_class_size_func) == 7');
          await Coldbrew.runAsync('try:\n\tlen(date_1)\n\tassert False\nexcept Exception as e:\n\tassert isinstance(e, AttributeError)');
          await Coldbrew.runAsync('assert my_class_promise.doAsync() == 8');
          await Coldbrew.runAsync('assert list(map_1) == [["a", 1], ["b", 2], ["c", 3]]');
          await Coldbrew.runAsync('map_1.set("d", 4)');
          await Coldbrew.runAsync('assert map_1.get("d") == 4');
          await Coldbrew.runAsync('map_1.__destroy__()');
          await Coldbrew.runAsync('assert map_1.__destroyed__ == True');
          await Coldbrew.runAsync('assert Coldbrew._get_variable("typeof Coldbrew._vars[\'"+map_1.__uid__+"\'] === \'undefined\'")');
          await Coldbrew.runAsync('date_1_uid = date_1.__uid__');
          await Coldbrew.runAsync('assert Coldbrew._get_variable("typeof Coldbrew._vars[\'"+date_1_uid+"\'] !== \'undefined\'")');
          await Coldbrew.runAsync('del date_1');
          await Coldbrew.runAsync('assert Coldbrew._get_variable("typeof Coldbrew._vars[\'"+date_1_uid+"\'] === \'undefined\'")');
          await Coldbrew.runAsync('assert Coldbrew._get_variable("Object.keys(Coldbrew._vars).length") != 0');
          await Coldbrew.runAsync('Coldbrew.destroy_all_variables()');
          await Coldbrew.runAsync('assert Coldbrew._get_variable("Object.keys(Coldbrew._vars).length") == 0');
          await Coldbrew.runAsync('assert Coldbrew._get_variable("Object.keys(Coldbrew._promises_resolved_values).length") == 0');
          await Coldbrew.runAsync('assert Coldbrew._get_variable("Object.keys(Coldbrew._main_thread_vars).length") == 0');
          assert(Object.keys(Coldbrew._main_thread_vars).length == 0);
          await Coldbrew.runAsync('assert Coldbrew._get_variable("Coldbrew._pending_main_thread_vars ? Coldbrew._pending_main_thread_vars.size : 0") == 0');
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
          window.date1 = new Date();
          Coldbrew.run('date_1 = Coldbrew.get_variable("date1")');
          Coldbrew.run('assert "getFullYear" in date_1');
          Coldbrew.run('assert "get_full_year" not in date_1');
        } catch (e) {
          return JSON.stringify([e.message, e.stack]);
        }
        return true;
      });
      return expect(result).to.eventually.be.true;
    });
  });
});