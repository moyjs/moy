/**
 * moy v1.0.0
 * 
 * author : huyue
 * homepage : https://github.com/moyjs/moy#readme
 * bugs : https://github.com/moyjs/moy/issues
 */

var Moy = (function (exports) {
'use strict';

/**
 * Module : Sparrow touch event
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-07-28 14:41:17
 */

/**
 * Module : Sparrow dom
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-08-16 13:59:17
 */
/**
 * 元素上是否存在该类
 * @param {Object} element
 * @param {Object} value
 */
var hasClass = function hasClass(element, value) {
	if (!element) return false;
	if (element.nodeName && (element.nodeName === '#text' || element.nodeName === '#comment')) return false;
	if (typeof element.classList === 'undefined') {
		if (u._hasClass) {
			return u._hasClass(element, value);
		} else {
			return $(element).hasClass(value);
		}

		return false;
	} else {
		return element.classList.contains(value);
	}
};
var getOffset = function getOffset(Node, offset) {
	if (!offset) {
		offset = {};
		offset.top = 0;
		offset.left = 0;
	}
	if (Node == document.body) {
		return offset;
	}
	offset.top += Node.offsetTop;
	offset.left += Node.offsetLeft;
	if (Node.offsetParent) return getOffset(Node.offsetParent, offset);else return offset;
};
var getScroll = function getScroll(Node, offset) {
	if (!offset) {
		offset = {};
		offset.top = 0;
		offset.left = 0;
	}
	if (Node == document.body) {
		offset.top += Node.scrollTop || document.documentElement.scrollTop;
		offset.left += Node.scrollLeft || document.documentElement.scrollLeft;
		return offset;
	}
	if (Node.tagName != 'INPUT') {
		offset.top += Node.scrollTop;
		offset.left += Node.scrollLeft;
	}

	if (Node.parentNode) return getScroll(Node.parentNode, offset);else return offset;
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/**
 * Module : Sparrow util tools
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-07-27 21:46:50
 */

/**
 * 创建一个带壳的对象,防止外部修改
 * @param {Object} proto
 */
var isArray = Array.isArray || function (val) {
	return Object.prototype.toString.call(val) === '[object Array]';
};
var inArray = function inArray(node, arr) {
	if (!arr instanceof Array) {
		throw "arguments is not Array";
	}
	for (var i = 0, k = arr.length; i < k; i++) {
		if (node == arr[i]) {
			return true;
		}
	}
	return false;
};
var each = function each(obj, callback) {
	if (obj.forEach) {
		obj.forEach(function (v, k) {
			callback(k, v);
		});
	} else if (obj instanceof Object) {
		for (var k in obj) {
			callback(k, obj[k]);
		}
	} else {
		return;
	}
};
try {
	NodeList.prototype.forEach = Array.prototype.forEach;
} catch (e) {}

/**
 * 获得字符串的字节长度
 */
String.prototype.lengthb = function () {
	//	var str = this.replace(/[^\x800-\x10000]/g, "***");
	var str = this.replace(/[^\x00-\xff]/g, "**");
	return str.length;
};

/**
 * 将AFindText全部替换为ARepText
 */
String.prototype.replaceAll = function (AFindText, ARepText) {
	//自定义String对象的方法
	var raRegExp = new RegExp(AFindText, "g");
	return this.replace(raRegExp, ARepText);
};

/**
 * Module : compox compMgr
 * Author : huyue(huyueb@yonyou.com)
 * Date	  : 2016-07-28 18:41:06
 * Update : 2017-01-18 09:26:00
 */

function _findRegisteredClass(name, optReplace) {
    for (var i = 0; i < CompMgr.registeredControls.length; i++) {
        if (CompMgr.registeredControls[i].className === name) {
            if (typeof optReplace !== 'undefined') {
                CompMgr.registeredControls[i] = optReplace;
            }
            return CompMgr.registeredControls[i];
        }
    }
    return false;
}

function _getUpgradedListOfElement(element) {
    var dataUpgraded = element.getAttribute('data-upgraded');
    // Use `['']` as default value to conform the `,name,name...` style.
    return dataUpgraded === null ? [''] : dataUpgraded.split(',');
}

function _isElementUpgraded(element, jsClass) {
    var upgradedList = _getUpgradedListOfElement(element);
    return upgradedList.indexOf(jsClass) != -1;
}

function _upgradeElement(element, optJsClass) {
    if (!((typeof element === 'undefined' ? 'undefined' : _typeof(element)) === 'object' && element instanceof Element)) {
        throw new Error('Invalid argument provided to upgrade MDL element.');
    }
    var upgradedList = _getUpgradedListOfElement(element);
    var classesToUpgrade = [];
    if (!optJsClass) {
        var className = element.className;
        for (var i = 0; i < CompMgr.registeredControls.length; i++) {
            var component = CompMgr.registeredControls[i];
            if (className.indexOf(component.cssClass) > -1 && classesToUpgrade.indexOf(component) === -1 && !_isElementUpgraded(element, component.className)) {
                classesToUpgrade.push(component);
            }
        }
    } else if (!_isElementUpgraded(element, optJsClass)) {
        classesToUpgrade.push(_findRegisteredClass(optJsClass));
    }

    // Upgrade the element for each classes.
    for (var i = 0, n = classesToUpgrade.length, registeredClass; i < n; i++) {
        registeredClass = classesToUpgrade[i];
        if (registeredClass) {
            if (element[registeredClass.className]) {
                continue;
            }
            // Mark element as upgraded.
            upgradedList.push(registeredClass.className);
            element.setAttribute('data-upgraded', upgradedList.join(','));
            var instance = new registeredClass.classConstructor(element);
            CompMgr.createdControls.push(instance);
            // Call any callbacks the user has registered with this component type.
            for (var j = 0, m = registeredClass.callbacks.length; j < m; j++) {
                registeredClass.callbacks[j](element);
            }
            element[registeredClass.className] = instance;
        } else {
            throw new Error('Unable to find a registered component for the given class.');
        }
    }
}

function _upgradeDomInternal(optJsClass, optCssClass, ele) {
    if (typeof optJsClass === 'undefined' && typeof optCssClass === 'undefined') {
        for (var i = 0; i < CompMgr.registeredControls.length; i++) {
            _upgradeDomInternal(CompMgr.registeredControls[i].className, registeredControls[i].cssClass, ele);
        }
    } else {
        var jsClass = optJsClass;
        if (!optCssClass) {
            var registeredClass = _findRegisteredClass(jsClass);
            if (registeredClass) {
                optCssClass = registeredClass.cssClass;
            }
        }
        var elements;
        if (ele) {
            elements = hasClass(ele, optCssClass) ? [ele] : ele.querySelectorAll('.' + optCssClass);
        } else {
            elements = document.querySelectorAll('.' + optCssClass);
        }
        for (var n = 0; n < elements.length; n++) {
            _upgradeElement(elements[n], jsClass);
        }
    }
}

var CompMgr = {
    plugs: {},
    //用来存储控件的名称对应列表
    dataAdapters: {},
    /** 注册的控件*/
    registeredControls: [],
    createdControls: [],
    /**
     *
     * @param options  {el:'#content', model:{}}
     */
    apply: function apply(options) {
        if (options) {
            var _el = options.el || document.body;
            var model = options.model;
        }
        if (typeof _el == 'string') {
            _el = document.body.querySelector(_el);
        }
        if (_el == null || (typeof _el === 'undefined' ? 'undefined' : _typeof(_el)) != 'object') _el = document.body;
        var comps = _el.querySelectorAll('[u-meta]');
        comps.forEach(function (element) {
            if (element['comp']) return;
            var options = JSON.parse(element.getAttribute('u-meta'));
            if (options && options['type']) {
                //var comp = CompMgr._createComp({el:element,options:options,model:model});
                var comp = CompMgr.createDataAdapter({
                    el: element,
                    options: options,
                    model: model
                });
                if (comp) {
                    element['adpt'] = comp;
                    element['u-meta'] = comp;
                }
            }
        });
    },
    addPlug: function addPlug(config) {
        var plug = config['plug'],
            name = config['name'];
        this.plugs || (this.plugs = {});
        if (this.plugs[name]) {
            throw new Error('plug has exist:' + name);
        }
        plug.compType = name;
        this.plugs[name] = plug;
    },
    addDataAdapter: function addDataAdapter(config) {
        var adapter = config['adapter'],
            name = config['name'];
        //dataType = config['dataType'] || ''
        //var key = dataType ? name + '.' + dataType : name;
        this.dataAdapters || (dataAdapters = {});
        if (this.dataAdapters[name]) {
            throw new Error('dataAdapter has exist:' + name);
        }
        this.dataAdapters[name] = adapter;
    },
    getDataAdapter: function getDataAdapter(name) {
        if (!name) return;
        this.dataAdapters || (dataAdapters = {});
        //var key = dataType ? name + '.' + dataType : name;
        return this.dataAdapters[name];
    },
    /**
     * 创建dataAdapter,通过识别控件的type，来找到它对应的adapter
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    createDataAdapter: function createDataAdapter(options) {
        var opt = options['options'];
        var type = opt['type'],
            id = opt['id'];
        var adpt = this.dataAdapters[type];
        if (!adpt) return null;
        var comp = new adpt(options);
        comp.type = type;
        comp.id = id;
        return comp;
    },
    _createComp: function _createComp(options) {
        var opt = options['options'];
        var type = opt['type'];
        var plug = this.plugs[type];
        if (!plug) return null;
        var comp = new plug(options);
        comp.type = type;
        return comp;
    },
    /**
     * 注册UI控件
     */
    regComp: function regComp(config) {
        var newConfig = {
            classConstructor: config.comp,
            className: config.compAsString || config['compAsString'],
            cssClass: config.css || config['css'],
            callbacks: [],
            dependencies: config.dependencies || []
        };
        config.comp.prototype.compType = config.compAsString;
        for (var i = 0; i < this.registeredControls.length; i++) {
            var item = this.registeredControls[i];
            //registeredControls.forEach(function(item) {
            if (item.cssClass === newConfig.cssClass) {
                throw new Error('The provided cssClass has already been registered: ' + item.cssClass);
            }
            if (item.className === newConfig.className) {
                throw new Error('The provided className has already been registered');
            }
        }
        this.registeredControls.push(newConfig);
    },
    updateComp: function updateComp(ele) {
        this._reorderComps();
        for (var n = 0; n < this.registeredControls.length; n++) {
            _upgradeDomInternal(this.registeredControls[n].className, null, ele);
        }
    },
    // 后续遍历registeredControls，重新排列
    _reorderComps: function _reorderComps() {
        var tmpArray = [];
        var dictory = {};

        for (var n = 0; n < this.registeredControls.length; n++) {
            dictory[this.registeredControls[n].className] = this.registeredControls[n];
        }
        for (var n = 0; n < this.registeredControls.length; n++) {
            traverse(this.registeredControls[n]);
        }

        this.registeredControls = tmpArray;

        function traverse(control) {
            if (inArray(control, tmpArray)) return;
            if (control.dependencies.length > 0) {
                for (var i = 0, len = control.dependencies.length; i < len; i++) {
                    var childControl = dictory[control.dependencies[i]];
                    traverse(childControl);
                }
            }
            tmpArray.push(control);
        }
    }
};

var compMgr = CompMgr;

/**
 * Module : Sparrow class
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-07-28 08:45:39
 */

var Class = function Class(o) {
	if (!(this instanceof Class) && isFunction(o)) {
		return classify(o);
	}
};

// Create a new Class.
//
//  var SuperPig = Class.create({
//    Extends: Animal,
//    Implements: Flyable,
//    initialize: function() {
//      SuperPig.superclass.initialize.apply(this, arguments)
//    },
//    Statics: {
//      COLOR: 'red'
//    }
// })
//
Class.create = function (parent, properties) {
	if (!isFunction(parent)) {
		properties = parent;
		parent = null;
	}

	properties || (properties = {});
	parent || (parent = properties.Extends || Class);
	properties.Extends = parent;

	// The created class constructor
	function SubClass() {
		var ret;
		// Call the parent constructor.
		parent.apply(this, arguments);

		// Only call initialize in self constructor.
		if (this.constructor === SubClass && this.initialize) {
			ret = this.initialize.apply(this, arguments);
		}
		return ret ? ret : this;
	}

	// Inherit class (static) properties from parent.
	if (parent !== Class) {
		mix(SubClass, parent, parent.StaticsWhiteList);
	}

	// Add instance properties to the subclass.
	implement.call(SubClass, properties);

	// Make subclass extendable.
	return classify(SubClass);
};

function implement(properties) {
	var key, value;

	for (key in properties) {
		value = properties[key];

		if (Class.Mutators.hasOwnProperty(key)) {
			Class.Mutators[key].call(this, value);
		} else {
			this.prototype[key] = value;
		}
	}
}

// Create a sub Class based on `Class`.
Class.extend = function (properties) {
	properties || (properties = {});
	properties.Extends = this;

	return Class.create(properties);
};

function classify(cls) {
	cls.extend = Class.extend;
	cls.implement = implement;
	return cls;
}

// Mutators define special properties.
Class.Mutators = {

	'Extends': function Extends(parent) {
		var existed = this.prototype;
		var proto = createProto(parent.prototype);

		// Keep existed properties.
		mix(proto, existed);

		// Enforce the constructor to be what we expect.
		proto.constructor = this;

		// Set the prototype chain to inherit from `parent`.
		this.prototype = proto;

		// Set a convenience property in case the parent's prototype is
		// needed later.
		this.superclass = parent.prototype;
	},

	'Implements': function Implements(items) {
		isArray$1(items) || (items = [items]);
		var proto = this.prototype,
		    item;

		while (item = items.shift()) {
			mix(proto, item.prototype || item);
		}
	},

	'Statics': function Statics(staticProperties) {
		mix(this, staticProperties);
	}

	// Shared empty constructor function to aid in prototype-chain creation.
};function Ctor() {}

// See: http://jsperf.com/object-create-vs-new-ctor
var createProto = Object.__proto__ ? function (proto) {
	return {
		__proto__: proto
	};
} : function (proto) {
	Ctor.prototype = proto;
	return new Ctor();
};

// Helpers
// ------------

function mix(r, s, wl) {
	// Copy "all" properties including inherited ones.
	for (var p in s) {
		if (s.hasOwnProperty(p)) {
			if (wl && indexOf(wl, p) === -1) continue;

			// 在 iPhone 1 代等设备的 Safari 中，prototype 也会被枚举出来，需排除
			if (p !== 'prototype') {
				r[p] = s[p];
			}
		}
	}
}

var toString = Object.prototype.toString;

var isArray$1 = Array.isArray || function (val) {
	return toString.call(val) === '[object Array]';
};

var isFunction = function isFunction(val) {
	return toString.call(val) === '[object Function]';
};

var indexOf = function indexOf(arr, item) {
	if (Array.prototype.indexOf && arr.indexOf) {
		return arr.indexOf(item);
	} else {
		for (var i = 0, len = arr.length; i < len; i++) {
			if (arr[i] === item) {
				return i;
			}
		}
		return -1;
	}
};

/**
 * Module : Sparrow extend enum
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-07-27 21:46:50
 */

var enumerables = true;
var enumerablesTest = {
	toString: 1
};
for (var i in enumerablesTest) {
	enumerables = null;
}
if (enumerables) {
	enumerables = ['hasOwnProperty', 'valueOf', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'constructor'];
}

/**
 * Module : Sparrow extend
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-07-27 21:46:50
 */

/**
 * 复制对象属性
 *
 * @param {Object}  目标对象
 * @param {config} 源对象
 */
var extend = function extend(object, config) {
	var args = arguments,
	    options;
	if (args.length > 1) {
		for (var len = 1; len < args.length; len++) {
			options = args[len];
			if (object && options && (typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
				var i, j, k;
				for (i in options) {
					object[i] = options[i];
				}
				if (enumerables) {
					for (j = enumerables.length; j--;) {
						k = enumerables[j];
						if (options.hasOwnProperty && options.hasOwnProperty(k)) {
							object[k] = options[k];
						}
					}
				}
			}
		}
	}
	return object;
};

if (!Object.assign) {
	Object.assign = extend;
}

/**
 * Module : Sparrow hotKeys
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-07-28 20:25:39
 */

var hotkeys = {};
hotkeys.special_keys = {
    27: 'esc', 9: 'tab', 32: 'space', 13: 'enter', 8: 'backspace', 145: 'scroll', 20: 'capslock',
    144: 'numlock', 19: 'pause', 45: 'insert', 36: 'home', 46: 'del', 35: 'end', 33: 'pageup',
    34: 'pagedown', 37: 'left', 38: 'up', 39: 'right', 40: 'down', 112: 'f1', 113: 'f2', 114: 'f3',
    115: 'f4', 116: 'f5', 117: 'f6', 118: 'f7', 119: 'f8', 120: 'f9', 121: 'f10', 122: 'f11', 123: 'f12'
};

hotkeys.shift_nums = {
    "`": "~", "1": "!", "2": "@", "3": "#", "4": "$", "5": "%", "6": "^", "7": "&",
    "8": "*", "9": "(", "0": ")", "-": "_", "=": "+", ";": ":", "'": "\"", ",": "<",
    ".": ">", "/": "?", "\\": "|"
};

hotkeys.add = function (combi, options, callback) {
    if (isFunction(options)) {
        callback = options;
        options = {};
    }
    var opt = {},
        defaults = { type: 'keydown', propagate: false, disableInInput: false, target: document.body, checkParent: true },
        that = this;
    opt = extend(opt, defaults, options || {});
    combi = combi.toLowerCase();

    // inspect if keystroke matches
    var inspector = function inspector(event) {
        //event = $.event.fix(event); // jQuery event normalization.
        var element = this; //event.target;
        // @ TextNode -> nodeType == 3
        element = element.nodeType == 3 ? element.parentNode : element;

        if (opt['disableInInput']) {
            // Disable shortcut keys in Input, Textarea fields
            var target = element; //$(element);
            if (target.tagName == "INPUT" || target.tagName == "TEXTAREA") {
                return;
            }
        }
        var code = event.which,
            type = event.type,
            character = String.fromCharCode(code).toLowerCase(),
            special = that.special_keys[code],
            shift = event.shiftKey,
            ctrl = event.ctrlKey,
            alt = event.altKey,
            propagate = true,
            // default behaivour
        mapPoint = null;

        // in opera + safari, the event.target is unpredictable.
        // for example: 'keydown' might be associated with HtmlBodyElement
        // or the element where you last clicked with your mouse.
        if (opt.checkParent) {
            //              while (!that.all[element] && element.parentNode){
            while (!element['hotkeys'] && element.parentNode) {
                element = element.parentNode;
            }
        }

        //          var cbMap = that.all[element].events[type].callbackMap;
        var cbMap = element['hotkeys'].events[type].callbackMap;
        if (!shift && !ctrl && !alt) {
            // No Modifiers
            mapPoint = cbMap[special] || cbMap[character];
        }
        // deals with combinaitons (alt|ctrl|shift+anything)
        else {
                var modif = '';
                if (alt) modif += 'alt+';
                if (ctrl) modif += 'ctrl+';
                if (shift) modif += 'shift+';
                // modifiers + special keys or modifiers + characters or modifiers + shift characters
                mapPoint = cbMap[modif + special] || cbMap[modif + character] || cbMap[modif + that.shift_nums[character]];
            }
        if (mapPoint) {
            mapPoint.cb(event);
            if (!mapPoint.propagate) {
                event.stopPropagation();
                event.preventDefault();
                return false;
            }
        }
    };
    // first hook for this element
    var data = opt.target['hotkeys'];
    if (!data) {
        opt.target['hotkeys'] = data = { events: {} };
    }
    //      if (!hotkeys.all[opt.target]){
    //          hotkeys.all[opt.target] = {events:{}};
    //      }
    if (!data.events[opt.type]) {
        data.events[opt.type] = { callbackMap: {} };
        on(opt.target, opt.type, inspector);
        //$.event.add(opt.target, opt.type, inspector);
    }
    //      if (!hotkeys.all[opt.target].events[opt.type]){
    //          hotkeys.all[opt.target].events[opt.type] = {callbackMap: {}}
    //          $.event.add(opt.target, opt.type, inspector);
    //      }
    data.events[opt.type].callbackMap[combi] = { cb: callback, propagate: opt.propagate };
    //      hotkeys.all[opt.target].events[opt.type].callbackMap[combi] =  {cb: callback, propagate:opt.propagate};
    return hotkeys;
};
hotkeys.remove = function (exp, opt) {
    opt = opt || {};
    target = opt.target || document.body;
    type = opt.type || 'keydown';
    exp = exp.toLowerCase();

    delete target['hotkeys'].events[type].callbackMap[exp];
};

hotkeys.scan = function (element, target) {
    element = element || document.body;
    element.querySelectorAll('[u-enter]').forEach(function (el) {
        var enterValue = el.getAttribute('u-enter');
        if (!enterValue) return;
        if (enterValue.substring(0, 1) == '#') hotkeys.add('enter', { target: this }, function () {
            var _el = element.querySelector(enterValue);
            if (_el) {
                _el.focus();
            }
        });else {
            target = target || window;
            var func = h(target, enterValue);
            hotkeys.add('enter', { target: this }, function () {
                func.call(this);
            });
        }
    });
    element.querySelectorAll('[u-hotkey]').forEach(function (el) {
        var hotkey = el.getAttribute('u-hotkey');
        if (!hotkey) return;
        hotkeys.add(hotkey, function () {
            el.click();
        });
    });
};

var hotkeys = hotkeys;

/**
 * Module : compox createApp
 * Author : huyue(huyueb@yonyou.com)
 * Date   : 2017-01-17 10:13:10
 */
var App = function App() {
    classCallCheck(this, App);

    // init
    this.init = init;
    this.dataTables = {};
};

var init = function init(viewModel, element, doApplyBindings) {
    var self = this;
    element = element || document.body;
    if (!isArray(element)) {
        element = [element];
    }
    this.elements = element;
    this.comps = [];
    each(this.elements, function (i, element) {
        if (typeof element === 'string') {
            element = document.querySelector(element);
        }
        if (element) {
            element.querySelectorAll('[u-meta]').forEach(function (ele) {
                var options = JSON.parse(ele.getAttribute('u-meta'));
                options['type'] = options['type'] || 'string';
                if (options && options['type']) {
                    if (self.adjustFunc) self.adjustFunc.call(self, options);
                    var comp = compMgr.createDataAdapter({ el: ele, options: options, model: viewModel, app: self });
                    ele['u-meta'] = comp;
                    self.comps.push(comp);
                }
            });
        }

        if (hotkeys) hotkeys.scan(element);
        if (typeof doApplyBindings == 'undefined' || doApplyBindings == true) ko.applyBindings(viewModel, element);
        compMgr.updateComp(element);
    });
    if (Moy.DataTable && typeof Moy.DataTable === 'function') {
        _getDataTables(this, viewModel);
    }
};

var _getDataTables = function _getDataTables(app, viewModel) {
    for (var key in viewModel) {
        if (viewModel[key] && viewModel[key] instanceof Moy.DataTable) {
            viewModel[key].id = key;
            viewModel[key].parent = viewModel;
            app.addDataTable(viewModel[key]);
        }
    }
};

var createApp = function createApp() {
    var app = new App();
    if (arguments.length > 0) {
        var arg = arguments[0];
        app.init(arg.model, arg.el);
    }
    return app;
};

/**
 * Module : compox-util setAdjustMetaFunc
 * Author : huyue(huyueb@yonyou.com)
 * Date	  : 2017-01-18 09:34:01
 */

var setAdjustMetaFunc = function setAdjustMetaFunc(adjustFunc) {
  this.adjustFunc = adjustFunc;
};

/**
 * Module : compox-util dataTable
 * Author : huyue(huyueb@yonyou.com)
 * Date	  : 2017-01-18 09:34:01
 */

var addDataTable = function addDataTable(dataTable) {
    this.dataTables[dataTable.id] = dataTable;
    return this;
};
var getDataTable = function getDataTable(id) {
    return this.dataTables[id];
};

var getDataTables = function getDataTables() {
    return this.dataTables;
};

/**
 * Module : compox-util comp
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2017-01-18 09:34:01
 */
var createComp = function createComp(ele, viewModel) {
    var options = JSON.parse(ele.getAttribute('u-meta'));
    if (options && options['type']) {
        var comp = compMgr.createDataAdapter({
            el: ele,
            options: options,
            model: viewModel,
            app: this
        });
        ele['u-meta'] = comp;
        this.comps.push(comp);
    }
    return comp;
};

var getComp = function getComp(compId) {
    var comps = this.getComps();
    for (var i = 0; i < comps.length; i++) {
        var comp = comps[i];
        if (comp.id == compId) {
            return comp;
        }
    }
    return null;
};

var getCompsByDataTable = function getCompsByDataTable(dataTableId, element) {
    var comps = this.getComps(element),
        targetComps = [];
    for (var i = 0; i < comps.length; i++) {
        if (comps[i].dataModel && comps[i].dataModel['id'] == dataTableId || comps[i].dataTable && comps[i].dataTable['id'] == dataTableId) targetComps.push(comps[i]);
    }
    return targetComps;
};

/**
 * 根据类型获取控件
 * @param {String} type
 * @param {object} element
 */
var getCompsByType = function getCompsByType(type, element) {
    var comps = this.getComps(element),
        targetComps = [];
    for (var i = 0; i < comps.length; i++) {
        var comp = comps[i];
        if (comp && comp.type == type) targetComps.push(comp);
    }
    return targetComps;
};

/**
 * 获取某区域中的所有控件
 * @param {object} element
 */
var getComps = function getComps(element) {
    if (element) {
        return this.getCompsByElement(element);
    } else {
        return this.comps;
    }
};

/**
 * 获取某区域中的所有控件
 * @param {object} element
 */
var getCompsByElement = function getCompsByElement(element) {
    var elements = element ? element : this.elements;
    var returnComps = [];
    if (typeof elements == 'string') {
        elements = document.querySelectorAll(elements);
    }
    if (!isArray(elements) && !(elements instanceof NodeList)) elements = [elements];
    each(elements, function (i, element) {
        if (element) {
            element.querySelectorAll('[u-meta]').forEach(function (ele) {
                if (ele['u-meta']) {
                    var comp = ele['u-meta'];
                    if (comp) returnComps.push(comp);
                }
            });
        }
    });
    return returnComps;
};

/**
 * 将comp显示到顶端（此方法只支持body上存在滚动条的情况）
 * @param {object} comp对象
 */
var showComp = function showComp(comp) {
    var ele = comp.element,
        off = getOffset(ele),
        scroll = getScroll(ele),
        top = off.top - scroll.top,
        bodyHeight = document.body.clientHeight,
        nowTop = document.body.scrollTop;
    if (top > bodyHeight || top < 0) {
        document.body.scrollTop = nowTop + top;
    }
};

/**
 * Module : Sparrow browser environment
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-07-27 21:46:50
 */

var u$1 = {};

extend(u$1, {
	isIE: false,
	isFF: false,
	isOpera: false,
	isChrome: false,
	isSafari: false,
	isWebkit: false,
	isIE8_BEFORE: false,
	isIE8: false,
	isIE8_CORE: false,
	isIE9: false,
	isIE9_CORE: false,
	isIE10: false,
	isIE10_ABOVE: false,
	isIE11: false,
	isEdge: false,
	isIOS: false,
	isIphone: false,
	isIPAD: false,
	isStandard: false,
	version: 0,
	isWin: false,
	isUnix: false,
	isLinux: false,
	isAndroid: false,
	isAndroidPAD: false,
	isAndroidPhone: false,
	isMac: false,
	hasTouch: false,
	isMobile: false
});

(function () {
	var userAgent = navigator.userAgent,
	    rMsie = /(msie\s|trident.*rv:)([\w.]+)/,
	    rFirefox = /(firefox)\/([\w.]+)/,
	    rOpera = /(opera).+version\/([\w.]+)/,
	    rChrome = /(chrome)\/([\w.]+)/,
	    rSafari = /version\/([\w.]+).*(safari)/,
	    version,
	    ua = userAgent.toLowerCase(),
	    s,
	    browserMatch = {
		browser: "",
		version: ''
	},
	    match = rMsie.exec(ua);

	if (match != null) {
		browserMatch = {
			browser: "IE",
			version: match[2] || "0"
		};
	}
	match = rFirefox.exec(ua);
	if (match != null) {
		browserMatch = {
			browser: match[1] || "",
			version: match[2] || "0"
		};
	}
	match = rOpera.exec(ua);
	if (match != null) {
		browserMatch = {
			browser: match[1] || "",
			version: match[2] || "0"
		};
	}
	match = rChrome.exec(ua);
	if (match != null) {
		browserMatch = {
			browser: match[1] || "",
			version: match[2] || "0"
		};
	}
	match = rSafari.exec(ua);
	if (match != null) {
		browserMatch = {
			browser: match[2] || "",
			version: match[1] || "0"
		};
	}

	if (userAgent.indexOf("Edge") > -1) {
		u$1.isEdge = true;
	}
	if (s = ua.match(/opera.([\d.]+)/)) {
		u$1.isOpera = true;
	} else if (browserMatch.browser == "IE" && browserMatch.version == 11) {
		u$1.isIE11 = true;
		u$1.isIE = true;
	} else if (s = ua.match(/chrome\/([\d.]+)/)) {
		u$1.isChrome = true;
		u$1.isStandard = true;
	} else if (s = ua.match(/version\/([\d.]+).*safari/)) {
		u$1.isSafari = true;
		u$1.isStandard = true;
	} else if (s = ua.match(/gecko/)) {
		//add by licza : support XULRunner
		u$1.isFF = true;
		u$1.isStandard = true;
	} else if (s = ua.match(/msie ([\d.]+)/)) {
		u$1.isIE = true;
	} else if (s = ua.match(/firefox\/([\d.]+)/)) {
		u$1.isFF = true;
		u$1.isStandard = true;
	}
	if (ua.match(/webkit\/([\d.]+)/)) {
		u$1.isWebkit = true;
	}
	if (ua.match(/ipad/i)) {
		u$1.isIOS = true;
		u$1.isIPAD = true;
		u$1.isStandard = true;
	}

	if (ua.match(/iphone/i)) {
		u$1.isIOS = true;
		u$1.isIphone = true;
	}

	if (navigator.platform == "Mac68K" || navigator.platform == "MacPPC" || navigator.platform == "Macintosh" || navigator.platform == "MacIntel") {
		//u.isIOS = true;
		u$1.isMac = true;
	}

	if (navigator.platform == "Win32" || navigator.platform == "Windows" || navigator.platform == "Win64") {
		u$1.isWin = true;
	}

	if (navigator.platform == "X11" && !u$1.isWin && !u$1.isMac) {
		u$1.isUnix = true;
	}
	if (String(navigator.platform).indexOf("Linux") > -1) {
		u$1.isLinux = true;
	}

	if (ua.indexOf('Android') > -1 || ua.indexOf('android') > -1 || ua.indexOf('Adr') > -1 || ua.indexOf('adr') > -1) {
		u$1.isAndroid = true;
	}

	u$1.version = version ? browserMatch.version ? browserMatch.version : 0 : 0;
	if (u$1.isAndroid) {
		if (window.screen.width >= 768 && window.screen.width < 1024) {
			u$1.isAndroidPAD = true;
		}
		if (window.screen.width <= 768) {
			u$1.isAndroidPhone = true;
		}
	}
	if (u$1.isIE) {
		var intVersion = parseInt(u$1.version);
		var mode = document.documentMode;
		if (mode == null) {
			if (intVersion == 6 || intVersion == 7) {
				u$1.isIE8_BEFORE = true;
			}
		} else {
			if (mode == 7) {
				u$1.isIE8_BEFORE = true;
			} else if (mode == 8) {
				u$1.isIE8 = true;
			} else if (mode == 9) {
				u$1.isIE9 = true;
				u$1.isSTANDARD = true;
			} else if (mode == 10) {
				u$1.isIE10 = true;
				u$1.isSTANDARD = true;
				u$1.isIE10_ABOVE = true;
			} else {
				u$1.isSTANDARD = true;
			}
			if (intVersion == 8) {
				u$1.isIE8_CORE = true;
			} else if (intVersion == 9) {
				u$1.isIE9_CORE = true;
			} else if (browserMatch.version == 11) {
				u$1.isIE11 = true;
			}
		}
	}
	if ("ontouchend" in document) {
		u$1.hasTouch = true;
	}
	if (u$1.isIphone || u$1.isAndroidPhone) u$1.isMobile = true;
})();

var env = u$1;

/**
 * Module : compox-util validate
 * Author : huyue(huyueb@yonyou.com)
 * Date   : 2017-01-18 09:34:01
 */

/**
 * 控件数据校验
 * @param {Object} element
 */
var compsValidate = function compsValidate(element, retUnpass) {
    var comps = this.getComps(element),
        passed = true,
        unpassed = [];
    for (var i = 0; i < comps.length; i++) {
        if (comps[i].doValidate) {
            var result = comps[i].doValidate({ trueValue: true, showMsg: true });
            result = (typeof result === 'undefined' ? 'undefined' : _typeof(result)) === 'object' ? result['passed'] : result;
            passed = result && passed;
            if (!result) unpassed.push(comps[i]);
        }
    }
    if (retUnpass) return unpassed;
    return passed;
};

var compsValidateMultiParam = function compsValidateMultiParam(options) {
    var element = options.element,
        comps = this.getComps(element),
        passed = true,
        showMsg = options.showMsg,
        notPassedArr = new Array();
    for (var i = 0; i < comps.length; i++) {
        if (comps[i].doValidate) {
            var result = comps[i].doValidate({ trueValue: true, showMsg: showMsg });
            // 如果passed为true,result.passed为false说明第一次出现错误校验
            if (passed && !result.passed) {
                var off = getOffset(comps[i].element);
                //滚动到第一次出现错误的地方
                window.scrollTo(0, off.top - 80);
                if (env.isIPAD) {
                    // ipad上面云表单提交校验的时候没有滚动到对应位置
                    window.top.scrollTo(0, off.top - 80);
                }
            }
            passed = result.passed && passed;
            if (!result.passed) {
                notPassedArr.push(result);
            }
        }
    }
    return { passed: passed,
        notPassedArr: notPassedArr };
};

/**
 * Module : compox-util cache
 * Author : huyue(huyueb@yonyou.com)
 * Date   : 2017-01-18 09:34:01
 */

var setUserCache = function setUserCache(key, value) {
    var userCode = this.getEnvironment().usercode;
    if (!userCode) return;
    localStorage.setItem(userCode + key, value);
};

var getUserCache = function getUserCache(key) {
    var userCode = this.getEnvironment().usercode;
    if (!userCode) return;
    return localStorage.getItem(userCode + key);
};

var removeUserCache = function removeUserCache(key) {
    var userCode = this.getEnvironment().usercode;
    if (!userCode) return;
    localStorage.removeItem(userCode + key);
};

var setCache = function setCache(key, value) {
    localStorage.setItem(key, value);
};

var getCache = function getCache(key) {
    return localStorage.getItem(key);
};

var removeCache = function removeCache(key) {
    localStorage.removeItem(key);
};

var setSessionCache = function setSessionCache(key, value) {
    sessionStorage.setItem(key, value);
};

var getSessionCache = function getSessionCache(key) {
    return sessionStorage.getItem(key);
};

var removeSessionCache = function removeSessionCache(key) {
    sessionStorage.removeItem(key);
};

/**
 * Module : compox-util iwebCore
 * Author : huyue(huyueb@yonyou.com)
 * Date	  : 2017-01-18 09:34:01
 */

var getEnvironment = function getEnvironment() {
    return u.core.collectEnvironment();
};

var setClientAttribute = function setClientAttribute(k, v) {
    u.core.setClientAttribute(k, v);
};

var getClientAttribute = function getClientAttribute(k) {
    return u.core.getClientAttributes()[k];
};

/**
 * Module : Sparrow ajax
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-07-28 19:06:36
 */

var XmlHttp = {
	get: "get",
	post: "post",
	reqCount: 4,
	createXhr: function createXhr() {
		var xmlhttp = null;
		/*if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }*/
		if (env.isIE8) {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); //IE低版本创建XMLHTTP
		} else if (env.isIE) {
			xmlhttp = new ActiveXObject("Msxml2.XMLHTTP"); //IE高版本创建XMLHTTP
		} else if (window.XMLHttpRequest) {
			xmlhttp = new XMLHttpRequest();
		}
		return xmlhttp;
	},
	ajax: function ajax(_json) {
		var url = _json["url"];
		var callback = _json["success"];
		var async = _json["async"] == undefined ? true : _json["async"];
		var error = _json["error"];
		var params = _json["data"] || {};
		var method = (_json["type"] == undefined ? XmlHttp.post : _json["type"]).toLowerCase();
		var gzipFlag = params.compressType;
		url = XmlHttp.serializeUrl(url);
		params = XmlHttp.serializeParams(params);
		if (method == XmlHttp.get && params != null) {
			url += "&" + params;
			params = null; //如果是get请求,保证最终会执行send(null)
		}

		var xmlhttp = XmlHttp.createXhr();
		//xmlhttp.open(method, url+ escape(new Date()), async);
		xmlhttp.open(method, url, async);

		if (method == XmlHttp.post) {
			xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
		}

		var execount = 0;
		// 异步
		if (async) {
			// readyState 从 1~4发生4次变化
			xmlhttp.onreadystatechange = function () {
				execount++;
				// 等待readyState状态不再变化之后,再执行回调函数
				//if (execount == XmlHttp.reqCount) {// 火狐下存在问题，修改判断方式
				if (xmlhttp.readyState == XmlHttp.reqCount) {
					XmlHttp.execBack(xmlhttp, callback, error);
				}
			};
			// send方法要在在回调函数之后执行
			xmlhttp.send(params);
		} else {
			// 同步 readyState 直接变为 4
			// 并且 send 方法要在回调函数之前执行
			xmlhttp.send(params);
			XmlHttp.execBack(xmlhttp, callback, error);
		}
	},
	execBack: function execBack(xmlhttp, callback, error) {
		//if (xmlhttp.readyState == 4
		if (xmlhttp.status == 200 || xmlhttp.status == 304 || xmlhttp.readyState == 4) {
			callback(xmlhttp.responseText, xmlhttp.status, xmlhttp);
		} else {
			if (error) {
				error(xmlhttp.responseText, xmlhttp.status, xmlhttp);
			} else {
				var errorMsg = "no error callback function!";
				if (xmlhttp.responseText) {
					errorMsg = xmlhttp.responseText;
				}
				alert(errorMsg);
				// throw errorMsg;
			}
		}
	},
	serializeUrl: function serializeUrl(url) {
		var cache = "cache=" + Math.random();
		if (url.indexOf("?") > 0) {
			url += "&" + cache;
		} else {
			url += "?" + cache;
		}
		return url;
	},
	serializeParams: function serializeParams(params) {
		var ud = undefined;
		if (ud == params || params == null || params == "") {
			return null;
		}
		if (params.constructor == Object) {
			var result = "";
			for (var p in params) {
				result += p + "=" + encodeURIComponent(params[p]) + "&";
			}
			return result.substring(0, result.length - 1);
		}
		return params;
	}
};

var ajax$1 = XmlHttp.ajax;

/**
 * Module : compox-util ajax
 * Author : huyue(huyueb@yonyou.com)
 * Date   : 2017-01-18 09:34:01
 */

var ajax = function ajax(params) {
    params = _wrapAjax.call(this, params);
    ajax$1(params);
};

/**
 * 对ajax的请求的数据进行处理
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
var _wrapAjax = function _wrapAjax(params) {
    var self = this;
    this.serverEventObj = this.serverEvent();
    var orignSuccess = params.success;
    var orignError = params.error;
    var deferred = params.deferred;
    if (!deferred || !deferred.resolve) {
        deferred = {
            resolve: function resolve() {}, reject: function reject() {}
        };
    }
    params.success = function (data, state, xhr) {
        if (typeof data === 'string') data = JSON.parse(data);
        if (self.serverEventObj.processXHRError(self, data, state, xhr)) {
            orignSuccess.call(null, data);
            _successFunc(data, deferred);
        } else {
            deferred.reject();
        }
    };
    params.error = function (data, state, xhr) {
        if (typeof data === 'string') data = JSON.parse(data);
        if (self.serverEventObj.processXHRError(self, data, state, xhr)) {
            orignError.call(null, data);
            _successFunc(data, deferred);
        } else {
            deferred.reject();
        }
    };
    if (params.data) params.data.environment = ko.utils.stringifyJson(u.core.collectEnvironment());else params.data = { environment: ko.utils.stringifyJson(u.core.collectEnvironment()) };
    return params;
};

var _successFunc = function _successFunc(data, deferred) {
    deferred.resolve();
};

/**
 * Module : compox-util serverEvent
 * Author : huyue(huyueb@yonyou.com)
 * Date	  : 2017-01-18 09:34:01
 */

var serverEvent = function serverEvent() {
  return new ServerEvent(this);
};

/**
 * Module : compox-util util
 * Author : huyue(huyueb@yonyou.com)
 * Date   : 2017-01-18 09:34:01
 */

var setEnable = function setEnable(enable) {
    each(this.elements, function (i, element) {
        if (element) {
            element.querySelectorAll('[u-meta]').each(function () {
                if (this['u-meta']) {
                    var comp = this['u-meta'];
                    if (comp.setEnable) comp.setEnable(enable);
                }
            });
        }
    });
};

/**
 * Module : compox-util webpack entry app index
 * Author : huyue(huyueb@yonyou.com)
 * Date	  : 2017-01-18 09:34:01
 */
function compoxUtil() {

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

/**
 * [use description]
 * @param  {[type]} plugin [description]
 * @return {[type]}        [description]
 */
function use(plugin) {
  // additional parameters
  var args = toArray$1(arguments, 1);
  args.unshift(this);
  if (typeof plugin.install === 'function') {
    plugin.install.apply(plugin, args);
  } else if (typeof plugin === 'function') {
    plugin.apply(null, args);
  }
  return this;
}
/**
 * Convert an Array-like object to a real Array.
 */
function toArray$1(list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret;
}
/**
 * [initComponent description]
 * @param  {[type]} Moy [description]
 * @return {[type]}     [description]
 */
function component(Moy) {}

use(compoxUtil);

exports.App = App;
exports.createApp = createApp;
exports.compMgr = compMgr;
exports.use = use;
exports.component = component;

return exports;

}({}));
