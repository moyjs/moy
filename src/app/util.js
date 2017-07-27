/**
 * Module : compox-util util
 * Author : huyue(huyueb@yonyou.com)
 * Date   : 2017-01-18 09:34:01
 */

import {each} from 'tinper-sparrow/src/util';
const setEnable = function (enable) {
    each(this.elements, function (i, element) {
        if(element){
            element.querySelectorAll('[u-meta]').each(function () {
                if (this['u-meta']) {
                    var comp = this['u-meta'];
                    if (comp.setEnable)
                        comp.setEnable(enable)
                }
            })
        }

    })
}

export {
	setEnable
}
