/**
 * Module dependencies.
 */

var matches = require('matches-selector')
  , event = require('event');

/**
 * Look for an element that is a child of top
 * and a parent of top, that matches selector.
 *
 * @param {Element} top the parent node in which to search
 * @param {Element} bottom the starting place for the search
 * @param {String} selector a css query used to determine if a node matches
 * @return {Element|null}
 * @api private
 */
function findMatch(top, bottom, selector) {
  while (bottom != top && bottom) {
    if (matches(bottom, selector)) return bottom;
    bottom = bottom.parentElement;
  }
  return null;
}

/**
 * Delegate event `type` to `selector`
 * and invoke `fn(e)`. A callback function
 * is returned which may be passed to `.unbind()`.
 *
 * @param {Element} el
 * @param {String} selector
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.bind = function(el, selector, type, fn, capture){
  return event.bind(el, type, function(e){
    if (e.delegateTarget = findMatch(el, e.target || e.srcElement, selector)) fn.call(el, e);
  }, capture);
};

/**
 * Unbind event `type`'s callback `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @api public
 */

exports.unbind = function(el, type, fn, capture){
  event.unbind(el, type, fn, capture);
};
