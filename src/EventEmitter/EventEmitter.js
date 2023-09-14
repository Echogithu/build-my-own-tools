/**
 * 发布订阅模式
 * 
 * 实现思路：
 * 创建一个 EventEmitter 类
 * 在该类上创建一个事件中心（Map）
 * on 方法用来把函数 fn 都加到事件中心中（订阅者注册事件到调度中心）
 * emit 方法取到 arguments 里第一个当做 event，根据 event 值去执行对应事件中心中的函数（发布者发布事件到调度中心，调度中心处理代码）
 * off 方法可以根据 event 值取消订阅（取消订阅）
 * once 方法只监听一次，调用完毕后删除缓存函数（订阅一次）
 * 注册一个 newListener 用于监听新的事件订阅
 */

class EventEmitter {
  constructor() {
    // 缓存列表
    this.listener = [];
  }

  // 订阅/监听
  on(eventName, fn) {
    if (!this.listener[eventName]) {
      this.listener[eventName] = [];
    }
    this.listener[eventName].push(fn);
  }

  // 发送/触发
  emit() {
    let eventName = Array.prototype.shift.call(arguments),
      callbacks = this.listener[eventName];

    // 缓存列表中没有对应的fn，返回false
    if (!callbacks) return false;

    for (let i = 0; i < callbacks.length; i++) {
      callbacks[i].apply(this, arguments);
    }
  }

  // 取消订阅
  // 找到事件对应的回调函数，删除对应的回调函数
  off(eventName, fn) {
    let callbacks = this.listener[eventName];

    if (!callbacks) return false;

    if (!fn) {
      // 如果未传入fn，则将缓存列表中对应的fn都清空
      callbacks && (callbacks.length = 0);
    } else {
      // 遍历所对应的fn，判断和那个fn相同，相同则删除
      let cb;
      for (let i = 0; i < callbacks.length; i++) {
        cb = callbacks[i];

        if (cb == fn || cb.fn == fn) {
          callbacks.splice(i, 1);
          break;
        }
      }
    }
  }

  // 只监听一次
  //  1.先注册 2.事件执行后取消订阅
  once(eventName, fn) {
    let one = () => {
      fn.apply(this, arguments);
      this.off(eventName, one);
    }
    one.initialCallback = fn;
    this.on(eventName, one);
  }
}

// // ----------------------------------------------------------------
// // 使用用例
// class SalesOffices extends EventEmitter {
//   constructor() {
//     super();
//   }
// }
// let salesOffices = new SalesOffices();

// const squareOneHundredCb = function (price, squareMeter) {
//   console.log("square100价格:" + price);
//   console.log("square100面积:" + squareMeter);
// }
// salesOffices.on("square100", squareOneHundredCb);
// // 取消订阅
// // salesOffices.off("square100");
// // salesOffices.off("square100", squareOneHundredCb);
// salesOffices.on("square100", squareOneHundredCb);
// // salesOffices.emit("square100", 1000, 100);

// // ----------------------------------------------------------------
// const squareEightyEightCb = function (price, squareMeter) {
//   console.log("square88价格:" + price);
//   console.log("square88面积:" + squareMeter);
// }
// // salesOffices.on("square88", squareEightyEightCb);
// // 只订阅一次
// function once(){
//   console.log("once");
// }
// salesOffices.once("square88", once);
// salesOffices.on("square88", squareEightyEightCb);
// salesOffices.on("square88", squareEightyEightCb);
// salesOffices.emit("square88", 800, 88);
// // salesOffices.emit("square1", 1000, 100);
