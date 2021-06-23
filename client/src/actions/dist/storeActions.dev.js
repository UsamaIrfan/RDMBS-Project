"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signOut = exports.authenticateUser = exports.login = void 0;

var _actionTypes = require("./actionTypes");

var _Firebase = require("../config/Firebase");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var googleprovider = new _Firebase.firebase.auth.GoogleAuthProvider(); // Auth =======================================================> 

var login = function login(Email, password, setError, history) {
  // login Logic
  return function (dispatch) {
    console.log("Rngg");

    _Firebase.auth.signInWithEmailAndPassword(Email, password).then(function (auth) {
      // Logged in set forms display to none.
      console.log(auth);
      dispatch({
        type: _actionTypes.SET_USER,
        user: auth
      });
      history.push("/dashboard");
    })["catch"](function (err) {
      console.log(err.message, err);

      if (err.code === "auth/invalid-email") {
        setError(function (state) {
          return _objectSpread({}, state, {
            Email: true
          });
        });
      } else if (err.code === "auth/wrong-password") {
        setError(function (state) {
          return _objectSpread({}, state, {
            Password: true
          });
        });
      }
    });
  };
};

exports.login = login;

var authenticateUser = function authenticateUser(history) {
  return function (dispatch) {
    console.log("Running");

    _Firebase.firebase.auth().onAuthStateChanged(function (authUser) {
      if (authUser) {
        // The user is Logged in
        dispatch({
          type: _actionTypes.SET_USER,
          user: authUser
        });
      } else {
        // The user is logged out
        dispatch({
          type: _actionTypes.SET_USER,
          user: null
        });
        history.push("/login");
      }
    });
  };
};

exports.authenticateUser = authenticateUser;

var signOut = function signOut(history) {
  return function (dispatch, getState) {
    var user = getState();

    if (user) {
      _Firebase.firebase.auth().signOut();

      dispatch({
        type: _actionTypes.SET_USER,
        user: null
      });
      history.push("/login");
    }
  };
}; // Auth =======================================================>


exports.signOut = signOut;