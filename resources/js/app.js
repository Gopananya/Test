require('./bootstrap');
import Vue from 'vue';
import VueRouter from 'vue-router';
import { router } from './router';
import MainApp from './components/MainApp.vue';

const app = new Vue({
    el: '#app',
    router,
    components: {
    	MainApp
    }
});
