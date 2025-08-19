import decimalize from '../../../util/decimalize';

/**
 * Builds an ApplePayLineItem
 * @param  {String} label
 * @param  {Number} amount
 * @param  {String} type
 * @return {object}
 */
export function lineItem (label = '', amount = 0, { recurring = false, type = 'final' } = {}) {
  return {
    label,
    amount: decimalize(amount),
    ...(recurring && { paymentTiming: 'recurring' }),
    ...(type !== 'final' && { type }),
  };
}
