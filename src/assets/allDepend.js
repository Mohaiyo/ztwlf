//全局依赖
import './css/classify.css';
import './css/home.css';
import './css/detail.css';
import './css/initialize.css';

import Vue from 'vue';
import './js/filter.js';
import myValid from './js/myValid.js';
import MyPlugin from './js/plugn.js';
Vue.use(myValid)
Vue.use(MyPlugin)