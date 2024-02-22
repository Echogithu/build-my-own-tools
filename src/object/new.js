/**
 * 实现 new
 * @returns 
 */
function ObjectFactory() {
  let obj = new Object();
  Constructor = [].shift.call(arguments);
  obj.__proto__ = Constructor.prototype;
  let res = Constructor.apply(obj, arguments);
  return typeof res === "object" ? res : obj;
}

function Person(name) {
  this.name = name;
}

let p1 = new Person("Echo");
console.log(p1.name); // "Echo"

let p2 = ObjectFactory(Person, "Echo1");
console.log(p2.name);
