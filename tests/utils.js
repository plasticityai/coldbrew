const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
const puppeteer = require('puppeteer');

const { Assertion, expect } = chai;
const { promisify } = require('util');

process.setMaxListeners(0);

chai.use(chaiAsPromised);

const utils = {};

utils.sleep = promisify(setTimeout);

// Get a new browser instance
utils.getNewBrowser = async () => {
  return puppeteer.launch({
    ignoreHTTPSErrors: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: true,
  });
};

// Get a new page instance
utils.getNewPage = async (that, url, opts) => {
  const options = Object.assign({}, {
    timeout: 7500,
    waitUntil: 'networkidle2',
    delay: 0,
    width: 1000,
    height: 1000,
    browser: that.currentTest.browser,
  }, opts);
  
  const page = await options.browser.newPage();
  await page.setCacheEnabled(false);
  await page.setViewport({
    width: options.width,
    height: options.height,
  });
  await utils.navigatePage(page, url, options);
  return page;
};

// Navigate a page instance
utils.navigatePage = async (page, url, opts) => {
  const options = Object.assign({}, {
    timeout: 7500,
    waitUntil: 'networkidle2',
    delay: 0,
  });
  while (true) {
    try {
      await page.goto('about:blank', {
        timeout: options.timeout,
        waitUntil: options.waitUntil,
      });
      const navigationPromise = page.waitForNavigation();
      await page.goto(url, {
        timeout: options.timeout,
        waitUntil: options.waitUntil,
      });
      await Promise.all([
        navigationPromise,
        utils.sleep(options.delay),
      ]);
      return utils.sleep(1000);
    } catch (e) {
      await utils.sleep(1000);
    }
  }
};

// Evaluate JavaScript
utils.eval = async (that, expression) => {
  return await that.test.page.evaluate(expression);
};

// Unrequire a model
function unrequire(moduleName, seen = new Set()) {
  var solvedName = require.resolve(moduleName),
    nodeModule = require.cache[solvedName];
  if (nodeModule) {
    for (var i = 0; i < nodeModule.children.length; i++) {
      var child = nodeModule.children[i];
      if (!seen.has(child.filename)) {
        seen.add(child.filename);
        unrequire(child.filename, seen);
      }
    }
    delete require.cache[solvedName];
  }
}

beforeEach(async function() {
  this.retries(5);
  this.currentTest.browser = await utils.getNewBrowser();
  this.currentTest.page = await utils.getNewPage(this, 'http://localhost:8000');
  await utils.eval({test: this.currentTest}, () => {
    window.defer = function(val, time = 1) {
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          resolve(val);
        }, time);
      });
    };
    window.assert = function(val) {
      if (!val) {
        throw new Error("Assertion Failed. (from assert())");
      }
    };
    window.consoleWarns = [];
    var oldConsoleWarn = console.warn;
    console.warn = function(...args) {
      window.consoleWarns.push(args);
      return oldConsoleWarn.apply(console, args);
    };
    window.consoleLogs = [];
    var oldConsoleLog = console.log;
    console.log = function(...args) {
      window.consoleLogs.push(args);
      return oldConsoleLog.apply(console, args);
    };
    window.consoleErrors = [];
    var oldConsoleError = console.error;
    console.error = function(...args) {
      window.consoleErrors.push(args);
      return oldConsoleError.apply(console, args);
    };
    window.clearConsole = function() {
      window.consoleWarns = [];
      window.consoleLogs = [];
      window.consoleErrors = [];
    };
  });
  this.currentTest.load = utils.eval({test: this.currentTest}, () => {
    return Coldbrew.load();
  });
  var nodeLoad = Promise.resolve(undefined);
  try {
    this.currentTest.Coldbrew = require('../dist-node');
    nodeLoad = this.currentTest.Coldbrew.load({hideWarnings: true});
  } catch (e) {
    // Ignore
  }
  return Promise.all([this.currentTest.load, nodeLoad]);
});

afterEach(async function() {
  this.retries(5);
  return this.currentTest.browser.close();
});

module.exports = utils;
