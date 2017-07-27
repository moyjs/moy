import {
    compMgr
} from './compMgr';
import {
    App,
    createApp
} from './createApp';
import {compoxUtil} from  './app/index.js';
import {
    use,
    component
} from './expand.js';


use(compoxUtil);

export {
    App,
    createApp,
    compMgr,
    use,
    component
};
