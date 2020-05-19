import 'babel-polyfill';
import Vue from 'vue';
import vueResource from 'vue-resource';
import router from './router.js';
import App from './views/app/app.vue';

// import Element from './assets/js/element-ui.js'
// import './assets/styles/element-ui.css';

// Vue.use(Element, {
//   size: Cookies.get('size') || 'medium', // set element-ui default size
//   i18n: (key, value) => i18n.t(key, value)
// })



Vue.use(vueResource);
window.bus = new Vue();
window.appp = new Vue({
    el: '#app-root',
    router,
	render: function(h){
        	return h(App);
        }
});
