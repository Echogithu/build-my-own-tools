/**
 * 判断是否为空对象
 * @param  obj
 * @return {Boolean}
 */
function isEmptyObject(obj) {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj))
    return false
  return !Object.keys(obj).length;
}


export default isEmptyObject;