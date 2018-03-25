import {
  Dimensions,
} from "react-native";

const {width} = Dimensions.get('window');


/**
 * 验证登录(手机号/邮箱)
 */
function checkedPhone(e) {
  if (typeof e === 'number' || typeof e === 'string') {
    return (/^1\d{10}$/).test(String(e));
  }
  return false;
}

function checkedEmail(e) {
  if (typeof e === 'string') {
    return (/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/).test(e);
  }
  return false;
}


/**
 * 时间戳(毫秒) yyyy-mm-dd  hh:mm:ss
 */
function formatDateTime(inputTime) {
  let date = new Date(inputTime);
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  let d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  let h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  let minute = date.getMinutes();
  let second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
}

/**
 * 时间戳(毫秒) yyyy-mm-dd
 */

function formatDateDay(inputTime) {
  let date = new Date(inputTime);
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  let d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  return y + '-' + m + '-' + d;
}

/**
 * 时间戳(毫秒) dd-hh
 */
function formatDayHours(second_time) {
  let time = parseInt(second_time) + "秒";
  if(parseInt(second_time) > 60 && parseInt(second_time) < 3600){
    let second = parseInt(second_time) % 60;
    let min = parseInt(second_time / 60);
    time = second > 0 ? min + "分" + second + "秒" : min + "分";
  }

  if(parseInt(second_time) >= 3600 && parseInt(second_time) < 86400){
    let hour = parseInt( parseInt(second_time / 60) /60 );
    time = hour + "小时";
  }

  if(parseInt(second_time) >= 86400){
    let hour = parseInt( parseInt(second_time / 60) /60 ) % 24;
    let day = parseInt( parseInt( parseInt(second_time / 60) /60 ) / 24 );
    time = hour > 0 ? day + "天" + hour + "小时" : day + "天";
  }

  return time;
}


/**
 * 时间戳(毫秒) hh:mm
 */
function formatSeconds(value) {
  let theTime = parseInt(value);// 秒
  let theTime1 = 0;// 分
  let theTime2 = 0;// 小时
  if (theTime > 60) {
    theTime1 = parseInt(theTime / 60);
    //theTime = parseInt(theTime % 60);
    if (theTime1 > 60) {
      theTime2 = parseInt(theTime1 / 60);
      theTime1 = parseInt(theTime1 % 60);
    }
  }
  let result = "";
  if (theTime1 > 0) {
    result = "" + parseInt(theTime1) + "分" + result;
  }
  if (theTime2 > 0) {
    result = "" + parseInt(theTime2) + "小时" + result;
  }
  return result;
}


/**
 * 难度格式化
 */

function diff(value) {
  if (value) {
    value = String(value);
    value = value.split('').reverse().join('').replace(/(\d{3})/g, '$1,').replace(/\,$/, '').split('').reverse().join('');
    return value;
  }
}

function diffExt(value) {
  if (value) {
    value = (value / Math.pow(10, 12)).toFixed(2);
    return value + " T";
  }
}


/**
 * btc地址格式验证
 * 目前使用的是1，3开头
 * 长度是26-35位
 * base58编码格式---》123456789A~Za~z(IOl0排除)
 * 真实地址-》》3JfPLLmDTY5ZXUJzCM82U3sDumiSU67qLE
 */

function checkedBtcAddress(e) {
  if (typeof e === 'number' || typeof e === 'string') {
    return (/^(1|3)+[A-Za-z1-9](?!.*I|.*O|.*l|.*0)\w{23,33}$/g).test(String(e));
  }
  return false;
}

/**
 * 算力转换(GHs默认)
 */

function speedChange(val) {
  if (val) {
    let arr = ['GHs', 'THs', 'PHs', 'EHs', 'ZHs'], i = 0;
    while (val >= 1000 && i < arr.length) {
      i++;
      val = val / 1000;
    }
    /*if (val < 10 && i > 0) {
     val *= 1000;
     i--;
     }*/
    val = (Math.round(val * 100) / 100).toFixed(2);
    val += ' ' + arr[i];
  }
  return val;
}

/**
 * 人民币转换(分->元)
 */

function pointsToYuan(value) {
  let rmb = "";
  if (value) {
    rmb = Math.floor(Number(value) / 100)
  } else {
    rmb = "N/A"
  }
  return rmb;
}

/**
 *  speed, 当前算力(GH/S->1Thash/s = 10的12次方 hash/s),  diff 当前难度  block 块收益btc数量(单位聪)->转换B (预计每日收益)
 */

function dayGains(speed, diff, block) {
  let day_speed = ((speed / Math.pow(10, 3)) * Math.pow(10, 12)) * 86400 / diff / (Math.pow(2, 32)) * (block / Math.pow(10, 8));
  return day_speed.toFixed(8);
}

/**
 * 功率(W->KW/h)
 */

function powerKWh(value) {
  if (value) {
    value = value / 1000
  }
  return value;
}

/**
 * 服务费
 */

function serviceFeePercent(value) {
  if (value) {
    value = value * 100 * 0.001
  }
  return value;
}

/**
 * 比特币数字取正取整
 */

function absFloorNumber(value) {
  if (value) {
    value = Math.floor(Math.abs(value) / 1000)
  }
  return value;
}

/**
 * picker日期选择器时间添加
 * (year是起始年 number,  month是当前月份)
 *
 * 返回===>
 *  date = {
 *    yearArr: ["11月", "12月", "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月"],
 *    monthArr: ["2018年","2017年","2016年"]
 *  }
 */

function addPickerDate(year, month) {
  console.log(year, "--------" , month );
  let date = {
    yearArr: [],
    monthArr: []
  };
  let yearsPicker = [2018, 2019, 2020, 2021, 2022];
  if (yearsPicker.indexOf(year) !== -1) {
    // console.log(yearsPicker.indexOf(year), "存在该年份");
    let index = yearsPicker.indexOf(year);
    if (index === 0) {
      date.yearArr = ["2018年"];
    } else if (index === 1) {
      date.yearArr = ["2019年", "2018年"];
    } else if (index === 2) {
      date.yearArr = ["2020年", "2019年", "2018年"];
    } else if (index === 3) {
      date.yearArr = ["2021年", "2020年", "2019年", "2018年"];
    } else if (index === 4) {
      date.yearArr = ["2022年", "2021年", "2020年", "2019年", "2018年"];
    }
  } else {
    date.yearArr = ["2018年", "2019年", "2020年", "2021年", "2022年"];
  }

  for (let i = 0; i < 13; i++) {
    if (month > 12) {
      month = 1
    } else {
      date.monthArr.push(month + "月");
      month++;
    }
  }
  return date;
}

//=====>根据设备尺寸设置rem
function rem(size) {
  let rem = 10;
  if (width >= 360) {
    rem += parseInt((width - 360) / 120);
  } else {
    rem = 8;
  }
  return parseInt(rem * size / 10);
}

/**
 * 查找某个子字符串在字符串中的第几次出现的位置, 并裁剪出0--x位置的字符串
 * str ==> 字符串
 * cha ==> 子字符
 * num ==> 第几次出现
 * find("hello world",'o',2)
 */

function findStr(str, cha, num) {
  if (typeof str === 'string') {
    let x = str.indexOf(cha);
    for (let i = 0; i < num; i++) {
      x = str.indexOf(cha, x + i);
    }
    return str.slice(0, x);
  }
  return false;
}

/**
 * 把数组改造
 * var arr = [{},{},...]
 * 改成一下格式
 * var paymentList = [
 {
   data: [
     {txConfirmedAt: '2017-09-11', btcRevenue: '1.12345678'},
     {txConfirmedAt: '2017-09-08', btcRevenue: '1.12345678'},
   ],
   title: "9月",
   total: "12.12345678"
 },
 {
   data: [
     {txConfirmedAt: '2017-08-11', btcRevenue: '1.12345678'},
   ],
   title: "8月",
   total: "12.12345678"
 },
 ];
 */
// dateTitle ===> data中对比的属性
function dataStructure(dataArr) {
  let hash = {};
  let i = 0;
  let res = [];
  dataArr.forEach(function (item) {
    let name = item.dateTitle;
    hash[name] ? res[hash[name] - 1].data.push(item) : hash[name] = ++i && res.push({
      data: [item],
      title: name,
      total: 0
    })
  });
  return res;
}

/**
 * 比特币转换成人民币 b==> btc , rmb==> 当前一个btc的价格 分别截取小数点前和小数点后
 */
function btcVsRmb(b, rmb) {
  let cny, cnyObj = {};
  if(b){
    cny = (Number(b) * Number(rmb)).toFixed(2);
    cnyObj.dotRight = cny.slice(cny.length-3);
    cnyObj.dotLeft = cny.slice(0, cny.length-3);
    return cnyObj;
  }else {
    cnyObj.dotRight = .00;
    cnyObj.dotLeft = 0;
  }
}

/**
 * 比特币转换成人民币
 */
function btcExRmb(b, rmb) {
  if(b){
    return (Number(b) * Number(rmb)).toFixed(2)
  }else{
    return "N/A"
  }
}


/**
 * 聪转换比特币(聪)
 */

let Format = {};

(function (Format) {
  const SATOSHI = [0, "sat."];
  const MICRO_BTC = [2, "μBTC"];
  const MILLI_BTC = [5, "mBTC"];
  const CENTI_BTC = [6, "cBTC"];
  const BTC = [8, 'BTC'];

  const UNIT = [SATOSHI, MICRO_BTC, MILLI_BTC, CENTI_BTC, BTC];
  const UNIT_ENUM = {
    SATOSHI: 0,
    MICRO_BTC: 1,
    MILLI_BTC: 2,
    CENTI_BTC: 3,
    BTC: 4
  };
  Format.UNIT = UNIT_ENUM;

  const ERR_UNIT = "Error: Illegal unit !";
  const ERR_VALUE = "Error: Illegal value !";

  const SATOSHI_REG = (/^[1-9][0-9]{0,14}$|^[1][0-9]{15}$|^[2][0][0-9]{14}$|^210{14}$|^0$/);

  //简单验证单位参数 unit 是否合法
  function validate_unit(unit) {
    let len = UNIT.length;
    while (len--) {
      if (unit === len) {
        return true;
      }
    }
    throw ERR_UNIT;
  }

  /**
   * 从"sat."转换为"BTC"的便捷方法
   * @param sth "sat."单位的比特币数值或数值字符串
   * @returns {string} 返回"BTC"单位的数值字符串
   */
  function satoshi2btc(sth) {
    return fromSatoshi(sth, UNIT_ENUM.BTC);
  }

  Format.satoshi2btc = satoshi2btc;

  /***
   * 从"BTC"转换为"sat."的便捷方法
   * @param btc  "BTC"单位的比特币数值或数值字符串
   * @returns {string} 返回"sat."单位的数值字符串
   */
  function btc2satoshi(btc) {
    return toSatoshi(btc, UNIT_ENUM.BTC);
  }

  Format.btc2satoshi = btc2satoshi;


  /***
   * 把数值转换为纯阿拉伯数字表示的字符串
   * 主要目的是解决number的toString方法超出一定范围的值自动用科学计数法表示的问题 如0.0000001会变成1e-7
   * @param val 任意十进制数值，支持科学计数法
   * @returns {string} 返回转换后的纯阿拉伯数字的字符串
   */
  function toNumStr(val) {
    let vtype = typeof val;
    if (vtype === 'number' || vtype === 'string') {
      let s = val.toString();
      s = s.replace(/^(\d+\.*\d*)([eE])([\+\-]*)(\d{1,2})$/, function (all, v1, v2, v3, v4) {
        let pow = parseInt(v4),
          arr = v1.split('.'),
          bs = arr[0],
          flt = arr[1] || '';
        if (v3 === '-') {
          while (pow && bs.length) {
            pow--;
            flt = bs.charAt(bs.length - 1) + flt;
            bs = bs.substr(0, bs.length - 1);
          }
          bs = bs || '0';
          while (pow--) {
            flt = '0' + flt;
          }
          flt = flt.replace(/0+$/, '');
          return bs + (flt === '' ? '' : '.' + flt);
        } else {
          while (pow && flt.length) {
            pow--;
            bs += flt.charAt(0);
            flt = flt.substr(1, flt.length - 1);
          }
          while (pow--) {
            bs += '0';
          }
          return bs + (flt === '' ? '' : '.' + flt);
        }
      });
      if ((/^[0-9]+$|^[0-9]+\.[0-9]+$/).test(s)) {
        return s;
      }
    }
    throw ERR_VALUE;
  }

  Format.toNumStr = toNumStr;


  /***
   * 通用的单位转换方法
   * @param val   当前单位下的数值
   * @param sunit 当前单位
   * @param tunit 目标单位
   * @returns {string} 返回转换后的数值的纯阿拉伯数字字符串形式
   */
  function convertUnit(val, sunit, tunit) {
    if (sunit !== UNIT_ENUM.SATOSHI) {
      val = Format.toSatoshi(val, sunit);
    }
    return Format.fromSatoshi(val, tunit);
  }

  Format.convertUnit = convertUnit;


  /***
   * 从 "sat."的数值转换为任意单位
   * @param val  "sat."单位的比特币数值
   * @param unit 目标单位
   * @returns {string} 返回转换后的数值的纯阿拉伯数字字符串形式
   */
  function fromSatoshi(val, unit) {
    validate_unit(unit);
    let s = toNumStr(val);
    if (SATOSHI_REG.test(s)) {
      if (unit === UNIT_ENUM.SATOSHI) {
        return s;
      }

      let sz = UNIT[unit][0]; //进率

      let flt = '',
        pre = '0',
        len = s.length,
        ch;
      //由于求值顺序，len<0 后，sz不再递减
      while (len-- && sz--) {
        ch = s.charAt(len);
        if (ch !== 0) {
          flt = ch + flt;
        }
      }
      if (flt !== '' && sz > -1) {
        while (sz--) {
          flt = '0' + flt;
        }
      }
      flt = flt.replace(/0+$/, '');

      if (len > -1) {
        pre = s.substr(0, ++len);
      }
      return pre + (flt !== '' ? ('.' + flt) : '');
    }
    throw ERR_VALUE;
  }

  Format.fromSatoshi = fromSatoshi;


  /***
   * 从任意单位转换为"sat."单位
   * @param val  当前单位表示的数值
   * @param unit 当前单位
   * @returns {string} 返回转换后的数值的纯阿拉伯数字字符串形式
   */
  function toSatoshi(val, unit) {
    validate_unit(unit);
    let num_str = toNumStr(val);
    if (unit === UNIT_ENUM.SATOSHI) {
      return num_str;
    }
    let sz = UNIT[unit][0]; //进率
    let arr = num_str.split('.'),
      bs = arr[0],
      flt = arr[1] || '';
    while (sz && flt.length) {
      sz--;
      bs += flt.charAt(0);
      flt = flt.substr(1, flt.length - 1);
    }
    while (sz--) {
      bs += '0';
    }
    bs = bs.replace(/^0+/, '');
    let s = bs + (flt === '' ? '' : '.' + flt);
    if (SATOSHI_REG.test(s)) {
      return s;
    }
    throw ERR_VALUE;
  }

  Format.toSatoshi = toSatoshi;
})(Format);


module.exports = {
  formatDateTime: formatDateTime,
  formatSeconds: formatSeconds,
  formatDayHours: formatDayHours,
  formatDateDay: formatDateDay,
  diffFun: diff,
  diffExt: diffExt,
  CheckedPhone: checkedPhone,
  CheckedEmail: checkedEmail,
  speedChange: speedChange,
  checkedBtcAddress: checkedBtcAddress,
  pointsToYuan: pointsToYuan,
  satoBtc: Format.satoshi2btc,
  powerKWh: powerKWh,
  ServiceFeePercent: serviceFeePercent,
  dayGains: dayGains,
  absFloorNumber: absFloorNumber,
  addPickerDate: addPickerDate,
  rem: rem,
  findStr: findStr,
  dataStructure: dataStructure,
  btcVsRmb: btcVsRmb,
  btcExRmb: btcExRmb
};