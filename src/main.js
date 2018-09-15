// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './stores'
import Bottom from '@/components/component/bottom'
import FastClick from 'fastclick'
import {Button, Row, Col, Swipe, SwipeItem, Lazyload, List, Field, CellGroup, NavBar, Tabs, Tab, PullRefresh, Tabbar, TabbarItem, Stepper,
  GoodsAction, GoodsActionBigBtn, GoodsActionMiniBtn, Icon, SubmitBar, Checkbox, CheckboxGroup,
  Card, AddressEdit, AddressList, Dialog, Search} from 'vant'

Vue.use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Lazyload).use(List).use(Field).use(NavBar).use(Tabs).use(Tab).use(CellGroup).use(PullRefresh)
  .use(Tabbar).use(TabbarItem).use(Stepper).use(GoodsAction).use(GoodsActionBigBtn).use(GoodsActionMiniBtn).use(Icon).use(SubmitBar).use(Checkbox).use(CheckboxGroup)
  .use(Card).use(AddressEdit).use(AddressList).use(Dialog).use(Search)

Vue.component('v-bottom', Bottom)

Vue.config.productionTip = false

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body)
  }, false)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
