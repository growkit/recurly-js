import assert from 'assert';
import {
  initRecurly,
  stubBraintree,
  stubWindowOpen
} from '../../support/helpers';

describe(`BraintreeStrategy`, function () {
  const validOpts = { braintree: { clientAuthorization: 'valid' } };

  stubWindowOpen();
  stubBraintree();

  beforeEach(function () {
    this.sandbox = sinon.createSandbox();
    this.recurly = initRecurly();
    this.venmo = this.recurly.Venmo(validOpts);
  });

  describe('start', function () {
    it('calls tokenize through braintree', function () {
      this.sandbox.spy(this.venmo.strategy.venmo, 'tokenize');
      this.venmo.start();
      assert(this.venmo.strategy.venmo.tokenize.calledOnce);
    });
  })

  describe('destroy', function () {
    it('closes the window and removes listeners', function () {
      this.sandbox.spy(this.venmo, 'off');
      this.venmo.destroy();
      assert(this.venmo.off.calledOnce);
    });
  });
});
