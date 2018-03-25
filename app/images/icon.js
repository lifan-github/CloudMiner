/**
 * 此文件主要是针对文字图标的统一管理
 */
import React from 'react';
import {Text, StyleSheet} from 'react-native';

//默认样式添加
const styles = StyleSheet.create({
  iconStyle: {
    fontFamily:'cloud'
  }
});

const icons = {
  arrowleft: <Text style={styles.iconStyle}>&#xe64a;</Text>,
  arrowdown: <Text style={styles.iconStyle}>&#xe64b;</Text>,
  arrblack: <Text style={styles.iconStyle}>&#xe64c;</Text>,
  arrowright: <Text style={styles.iconStyle}>&#xe64d;</Text>,
  btc: <Text style={styles.iconStyle}>&#xe64e;</Text>,
  benifits: <Text style={styles.iconStyle}>&#xe64f;</Text>,
  balance: <Text style={styles.iconStyle}>&#xe650;</Text>,
  exchange: <Text style={styles.iconStyle}>&#xe651;</Text>,
  management: <Text style={styles.iconStyle}>&#xe652;</Text>,
  miners: <Text style={styles.iconStyle}>&#xe653;</Text>,
  arrowup: <Text style={styles.iconStyle}>&#xe654;</Text>,
  home2: <Text style={styles.iconStyle}>&#xe655;</Text>,
  home: <Text style={styles.iconStyle}>&#xe656;</Text>,
  personal: <Text style={styles.iconStyle}>&#xe657;</Text>,
  notice: <Text style={styles.iconStyle}>&#xe658;</Text>,
  miners2: <Text style={styles.iconStyle}>&#xe659;</Text>,
  personal2: <Text style={styles.iconStyle}>&#xe65a;</Text>,
  payment: <Text style={styles.iconStyle}>&#xe65b;</Text>,
  orders: <Text style={styles.iconStyle}>&#xe65c;</Text>,
  power: <Text style={styles.iconStyle}>&#xe65d;</Text>,
  right: <Text style={styles.iconStyle}>&#xe65e;</Text>,
  rmb: <Text style={styles.iconStyle}>&#xe65f;</Text>,
  records: <Text style={styles.iconStyle}>&#xe660;</Text>,
  sharing: <Text style={styles.iconStyle}>&#xe661;</Text>,
  pow: <Text style={styles.iconStyle}>&#xe662;</Text>,
  wrong: <Text style={styles.iconStyle}>&#xe663;</Text>,
  settings: <Text style={styles.iconStyle}>&#xe664;</Text>,
  minus: <Text style={styles.iconStyle}>&#xe665;</Text>,
  workers: <Text style={styles.iconStyle}>&#xe666;</Text>,
  add: <Text style={styles.iconStyle}>&#xe667;</Text>,
  benifits_month: <Text style={styles.iconStyle}>&#xe668;</Text>,
  clear: <Text style={styles.iconStyle}>&#xe669;</Text>,
  deduct: <Text style={styles.iconStyle}>&#xe66a;</Text>,
  settled: <Text style={styles.iconStyle}>&#xe66b;</Text>,
  settling: <Text style={styles.iconStyle}>&#xe66c;</Text>,
  unsettle: <Text style={styles.iconStyle}>&#xe66d;</Text>,
  phone: <Text style={styles.iconStyle}>&#xe66e;</Text>,
  email: <Text style={styles.iconStyle}>&#xe66f;</Text>,
};


export default icons;