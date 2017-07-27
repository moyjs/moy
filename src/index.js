import { compMgr } from './compMgr';
import {
    App,
    createApp
} from './createApp';
// import { compoxUtil } from  './app/index.js';
import use from './use.js';
import Component from './Component.js'

// use(compoxUtil);

/**
 * createApp() : 创建应用服务
 * use() : 使用 plugin 或 middleware
 * createModel() : 创建数据模型
 */
export default {
  // App,
  createApp,
  compMgr,
  use,
  Component
};
