const utils = require('../utils');
const { expect } = require('chai');

describe('Core', () => {
  beforeEach(async function() {

  });

  describe('first', () => {
    it('5*5', async function () {
      console.log('KEYS', await utils.eval(this, () => {
        return JSON.stringify(Object.keys(Coldbrew));
      }));
      return expect(Promise.resolve(25)).to.eventually.equal(25);
    });
  });
});