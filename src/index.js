import {
	compMgr
} from './compMgr';

import {
    createApp
} from './createApp';

//公开接口、属性对外暴露
let Moy = {
	createApp:createApp,
	compMgr: compMgr
};
window.Moy = Moy;
export {Moy};
