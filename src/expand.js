let initUse = function(Moy) {
    Moy.use = function(plugin) {
        var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
        if (installedPlugins.indexOf(plugin) > -1) {
            return this
        }
        // additional parameters
        var args = toArray(arguments, 1);
        args.unshift(this);
        if (typeof plugin.install === 'function') {
            plugin.install.apply(plugin, args);
        } else if (typeof plugin === 'function') {
            plugin.apply(null, args);
        }
        installedPlugins.push(plugin);
        return this;
    };
}
let initComponent = function(Moy) {
    Moy.component = function() {

    }
}


export {
    initUse,
    initComponent
};
