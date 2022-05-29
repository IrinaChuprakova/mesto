/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/components/Api.js":
/*!***************************************!*\
  !*** ./src/scripts/components/Api.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Api": () => (/* binding */ Api)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Api = /*#__PURE__*/function () {
  function Api(_ref) {
    var baseUrl = _ref.baseUrl,
        headers = _ref.headers;

    _classCallCheck(this, Api);

    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _createClass(Api, [{
    key: "_checkStatus",
    value: function _checkStatus(res) {
      if (res.ok) {
        return res.json();
      } else {
        Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(res.status, " ").concat(res.statusText));
      }
    }
  }, {
    key: "getInitialCards",
    value: function getInitialCards() {
      var cardsUrl = "".concat(this._baseUrl, "/cards");
      return fetch(cardsUrl, {
        headers: this._headers
      }).then(this._checkStatus);
    }
  }, {
    key: "getUserInfo",
    value: function getUserInfo() {
      var cardsUrl = "".concat(this._baseUrl, "/users/me");
      return fetch(cardsUrl, {
        headers: this._headers
      }).then(this._checkStatus);
    }
  }, {
    key: "sendUserInfo",
    value: function sendUserInfo(name, about) {
      var cardsUrl = "".concat(this._baseUrl, "/users/me");
      return fetch(cardsUrl, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          about: about
        })
      }).then(this._checkStatus);
    }
  }, {
    key: "sendCard",
    value: function sendCard(name, link) {
      var cardsUrl = "".concat(this._baseUrl, "/cards");
      return fetch(cardsUrl, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          link: link
        })
      }).then(this._checkStatus);
    }
  }, {
    key: "removeCard",
    value: function removeCard(cardId) {
      var cardsUrl = "".concat(this._baseUrl, "/cards/").concat(cardId);
      return fetch(cardsUrl, {
        method: 'DELETE',
        headers: this._headers
      }).then(this._checkStatus);
    }
  }, {
    key: "addLike",
    value: function addLike(cardId) {
      var cardsUrl = "".concat(this._baseUrl, "/cards/").concat(cardId, "/likes");
      return fetch(cardsUrl, {
        method: 'PUT',
        headers: this._headers
      }).then(this._checkStatus);
    }
  }, {
    key: "removeLike",
    value: function removeLike(cardId) {
      var cardsUrl = "".concat(this._baseUrl, "/cards/").concat(cardId, "/likes");
      return fetch(cardsUrl, {
        method: 'DELETE',
        headers: this._headers
      }).then(this._checkStatus);
    }
  }, {
    key: "updateAvatar",
    value: function updateAvatar(link) {
      var cardsUrl = "".concat(this._baseUrl, "/users/me/avatar ");
      return fetch(cardsUrl, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: link
        })
      }).then(this._checkStatus);
    }
  }]);

  return Api;
}();

/***/ }),

/***/ "./src/scripts/components/Card.js":
/*!****************************************!*\
  !*** ./src/scripts/components/Card.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Card": () => (/* binding */ Card)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Card = /*#__PURE__*/function () {
  function Card(data, cardsTemplate, handleCardClick, deleteCallback, likeCallback) {
    var _this = this;

    _classCallCheck(this, Card);

    this._deleteCallback = deleteCallback;
    this._likeCallback = likeCallback;
    this._userId = data.userId;
    this._ownerId = data.ownerId;
    this._cardId = data.cardId;
    this._name = data.name;
    this._link = data.link;
    this._isOwner = this._userId === this._ownerId;
    this._likes = data.likes;
    this._cardsTemplate = cardsTemplate;
    this._handleCardClick = handleCardClick;
    this._cardElement = this._cardsTemplate.querySelector(".cards__item").cloneNode(true);
    this._cardTitle = this._cardElement.querySelector(".cards__title");
    this._cardImage = this._cardElement.querySelector(".cards__img");
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._likeCount = this._cardElement.querySelector('.cards__like-count');
    this._likeCount.textContent = this._likes.length;

    if (!this._isOwner) {
      this._cardElement.querySelector(".cards__trash").remove();
    }

    this._trashButton = this._cardElement.querySelector(".cards__trash");
    this._likeButton = this._cardElement.querySelector(".cards__like");

    if (this._likes.some(function (item) {
      return item === _this._userId;
    })) {
      this._likeButton.classList.add("cards__like_active");
    }
  }

  _createClass(Card, [{
    key: "likeCard",
    value: function likeCard() {
      this._likes.push(this._userId);

      this._likeButton.classList.add("cards__like_active");

      this._likeCount.textContent = this._likes.length;
    }
  }, {
    key: "unLikeCard",
    value: function unLikeCard() {
      var _this2 = this;

      this._likes = this._likes.filter(function (like) {
        return like !== _this2._userId;
      });

      this._likeButton.classList.remove("cards__like_active");

      this._likeCount.textContent = this._likes.length;
    }
  }, {
    key: "delete",
    value: function _delete() {
      this._trashButton.closest(".cards__item").remove();
    }
  }, {
    key: "_setEventListeners",
    value: function _setEventListeners() {
      var _this3 = this;

      if (this._isOwner) {
        this._trashButton.addEventListener("click", function () {
          _this3._deleteCallback();
        });
      }

      this._likeButton.addEventListener("click", function () {
        _this3._likeCallback(_this3._likes.some(function (item) {
          return item === _this3._userId;
        }));
      });

      this._cardImage.addEventListener("click", function () {
        _this3._handleCardClick(_this3._name, _this3._link);
      });
    }
  }, {
    key: "create",
    value: function create() {
      this._setEventListeners();

      return this._cardElement;
    }
  }]);

  return Card;
}();

/***/ }),

/***/ "./src/scripts/components/FormValidator.js":
/*!*************************************************!*\
  !*** ./src/scripts/components/FormValidator.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormValidator": () => (/* binding */ FormValidator)
/* harmony export */ });
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FormValidator = /*#__PURE__*/_createClass(function FormValidator(validationSettings, form) {
  var _this = this;

  _classCallCheck(this, FormValidator);

  _defineProperty(this, "_setSubmitButtonState", function (isFormValid, buttonSave, inactiveButtonClass) {
    if (isFormValid) {
      buttonSave.removeAttribute('disabled');
      buttonSave.classList.remove(inactiveButtonClass);
    } else {
      buttonSave.setAttribute('disabled', true);
      buttonSave.classList.add(inactiveButtonClass);
    }
  });

  _defineProperty(this, "_setEventListeners", function () {
    _this._inputs.forEach(function (input) {
      input.addEventListener('input', function () {
        var spanError = input.parentElement.querySelector(".".concat(_this._validationSettings.errorClass));

        if (!input.validity.valid) {
          input.classList.add(_this._validationSettings.inputErrorClass);
          spanError.textContent = input.validationMessage;
        } else {
          input.classList.remove(_this._validationSettings.inputErrorClass);
          spanError.textContent = '';
        }

        var isValid = Array.from(_this._inputs).filter(function (input) {
          return !input.validity.valid;
        }).length === 0;

        _this._setSubmitButtonState(isValid, _this._button, _this._validationSettings.inactiveButtonClass);
      });
    });
  });

  _defineProperty(this, "enableValidation", function () {
    _this._setEventListeners();
  });

  _defineProperty(this, "enableButton", function () {
    _this._setSubmitButtonState(true, _this._button, _this._validationSettings.inactiveButtonClass);
  });

  _defineProperty(this, "clearInputsMessage", function () {
    _this._form.querySelectorAll('input').forEach(function (input) {
      input.classList.remove(_this._validationSettings.inputErrorClass);
      var spanError = input.parentElement.querySelector(".".concat(_this._validationSettings.errorClass));
      spanError.textContent = '';
    });
  });

  _defineProperty(this, "resetValidation", function () {
    _this._form.reset();

    _this.clearInputsMessage();

    _this._setSubmitButtonState(false, _this._button, _this._validationSettings.inactiveButtonClass);
  });

  this._validationSettings = validationSettings;
  this._form = form;
  this._button = this._form.querySelector(this._validationSettings.submitButtonSelector);
  this._inputs = this._form.querySelectorAll(this._validationSettings.inputSelector);
});

/***/ }),

/***/ "./src/scripts/components/Popup.js":
/*!*****************************************!*\
  !*** ./src/scripts/components/Popup.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Popup": () => (/* binding */ Popup)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Popup = /*#__PURE__*/function () {
  function Popup(popupSelector) {
    _classCallCheck(this, Popup);

    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _createClass(Popup, [{
    key: "open",
    value: function open() {
      this._popup.classList.add("popup_opened");

      document.addEventListener("keydown", this._handleEscClose);
    }
  }, {
    key: "close",
    value: function close() {
      this._popup.classList.remove("popup_opened");

      document.removeEventListener("keydown", this._handleEscClose);
    }
  }, {
    key: "_handleEscClose",
    value: function _handleEscClose(evt) {
      if (evt.key === "Escape") {
        if (this._popup === null) {
          return;
        }

        this.close();
      }
    }
  }, {
    key: "setEventListeners",
    value: function setEventListeners() {
      var _this = this;

      this._popup.addEventListener("click", function (evt) {
        if (evt.target.classList.contains("popup") || evt.target.classList.contains("button_type_close")) {
          _this.close();
        }
      });
    }
  }]);

  return Popup;
}();

/***/ }),

/***/ "./src/scripts/components/PopupWithForm.js":
/*!*************************************************!*\
  !*** ./src/scripts/components/PopupWithForm.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PopupWithForm": () => (/* binding */ PopupWithForm)
/* harmony export */ });
/* harmony import */ var _Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup.js */ "./src/scripts/components/Popup.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


var PopupWithForm = /*#__PURE__*/function (_Popup) {
  _inherits(PopupWithForm, _Popup);

  var _super = _createSuper(PopupWithForm);

  function PopupWithForm(popupSelector, submit) {
    var _this;

    _classCallCheck(this, PopupWithForm);

    _this = _super.call(this, popupSelector);
    _this._submit = submit;
    _this._form = _this._popup.querySelector('.popup__form');
    _this._inputList = _this._form.querySelectorAll('input');
    _this._save = _this._form.querySelector('.popup__save');
    return _this;
  }

  _createClass(PopupWithForm, [{
    key: "_getInputValues",
    value: function _getInputValues() {
      var result = {};

      this._inputList.forEach(function (element) {
        result[element.getAttribute("name")] = element.value;
      });

      return result;
    }
  }, {
    key: "setButtonText",
    value: function setButtonText() {
      this._save.textContent = 'Сохранить';
    }
  }, {
    key: "setEventListeners",
    value: function setEventListeners() {
      var _this2 = this;

      _get(_getPrototypeOf(PopupWithForm.prototype), "setEventListeners", this).call(this);

      this._popup.addEventListener("submit", function (evt) {
        _this2._save.textContent = 'Сохранить...';
        evt.preventDefault();

        var values = _this2._getInputValues();

        _this2._submit(values);
      });
    }
  }, {
    key: "close",
    value: function close() {
      _get(_getPrototypeOf(PopupWithForm.prototype), "close", this).call(this);

      this._form.reset();
    }
  }]);

  return PopupWithForm;
}(_Popup_js__WEBPACK_IMPORTED_MODULE_0__.Popup);

/***/ }),

/***/ "./src/scripts/components/PopupWithImage.js":
/*!**************************************************!*\
  !*** ./src/scripts/components/PopupWithImage.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PopupWithImage": () => (/* binding */ PopupWithImage)
/* harmony export */ });
/* harmony import */ var _Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup.js */ "./src/scripts/components/Popup.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


var PopupWithImage = /*#__PURE__*/function (_Popup) {
  _inherits(PopupWithImage, _Popup);

  var _super = _createSuper(PopupWithImage);

  function PopupWithImage(popupSelector) {
    var _this;

    _classCallCheck(this, PopupWithImage);

    _this = _super.call(this, popupSelector);
    _this._popupImg = document.querySelector('.popup__img');
    _this._popupDescription = document.querySelector('.popup__description');
    return _this;
  }

  _createClass(PopupWithImage, [{
    key: "open",
    value: function open(name, link) {
      this._popupImg.src = link;
      this._popupImg.alt = name;
      this._popupDescription.textContent = name;

      _get(_getPrototypeOf(PopupWithImage.prototype), "open", this).call(this);
    }
  }]);

  return PopupWithImage;
}(_Popup_js__WEBPACK_IMPORTED_MODULE_0__.Popup);

/***/ }),

/***/ "./src/scripts/components/PopupWithSubmit.js":
/*!***************************************************!*\
  !*** ./src/scripts/components/PopupWithSubmit.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PopupWithSubmit": () => (/* binding */ PopupWithSubmit)
/* harmony export */ });
/* harmony import */ var _Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup.js */ "./src/scripts/components/Popup.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


var PopupWithSubmit = /*#__PURE__*/function (_Popup) {
  _inherits(PopupWithSubmit, _Popup);

  var _super = _createSuper(PopupWithSubmit);

  function PopupWithSubmit(popupSelector) {
    var _this;

    _classCallCheck(this, PopupWithSubmit);

    _this = _super.call(this, popupSelector);
    _this._form = _this._popup.querySelector('.popup__form');
    return _this;
  }

  _createClass(PopupWithSubmit, [{
    key: "setCallback",
    value: function setCallback(callback) {
      this._callback = callback;
    }
  }, {
    key: "setEventListeners",
    value: function setEventListeners() {
      var _this2 = this;

      _get(_getPrototypeOf(PopupWithSubmit.prototype), "setEventListeners", this).call(this);

      this._popup.addEventListener('submit', function (evt) {
        evt.preventDefault();

        _this2._callback();
      });
    }
  }]);

  return PopupWithSubmit;
}(_Popup_js__WEBPACK_IMPORTED_MODULE_0__.Popup);

/***/ }),

/***/ "./src/scripts/components/Section.js":
/*!*******************************************!*\
  !*** ./src/scripts/components/Section.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Section": () => (/* binding */ Section)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Section = /*#__PURE__*/function () {
  // constructor({ items, renderer }, containerSelector) {
  //   this._items = items;
  //   this._renderer = renderer;
  //   this._containerSelector = document.querySelector(containerSelector);
  // }
  function Section(containerSelector) {
    _classCallCheck(this, Section);

    this._containerSelector = document.querySelector(containerSelector);
  }

  _createClass(Section, [{
    key: "addItem",
    value: function addItem(element) {
      this._containerSelector.prepend(element);
    } // renderItems() {
    //   this._items.forEach((item) => {
    //     const element = this._renderer(item);
    //     this.addItem(element);
    //   });
    // }

  }]);

  return Section;
}();

/***/ }),

/***/ "./src/scripts/components/UserInfo.js":
/*!********************************************!*\
  !*** ./src/scripts/components/UserInfo.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserInfo": () => (/* binding */ UserInfo)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var UserInfo = /*#__PURE__*/function () {
  function UserInfo(_ref) {
    var nameSelector = _ref.nameSelector,
        jobSelector = _ref.jobSelector,
        avatar = _ref.avatar;

    _classCallCheck(this, UserInfo);

    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatar);
  }

  _createClass(UserInfo, [{
    key: "getUserInfo",
    value: function getUserInfo() {
      return {
        name: this._name.textContent,
        job: this._job.textContent
      };
    }
  }, {
    key: "setUserInfo",
    value: function setUserInfo(_ref2) {
      var name = _ref2.name,
          job = _ref2.job;
      this._name.textContent = name;
      this._job.textContent = job;
    }
  }, {
    key: "setUserAvatar",
    value: function setUserAvatar(link) {
      this._avatar.src = link;
    }
  }, {
    key: "setUserId",
    value: function setUserId(userId) {
      this._userId = userId;
    }
  }, {
    key: "getUserId",
    value: function getUserId() {
      return this._userId;
    }
  }]);

  return UserInfo;
}();

/***/ }),

/***/ "./src/scripts/utils/constants.js":
/*!****************************************!*\
  !*** ./src/scripts/utils/constants.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cardsTemplate": () => (/* binding */ cardsTemplate),
/* harmony export */   "jobInput": () => (/* binding */ jobInput),
/* harmony export */   "nameInput": () => (/* binding */ nameInput),
/* harmony export */   "pictureEdit": () => (/* binding */ pictureEdit),
/* harmony export */   "profileAdd": () => (/* binding */ profileAdd),
/* harmony export */   "profileEdit": () => (/* binding */ profileEdit),
/* harmony export */   "profilePicture": () => (/* binding */ profilePicture),
/* harmony export */   "validationSettings": () => (/* binding */ validationSettings)
/* harmony export */ });
var profileEdit = document.querySelector('.profile__edit');
var profileAdd = document.querySelector('.profile__add');
var pictureEdit = document.querySelector('.profile__edit-picture');
var profilePicture = document.querySelector('.profile__picture');
var cardsTemplate = document.querySelector('#cards__template').content; // Находим формы редактирования профиля и добавления карточки в DOM

var formEditProfile = document.forms.formEditProfile; // Находим поля форм редактирования профиля и добавления карточки в DOM

var nameInput = formEditProfile.elements.firstname;
var jobInput = formEditProfile.elements.job;
var validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_type_error',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error'
};


/***/ }),

/***/ "./src/pages/index.css":
/*!*****************************!*\
  !*** ./src/pages/index.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!****************************!*\
  !*** ./src/pages/index.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pages_index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pages/index.css */ "./src/pages/index.css");
/* harmony import */ var _scripts_components_Card_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scripts/components/Card.js */ "./src/scripts/components/Card.js");
/* harmony import */ var _scripts_components_FormValidator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../scripts/components/FormValidator.js */ "./src/scripts/components/FormValidator.js");
/* harmony import */ var _scripts_components_Section_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../scripts/components/Section.js */ "./src/scripts/components/Section.js");
/* harmony import */ var _scripts_components_PopupWithImage_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../scripts/components/PopupWithImage.js */ "./src/scripts/components/PopupWithImage.js");
/* harmony import */ var _scripts_components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../scripts/components/PopupWithForm.js */ "./src/scripts/components/PopupWithForm.js");
/* harmony import */ var _scripts_components_UserInfo_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../scripts/components/UserInfo.js */ "./src/scripts/components/UserInfo.js");
/* harmony import */ var _scripts_components_Api_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../scripts/components/Api.js */ "./src/scripts/components/Api.js");
/* harmony import */ var _scripts_components_PopupWithSubmit__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../scripts/components/PopupWithSubmit */ "./src/scripts/components/PopupWithSubmit.js");
/* harmony import */ var _scripts_utils_constants_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../scripts/utils/constants.js */ "./src/scripts/utils/constants.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }











var api = new _scripts_components_Api_js__WEBPACK_IMPORTED_MODULE_7__.Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-41',
  headers: {
    authorization: '051caa04-d7b9-48a1-8ee1-a0f28ba759f9',
    'Content-Type': 'application/json'
  }
});
var imgOpenPopup = new _scripts_components_PopupWithImage_js__WEBPACK_IMPORTED_MODULE_4__.PopupWithImage('.popup_type_open-img');
var popupConfirm = new _scripts_components_PopupWithSubmit__WEBPACK_IMPORTED_MODULE_8__.PopupWithSubmit('.popup_type_confirm');
popupConfirm.setEventListeners();

function createCard(_ref) {
  var name = _ref.name,
      link = _ref.link,
      likes = _ref.likes,
      ownerId = _ref.ownerId,
      userId = _ref.userId,
      cardId = _ref.cardId;
  var data = {
    name: name,
    link: link,
    likes: likes,
    userId: userId,
    ownerId: ownerId,
    cardId: cardId
  };
  var card = new _scripts_components_Card_js__WEBPACK_IMPORTED_MODULE_1__.Card(data, _scripts_utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.cardsTemplate, function (name, link) {
    imgOpenPopup.open(name, link);
  }, function () {
    popupConfirm.setCallback(function () {
      api.removeCard(cardId).then(function () {
        card.delete();
        popupConfirm.close();
      }).catch(function (error) {
        return console.log(error);
      });
    });
    popupConfirm.open();
  }, function (isLiked) {
    if (!isLiked) {
      api.addLike(cardId).then(function () {
        return card.likeCard();
      }).catch(function (error) {
        return console.log(error);
      });
      return;
    }

    api.removeLike(cardId).then(function () {
      return card.unLikeCard();
    }).catch(function (error) {
      return console.log(error);
    });
  });
  return card.create();
}

var section = new _scripts_components_Section_js__WEBPACK_IMPORTED_MODULE_3__.Section('.cards__list');
var userInfo = new _scripts_components_UserInfo_js__WEBPACK_IMPORTED_MODULE_6__.UserInfo({
  nameSelector: '.profile__title',
  jobSelector: '.profile__description',
  avatar: '.profile__picture'
}); // api.getInitialCards()
//   .then(cards => )
//   .catch(error => console.log(error));
// api.getUserInfo()
// .then(userData => { 
//   userInfo.setUserInfo({name: userData.name, job: userData.about});
//   userInfo.setUserAvatar(userData.avatar);
//   userInfo.setUserId(userData._id);
// })
// .catch(error => console.log(error));

var validators = {};
document.querySelectorAll(_scripts_utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.validationSettings.formSelector).forEach(function (form) {
  var validator = new _scripts_components_FormValidator_js__WEBPACK_IMPORTED_MODULE_2__.FormValidator(_scripts_utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.validationSettings, form);
  validator.enableValidation();
  validators[form.getAttribute('name')] = validator;
});
var popupEdit = new _scripts_components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_5__.PopupWithForm('.popup_type_edit', function (values) {
  api.sendUserInfo(values['firstname'], values['job']).then(function (userData) {
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about
    });
    userInfo.setUserAvatar(userData.avatar);
    popupEdit.close();
  }).catch(function (error) {
    return console.log(error);
  }).finally(function () {
    return popupEdit.setButtonText();
  });
});
var popupAddPlace = new _scripts_components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_5__.PopupWithForm('.popup_type_add-place', function (values) {
  validators.formAddPlace.resetValidation();
  api.sendCard(values['place'], values['link']).then(function (cardData) {
    var cardElement = createCard({
      name: cardData.name,
      link: cardData.link,
      likes: cardData.likes.map(function (like) {
        return like._id;
      }),
      ownerId: cardData.owner._id,
      userId: userInfo.getUserId(),
      cardId: cardData._id
    });
    popupAddPlace.close();
    section.addItem(cardElement);
  }).catch(function (error) {
    return console.log(error);
  }).finally(function () {
    return popupAddPlace.setButtonText();
  });
});
var popups = [popupEdit, popupAddPlace, imgOpenPopup];
popups.forEach(function (popup) {
  popup.setEventListeners();
});
_scripts_utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.profileEdit.addEventListener('click', function () {
  validators.formEditProfile.clearInputsMessage();
  validators.formEditProfile.enableButton();
  var userData = userInfo.getUserInfo();
  _scripts_utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.nameInput.value = userData.name;
  _scripts_utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.jobInput.value = userData.job;
  popupEdit.open();
});
_scripts_utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.profileAdd.addEventListener('click', function () {
  validators.formAddPlace.resetValidation();
  popupAddPlace.open();
});
var popupEditAvatar = new _scripts_components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_5__.PopupWithForm('.popup_type_edit-avatar', function (values) {
  api.updateAvatar(values['link']).then(function (userData) {
    userInfo.setUserAvatar(userData.avatar);
    popupEditAvatar.close();
  }).catch(function (error) {
    return console.log(error);
  }).finally(function () {
    return popupEditAvatar.setButtonText();
  });
});
popupEditAvatar.setEventListeners();
_scripts_utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.pictureEdit.addEventListener('click', function () {
  validators.formEditAvatar.resetValidation();
  popupEditAvatar.open();
});
Promise.all([api.getUserInfo(), api.getInitialCards()]).then(function (_ref2) {
  var _ref3 = _slicedToArray(_ref2, 2),
      userData = _ref3[0],
      cards = _ref3[1];

  userInfo.setUserInfo({
    name: userData.name,
    job: userData.about
  });
  userInfo.setUserAvatar(userData.avatar);
  userInfo.setUserId(userData._id);
  cards.reverse().forEach(function (card) {
    var element = createCard({
      name: card.name,
      link: card.link,
      likes: card.likes.map(function (like) {
        return like._id;
      }),
      ownerId: card.owner._id,
      userId: userInfo.getUserId(),
      cardId: card._id
    });
    section.addItem(element);
  });
}).catch(function (error) {
  return console.log(error);
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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bEgsS0FBTCxDQUFXbUosR0FBWCxDQUFlLFVBQUE3SCxJQUFJO1FBQUEsT0FBSUEsSUFBSSxDQUFDOEgsR0FBVDtNQUFBLENBQW5CLENBSGtCO01BSXpCMUosT0FBTyxFQUFFd0gsSUFBSSxDQUFDbUMsS0FBTCxDQUFXRCxHQUpLO01BS3pCNUosTUFBTSxFQUFFMEksUUFBUSxDQUFDb0IsU0FBVCxFQUxpQjtNQU16QnpLLE1BQU0sRUFBRXFJLElBQUksQ0FBQ2tDO0lBTlksQ0FBRCxDQUExQjtJQVFBbkIsT0FBTyxDQUFDc0IsT0FBUixDQUFnQjdFLE9BQWhCO0VBQ0QsQ0FWRDtBQVdELENBaEJILEVBaUJHNkMsS0FqQkgsQ0FpQlMsVUFBQUMsS0FBSztFQUFBLE9BQUlDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZRixLQUFaLENBQUo7QUFBQSxDQWpCZCxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWVzdG8vLi9zcmMvc2NyaXB0cy9jb21wb25lbnRzL0FwaS5qcyIsIndlYnBhY2s6Ly9tZXN0by8uL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvQ2FyZC5qcyIsIndlYnBhY2s6Ly9tZXN0by8uL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvRm9ybVZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly9tZXN0by8uL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvUG9wdXAuanMiLCJ3ZWJwYWNrOi8vbWVzdG8vLi9zcmMvc2NyaXB0cy9jb21wb25lbnRzL1BvcHVwV2l0aEZvcm0uanMiLCJ3ZWJwYWNrOi8vbWVzdG8vLi9zcmMvc2NyaXB0cy9jb21wb25lbnRzL1BvcHVwV2l0aEltYWdlLmpzIiwid2VicGFjazovL21lc3RvLy4vc3JjL3NjcmlwdHMvY29tcG9uZW50cy9Qb3B1cFdpdGhTdWJtaXQuanMiLCJ3ZWJwYWNrOi8vbWVzdG8vLi9zcmMvc2NyaXB0cy9jb21wb25lbnRzL1NlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vbWVzdG8vLi9zcmMvc2NyaXB0cy9jb21wb25lbnRzL1VzZXJJbmZvLmpzIiwid2VicGFjazovL21lc3RvLy4vc3JjL3NjcmlwdHMvdXRpbHMvY29uc3RhbnRzLmpzIiwid2VicGFjazovL21lc3RvLy4vc3JjL3BhZ2VzL2luZGV4LmNzcyIsIndlYnBhY2s6Ly9tZXN0by93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9tZXN0by93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbWVzdG8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9tZXN0by93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21lc3RvLy4vc3JjL3BhZ2VzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBBcGkge1xuICAgIGNvbnN0cnVjdG9yKHtiYXNlVXJsLGhlYWRlcnN9KSB7XG4gICAgICB0aGlzLl9iYXNlVXJsID0gYmFzZVVybDtcbiAgICAgIHRoaXMuX2hlYWRlcnMgPSBoZWFkZXJzO1xuICAgIH1cblxuICAgIF9jaGVja1N0YXR1cyhyZXMpe1xuICAgICAgaWYgKHJlcy5vayl7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgfVxuICAgICAgZWxzZXtcbiAgICAgICAgUHJvbWlzZS5yZWplY3QoYNCe0YjQuNCx0LrQsDogJHtyZXMuc3RhdHVzfSAke3Jlcy5zdGF0dXNUZXh0fWApO1xuICAgICAgfVxuICAgIH1cbiAgXG4gICAgZ2V0SW5pdGlhbENhcmRzKCkge1xuICAgICAgY29uc3QgY2FyZHNVcmwgPSBgJHt0aGlzLl9iYXNlVXJsfS9jYXJkc2A7XG4gICAgICByZXR1cm4gZmV0Y2goY2FyZHNVcmwse1xuICAgICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzXG4gICAgICB9KVxuICAgICAgLnRoZW4odGhpcy5fY2hlY2tTdGF0dXMpO1xuICAgIH1cblxuICAgIGdldFVzZXJJbmZvKCkge1xuICAgICAgY29uc3QgY2FyZHNVcmwgPSBgJHt0aGlzLl9iYXNlVXJsfS91c2Vycy9tZWA7XG4gICAgICByZXR1cm4gZmV0Y2goY2FyZHNVcmwse1xuICAgICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzXG4gICAgICB9KVxuICAgICAgLnRoZW4odGhpcy5fY2hlY2tTdGF0dXMpO1xuICAgIH1cblxuICAgIHNlbmRVc2VySW5mbyhuYW1lLCBhYm91dCl7XG4gICAgICBjb25zdCBjYXJkc1VybCA9IGAke3RoaXMuX2Jhc2VVcmx9L3VzZXJzL21lYDtcbiAgICAgIHJldHVybiBmZXRjaChjYXJkc1VybCx7XG4gICAgICAgIG1ldGhvZDogJ1BBVENIJyxcbiAgICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVycyxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgYWJvdXQ6IGFib3V0XG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgICAgLnRoZW4odGhpcy5fY2hlY2tTdGF0dXMpO1xuICAgIH1cblxuICAgIHNlbmRDYXJkKG5hbWUsbGluayl7XG4gICAgICBjb25zdCBjYXJkc1VybCA9IGAke3RoaXMuX2Jhc2VVcmx9L2NhcmRzYDtcbiAgICAgIHJldHVybiBmZXRjaChjYXJkc1VybCx7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICBsaW5rOiBsaW5rXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgICAgLnRoZW4odGhpcy5fY2hlY2tTdGF0dXMpO1xuICAgIH1cblxuICAgIHJlbW92ZUNhcmQoY2FyZElkKXtcbiAgICAgIGNvbnN0IGNhcmRzVXJsID0gYCR7dGhpcy5fYmFzZVVybH0vY2FyZHMvJHtjYXJkSWR9YDtcbiAgICAgIHJldHVybiBmZXRjaChjYXJkc1VybCx7XG4gICAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnNcbiAgICAgIH0pXG4gICAgICAudGhlbih0aGlzLl9jaGVja1N0YXR1cyk7XG4gICAgfVxuICAgIFxuICAgIGFkZExpa2UoY2FyZElkKXtcbiAgICAgIGNvbnN0IGNhcmRzVXJsID0gYCR7dGhpcy5fYmFzZVVybH0vY2FyZHMvJHtjYXJkSWR9L2xpa2VzYDtcbiAgICAgIHJldHVybiBmZXRjaChjYXJkc1VybCx7XG4gICAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnNcbiAgICAgIH0pXG4gICAgICAudGhlbih0aGlzLl9jaGVja1N0YXR1cyk7XG4gICAgfVxuXG4gICAgcmVtb3ZlTGlrZShjYXJkSWQpe1xuICAgICAgY29uc3QgY2FyZHNVcmwgPSBgJHt0aGlzLl9iYXNlVXJsfS9jYXJkcy8ke2NhcmRJZH0vbGlrZXNgO1xuICAgICAgcmV0dXJuIGZldGNoKGNhcmRzVXJsLHtcbiAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVyc1xuICAgICAgfSlcbiAgICAgIC50aGVuKHRoaXMuX2NoZWNrU3RhdHVzKTtcbiAgICB9XG5cbiAgICB1cGRhdGVBdmF0YXIobGluayl7XG4gICAgICBjb25zdCBjYXJkc1VybCA9IGAke3RoaXMuX2Jhc2VVcmx9L3VzZXJzL21lL2F2YXRhciBgO1xuICAgICAgcmV0dXJuIGZldGNoKGNhcmRzVXJsLHtcbiAgICAgICAgbWV0aG9kOiAnUEFUQ0gnLFxuICAgICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7YXZhdGFyOmxpbmt9KVxuICAgICAgfSlcbiAgICAgIC50aGVuKHRoaXMuX2NoZWNrU3RhdHVzKTtcbiAgICB9XG4gIH1cbiIsImV4cG9ydCBjbGFzcyBDYXJkIHtcbiAgY29uc3RydWN0b3IoZGF0YSwgY2FyZHNUZW1wbGF0ZSwgaGFuZGxlQ2FyZENsaWNrLCBkZWxldGVDYWxsYmFjaywgbGlrZUNhbGxiYWNrKSB7XG4gICAgdGhpcy5fZGVsZXRlQ2FsbGJhY2sgPSBkZWxldGVDYWxsYmFjaztcbiAgICB0aGlzLl9saWtlQ2FsbGJhY2sgPSBsaWtlQ2FsbGJhY2s7XG4gICAgdGhpcy5fdXNlcklkID0gZGF0YS51c2VySWQ7XG4gICAgdGhpcy5fb3duZXJJZCA9IGRhdGEub3duZXJJZDtcbiAgICB0aGlzLl9jYXJkSWQgPSBkYXRhLmNhcmRJZDtcbiAgICB0aGlzLl9uYW1lID0gZGF0YS5uYW1lO1xuICAgIHRoaXMuX2xpbmsgPSBkYXRhLmxpbms7XG4gICAgdGhpcy5faXNPd25lciA9IHRoaXMuX3VzZXJJZCA9PT0gdGhpcy5fb3duZXJJZDtcbiAgICB0aGlzLl9saWtlcyA9IGRhdGEubGlrZXM7XG4gICAgdGhpcy5fY2FyZHNUZW1wbGF0ZSA9IGNhcmRzVGVtcGxhdGU7XG4gICAgdGhpcy5faGFuZGxlQ2FyZENsaWNrID0gaGFuZGxlQ2FyZENsaWNrO1xuICAgIHRoaXMuX2NhcmRFbGVtZW50ID0gdGhpcy5fY2FyZHNUZW1wbGF0ZS5xdWVyeVNlbGVjdG9yKFwiLmNhcmRzX19pdGVtXCIpLmNsb25lTm9kZSh0cnVlKTtcbiAgICB0aGlzLl9jYXJkVGl0bGUgPSB0aGlzLl9jYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRzX190aXRsZVwiKTtcbiAgICB0aGlzLl9jYXJkSW1hZ2UgPSB0aGlzLl9jYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRzX19pbWdcIik7XG4gICAgdGhpcy5fY2FyZFRpdGxlLnRleHRDb250ZW50ID0gdGhpcy5fbmFtZTtcbiAgICB0aGlzLl9jYXJkSW1hZ2Uuc3JjID0gdGhpcy5fbGluaztcbiAgICB0aGlzLl9jYXJkSW1hZ2UuYWx0ID0gdGhpcy5fbmFtZTtcbiAgICB0aGlzLl9saWtlQ291bnQgPSB0aGlzLl9jYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuY2FyZHNfX2xpa2UtY291bnQnKTtcbiAgICB0aGlzLl9saWtlQ291bnQudGV4dENvbnRlbnQgPSB0aGlzLl9saWtlcy5sZW5ndGg7XG5cbiAgICBpZiAoIXRoaXMuX2lzT3duZXIpe1xuICAgICAgdGhpcy5fY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkc19fdHJhc2hcIikucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5fdHJhc2hCdXR0b24gPSB0aGlzLl9jYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRzX190cmFzaFwiKTtcbiAgICB0aGlzLl9saWtlQnV0dG9uID0gdGhpcy5fY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkc19fbGlrZVwiKTtcblxuICAgIGlmICh0aGlzLl9saWtlcy5zb21lKChpdGVtKSA9PiBpdGVtID09PSB0aGlzLl91c2VySWQpKSB7XG4gICAgICB0aGlzLl9saWtlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJjYXJkc19fbGlrZV9hY3RpdmVcIik7XG4gICAgfVxuICB9XG5cbiAgbGlrZUNhcmQoKSB7XG4gICAgdGhpcy5fbGlrZXMucHVzaCh0aGlzLl91c2VySWQpO1xuICAgIHRoaXMuX2xpa2VCdXR0b24uY2xhc3NMaXN0LmFkZChcImNhcmRzX19saWtlX2FjdGl2ZVwiKTtcbiAgICB0aGlzLl9saWtlQ291bnQudGV4dENvbnRlbnQgPSB0aGlzLl9saWtlcy5sZW5ndGg7XG4gIH1cblxuICB1bkxpa2VDYXJkKCkge1xuICAgIHRoaXMuX2xpa2VzID0gdGhpcy5fbGlrZXMuZmlsdGVyKGxpa2UgPT4gbGlrZSAhPT0gdGhpcy5fdXNlcklkKTtcbiAgICB0aGlzLl9saWtlQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJjYXJkc19fbGlrZV9hY3RpdmVcIik7XG4gICAgdGhpcy5fbGlrZUNvdW50LnRleHRDb250ZW50ID0gdGhpcy5fbGlrZXMubGVuZ3RoO1xuICB9XG5cbiAgZGVsZXRlKCkge1xuICAgIHRoaXMuX3RyYXNoQnV0dG9uLmNsb3Nlc3QoXCIuY2FyZHNfX2l0ZW1cIikucmVtb3ZlKCk7XG4gIH1cblxuICBfc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgaWYgKHRoaXMuX2lzT3duZXIpe1xuICAgICAgdGhpcy5fdHJhc2hCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgdGhpcy5fZGVsZXRlQ2FsbGJhY2soKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICB0aGlzLl9saWtlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICB0aGlzLl9saWtlQ2FsbGJhY2sodGhpcy5fbGlrZXMuc29tZSgoaXRlbSkgPT4gaXRlbSA9PT0gdGhpcy5fdXNlcklkKSk7XG4gICAgfSk7XG4gICAgXG4gICAgdGhpcy5fY2FyZEltYWdlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICB0aGlzLl9oYW5kbGVDYXJkQ2xpY2sodGhpcy5fbmFtZSwgdGhpcy5fbGluayk7XG4gICAgfSk7XG4gIH1cblxuICBjcmVhdGUoKSB7XG4gICAgdGhpcy5fc2V0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgICByZXR1cm4gdGhpcy5fY2FyZEVsZW1lbnQ7XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBGb3JtVmFsaWRhdG9yIHtcbiAgY29uc3RydWN0b3IodmFsaWRhdGlvblNldHRpbmdzLCBmb3JtKSB7XG4gICAgdGhpcy5fdmFsaWRhdGlvblNldHRpbmdzID0gdmFsaWRhdGlvblNldHRpbmdzO1xuICAgIHRoaXMuX2Zvcm0gPSBmb3JtO1xuICAgIHRoaXMuX2J1dHRvbiA9IHRoaXMuX2Zvcm0ucXVlcnlTZWxlY3Rvcih0aGlzLl92YWxpZGF0aW9uU2V0dGluZ3Muc3VibWl0QnV0dG9uU2VsZWN0b3IpOyBcbiAgICB0aGlzLl9pbnB1dHMgPSB0aGlzLl9mb3JtLnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5fdmFsaWRhdGlvblNldHRpbmdzLmlucHV0U2VsZWN0b3IpOyBcbiAgfVxuXG4gIF9zZXRTdWJtaXRCdXR0b25TdGF0ZSA9IChpc0Zvcm1WYWxpZCwgYnV0dG9uU2F2ZSwgaW5hY3RpdmVCdXR0b25DbGFzcykgPT4ge1xuICAgIGlmIChpc0Zvcm1WYWxpZCkge1xuICAgICAgYnV0dG9uU2F2ZS5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICAgICBidXR0b25TYXZlLmNsYXNzTGlzdC5yZW1vdmUoaW5hY3RpdmVCdXR0b25DbGFzcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1dHRvblNhdmUuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgYnV0dG9uU2F2ZS5jbGFzc0xpc3QuYWRkKGluYWN0aXZlQnV0dG9uQ2xhc3MpO1xuICAgIH1cbiAgfTtcblxuICBfc2V0RXZlbnRMaXN0ZW5lcnMgPSAoKSA9PiB7XG4gICAgdGhpcy5faW5wdXRzLmZvckVhY2goaW5wdXQgPT4ge1xuICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHNwYW5FcnJvciA9IGlucHV0LnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcihgLiR7dGhpcy5fdmFsaWRhdGlvblNldHRpbmdzLmVycm9yQ2xhc3N9YCk7XG4gICAgICAgIGlmICghaW5wdXQudmFsaWRpdHkudmFsaWQpIHtcbiAgICAgICAgICBpbnB1dC5jbGFzc0xpc3QuYWRkKHRoaXMuX3ZhbGlkYXRpb25TZXR0aW5ncy5pbnB1dEVycm9yQ2xhc3MpO1xuICAgICAgICAgIHNwYW5FcnJvci50ZXh0Q29udGVudCA9IGlucHV0LnZhbGlkYXRpb25NZXNzYWdlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlucHV0LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fdmFsaWRhdGlvblNldHRpbmdzLmlucHV0RXJyb3JDbGFzcyk7XG4gICAgICAgICAgc3BhbkVycm9yLnRleHRDb250ZW50ID0gJyc7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaXNWYWxpZCA9IEFycmF5LmZyb20odGhpcy5faW5wdXRzKS5maWx0ZXIoaW5wdXQgPT4gIWlucHV0LnZhbGlkaXR5LnZhbGlkKS5sZW5ndGggPT09IDA7XG4gICAgICAgIHRoaXMuX3NldFN1Ym1pdEJ1dHRvblN0YXRlKGlzVmFsaWQsIHRoaXMuX2J1dHRvbiwgdGhpcy5fdmFsaWRhdGlvblNldHRpbmdzLmluYWN0aXZlQnV0dG9uQ2xhc3MpO1xuICAgICAgfSlcbiAgICB9KTtcbiAgfVxuXG4gIGVuYWJsZVZhbGlkYXRpb24gPSAoKSA9PiB7XG4gICAgdGhpcy5fc2V0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgfTtcblxuICBlbmFibGVCdXR0b24gPSAoKSA9PiB7XG4gICAgdGhpcy5fc2V0U3VibWl0QnV0dG9uU3RhdGUodHJ1ZSwgdGhpcy5fYnV0dG9uLCB0aGlzLl92YWxpZGF0aW9uU2V0dGluZ3MuaW5hY3RpdmVCdXR0b25DbGFzcyk7XG4gIH1cblxuICBjbGVhcklucHV0c01lc3NhZ2UgPSAoKSA9PiB7XG4gICAgdGhpcy5fZm9ybS5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCcpLmZvckVhY2goaW5wdXQgPT4ge1xuICAgICAgaW5wdXQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl92YWxpZGF0aW9uU2V0dGluZ3MuaW5wdXRFcnJvckNsYXNzKTtcbiAgICAgIGNvbnN0IHNwYW5FcnJvciA9IGlucHV0LnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcihgLiR7dGhpcy5fdmFsaWRhdGlvblNldHRpbmdzLmVycm9yQ2xhc3N9YCk7XG4gICAgICBzcGFuRXJyb3IudGV4dENvbnRlbnQgPSAnJztcbiAgICB9KTtcbiAgfVxuXG4gIHJlc2V0VmFsaWRhdGlvbiA9ICgpID0+IHtcbiAgICB0aGlzLl9mb3JtLnJlc2V0KCk7XG4gICAgdGhpcy5jbGVhcklucHV0c01lc3NhZ2UoKTtcbiAgICB0aGlzLl9zZXRTdWJtaXRCdXR0b25TdGF0ZShmYWxzZSwgdGhpcy5fYnV0dG9uLCB0aGlzLl92YWxpZGF0aW9uU2V0dGluZ3MuaW5hY3RpdmVCdXR0b25DbGFzcyk7XG4gIH1cbn0iLCJleHBvcnQgY2xhc3MgUG9wdXAge1xuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yKSB7XG4gICAgdGhpcy5fcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHBvcHVwU2VsZWN0b3IpO1xuICAgIHRoaXMuX2hhbmRsZUVzY0Nsb3NlID0gdGhpcy5faGFuZGxlRXNjQ2xvc2UuYmluZCh0aGlzKTtcbiAgfVxuXG4gIG9wZW4oKSB7XG4gICAgdGhpcy5fcG9wdXAuY2xhc3NMaXN0LmFkZChcInBvcHVwX29wZW5lZFwiKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCB0aGlzLl9oYW5kbGVFc2NDbG9zZSk7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICB0aGlzLl9wb3B1cC5jbGFzc0xpc3QucmVtb3ZlKFwicG9wdXBfb3BlbmVkXCIpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMuX2hhbmRsZUVzY0Nsb3NlKTtcbiAgfVxuXG4gIF9oYW5kbGVFc2NDbG9zZShldnQpIHtcbiAgICBpZiAoZXZ0LmtleSA9PT0gXCJFc2NhcGVcIikge1xuICAgICAgaWYgKHRoaXMuX3BvcHVwID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICBzZXRFdmVudExpc3RlbmVycygpIHtcbiAgICB0aGlzLl9wb3B1cC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZXZ0ID0+IHtcbiAgICAgIGlmIChcbiAgICAgICAgZXZ0LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJwb3B1cFwiKSB8fFxuICAgICAgICBldnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImJ1dHRvbl90eXBlX2Nsb3NlXCIpXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBQb3B1cCB9IGZyb20gXCIuL1BvcHVwLmpzXCI7XG5cbmV4cG9ydCBjbGFzcyBQb3B1cFdpdGhGb3JtIGV4dGVuZHMgUG9wdXB7XG4gICAgY29uc3RydWN0b3IocG9wdXBTZWxlY3Rvciwgc3VibWl0KXtcbiAgICAgICAgc3VwZXIocG9wdXBTZWxlY3Rvcik7XG4gICAgICAgIHRoaXMuX3N1Ym1pdCA9IHN1Ym1pdDtcbiAgICAgICAgdGhpcy5fZm9ybSA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fZm9ybScpO1xuICAgICAgICB0aGlzLl9pbnB1dExpc3QgPSB0aGlzLl9mb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0Jyk7XG4gICAgICAgIHRoaXMuX3NhdmUgPSB0aGlzLl9mb3JtLnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fc2F2ZScpO1xuICAgIH1cbiAgICBfZ2V0SW5wdXRWYWx1ZXMoKSB7XG4gICAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICAgIHRoaXMuX2lucHV0TGlzdC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICByZXN1bHRbZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJuYW1lXCIpXSA9IGVsZW1lbnQudmFsdWU7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgc2V0QnV0dG9uVGV4dCgpe1xuICAgICAgdGhpcy5fc2F2ZS50ZXh0Q29udGVudCA9ICfQodC+0YXRgNCw0L3QuNGC0YwnOyAgXG4gICAgfVxuXG4gICAgc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICBzdXBlci5zZXRFdmVudExpc3RlbmVycygpO1xuICAgICAgICB0aGlzLl9wb3B1cC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGV2dCA9PiB7XG4gICAgICAgICAgdGhpcy5fc2F2ZS50ZXh0Q29udGVudCA9ICfQodC+0YXRgNCw0L3QuNGC0YwuLi4nXG4gICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgY29uc3QgdmFsdWVzID0gdGhpcy5fZ2V0SW5wdXRWYWx1ZXMoKTtcbiAgICAgICAgICB0aGlzLl9zdWJtaXQodmFsdWVzKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGNsb3NlKCkge1xuICAgICAgICBzdXBlci5jbG9zZSgpO1xuICAgICAgICB0aGlzLl9mb3JtLnJlc2V0KCk7XG4gICAgICB9XG59XG4gIFxuICAiLCJpbXBvcnQgeyBQb3B1cCB9IGZyb20gXCIuL1BvcHVwLmpzXCI7XG5cbmV4cG9ydCBjbGFzcyBQb3B1cFdpdGhJbWFnZSBleHRlbmRzIFBvcHVwe1xuICAgIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3Ipe1xuICAgICAgICBzdXBlcihwb3B1cFNlbGVjdG9yKTtcbiAgICAgICAgdGhpcy5fcG9wdXBJbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX2ltZycpO1xuICAgICAgICB0aGlzLl9wb3B1cERlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwX19kZXNjcmlwdGlvbicpXG4gICAgfVxuICAgIFxuICAgIG9wZW4obmFtZSxsaW5rKSB7XG4gICAgICB0aGlzLl9wb3B1cEltZy5zcmMgPSBsaW5rO1xuICAgICAgdGhpcy5fcG9wdXBJbWcuYWx0ID0gbmFtZTtcbiAgICAgIHRoaXMuX3BvcHVwRGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBuYW1lO1xuICAgICAgc3VwZXIub3BlbigpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBQb3B1cCB9IGZyb20gXCIuL1BvcHVwLmpzXCI7XG5cbmV4cG9ydCBjbGFzcyBQb3B1cFdpdGhTdWJtaXQgZXh0ZW5kcyBQb3B1cHtcbiAgICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yKXtcbiAgICAgICAgc3VwZXIocG9wdXBTZWxlY3Rvcik7XG4gICAgICAgIHRoaXMuX2Zvcm0gPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX2Zvcm0nKTtcbiAgICB9XG5cbiAgICBzZXRDYWxsYmFjayhjYWxsYmFjaykge1xuICAgICAgICB0aGlzLl9jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgIH1cblxuICAgIHNldEV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgICBzdXBlci5zZXRFdmVudExpc3RlbmVycygpO1xuICAgICAgICB0aGlzLl9wb3B1cC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXZ0KSA9PiB7XG4gICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMuX2NhbGxiYWNrKCk7XG4gICAgICAgIH0pXG4gICAgfVxufSIsImV4cG9ydCBjbGFzcyBTZWN0aW9uIHtcbiAgLy8gY29uc3RydWN0b3IoeyBpdGVtcywgcmVuZGVyZXIgfSwgY29udGFpbmVyU2VsZWN0b3IpIHtcbiAgLy8gICB0aGlzLl9pdGVtcyA9IGl0ZW1zO1xuICAvLyAgIHRoaXMuX3JlbmRlcmVyID0gcmVuZGVyZXI7XG4gIC8vICAgdGhpcy5fY29udGFpbmVyU2VsZWN0b3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbnRhaW5lclNlbGVjdG9yKTtcbiAgLy8gfVxuICBjb25zdHJ1Y3Rvcihjb250YWluZXJTZWxlY3Rvcikge1xuICAgIHRoaXMuX2NvbnRhaW5lclNlbGVjdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb250YWluZXJTZWxlY3Rvcik7XG4gIH1cblxuICBhZGRJdGVtKGVsZW1lbnQpIHtcbiAgICB0aGlzLl9jb250YWluZXJTZWxlY3Rvci5wcmVwZW5kKGVsZW1lbnQpO1xuICB9XG4gIFxuICAvLyByZW5kZXJJdGVtcygpIHtcbiAgLy8gICB0aGlzLl9pdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gIC8vICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5fcmVuZGVyZXIoaXRlbSk7XG4gIC8vICAgICB0aGlzLmFkZEl0ZW0oZWxlbWVudCk7XG4gIC8vICAgfSk7XG4gIC8vIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBVc2VySW5mb3tcbiAgICBjb25zdHJ1Y3Rvcih7bmFtZVNlbGVjdG9yLGpvYlNlbGVjdG9yLCBhdmF0YXJ9KXtcbiAgICAgICAgdGhpcy5fbmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobmFtZVNlbGVjdG9yKTtcbiAgICAgICAgdGhpcy5fam9iID0gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioam9iU2VsZWN0b3IpO1xuICAgICAgICB0aGlzLl9hdmF0YXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGF2YXRhcik7XG4gICAgfVxuICAgIGdldFVzZXJJbmZvKCl7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuYW1lOnRoaXMuX25hbWUudGV4dENvbnRlbnQsXG4gICAgICAgICAgICBqb2I6dGhpcy5fam9iLnRleHRDb250ZW50LFxuICAgICAgICB9XG4gICAgfVxuICAgIHNldFVzZXJJbmZvKHtuYW1lLCBqb2J9KXtcbiAgICAgICAgdGhpcy5fbmFtZS50ZXh0Q29udGVudCA9IG5hbWU7XG4gICAgICAgIHRoaXMuX2pvYi50ZXh0Q29udGVudCA9IGpvYjtcbiAgICB9XG5cbiAgICBzZXRVc2VyQXZhdGFyKGxpbmspe1xuICAgICAgICB0aGlzLl9hdmF0YXIuc3JjID0gbGluazsgXG4gICAgfVxuXG4gICAgc2V0VXNlcklkKHVzZXJJZCl7XG4gICAgICAgIHRoaXMuX3VzZXJJZCA9IHVzZXJJZDtcbiAgICB9XG5cbiAgICBnZXRVc2VySWQoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VzZXJJZDtcbiAgICB9XG59IiwiY29uc3QgcHJvZmlsZUVkaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZmlsZV9fZWRpdCcpO1xuY29uc3QgcHJvZmlsZUFkZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9maWxlX19hZGQnKTtcbmNvbnN0IHBpY3R1cmVFZGl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2ZpbGVfX2VkaXQtcGljdHVyZScpO1xuY29uc3QgcHJvZmlsZVBpY3R1cmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZmlsZV9fcGljdHVyZScpO1xuY29uc3QgY2FyZHNUZW1wbGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYXJkc19fdGVtcGxhdGUnKS5jb250ZW50O1xuLy8g0J3QsNGF0L7QtNC40Lwg0YTQvtGA0LzRiyDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPINC/0YDQvtGE0LjQu9GPINC4INC00L7QsdCw0LLQu9C10L3QuNGPINC60LDRgNGC0L7Rh9C60Lgg0LIgRE9NXG5jb25zdCBmb3JtRWRpdFByb2ZpbGUgPSBkb2N1bWVudC5mb3Jtcy5mb3JtRWRpdFByb2ZpbGU7XG4vLyDQndCw0YXQvtC00LjQvCDQv9C+0LvRjyDRhNC+0YDQvCDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPINC/0YDQvtGE0LjQu9GPINC4INC00L7QsdCw0LLQu9C10L3QuNGPINC60LDRgNGC0L7Rh9C60Lgg0LIgRE9NXG5jb25zdCBuYW1lSW5wdXQgPSBmb3JtRWRpdFByb2ZpbGUuZWxlbWVudHMuZmlyc3RuYW1lO1xuY29uc3Qgam9iSW5wdXQgPSBmb3JtRWRpdFByb2ZpbGUuZWxlbWVudHMuam9iO1xuXG5jb25zdCB2YWxpZGF0aW9uU2V0dGluZ3MgPSB7XG4gIGZvcm1TZWxlY3RvcjogJy5wb3B1cF9fZm9ybScsXG4gIGlucHV0U2VsZWN0b3I6ICcucG9wdXBfX2lucHV0JyxcbiAgc3VibWl0QnV0dG9uU2VsZWN0b3I6ICcucG9wdXBfX3NhdmUnLFxuICBpbmFjdGl2ZUJ1dHRvbkNsYXNzOiAncG9wdXBfX3NhdmVfdHlwZV9lcnJvcicsXG4gIGlucHV0RXJyb3JDbGFzczogJ3BvcHVwX19pbnB1dF90eXBlX2Vycm9yJyxcbiAgZXJyb3JDbGFzczogJ3BvcHVwX19lcnJvcidcbn1cbiAgICBcbmV4cG9ydHtwcm9maWxlRWRpdCxwcm9maWxlQWRkLGNhcmRzVGVtcGxhdGUsbmFtZUlucHV0LGpvYklucHV0LHZhbGlkYXRpb25TZXR0aW5ncyxwaWN0dXJlRWRpdCxwcm9maWxlUGljdHVyZX0iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnLi4vcGFnZXMvaW5kZXguY3NzJzsgXG5pbXBvcnQgeyBDYXJkIH0gZnJvbSAnLi4vc2NyaXB0cy9jb21wb25lbnRzL0NhcmQuanMnO1xuaW1wb3J0IHsgRm9ybVZhbGlkYXRvciB9IGZyb20gJy4uL3NjcmlwdHMvY29tcG9uZW50cy9Gb3JtVmFsaWRhdG9yLmpzJztcbmltcG9ydCB7IFNlY3Rpb24gfSBmcm9tICcuLi9zY3JpcHRzL2NvbXBvbmVudHMvU2VjdGlvbi5qcyc7XG5pbXBvcnQgeyBQb3B1cFdpdGhJbWFnZSB9IGZyb20gJy4uL3NjcmlwdHMvY29tcG9uZW50cy9Qb3B1cFdpdGhJbWFnZS5qcyc7XG5pbXBvcnQgeyBQb3B1cFdpdGhGb3JtIH0gZnJvbSAnLi4vc2NyaXB0cy9jb21wb25lbnRzL1BvcHVwV2l0aEZvcm0uanMnO1xuaW1wb3J0IHsgVXNlckluZm8gfSBmcm9tICcuLi9zY3JpcHRzL2NvbXBvbmVudHMvVXNlckluZm8uanMnO1xuaW1wb3J0IHsgQXBpIH0gZnJvbSAnLi4vc2NyaXB0cy9jb21wb25lbnRzL0FwaS5qcyc7XG5pbXBvcnQgeyBQb3B1cFdpdGhTdWJtaXR9IGZyb20gJy4uL3NjcmlwdHMvY29tcG9uZW50cy9Qb3B1cFdpdGhTdWJtaXQnO1xuaW1wb3J0IHtwcm9maWxlRWRpdCxwcm9maWxlQWRkLGNhcmRzVGVtcGxhdGUsbmFtZUlucHV0LGpvYklucHV0LHZhbGlkYXRpb25TZXR0aW5ncyxwaWN0dXJlRWRpdCxwcm9maWxlUGljdHVyZX0gZnJvbSAnLi4vc2NyaXB0cy91dGlscy9jb25zdGFudHMuanMnO1xuXG5jb25zdCBhcGkgPSBuZXcgQXBpKHtiYXNlVXJsOidodHRwczovL21lc3RvLm5vbW9yZXBhcnRpZXMuY28vdjEvY29ob3J0LTQxJyxcbiAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHthdXRob3JpemF0aW9uOicwNTFjYWEwNC1kN2I5LTQ4YTEtOGVlMS1hMGYyOGJhNzU5ZjknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ319KTtcblxuY29uc3QgaW1nT3BlblBvcHVwID0gbmV3IFBvcHVwV2l0aEltYWdlKCcucG9wdXBfdHlwZV9vcGVuLWltZycpO1xuY29uc3QgcG9wdXBDb25maXJtID0gbmV3IFBvcHVwV2l0aFN1Ym1pdCgnLnBvcHVwX3R5cGVfY29uZmlybScpO1xucG9wdXBDb25maXJtLnNldEV2ZW50TGlzdGVuZXJzKCk7XG5cbmZ1bmN0aW9uIGNyZWF0ZUNhcmQoe25hbWUsIGxpbmssIGxpa2VzLCBvd25lcklkLCB1c2VySWQsIGNhcmRJZH0pIHtcbiAgY29uc3QgZGF0YSA9IHtcbiAgICBuYW1lOiBuYW1lLFxuICAgIGxpbms6IGxpbmssXG4gICAgbGlrZXM6IGxpa2VzLFxuICAgIHVzZXJJZDogdXNlcklkLFxuICAgIG93bmVySWQ6IG93bmVySWQsXG4gICAgY2FyZElkOiBjYXJkSWRcbiAgfTtcbiAgXG4gIGNvbnN0IGNhcmQgPSBuZXcgQ2FyZChkYXRhLCBjYXJkc1RlbXBsYXRlLCAobmFtZSwgbGluaykgPT4ge1xuICAgIGltZ09wZW5Qb3B1cC5vcGVuKG5hbWUsIGxpbmspO1xuICB9LCAoKSA9PiB7XG4gICAgcG9wdXBDb25maXJtLnNldENhbGxiYWNrKCgpID0+IHtcbiAgICAgIGFwaS5yZW1vdmVDYXJkKGNhcmRJZClcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIGNhcmQuZGVsZXRlKCk7XG4gICAgICAgICAgcG9wdXBDb25maXJtLmNsb3NlKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcikpO1xuICAgIH0pO1xuICAgIHBvcHVwQ29uZmlybS5vcGVuKCk7XG4gIH0sIChpc0xpa2VkKSA9PiB7XG4gICAgaWYgKCFpc0xpa2VkKSB7XG4gICAgICBhcGkuYWRkTGlrZShjYXJkSWQpXG4gICAgICAudGhlbigoKSA9PiBjYXJkLmxpa2VDYXJkKCkpXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBcbiAgICBhcGkucmVtb3ZlTGlrZShjYXJkSWQpXG4gICAgICAudGhlbigoKSA9PiBjYXJkLnVuTGlrZUNhcmQoKSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcikpO1xuICB9KTtcbiAgcmV0dXJuIGNhcmQuY3JlYXRlKCk7XG59XG5cbmNvbnN0IHNlY3Rpb24gPSBuZXcgU2VjdGlvbignLmNhcmRzX19saXN0Jyk7XG5cbmNvbnN0IHVzZXJJbmZvID0gbmV3IFVzZXJJbmZvKHtcbiAgbmFtZVNlbGVjdG9yOicucHJvZmlsZV9fdGl0bGUnLFxuICBqb2JTZWxlY3RvcjonLnByb2ZpbGVfX2Rlc2NyaXB0aW9uJyxcbiAgYXZhdGFyOicucHJvZmlsZV9fcGljdHVyZSdcbn0pO1xuXG4vLyBhcGkuZ2V0SW5pdGlhbENhcmRzKClcbi8vICAgLnRoZW4oY2FyZHMgPT4gKVxuLy8gICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcblxuLy8gYXBpLmdldFVzZXJJbmZvKClcbiAgLy8gLnRoZW4odXNlckRhdGEgPT4geyBcbiAgLy8gICB1c2VySW5mby5zZXRVc2VySW5mbyh7bmFtZTogdXNlckRhdGEubmFtZSwgam9iOiB1c2VyRGF0YS5hYm91dH0pO1xuICAvLyAgIHVzZXJJbmZvLnNldFVzZXJBdmF0YXIodXNlckRhdGEuYXZhdGFyKTtcbiAgLy8gICB1c2VySW5mby5zZXRVc2VySWQodXNlckRhdGEuX2lkKTtcbiAgLy8gfSlcbiAgLy8gLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKSk7XG5jb25zdCB2YWxpZGF0b3JzID0ge307XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodmFsaWRhdGlvblNldHRpbmdzLmZvcm1TZWxlY3RvcikuZm9yRWFjaChmb3JtID0+IHtcbiAgY29uc3QgdmFsaWRhdG9yID0gbmV3IEZvcm1WYWxpZGF0b3IodmFsaWRhdGlvblNldHRpbmdzLCBmb3JtKTtcbiAgdmFsaWRhdG9yLmVuYWJsZVZhbGlkYXRpb24oKTtcbiAgdmFsaWRhdG9yc1tmb3JtLmdldEF0dHJpYnV0ZSgnbmFtZScpXSA9IHZhbGlkYXRvcjtcbn0pO1xuXG5jb25zdCBwb3B1cEVkaXQgPSBuZXcgUG9wdXBXaXRoRm9ybSgnLnBvcHVwX3R5cGVfZWRpdCcsIHZhbHVlcyA9PiB7IFxuICBhcGkuc2VuZFVzZXJJbmZvKHZhbHVlc1snZmlyc3RuYW1lJ10sdmFsdWVzWydqb2InXSlcbiAgICAudGhlbih1c2VyRGF0YSA9PiB7XG4gICAgICB1c2VySW5mby5zZXRVc2VySW5mbyh7bmFtZTp1c2VyRGF0YS5uYW1lLCBqb2I6dXNlckRhdGEuYWJvdXR9KTtcbiAgICAgIHVzZXJJbmZvLnNldFVzZXJBdmF0YXIodXNlckRhdGEuYXZhdGFyKTtcbiAgICAgIHBvcHVwRWRpdC5jbG9zZSgpO1xuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKSlcbiAgICAuZmluYWxseSgoKSA9PiBwb3B1cEVkaXQuc2V0QnV0dG9uVGV4dCgpKTtcbn0pO1xuXG5jb25zdCBwb3B1cEFkZFBsYWNlID0gbmV3IFBvcHVwV2l0aEZvcm0oJy5wb3B1cF90eXBlX2FkZC1wbGFjZScsIHZhbHVlcyA9PiB7XG4gIHZhbGlkYXRvcnMuZm9ybUFkZFBsYWNlLnJlc2V0VmFsaWRhdGlvbigpO1xuICAgIGFwaS5zZW5kQ2FyZCh2YWx1ZXNbJ3BsYWNlJ10sIHZhbHVlc1snbGluayddKVxuICAgICAudGhlbihjYXJkRGF0YSA9PiB7XG4gICAgICAgIGNvbnN0IGNhcmRFbGVtZW50ID0gY3JlYXRlQ2FyZCh7XG4gICAgICAgICAgbmFtZTogY2FyZERhdGEubmFtZSxcbiAgICAgICAgICBsaW5rOiBjYXJkRGF0YS5saW5rLFxuICAgICAgICAgIGxpa2VzOiBjYXJkRGF0YS5saWtlcy5tYXAobGlrZSA9PiBsaWtlLl9pZCksXG4gICAgICAgICAgb3duZXJJZDogY2FyZERhdGEub3duZXIuX2lkLFxuICAgICAgICAgIHVzZXJJZDogdXNlckluZm8uZ2V0VXNlcklkKCksXG4gICAgICAgICAgY2FyZElkOiBjYXJkRGF0YS5faWRcbiAgICAgICAgfSk7XG4gICAgICAgIHBvcHVwQWRkUGxhY2UuY2xvc2UoKTtcbiAgICAgICAgc2VjdGlvbi5hZGRJdGVtKGNhcmRFbGVtZW50KTtcbiAgICAgfSlcbiAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKSlcbiAgICAgLmZpbmFsbHkoKCkgPT4gcG9wdXBBZGRQbGFjZS5zZXRCdXR0b25UZXh0KCkpO1xufSk7XG5cbmNvbnN0IHBvcHVwcyA9IFtwb3B1cEVkaXQsIHBvcHVwQWRkUGxhY2UsIGltZ09wZW5Qb3B1cF07XG5cbnBvcHVwcy5mb3JFYWNoKHBvcHVwID0+IHtcbiAgcG9wdXAuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcbn0pO1xuXG5wcm9maWxlRWRpdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgdmFsaWRhdG9ycy5mb3JtRWRpdFByb2ZpbGUuY2xlYXJJbnB1dHNNZXNzYWdlKCk7XG4gIHZhbGlkYXRvcnMuZm9ybUVkaXRQcm9maWxlLmVuYWJsZUJ1dHRvbigpO1xuICBjb25zdCB1c2VyRGF0YSA9IHVzZXJJbmZvLmdldFVzZXJJbmZvKCk7XG4gIG5hbWVJbnB1dC52YWx1ZSA9IHVzZXJEYXRhLm5hbWU7XG4gIGpvYklucHV0LnZhbHVlID0gdXNlckRhdGEuam9iO1xuICBwb3B1cEVkaXQub3BlbigpO1xufSk7XG5cbnByb2ZpbGVBZGQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIHZhbGlkYXRvcnMuZm9ybUFkZFBsYWNlLnJlc2V0VmFsaWRhdGlvbigpO1xuICBwb3B1cEFkZFBsYWNlLm9wZW4oKTtcbn0pO1xuXG5jb25zdCBwb3B1cEVkaXRBdmF0YXIgPSBuZXcgUG9wdXBXaXRoRm9ybSgnLnBvcHVwX3R5cGVfZWRpdC1hdmF0YXInLCB2YWx1ZXMgPT4ge1xuICAgIGFwaS51cGRhdGVBdmF0YXIodmFsdWVzWydsaW5rJ10pXG4gICAgLnRoZW4odXNlckRhdGEgPT4ge1xuICAgICAgdXNlckluZm8uc2V0VXNlckF2YXRhcih1c2VyRGF0YS5hdmF0YXIpO1xuICAgICAgcG9wdXBFZGl0QXZhdGFyLmNsb3NlKCk7XG4gICAgfSlcbiAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpKVxuICAgIC5maW5hbGx5KCgpID0+IHBvcHVwRWRpdEF2YXRhci5zZXRCdXR0b25UZXh0KCkpO1xufSk7XG5cbnBvcHVwRWRpdEF2YXRhci5zZXRFdmVudExpc3RlbmVycygpO1xuXG5waWN0dXJlRWRpdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgdmFsaWRhdG9ycy5mb3JtRWRpdEF2YXRhci5yZXNldFZhbGlkYXRpb24oKTtcbiAgcG9wdXBFZGl0QXZhdGFyLm9wZW4oKTtcbn0pO1xuXG5Qcm9taXNlLmFsbChbYXBpLmdldFVzZXJJbmZvKCksIGFwaS5nZXRJbml0aWFsQ2FyZHMoKV0pXG4gIC50aGVuKChbdXNlckRhdGEsIGNhcmRzXSkgPT4ge1xuICAgIHVzZXJJbmZvLnNldFVzZXJJbmZvKHtuYW1lOiB1c2VyRGF0YS5uYW1lLCBqb2I6IHVzZXJEYXRhLmFib3V0fSk7XG4gICAgdXNlckluZm8uc2V0VXNlckF2YXRhcih1c2VyRGF0YS5hdmF0YXIpO1xuICAgIHVzZXJJbmZvLnNldFVzZXJJZCh1c2VyRGF0YS5faWQpO1xuICAgIGNhcmRzLnJldmVyc2UoKS5mb3JFYWNoKGNhcmQgPT4ge1xuICAgICAgY29uc3QgZWxlbWVudCA9IGNyZWF0ZUNhcmQoe1xuICAgICAgICBuYW1lOiBjYXJkLm5hbWUsXG4gICAgICAgIGxpbms6IGNhcmQubGluayxcbiAgICAgICAgbGlrZXM6IGNhcmQubGlrZXMubWFwKGxpa2UgPT4gbGlrZS5faWQpLFxuICAgICAgICBvd25lcklkOiBjYXJkLm93bmVyLl9pZCxcbiAgICAgICAgdXNlcklkOiB1c2VySW5mby5nZXRVc2VySWQoKSxcbiAgICAgICAgY2FyZElkOiBjYXJkLl9pZFxuICAgICAgfSk7XG4gICAgICBzZWN0aW9uLmFkZEl0ZW0oZWxlbWVudCk7XG4gICAgfSk7XG4gIH0pXG4gIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcikpOyJdLCJuYW1lcyI6WyJBcGkiLCJiYXNlVXJsIiwiaGVhZGVycyIsIl9iYXNlVXJsIiwiX2hlYWRlcnMiLCJyZXMiLCJvayIsImpzb24iLCJQcm9taXNlIiwicmVqZWN0Iiwic3RhdHVzIiwic3RhdHVzVGV4dCIsImNhcmRzVXJsIiwiZmV0Y2giLCJ0aGVuIiwiX2NoZWNrU3RhdHVzIiwibmFtZSIsImFib3V0IiwibWV0aG9kIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJsaW5rIiwiY2FyZElkIiwiYXZhdGFyIiwiQ2FyZCIsImRhdGEiLCJjYXJkc1RlbXBsYXRlIiwiaGFuZGxlQ2FyZENsaWNrIiwiZGVsZXRlQ2FsbGJhY2siLCJsaWtlQ2FsbGJhY2siLCJfZGVsZXRlQ2FsbGJhY2siLCJfbGlrZUNhbGxiYWNrIiwiX3VzZXJJZCIsInVzZXJJZCIsIl9vd25lcklkIiwib3duZXJJZCIsIl9jYXJkSWQiLCJfbmFtZSIsIl9saW5rIiwiX2lzT3duZXIiLCJfbGlrZXMiLCJsaWtlcyIsIl9jYXJkc1RlbXBsYXRlIiwiX2hhbmRsZUNhcmRDbGljayIsIl9jYXJkRWxlbWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjbG9uZU5vZGUiLCJfY2FyZFRpdGxlIiwiX2NhcmRJbWFnZSIsInRleHRDb250ZW50Iiwic3JjIiwiYWx0IiwiX2xpa2VDb3VudCIsImxlbmd0aCIsInJlbW92ZSIsIl90cmFzaEJ1dHRvbiIsIl9saWtlQnV0dG9uIiwic29tZSIsIml0ZW0iLCJjbGFzc0xpc3QiLCJhZGQiLCJwdXNoIiwiZmlsdGVyIiwibGlrZSIsImNsb3Nlc3QiLCJhZGRFdmVudExpc3RlbmVyIiwiX3NldEV2ZW50TGlzdGVuZXJzIiwiRm9ybVZhbGlkYXRvciIsInZhbGlkYXRpb25TZXR0aW5ncyIsImZvcm0iLCJpc0Zvcm1WYWxpZCIsImJ1dHRvblNhdmUiLCJpbmFjdGl2ZUJ1dHRvbkNsYXNzIiwicmVtb3ZlQXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwiX2lucHV0cyIsImZvckVhY2giLCJpbnB1dCIsInNwYW5FcnJvciIsInBhcmVudEVsZW1lbnQiLCJfdmFsaWRhdGlvblNldHRpbmdzIiwiZXJyb3JDbGFzcyIsInZhbGlkaXR5IiwidmFsaWQiLCJpbnB1dEVycm9yQ2xhc3MiLCJ2YWxpZGF0aW9uTWVzc2FnZSIsImlzVmFsaWQiLCJBcnJheSIsImZyb20iLCJfc2V0U3VibWl0QnV0dG9uU3RhdGUiLCJfYnV0dG9uIiwiX2Zvcm0iLCJxdWVyeVNlbGVjdG9yQWxsIiwicmVzZXQiLCJjbGVhcklucHV0c01lc3NhZ2UiLCJzdWJtaXRCdXR0b25TZWxlY3RvciIsImlucHV0U2VsZWN0b3IiLCJQb3B1cCIsInBvcHVwU2VsZWN0b3IiLCJfcG9wdXAiLCJkb2N1bWVudCIsIl9oYW5kbGVFc2NDbG9zZSIsImJpbmQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZXZ0Iiwia2V5IiwiY2xvc2UiLCJ0YXJnZXQiLCJjb250YWlucyIsIlBvcHVwV2l0aEZvcm0iLCJzdWJtaXQiLCJfc3VibWl0IiwiX2lucHV0TGlzdCIsIl9zYXZlIiwicmVzdWx0IiwiZWxlbWVudCIsImdldEF0dHJpYnV0ZSIsInZhbHVlIiwicHJldmVudERlZmF1bHQiLCJ2YWx1ZXMiLCJfZ2V0SW5wdXRWYWx1ZXMiLCJQb3B1cFdpdGhJbWFnZSIsIl9wb3B1cEltZyIsIl9wb3B1cERlc2NyaXB0aW9uIiwiUG9wdXBXaXRoU3VibWl0IiwiY2FsbGJhY2siLCJfY2FsbGJhY2siLCJTZWN0aW9uIiwiY29udGFpbmVyU2VsZWN0b3IiLCJfY29udGFpbmVyU2VsZWN0b3IiLCJwcmVwZW5kIiwiVXNlckluZm8iLCJuYW1lU2VsZWN0b3IiLCJqb2JTZWxlY3RvciIsIl9qb2IiLCJfYXZhdGFyIiwiam9iIiwicHJvZmlsZUVkaXQiLCJwcm9maWxlQWRkIiwicGljdHVyZUVkaXQiLCJwcm9maWxlUGljdHVyZSIsImNvbnRlbnQiLCJmb3JtRWRpdFByb2ZpbGUiLCJmb3JtcyIsIm5hbWVJbnB1dCIsImVsZW1lbnRzIiwiZmlyc3RuYW1lIiwiam9iSW5wdXQiLCJmb3JtU2VsZWN0b3IiLCJhcGkiLCJhdXRob3JpemF0aW9uIiwiaW1nT3BlblBvcHVwIiwicG9wdXBDb25maXJtIiwic2V0RXZlbnRMaXN0ZW5lcnMiLCJjcmVhdGVDYXJkIiwiY2FyZCIsIm9wZW4iLCJzZXRDYWxsYmFjayIsInJlbW92ZUNhcmQiLCJkZWxldGUiLCJjYXRjaCIsImVycm9yIiwiY29uc29sZSIsImxvZyIsImlzTGlrZWQiLCJhZGRMaWtlIiwibGlrZUNhcmQiLCJyZW1vdmVMaWtlIiwidW5MaWtlQ2FyZCIsImNyZWF0ZSIsInNlY3Rpb24iLCJ1c2VySW5mbyIsInZhbGlkYXRvcnMiLCJ2YWxpZGF0b3IiLCJlbmFibGVWYWxpZGF0aW9uIiwicG9wdXBFZGl0Iiwic2VuZFVzZXJJbmZvIiwidXNlckRhdGEiLCJzZXRVc2VySW5mbyIsInNldFVzZXJBdmF0YXIiLCJmaW5hbGx5Iiwic2V0QnV0dG9uVGV4dCIsInBvcHVwQWRkUGxhY2UiLCJmb3JtQWRkUGxhY2UiLCJyZXNldFZhbGlkYXRpb24iLCJzZW5kQ2FyZCIsImNhcmREYXRhIiwiY2FyZEVsZW1lbnQiLCJtYXAiLCJfaWQiLCJvd25lciIsImdldFVzZXJJZCIsImFkZEl0ZW0iLCJwb3B1cHMiLCJwb3B1cCIsImVuYWJsZUJ1dHRvbiIsImdldFVzZXJJbmZvIiwicG9wdXBFZGl0QXZhdGFyIiwidXBkYXRlQXZhdGFyIiwiZm9ybUVkaXRBdmF0YXIiLCJhbGwiLCJnZXRJbml0aWFsQ2FyZHMiLCJjYXJkcyIsInNldFVzZXJJZCIsInJldmVyc2UiXSwic291cmNlUm9vdCI6IiJ9