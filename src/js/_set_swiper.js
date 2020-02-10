// const Swiper = require('swiper')
import Swiper from 'swiper'

var swipe = new Swiper('.js-swipe', {
  direction: 'vertical',
  loop: true,
  navigation: {
    nextEl: '.js-swipe-next',
    prevEl: '.js-swipe-prev',
  },
})
