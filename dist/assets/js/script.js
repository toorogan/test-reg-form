"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Form =
/*#__PURE__*/
function () {
  function Form() {
    _classCallCheck(this, Form);

    this.reg = document.getElementById('form-reg');
    this.auth = document.getElementById('form-auth');
    this.tabReg = document.querySelector('.modal-tabs__item.reg');
    this.tabAuth = document.querySelector('.modal-tabs__item.auth');

    if (!this.reg || !this.auth || !this.tabReg || !this.tabAuth) {
      return;
    }

    this._initTabs();
  }

  _createClass(Form, [{
    key: "_initTabs",
    value: function _initTabs() {
      var _this = this;

      this.tabReg.addEventListener('click', function () {
        _this._switchForm('reg');
      });
      this.tabAuth.addEventListener('click', function () {
        _this._switchForm('auth');
      });
    }
  }, {
    key: "_clearFormChoice",
    value: function _clearFormChoice() {
      this.tabAuth.classList.remove('active');
    }
  }, {
    key: "_switchForm",
    value: function _switchForm(form) {
      switch (form) {
        case 'auth':
          this.reg.classList.remove('active');
          this.tabReg.classList.remove('active');
          this.auth.classList.add('active');
          this.tabAuth.classList.add('active');
          break;

        case 'reg':
          this.tabAuth.classList.remove('active');
          this.auth.classList.remove('active');
          this.reg.classList.add('active');
          this.tabReg.classList.add('active');
          break;
      }
    }
  }]);

  return Form;
}();

var modalForms = new Form();