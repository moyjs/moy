/**
 * [use description]
 * @param  {[type]} plugin [description]
 * @return {[type]}        [description]
 */
export function use(plugin) {
    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
        plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
        plugin.apply(null, args);
    }
    return this;
};
/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}
/**
 * [initComponent description]
 * @param  {[type]} Moy [description]
 * @return {[type]}     [description]
 */
export function Component() {

}
