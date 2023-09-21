const { expect } = require('chai');
const { it, describe } = require('mocha');
const sinon = require('sinon');

const Utils = require('./utils.js');
const sendPaymentRequestToApi = require('./3-payment.js');

describe('', () => {
  it('test if numbers round with spies', () => {
    const check = sinon.spy(Utils, 'calculateNumber');
    sendPaymentRequestToApi(1, 3);
    expect(check.calledOnce).to.be.true;
    expect(check.calledWith('SUM', 1, 3)).to.be.true;
    check.restore();
  });
});i
