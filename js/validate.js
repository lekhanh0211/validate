// Đối tuowngng validator
function Validator(options) {
  function validate(inputElement, rule) {
    var errMessage = rule.test(inputElement.value);
    var errorElement =
      inputElement.parentElement.querySelector(".form-message");
    if (errMessage) {
      errorElement.innerText = errMessage;
      inputElement.parentElement.classList.add("invalid");
    } else {
      errorElement.innerText = "";
      inputElement.parentElement.classList.remove("invalid");
    }
  }

  var formElement = document.querySelector(options.form);
  if (formElement) {
    options.rules.forEach(function (rule) {
      var inputElement = formElement.querySelector(rule.selector);

      if (inputElement) {
        // Xử lí blur khỏi input
        inputElement.onblur = function () {
          validate(inputElement, rule);
        };
        // Xử lí nhập vào input
        inputElement.oninput = function (){
            console.log(inputElement.value)
        }
      }
    });
  }
}

//Định nghĩa các rule
Validator.isRequired = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      return value.trim() ? undefined : "Trường này không được bỏ trống!";
    },
  };
};
Validator.isEmail = function (selector) {
  return {
    selector: selector,
    test: function (value) {
        var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return regex.test(value) ? undefined :"Trường này phải là emai";
    },
  };
};
