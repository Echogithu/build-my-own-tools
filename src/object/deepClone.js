/**
 * 深拷贝
 * @param {*} origin 原对象
 * @param {*} target 拷贝对象
 * @returns 
 */
function deepClone(origin, target) {
  if (typeof target !== "object") return origin;

  let tar = target || {};
  const toStr = Object.prototype.toString;
  const arrayType = '[object Array]';

  for (let key in origin) {
    if (origin.hasOwnProperty(key)) {
      if (typeof origin[key] === 'object' && origin[key] !== null) {
        tar[key] = toStr.call(origin[key]) === arrayType ? [] : {};
        deepClone(origin[key], tar[key]);
      } else {
        tar[key] = origin[key];
      }
    }
  }

  return tar;
}

export default deepClone;