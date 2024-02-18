function tplReplace(template, replaceObject) {
  return template.replace(/\{\{(.*?)\}\}/g, function (node, key) {
    // console.log("node", node, key);
    return replaceObject[key];
  });
}

module.exports = { tplReplace };
