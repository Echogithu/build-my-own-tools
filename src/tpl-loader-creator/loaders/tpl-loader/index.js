const { tplReplace } = require("../utils.js");
const { getOptions } = require("loader-utils");

function tplLoader(source) {
  console.log("source", source);
  // 去除空格
  source = source.replace(/\s+/g, "");
  const { log } = getOptions(this);

  // 日志打印
  const _log = log
    ? `console.log('compiled the file which is from ${this.resourcePath}')`
    : "";

  // 返回出字符串被Babel-loader转成js函数执行
  // oApp.innerHTML = tpl(info);
  return `
    export default (options) => {
      ${tplReplace.toString()}
      ${_log.toString()}
      return tplReplace('${source}', options);
    }
  `;
}

module.exports = tplLoader;
