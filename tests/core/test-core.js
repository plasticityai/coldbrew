const utils = require('../utils');
const { expect } = require('chai');

describe('Core', () => {
  beforeEach(async function() {

  });

  describe('first', () => {
    it('5*5', async function () {
      return expect(utils.eval(this, () => {
        return JSON.stringify(Object.keys(Coldbrew));
      })).to.eventually.equal(25);
    });
  });
});