import '../../scss/common.scss'
import './home.css'
import Vue from 'vue'
import home from './home.vue'

new Vue({
	el: '#app',
	render: h => h(home)
})