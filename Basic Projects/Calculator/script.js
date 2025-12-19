let string = "";
let buttons = document.querySelectorAll(".button");
let display = document.getElementById("display");

Array.from(buttons).forEach((button) => {
  button.addEventListener("click", (e) => {
    let btn = e.target.innerHTML;

    if (btn === "=") {
      try {
        string = eval(string);
        display.value = string;
      } catch {
        display.value = "Error";
        string = "";
      }
    } else if (btn === "AC") {
      string = "";
      display.value = "";
    } else if (btn === "X") {
      string += "*";
      display.value = string;
    } else if (btn === "+/-") {
      if (string !== "") {
        string = String(-eval(string));
        display.value = string;
      }
    } else {
      string += btn;
      display.value = string;
    }
  });
});
