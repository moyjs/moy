import {
    compMgr
} from './compMgr';
import {
    App,
    createApp
} from './createApp';
import { compoxUtil } from  './app/index.js';
import {
    use,
    Component
} from './expand.js';

use(compoxUtil);

/**
 * createApp() : 创建应用服务
 * use() : 使用 plugin 或 middleware
 * createModel() : 创建数据模型
 */
export {
    App,
    createApp,
    compMgr,
    use,
    Component
};
