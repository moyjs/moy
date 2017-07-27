/**
 * Module : compox-util ajax
 * Author : huyue(huyueb@yonyou.com)
 * Date   : 2017-01-18 09:34:01
 */

import {ajax as uAjax} from 'tinper-sparrow/src/ajax';

const ajax = function (params) {
    params = _wrapAjax.call(this,params)
    uAjax(params)
}

/**
 * 对ajax的请求的数据进行处理
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
const _wrapAjax = function (params) {
    var self = this
    this.serverEventObj = this.serverEvent();
    var orignSuccess = params.success
    var orignError = params.error
    var deferred = params.deferred;
    if (!deferred || !deferred.resolve) {
        deferred = {
            resolve: function () {
            }, reject: function () {
            }
        }
    }
    params.success = function (data, state, xhr) {
        if (typeof data === 'string')
            data = JSON.parse(data)
        if (self.serverEventObj.processXHRError(self, data, state, xhr)) {
            orignSuccess.call(null, data)
            _successFunc(data, deferred)
        } else {
            deferred.reject();
        }
    }
    params.error = function (data, state, xhr) {
        if (typeof data === 'string')
            data = JSON.parse(data)
        if (self.serverEventObj.processXHRError(self, data, state, xhr)) {
            orignError.call(null, data)
            _successFunc(data, deferred)
        } else {
            deferred.reject();
        }
    }
    if (params.data)
        params.data.environment = ko.utils.stringifyJson(u.core.collectEnvironment());
    else
        params.data = {environment: ko.utils.stringifyJson(u.core.collectEnvironment())}
    return params
}

const _successFunc = function (data, deferred) {
    deferred.resolve();
}

export {
	ajax
}
