// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var $$Promise = require("../src/Promise.js");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var NodeFetch = require("node-fetch");
var Caml_exceptions = require("bs-platform/lib/js/caml_exceptions.js");

globalThis.fetch = NodeFetch;

var NodeFetchPolyfill = {};

var $$Response = {};

function login(email, password) {
  var body = {
    email: email,
    password: password
  };
  var params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  };
  return $$Promise.$$catch(globalThis.fetch("https://reqres.in/api/login", params).then(function (res) {
                    return res.json();
                  }).then(function (data) {
                  var msg = data.error;
                  var tmp;
                  if (msg == null) {
                    var token = data.token;
                    tmp = (token == null) ? ({
                          TAG: /* Error */1,
                          _0: "Didn't return a token"
                        }) : ({
                          TAG: /* Ok */0,
                          _0: token
                        });
                  } else {
                    tmp = {
                      TAG: /* Error */1,
                      _0: msg
                    };
                  }
                  return Promise.resolve(tmp);
                }), (function (e) {
                var msg;
                if (e.RE_EXN_ID === $$Promise.JsError) {
                  var msg$1 = e._1.message;
                  msg = msg$1 !== undefined ? msg$1 : "";
                } else {
                  msg = "Unexpected error occurred";
                }
                return Promise.resolve({
                            TAG: /* Error */1,
                            _0: msg
                          });
              }));
}

var Login = {
  login: login
};

function getProducts(token, param) {
  var params = {
    Authorization: "Bearer " + token
  };
  return $$Promise.$$catch(globalThis.fetch("https://reqres.in/api/products", params).then(function (res) {
                    return res.json();
                  }).then(function (data) {
                  var data$1 = data.data;
                  var ret = (data$1 == null) ? [] : data$1;
                  return Promise.resolve({
                              TAG: /* Ok */0,
                              _0: ret
                            });
                }), (function (e) {
                var msg;
                if (e.RE_EXN_ID === $$Promise.JsError) {
                  var msg$1 = e._1.message;
                  msg = msg$1 !== undefined ? msg$1 : "";
                } else {
                  msg = "Unexpected error occurred";
                }
                return Promise.resolve({
                            TAG: /* Error */1,
                            _0: msg
                          });
              }));
}

var Product = {
  getProducts: getProducts
};

var FailedRequest = /* @__PURE__ */Caml_exceptions.create("FetchExample.FailedRequest");

$$Promise.$$catch(login("emma.wong@reqres.in", "pw").then(function (ret) {
            if (ret.TAG !== /* Ok */0) {
              return Promise.reject({
                          RE_EXN_ID: FailedRequest,
                          _1: "Login error - " + ret._0
                        });
            }
            console.log("Login successful! Querying data...");
            return getProducts(ret._0, undefined);
          }).then(function (result) {
          var tmp;
          if (result.TAG === /* Ok */0) {
            console.log("\nAvailable Products:\n---");
            tmp = Belt_Array.forEach(result._0, (function (p) {
                    console.log(String(p.id) + " - " + p.name);
                    
                  }));
          } else {
            console.log("Could not query products: " + result._0);
            tmp = undefined;
          }
          return Promise.resolve(tmp);
        }), (function (e) {
        if (e.RE_EXN_ID === FailedRequest) {
          console.log("Operation failed! " + e._1);
        } else {
          console.log("Unknown error");
        }
        return Promise.resolve(undefined);
      }));

exports.NodeFetchPolyfill = NodeFetchPolyfill;
exports.$$Response = $$Response;
exports.Login = Login;
exports.Product = Product;
exports.FailedRequest = FailedRequest;
/*  Not a pure module */
