import _ from 'lodash'
import Swiper from 'swiper'

// ---------- swiper --------------------

// init variables
const breakPoint = 768
let isAddResize = true
let swiper = []
const dataSwiper = [
  {
    target: '.js-swiper01',
    offset: 55,
    group: 1,
    speed: 200,
  },
  {
    target: '.js-swiper02',
    offset: 65,
    group: 3,
    speed: 400,
  },
  {
    target: '.js-swiper03',
    offset: 55,
    group: 1,
    speed: 200,
  },
]

// initialize swiper
const initSwiper = () => {
  if (!isActivateSwipe()) return
  dataSwiper.forEach((val, index) => {
    // swiper controler
    val.index = index
    setSwiper(val)

    // resize flag off
    if (isAddResize && index >= dataSwiper.length - 1) {
      isAddResize = false
    }
  })
}

// standby swiper
const standbySwiper = () => {
  const width = window.innerWidth
  if (width > breakPoint) initSwiper()
}

// inspect window width
const isActivateSwipe = (result = false) => {
  const width = window.innerWidth
  if (width > breakPoint) result = true
  return result
}

// swiper controler
let setSwiper = data => {
  // set option
  const option = {
    slidesPerView: 4,
    spaceBetween: 10,
    slidesOffsetBefore: data.offset,
    slidesOffsetAfter: data.offset,
    slidesPerGroup: data.group,
    speed: data.speed,
    navigation: {
      nextEl: '.js-swiper-next',
      prevEl: '.js-swiper-prev',
    },
  }

  // run swiper
  swiper[data.index] = new Swiper(data.target, option)

  // set resize swiper
  if (!isAddResize) return
  window.addEventListener(
    'resize',
    _.throttle(() => {
      // reset swiper
      if (!isActivateSwipe()) {
        swiper[data.index].destroy()
      }
    }, 500),
  )
}

// ---------- xhr --------------------

// xhr path
const dataPath = ['./json/data01.json', './json/data02.json', './json/data03.json']

// xhr main
const getXhr = path => {
  return new Promise((resolve, reject) => {
    let req = new XMLHttpRequest()
    req.open('GET', path, true)
    req.onload = function() {
      if (req.status === 200) {
        resolve(req.responseText)
      } else {
        reject(new Error(req.statusText))
      }
    }
    req.onerror = function() {
      reject(new Error(req.statusText))
    }
    req.send()
  })
}

// get data
window.addEventListener('DOMContentLoaded', () => {
  dataPath.forEach((val, index) => {
    getXhr(val)
      // success
      .then(data => {
        runSnccess(data, index)
      })
      // error
      .catch(error => {
        console.error(error)
      })
  })
})

// run success
const runSnccess = (data, index) => {
  // render list
  renderList(index, data)

  // load swiper
  if (index >= dataPath.length - 1) {
    // initialize swiper
    initSwiper()

    // standby swiper for resize
    window.addEventListener('resize', _.throttle(standbySwiper, 500))
  }
}

// render list
const renderList = (index, data) => {
  const list = document.querySelectorAll('.js-swiper-list')
  const json = JSON.parse(data)
  let src = ''
  json.image.forEach(val => {
    src += `<div class="swiper-slide"><img src="${val}" alt=""></div>`
  })
  list[index].innerHTML = src
}
