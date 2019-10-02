// Internally patch Worker so that it works by using
// a forked process in Node.js (since Node.js workers
// are still experimental).
//
// Moreover, this Worker class keeps track of all references
// to created workers so that they can be batch terminated
// when Coldbrew is unloaded. With the built-in Worker class,
// if you lose a reference to the worker object, there is no
// way to terminate that running worker AFAIK.
var _coldbrew_oldWorker = COLDBREW_GLOBAL_SCOPE.Worker;
var _coldbrew_allWorkers = [];
var Worker = new Proxy(function(){}, {
  construct: function (target, args) {
    var worker = null;
    var underlyingWorker = null;
    if (typeof _coldbrew_oldWorker === 'undefined' && IS_NODE_JS) {
      const fork = require('child_process').fork;
      require('node-comlink').patchMessageChannel();
      const NodeMessageAdapter = require('node-comlink').NodeMessageAdapter;
      underlyingWorker = fork(args[0], { env : { _COLDBREW_WORKER_FORK_ : 1 } });
      worker = new NodeMessageAdapter(underlyingWorker);
    } else {
      worker = new (_coldbrew_oldWorker.bind.apply(_coldbrew_oldWorker, [_coldbrew_oldWorker].concat(args)));
      underlyingWorker = worker;
    }
    _coldbrew_allWorkers.push(worker);
    worker.underlyingWorker = underlyingWorker;
    return worker;
  },
  get: function(target, prop) {
    if (prop === 'terminateAllWorkers') {
      return function(defer = false) {
        function _terminateWorkers(workers) {
          workers.forEach(function(worker) {
            if (worker.underlyingWorker && worker.underlyingWorker.kill) {
              worker.underlyingWorker.kill();
            }
            if (worker.terminate) {
              worker.terminate();
            }
          });
        }
        if (defer) {
          var _terminateWorkersBinded = _terminateWorkers.bind(null, [..._coldbrew_allWorkers]);
          setTimeout(function() {
            _terminateWorkersBinded();
          }, 1);
        } else {
          _terminateWorkers(_coldbrew_allWorkers);
        }
        _coldbrew_allWorkers = [];
      };
    }
    return Reflect.get(_coldbrew_oldWorker, prop);
  },
  set: function(target, prop, value) {
    Reflect.set(_coldbrew_oldWorker, prop, value);
  },
  ownKeys: function(target) {
    return Reflect.ownKeys(_coldbrew_oldWorker);
  },
  has: function(target, prop) {
    return Reflect.has(_coldbrew_oldWorker, prop);
  },
  deleteProperty: function(target, prop) {
    Reflect.deleteProperty(_coldbrew_oldWorker, prop);
  }
});
COLDBREW_TOP_SCOPE.Worker = Worker;