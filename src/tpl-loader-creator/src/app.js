import tpl from "./info.tpl";

const oApp = document.querySelector("#app");

const info = {
  name: "Echo",
  age: 27,
  hobby: "羽毛球",
};

// console.log(info);

oApp.innerHTML = tpl(info);
