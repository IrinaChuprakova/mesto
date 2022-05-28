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
      this._form.querySelector('.popup__save').textContent = 'Сохранить';
    }
  }, {
    key: "setEventListeners",
    value: function setEventListeners() {
      var _this2 = this;

      _get(_getPrototypeOf(PopupWithForm.prototype), "setEventListeners", this).call(this);

      this._popup.addEventListener("submit", function (evt) {
        _this2._form.querySelector('.popup__save').textContent = 'Сохранить...';
        evt.preventDefault();

        var values = _this2._getInputValues();

        _this2._submit(values);

        _this2.close();
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
});
api.getInitialCards().then(function (cards) {
  return cards.forEach(function (card) {
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
api.getUserInfo().then(function (userData) {
  userInfo.setUserInfo({
    name: userData.name,
    job: userData.about
  });
  userInfo.setUserAvatar(userData.avatar);
  userInfo.setUserId(userData._id);
}).catch(function (error) {
  return console.log(error);
});
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
    popupEdit.setButtonText();
  }).catch(function (error) {
    return console.log(error);
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
    popupAddPlace.setButtonText();
    section.addItem(cardElement);
  }).catch(function (error) {
    return console.log(error);
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
    _scripts_utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.profilePicture.src = userData.avatar;
    popupEditAvatar.setButtonText();
  }).catch(function (error) {
    return console.log(error);
  });
});
popupEditAvatar.setEventListeners();
_scripts_utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.pictureEdit.addEventListener('click', function () {
  validators.formEditAvatar.resetValidation();
  popupEditAvatar.open();
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FQdUIsQ0FBeEI7QUFTQXNDLGVBQWUsQ0FBQzlDLGlCQUFoQjtBQUVBZCxxRkFBQSxDQUE2QixPQUE3QixFQUFzQyxZQUFNO0VBQzFDNkMsVUFBVSxDQUFDaUIsY0FBWCxDQUEwQlQsZUFBMUI7RUFDQU8sZUFBZSxDQUFDM0MsSUFBaEI7QUFDRCxDQUhELEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tZXN0by8uL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvQXBpLmpzIiwid2VicGFjazovL21lc3RvLy4vc3JjL3NjcmlwdHMvY29tcG9uZW50cy9DYXJkLmpzIiwid2VicGFjazovL21lc3RvLy4vc3JjL3NjcmlwdHMvY29tcG9uZW50cy9Gb3JtVmFsaWRhdG9yLmpzIiwid2VicGFjazovL21lc3RvLy4vc3JjL3NjcmlwdHMvY29tcG9uZW50cy9Qb3B1cC5qcyIsIndlYnBhY2s6Ly9tZXN0by8uL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvUG9wdXBXaXRoRm9ybS5qcyIsIndlYnBhY2s6Ly9tZXN0by8uL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvUG9wdXBXaXRoSW1hZ2UuanMiLCJ3ZWJwYWNrOi8vbWVzdG8vLi9zcmMvc2NyaXB0cy9jb21wb25lbnRzL1BvcHVwV2l0aFN1Ym1pdC5qcyIsIndlYnBhY2s6Ly9tZXN0by8uL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvU2VjdGlvbi5qcyIsIndlYnBhY2s6Ly9tZXN0by8uL3NyYy9zY3JpcHRzL2NvbXBvbmVudHMvVXNlckluZm8uanMiLCJ3ZWJwYWNrOi8vbWVzdG8vLi9zcmMvc2NyaXB0cy91dGlscy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vbWVzdG8vLi9zcmMvcGFnZXMvaW5kZXguY3NzIiwid2VicGFjazovL21lc3RvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21lc3RvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9tZXN0by93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL21lc3RvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbWVzdG8vLi9zcmMvcGFnZXMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEFwaSB7XG4gICAgY29uc3RydWN0b3Ioe2Jhc2VVcmwsaGVhZGVyc30pIHtcbiAgICAgIHRoaXMuX2Jhc2VVcmwgPSBiYXNlVXJsO1xuICAgICAgdGhpcy5faGVhZGVycyA9IGhlYWRlcnM7XG4gICAgfVxuXG4gICAgX2NoZWNrU3RhdHVzKHJlcyl7XG4gICAgICBpZiAocmVzLm9rKXtcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICB9XG4gICAgICBlbHNle1xuICAgICAgICBQcm9taXNlLnJlamVjdChg0J7RiNC40LHQutCwOiAke3Jlcy5zdGF0dXN9ICR7cmVzLnN0YXR1c1RleHR9YCk7XG4gICAgICB9XG4gICAgfVxuICBcbiAgICBnZXRJbml0aWFsQ2FyZHMoKSB7XG4gICAgICBjb25zdCBjYXJkc1VybCA9IGAke3RoaXMuX2Jhc2VVcmx9L2NhcmRzYDtcbiAgICAgIHJldHVybiBmZXRjaChjYXJkc1VybCx7XG4gICAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnNcbiAgICAgIH0pXG4gICAgICAudGhlbih0aGlzLl9jaGVja1N0YXR1cyk7XG4gICAgfVxuXG4gICAgZ2V0VXNlckluZm8oKSB7XG4gICAgICBjb25zdCBjYXJkc1VybCA9IGAke3RoaXMuX2Jhc2VVcmx9L3VzZXJzL21lYDtcbiAgICAgIHJldHVybiBmZXRjaChjYXJkc1VybCx7XG4gICAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnNcbiAgICAgIH0pXG4gICAgICAudGhlbih0aGlzLl9jaGVja1N0YXR1cyk7XG4gICAgfVxuXG4gICAgc2VuZFVzZXJJbmZvKG5hbWUsIGFib3V0KXtcbiAgICAgIGNvbnN0IGNhcmRzVXJsID0gYCR7dGhpcy5fYmFzZVVybH0vdXNlcnMvbWVgO1xuICAgICAgcmV0dXJuIGZldGNoKGNhcmRzVXJsLHtcbiAgICAgICAgbWV0aG9kOiAnUEFUQ0gnLFxuICAgICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzLFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICBhYm91dDogYWJvdXRcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgICAudGhlbih0aGlzLl9jaGVja1N0YXR1cyk7XG4gICAgfVxuXG4gICAgc2VuZENhcmQobmFtZSxsaW5rKXtcbiAgICAgIGNvbnN0IGNhcmRzVXJsID0gYCR7dGhpcy5fYmFzZVVybH0vY2FyZHNgO1xuICAgICAgcmV0dXJuIGZldGNoKGNhcmRzVXJsLHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgIGxpbms6IGxpbmtcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgICAudGhlbih0aGlzLl9jaGVja1N0YXR1cyk7XG4gICAgfVxuXG4gICAgcmVtb3ZlQ2FyZChjYXJkSWQpe1xuICAgICAgY29uc3QgY2FyZHNVcmwgPSBgJHt0aGlzLl9iYXNlVXJsfS9jYXJkcy8ke2NhcmRJZH1gO1xuICAgICAgcmV0dXJuIGZldGNoKGNhcmRzVXJsLHtcbiAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVyc1xuICAgICAgfSlcbiAgICAgIC50aGVuKHRoaXMuX2NoZWNrU3RhdHVzKTtcbiAgICB9XG4gICAgXG4gICAgYWRkTGlrZShjYXJkSWQpe1xuICAgICAgY29uc3QgY2FyZHNVcmwgPSBgJHt0aGlzLl9iYXNlVXJsfS9jYXJkcy8ke2NhcmRJZH0vbGlrZXNgO1xuICAgICAgcmV0dXJuIGZldGNoKGNhcmRzVXJsLHtcbiAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgaGVhZGVyczogdGhpcy5faGVhZGVyc1xuICAgICAgfSlcbiAgICAgIC50aGVuKHRoaXMuX2NoZWNrU3RhdHVzKTtcbiAgICB9XG5cbiAgICByZW1vdmVMaWtlKGNhcmRJZCl7XG4gICAgICBjb25zdCBjYXJkc1VybCA9IGAke3RoaXMuX2Jhc2VVcmx9L2NhcmRzLyR7Y2FyZElkfS9saWtlc2A7XG4gICAgICByZXR1cm4gZmV0Y2goY2FyZHNVcmwse1xuICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXJzXG4gICAgICB9KVxuICAgICAgLnRoZW4odGhpcy5fY2hlY2tTdGF0dXMpO1xuICAgIH1cblxuICAgIHVwZGF0ZUF2YXRhcihsaW5rKXtcbiAgICAgIGNvbnN0IGNhcmRzVXJsID0gYCR7dGhpcy5fYmFzZVVybH0vdXNlcnMvbWUvYXZhdGFyIGA7XG4gICAgICByZXR1cm4gZmV0Y2goY2FyZHNVcmwse1xuICAgICAgICBtZXRob2Q6ICdQQVRDSCcsXG4gICAgICAgIGhlYWRlcnM6IHRoaXMuX2hlYWRlcnMsXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHthdmF0YXI6bGlua30pXG4gICAgICB9KVxuICAgICAgLnRoZW4odGhpcy5fY2hlY2tTdGF0dXMpO1xuICAgIH1cbiAgfVxuIiwiZXhwb3J0IGNsYXNzIENhcmQge1xuICBjb25zdHJ1Y3RvcihkYXRhLCBjYXJkc1RlbXBsYXRlLCBoYW5kbGVDYXJkQ2xpY2ssIGRlbGV0ZUNhbGxiYWNrLCBsaWtlQ2FsbGJhY2spIHtcbiAgICB0aGlzLl9kZWxldGVDYWxsYmFjayA9IGRlbGV0ZUNhbGxiYWNrO1xuICAgIHRoaXMuX2xpa2VDYWxsYmFjayA9IGxpa2VDYWxsYmFjaztcbiAgICB0aGlzLl91c2VySWQgPSBkYXRhLnVzZXJJZDtcbiAgICB0aGlzLl9vd25lcklkID0gZGF0YS5vd25lcklkO1xuICAgIHRoaXMuX2NhcmRJZCA9IGRhdGEuY2FyZElkO1xuICAgIHRoaXMuX25hbWUgPSBkYXRhLm5hbWU7XG4gICAgdGhpcy5fbGluayA9IGRhdGEubGluaztcbiAgICB0aGlzLl9pc093bmVyID0gdGhpcy5fdXNlcklkID09PSB0aGlzLl9vd25lcklkO1xuICAgIHRoaXMuX2xpa2VzID0gZGF0YS5saWtlcztcbiAgICB0aGlzLl9jYXJkc1RlbXBsYXRlID0gY2FyZHNUZW1wbGF0ZTtcbiAgICB0aGlzLl9oYW5kbGVDYXJkQ2xpY2sgPSBoYW5kbGVDYXJkQ2xpY2s7XG4gICAgdGhpcy5fY2FyZEVsZW1lbnQgPSB0aGlzLl9jYXJkc1RlbXBsYXRlLnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZHNfX2l0ZW1cIikuY2xvbmVOb2RlKHRydWUpO1xuICAgIHRoaXMuX2NhcmRUaXRsZSA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZHNfX3RpdGxlXCIpO1xuICAgIHRoaXMuX2NhcmRJbWFnZSA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZHNfX2ltZ1wiKTtcbiAgICB0aGlzLl9jYXJkVGl0bGUudGV4dENvbnRlbnQgPSB0aGlzLl9uYW1lO1xuICAgIHRoaXMuX2NhcmRJbWFnZS5zcmMgPSB0aGlzLl9saW5rO1xuICAgIHRoaXMuX2NhcmRJbWFnZS5hbHQgPSB0aGlzLl9uYW1lO1xuICAgIHRoaXMuX2xpa2VDb3VudCA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJkc19fbGlrZS1jb3VudCcpO1xuICAgIHRoaXMuX2xpa2VDb3VudC50ZXh0Q29udGVudCA9IHRoaXMuX2xpa2VzLmxlbmd0aDtcblxuICAgIGlmICghdGhpcy5faXNPd25lcil7XG4gICAgICB0aGlzLl9jYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRzX190cmFzaFwiKS5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICB0aGlzLl90cmFzaEJ1dHRvbiA9IHRoaXMuX2NhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZHNfX3RyYXNoXCIpO1xuICAgIHRoaXMuX2xpa2VCdXR0b24gPSB0aGlzLl9jYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRzX19saWtlXCIpO1xuXG4gICAgaWYgKHRoaXMuX2xpa2VzLnNvbWUoKGl0ZW0pID0+IGl0ZW0gPT09IHRoaXMuX3VzZXJJZCkpIHtcbiAgICAgIHRoaXMuX2xpa2VCdXR0b24uY2xhc3NMaXN0LmFkZChcImNhcmRzX19saWtlX2FjdGl2ZVwiKTtcbiAgICB9XG4gIH1cblxuICBsaWtlQ2FyZCgpIHtcbiAgICB0aGlzLl9saWtlcy5wdXNoKHRoaXMuX3VzZXJJZCk7XG4gICAgdGhpcy5fbGlrZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiY2FyZHNfX2xpa2VfYWN0aXZlXCIpO1xuICAgIHRoaXMuX2xpa2VDb3VudC50ZXh0Q29udGVudCA9IHRoaXMuX2xpa2VzLmxlbmd0aDtcbiAgfVxuXG4gIHVuTGlrZUNhcmQoKSB7XG4gICAgdGhpcy5fbGlrZXMgPSB0aGlzLl9saWtlcy5maWx0ZXIobGlrZSA9PiBsaWtlICE9PSB0aGlzLl91c2VySWQpO1xuICAgIHRoaXMuX2xpa2VCdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImNhcmRzX19saWtlX2FjdGl2ZVwiKTtcbiAgICB0aGlzLl9saWtlQ291bnQudGV4dENvbnRlbnQgPSB0aGlzLl9saWtlcy5sZW5ndGg7XG4gIH1cblxuICBkZWxldGUoKSB7XG4gICAgdGhpcy5fdHJhc2hCdXR0b24uY2xvc2VzdChcIi5jYXJkc19faXRlbVwiKS5yZW1vdmUoKTtcbiAgfVxuXG4gIF9zZXRFdmVudExpc3RlbmVycygpIHtcbiAgICBpZiAodGhpcy5faXNPd25lcil7XG4gICAgICB0aGlzLl90cmFzaEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLl9kZWxldGVDYWxsYmFjaygpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIHRoaXMuX2xpa2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIHRoaXMuX2xpa2VDYWxsYmFjayh0aGlzLl9saWtlcy5zb21lKChpdGVtKSA9PiBpdGVtID09PSB0aGlzLl91c2VySWQpKTtcbiAgICB9KTtcbiAgICBcbiAgICB0aGlzLl9jYXJkSW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIHRoaXMuX2hhbmRsZUNhcmRDbGljayh0aGlzLl9uYW1lLCB0aGlzLl9saW5rKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNyZWF0ZSgpIHtcbiAgICB0aGlzLl9zZXRFdmVudExpc3RlbmVycygpO1xuICAgIHJldHVybiB0aGlzLl9jYXJkRWxlbWVudDtcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIEZvcm1WYWxpZGF0b3Ige1xuICBjb25zdHJ1Y3Rvcih2YWxpZGF0aW9uU2V0dGluZ3MsIGZvcm0pIHtcbiAgICB0aGlzLl92YWxpZGF0aW9uU2V0dGluZ3MgPSB2YWxpZGF0aW9uU2V0dGluZ3M7XG4gICAgdGhpcy5fZm9ybSA9IGZvcm07XG4gICAgdGhpcy5fYnV0dG9uID0gdGhpcy5fZm9ybS5xdWVyeVNlbGVjdG9yKHRoaXMuX3ZhbGlkYXRpb25TZXR0aW5ncy5zdWJtaXRCdXR0b25TZWxlY3Rvcik7IFxuICAgIHRoaXMuX2lucHV0cyA9IHRoaXMuX2Zvcm0ucXVlcnlTZWxlY3RvckFsbCh0aGlzLl92YWxpZGF0aW9uU2V0dGluZ3MuaW5wdXRTZWxlY3Rvcik7IFxuICB9XG5cbiAgX3NldFN1Ym1pdEJ1dHRvblN0YXRlID0gKGlzRm9ybVZhbGlkLCBidXR0b25TYXZlLCBpbmFjdGl2ZUJ1dHRvbkNsYXNzKSA9PiB7XG4gICAgaWYgKGlzRm9ybVZhbGlkKSB7XG4gICAgICBidXR0b25TYXZlLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgICAgIGJ1dHRvblNhdmUuY2xhc3NMaXN0LnJlbW92ZShpbmFjdGl2ZUJ1dHRvbkNsYXNzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYnV0dG9uU2F2ZS5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICBidXR0b25TYXZlLmNsYXNzTGlzdC5hZGQoaW5hY3RpdmVCdXR0b25DbGFzcyk7XG4gICAgfVxuICB9O1xuXG4gIF9zZXRFdmVudExpc3RlbmVycyA9ICgpID0+IHtcbiAgICB0aGlzLl9pbnB1dHMuZm9yRWFjaChpbnB1dCA9PiB7XG4gICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcbiAgICAgICAgY29uc3Qgc3BhbkVycm9yID0gaW5wdXQucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKGAuJHt0aGlzLl92YWxpZGF0aW9uU2V0dGluZ3MuZXJyb3JDbGFzc31gKTtcbiAgICAgICAgaWYgKCFpbnB1dC52YWxpZGl0eS52YWxpZCkge1xuICAgICAgICAgIGlucHV0LmNsYXNzTGlzdC5hZGQodGhpcy5fdmFsaWRhdGlvblNldHRpbmdzLmlucHV0RXJyb3JDbGFzcyk7XG4gICAgICAgICAgc3BhbkVycm9yLnRleHRDb250ZW50ID0gaW5wdXQudmFsaWRhdGlvbk1lc3NhZ2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaW5wdXQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl92YWxpZGF0aW9uU2V0dGluZ3MuaW5wdXRFcnJvckNsYXNzKTtcbiAgICAgICAgICBzcGFuRXJyb3IudGV4dENvbnRlbnQgPSAnJztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpc1ZhbGlkID0gQXJyYXkuZnJvbSh0aGlzLl9pbnB1dHMpLmZpbHRlcihpbnB1dCA9PiAhaW5wdXQudmFsaWRpdHkudmFsaWQpLmxlbmd0aCA9PT0gMDtcbiAgICAgICAgdGhpcy5fc2V0U3VibWl0QnV0dG9uU3RhdGUoaXNWYWxpZCwgdGhpcy5fYnV0dG9uLCB0aGlzLl92YWxpZGF0aW9uU2V0dGluZ3MuaW5hY3RpdmVCdXR0b25DbGFzcyk7XG4gICAgICB9KVxuICAgIH0pO1xuICB9XG5cbiAgZW5hYmxlVmFsaWRhdGlvbiA9ICgpID0+IHtcbiAgICB0aGlzLl9zZXRFdmVudExpc3RlbmVycygpO1xuICB9O1xuXG4gIGVuYWJsZUJ1dHRvbiA9ICgpID0+IHtcbiAgICB0aGlzLl9zZXRTdWJtaXRCdXR0b25TdGF0ZSh0cnVlLCB0aGlzLl9idXR0b24sIHRoaXMuX3ZhbGlkYXRpb25TZXR0aW5ncy5pbmFjdGl2ZUJ1dHRvbkNsYXNzKTtcbiAgfVxuXG4gIGNsZWFySW5wdXRzTWVzc2FnZSA9ICgpID0+IHtcbiAgICB0aGlzLl9mb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0JykuZm9yRWFjaChpbnB1dCA9PiB7XG4gICAgICBpbnB1dC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX3ZhbGlkYXRpb25TZXR0aW5ncy5pbnB1dEVycm9yQ2xhc3MpO1xuICAgICAgY29uc3Qgc3BhbkVycm9yID0gaW5wdXQucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKGAuJHt0aGlzLl92YWxpZGF0aW9uU2V0dGluZ3MuZXJyb3JDbGFzc31gKTtcbiAgICAgIHNwYW5FcnJvci50ZXh0Q29udGVudCA9ICcnO1xuICAgIH0pO1xuICB9XG5cbiAgcmVzZXRWYWxpZGF0aW9uID0gKCkgPT4ge1xuICAgIHRoaXMuX2Zvcm0ucmVzZXQoKTtcbiAgICB0aGlzLmNsZWFySW5wdXRzTWVzc2FnZSgpO1xuICAgIHRoaXMuX3NldFN1Ym1pdEJ1dHRvblN0YXRlKGZhbHNlLCB0aGlzLl9idXR0b24sIHRoaXMuX3ZhbGlkYXRpb25TZXR0aW5ncy5pbmFjdGl2ZUJ1dHRvbkNsYXNzKTtcbiAgfVxufSIsImV4cG9ydCBjbGFzcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IpIHtcbiAgICB0aGlzLl9wb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocG9wdXBTZWxlY3Rvcik7XG4gICAgdGhpcy5faGFuZGxlRXNjQ2xvc2UgPSB0aGlzLl9oYW5kbGVFc2NDbG9zZS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgb3BlbigpIHtcbiAgICB0aGlzLl9wb3B1cC5jbGFzc0xpc3QuYWRkKFwicG9wdXBfb3BlbmVkXCIpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMuX2hhbmRsZUVzY0Nsb3NlKTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMuX3BvcHVwLmNsYXNzTGlzdC5yZW1vdmUoXCJwb3B1cF9vcGVuZWRcIik7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcy5faGFuZGxlRXNjQ2xvc2UpO1xuICB9XG5cbiAgX2hhbmRsZUVzY0Nsb3NlKGV2dCkge1xuICAgIGlmIChldnQua2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgICBpZiAodGhpcy5fcG9wdXAgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIHNldEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHRoaXMuX3BvcHVwLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBldnQgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICBldnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInBvcHVwXCIpIHx8XG4gICAgICAgIGV2dC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYnV0dG9uX3R5cGVfY2xvc2VcIilcbiAgICAgICkge1xuICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IFBvcHVwIH0gZnJvbSBcIi4vUG9wdXAuanNcIjtcblxuZXhwb3J0IGNsYXNzIFBvcHVwV2l0aEZvcm0gZXh0ZW5kcyBQb3B1cHtcbiAgICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yLCBzdWJtaXQpe1xuICAgICAgICBzdXBlcihwb3B1cFNlbGVjdG9yKTtcbiAgICAgICAgdGhpcy5fc3VibWl0ID0gc3VibWl0O1xuICAgICAgICB0aGlzLl9mb3JtID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcignLnBvcHVwX19mb3JtJyk7XG4gICAgICAgIHRoaXMuX2lucHV0TGlzdCA9IHRoaXMuX2Zvcm0ucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQnKTtcbiAgICB9XG4gICAgX2dldElucHV0VmFsdWVzKCkge1xuICAgICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgICB0aGlzLl9pbnB1dExpc3QuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgcmVzdWx0W2VsZW1lbnQuZ2V0QXR0cmlidXRlKFwibmFtZVwiKV0gPSBlbGVtZW50LnZhbHVlO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHNldEJ1dHRvblRleHQoKXtcbiAgICAgIHRoaXMuX2Zvcm0ucXVlcnlTZWxlY3RvcignLnBvcHVwX19zYXZlJykudGV4dENvbnRlbnQgPSAn0KHQvtGF0YDQsNC90LjRgtGMJyAgXG4gICAgfVxuXG4gICAgc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICBzdXBlci5zZXRFdmVudExpc3RlbmVycygpO1xuICAgICAgICB0aGlzLl9wb3B1cC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGV2dCA9PiB7XG4gICAgICAgICAgdGhpcy5fZm9ybS5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX3NhdmUnKS50ZXh0Q29udGVudCA9ICfQodC+0YXRgNCw0L3QuNGC0YwuLi4nXG4gICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgY29uc3QgdmFsdWVzID0gdGhpcy5fZ2V0SW5wdXRWYWx1ZXMoKTtcbiAgICAgICAgICB0aGlzLl9zdWJtaXQodmFsdWVzKTtcbiAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBjbG9zZSgpIHtcbiAgICAgICAgc3VwZXIuY2xvc2UoKTtcbiAgICAgICAgdGhpcy5fZm9ybS5yZXNldCgpO1xuICAgICAgfVxufVxuICBcbiAgIiwiaW1wb3J0IHsgUG9wdXAgfSBmcm9tIFwiLi9Qb3B1cC5qc1wiO1xuXG5leHBvcnQgY2xhc3MgUG9wdXBXaXRoSW1hZ2UgZXh0ZW5kcyBQb3B1cHtcbiAgICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yKXtcbiAgICAgICAgc3VwZXIocG9wdXBTZWxlY3Rvcik7XG4gICAgICAgIHRoaXMuX3BvcHVwSW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwX19pbWcnKTtcbiAgICAgICAgdGhpcy5fcG9wdXBEZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fZGVzY3JpcHRpb24nKVxuICAgIH1cbiAgICBcbiAgICBvcGVuKG5hbWUsbGluaykge1xuICAgICAgdGhpcy5fcG9wdXBJbWcuc3JjID0gbGluaztcbiAgICAgIHRoaXMuX3BvcHVwSW1nLmFsdCA9IG5hbWU7XG4gICAgICB0aGlzLl9wb3B1cERlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gbmFtZTtcbiAgICAgIHN1cGVyLm9wZW4oKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUG9wdXAgfSBmcm9tIFwiLi9Qb3B1cC5qc1wiO1xuXG5leHBvcnQgY2xhc3MgUG9wdXBXaXRoU3VibWl0IGV4dGVuZHMgUG9wdXB7XG4gICAgY29uc3RydWN0b3IocG9wdXBTZWxlY3Rvcil7XG4gICAgICAgIHN1cGVyKHBvcHVwU2VsZWN0b3IpO1xuICAgICAgICB0aGlzLl9mb3JtID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcignLnBvcHVwX19mb3JtJyk7XG4gICAgfVxuXG4gICAgc2V0Q2FsbGJhY2soY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5fY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICB9XG5cbiAgICBzZXRFdmVudExpc3RlbmVycygpIHtcbiAgICAgICAgc3VwZXIuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgdGhpcy5fcG9wdXAuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGV2dCkgPT4ge1xuICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLl9jYWxsYmFjaygpO1xuICAgICAgICB9KVxuICAgIH1cbn0iLCJleHBvcnQgY2xhc3MgU2VjdGlvbiB7XG4gIC8vIGNvbnN0cnVjdG9yKHsgaXRlbXMsIHJlbmRlcmVyIH0sIGNvbnRhaW5lclNlbGVjdG9yKSB7XG4gIC8vICAgdGhpcy5faXRlbXMgPSBpdGVtcztcbiAgLy8gICB0aGlzLl9yZW5kZXJlciA9IHJlbmRlcmVyO1xuICAvLyAgIHRoaXMuX2NvbnRhaW5lclNlbGVjdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb250YWluZXJTZWxlY3Rvcik7XG4gIC8vIH1cbiAgY29uc3RydWN0b3IoY29udGFpbmVyU2VsZWN0b3IpIHtcbiAgICB0aGlzLl9jb250YWluZXJTZWxlY3RvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY29udGFpbmVyU2VsZWN0b3IpO1xuICB9XG5cbiAgYWRkSXRlbShlbGVtZW50KSB7XG4gICAgdGhpcy5fY29udGFpbmVyU2VsZWN0b3IucHJlcGVuZChlbGVtZW50KTtcbiAgfVxuICBcbiAgLy8gcmVuZGVySXRlbXMoKSB7XG4gIC8vICAgdGhpcy5faXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAvLyAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuX3JlbmRlcmVyKGl0ZW0pO1xuICAvLyAgICAgdGhpcy5hZGRJdGVtKGVsZW1lbnQpO1xuICAvLyAgIH0pO1xuICAvLyB9XG59XG4iLCJleHBvcnQgY2xhc3MgVXNlckluZm97XG4gICAgY29uc3RydWN0b3Ioe25hbWVTZWxlY3Rvcixqb2JTZWxlY3RvciwgYXZhdGFyfSl7XG4gICAgICAgIHRoaXMuX25hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG5hbWVTZWxlY3Rvcik7XG4gICAgICAgIHRoaXMuX2pvYiA9ICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGpvYlNlbGVjdG9yKTtcbiAgICAgICAgdGhpcy5fYXZhdGFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihhdmF0YXIpO1xuICAgIH1cbiAgICBnZXRVc2VySW5mbygpe1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmFtZTp0aGlzLl9uYW1lLnRleHRDb250ZW50LFxuICAgICAgICAgICAgam9iOnRoaXMuX2pvYi50ZXh0Q29udGVudCxcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXRVc2VySW5mbyh7bmFtZSwgam9ifSl7XG4gICAgICAgIHRoaXMuX25hbWUudGV4dENvbnRlbnQgPSBuYW1lO1xuICAgICAgICB0aGlzLl9qb2IudGV4dENvbnRlbnQgPSBqb2I7XG4gICAgfVxuXG4gICAgc2V0VXNlckF2YXRhcihsaW5rKXtcbiAgICAgICAgdGhpcy5fYXZhdGFyLnNyYyA9IGxpbms7IFxuICAgIH1cblxuICAgIHNldFVzZXJJZCh1c2VySWQpe1xuICAgICAgICB0aGlzLl91c2VySWQgPSB1c2VySWQ7XG4gICAgfVxuXG4gICAgZ2V0VXNlcklkKCl7XG4gICAgICAgIHJldHVybiB0aGlzLl91c2VySWQ7XG4gICAgfVxufSIsImNvbnN0IHByb2ZpbGVFZGl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2ZpbGVfX2VkaXQnKTtcbmNvbnN0IHByb2ZpbGVBZGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZmlsZV9fYWRkJyk7XG5jb25zdCBwaWN0dXJlRWRpdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9maWxlX19lZGl0LXBpY3R1cmUnKTtcbmNvbnN0IHByb2ZpbGVQaWN0dXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2ZpbGVfX3BpY3R1cmUnKTtcbmNvbnN0IGNhcmRzVGVtcGxhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FyZHNfX3RlbXBsYXRlJykuY29udGVudDtcbi8vINCd0LDRhdC+0LTQuNC8INGE0L7RgNC80Ysg0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRjyDQv9GA0L7RhNC40LvRjyDQuCDQtNC+0LHQsNCy0LvQtdC90LjRjyDQutCw0YDRgtC+0YfQutC4INCyIERPTVxuY29uc3QgZm9ybUVkaXRQcm9maWxlID0gZG9jdW1lbnQuZm9ybXMuZm9ybUVkaXRQcm9maWxlO1xuLy8g0J3QsNGF0L7QtNC40Lwg0L/QvtC70Y8g0YTQvtGA0Lwg0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRjyDQv9GA0L7RhNC40LvRjyDQuCDQtNC+0LHQsNCy0LvQtdC90LjRjyDQutCw0YDRgtC+0YfQutC4INCyIERPTVxuY29uc3QgbmFtZUlucHV0ID0gZm9ybUVkaXRQcm9maWxlLmVsZW1lbnRzLmZpcnN0bmFtZTtcbmNvbnN0IGpvYklucHV0ID0gZm9ybUVkaXRQcm9maWxlLmVsZW1lbnRzLmpvYjtcblxuY29uc3QgdmFsaWRhdGlvblNldHRpbmdzID0ge1xuICBmb3JtU2VsZWN0b3I6ICcucG9wdXBfX2Zvcm0nLFxuICBpbnB1dFNlbGVjdG9yOiAnLnBvcHVwX19pbnB1dCcsXG4gIHN1Ym1pdEJ1dHRvblNlbGVjdG9yOiAnLnBvcHVwX19zYXZlJyxcbiAgaW5hY3RpdmVCdXR0b25DbGFzczogJ3BvcHVwX19zYXZlX3R5cGVfZXJyb3InLFxuICBpbnB1dEVycm9yQ2xhc3M6ICdwb3B1cF9faW5wdXRfdHlwZV9lcnJvcicsXG4gIGVycm9yQ2xhc3M6ICdwb3B1cF9fZXJyb3InXG59XG4gICAgXG5leHBvcnR7cHJvZmlsZUVkaXQscHJvZmlsZUFkZCxjYXJkc1RlbXBsYXRlLG5hbWVJbnB1dCxqb2JJbnB1dCx2YWxpZGF0aW9uU2V0dGluZ3MscGljdHVyZUVkaXQscHJvZmlsZVBpY3R1cmV9IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgJy4uL3BhZ2VzL2luZGV4LmNzcyc7IFxuaW1wb3J0IHsgQ2FyZCB9IGZyb20gJy4uL3NjcmlwdHMvY29tcG9uZW50cy9DYXJkLmpzJztcbmltcG9ydCB7IEZvcm1WYWxpZGF0b3IgfSBmcm9tICcuLi9zY3JpcHRzL2NvbXBvbmVudHMvRm9ybVZhbGlkYXRvci5qcyc7XG5pbXBvcnQgeyBTZWN0aW9uIH0gZnJvbSAnLi4vc2NyaXB0cy9jb21wb25lbnRzL1NlY3Rpb24uanMnO1xuaW1wb3J0IHsgUG9wdXBXaXRoSW1hZ2UgfSBmcm9tICcuLi9zY3JpcHRzL2NvbXBvbmVudHMvUG9wdXBXaXRoSW1hZ2UuanMnO1xuaW1wb3J0IHsgUG9wdXBXaXRoRm9ybSB9IGZyb20gJy4uL3NjcmlwdHMvY29tcG9uZW50cy9Qb3B1cFdpdGhGb3JtLmpzJztcbmltcG9ydCB7IFVzZXJJbmZvIH0gZnJvbSAnLi4vc2NyaXB0cy9jb21wb25lbnRzL1VzZXJJbmZvLmpzJztcbmltcG9ydCB7IEFwaSB9IGZyb20gJy4uL3NjcmlwdHMvY29tcG9uZW50cy9BcGkuanMnO1xuaW1wb3J0IHsgUG9wdXBXaXRoU3VibWl0fSBmcm9tICcuLi9zY3JpcHRzL2NvbXBvbmVudHMvUG9wdXBXaXRoU3VibWl0JztcbmltcG9ydCB7cHJvZmlsZUVkaXQscHJvZmlsZUFkZCxjYXJkc1RlbXBsYXRlLG5hbWVJbnB1dCxqb2JJbnB1dCx2YWxpZGF0aW9uU2V0dGluZ3MscGljdHVyZUVkaXQscHJvZmlsZVBpY3R1cmV9IGZyb20gJy4uL3NjcmlwdHMvdXRpbHMvY29uc3RhbnRzLmpzJztcblxuY29uc3QgYXBpID0gbmV3IEFwaSh7YmFzZVVybDonaHR0cHM6Ly9tZXN0by5ub21vcmVwYXJ0aWVzLmNvL3YxL2NvaG9ydC00MScsXG4gICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7YXV0aG9yaXphdGlvbjonMDUxY2FhMDQtZDdiOS00OGExLThlZTEtYTBmMjhiYTc1OWY5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9fSk7XG5cbmNvbnN0IGltZ09wZW5Qb3B1cCA9IG5ldyBQb3B1cFdpdGhJbWFnZSgnLnBvcHVwX3R5cGVfb3Blbi1pbWcnKTtcbmNvbnN0IHBvcHVwQ29uZmlybSA9IG5ldyBQb3B1cFdpdGhTdWJtaXQoJy5wb3B1cF90eXBlX2NvbmZpcm0nKTtcbnBvcHVwQ29uZmlybS5zZXRFdmVudExpc3RlbmVycygpO1xuXG5mdW5jdGlvbiBjcmVhdGVDYXJkKHtuYW1lLCBsaW5rLCBsaWtlcywgb3duZXJJZCwgdXNlcklkLCBjYXJkSWR9KSB7XG4gIGNvbnN0IGRhdGEgPSB7XG4gICAgbmFtZTogbmFtZSxcbiAgICBsaW5rOiBsaW5rLFxuICAgIGxpa2VzOiBsaWtlcyxcbiAgICB1c2VySWQ6IHVzZXJJZCxcbiAgICBvd25lcklkOiBvd25lcklkLFxuICAgIGNhcmRJZDogY2FyZElkXG4gIH07XG4gIFxuICBjb25zdCBjYXJkID0gbmV3IENhcmQoZGF0YSwgY2FyZHNUZW1wbGF0ZSwgKG5hbWUsIGxpbmspID0+IHtcbiAgICBpbWdPcGVuUG9wdXAub3BlbihuYW1lLCBsaW5rKTtcbiAgfSwgKCkgPT4ge1xuICAgIHBvcHVwQ29uZmlybS5zZXRDYWxsYmFjaygoKSA9PiB7XG4gICAgICBhcGkucmVtb3ZlQ2FyZChjYXJkSWQpXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICBjYXJkLmRlbGV0ZSgpO1xuICAgICAgICAgIHBvcHVwQ29uZmlybS5jbG9zZSgpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcbiAgICB9KTtcbiAgICBwb3B1cENvbmZpcm0ub3BlbigpO1xuICB9LCAoaXNMaWtlZCkgPT4ge1xuICAgIGlmICghaXNMaWtlZCkge1xuICAgICAgYXBpLmFkZExpa2UoY2FyZElkKVxuICAgICAgLnRoZW4oKCkgPT4gY2FyZC5saWtlQ2FyZCgpKVxuICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKSk7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgXG4gICAgYXBpLnJlbW92ZUxpa2UoY2FyZElkKVxuICAgICAgLnRoZW4oKCkgPT4gY2FyZC51bkxpa2VDYXJkKCkpXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcbiAgfSk7XG4gIHJldHVybiBjYXJkLmNyZWF0ZSgpO1xufVxuXG5jb25zdCBzZWN0aW9uID0gbmV3IFNlY3Rpb24oJy5jYXJkc19fbGlzdCcpO1xuXG5jb25zdCB1c2VySW5mbyA9IG5ldyBVc2VySW5mbyh7XG4gIG5hbWVTZWxlY3RvcjonLnByb2ZpbGVfX3RpdGxlJyxcbiAgam9iU2VsZWN0b3I6Jy5wcm9maWxlX19kZXNjcmlwdGlvbicsXG4gIGF2YXRhcjonLnByb2ZpbGVfX3BpY3R1cmUnXG59KTtcblxuYXBpLmdldEluaXRpYWxDYXJkcygpXG4gIC50aGVuKGNhcmRzID0+IGNhcmRzLmZvckVhY2goY2FyZCA9PiB7XG4gICAgY29uc3QgZWxlbWVudCA9IGNyZWF0ZUNhcmQoe1xuICAgICAgbmFtZTogY2FyZC5uYW1lLFxuICAgICAgbGluazogY2FyZC5saW5rLFxuICAgICAgbGlrZXM6IGNhcmQubGlrZXMubWFwKGxpa2UgPT4gbGlrZS5faWQpLFxuICAgICAgb3duZXJJZDogY2FyZC5vd25lci5faWQsXG4gICAgICB1c2VySWQ6IHVzZXJJbmZvLmdldFVzZXJJZCgpLFxuICAgICAgY2FyZElkOiBjYXJkLl9pZFxuICAgIH0pO1xuICAgIHNlY3Rpb24uYWRkSXRlbShlbGVtZW50KTtcbiAgfSkpXG4gIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcikpO1xuXG5hcGkuZ2V0VXNlckluZm8oKVxuICAudGhlbih1c2VyRGF0YSA9PiB7IFxuICAgIHVzZXJJbmZvLnNldFVzZXJJbmZvKHtuYW1lOiB1c2VyRGF0YS5uYW1lLCBqb2I6IHVzZXJEYXRhLmFib3V0fSk7XG4gICAgdXNlckluZm8uc2V0VXNlckF2YXRhcih1c2VyRGF0YS5hdmF0YXIpO1xuICAgIHVzZXJJbmZvLnNldFVzZXJJZCh1c2VyRGF0YS5faWQpO1xuICB9KVxuICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcbmNvbnN0IHZhbGlkYXRvcnMgPSB7fTtcblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh2YWxpZGF0aW9uU2V0dGluZ3MuZm9ybVNlbGVjdG9yKS5mb3JFYWNoKGZvcm0gPT4ge1xuICBjb25zdCB2YWxpZGF0b3IgPSBuZXcgRm9ybVZhbGlkYXRvcih2YWxpZGF0aW9uU2V0dGluZ3MsIGZvcm0pO1xuICB2YWxpZGF0b3IuZW5hYmxlVmFsaWRhdGlvbigpO1xuICB2YWxpZGF0b3JzW2Zvcm0uZ2V0QXR0cmlidXRlKCduYW1lJyldID0gdmFsaWRhdG9yO1xufSk7XG5cbmNvbnN0IHBvcHVwRWRpdCA9IG5ldyBQb3B1cFdpdGhGb3JtKCcucG9wdXBfdHlwZV9lZGl0JywgdmFsdWVzID0+IHsgXG4gIGFwaS5zZW5kVXNlckluZm8odmFsdWVzWydmaXJzdG5hbWUnXSx2YWx1ZXNbJ2pvYiddKVxuICAgIC50aGVuKHVzZXJEYXRhID0+IHtcbiAgICAgIHVzZXJJbmZvLnNldFVzZXJJbmZvKHtuYW1lOnVzZXJEYXRhLm5hbWUsIGpvYjp1c2VyRGF0YS5hYm91dH0pO1xuICAgICAgdXNlckluZm8uc2V0VXNlckF2YXRhcih1c2VyRGF0YS5hdmF0YXIpO1xuICAgICAgcG9wdXBFZGl0LnNldEJ1dHRvblRleHQoKTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcikpO1xufSk7XG5cbmNvbnN0IHBvcHVwQWRkUGxhY2UgPSBuZXcgUG9wdXBXaXRoRm9ybSgnLnBvcHVwX3R5cGVfYWRkLXBsYWNlJywgdmFsdWVzID0+IHtcbiAgdmFsaWRhdG9ycy5mb3JtQWRkUGxhY2UucmVzZXRWYWxpZGF0aW9uKCk7XG4gICAgYXBpLnNlbmRDYXJkKHZhbHVlc1sncGxhY2UnXSwgdmFsdWVzWydsaW5rJ10pXG4gICAgIC50aGVuKGNhcmREYXRhID0+IHtcbiAgICAgICAgY29uc3QgY2FyZEVsZW1lbnQgPSBjcmVhdGVDYXJkKHtcbiAgICAgICAgICBuYW1lOiBjYXJkRGF0YS5uYW1lLFxuICAgICAgICAgIGxpbms6IGNhcmREYXRhLmxpbmssXG4gICAgICAgICAgbGlrZXM6IGNhcmREYXRhLmxpa2VzLm1hcChsaWtlID0+IGxpa2UuX2lkKSxcbiAgICAgICAgICBvd25lcklkOiBjYXJkRGF0YS5vd25lci5faWQsXG4gICAgICAgICAgdXNlcklkOiB1c2VySW5mby5nZXRVc2VySWQoKSxcbiAgICAgICAgICBjYXJkSWQ6IGNhcmREYXRhLl9pZFxuICAgICAgICB9KTtcbiAgICAgICAgcG9wdXBBZGRQbGFjZS5zZXRCdXR0b25UZXh0KCk7XG4gICAgICAgIHNlY3Rpb24uYWRkSXRlbShjYXJkRWxlbWVudCk7XG4gICAgIH0pXG4gICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcikpO1xufSk7XG5cbmNvbnN0IHBvcHVwcyA9IFtwb3B1cEVkaXQsIHBvcHVwQWRkUGxhY2UsIGltZ09wZW5Qb3B1cF07XG5cbnBvcHVwcy5mb3JFYWNoKHBvcHVwID0+IHtcbiAgcG9wdXAuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcbn0pO1xuXG5wcm9maWxlRWRpdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgdmFsaWRhdG9ycy5mb3JtRWRpdFByb2ZpbGUuY2xlYXJJbnB1dHNNZXNzYWdlKCk7XG4gIHZhbGlkYXRvcnMuZm9ybUVkaXRQcm9maWxlLmVuYWJsZUJ1dHRvbigpO1xuICBjb25zdCB1c2VyRGF0YSA9IHVzZXJJbmZvLmdldFVzZXJJbmZvKCk7XG4gIG5hbWVJbnB1dC52YWx1ZSA9IHVzZXJEYXRhLm5hbWU7XG4gIGpvYklucHV0LnZhbHVlID0gdXNlckRhdGEuam9iO1xuICBwb3B1cEVkaXQub3BlbigpO1xufSk7XG5cbnByb2ZpbGVBZGQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIHZhbGlkYXRvcnMuZm9ybUFkZFBsYWNlLnJlc2V0VmFsaWRhdGlvbigpO1xuICBwb3B1cEFkZFBsYWNlLm9wZW4oKTtcbn0pO1xuXG5jb25zdCBwb3B1cEVkaXRBdmF0YXIgPSBuZXcgUG9wdXBXaXRoRm9ybSgnLnBvcHVwX3R5cGVfZWRpdC1hdmF0YXInLCB2YWx1ZXMgPT4ge1xuICAgIGFwaS51cGRhdGVBdmF0YXIodmFsdWVzWydsaW5rJ10pXG4gICAgLnRoZW4odXNlckRhdGEgPT4ge1xuICAgICAgcHJvZmlsZVBpY3R1cmUuc3JjID0gdXNlckRhdGEuYXZhdGFyO1xuICAgICAgcG9wdXBFZGl0QXZhdGFyLnNldEJ1dHRvblRleHQoKTtcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcikpO1xufSk7XG5cbnBvcHVwRWRpdEF2YXRhci5zZXRFdmVudExpc3RlbmVycygpO1xuXG5waWN0dXJlRWRpdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgdmFsaWRhdG9ycy5mb3JtRWRpdEF2YXRhci5yZXNldFZhbGlkYXRpb24oKTtcbiAgcG9wdXBFZGl0QXZhdGFyLm9wZW4oKTtcbn0pO1xuIl0sIm5hbWVzIjpbIkFwaSIsImJhc2VVcmwiLCJoZWFkZXJzIiwiX2Jhc2VVcmwiLCJfaGVhZGVycyIsInJlcyIsIm9rIiwianNvbiIsIlByb21pc2UiLCJyZWplY3QiLCJzdGF0dXMiLCJzdGF0dXNUZXh0IiwiY2FyZHNVcmwiLCJmZXRjaCIsInRoZW4iLCJfY2hlY2tTdGF0dXMiLCJuYW1lIiwiYWJvdXQiLCJtZXRob2QiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImxpbmsiLCJjYXJkSWQiLCJhdmF0YXIiLCJDYXJkIiwiZGF0YSIsImNhcmRzVGVtcGxhdGUiLCJoYW5kbGVDYXJkQ2xpY2siLCJkZWxldGVDYWxsYmFjayIsImxpa2VDYWxsYmFjayIsIl9kZWxldGVDYWxsYmFjayIsIl9saWtlQ2FsbGJhY2siLCJfdXNlcklkIiwidXNlcklkIiwiX293bmVySWQiLCJvd25lcklkIiwiX2NhcmRJZCIsIl9uYW1lIiwiX2xpbmsiLCJfaXNPd25lciIsIl9saWtlcyIsImxpa2VzIiwiX2NhcmRzVGVtcGxhdGUiLCJfaGFuZGxlQ2FyZENsaWNrIiwiX2NhcmRFbGVtZW50IiwicXVlcnlTZWxlY3RvciIsImNsb25lTm9kZSIsIl9jYXJkVGl0bGUiLCJfY2FyZEltYWdlIiwidGV4dENvbnRlbnQiLCJzcmMiLCJhbHQiLCJfbGlrZUNvdW50IiwibGVuZ3RoIiwicmVtb3ZlIiwiX3RyYXNoQnV0dG9uIiwiX2xpa2VCdXR0b24iLCJzb21lIiwiaXRlbSIsImNsYXNzTGlzdCIsImFkZCIsInB1c2giLCJmaWx0ZXIiLCJsaWtlIiwiY2xvc2VzdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJfc2V0RXZlbnRMaXN0ZW5lcnMiLCJGb3JtVmFsaWRhdG9yIiwidmFsaWRhdGlvblNldHRpbmdzIiwiZm9ybSIsImlzRm9ybVZhbGlkIiwiYnV0dG9uU2F2ZSIsImluYWN0aXZlQnV0dG9uQ2xhc3MiLCJyZW1vdmVBdHRyaWJ1dGUiLCJzZXRBdHRyaWJ1dGUiLCJfaW5wdXRzIiwiZm9yRWFjaCIsImlucHV0Iiwic3BhbkVycm9yIiwicGFyZW50RWxlbWVudCIsIl92YWxpZGF0aW9uU2V0dGluZ3MiLCJlcnJvckNsYXNzIiwidmFsaWRpdHkiLCJ2YWxpZCIsImlucHV0RXJyb3JDbGFzcyIsInZhbGlkYXRpb25NZXNzYWdlIiwiaXNWYWxpZCIsIkFycmF5IiwiZnJvbSIsIl9zZXRTdWJtaXRCdXR0b25TdGF0ZSIsIl9idXR0b24iLCJfZm9ybSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJyZXNldCIsImNsZWFySW5wdXRzTWVzc2FnZSIsInN1Ym1pdEJ1dHRvblNlbGVjdG9yIiwiaW5wdXRTZWxlY3RvciIsIlBvcHVwIiwicG9wdXBTZWxlY3RvciIsIl9wb3B1cCIsImRvY3VtZW50IiwiX2hhbmRsZUVzY0Nsb3NlIiwiYmluZCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJldnQiLCJrZXkiLCJjbG9zZSIsInRhcmdldCIsImNvbnRhaW5zIiwiUG9wdXBXaXRoRm9ybSIsInN1Ym1pdCIsIl9zdWJtaXQiLCJfaW5wdXRMaXN0IiwicmVzdWx0IiwiZWxlbWVudCIsImdldEF0dHJpYnV0ZSIsInZhbHVlIiwicHJldmVudERlZmF1bHQiLCJ2YWx1ZXMiLCJfZ2V0SW5wdXRWYWx1ZXMiLCJQb3B1cFdpdGhJbWFnZSIsIl9wb3B1cEltZyIsIl9wb3B1cERlc2NyaXB0aW9uIiwiUG9wdXBXaXRoU3VibWl0IiwiY2FsbGJhY2siLCJfY2FsbGJhY2siLCJTZWN0aW9uIiwiY29udGFpbmVyU2VsZWN0b3IiLCJfY29udGFpbmVyU2VsZWN0b3IiLCJwcmVwZW5kIiwiVXNlckluZm8iLCJuYW1lU2VsZWN0b3IiLCJqb2JTZWxlY3RvciIsIl9qb2IiLCJfYXZhdGFyIiwiam9iIiwicHJvZmlsZUVkaXQiLCJwcm9maWxlQWRkIiwicGljdHVyZUVkaXQiLCJwcm9maWxlUGljdHVyZSIsImNvbnRlbnQiLCJmb3JtRWRpdFByb2ZpbGUiLCJmb3JtcyIsIm5hbWVJbnB1dCIsImVsZW1lbnRzIiwiZmlyc3RuYW1lIiwiam9iSW5wdXQiLCJmb3JtU2VsZWN0b3IiLCJhcGkiLCJhdXRob3JpemF0aW9uIiwiaW1nT3BlblBvcHVwIiwicG9wdXBDb25maXJtIiwic2V0RXZlbnRMaXN0ZW5lcnMiLCJjcmVhdGVDYXJkIiwiY2FyZCIsIm9wZW4iLCJzZXRDYWxsYmFjayIsInJlbW92ZUNhcmQiLCJkZWxldGUiLCJjYXRjaCIsImVycm9yIiwiY29uc29sZSIsImxvZyIsImlzTGlrZWQiLCJhZGRMaWtlIiwibGlrZUNhcmQiLCJyZW1vdmVMaWtlIiwidW5MaWtlQ2FyZCIsImNyZWF0ZSIsInNlY3Rpb24iLCJ1c2VySW5mbyIsImdldEluaXRpYWxDYXJkcyIsImNhcmRzIiwibWFwIiwiX2lkIiwib3duZXIiLCJnZXRVc2VySWQiLCJhZGRJdGVtIiwiZ2V0VXNlckluZm8iLCJ1c2VyRGF0YSIsInNldFVzZXJJbmZvIiwic2V0VXNlckF2YXRhciIsInNldFVzZXJJZCIsInZhbGlkYXRvcnMiLCJ2YWxpZGF0b3IiLCJlbmFibGVWYWxpZGF0aW9uIiwicG9wdXBFZGl0Iiwic2VuZFVzZXJJbmZvIiwic2V0QnV0dG9uVGV4dCIsInBvcHVwQWRkUGxhY2UiLCJmb3JtQWRkUGxhY2UiLCJyZXNldFZhbGlkYXRpb24iLCJzZW5kQ2FyZCIsImNhcmREYXRhIiwiY2FyZEVsZW1lbnQiLCJwb3B1cHMiLCJwb3B1cCIsImVuYWJsZUJ1dHRvbiIsInBvcHVwRWRpdEF2YXRhciIsInVwZGF0ZUF2YXRhciIsImZvcm1FZGl0QXZhdGFyIl0sInNvdXJjZVJvb3QiOiIifQ==