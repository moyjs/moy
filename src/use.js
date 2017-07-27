import { toArray } from './utils'

/**
 * [use description]
 * @param  {[type]} plugin [description]
 * @return {[type]}        [description]
 */
export default function use( plugin ) {
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
