import {calendar} from '@/views/js/calendar.js'
export function timeFix () {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

export function welcome () {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent () {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

export function handleScrollHeader (callback) {
  let timer = 0

  let beforeScrollTop = window.pageYOffset
  callback = callback || function () {}
  window.addEventListener(
    'scroll',
    event => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        let direction = 'up'
        const afterScrollTop = window.pageYOffset
        const delta = afterScrollTop - beforeScrollTop
        if (delta === 0) {
          return false
        }
        direction = delta > 0 ? 'down' : 'up'
        callback(direction)
        beforeScrollTop = afterScrollTop
      }, 50)
    },
    false
  )
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate (id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}

export function millsToTime (mills) {
  if (!mills) {
    return ''
  }
  const s = mills / 1000
  if (s < 60) {
    return s.toFixed(0) + ' 秒'
  }
  const m = s / 60
  if (m < 60) {
    return m.toFixed(0) + ' 分钟'
  }
  const h = m / 60
  if (h < 24) {
    return h.toFixed(0) + ' 小时'
  }
  const d = h / 24
  if (d < 30) {
    return d.toFixed(0) + ' 天'
  }
  const month = d / 30
  if (month < 12) {
    return month.toFixed(0) + ' 个月'
  }
  const year = month / 12
  return year.toFixed(0) + ' 年'
};

/**
 * 获取当前日期
 * @returns {string}
 */
export const currentDate = () =>{
  let nowDate = new Date();
  let date = {
    year: nowDate.getFullYear(),
    month: nowDate.getMonth() + 1,
    date: nowDate.getDate(),
  }
  return date.year + '年'  + date.month + '月'  + date.date+'日';
}

/**
 * 获取当前时间
 * @returns {string}
 */
export const currentTime = () =>{
  let nowDate = new Date();
  return nowDate.getHours() + ':' + (nowDate.getMinutes() < 10 ? '0' + nowDate.getMinutes() : nowDate.getMinutes())
}

export const lunarDateAndTime = () =>{
  let lunardate = calendar.solar2lunar();
  return `${currentDate()} <span class="time_sp_m">
       ${lunardate.ncWeek}</span> 
       <span class="time_sp_m">农历${lunardate.IMonthCn+lunardate.IDayCn}</span>`
}


export const isFloat = (rule, value, callback) => {
  if (!value) {
    callback();
  } else {
    var reg = /^-?\d{1,10}(?:\.\d{1,2})?$/;
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error("数字格式:0-9999999999或小数点后可加1到2位"));//如:1 或1.8 或1.85
    }
  }
};

export const isNumber = (rule, value, callback) => {
  if (!value) {
    callback();
  } else if (/\D/.test(value)) {
    callback(new Error('请输入数字类型'));
  } else {
    callback();
  }
};

export const isTelOrFax = (rule, value, callback) => {
  if (!value) {
    callback();
  } else {
    const reg = /^(\d{3,4}-)?\d{7,8}$/;
    const isTel = reg.test(value);
    if (value.length < 10 || value.length > 13 || !isTel ) {//判断传真字符范围是在10到13
      callback(new Error("格式如:0376-12345678"));
    } else {
      callback();
    }
  }
};

export const checkPhone = (rule, value, callback) => {
  if (!value) {
    callback();
  } else {
    //var reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
    var reg=/^([1]\d{10}|([\(（]?0[0-9]{2,3}[）\)]?[-]?)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?)$/;
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error("请输入正确的联系方式"));
    }
  }
};
