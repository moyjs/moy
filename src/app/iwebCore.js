/**
 * Module : compox-util iwebCore
 * Author : huyue(huyueb@yonyou.com)
 * Date	  : 2017-01-18 09:34:01
 */


const getEnvironment = function () {
    return u.core.collectEnvironment()
}

const setClientAttribute = function (k, v) {
    u.core.setClientAttribute(k, v)
}

const getClientAttribute = function (k) {
    return u.core.getClientAttributes()[k]
}

export {
	getEnvironment,
	setClientAttribute,
	getClientAttribute
}
