import {
    compMgr
} from './compMgr';

import {
    createApp
} from './createApp';

import {
    initUse,
    initComponent
} from './expand.js';

//公开接口、属性对外暴露
let Moy = {
    createApp: createApp,
    compMgr: compMgr
};
initUse(Moy);
initComponent(Moy);
window.Moy = Moy;
export {
    Moy
};
