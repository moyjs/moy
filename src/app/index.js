/**
 * Module : compox-util webpack entry app index
 * Author : huyue(huyueb@yonyou.com)
 * Date	  : 2017-01-18 09:34:01
 */
import {App} from '../createApp.js';
import {
	setAdjustMetaFunc
} from './adjustMetaFunc';

import {
	addDataTable,
	getDataTable,
	getDataTables
} from './dataTable';

import {
	createComp,
	getComp,
	getCompsByDataTable,
	getCompsByType,
	getComps,
	getCompsByElement,
	showComp
} from './comp';

import {
	compsValidate,
	compsValidateMultiParam
} from './validate';

import {
    setUserCache,
    getUserCache,
    removeUserCache,
    setCache,
    getCache,
    removeCache,
    setSessionCache,
    getSessionCache,
    removeSessionCache
} from './cache';

import {
	getEnvironment,
	setClientAttribute,
	getClientAttribute
} from './iwebCore';

import {
	ajax
} from './ajax';

import {
	serverEvent
} from './serverEvent';

import {
	setEnable
} from './util';

export function compoxUtil(){
	// setAdjustMetaFunc
	App.prototype.setAdjustMetaFunc = setAdjustMetaFunc;
	// dataTable
	App.prototype.addDataTable = addDataTable;
	App.prototype.getDataTable = getDataTable;
	App.prototype.getDataTables = getDataTables;
	// comp
	App.prototype.createComp = createComp;
	App.prototype.getComp = getComp;
	App.prototype.getCompsByDataTable = getCompsByDataTable;
	App.prototype.getCompsByType = getCompsByType;
	App.prototype.getComps = getComps;
	App.prototype.getCompsByElement = getCompsByElement;
	App.prototype.showComp = showComp;
	// validate
	App.prototype.compsValidate = compsValidate;
	App.prototype.compsValidateMultiParam = compsValidateMultiParam;
	// cache
	App.prototype.setUserCache = setUserCache;
	App.prototype.getUserCache = getUserCache;
	App.prototype.removeUserCache = removeUserCache;
	App.prototype.setCache = setCache;
	App.prototype.getCache = getCache;
	App.prototype.removeCache = removeCache;
	App.prototype.setSessionCache = setSessionCache;
	App.prototype.getSessionCache = getSessionCache;
	App.prototype.removeSessionCache = removeSessionCache;
	// iwebCode
	App.prototype.getEnvironment = getEnvironment;
	App.prototype.setClientAttribute = setClientAttribute;
	App.prototype.getClientAttribute = getClientAttribute;
	// ajax
	App.prototype.ajax = ajax;
	// serverEvent
	App.prototype.serverEvent = serverEvent;
	// util
	App.prototype.setEnable = setEnable;

}
