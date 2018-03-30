/**
 * theme 主体颜色
 * @type {string}
 */
import {theme, sceneStart, sceneEnd} from '../res/color.json';

let ColorStore = {
  themeColor: theme,
  startColor: sceneStart,
  endColor: sceneEnd
};

export default ColorStore