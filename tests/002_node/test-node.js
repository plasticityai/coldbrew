const utils = require('../utils');
const { expect } = require('chai');

describe('Node.js Support', function() {
  beforeEach(async function() {
    if (typeof this.currentTest.Coldbrew === 'undefined') {
      return Promise.reject(new Error("Cannot run Node.js tests because the 'dist-node' directory does not exist. In order to run Node.js tests, run 'touch ./src/Makefile && ./build.sh dist-node NODE' before running the tests."));
    } else {
      this.currentTest.Coldbrew.unload();
      return this.currentTest.Coldbrew.load({hideWarnings: true});
    }
  });

  it('should initialize properly', async function () {
    return expect(this.test.Coldbrew.load()).to.eventually.equal(undefined);
  });

  it('should reset the files and python library directory on each load', async function() {
    expect(!!this.test.Coldbrew.pathExists('/files/a.txt')).to.be.false;
    this.test.Coldbrew.addFile('/files/a.txt', 'Hello World!');
    expect(!!this.test.Coldbrew.pathExists('/files/a.txt')).to.be.true;
    expect(!!this.test.Coldbrew.pathExists(`/usr/local/lib/${this.test.Coldbrew.listFiles('/usr/local/lib')[0].name}/a.txt`)).to.be.false;
    this.test.Coldbrew.addFile(`/usr/local/lib/${this.test.Coldbrew.listFiles('/usr/local/lib')[0].name}/a.txt`, 'Hello World!');
    expect(!!this.test.Coldbrew.pathExists(`/usr/local/lib/${this.test.Coldbrew.listFiles('/usr/local/lib')[0].name}/a.txt`)).to.be.true;
    this.test.Coldbrew.unload();
    await this.test.Coldbrew.load({hideWarnings: true});
    expect(!!this.test.Coldbrew.pathExists('/files/a.txt')).to.be.false;
    expect(!!this.test.Coldbrew.pathExists(`/usr/local/lib/${this.test.Coldbrew.listFiles('/usr/local/lib')[0].name}/a.txt`)).to.be.false;
  });

  it('should throw a PythonError for bad Python code in Node.js', async function () {
    var isPythonError = false;
    this.test.Coldbrew.onStandardErr = function(line) {};
    try {
      this.test.Coldbrew.run('x');
    } catch (e) {
      isPythonError = e instanceof this.test.Coldbrew.PythonError;
    }
    expect(isPythonError).to.be.true;
  });

  it('should allow HTTP requests in Python in Node.js', async function () {
    await this.test.Coldbrew.run('import urllib.request');
    var remoteFile = this.test.Coldbrew.getVariableAsync('str(urllib.request.urlopen("http://localhost:8000/remote/example.txt").read())');
    expect(remoteFile).to.eventually.include('downloaded from a remote server');
  });

  it('should let you read a file in Node.js', async function () {
    this.test.Coldbrew.addFile('/new_file_text.txt', 'Hello World!');
    var content = this.test.Coldbrew.readFile('/new_file_text.txt');
    return expect(content).to.equal('Hello World!');
  });

  it('should let you read a file in binary in Node.js', async function () {
    function str2ab(str) {
      var buf = new ArrayBuffer(str.length);
      var bufView = new Uint8Array(buf);
      for (var i=0, strLen=str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
      }
      return buf;
    }
    this.test.Coldbrew.addFile('/new_file_text.txt', 'Hello World!');
    var content = this.test.Coldbrew.readBinaryFile('/new_file_text.txt');
    var contentTests = [content.byteLength, (new Uint8Array(content.slice(0,1)))[0], (new Uint8Array(content.slice(-1)))[0]];
    expect(contentTests[0]).to.equal(str2ab('Hello World!').byteLength);
    expect(contentTests[1]).to.equal((new Uint8Array(str2ab('Hello World!').slice(0,1)))[0]);
    return expect(contentTests[2]).to.equal((new Uint8Array(str2ab('Hello World!').slice(-1)))[0]);
  });

  it('should be able launch in worker mode in Node.js', async function () {
    this.test.Coldbrew.unload();
    await this.test.Coldbrew.load({worker: true, hideWarnings: true});
    var run = this.test.Coldbrew.run('x = 0').then(function(result) {
      return result;
    });
    return expect(run).to.eventually.equal(0);
  });

  it('should let you add files from a remote ZIP file in Node.js', async function () {
    await this.test.Coldbrew.addFilesFromZip('/home', 'http://localhost:8000/remote/example_project.zip');
    var pathExists = !!this.test.Coldbrew.pathExists('/home/example_project/multiply.py')
    return expect(pathExists).to.be.true;
  });

  it('should let you download a file path to a ZIP file in Node.js', async function () {
    var fs = require('fs');
    try {
      fs.unlinkSync('/tmp/test_download.zip');
    } catch (e) {
    }
    var files = this.test.Coldbrew.downloadPathToZip('/coldbrew/examples/add.py', '/tmp/test_download.zip');
    await expect(files).to.eventually.not.be.rejected;
    return expect(fs.existsSync('/tmp/test_download.zip')).to.be.true;
  });

  it('should be able to persist files in Node.js', async function () {
    this.test.Coldbrew.unload();
    await this.test.Coldbrew.load({hideWarnings: true, fsOptions: {persistHome: true}});
    this.test.Coldbrew.addFile('/home/new_file_text.txt', 'Hello World!');
    this.test.Coldbrew.unload();
    await this.test.Coldbrew.load({hideWarnings: true, fsOptions: {persistHome: true}});
    var files = this.test.Coldbrew.listFiles('/home');
    return expect(files.find(f => f.name === 'new_file_text.txt')).to.not.equal(undefined);
  });

  it('should not support synchronous execution in threads in Node.js', async function () {
    this.test.Coldbrew.unload();
    var errorMessage = '';
    try {
      await this.test.Coldbrew.load({threadWorkers: 4});
    } catch (e) {
      errorMessage = e.message;
    }
    expect(errorMessage).to.include('threading is disabled');
  });
});