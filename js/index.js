(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.GCui = factory());
})(this, (function () { 'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _regeneratorRuntime() {
    _regeneratorRuntime = function () {
      return exports;
    };
    var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      defineProperty = Object.defineProperty || function (obj, key, desc) {
        obj[key] = desc.value;
      },
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
      return Object.defineProperty(obj, key, {
        value: value,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), obj[key];
    }
    try {
      define({}, "");
    } catch (err) {
      define = function (obj, key, value) {
        return obj[key] = value;
      };
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
      return defineProperty(generator, "_invoke", {
        value: makeInvokeMethod(innerFn, self, context)
      }), generator;
    }
    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }
    exports.wrap = wrap;
    var ContinueSentinel = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function () {
      return this;
    });
    var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        define(prototype, method, function (arg) {
          return this._invoke(method, arg);
        });
      });
    }
    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if ("throw" !== record.type) {
          var result = record.arg,
            value = result.value;
          return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          }) : PromiseImpl.resolve(value).then(function (unwrapped) {
            result.value = unwrapped, resolve(result);
          }, function (error) {
            return invoke("throw", error, resolve, reject);
          });
        }
        reject(record.arg);
      }
      var previousPromise;
      defineProperty(this, "_invoke", {
        value: function (method, arg) {
          function callInvokeWithMethodAndArg() {
            return new PromiseImpl(function (resolve, reject) {
              invoke(method, arg, resolve, reject);
            });
          }
          return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        }
      });
    }
    function makeInvokeMethod(innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");
        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }
        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }
          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);
          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }
          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }
    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];
      if (undefined === method) {
        if (context.delegate = null, "throw" === context.method) {
          if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
          context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }
        return ContinueSentinel;
      }
      var record = tryCatch(method, delegate.iterator, context.arg);
      if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
      var info = record.arg;
      return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
    }
    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };
      1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal", delete record.arg, entry.completion = record;
    }
    function Context(tryLocsList) {
      this.tryEntries = [{
        tryLoc: "root"
      }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
    }
    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) return iteratorMethod.call(iterable);
        if ("function" == typeof iterable.next) return iterable;
        if (!isNaN(iterable.length)) {
          var i = -1,
            next = function next() {
              for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
              return next.value = undefined, next.done = !0, next;
            };
          return next.next = next;
        }
      }
      return {
        next: doneResult
      };
    }
    function doneResult() {
      return {
        value: undefined,
        done: !0
      };
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
      value: GeneratorFunctionPrototype,
      configurable: !0
    }), defineProperty(GeneratorFunctionPrototype, "constructor", {
      value: GeneratorFunction,
      configurable: !0
    }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
      var ctor = "function" == typeof genFun && genFun.constructor;
      return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
    }, exports.mark = function (genFun) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
    }, exports.awrap = function (arg) {
      return {
        __await: arg
      };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
      return this;
    }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      void 0 === PromiseImpl && (PromiseImpl = Promise);
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
      return this;
    }), define(Gp, "toString", function () {
      return "[object Generator]";
    }), exports.keys = function (val) {
      var object = Object(val),
        keys = [];
      for (var key in object) keys.push(key);
      return keys.reverse(), function next() {
        for (; keys.length;) {
          var key = keys.pop();
          if (key in object) return next.value = key, next.done = !1, next;
        }
        return next.done = !0, next;
      };
    }, exports.values = values, Context.prototype = {
      constructor: Context,
      reset: function (skipTempReset) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
      },
      stop: function () {
        this.done = !0;
        var rootRecord = this.tryEntries[0].completion;
        if ("throw" === rootRecord.type) throw rootRecord.arg;
        return this.rval;
      },
      dispatchException: function (exception) {
        if (this.done) throw exception;
        var context = this;
        function handle(loc, caught) {
          return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
        }
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i],
            record = entry.completion;
          if ("root" === entry.tryLoc) return handle("end");
          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");
            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            } else {
              if (!hasFinally) throw new Error("try statement without catch or finally");
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            }
          }
        }
      },
      abrupt: function (type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }
        finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
        var record = finallyEntry ? finallyEntry.completion : {};
        return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
      },
      complete: function (record, afterLoc) {
        if ("throw" === record.type) throw record.arg;
        return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
      },
      finish: function (finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
        }
      },
      catch: function (tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if ("throw" === record.type) {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function (iterable, resultName, nextLoc) {
        return this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
      }
    }, exports;
  }
  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }
    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }
  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
        args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);
        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }
        _next(undefined);
      });
    };
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;
        var F = function () {};
        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true,
      didErr = false,
      err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  var _Object$prototype = Object.prototype,
    hasOwnProperty = _Object$prototype.hasOwnProperty,
    toString = _Object$prototype.toString;
  function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
  }
  var hyphenateRe = /\B([A-Z])/g;
  var hyphenate = memoize(function (str) {
    return str.replace(hyphenateRe, '-$1').toLowerCase();
  });
  var camelizeRe = /-(\w)/g;
  var camelize = memoize(function (str) {
    return str.replace(camelizeRe, toUpper);
  });
  var ucfirst = memoize(function (str) {
    return str.length ? toUpper(null, str.charAt(0)) + str.slice(1) : '';
  });
  function toUpper(_, c) {
    return c ? c.toUpperCase() : '';
  }
  function startsWith(str, search) {
    var _str$startsWith;
    return str === null || str === void 0 ? void 0 : (_str$startsWith = str.startsWith) === null || _str$startsWith === void 0 ? void 0 : _str$startsWith.call(str, search);
  }
  function endsWith(str, search) {
    var _str$endsWith;
    return str === null || str === void 0 ? void 0 : (_str$endsWith = str.endsWith) === null || _str$endsWith === void 0 ? void 0 : _str$endsWith.call(str, search);
  }
  function includes(obj, search) {
    var _obj$includes;
    return obj === null || obj === void 0 ? void 0 : (_obj$includes = obj.includes) === null || _obj$includes === void 0 ? void 0 : _obj$includes.call(obj, search);
  }
  function findIndex(array, predicate) {
    var _array$findIndex;
    return array === null || array === void 0 ? void 0 : (_array$findIndex = array.findIndex) === null || _array$findIndex === void 0 ? void 0 : _array$findIndex.call(array, predicate);
  }
  var isArray = Array.isArray,
    toArray = Array.from;
  var assign = Object.assign;
  function isFunction(obj) {
    return typeof obj === 'function';
  }
  function isObject(obj) {
    return obj !== null && _typeof(obj) === 'object';
  }
  function isPlainObject(obj) {
    return toString.call(obj) === '[object Object]';
  }
  function isWindow(obj) {
    return isObject(obj) && obj === obj.window;
  }
  function isDocument(obj) {
    return nodeType(obj) === 9;
  }
  function isNode(obj) {
    return nodeType(obj) >= 1;
  }
  function isElement(obj) {
    return nodeType(obj) === 1;
  }
  function nodeType(obj) {
    return !isWindow(obj) && isObject(obj) && obj.nodeType;
  }
  function isBoolean(value) {
    return typeof value === 'boolean';
  }
  function isString(value) {
    return typeof value === 'string';
  }
  function isNumber(value) {
    return typeof value === 'number';
  }
  function isNumeric(value) {
    return isNumber(value) || isString(value) && !isNaN(value - parseFloat(value));
  }
  function isEmpty(obj) {
    return !(isArray(obj) ? obj.length : isObject(obj) ? Object.keys(obj).length : false);
  }
  function isUndefined(value) {
    return value === void 0;
  }
  function toBoolean(value) {
    return isBoolean(value) ? value : value === 'true' || value === '1' || value === '' ? true : value === 'false' || value === '0' ? false : value;
  }
  function toNumber(value) {
    var number = Number(value);
    return isNaN(number) ? false : number;
  }
  function toFloat(value) {
    return parseFloat(value) || 0;
  }
  function toNode(element) {
    return toNodes(element)[0];
  }
  function toNodes(element) {
    return element && (isNode(element) ? [element] : Array.from(element).filter(isNode)) || [];
  }
  function toWindow(element) {
    var _element;
    if (isWindow(element)) {
      return element;
    }
    element = toNode(element);
    var document = isDocument(element) ? element : (_element = element) === null || _element === void 0 ? void 0 : _element.ownerDocument;
    return (document === null || document === void 0 ? void 0 : document.defaultView) || window;
  }
  function isEqual(value, other) {
    return value === other || isObject(value) && isObject(other) && Object.keys(value).length === Object.keys(other).length && each(value, function (val, key) {
      return val === other[key];
    });
  }
  function swap(value, a, b) {
    return value.replace(new RegExp("".concat(a, "|").concat(b), 'g'), function (match) {
      return match === a ? b : a;
    });
  }
  function last(array) {
    return array[array.length - 1];
  }
  function each(obj, cb) {
    for (var key in obj) {
      if (false === cb(obj[key], key)) {
        return false;
      }
    }
    return true;
  }
  function sortBy$1(array, prop) {
    return array.slice().sort(function (_ref, _ref2) {
      var _ref$prop = _ref[prop],
        propA = _ref$prop === void 0 ? 0 : _ref$prop;
      var _ref2$prop = _ref2[prop],
        propB = _ref2$prop === void 0 ? 0 : _ref2$prop;
      return propA > propB ? 1 : propB > propA ? -1 : 0;
    });
  }
  function uniqueBy(array, prop) {
    var seen = new Set();
    return array.filter(function (_ref3) {
      var check = _ref3[prop];
      return seen.has(check) ? false : seen.add(check);
    });
  }
  function clamp(number) {
    var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    return Math.min(Math.max(toNumber(number) || 0, min), max);
  }
  function noop() {}
  function intersectRect() {
    for (var _len = arguments.length, rects = new Array(_len), _key = 0; _key < _len; _key++) {
      rects[_key] = arguments[_key];
    }
    return [['bottom', 'top'], ['right', 'left']].every(function (_ref4) {
      var _ref5 = _slicedToArray(_ref4, 2),
        minProp = _ref5[0],
        maxProp = _ref5[1];
      return Math.min.apply(Math, _toConsumableArray(rects.map(function (_ref6) {
        var min = _ref6[minProp];
        return min;
      }))) - Math.max.apply(Math, _toConsumableArray(rects.map(function (_ref7) {
        var max = _ref7[maxProp];
        return max;
      }))) > 0;
    });
  }
  function pointInRect(point, rect) {
    return point.x <= rect.right && point.x >= rect.left && point.y <= rect.bottom && point.y >= rect.top;
  }
  function ratio(dimensions, prop, value) {
    var _ref8;
    var aProp = prop === 'width' ? 'height' : 'width';
    return _ref8 = {}, _defineProperty(_ref8, aProp, dimensions[prop] ? Math.round(value * dimensions[aProp] / dimensions[prop]) : dimensions[aProp]), _defineProperty(_ref8, prop, value), _ref8;
  }
  function contain(dimensions, maxDimensions) {
    dimensions = _objectSpread2({}, dimensions);
    for (var prop in dimensions) {
      dimensions = dimensions[prop] > maxDimensions[prop] ? ratio(dimensions, prop, maxDimensions[prop]) : dimensions;
    }
    return dimensions;
  }
  function cover$1(dimensions, maxDimensions) {
    dimensions = contain(dimensions, maxDimensions);
    for (var prop in dimensions) {
      dimensions = dimensions[prop] < maxDimensions[prop] ? ratio(dimensions, prop, maxDimensions[prop]) : dimensions;
    }
    return dimensions;
  }
  var Dimensions = {
    ratio: ratio,
    contain: contain,
    cover: cover$1
  };
  function getIndex(i, elements) {
    var current = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var finite = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    elements = toNodes(elements);
    var _elements = elements,
      length = _elements.length;
    if (!length) {
      return -1;
    }
    i = isNumeric(i) ? toNumber(i) : i === 'next' ? current + 1 : i === 'previous' ? current - 1 : elements.indexOf(toNode(i));
    if (finite) {
      return clamp(i, 0, length - 1);
    }
    i %= length;
    return i < 0 ? i + length : i;
  }
  function memoize(fn) {
    var cache = Object.create(null);
    return function (key) {
      return cache[key] || (cache[key] = fn(key));
    };
  }
  var Deferred = /*#__PURE__*/_createClass(function Deferred() {
    var _this = this;
    _classCallCheck(this, Deferred);
    this.promise = new Promise(function (resolve, reject) {
      _this.reject = reject;
      _this.resolve = resolve;
    });
  });

  function attr(element, name, value) {
    if (isObject(name)) {
      for (var key in name) {
        attr(element, key, name[key]);
      }
      return;
    }
    if (isUndefined(value)) {
      var _toNode;
      return (_toNode = toNode(element)) === null || _toNode === void 0 ? void 0 : _toNode.getAttribute(name);
    } else {
      var _iterator = _createForOfIteratorHelper(toNodes(element)),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var el = _step.value;
          if (isFunction(value)) {
            value = value.call(el, attr(el, name));
          }
          if (value === null) {
            removeAttr(el, name);
          } else {
            el.setAttribute(name, value);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }
  function hasAttr(element, name) {
    return toNodes(element).some(function (element) {
      return element.hasAttribute(name);
    });
  }
  function removeAttr(element, name) {
    var elements = toNodes(element);
    var _iterator2 = _createForOfIteratorHelper(name.split(' ')),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var attribute = _step2.value;
        var _iterator3 = _createForOfIteratorHelper(elements),
          _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var _element = _step3.value;
            _element.removeAttribute(attribute);
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }
  function data(element, attribute) {
    for (var _i = 0, _arr = [attribute, "data-".concat(attribute)]; _i < _arr.length; _i++) {
      var name = _arr[_i];
      if (hasAttr(element, name)) {
        return attr(element, name);
      }
    }
  }

  var voidElements = {
    area: true,
    base: true,
    br: true,
    col: true,
    embed: true,
    hr: true,
    img: true,
    input: true,
    keygen: true,
    link: true,
    menuitem: true,
    meta: true,
    param: true,
    source: true,
    track: true,
    wbr: true
  };
  function isVoidElement(element) {
    return toNodes(element).some(function (element) {
      return voidElements[element.tagName.toLowerCase()];
    });
  }
  function isVisible(element) {
    return toNodes(element).some(function (element) {
      return element.offsetWidth || element.offsetHeight || element.getClientRects().length;
    });
  }
  var selInput = 'input,select,textarea,button';
  function isInput(element) {
    return toNodes(element).some(function (element) {
      return matches(element, selInput);
    });
  }
  var selFocusable = "".concat(selInput, ",a[href],[tabindex]");
  function isFocusable(element) {
    return matches(element, selFocusable);
  }
  function parent(element) {
    var _toNode;
    return (_toNode = toNode(element)) === null || _toNode === void 0 ? void 0 : _toNode.parentElement;
  }
  function filter$1(element, selector) {
    return toNodes(element).filter(function (element) {
      return matches(element, selector);
    });
  }
  function matches(element, selector) {
    return toNodes(element).some(function (element) {
      return element.matches(selector);
    });
  }
  function closest(element, selector) {
    return isElement(element) ? element.closest(startsWith(selector, '>') ? selector.slice(1) : selector) : toNodes(element).map(function (element) {
      return closest(element, selector);
    }).filter(Boolean);
  }
  function within(element, selector) {
    return isString(selector) ? !!closest(element, selector) : toNode(selector).contains(toNode(element));
  }
  function parents(element, selector) {
    var elements = [];
    while (element = parent(element)) {
      if (!selector || matches(element, selector)) {
        elements.push(element);
      }
    }
    return elements;
  }
  function children(element, selector) {
    element = toNode(element);
    var children = element ? toNodes(element.children) : [];
    return selector ? filter$1(children, selector) : children;
  }
  function index(element, ref) {
    return ref ? toNodes(element).indexOf(toNode(ref)) : children(parent(element)).indexOf(element);
  }

  function query(selector, context) {
    return find(selector, getContext(selector, context));
  }
  function queryAll(selector, context) {
    return findAll(selector, getContext(selector, context));
  }
  function find(selector, context) {
    return toNode(_query(selector, context, 'querySelector'));
  }
  function findAll(selector, context) {
    return toNodes(_query(selector, context, 'querySelectorAll'));
  }
  var contextSelectorRe = /(^|[^\\],)\s*[!>+~-]/;
  var isContextSelector = memoize(function (selector) {
    return selector.match(contextSelectorRe);
  });
  function getContext(selector) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
    return isString(selector) && isContextSelector(selector) || isDocument(context) ? context : context.ownerDocument;
  }
  var contextSanitizeRe = /([!>+~-])(?=\s+[!>+~-]|\s*$)/g;
  var sanatize = memoize(function (selector) {
    return selector.replace(contextSanitizeRe, '$1 *');
  });
  function _query(selector) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
    var queryFn = arguments.length > 2 ? arguments[2] : undefined;
    if (!selector || !isString(selector)) {
      return selector;
    }
    selector = sanatize(selector);
    if (isContextSelector(selector)) {
      var split = splitSelector(selector);
      selector = '';
      var _iterator = _createForOfIteratorHelper(split),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var sel = _step.value;
          var ctx = context;
          if (sel[0] === '!') {
            var selectors = sel.substr(1).trim().split(' ');
            ctx = closest(parent(context), selectors[0]);
            sel = selectors.slice(1).join(' ').trim();
            if (!sel.length && split.length === 1) {
              return ctx;
            }
          }
          if (sel[0] === '-') {
            var _selectors = sel.substr(1).trim().split(' ');
            var prev = (ctx || context).previousElementSibling;
            ctx = matches(prev, sel.substr(1)) ? prev : null;
            sel = _selectors.slice(1).join(' ');
          }
          if (ctx) {
            selector += "".concat(selector ? ',' : '').concat(domPath(ctx), " ").concat(sel);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      context = document;
    }
    try {
      return context[queryFn](selector);
    } catch (e) {
      return null;
    }
  }
  var selectorRe = /.*?[^\\](?:,|$)/g;
  var splitSelector = memoize(function (selector) {
    return selector.match(selectorRe).map(function (selector) {
      return selector.replace(/,$/, '').trim();
    });
  });
  function domPath(element) {
    var names = [];
    while (element.parentNode) {
      var id = attr(element, 'id');
      if (id) {
        names.unshift("#".concat(escape(id)));
        break;
      } else {
        var _element = element,
          tagName = _element.tagName;
        if (tagName !== 'HTML') {
          tagName += ":nth-child(".concat(index(element) + 1, ")");
        }
        names.unshift(tagName);
        element = element.parentNode;
      }
    }
    return names.join(' > ');
  }
  function escape(css) {
    return isString(css) ? CSS.escape(css) : '';
  }

  function on() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var _getArgs = getArgs(args),
      _getArgs2 = _slicedToArray(_getArgs, 5),
      targets = _getArgs2[0],
      types = _getArgs2[1],
      selector = _getArgs2[2],
      listener = _getArgs2[3],
      _getArgs2$ = _getArgs2[4],
      useCapture = _getArgs2$ === void 0 ? false : _getArgs2$;
    if (listener.length > 1) {
      listener = detail(listener);
    }
    if (useCapture !== null && useCapture !== void 0 && useCapture.self) {
      listener = selfFilter(listener);
    }
    if (selector) {
      listener = delegate(selector, listener);
    }
    var _iterator = _createForOfIteratorHelper(types),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var type = _step.value;
        var _iterator2 = _createForOfIteratorHelper(targets),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var target = _step2.value;
            target.addEventListener(type, listener, useCapture);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return function () {
      return off(targets, types, listener, useCapture);
    };
  }
  function off() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    var _getArgs3 = getArgs(args),
      _getArgs4 = _slicedToArray(_getArgs3, 5),
      targets = _getArgs4[0],
      types = _getArgs4[1],
      listener = _getArgs4[3],
      _getArgs4$ = _getArgs4[4],
      useCapture = _getArgs4$ === void 0 ? false : _getArgs4$;
    var _iterator3 = _createForOfIteratorHelper(types),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var type = _step3.value;
        var _iterator4 = _createForOfIteratorHelper(targets),
          _step4;
        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var target = _step4.value;
            target.removeEventListener(type, listener, useCapture);
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  }
  function once() {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }
    var _getArgs5 = getArgs(args),
      _getArgs6 = _slicedToArray(_getArgs5, 6),
      element = _getArgs6[0],
      types = _getArgs6[1],
      selector = _getArgs6[2],
      listener = _getArgs6[3],
      _getArgs6$ = _getArgs6[4],
      useCapture = _getArgs6$ === void 0 ? false : _getArgs6$,
      condition = _getArgs6[5];
    var off = on(element, types, selector, function (e) {
      var result = !condition || condition(e);
      if (result) {
        off();
        listener(e, result);
      }
    }, useCapture);
    return off;
  }
  function trigger(targets, event, detail) {
    return toEventTargets(targets).every(function (target) {
      return target.dispatchEvent(createEvent(event, true, true, detail));
    });
  }
  function createEvent(e) {
    var bubbles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var cancelable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var detail = arguments.length > 3 ? arguments[3] : undefined;
    if (isString(e)) {
      e = new CustomEvent(e, {
        bubbles: bubbles,
        cancelable: cancelable,
        detail: detail
      });
    }
    return e;
  }
  function getArgs(args) {
    // Event targets
    args[0] = toEventTargets(args[0]);

    // Event types
    if (isString(args[1])) {
      args[1] = args[1].split(' ');
    }

    // Delegate?
    if (isFunction(args[2])) {
      args.splice(2, 0, false);
    }
    return args;
  }
  function delegate(selector, listener) {
    var _this = this;
    return function (e) {
      var current = selector[0] === '>' ? findAll(selector, e.currentTarget).reverse().filter(function (element) {
        return within(e.target, element);
      })[0] : closest(e.target, selector);
      if (current) {
        e.current = current;
        listener.call(_this, e);
      }
    };
  }
  function detail(listener) {
    return function (e) {
      return isArray(e.detail) ? listener.apply(void 0, [e].concat(_toConsumableArray(e.detail))) : listener(e);
    };
  }
  function selfFilter(listener) {
    return function (e) {
      if (e.target === e.currentTarget || e.target === e.current) {
        return listener.call(null, e);
      }
    };
  }
  function isEventTarget(target) {
    return target && 'addEventListener' in target;
  }
  function toEventTarget(target) {
    return isEventTarget(target) ? target : toNode(target);
  }
  function toEventTargets(target) {
    return isArray(target) ? target.map(toEventTarget).filter(Boolean) : isString(target) ? findAll(target) : isEventTarget(target) ? [target] : toNodes(target);
  }
  function isTouch(e) {
    return e.pointerType === 'touch' || !!e.touches;
  }
  function getEventPos(e) {
    var _e$touches, _e$changedTouches;
    var _ref = ((_e$touches = e.touches) === null || _e$touches === void 0 ? void 0 : _e$touches[0]) || ((_e$changedTouches = e.changedTouches) === null || _e$changedTouches === void 0 ? void 0 : _e$changedTouches[0]) || e,
      x = _ref.clientX,
      y = _ref.clientY;
    return {
      x: x,
      y: y
    };
  }

  function ajax(url, options) {
    var env = _objectSpread2({
      data: null,
      method: 'GET',
      headers: {},
      xhr: new XMLHttpRequest(),
      beforeSend: noop,
      responseType: ''
    }, options);
    return Promise.resolve().then(function () {
      return env.beforeSend(env);
    }).then(function () {
      return send(url, env);
    });
  }
  function send(url, env) {
    return new Promise(function (resolve, reject) {
      var xhr = env.xhr;
      for (var prop in env) {
        if (prop in xhr) {
          try {
            xhr[prop] = env[prop];
          } catch (e) {
            // noop
          }
        }
      }
      xhr.open(env.method.toUpperCase(), url);
      for (var header in env.headers) {
        xhr.setRequestHeader(header, env.headers[header]);
      }
      on(xhr, 'load', function () {
        if (xhr.status === 0 || xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
          resolve(xhr);
        } else {
          reject(assign(Error(xhr.statusText), {
            xhr: xhr,
            status: xhr.status
          }));
        }
      });
      on(xhr, 'error', function () {
        return reject(assign(Error('Network Error'), {
          xhr: xhr
        }));
      });
      on(xhr, 'timeout', function () {
        return reject(assign(Error('Network Timeout'), {
          xhr: xhr
        }));
      });
      xhr.send(env.data);
    });
  }
  function getImage(src, srcset, sizes) {
    return new Promise(function (resolve, reject) {
      var img = new Image();
      img.onerror = function (e) {
        reject(e);
      };
      img.onload = function () {
        resolve(img);
      };
      sizes && (img.sizes = sizes);
      srcset && (img.srcset = srcset);
      img.src = src;
    });
  }

  var cssNumber = {
    'animation-iteration-count': true,
    'column-count': true,
    'fill-opacity': true,
    'flex-grow': true,
    'flex-shrink': true,
    'font-weight': true,
    'line-height': true,
    opacity: true,
    order: true,
    orphans: true,
    'stroke-dasharray': true,
    'stroke-dashoffset': true,
    widows: true,
    'z-index': true,
    zoom: true
  };
  function css(element, property, value) {
    var priority = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
    var elements = toNodes(element);
    var _iterator = _createForOfIteratorHelper(elements),
      _step;
    try {
      var _loop = function _loop() {
        var element = _step.value;
        if (isString(property)) {
          property = propName(property);
          if (isUndefined(value)) {
            return {
              v: getComputedStyle(element).getPropertyValue(property)
            };
          } else {
            element.style.setProperty(property, isNumeric(value) && !cssNumber[property] ? "".concat(value, "px") : value || isNumber(value) ? value : '', priority);
          }
        } else if (isArray(property)) {
          var props = {};
          var _iterator2 = _createForOfIteratorHelper(property),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var prop = _step2.value;
              props[prop] = css(element, prop);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
          return {
            v: props
          };
        } else if (isObject(property)) {
          priority = value;
          each(property, function (value, property) {
            return css(element, property, value, priority);
          });
        }
      };
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _ret = _loop();
        if (_typeof(_ret) === "object") return _ret.v;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return elements[0];
  }

  // https://drafts.csswg.org/cssom/#dom-cssstyledeclaration-setproperty
  var propName = memoize(function (name) {
    return vendorPropName(name);
  });
  function vendorPropName(name) {
    if (startsWith(name, '--')) {
      return name;
    }
    name = hyphenate(name);
    var style = document.documentElement.style;
    if (name in style) {
      return name;
    }
    for (var _i = 0, _arr = ['webkit', 'moz']; _i < _arr.length; _i++) {
      var prefix = _arr[_i];
      var prefixedName = "-".concat(prefix, "-").concat(name);
      if (prefixedName in style) {
        return prefixedName;
      }
    }
  }

  function addClass(element) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    apply$1(element, args, 'add');
  }
  function removeClass(element) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    apply$1(element, args, 'remove');
  }
  function removeClasses(element, cls) {
    attr(element, 'class', function (value) {
      return (value || '').replace(new RegExp("\\b".concat(cls, "\\b\\s?"), 'g'), '');
    });
  }
  function replaceClass(element) {
    (arguments.length <= 1 ? undefined : arguments[1]) && removeClass(element, arguments.length <= 1 ? undefined : arguments[1]);
    (arguments.length <= 2 ? undefined : arguments[2]) && addClass(element, arguments.length <= 2 ? undefined : arguments[2]);
  }
  function hasClass(element, cls) {
    var _getClasses = getClasses(cls);
    var _getClasses2 = _slicedToArray(_getClasses, 1);
    cls = _getClasses2[0];
    return !!cls && toNodes(element).some(function (node) {
      return node.classList.contains(cls);
    });
  }
  function toggleClass(element, cls, force) {
    var classes = getClasses(cls);
    if (!isUndefined(force)) {
      force = !!force;
    }
    var _iterator = _createForOfIteratorHelper(toNodes(element)),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var node = _step.value;
        var _iterator2 = _createForOfIteratorHelper(classes),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _cls = _step2.value;
            node.classList.toggle(_cls, force);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  function apply$1(element, args, fn) {
    args = args.reduce(function (args, arg) {
      return args.concat(getClasses(arg));
    }, []);
    var _iterator3 = _createForOfIteratorHelper(toNodes(element)),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var _node$classList;
        var node = _step3.value;
        (_node$classList = node.classList)[fn].apply(_node$classList, _toConsumableArray(args));
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  }
  function getClasses(str) {
    return String(str).split(/\s|,/).filter(Boolean);
  }

  function transition(element, props) {
    var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 400;
    var timing = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'linear';
    duration = Math.round(duration);
    return Promise.all(toNodes(element).map(function (element) {
      return new Promise(function (resolve, reject) {
        for (var name in props) {
          var value = css(element, name);
          if (value === '') {
            css(element, name, value);
          }
        }
        var timer = setTimeout(function () {
          return trigger(element, 'transitionend');
        }, duration);
        once(element, 'transitionend transitioncanceled', function (_ref) {
          var type = _ref.type;
          clearTimeout(timer);
          removeClass(element, 'uk-transition');
          css(element, {
            transitionProperty: '',
            transitionDuration: '',
            transitionTimingFunction: ''
          });
          type === 'transitioncanceled' ? reject() : resolve(element);
        }, {
          self: true
        });
        addClass(element, 'uk-transition');
        css(element, _objectSpread2({
          transitionProperty: Object.keys(props).map(propName).join(','),
          transitionDuration: "".concat(duration, "ms"),
          transitionTimingFunction: timing
        }, props));
      });
    }));
  }
  var Transition = {
    start: transition,
    stop: function stop(element) {
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                trigger(element, 'transitionend');
                _context.next = 3;
                return Promise.resolve();
              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    cancel: function cancel(element) {
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                trigger(element, 'transitioncanceled');
                _context2.next = 3;
                return Promise.resolve();
              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    inProgress: function inProgress(element) {
      return hasClass(element, 'uk-transition');
    }
  };
  var animationPrefix = 'uk-animation-';
  function animate$2(element, animation) {
    var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 200;
    var origin = arguments.length > 3 ? arguments[3] : undefined;
    var out = arguments.length > 4 ? arguments[4] : undefined;
    return Promise.all(toNodes(element).map(function (element) {
      return new Promise(function (resolve, reject) {
        trigger(element, 'animationcanceled');
        var timer = setTimeout(function () {
          return trigger(element, 'animationend');
        }, duration);
        once(element, 'animationend animationcanceled', function (_ref2) {
          var type = _ref2.type;
          clearTimeout(timer);
          type === 'animationcanceled' ? reject() : resolve(element);
          css(element, 'animationDuration', '');
          removeClasses(element, "".concat(animationPrefix, "\\S*"));
        }, {
          self: true
        });
        css(element, 'animationDuration', "".concat(duration, "ms"));
        addClass(element, animation, animationPrefix + (out ? 'leave' : 'enter'));
        if (startsWith(animation, animationPrefix)) {
          origin && addClass(element, "uk-transform-origin-".concat(origin));
          out && addClass(element, "".concat(animationPrefix, "reverse"));
        }
      });
    }));
  }
  var inProgressRe = new RegExp("".concat(animationPrefix, "(enter|leave)"));
  var Animation = {
    "in": animate$2,
    out: function out(element, animation, duration, origin) {
      return animate$2(element, animation, duration, origin, true);
    },
    inProgress: function inProgress(element) {
      return inProgressRe.test(attr(element, 'class'));
    },
    cancel: function cancel(element) {
      trigger(element, 'animationcanceled');
    }
  };

  var dirs$1 = {
    width: ['left', 'right'],
    height: ['top', 'bottom']
  };
  function dimensions$1(element) {
    var rect = isElement(element) ? toNode(element).getBoundingClientRect() : {
      height: height(element),
      width: width(element),
      top: 0,
      left: 0
    };
    return {
      height: rect.height,
      width: rect.width,
      top: rect.top,
      left: rect.left,
      bottom: rect.top + rect.height,
      right: rect.left + rect.width
    };
  }
  function offset(element, coordinates) {
    var currentOffset = dimensions$1(element);
    if (element) {
      var _toWindow = toWindow(element),
        scrollY = _toWindow.scrollY,
        scrollX = _toWindow.scrollX;
      var offsetBy = {
        height: scrollY,
        width: scrollX
      };
      for (var dir in dirs$1) {
        var _iterator = _createForOfIteratorHelper(dirs$1[dir]),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var prop = _step.value;
            currentOffset[prop] += offsetBy[dir];
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }
    if (!coordinates) {
      return currentOffset;
    }
    var pos = css(element, 'position');
    each(css(element, ['left', 'top']), function (value, prop) {
      return css(element, prop, coordinates[prop] - currentOffset[prop] + toFloat(pos === 'absolute' && value === 'auto' ? position(element)[prop] : value));
    });
  }
  function position(element) {
    var _offset = offset(element),
      top = _offset.top,
      left = _offset.left;
    var _toNode = toNode(element),
      _toNode$ownerDocument = _toNode.ownerDocument,
      body = _toNode$ownerDocument.body,
      documentElement = _toNode$ownerDocument.documentElement,
      offsetParent = _toNode.offsetParent;
    var parent = offsetParent || documentElement;
    while (parent && (parent === body || parent === documentElement) && css(parent, 'position') === 'static') {
      parent = parent.parentNode;
    }
    if (isElement(parent)) {
      var parentOffset = offset(parent);
      top -= parentOffset.top + toFloat(css(parent, 'borderTopWidth'));
      left -= parentOffset.left + toFloat(css(parent, 'borderLeftWidth'));
    }
    return {
      top: top - toFloat(css(element, 'marginTop')),
      left: left - toFloat(css(element, 'marginLeft'))
    };
  }
  function offsetPosition(element) {
    element = toNode(element);
    var offset = [element.offsetTop, element.offsetLeft];
    while (element = element.offsetParent) {
      offset[0] += element.offsetTop + toFloat(css(element, "borderTopWidth"));
      offset[1] += element.offsetLeft + toFloat(css(element, "borderLeftWidth"));
      if (css(element, 'position') === 'fixed') {
        var win = toWindow(element);
        offset[0] += win.scrollY;
        offset[1] += win.scrollX;
        return offset;
      }
    }
    return offset;
  }
  var height = dimension('height');
  var width = dimension('width');
  function dimension(prop) {
    var propName = ucfirst(prop);
    return function (element, value) {
      if (isUndefined(value)) {
        if (isWindow(element)) {
          return element["inner".concat(propName)];
        }
        if (isDocument(element)) {
          var doc = element.documentElement;
          return Math.max(doc["offset".concat(propName)], doc["scroll".concat(propName)]);
        }
        element = toNode(element);
        value = css(element, prop);
        value = value === 'auto' ? element["offset".concat(propName)] : toFloat(value) || 0;
        return value - boxModelAdjust(element, prop);
      } else {
        return css(element, prop, !value && value !== 0 ? '' : +value + boxModelAdjust(element, prop) + 'px');
      }
    };
  }
  function boxModelAdjust(element, prop) {
    var sizing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'border-box';
    return css(element, 'boxSizing') === sizing ? dirs$1[prop].map(ucfirst).reduce(function (value, prop) {
      return value + toFloat(css(element, "padding".concat(prop))) + toFloat(css(element, "border".concat(prop, "Width")));
    }, 0) : 0;
  }
  function flipPosition(pos) {
    for (var dir in dirs$1) {
      for (var i in dirs$1[dir]) {
        if (dirs$1[dir][i] === pos) {
          return dirs$1[dir][1 - i];
        }
      }
    }
    return pos;
  }
  function toPx(value) {
    var property = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'width';
    var element = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window;
    var offsetDim = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    if (!isString(value)) {
      return toFloat(value);
    }
    return parseCalc(value).reduce(function (result, value) {
      var unit = parseUnit(value);
      if (unit) {
        value = percent(unit === 'vh' ? height(toWindow(element)) : unit === 'vw' ? width(toWindow(element)) : offsetDim ? element["offset".concat(ucfirst(property))] : dimensions$1(element)[property], value);
      }
      return result + toFloat(value);
    }, 0);
  }
  var calcRe = /-?\d+(?:\.\d+)?(?:v[wh]|%|px)?/g;
  var parseCalc = memoize(function (calc) {
    return calc.toString().replace(/\s/g, '').match(calcRe) || [];
  });
  var unitRe$1 = /(?:v[hw]|%)$/;
  var parseUnit = memoize(function (str) {
    return (str.match(unitRe$1) || [])[0];
  });
  function percent(base, value) {
    return base * toFloat(value) / 100;
  }

  function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
      return;
    }
    once(document, 'DOMContentLoaded', fn);
  }
  function isTag(element, tagName) {
    var _element$tagName;
    return (element === null || element === void 0 ? void 0 : (_element$tagName = element.tagName) === null || _element$tagName === void 0 ? void 0 : _element$tagName.toLowerCase()) === tagName.toLowerCase();
  }
  function empty(element) {
    element = $(element);
    element.innerHTML = '';
    return element;
  }
  function html(parent, html) {
    return isUndefined(html) ? $(parent).innerHTML : append(empty(parent), html);
  }
  var prepend = applyFn('prepend');
  var append = applyFn('append');
  var before = applyFn('before');
  var after = applyFn('after');
  function applyFn(fn) {
    return function (ref, element) {
      var _$;
      var nodes = toNodes(isString(element) ? fragment(element) : element);
      (_$ = $(ref)) === null || _$ === void 0 ? void 0 : _$[fn].apply(_$, _toConsumableArray(nodes));
      return unwrapSingle(nodes);
    };
  }
  function remove$1(element) {
    toNodes(element).forEach(function (element) {
      return element.remove();
    });
  }
  function wrapAll(element, structure) {
    structure = toNode(before(element, structure));
    while (structure.firstChild) {
      structure = structure.firstChild;
    }
    append(structure, element);
    return structure;
  }
  function wrapInner(element, structure) {
    return toNodes(toNodes(element).map(function (element) {
      return element.hasChildNodes() ? wrapAll(toNodes(element.childNodes), structure) : append(element, structure);
    }));
  }
  function unwrap(element) {
    toNodes(element).map(parent).filter(function (value, index, self) {
      return self.indexOf(value) === index;
    }).forEach(function (parent) {
      return parent.replaceWith.apply(parent, _toConsumableArray(parent.childNodes));
    });
  }
  var fragmentRe = /^\s*<(\w+|!)[^>]*>/;
  var singleTagRe = /^<(\w+)\s*\/?>(?:<\/\1>)?$/;
  function fragment(html) {
    var matches = singleTagRe.exec(html);
    if (matches) {
      return document.createElement(matches[1]);
    }
    var container = document.createElement('div');
    if (fragmentRe.test(html)) {
      container.insertAdjacentHTML('beforeend', html.trim());
    } else {
      container.textContent = html;
    }
    return unwrapSingle(container.childNodes);
  }
  function unwrapSingle(nodes) {
    return nodes.length > 1 ? nodes : nodes[0];
  }
  function apply(node, fn) {
    if (!isElement(node)) {
      return;
    }
    fn(node);
    node = node.firstElementChild;
    while (node) {
      var next = node.nextElementSibling;
      apply(node, fn);
      node = next;
    }
  }
  function $(selector, context) {
    return isHtml(selector) ? toNode(fragment(selector)) : find(selector, context);
  }
  function $$(selector, context) {
    return isHtml(selector) ? toNodes(fragment(selector)) : findAll(selector, context);
  }
  function isHtml(str) {
    return isString(str) && startsWith(str.trim(), '<');
  }

  var inBrowser = typeof window !== 'undefined';
  var isRtl = inBrowser && attr(document.documentElement, 'dir') === 'rtl';
  var hasTouch = inBrowser && 'ontouchstart' in window;
  var hasPointerEvents = inBrowser && window.PointerEvent;
  var pointerDown$1 = hasPointerEvents ? 'pointerdown' : hasTouch ? 'touchstart' : 'mousedown';
  var pointerMove$1 = hasPointerEvents ? 'pointermove' : hasTouch ? 'touchmove' : 'mousemove';
  var pointerUp$1 = hasPointerEvents ? 'pointerup' : hasTouch ? 'touchend' : 'mouseup';
  var pointerEnter = hasPointerEvents ? 'pointerenter' : hasTouch ? '' : 'mouseenter';
  var pointerLeave = hasPointerEvents ? 'pointerleave' : hasTouch ? '' : 'mouseleave';
  var pointerCancel = hasPointerEvents ? 'pointercancel' : 'touchcancel';

  /*
      Based on:
      Copyright (c) 2016 Wilson Page wilsonpage@me.com
      https://github.com/wilsonpage/fastdom
  */

  var fastdom = {
    reads: [],
    writes: [],
    read: function read(task) {
      this.reads.push(task);
      scheduleFlush();
      return task;
    },
    write: function write(task) {
      this.writes.push(task);
      scheduleFlush();
      return task;
    },
    clear: function clear(task) {
      remove(this.reads, task);
      remove(this.writes, task);
    },
    flush: flush
  };
  function flush(recursion) {
    runTasks(fastdom.reads);
    runTasks(fastdom.writes.splice(0));
    fastdom.scheduled = false;
    if (fastdom.reads.length || fastdom.writes.length) {
      scheduleFlush(recursion + 1);
    }
  }
  var RECURSION_LIMIT = 4;
  function scheduleFlush(recursion) {
    if (fastdom.scheduled) {
      return;
    }
    fastdom.scheduled = true;
    if (recursion && recursion < RECURSION_LIMIT) {
      Promise.resolve().then(function () {
        return flush(recursion);
      });
    } else {
      requestAnimationFrame(function () {
        return flush(1);
      });
    }
  }
  function runTasks(tasks) {
    var task;
    while (task = tasks.shift()) {
      try {
        task();
      } catch (e) {
        console.error(e);
      }
    }
  }
  function remove(array, item) {
    var index = array.indexOf(item);
    return ~index && array.splice(index, 1);
  }

  function MouseTracker() {}
  MouseTracker.prototype = {
    positions: [],
    init: function init() {
      var _this = this;
      this.positions = [];
      var position;
      this.unbind = on(document, 'mousemove', function (e) {
        return position = getEventPos(e);
      });
      this.interval = setInterval(function () {
        if (!position) {
          return;
        }
        _this.positions.push(position);
        if (_this.positions.length > 5) {
          _this.positions.shift();
        }
      }, 50);
    },
    cancel: function cancel() {
      var _this$unbind;
      (_this$unbind = this.unbind) === null || _this$unbind === void 0 ? void 0 : _this$unbind.call(this);
      this.interval && clearInterval(this.interval);
    },
    movesTo: function movesTo(target) {
      if (this.positions.length < 2) {
        return false;
      }
      var p = target.getBoundingClientRect();
      var left = p.left,
        right = p.right,
        top = p.top,
        bottom = p.bottom;
      var _this$positions = _slicedToArray(this.positions, 1),
        prevPosition = _this$positions[0];
      var position = last(this.positions);
      var path = [prevPosition, position];
      if (pointInRect(position, p)) {
        return false;
      }
      var diagonals = [[{
        x: left,
        y: top
      }, {
        x: right,
        y: bottom
      }], [{
        x: left,
        y: bottom
      }, {
        x: right,
        y: top
      }]];
      return diagonals.some(function (diagonal) {
        var intersection = intersect(path, diagonal);
        return intersection && pointInRect(intersection, p);
      });
    }
  };

  // Inspired by http://paulbourke.net/geometry/pointlineplane/
  function intersect(_ref, _ref2) {
    var _ref3 = _slicedToArray(_ref, 2),
      _ref3$ = _ref3[0],
      x1 = _ref3$.x,
      y1 = _ref3$.y,
      _ref3$2 = _ref3[1],
      x2 = _ref3$2.x,
      y2 = _ref3$2.y;
    var _ref4 = _slicedToArray(_ref2, 2),
      _ref4$ = _ref4[0],
      x3 = _ref4$.x,
      y3 = _ref4$.y,
      _ref4$2 = _ref4[1],
      x4 = _ref4$2.x,
      y4 = _ref4$2.y;
    var denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);

    // Lines are parallel
    if (denominator === 0) {
      return false;
    }
    var ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
    if (ua < 0) {
      return false;
    }

    // Return an object with the x and y coordinates of the intersection
    return {
      x: x1 + ua * (x2 - x1),
      y: y1 + ua * (y2 - y1)
    };
  }

  function observeIntersection(targets, cb, options) {
    var intersecting = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    var observer = new IntersectionObserver(intersecting ? function (entries, observer) {
      if (entries.some(function (entry) {
        return entry.isIntersecting;
      })) {
        cb(entries, observer);
      }
    } : cb, options);
    var _iterator = _createForOfIteratorHelper(toNodes(targets)),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var el = _step.value;
        observer.observe(el);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return observer;
  }
  var hasResizeObserver = inBrowser && window.ResizeObserver;
  function observeResize(targets, cb) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
      box: 'border-box'
    };
    if (hasResizeObserver) {
      return observe(ResizeObserver, targets, cb, options);
    }

    // Fallback Safari < 13.1
    initResizeListener();
    listeners.add(cb);
    return {
      disconnect: function disconnect() {
        listeners["delete"](cb);
      }
    };
  }
  var listeners;
  function initResizeListener() {
    if (listeners) {
      return;
    }
    listeners = new Set();

    // throttle 'resize'
    var pendingResize;
    var handleResize = function handleResize() {
      if (pendingResize) {
        return;
      }
      pendingResize = true;
      fastdom.read(function () {
        return pendingResize = false;
      });
      var _iterator2 = _createForOfIteratorHelper(listeners),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var listener = _step2.value;
          listener();
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    };
    on(window, 'load resize', handleResize);
    on(document, 'loadedmetadata load', handleResize, true);
  }
  function observeMutation(targets, cb, options) {
    return observe(MutationObserver, targets, cb, options);
  }
  function observe(Observer, targets, cb, options) {
    var observer = new Observer(cb);
    var _iterator3 = _createForOfIteratorHelper(toNodes(targets)),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var el = _step3.value;
        observer.observe(el, options);
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    return observer;
  }

  var strats = {};
  strats.events = strats.created = strats.beforeConnect = strats.connected = strats.beforeDisconnect = strats.disconnected = strats.destroy = concatStrat;

  // args strategy
  strats.args = function (parentVal, childVal) {
    return childVal !== false && concatStrat(childVal || parentVal);
  };

  // update strategy
  strats.update = function (parentVal, childVal) {
    return sortBy$1(concatStrat(parentVal, isFunction(childVal) ? {
      read: childVal
    } : childVal), 'order');
  };

  // property strategy
  strats.props = function (parentVal, childVal) {
    if (isArray(childVal)) {
      var value = {};
      var _iterator = _createForOfIteratorHelper(childVal),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var key = _step.value;
          value[key] = String;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      childVal = value;
    }
    return strats.methods(parentVal, childVal);
  };

  // extend strategy
  strats.computed = strats.methods = function (parentVal, childVal) {
    return childVal ? parentVal ? _objectSpread2(_objectSpread2({}, parentVal), childVal) : childVal : parentVal;
  };

  // data strategy
  strats.data = function (parentVal, childVal, vm) {
    if (!vm) {
      if (!childVal) {
        return parentVal;
      }
      if (!parentVal) {
        return childVal;
      }
      return function (vm) {
        return mergeFnData(parentVal, childVal, vm);
      };
    }
    return mergeFnData(parentVal, childVal, vm);
  };
  function mergeFnData(parentVal, childVal, vm) {
    return strats.computed(isFunction(parentVal) ? parentVal.call(vm, vm) : parentVal, isFunction(childVal) ? childVal.call(vm, vm) : childVal);
  }

  // concat strategy
  function concatStrat(parentVal, childVal) {
    parentVal = parentVal && !isArray(parentVal) ? [parentVal] : parentVal;
    return childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
  }

  // default strategy
  function defaultStrat(parentVal, childVal) {
    return isUndefined(childVal) ? parentVal : childVal;
  }
  function mergeOptions(parent, child, vm) {
    var options = {};
    if (isFunction(child)) {
      child = child.options;
    }
    if (child["extends"]) {
      parent = mergeOptions(parent, child["extends"], vm);
    }
    if (child.mixins) {
      var _iterator2 = _createForOfIteratorHelper(child.mixins),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var mixin = _step2.value;
          parent = mergeOptions(parent, mixin, vm);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
    for (var key in parent) {
      mergeKey(key);
    }
    for (var _key in child) {
      if (!hasOwn(parent, _key)) {
        mergeKey(_key);
      }
    }
    function mergeKey(key) {
      options[key] = (strats[key] || defaultStrat)(parent[key], child[key], vm);
    }
    return options;
  }
  function parseOptions(options) {
    var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    try {
      return options ? startsWith(options, '{') ? JSON.parse(options) : args.length && !includes(options, ':') ? _defineProperty({}, args[0], options) : options.split(';').reduce(function (options, option) {
        var _option$split = option.split(/:(.*)/),
          _option$split2 = _slicedToArray(_option$split, 2),
          key = _option$split2[0],
          value = _option$split2[1];
        if (key && !isUndefined(value)) {
          options[key.trim()] = value.trim();
        }
        return options;
      }, {}) : {};
    } catch (e) {
      return {};
    }
  }

  function play(el) {
    if (isIFrame(el)) {
      call(el, {
        func: 'playVideo',
        method: 'play'
      });
    }
    if (isHTML5(el)) {
      try {
        el.play()["catch"](noop);
      } catch (e) {
        // noop
      }
    }
  }
  function pause(el) {
    if (isIFrame(el)) {
      call(el, {
        func: 'pauseVideo',
        method: 'pause'
      });
    }
    if (isHTML5(el)) {
      el.pause();
    }
  }
  function mute(el) {
    if (isIFrame(el)) {
      call(el, {
        func: 'mute',
        method: 'setVolume',
        value: 0
      });
    }
    if (isHTML5(el)) {
      el.muted = true;
    }
  }
  function isVideo(el) {
    return isHTML5(el) || isIFrame(el);
  }
  function isHTML5(el) {
    return isTag(el, 'video');
  }
  function isIFrame(el) {
    return isTag(el, 'iframe') && (isYoutube(el) || isVimeo(el));
  }
  function isYoutube(el) {
    return !!el.src.match(/\/\/.*?youtube(-nocookie)?\.[a-z]+\/(watch\?v=[^&\s]+|embed)|youtu\.be\/.*/);
  }
  function isVimeo(el) {
    return !!el.src.match(/vimeo\.com\/video\/.*/);
  }
  function call(_x, _x2) {
    return _call.apply(this, arguments);
  }
  function _call() {
    _call = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(el, cmd) {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return enableApi(el);
            case 2:
              post(el, cmd);
            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _call.apply(this, arguments);
  }
  function post(el, cmd) {
    try {
      el.contentWindow.postMessage(JSON.stringify(_objectSpread2({
        event: 'command'
      }, cmd)), '*');
    } catch (e) {
      // noop
    }
  }
  var stateKey = '_ukPlayer';
  var counter = 0;
  function enableApi(el) {
    if (el[stateKey]) {
      return el[stateKey];
    }
    var youtube = isYoutube(el);
    var vimeo = isVimeo(el);
    var id = ++counter;
    var poller;
    return el[stateKey] = new Promise(function (resolve) {
      youtube && once(el, 'load', function () {
        var listener = function listener() {
          return post(el, {
            event: 'listening',
            id: id
          });
        };
        poller = setInterval(listener, 100);
        listener();
      });
      once(window, 'message', resolve, false, function (_ref) {
        var data = _ref.data;
        try {
          data = JSON.parse(data);
          return data && (youtube && data.id === id && data.event === 'onReady' || vimeo && Number(data.player_id) === id);
        } catch (e) {
          // noop
        }
      });
      el.src = "".concat(el.src).concat(includes(el.src, '?') ? '&' : '?').concat(youtube ? 'enablejsapi=1' : "api=1&player_id=".concat(id));
    }).then(function () {
      return clearInterval(poller);
    });
  }

  function isInView(element) {
    var offsetTop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var offsetLeft = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    if (!isVisible(element)) {
      return false;
    }
    return intersectRect.apply(void 0, _toConsumableArray(scrollParents(element).map(function (parent) {
      var _offsetViewport = offsetViewport(parent),
        top = _offsetViewport.top,
        left = _offsetViewport.left,
        bottom = _offsetViewport.bottom,
        right = _offsetViewport.right;
      return {
        top: top - offsetTop,
        left: left - offsetLeft,
        bottom: bottom + offsetTop,
        right: right + offsetLeft
      };
    }).concat(offset(element))));
  }
  function scrollIntoView(element) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$offset = _ref.offset,
      offsetBy = _ref$offset === void 0 ? 0 : _ref$offset;
    var parents = isVisible(element) ? scrollParents(element) : [];
    return parents.reduce(function (fn, scrollElement, i) {
      var scrollTop = scrollElement.scrollTop,
        scrollHeight = scrollElement.scrollHeight,
        offsetHeight = scrollElement.offsetHeight;
      var viewport = offsetViewport(scrollElement);
      var maxScroll = scrollHeight - viewport.height;
      var _ref2 = parents[i - 1] ? offsetViewport(parents[i - 1]) : offset(element),
        elHeight = _ref2.height,
        elTop = _ref2.top;
      var top = Math.ceil(elTop - viewport.top - offsetBy + scrollTop);
      if (offsetBy > 0 && offsetHeight < elHeight + offsetBy) {
        top += offsetBy;
      } else {
        offsetBy = 0;
      }
      if (top > maxScroll) {
        offsetBy -= top - maxScroll;
        top = maxScroll;
      } else if (top < 0) {
        offsetBy -= top;
        top = 0;
      }
      return function () {
        return scrollTo(scrollElement, top - scrollTop).then(fn);
      };
    }, function () {
      return Promise.resolve();
    })();
    function scrollTo(element, top) {
      return new Promise(function (resolve) {
        var scroll = element.scrollTop;
        var duration = getDuration(Math.abs(top));
        var start = Date.now();
        (function step() {
          var percent = ease(clamp((Date.now() - start) / duration));
          element.scrollTop = scroll + top * percent;

          // scroll more if we have not reached our destination
          if (percent === 1) {
            resolve();
          } else {
            requestAnimationFrame(step);
          }
        })();
      });
    }
    function getDuration(dist) {
      return 40 * Math.pow(dist, 0.375);
    }
    function ease(k) {
      return 0.5 * (1 - Math.cos(Math.PI * k));
    }
  }
  function scrolledOver(element) {
    var startOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var endOffset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    if (!isVisible(element)) {
      return 0;
    }
    var _scrollParents = scrollParents(element, /auto|scroll/, true),
      _scrollParents2 = _slicedToArray(_scrollParents, 1),
      scrollElement = _scrollParents2[0];
    var scrollHeight = scrollElement.scrollHeight,
      scrollTop = scrollElement.scrollTop;
    var _offsetViewport2 = offsetViewport(scrollElement),
      viewportHeight = _offsetViewport2.height;
    var maxScroll = scrollHeight - viewportHeight;
    var elementOffsetTop = offsetPosition(element)[0] - offsetPosition(scrollElement)[0];
    var start = Math.max(0, elementOffsetTop - viewportHeight + startOffset);
    var end = Math.min(maxScroll, elementOffsetTop + element.offsetHeight - endOffset);
    return clamp((scrollTop - start) / (end - start));
  }
  function scrollParents(element) {
    var overflowRe = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : /auto|scroll|hidden|clip/;
    var scrollable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var scrollEl = scrollingElement(element);
    var ancestors = parents(element).reverse();
    ancestors = ancestors.slice(ancestors.indexOf(scrollEl) + 1);
    var fixedIndex = findIndex(ancestors, function (el) {
      return css(el, 'position') === 'fixed';
    });
    if (~fixedIndex) {
      ancestors = ancestors.slice(fixedIndex);
    }
    return [scrollEl].concat(ancestors.filter(function (parent) {
      return overflowRe.test(css(parent, 'overflow')) && (!scrollable || parent.scrollHeight > offsetViewport(parent).height);
    })).reverse();
  }
  function offsetViewport(scrollElement) {
    var window = toWindow(scrollElement);
    var documentElement = window.document.documentElement;
    var viewportElement = scrollElement === scrollingElement(scrollElement) ? window : scrollElement;
    var visualViewport = window.visualViewport;
    if (isWindow(viewportElement) && visualViewport) {
      var height = visualViewport.height,
        width = visualViewport.width,
        scale = visualViewport.scale,
        top = visualViewport.pageTop,
        left = visualViewport.pageLeft;
      height = Math.round(height * scale);
      width = Math.round(width * scale);
      return {
        height: height,
        width: width,
        top: top,
        left: left,
        bottom: top + height,
        right: left + width
      };
    }
    var rect = offset(viewportElement);
    for (var _i = 0, _arr = [['width', 'x', 'left', 'right'], ['height', 'y', 'top', 'bottom']]; _i < _arr.length; _i++) {
      var _arr$_i = _slicedToArray(_arr[_i], 4),
        prop = _arr$_i[0],
        dir = _arr$_i[1],
        start = _arr$_i[2],
        end = _arr$_i[3];
      if (isWindow(viewportElement)) {
        // iOS 12 returns <body> as scrollingElement
        viewportElement = documentElement;
      } else {
        rect[start] += toFloat(css(viewportElement, "border-".concat(start, "-width")));
      }
      rect[prop] = rect[dir] = viewportElement["client".concat(ucfirst(prop))];
      rect[end] = rect[prop] + rect[start];
    }
    return rect;
  }
  function scrollingElement(element) {
    return toWindow(element).document.scrollingElement;
  }

  var dirs = [['width', 'x', 'left', 'right'], ['height', 'y', 'top', 'bottom']];
  function positionAt(element, target, options) {
    options = _objectSpread2({
      attach: _objectSpread2({
        element: ['left', 'top'],
        target: ['left', 'top']
      }, options.attach),
      offset: [0, 0],
      placement: []
    }, options);
    if (!isArray(target)) {
      target = [target, target];
    }
    offset(element, getPosition(element, target, options));
  }
  function getPosition(element, target, options) {
    var position = attachTo(element, target, options);
    var boundary = options.boundary,
      _options$viewportOffs = options.viewportOffset,
      viewportOffset = _options$viewportOffs === void 0 ? 0 : _options$viewportOffs,
      placement = options.placement;
    var offsetPosition = position;
    for (var _i = 0, _Object$entries = Object.entries(dirs); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        i = _Object$entries$_i[0],
        _Object$entries$_i$ = _slicedToArray(_Object$entries$_i[1], 4),
        prop = _Object$entries$_i$[0],
        start = _Object$entries$_i$[2],
        end = _Object$entries$_i$[3];
      var viewport = getViewport$1(target[i], viewportOffset, boundary, i);
      if (isWithin(position, viewport, i)) {
        continue;
      }
      var offsetBy = 0;

      // Flip
      if (placement[i] === 'flip') {
        var attach = options.attach.target[i];
        if (attach === end && position[end] <= viewport[end] || attach === start && position[start] >= viewport[start]) {
          continue;
        }
        offsetBy = flip(element, target, options, i)[start] - position[start];
        var scrollArea = getScrollArea(target[i], viewportOffset, i);
        if (!isWithin(applyOffset(position, offsetBy, i), scrollArea, i)) {
          if (isWithin(position, scrollArea, i)) {
            continue;
          }
          if (options.recursion) {
            return false;
          }
          var newPos = flipAxis(element, target, options);
          if (newPos && isWithin(newPos, scrollArea, 1 - i)) {
            return newPos;
          }
          continue;
        }

        // Shift
      } else if (placement[i] === 'shift') {
        var targetDim = offset(target[i]);
        var elOffset = options.offset;
        offsetBy = clamp(clamp(position[start], viewport[start], viewport[end] - position[prop]), targetDim[start] - position[prop] + elOffset[i], targetDim[end] - elOffset[i]) - position[start];
      }
      offsetPosition = applyOffset(offsetPosition, offsetBy, i);
    }
    return offsetPosition;
  }
  function attachTo(element, target, options) {
    var _attach$offset$option = _objectSpread2({
        attach: _objectSpread2({
          element: ['left', 'top'],
          target: ['left', 'top']
        }, options.attach),
        offset: [0, 0]
      }, options),
      attach = _attach$offset$option.attach,
      offsetBy = _attach$offset$option.offset;
    var elOffset = offset(element);
    for (var _i2 = 0, _Object$entries2 = Object.entries(dirs); _i2 < _Object$entries2.length; _i2++) {
      var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
        i = _Object$entries2$_i[0],
        _Object$entries2$_i$ = _slicedToArray(_Object$entries2$_i[1], 4),
        prop = _Object$entries2$_i$[0],
        start = _Object$entries2$_i$[2],
        end = _Object$entries2$_i$[3];
      var targetOffset = attach.target[i] === attach.element[i] ? offsetViewport(target[i]) : offset(target[i]);
      elOffset = applyOffset(elOffset, targetOffset[start] - elOffset[start] + moveBy(attach.target[i], end, targetOffset[prop]) - moveBy(attach.element[i], end, elOffset[prop]) + +offsetBy[i], i);
    }
    return elOffset;
  }
  function applyOffset(position, offset, i) {
    var _dirs$i = _slicedToArray(dirs[i], 4),
      dir = _dirs$i[1],
      start = _dirs$i[2],
      end = _dirs$i[3];
    var newPos = _objectSpread2({}, position);
    newPos[start] = position[dir] = position[start] + offset;
    newPos[end] += offset;
    return newPos;
  }
  function moveBy(attach, end, dim) {
    return attach === 'center' ? dim / 2 : attach === end ? dim : 0;
  }
  function getViewport$1(element, viewportOffset, boundary, i) {
    var viewport = getIntersectionArea.apply(void 0, _toConsumableArray(scrollParents(element).map(offsetViewport)));
    if (viewportOffset) {
      viewport[dirs[i][2]] += viewportOffset;
      viewport[dirs[i][3]] -= viewportOffset;
    }
    if (boundary) {
      viewport = getIntersectionArea(viewport, offset(boundary));
    }
    return viewport;
  }
  function getScrollArea(element, viewportOffset, i) {
    var _dirs$i2 = _slicedToArray(dirs[i], 4),
      prop = _dirs$i2[0],
      start = _dirs$i2[2],
      end = _dirs$i2[3];
    var _scrollParents = scrollParents(element),
      _scrollParents2 = _slicedToArray(_scrollParents, 1),
      scrollElement = _scrollParents2[0];
    var viewport = offsetViewport(scrollElement);
    viewport[start] -= scrollElement["scroll".concat(ucfirst(start))] - viewportOffset;
    viewport[end] = viewport[start] + scrollElement["scroll".concat(ucfirst(prop))] - viewportOffset;
    return viewport;
  }
  function getIntersectionArea() {
    var area = {};
    for (var _len = arguments.length, rects = new Array(_len), _key = 0; _key < _len; _key++) {
      rects[_key] = arguments[_key];
    }
    for (var _i3 = 0, _rects = rects; _i3 < _rects.length; _i3++) {
      var rect = _rects[_i3];
      var _iterator = _createForOfIteratorHelper(dirs),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _slicedToArray(_step.value, 4),
            start = _step$value[2],
            end = _step$value[3];
          area[start] = Math.max(area[start] || 0, rect[start]);
          area[end] = Math.min.apply(Math, _toConsumableArray([area[end], rect[end]].filter(Boolean)));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    return area;
  }
  function isWithin(positionA, positionB, i) {
    var _dirs$i3 = _slicedToArray(dirs[i], 4),
      start = _dirs$i3[2],
      end = _dirs$i3[3];
    return positionA[start] >= positionB[start] && positionA[end] <= positionB[end];
  }
  function flip(element, target, _ref, i) {
    var offset = _ref.offset,
      attach = _ref.attach;
    return attachTo(element, target, {
      attach: {
        element: flipAttach(attach.element, i),
        target: flipAttach(attach.target, i)
      },
      offset: flipOffset(offset, i)
    });
  }
  function flipAxis(element, target, options) {
    return getPosition(element, target, _objectSpread2(_objectSpread2({}, options), {}, {
      attach: {
        element: options.attach.element.map(flipAttachAxis).reverse(),
        target: options.attach.target.map(flipAttachAxis).reverse()
      },
      offset: options.offset.reverse(),
      placement: options.placement.reverse(),
      recursion: true
    }));
  }
  function flipAttach(attach, i) {
    var newAttach = _toConsumableArray(attach);
    var index = dirs[i].indexOf(attach[i]);
    if (~index) {
      newAttach[i] = dirs[i][1 - index % 2 + 2];
    }
    return newAttach;
  }
  function flipAttachAxis(prop) {
    for (var i = 0; i < dirs.length; i++) {
      var index = dirs[i].indexOf(prop);
      if (~index) {
        return dirs[1 - i][index % 2 + 2];
      }
    }
  }
  function flipOffset(offset, i) {
    offset = _toConsumableArray(offset);
    offset[i] *= -1;
    return offset;
  }

  var util = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ajax: ajax,
    getImage: getImage,
    Transition: Transition,
    Animation: Animation,
    attr: attr,
    hasAttr: hasAttr,
    removeAttr: removeAttr,
    data: data,
    addClass: addClass,
    removeClass: removeClass,
    removeClasses: removeClasses,
    replaceClass: replaceClass,
    hasClass: hasClass,
    toggleClass: toggleClass,
    dimensions: dimensions$1,
    offset: offset,
    position: position,
    offsetPosition: offsetPosition,
    height: height,
    width: width,
    boxModelAdjust: boxModelAdjust,
    flipPosition: flipPosition,
    toPx: toPx,
    ready: ready,
    isTag: isTag,
    empty: empty,
    html: html,
    prepend: prepend,
    append: append,
    before: before,
    after: after,
    remove: remove$1,
    wrapAll: wrapAll,
    wrapInner: wrapInner,
    unwrap: unwrap,
    fragment: fragment,
    apply: apply,
    $: $,
    $$: $$,
    inBrowser: inBrowser,
    isRtl: isRtl,
    hasTouch: hasTouch,
    pointerDown: pointerDown$1,
    pointerMove: pointerMove$1,
    pointerUp: pointerUp$1,
    pointerEnter: pointerEnter,
    pointerLeave: pointerLeave,
    pointerCancel: pointerCancel,
    on: on,
    off: off,
    once: once,
    trigger: trigger,
    createEvent: createEvent,
    toEventTargets: toEventTargets,
    isTouch: isTouch,
    getEventPos: getEventPos,
    fastdom: fastdom,
    isVoidElement: isVoidElement,
    isVisible: isVisible,
    selInput: selInput,
    isInput: isInput,
    selFocusable: selFocusable,
    isFocusable: isFocusable,
    parent: parent,
    filter: filter$1,
    matches: matches,
    closest: closest,
    within: within,
    parents: parents,
    children: children,
    index: index,
    hasOwn: hasOwn,
    hyphenate: hyphenate,
    camelize: camelize,
    ucfirst: ucfirst,
    startsWith: startsWith,
    endsWith: endsWith,
    includes: includes,
    findIndex: findIndex,
    isArray: isArray,
    toArray: toArray,
    assign: assign,
    isFunction: isFunction,
    isObject: isObject,
    isPlainObject: isPlainObject,
    isWindow: isWindow,
    isDocument: isDocument,
    isNode: isNode,
    isElement: isElement,
    isBoolean: isBoolean,
    isString: isString,
    isNumber: isNumber,
    isNumeric: isNumeric,
    isEmpty: isEmpty,
    isUndefined: isUndefined,
    toBoolean: toBoolean,
    toNumber: toNumber,
    toFloat: toFloat,
    toNode: toNode,
    toNodes: toNodes,
    toWindow: toWindow,
    isEqual: isEqual,
    swap: swap,
    last: last,
    each: each,
    sortBy: sortBy$1,
    uniqueBy: uniqueBy,
    clamp: clamp,
    noop: noop,
    intersectRect: intersectRect,
    pointInRect: pointInRect,
    Dimensions: Dimensions,
    getIndex: getIndex,
    memoize: memoize,
    Deferred: Deferred,
    MouseTracker: MouseTracker,
    observeIntersection: observeIntersection,
    observeResize: observeResize,
    observeMutation: observeMutation,
    mergeOptions: mergeOptions,
    parseOptions: parseOptions,
    play: play,
    pause: pause,
    mute: mute,
    isVideo: isVideo,
    positionAt: positionAt,
    query: query,
    queryAll: queryAll,
    find: find,
    findAll: findAll,
    escape: escape,
    css: css,
    propName: propName,
    isInView: isInView,
    scrollIntoView: scrollIntoView,
    scrolledOver: scrolledOver,
    scrollParents: scrollParents,
    offsetViewport: offsetViewport
  });

  function globalAPI (UIkit) {
    var DATA = UIkit.data;
    UIkit.use = function (plugin) {
      if (plugin.installed) {
        return;
      }
      plugin.call(null, this);
      plugin.installed = true;
      return this;
    };
    UIkit.mixin = function (mixin, component) {
      component = (isString(component) ? UIkit.component(component) : component) || this;
      component.options = mergeOptions(component.options, mixin);
    };
    UIkit.extend = function (options) {
      options = options || {};
      var Super = this;
      var Sub = function UIkitComponent(options) {
        this._init(options);
      };
      Sub.prototype = Object.create(Super.prototype);
      Sub.prototype.constructor = Sub;
      Sub.options = mergeOptions(Super.options, options);
      Sub["super"] = Super;
      Sub.extend = Super.extend;
      return Sub;
    };
    UIkit.update = function (element, e) {
      element = element ? toNode(element) : document.body;
      var _iterator = _createForOfIteratorHelper(parents(element).reverse()),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var parentEl = _step.value;
          update(parentEl[DATA], e);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      apply(element, function (element) {
        return update(element[DATA], e);
      });
    };
    var container;
    Object.defineProperty(UIkit, 'container', {
      get: function get() {
        return container || document.body;
      },
      set: function set(element) {
        container = $(element);
      }
    });
    function update(data, e) {
      if (!data) {
        return;
      }
      for (var name in data) {
        if (data[name]._connected) {
          data[name]._callUpdate(e);
        }
      }
    }
  }

  function hooksAPI (UIkit) {
    UIkit.prototype._callHook = function (hook) {
      var _this$$options$hook,
        _this = this;
      (_this$$options$hook = this.$options[hook]) === null || _this$$options$hook === void 0 ? void 0 : _this$$options$hook.forEach(function (handler) {
        return handler.call(_this);
      });
    };
    UIkit.prototype._callConnected = function () {
      if (this._connected) {
        return;
      }
      this._data = {};
      this._computed = {};
      this._initProps();
      this._callHook('beforeConnect');
      this._connected = true;
      this._initEvents();
      this._initObservers();
      this._callHook('connected');
      this._callUpdate();
    };
    UIkit.prototype._callDisconnected = function () {
      if (!this._connected) {
        return;
      }
      this._callHook('beforeDisconnect');
      this._disconnectObservers();
      this._unbindEvents();
      this._callHook('disconnected');
      this._connected = false;
      delete this._watch;
    };
    UIkit.prototype._callUpdate = function () {
      var _this2 = this;
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'update';
      if (!this._connected) {
        return;
      }
      if (e === 'update' || e === 'resize') {
        this._callWatches();
      }
      if (!this.$options.update) {
        return;
      }
      if (!this._updates) {
        this._updates = new Set();
        fastdom.read(function () {
          if (_this2._connected) {
            runUpdates.call(_this2, _this2._updates);
          }
          delete _this2._updates;
        });
      }
      this._updates.add(e.type || e);
    };
    UIkit.prototype._callWatches = function () {
      var _this3 = this;
      if (this._watch) {
        return;
      }
      var initial = !hasOwn(this, '_watch');
      this._watch = fastdom.read(function () {
        if (_this3._connected) {
          runWatches.call(_this3, initial);
        }
        _this3._watch = null;
      });
    };
    function runUpdates(types) {
      var _this4 = this;
      var _iterator = _createForOfIteratorHelper(this.$options.update),
        _step;
      try {
        var _loop = function _loop() {
          var _step$value = _step.value,
            read = _step$value.read,
            write = _step$value.write,
            _step$value$events = _step$value.events,
            events = _step$value$events === void 0 ? [] : _step$value$events;
          if (!types.has('update') && !events.some(function (type) {
            return types.has(type);
          })) {
            return "continue";
          }
          var result = void 0;
          if (read) {
            result = read.call(_this4, _this4._data, types);
            if (result && isPlainObject(result)) {
              assign(_this4._data, result);
            }
          }
          if (write && result !== false) {
            fastdom.write(function () {
              if (_this4._connected) {
                write.call(_this4, _this4._data, types);
              }
            });
          }
        };
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _ret = _loop();
          if (_ret === "continue") continue;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    function runWatches(initial) {
      var computed = this.$options.computed;
      var values = _objectSpread2({}, this._computed);
      this._computed = {};
      for (var key in computed) {
        var _computed$key = computed[key],
          watch = _computed$key.watch,
          immediate = _computed$key.immediate;
        if (watch && (initial && immediate || hasOwn(values, key) && !isEqual(values[key], this[key]))) {
          watch.call(this, this[key], values[key]);
        }
      }
    }
  }

  function stateAPI (UIkit) {
    var uid = 0;
    UIkit.prototype._init = function (options) {
      options = options || {};
      options.data = normalizeData(options, this.constructor.options);
      this.$options = mergeOptions(this.constructor.options, options, this);
      this.$el = null;
      this.$props = {};
      this._uid = uid++;
      this._initData();
      this._initMethods();
      this._initComputeds();
      this._callHook('created');
      if (options.el) {
        this.$mount(options.el);
      }
    };
    UIkit.prototype._initData = function () {
      var _this$$options$data = this.$options.data,
        data = _this$$options$data === void 0 ? {} : _this$$options$data;
      for (var key in data) {
        this.$props[key] = this[key] = data[key];
      }
    };
    UIkit.prototype._initMethods = function () {
      var methods = this.$options.methods;
      if (methods) {
        for (var key in methods) {
          this[key] = methods[key].bind(this);
        }
      }
    };
    UIkit.prototype._initComputeds = function () {
      var computed = this.$options.computed;
      this._computed = {};
      if (computed) {
        for (var key in computed) {
          registerComputed(this, key, computed[key]);
        }
      }
    };
    UIkit.prototype._initProps = function (props) {
      var key;
      props = props || getProps$1(this.$options, this.$name);
      for (key in props) {
        if (!isUndefined(props[key])) {
          this.$props[key] = props[key];
        }
      }
      var exclude = [this.$options.computed, this.$options.methods];
      for (key in this.$props) {
        if (key in props && notIn(exclude, key)) {
          this[key] = this.$props[key];
        }
      }
    };
    UIkit.prototype._initEvents = function () {
      this._events = [];
      var _iterator = _createForOfIteratorHelper(this.$options.events || []),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var event = _step.value;
          if (hasOwn(event, 'handler')) {
            registerEvent(this, event);
          } else {
            for (var key in event) {
              registerEvent(this, event[key], key);
            }
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    };
    UIkit.prototype._unbindEvents = function () {
      this._events.forEach(function (unbind) {
        return unbind();
      });
      delete this._events;
    };
    UIkit.prototype._initObservers = function () {
      this._observers = [initPropsObserver(this)];
      if (this.$options.computed) {
        this.registerObserver(initChildListObserver(this));
      }
    };
    UIkit.prototype.registerObserver = function (observer) {
      this._observers.push(observer);
    };
    UIkit.prototype._disconnectObservers = function () {
      this._observers.forEach(function (observer) {
        return observer === null || observer === void 0 ? void 0 : observer.disconnect();
      });
    };
  }
  function getProps$1(opts, name) {
    var data$1 = {};
    var _opts$args = opts.args,
      args = _opts$args === void 0 ? [] : _opts$args,
      _opts$props = opts.props,
      props = _opts$props === void 0 ? {} : _opts$props,
      el = opts.el;
    if (!props) {
      return data$1;
    }
    for (var key in props) {
      var prop = hyphenate(key);
      var value = data(el, prop);
      if (isUndefined(value)) {
        continue;
      }
      value = props[key] === Boolean && value === '' ? true : coerce$1(props[key], value);
      if (prop === 'target' && startsWith(value, '_')) {
        continue;
      }
      data$1[key] = value;
    }
    var options = parseOptions(data(el, name), args);
    for (var _key in options) {
      var _prop = camelize(_key);
      if (!isUndefined(props[_prop])) {
        data$1[_prop] = coerce$1(props[_prop], options[_key]);
      }
    }
    return data$1;
  }
  function registerComputed(component, key, cb) {
    Object.defineProperty(component, key, {
      enumerable: true,
      get: function get() {
        var _computed = component._computed,
          $props = component.$props,
          $el = component.$el;
        if (!hasOwn(_computed, key)) {
          _computed[key] = (cb.get || cb).call(component, $props, $el);
        }
        return _computed[key];
      },
      set: function set(value) {
        var _computed = component._computed;
        _computed[key] = cb.set ? cb.set.call(component, value) : value;
        if (isUndefined(_computed[key])) {
          delete _computed[key];
        }
      }
    });
  }
  function registerEvent(component, event, key) {
    if (!isPlainObject(event)) {
      event = {
        name: key,
        handler: event
      };
    }
    var _event = event,
      name = _event.name,
      el = _event.el,
      handler = _event.handler,
      capture = _event.capture,
      passive = _event.passive,
      delegate = _event.delegate,
      filter = _event.filter,
      self = _event.self;
    el = isFunction(el) ? el.call(component) : el || component.$el;
    if (isArray(el)) {
      el.forEach(function (el) {
        return registerEvent(component, _objectSpread2(_objectSpread2({}, event), {}, {
          el: el
        }), key);
      });
      return;
    }
    if (!el || filter && !filter.call(component)) {
      return;
    }
    component._events.push(on(el, name, delegate ? isString(delegate) ? delegate : delegate.call(component) : null, isString(handler) ? component[handler] : handler.bind(component), {
      passive: passive,
      capture: capture,
      self: self
    }));
  }
  function notIn(options, key) {
    return options.every(function (arr) {
      return !arr || !hasOwn(arr, key);
    });
  }
  function coerce$1(type, value) {
    if (type === Boolean) {
      return toBoolean(value);
    } else if (type === Number) {
      return toNumber(value);
    } else if (type === 'list') {
      return toList(value);
    }
    return type ? type(value) : value;
  }
  function toList(value) {
    return isArray(value) ? value : isString(value) ? value.split(/,(?![^(]*\))/).map(function (value) {
      return isNumeric(value) ? toNumber(value) : toBoolean(value.trim());
    }) : [value];
  }
  function normalizeData(_ref, _ref2) {
    var _ref$data = _ref.data,
      data = _ref$data === void 0 ? {} : _ref$data;
    var _ref2$args = _ref2.args,
      args = _ref2$args === void 0 ? [] : _ref2$args,
      _ref2$props = _ref2.props,
      props = _ref2$props === void 0 ? {} : _ref2$props;
    if (isArray(data)) {
      data = data.slice(0, args.length).reduce(function (data, value, index) {
        if (isPlainObject(value)) {
          assign(data, value);
        } else {
          data[args[index]] = value;
        }
        return data;
      }, {});
    }
    for (var key in data) {
      if (isUndefined(data[key])) {
        delete data[key];
      } else if (props[key]) {
        data[key] = coerce$1(props[key], data[key]);
      }
    }
    return data;
  }
  function initChildListObserver(component) {
    var el = component.$options.el;
    var observer = new MutationObserver(function () {
      return component.$emit();
    });
    observer.observe(el, {
      childList: true,
      subtree: true
    });
    return observer;
  }
  function initPropsObserver(component) {
    var $name = component.$name,
      $options = component.$options,
      $props = component.$props;
    var attrs = $options.attrs,
      props = $options.props,
      el = $options.el;
    if (!props || attrs === false) {
      return;
    }
    var attributes = isArray(attrs) ? attrs : Object.keys(props);
    var filter = attributes.map(function (key) {
      return hyphenate(key);
    }).concat($name);
    var observer = new MutationObserver(function (records) {
      var data = getProps$1($options, $name);
      if (records.some(function (_ref3) {
        var attributeName = _ref3.attributeName;
        var prop = attributeName.replace('data-', '');
        return (prop === $name ? attributes : [camelize(prop), camelize(attributeName)]).some(function (prop) {
          return !isUndefined(data[prop]) && data[prop] !== $props[prop];
        });
      })) {
        component.$reset();
      }
    });
    observer.observe(el, {
      attributes: true,
      attributeFilter: filter.concat(filter.map(function (key) {
        return "data-".concat(key);
      }))
    });
    return observer;
  }

  function instanceAPI (UIkit) {
    var DATA = UIkit.data;
    UIkit.prototype.$create = function (component, element, data) {
      return UIkit[component](element, data);
    };
    UIkit.prototype.$mount = function (el) {
      var name = this.$options.name;
      if (!el[DATA]) {
        el[DATA] = {};
      }
      if (el[DATA][name]) {
        return;
      }
      el[DATA][name] = this;
      this.$el = this.$options.el = this.$options.el || el;
      if (within(el, document)) {
        this._callConnected();
      }
    };
    UIkit.prototype.$reset = function () {
      this._callDisconnected();
      this._callConnected();
    };
    UIkit.prototype.$destroy = function () {
      var removeEl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var _this$$options = this.$options,
        el = _this$$options.el,
        name = _this$$options.name;
      if (el) {
        this._callDisconnected();
      }
      this._callHook('destroy');
      if (!(el !== null && el !== void 0 && el[DATA])) {
        return;
      }
      delete el[DATA][name];
      if (!isEmpty(el[DATA])) {
        delete el[DATA];
      }
      if (removeEl) {
        remove$1(this.$el);
      }
    };
    UIkit.prototype.$emit = function (e) {
      this._callUpdate(e);
    };
    UIkit.prototype.$update = function () {
      var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.$el;
      var e = arguments.length > 1 ? arguments[1] : undefined;
      UIkit.update(element, e);
    };
    UIkit.prototype.$getComponent = UIkit.getComponent;
    var componentName = memoize(function (name) {
      return UIkit.prefix + hyphenate(name);
    });
    Object.defineProperties(UIkit.prototype, {
      $container: Object.getOwnPropertyDescriptor(UIkit, 'container'),
      $name: {
        get: function get() {
          return componentName(this.$options.name);
        }
      }
    });
  }

  function componentAPI (UIkit) {
    var DATA = UIkit.data;
    var components = {};
    UIkit.component = function (name, options) {
      var _opt$install;
      var id = hyphenate(name);
      name = camelize(id);
      if (!options) {
        if (isPlainObject(components[name])) {
          components[name] = UIkit.extend(components[name]);
        }
        return components[name];
      }
      UIkit[name] = function (element, data) {
        var component = UIkit.component(name);
        return component.options.functional ? new component({
          data: isPlainObject(element) ? element : Array.prototype.slice.call(arguments)
        }) : element ? $$(element).map(init)[0] : init();
        function init(element) {
          var instance = UIkit.getComponent(element, name);
          if (instance) {
            if (data) {
              instance.$destroy();
            } else {
              return instance;
            }
          }
          return new component({
            el: element,
            data: data
          });
        }
      };
      var opt = isPlainObject(options) ? _objectSpread2({}, options) : options.options;
      opt.name = name;
      (_opt$install = opt.install) === null || _opt$install === void 0 ? void 0 : _opt$install.call(opt, UIkit, opt, name);
      if (UIkit._initialized && !opt.functional) {
        fastdom.read(function () {
          return UIkit[name]("[mui-".concat(id, "],[data-mui-").concat(id, "]"));
        });
      }
      return components[name] = isPlainObject(options) ? opt : options;
    };
    UIkit.getComponents = function (element) {
      return (element === null || element === void 0 ? void 0 : element[DATA]) || {};
    };
    UIkit.getComponent = function (element, name) {
      return UIkit.getComponents(element)[name];
    };
    UIkit.connect = function (node) {
      if (node[DATA]) {
        for (var name in node[DATA]) {
          node[DATA][name]._callConnected();
        }
      }
      var _iterator = _createForOfIteratorHelper(node.attributes),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var attribute = _step.value;
          var _name = getComponentName(attribute.name);
          if (_name && _name in components) {
            UIkit[_name](node);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    };
    UIkit.disconnect = function (node) {
      for (var name in node[DATA]) {
        node[DATA][name]._callDisconnected();
      }
    };
  }
  var getComponentName = memoize(function (attribute) {
    return startsWith(attribute, 'mui-') || startsWith(attribute, 'data-mui-') ? camelize(attribute.replace('data-mui-', '').replace('mui-', '')) : false;
  });

  var UIkit = function UIkit(options) {
    this._init(options);
  };
  UIkit.util = util;
  UIkit.data = '__uikit__';
  UIkit.prefix = 'mui-';
  UIkit.options = {};
  UIkit.version = '1.0';
  globalAPI(UIkit);
  hooksAPI(UIkit);
  stateAPI(UIkit);
  componentAPI(UIkit);
  instanceAPI(UIkit);

  function boot (UIkit) {
    var connect = UIkit.connect,
      disconnect = UIkit.disconnect;
    if (!inBrowser || !window.MutationObserver) {
      return;
    }
    fastdom.read(function () {
      if (document.body) {
        apply(document.body, connect);
      }
      new MutationObserver(function (records) {
        return records.forEach(applyChildListMutation);
      }).observe(document, {
        childList: true,
        subtree: true
      });
      new MutationObserver(function (records) {
        return records.forEach(applyAttributeMutation);
      }).observe(document, {
        attributes: true,
        subtree: true
      });
      UIkit._initialized = true;
    });
    function applyChildListMutation(_ref) {
      var addedNodes = _ref.addedNodes,
        removedNodes = _ref.removedNodes;
      var _iterator = _createForOfIteratorHelper(addedNodes),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var node = _step.value;
          apply(node, connect);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      var _iterator2 = _createForOfIteratorHelper(removedNodes),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _node = _step2.value;
          apply(_node, disconnect);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
    function applyAttributeMutation(_ref2) {
      var _UIkit$getComponent;
      var target = _ref2.target,
        attributeName = _ref2.attributeName;
      var name = getComponentName(attributeName);
      if (!name || !(name in UIkit)) {
        return;
      }
      if (hasAttr(target, attributeName)) {
        UIkit[name](target);
        return;
      }
      (_UIkit$getComponent = UIkit.getComponent(target, name)) === null || _UIkit$getComponent === void 0 ? void 0 : _UIkit$getComponent.$destroy();
    }
  }

  var Class = {
    connected: function connected() {
      !hasClass(this.$el, this.$name) && addClass(this.$el, this.$name);
    }
  };

  var Lazyload = {
    data: {
      preload: 5
    },
    methods: {
      lazyload: function lazyload() {
        var _this = this;
        var observeTargets = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.$el;
        var targets = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.$el;
        this.registerObserver(observeIntersection(observeTargets, function (entries, observer) {
          var _iterator = _createForOfIteratorHelper(toNodes(isFunction(targets) ? targets() : targets)),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var el = _step.value;
              $$('[loading="lazy"]', el).slice(0, _this.preload - 1).forEach(function (el) {
                return removeAttr(el, 'loading');
              });
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          var _iterator2 = _createForOfIteratorHelper(entries.filter(function (_ref) {
              var isIntersecting = _ref.isIntersecting;
              return isIntersecting;
            }).map(function (_ref2) {
              var target = _ref2.target;
              return target;
            })),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var _el = _step2.value;
              observer.unobserve(_el);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }));
      }
    }
  };

  var Togglable = {
    props: {
      cls: Boolean,
      animation: 'list',
      duration: Number,
      velocity: Number,
      origin: String,
      transition: String
    },
    data: {
      cls: false,
      animation: [false],
      duration: 200,
      velocity: 0.2,
      origin: false,
      transition: 'ease',
      clsEnter: 'uk-togglabe-enter',
      clsLeave: 'uk-togglabe-leave'
    },
    computed: {
      hasAnimation: function hasAnimation(_ref) {
        var animation = _ref.animation;
        return !!animation[0];
      },
      hasTransition: function hasTransition(_ref2) {
        var animation = _ref2.animation;
        return ['slide', 'reveal'].some(function (transition) {
          return startsWith(animation[0], transition);
        });
      }
    },
    methods: {
      toggleElement: function toggleElement(targets, toggle, animate) {
        var _this = this;
        return new Promise(function (resolve) {
          return Promise.all(toNodes(targets).map(function (el) {
            var show = isBoolean(toggle) ? toggle : !_this.isToggled(el);
            if (!trigger(el, "before".concat(show ? 'show' : 'hide'), [_this])) {
              return Promise.reject();
            }
            var promise = (isFunction(animate) ? animate : animate === false || !_this.hasAnimation ? toggleInstant(_this) : _this.hasTransition ? toggleTransition(_this) : toggleAnimation(_this))(el, show);
            var cls = show ? _this.clsEnter : _this.clsLeave;
            addClass(el, cls);
            trigger(el, show ? 'show' : 'hide', [_this]);
            var done = function done() {
              removeClass(el, cls);
              trigger(el, show ? 'shown' : 'hidden', [_this]);
              _this.$update(el);
            };
            return promise ? promise.then(done, function () {
              removeClass(el, cls);
              return Promise.reject();
            }) : done();
          })).then(resolve, noop);
        });
      },
      isToggled: function isToggled() {
        var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.$el;
        var _toNodes = toNodes(el);
        var _toNodes2 = _slicedToArray(_toNodes, 1);
        el = _toNodes2[0];
        return hasClass(el, this.clsEnter) ? true : hasClass(el, this.clsLeave) ? false : this.cls ? hasClass(el, this.cls.split(' ')[0]) : isVisible(el);
      },
      _toggle: function _toggle(el, toggled) {
        if (!el) {
          return;
        }
        toggled = Boolean(toggled);
        var changed;
        if (this.cls) {
          changed = includes(this.cls, ' ') || toggled !== hasClass(el, this.cls);
          changed && toggleClass(el, this.cls, includes(this.cls, ' ') ? undefined : toggled);
        } else {
          changed = toggled === el.hidden;
          changed && (el.hidden = !toggled);
        }
        $$('[autofocus]', el).some(function (el) {
          return isVisible(el) ? el.focus() || true : el.blur();
        });
        if (changed) {
          trigger(el, 'toggled', [toggled, this]);
          this.$update(el);
        }
      }
    }
  };
  function toggleInstant(_ref3) {
    var _toggle = _ref3._toggle;
    return function (el, show) {
      Animation.cancel(el);
      Transition.cancel(el);
      return _toggle(el, show);
    };
  }
  function toggleTransition(cmp) {
    var _cmp$animation$;
    var _ref4 = ((_cmp$animation$ = cmp.animation[0]) === null || _cmp$animation$ === void 0 ? void 0 : _cmp$animation$.split('-')) || [],
      _ref5 = _slicedToArray(_ref4, 2),
      _ref5$ = _ref5[0],
      mode = _ref5$ === void 0 ? 'reveal' : _ref5$,
      _ref5$2 = _ref5[1],
      startProp = _ref5$2 === void 0 ? 'top' : _ref5$2;
    var dirs = [['left', 'right'], ['top', 'bottom']];
    var dir = dirs[includes(dirs[0], startProp) ? 0 : 1];
    var end = dir[1] === startProp;
    var props = ['width', 'height'];
    var dimProp = props[dirs.indexOf(dir)];
    var marginProp = "margin-".concat(dir[0]);
    var marginStartProp = "margin-".concat(startProp);
    return /*#__PURE__*/function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(el, show) {
        var _css;
        var duration, velocity, transition, _toggle, currentDim, inProgress, prevProps, dim, currentMargin, marginStart, endDim, _wrapInner, _wrapInner2, wrapper, percent, endProps;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                duration = cmp.duration, velocity = cmp.velocity, transition = cmp.transition, _toggle = cmp._toggle;
                currentDim = dimensions$1(el)[dimProp];
                inProgress = Transition.inProgress(el);
                _context.next = 5;
                return Transition.cancel(el);
              case 5:
                if (show) {
                  _toggle(el, true);
                }
                prevProps = Object.fromEntries(['padding', 'border', 'width', 'height', 'overflowY', 'overflowX', marginProp, marginStartProp].map(function (key) {
                  return [key, el.style[key]];
                }));
                dim = dimensions$1(el);
                currentMargin = toFloat(css(el, marginProp));
                marginStart = toFloat(css(el, marginStartProp));
                endDim = dim[dimProp] + marginStart;
                if (!inProgress && !show) {
                  currentDim += marginStart;
                }
                _wrapInner = wrapInner(el, '<div>'), _wrapInner2 = _slicedToArray(_wrapInner, 1), wrapper = _wrapInner2[0];
                css(wrapper, _objectSpread2({
                  boxSizing: 'border-box',
                  height: dim.height,
                  width: dim.width
                }, css(el, ['overflow', 'padding', 'borderTop', 'borderRight', 'borderBottom', 'borderLeft', 'borderImage', marginStartProp])));
                css(el, (_css = {
                  padding: 0,
                  border: 0,
                  minWidth: 0,
                  minHeight: 0
                }, _defineProperty(_css, marginStartProp, 0), _defineProperty(_css, "width", dim.width), _defineProperty(_css, "height", dim.height), _defineProperty(_css, "overflow", 'hidden'), _defineProperty(_css, dimProp, currentDim), _css));
                percent = currentDim / endDim;
                duration = (velocity * endDim + duration) * (show ? 1 - percent : percent);
                endProps = _defineProperty({}, dimProp, show ? endDim : 0);
                if (end) {
                  css(el, marginProp, endDim - currentDim + currentMargin);
                  endProps[marginProp] = show ? currentMargin : endDim + currentMargin;
                }
                if (!end ^ mode === 'reveal') {
                  css(wrapper, marginProp, -endDim + currentDim);
                  Transition.start(wrapper, _defineProperty({}, marginProp, show ? 0 : -endDim), duration, transition);
                }
                _context.prev = 20;
                _context.next = 23;
                return Transition.start(el, endProps, duration, transition);
              case 23:
                _context.prev = 23;
                css(el, prevProps);
                unwrap(wrapper.firstChild);
                if (!show) {
                  _toggle(el, false);
                }
                return _context.finish(23);
              case 28:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[20,, 23, 28]]);
      }));
      return function (_x, _x2) {
        return _ref6.apply(this, arguments);
      };
    }();
  }
  function toggleAnimation(cmp) {
    return function (el, show) {
      Animation.cancel(el);
      var animation = cmp.animation,
        duration = cmp.duration,
        _toggle = cmp._toggle;
      if (show) {
        _toggle(el, true);
        return Animation["in"](el, animation[0], duration, cmp.origin);
      }
      return Animation.out(el, animation[1] || animation[0], duration, cmp.origin).then(function () {
        return _toggle(el, false);
      });
    };
  }

  var Accordion = {
    mixins: [Class, Lazyload, Togglable],
    props: {
      animation: Boolean,
      targets: String,
      active: null,
      collapsible: Boolean,
      multiple: Boolean,
      toggle: String,
      content: String,
      offset: Number
    },
    data: {
      targets: '> *',
      active: false,
      animation: true,
      collapsible: true,
      multiple: false,
      clsOpen: 'uk-open',
      toggle: '> .uk-accordion-title',
      content: '> .uk-accordion-content',
      offset: 0
    },
    computed: {
      items: {
        get: function get(_ref, $el) {
          var targets = _ref.targets;
          return $$(targets, $el);
        },
        watch: function watch(items, prev) {
          if (prev || hasClass(items, this.clsOpen)) {
            return;
          }
          var active = this.active !== false && items[Number(this.active)] || !this.collapsible && items[0];
          if (active) {
            this.toggle(active, false);
          }
        },
        immediate: true
      },
      toggles: function toggles(_ref2) {
        var toggle = _ref2.toggle;
        return this.items.map(function (item) {
          return $(toggle, item);
        });
      },
      contents: {
        get: function get(_ref3) {
          var content = _ref3.content;
          return this.items.map(function (item) {
            return $(content, item);
          });
        },
        watch: function watch(items) {
          var _this = this;
          var _iterator = _createForOfIteratorHelper(items),
            _step;
          try {
            var _loop = function _loop() {
              var el = _step.value;
              hide(el, !hasClass(_this.items.find(function (item) {
                return within(el, item);
              }), _this.clsOpen));
            };
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              _loop();
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        },
        immediate: true
      }
    },
    connected: function connected() {
      this.lazyload();
    },
    events: [{
      name: 'click',
      delegate: function delegate() {
        return "".concat(this.targets, " ").concat(this.$props.toggle);
      },
      handler: function handler(e) {
        e.preventDefault();
        this.toggle(index(this.toggles, e.current));
      }
    }],
    methods: {
      toggle: function toggle(item, animate) {
        var _this2 = this;
        var items = [this.items[getIndex(item, this.items)]];
        var activeItems = filter$1(this.items, ".".concat(this.clsOpen));
        if (!this.multiple && !includes(activeItems, items[0])) {
          items = items.concat(activeItems);
        }
        if (!this.collapsible && activeItems.length < 2 && !filter$1(items, ":not(.".concat(this.clsOpen, ")")).length) {
          return;
        }
        var _iterator2 = _createForOfIteratorHelper(items),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var el = _step2.value;
            this.toggleElement(el, !hasClass(el, this.clsOpen), /*#__PURE__*/function () {
              var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(el, show) {
                var content, toggle;
                return _regeneratorRuntime().wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        toggleClass(el, _this2.clsOpen, show);
                        attr($(_this2.$props.toggle, el), 'aria-expanded', show);
                        content = $(_this2.content, el);
                        if (!(animate === false || !_this2.animation)) {
                          _context.next = 7;
                          break;
                        }
                        content.hidden = !show;
                        hide(content, !show);
                        return _context.abrupt("return");
                      case 7:
                        _context.next = 9;
                        return toggleTransition(_this2)(content, show);
                      case 9:
                        if (show) {
                          toggle = $(_this2.$props.toggle, el);
                          fastdom.read(function () {
                            if (!isInView(toggle)) {
                              scrollIntoView(toggle, {
                                offset: _this2.offset
                              });
                            }
                          });
                        }
                      case 10:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));
              return function (_x, _x2) {
                return _ref4.apply(this, arguments);
              };
            }());
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    }
  };
  function hide(el, hide) {
    el && (el.hidden = hide);
  }

  var alert$1 = {
    mixins: [Class, Togglable],
    args: 'animation',
    props: {
      animation: Boolean,
      close: String
    },
    data: {
      animation: true,
      selClose: '.uk-alert-close',
      duration: 150
    },
    events: {
      name: 'click',
      delegate: function delegate() {
        return this.selClose;
      },
      handler: function handler(e) {
        e.preventDefault();
        this.close();
      }
    },
    methods: {
      close: function close() {
        var _this = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return _this.toggleElement(_this.$el, false, animate$1(_this));
                case 2:
                  _this.$destroy(true);
                case 3:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }))();
      }
    }
  };
  function animate$1(_ref) {
    var duration = _ref.duration,
      transition = _ref.transition,
      velocity = _ref.velocity;
    return function (el) {
      var height = toFloat(css(el, 'height'));
      css(el, 'height', height);
      return Transition.start(el, {
        height: 0,
        marginTop: 0,
        marginBottom: 0,
        paddingTop: 0,
        paddingBottom: 0,
        borderTop: 0,
        borderBottom: 0,
        opacity: 0
      }, velocity * height + duration, transition);
    };
  }

  var Video = {
    args: 'autoplay',
    props: {
      automute: Boolean,
      autoplay: Boolean
    },
    data: {
      automute: false,
      autoplay: true
    },
    connected: function connected() {
      var _this = this;
      this.inView = this.autoplay === 'inview';
      if (this.inView && !hasAttr(this.$el, 'preload')) {
        this.$el.preload = 'none';
      }
      if (isTag(this.$el, 'iframe') && !hasAttr(this.$el, 'allow')) {
        this.$el.allow = 'autoplay';
      }
      if (this.automute) {
        mute(this.$el);
      }
      this.registerObserver(observeIntersection(this.$el, function () {
        return _this.$emit();
      }, {}, false));
    },
    update: {
      read: function read() {
        if (!isVideo(this.$el)) {
          return false;
        }
        return {
          visible: isVisible(this.$el) && css(this.$el, 'visibility') !== 'hidden',
          inView: this.inView && isInView(this.$el)
        };
      },
      write: function write(_ref) {
        var visible = _ref.visible,
          inView = _ref.inView;
        if (!visible || this.inView && !inView) {
          pause(this.$el);
        } else if (this.autoplay === true || this.inView && inView) {
          play(this.$el);
        }
      }
    }
  };

  var Resize = {
    connected: function connected() {
      var _this$$options$resize,
        _this = this;
      this.registerObserver(observeResize(((_this$$options$resize = this.$options.resizeTargets) === null || _this$$options$resize === void 0 ? void 0 : _this$$options$resize.call(this)) || this.$el, function () {
        return _this.$emit('resize');
      }));
    }
  };

  var cover = {
    mixins: [Resize, Video],
    props: {
      width: Number,
      height: Number
    },
    data: {
      automute: true
    },
    events: {
      'load loadedmetadata': function loadLoadedmetadata() {
        this.$emit('resize');
      }
    },
    resizeTargets: function resizeTargets() {
      return [this.$el, parent(this.$el)];
    },
    update: {
      read: function read() {
        var ratio = Dimensions.ratio,
          cover = Dimensions.cover;
        var $el = this.$el,
          width = this.width,
          height = this.height;
        var dim = {
          width: width,
          height: height
        };
        if (!dim.width || !dim.height) {
          var intrinsic = {
            width: $el.naturalWidth || $el.videoWidth || $el.clientWidth,
            height: $el.naturalHeight || $el.videoHeight || $el.clientHeight
          };
          if (dim.width) {
            dim = ratio(intrinsic, 'width', dim.width);
          } else if (height) {
            dim = ratio(intrinsic, 'height', dim.height);
          } else {
            dim = intrinsic;
          }
        }
        var _ref = getPositionedParent($el) || parent($el),
          coverHeight = _ref.offsetHeight,
          coverWidth = _ref.offsetWidth;
        var coverDim = cover(dim, {
          width: coverWidth + (coverWidth % 2 ? 1 : 0),
          height: coverHeight + (coverHeight % 2 ? 1 : 0)
        });
        if (!coverDim.width || !coverDim.height) {
          return false;
        }
        return coverDim;
      },
      write: function write(_ref2) {
        var height = _ref2.height,
          width = _ref2.width;
        css(this.$el, {
          height: height,
          width: width
        });
      },
      events: ['resize']
    }
  };
  function getPositionedParent(el) {
    while (el = parent(el)) {
      if (css(el, 'position') !== 'static') {
        return el;
      }
    }
  }

  var Container = {
    props: {
      container: Boolean
    },
    data: {
      container: true
    },
    computed: {
      container: function container(_ref) {
        var container = _ref.container;
        return container === true && this.$container || container && $(container);
      }
    }
  };

  var Position = {
    props: {
      pos: String,
      offset: null,
      flip: Boolean,
      shift: Boolean,
      inset: Boolean
    },
    data: {
      pos: "bottom-".concat(isRtl ? 'right' : 'left'),
      offset: false,
      flip: true,
      shift: true,
      inset: false
    },
    connected: function connected() {
      this.pos = this.$props.pos.split('-').concat('center').slice(0, 2);
      var _this$pos = _slicedToArray(this.pos, 2);
      this.dir = _this$pos[0];
      this.align = _this$pos[1];
      this.axis = includes(['top', 'bottom'], this.dir) ? 'y' : 'x';
    },
    methods: {
      positionAt: function positionAt$1(element, target, boundary) {
        var offset = [this.getPositionOffset(element), this.getShiftOffset(element)];
        var placement = [this.flip && 'flip', this.shift && 'shift'];
        var attach = {
          element: [this.inset ? this.dir : flipPosition(this.dir), this.align],
          target: [this.dir, this.align]
        };
        if (this.axis === 'y') {
          for (var prop in attach) {
            attach[prop].reverse();
          }
          offset.reverse();
          placement.reverse();
        }
        var _scrollParents = scrollParents(element, /auto|scroll/),
          _scrollParents2 = _slicedToArray(_scrollParents, 1),
          scrollElement = _scrollParents2[0];
        var scrollTop = scrollElement.scrollTop,
          scrollLeft = scrollElement.scrollLeft;

        // Ensure none positioned element does not generate scrollbars
        var elDim = dimensions$1(element);
        css(element, {
          top: -elDim.height,
          left: -elDim.width
        });
        positionAt(element, target, {
          attach: attach,
          offset: offset,
          boundary: boundary,
          placement: placement,
          viewportOffset: this.getViewportOffset(element)
        });

        // Restore scroll position
        scrollElement.scrollTop = scrollTop;
        scrollElement.scrollLeft = scrollLeft;
      },
      getPositionOffset: function getPositionOffset(element) {
        return toPx(this.offset === false ? css(element, '--uk-position-offset') : this.offset, this.axis === 'x' ? 'width' : 'height', element) * (includes(['left', 'top'], this.dir) ? -1 : 1) * (this.inset ? -1 : 1);
      },
      getShiftOffset: function getShiftOffset(element) {
        return this.align === 'center' ? 0 : toPx(css(element, '--uk-position-shift-offset'), this.axis === 'y' ? 'width' : 'height', element) * (includes(['left', 'top'], this.align) ? 1 : -1);
      },
      getViewportOffset: function getViewportOffset(element) {
        return toPx(css(element, '--uk-position-viewport-offset'));
      }
    }
  };

  var Style = {
    beforeConnect: function beforeConnect() {
      this._style = attr(this.$el, 'style');
    },
    disconnected: function disconnected() {
      attr(this.$el, 'style', this._style);
    }
  };

  var active$1 = [];
  var Modal = {
    mixins: [Class, Container, Togglable],
    props: {
      selPanel: String,
      selClose: String,
      escClose: Boolean,
      bgClose: Boolean,
      stack: Boolean
    },
    data: {
      cls: 'uk-open',
      escClose: true,
      bgClose: true,
      overlay: true,
      stack: false
    },
    computed: {
      panel: function panel(_ref, $el) {
        var selPanel = _ref.selPanel;
        return $(selPanel, $el);
      },
      transitionElement: function transitionElement() {
        return this.panel;
      },
      bgClose: function bgClose(_ref2) {
        var bgClose = _ref2.bgClose;
        return bgClose && this.panel;
      }
    },
    beforeDisconnect: function beforeDisconnect() {
      if (includes(active$1, this)) {
        this.toggleElement(this.$el, false, false);
      }
    },
    events: [{
      name: 'click',
      delegate: function delegate() {
        return this.selClose;
      },
      handler: function handler(e) {
        e.preventDefault();
        this.hide();
      }
    }, {
      name: 'toggle',
      self: true,
      handler: function handler(e) {
        if (e.defaultPrevented) {
          return;
        }
        e.preventDefault();
        if (this.isToggled() === includes(active$1, this)) {
          this.toggle();
        }
      }
    }, {
      name: 'beforeshow',
      self: true,
      handler: function handler(e) {
        if (includes(active$1, this)) {
          return false;
        }
        if (!this.stack && active$1.length) {
          Promise.all(active$1.map(function (modal) {
            return modal.hide();
          })).then(this.show);
          e.preventDefault();
        } else {
          active$1.push(this);
        }
      }
    }, {
      name: 'show',
      self: true,
      handler: function handler() {
        var _this = this;
        once(this.$el, 'hide', on(document, 'focusin', function (e) {
          if (last(active$1) === _this && !within(e.target, _this.$el)) {
            _this.$el.focus();
          }
        }));
        if (this.overlay) {
          once(this.$el, 'hidden', preventOverscroll(this.$el), {
            self: true
          });
          once(this.$el, 'hidden', preventBackgroundScroll(), {
            self: true
          });
        }
        if (this.stack) {
          css(this.$el, 'zIndex', toFloat(css(this.$el, 'zIndex')) + active$1.length);
        }
        addClass(document.documentElement, this.clsPage);
        if (this.bgClose) {
          once(this.$el, 'hide', on(document, pointerDown$1, function (_ref3) {
            var target = _ref3.target;
            if (last(active$1) !== _this || _this.overlay && !within(target, _this.$el) || within(target, _this.panel)) {
              return;
            }
            once(document, "".concat(pointerUp$1, " ").concat(pointerCancel, " scroll"), function (_ref4) {
              var defaultPrevented = _ref4.defaultPrevented,
                type = _ref4.type,
                newTarget = _ref4.target;
              if (!defaultPrevented && type === pointerUp$1 && target === newTarget) {
                _this.hide();
              }
            }, true);
          }), {
            self: true
          });
        }
        if (this.escClose) {
          once(this.$el, 'hide', on(document, 'keydown', function (e) {
            if (e.keyCode === 27 && last(active$1) === _this) {
              _this.hide();
            }
          }), {
            self: true
          });
        }
      }
    }, {
      name: 'shown',
      self: true,
      handler: function handler() {
        if (!isFocusable(this.$el)) {
          attr(this.$el, 'tabindex', '-1');
        }
        if (!$(':focus', this.$el)) {
          this.$el.focus();
        }
      }
    }, {
      name: 'hidden',
      self: true,
      handler: function handler() {
        var _this2 = this;
        if (includes(active$1, this)) {
          active$1.splice(active$1.indexOf(this), 1);
        }
        css(this.$el, 'zIndex', '');
        if (!active$1.some(function (modal) {
          return modal.clsPage === _this2.clsPage;
        })) {
          removeClass(document.documentElement, this.clsPage);
        }
      }
    }],
    methods: {
      toggle: function toggle() {
        return this.isToggled() ? this.hide() : this.show();
      },
      show: function show() {
        var _this3 = this;
        if (this.container && parent(this.$el) !== this.container) {
          append(this.container, this.$el);
          return new Promise(function (resolve) {
            return requestAnimationFrame(function () {
              return _this3.show().then(resolve);
            });
          });
        }
        return this.toggleElement(this.$el, true, animate(this));
      },
      hide: function hide() {
        return this.toggleElement(this.$el, false, animate(this));
      }
    }
  };
  function animate(_ref5) {
    var transitionElement = _ref5.transitionElement,
      _toggle = _ref5._toggle;
    return function (el, show) {
      return new Promise(function (resolve, reject) {
        return once(el, 'show hide', function () {
          var _el$_reject;
          (_el$_reject = el._reject) === null || _el$_reject === void 0 ? void 0 : _el$_reject.call(el);
          el._reject = reject;
          _toggle(el, show);
          var off = once(transitionElement, 'transitionstart', function () {
            once(transitionElement, 'transitionend transitioncancel', resolve, {
              self: true
            });
            clearTimeout(timer);
          }, {
            self: true
          });
          var timer = setTimeout(function () {
            off();
            resolve();
          }, toMs(css(transitionElement, 'transitionDuration')));
        });
      }).then(function () {
        return delete el._reject;
      });
    };
  }
  function toMs(time) {
    return time ? endsWith(time, 'ms') ? toFloat(time) : toFloat(time) * 1000 : 0;
  }
  function preventOverscroll(el) {
    if (CSS.supports('overscroll-behavior', 'contain')) {
      var elements = filterChildren(el, function (child) {
        return /auto|scroll/.test(css(child, 'overflow'));
      });
      css(elements, 'overscrollBehavior', 'contain');
      return function () {
        return css(elements, 'overscrollBehavior', '');
      };
    }
    var startClientY;
    var events = [on(el, 'touchstart', function (_ref6) {
      var targetTouches = _ref6.targetTouches;
      if (targetTouches.length === 1) {
        startClientY = targetTouches[0].clientY;
      }
    }, {
      passive: true
    }), on(el, 'touchmove', function (e) {
      if (e.targetTouches.length !== 1) {
        return;
      }
      var _scrollParents = scrollParents(e.target, /auto|scroll/),
        _scrollParents2 = _slicedToArray(_scrollParents, 1),
        scrollParent = _scrollParents2[0];
      if (!within(scrollParent, el)) {
        scrollParent = el;
      }
      var clientY = e.targetTouches[0].clientY - startClientY;
      var _scrollParent = scrollParent,
        scrollTop = _scrollParent.scrollTop,
        scrollHeight = _scrollParent.scrollHeight,
        clientHeight = _scrollParent.clientHeight;
      if (clientHeight >= scrollHeight || scrollTop === 0 && clientY > 0 || scrollHeight - scrollTop <= clientHeight && clientY < 0) {
        e.cancelable && e.preventDefault();
      }
    }, {
      passive: false
    })];
    return function () {
      return events.forEach(function (fn) {
        return fn();
      });
    };
  }
  var prevented;
  function preventBackgroundScroll() {
    if (prevented) {
      return noop;
    }
    prevented = true;
    var _document = document,
      scrollingElement = _document.scrollingElement;
    css(scrollingElement, {
      overflowY: 'hidden',
      touchAction: 'none',
      paddingRight: width(window) - scrollingElement.clientWidth
    });
    return function () {
      prevented = false;
      css(scrollingElement, {
        overflowY: '',
        touchAction: '',
        paddingRight: ''
      });
    };
  }
  function filterChildren(el, fn) {
    var children = [];
    apply(el, function (node) {
      if (fn(node)) {
        children.push(node);
      }
    });
    return children;
  }

  var active;
  var drop = {
    mixins: [Container, Lazyload, Position, Style, Togglable],
    args: 'pos',
    props: {
      mode: 'list',
      toggle: Boolean,
      boundary: Boolean,
      target: Boolean,
      targetX: Boolean,
      targetY: Boolean,
      stretch: Boolean,
      delayShow: Number,
      delayHide: Number,
      autoUpdate: Boolean,
      clsDrop: String,
      animateOut: Boolean,
      bgScroll: Boolean
    },
    data: {
      mode: ['click', 'hover'],
      toggle: '- *',
      boundary: false,
      target: false,
      targetX: false,
      targetY: false,
      stretch: false,
      delayShow: 0,
      delayHide: 800,
      autoUpdate: true,
      clsDrop: false,
      animateOut: false,
      bgScroll: true,
      animation: ['uk-animation-fade'],
      cls: 'uk-open',
      container: false
    },
    computed: {
      target: function target(_ref, $el) {
        var target = _ref.target,
          targetX = _ref.targetX,
          targetY = _ref.targetY;
        targetX = targetX || target || this.targetEl;
        targetY = targetY || target || this.targetEl;
        return [targetX === true ? window : query(targetX, $el), targetY === true ? window : query(targetY, $el)];
      }
    },
    created: function created() {
      this.tracker = new MouseTracker();
    },
    beforeConnect: function beforeConnect() {
      this.clsDrop = this.$props.clsDrop || "uk-".concat(this.$options.name);
    },
    connected: function connected() {
      addClass(this.$el, this.clsDrop);
      if (this.toggle && !this.targetEl) {
        this.targetEl = this.$create('toggle', query(this.toggle, this.$el), {
          target: this.$el,
          mode: this.mode
        }).$el;
        attr(this.targetEl, 'aria-haspopup', true);
        this.lazyload(this.targetEl);
      }
    },
    disconnected: function disconnected() {
      if (this.isActive()) {
        this.hide(false);
        active = null;
      }
    },
    events: [{
      name: 'click',
      delegate: function delegate() {
        return ".".concat(this.clsDrop, "-close");
      },
      handler: function handler(e) {
        e.preventDefault();
        this.hide(false);
      }
    }, {
      name: 'click',
      delegate: function delegate() {
        return 'a[href^="#"]';
      },
      handler: function handler(_ref2) {
        var defaultPrevented = _ref2.defaultPrevented,
          hash = _ref2.current.hash;
        if (!defaultPrevented && hash && !within(hash, this.$el)) {
          this.hide(false);
        }
      }
    }, {
      name: 'beforescroll',
      handler: function handler() {
        this.hide(false);
      }
    }, {
      name: 'toggle',
      self: true,
      handler: function handler(e, toggle) {
        e.preventDefault();
        if (this.isToggled()) {
          this.hide(false);
        } else {
          this.show(toggle === null || toggle === void 0 ? void 0 : toggle.$el, false);
        }
      }
    }, {
      name: 'toggleshow',
      self: true,
      handler: function handler(e, toggle) {
        e.preventDefault();
        this.show(toggle === null || toggle === void 0 ? void 0 : toggle.$el);
      }
    }, {
      name: 'togglehide',
      self: true,
      handler: function handler(e) {
        e.preventDefault();
        if (!matches(this.$el, ':focus,:hover')) {
          this.hide();
        }
      }
    }, {
      name: "".concat(pointerEnter, " focusin"),
      filter: function filter() {
        return includes(this.mode, 'hover');
      },
      handler: function handler(e) {
        if (!isTouch(e)) {
          this.clearTimers();
        }
      }
    }, {
      name: "".concat(pointerLeave, " focusout"),
      filter: function filter() {
        return includes(this.mode, 'hover');
      },
      handler: function handler(e) {
        if (!isTouch(e) && e.relatedTarget) {
          this.hide();
        }
      }
    }, {
      name: 'toggled',
      self: true,
      handler: function handler(e, toggled) {
        if (!toggled) {
          return;
        }
        this.clearTimers();
        this.position();
      }
    }, {
      name: 'show',
      self: true,
      handler: function handler() {
        var _this = this;
        active = this;
        this.tracker.init();
        var update = function update() {
          return _this.$emit();
        };
        var handlers = [on(document, pointerDown$1, function (_ref3) {
          var target = _ref3.target;
          return !within(target, _this.$el) && once(document, "".concat(pointerUp$1, " ").concat(pointerCancel, " scroll"), function (_ref4) {
            var defaultPrevented = _ref4.defaultPrevented,
              type = _ref4.type,
              newTarget = _ref4.target;
            if (!defaultPrevented && type === pointerUp$1 && target === newTarget && !(_this.targetEl && within(target, _this.targetEl))) {
              _this.hide(false);
            }
          }, true);
        }), on(document, 'keydown', function (e) {
          if (e.keyCode === 27) {
            _this.hide(false);
          }
        }), on(window, 'resize', update), function () {
          var observer = observeResize(scrollParents(_this.$el).concat(_this.target), update);
          return function () {
            return observer.disconnect();
          };
        }()].concat(_toConsumableArray(this.autoUpdate ? [on([document, scrollParents(this.$el)], 'scroll', update, {
          passive: true
        })] : []), _toConsumableArray(this.bgScroll ? [] : [preventOverscroll(this.$el), preventBackgroundScroll()]));
        once(this.$el, 'hide', function () {
          return handlers.forEach(function (handler) {
            return handler();
          });
        }, {
          self: true
        });
      }
    }, {
      name: 'beforehide',
      self: true,
      handler: function handler() {
        this.clearTimers();
      }
    }, {
      name: 'hide',
      handler: function handler(_ref5) {
        var target = _ref5.target;
        if (this.$el !== target) {
          active = active === null && within(target, this.$el) && this.isToggled() ? this : active;
          return;
        }
        active = this.isActive() ? null : active;
        this.tracker.cancel();
      }
    }],
    update: {
      write: function write() {
        if (this.isToggled() && !hasClass(this.$el, this.clsEnter)) {
          this.position();
        }
      }
    },
    methods: {
      show: function show() {
        var _this2 = this;
        var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.targetEl;
        var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        if (this.isToggled() && target && this.targetEl && target !== this.targetEl) {
          this.hide(false, false);
        }
        this.targetEl = target;
        this.clearTimers();
        if (this.isActive()) {
          return;
        }
        if (active) {
          if (delay && active.isDelaying) {
            this.showTimer = setTimeout(function () {
              return matches(target, ':hover') && _this2.show();
            }, 10);
            return;
          }
          var prev;
          while (active && prev !== active && !within(this.$el, active.$el)) {
            prev = active;
            active.hide(false, false);
          }
        }
        if (this.container && parent(this.$el) !== this.container) {
          append(this.container, this.$el);
        }
        this.showTimer = setTimeout(function () {
          return _this2.toggleElement(_this2.$el, true);
        }, delay && this.delayShow || 0);
      },
      hide: function hide() {
        var _this3 = this;
        var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        var animate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var hide = function hide() {
          return _this3.toggleElement(_this3.$el, false, _this3.animateOut && animate);
        };
        this.clearTimers();
        this.isDelaying = getPositionedElements(this.$el).some(function (el) {
          return _this3.tracker.movesTo(el);
        });
        if (delay && this.isDelaying) {
          this.hideTimer = setTimeout(this.hide, 50);
        } else if (delay && this.delayHide) {
          this.hideTimer = setTimeout(hide, this.delayHide);
        } else {
          hide();
        }
      },
      clearTimers: function clearTimers() {
        clearTimeout(this.showTimer);
        clearTimeout(this.hideTimer);
        this.showTimer = null;
        this.hideTimer = null;
        this.isDelaying = false;
      },
      isActive: function isActive() {
        return active === this;
      },
      position: function position() {
        removeClass(this.$el, "".concat(this.clsDrop, "-stack"));
        attr(this.$el, 'style', this._style);

        // Ensure none positioned element does not generate scrollbars
        this.$el.hidden = true;
        var boundary = query(this.boundary, this.$el);
        var boundaryOffset = offset(boundary || window);
        var viewports = this.target.map(function (target) {
          return offsetViewport(scrollParents(target)[0]);
        });
        var viewportOffset = this.getViewportOffset(this.$el);
        var dirs = [[0, ['x', 'width', 'left', 'right']], [1, ['y', 'height', 'top', 'bottom']]];
        for (var _i = 0, _dirs = dirs; _i < _dirs.length; _i++) {
          var _dirs$_i = _slicedToArray(_dirs[_i], 2),
            i = _dirs$_i[0],
            _dirs$_i$ = _slicedToArray(_dirs$_i[1], 2),
            axis = _dirs$_i$[0],
            prop = _dirs$_i$[1];
          if (this.axis !== axis && includes([axis, true], this.stretch)) {
            var _css;
            css(this.$el, (_css = {}, _defineProperty(_css, prop, Math.min(boundaryOffset[prop], viewports[i][prop] - 2 * viewportOffset)), _defineProperty(_css, "overflow-".concat(axis), 'auto'), _css));
          }
        }
        var maxWidth = viewports[0].width - 2 * viewportOffset;
        if (this.$el.offsetWidth > maxWidth) {
          addClass(this.$el, "".concat(this.clsDrop, "-stack"));
        }
        css(this.$el, 'maxWidth', maxWidth);
        this.$el.hidden = false;
        this.positionAt(this.$el, this.target, boundary);
        for (var _i2 = 0, _dirs2 = dirs; _i2 < _dirs2.length; _i2++) {
          var _dirs2$_i = _slicedToArray(_dirs2[_i2], 2),
            _i3 = _dirs2$_i[0],
            _dirs2$_i$ = _slicedToArray(_dirs2$_i[1], 4),
            _axis = _dirs2$_i$[0],
            _prop = _dirs2$_i$[1],
            start = _dirs2$_i$[2],
            end = _dirs2$_i$[3];
          if (this.axis === _axis && includes([_axis, true], this.stretch)) {
            var _css2;
            var positionOffset = Math.abs(this.getPositionOffset(this.$el));
            var targetOffset = offset(this.target[_i3]);
            var elOffset = offset(this.$el);
            css(this.$el, (_css2 = {}, _defineProperty(_css2, _prop, (targetOffset[start] > elOffset[start] ? targetOffset[start] - Math.max(boundaryOffset[start], viewports[_i3][start] + viewportOffset) : Math.min(boundaryOffset[end], viewports[_i3][end] - viewportOffset) - targetOffset[end]) - positionOffset), _defineProperty(_css2, "overflow-".concat(_axis), 'auto'), _css2));
            this.positionAt(this.$el, this.target, boundary);
          }
        }
      }
    }
  };
  function getPositionedElements(el) {
    var result = [];
    apply(el, function (el) {
      return css(el, 'position') !== 'static' && result.push(el);
    });
    return result;
  }

  var formCustom = {
    mixins: [Class],
    args: 'target',
    props: {
      target: Boolean
    },
    data: {
      target: false
    },
    computed: {
      input: function input(_, $el) {
        return $(selInput, $el);
      },
      state: function state() {
        return this.input.nextElementSibling;
      },
      target: function target(_ref, $el) {
        var target = _ref.target;
        return target && (target === true && parent(this.input) === $el && this.input.nextElementSibling || $(target, $el));
      }
    },
    update: function update() {
      var _input$files;
      var target = this.target,
        input = this.input;
      if (!target) {
        return;
      }
      var option;
      var prop = isInput(target) ? 'value' : 'textContent';
      var prev = target[prop];
      var value = (_input$files = input.files) !== null && _input$files !== void 0 && _input$files[0] ? input.files[0].name : matches(input, 'select') && (option = $$('option', input).filter(function (el) {
        return el.selected;
      })[0]) // eslint-disable-line prefer-destructuring
      ? option.textContent : input.value;
      if (prev !== value) {
        target[prop] = value;
      }
    },
    events: [{
      name: 'change',
      handler: function handler() {
        this.$emit();
      }
    }, {
      name: 'reset',
      el: function el() {
        return closest(this.$el, 'form');
      },
      handler: function handler() {
        this.$emit();
      }
    }]
  };

  var Margin = {
    mixins: [Resize],
    props: {
      margin: String,
      firstColumn: Boolean
    },
    data: {
      margin: 'uk-margin-small-top',
      firstColumn: 'uk-first-column'
    },
    resizeTargets: function resizeTargets() {
      return [this.$el].concat(_toConsumableArray(toArray(this.$el.children)));
    },
    connected: function connected() {
      var _this = this;
      this.registerObserver(observeMutation(this.$el, function () {
        return _this.$reset();
      }, {
        childList: true
      }));
    },
    update: {
      read: function read() {
        var rows = getRows(this.$el.children);
        return {
          rows: rows,
          columns: getColumns(rows)
        };
      },
      write: function write(_ref) {
        var columns = _ref.columns,
          rows = _ref.rows;
        var _iterator = _createForOfIteratorHelper(rows),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var row = _step.value;
            var _iterator2 = _createForOfIteratorHelper(row),
              _step2;
            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var column = _step2.value;
                toggleClass(column, this.margin, rows[0] !== row);
                toggleClass(column, this.firstColumn, columns[0].includes(column));
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      },
      events: ['resize']
    }
  };
  function getRows(items) {
    return sortBy(items, 'top', 'bottom');
  }
  function getColumns(rows) {
    var columns = [];
    var _iterator3 = _createForOfIteratorHelper(rows),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var row = _step3.value;
        var sorted = sortBy(row, 'left', 'right');
        for (var j = 0; j < sorted.length; j++) {
          columns[j] = columns[j] ? columns[j].concat(sorted[j]) : sorted[j];
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    return isRtl ? columns.reverse() : columns;
  }
  function sortBy(items, startProp, endProp) {
    var sorted = [[]];
    var _iterator4 = _createForOfIteratorHelper(items),
      _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var el = _step4.value;
        if (!isVisible(el)) {
          continue;
        }
        var dim = getOffset(el);
        for (var i = sorted.length - 1; i >= 0; i--) {
          var current = sorted[i];
          if (!current[0]) {
            current.push(el);
            break;
          }
          var startDim = void 0;
          if (current[0].offsetParent === el.offsetParent) {
            startDim = getOffset(current[0]);
          } else {
            dim = getOffset(el, true);
            startDim = getOffset(current[0], true);
          }
          if (dim[startProp] >= startDim[endProp] - 1 && dim[startProp] !== startDim[startProp]) {
            sorted.push([el]);
            break;
          }
          if (dim[endProp] - 1 > startDim[startProp] || dim[startProp] === startDim[startProp]) {
            current.push(el);
            break;
          }
          if (i === 0) {
            sorted.unshift([el]);
            break;
          }
        }
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
    return sorted;
  }
  function getOffset(element) {
    var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var offsetTop = element.offsetTop,
      offsetLeft = element.offsetLeft,
      offsetHeight = element.offsetHeight,
      offsetWidth = element.offsetWidth;
    if (offset) {
      var _offsetPosition = offsetPosition(element);
      var _offsetPosition2 = _slicedToArray(_offsetPosition, 2);
      offsetTop = _offsetPosition2[0];
      offsetLeft = _offsetPosition2[1];
    }
    return {
      top: offsetTop,
      left: offsetLeft,
      bottom: offsetTop + offsetHeight,
      right: offsetLeft + offsetWidth
    };
  }

  var Scroll = {
    connected: function connected() {
      var _this = this;
      registerScrollListener(this._uid, function () {
        return _this.$emit('scroll');
      });
    },
    disconnected: function disconnected() {
      unregisterScrollListener(this._uid);
    }
  };
  var scrollListeners = new Map();
  var unbindScrollListener;
  function registerScrollListener(id, listener) {
    unbindScrollListener = unbindScrollListener || on(window, 'scroll', function () {
      return scrollListeners.forEach(function (listener) {
        return listener();
      });
    }, {
      passive: true,
      capture: true
    });
    scrollListeners.set(id, listener);
  }
  function unregisterScrollListener(id) {
    scrollListeners["delete"](id);
    if (unbindScrollListener && !scrollListeners.size) {
      unbindScrollListener();
      unbindScrollListener = null;
    }
  }

  var grid = {
    "extends": Margin,
    mixins: [Class, Scroll],
    name: 'grid',
    props: {
      masonry: Boolean,
      parallax: Number
    },
    data: {
      margin: 'uk-grid-margin',
      clsStack: 'uk-grid-stack',
      masonry: false,
      parallax: 0
    },
    connected: function connected() {
      this.masonry && addClass(this.$el, 'uk-flex-top uk-flex-wrap-top');
    },
    update: [{
      write: function write(_ref) {
        var columns = _ref.columns;
        toggleClass(this.$el, this.clsStack, columns.length < 2);
      },
      events: ['resize']
    }, {
      read: function read(data) {
        var columns = data.columns,
          rows = data.rows;

        // Filter component makes elements positioned absolute
        if (!columns.length || !this.masonry && !this.parallax || positionedAbsolute(this.$el)) {
          data.translates = false;
          return false;
        }
        var translates = false;
        var nodes = children(this.$el);
        var columnHeights = getColumnHeights(columns);
        var margin = getMarginTop(nodes, this.margin) * (rows.length - 1);
        var elHeight = Math.max.apply(Math, _toConsumableArray(columnHeights)) + margin;
        if (this.masonry) {
          columns = columns.map(function (column) {
            return sortBy$1(column, 'offsetTop');
          });
          translates = getTranslates(rows, columns);
        }
        var padding = Math.abs(this.parallax);
        if (padding) {
          padding = columnHeights.reduce(function (newPadding, hgt, i) {
            return Math.max(newPadding, hgt + margin + (i % 2 ? padding : padding / 8) - elHeight);
          }, 0);
        }
        return {
          padding: padding,
          columns: columns,
          translates: translates,
          height: translates ? elHeight : ''
        };
      },
      write: function write(_ref2) {
        var height = _ref2.height,
          padding = _ref2.padding;
        css(this.$el, 'paddingBottom', padding || '');
        height !== false && css(this.$el, 'height', height);
      },
      events: ['resize']
    }, {
      read: function read() {
        if (this.parallax && positionedAbsolute(this.$el)) {
          return false;
        }
        return {
          scrolled: this.parallax ? scrolledOver(this.$el) * Math.abs(this.parallax) : false
        };
      },
      write: function write(_ref3) {
        var columns = _ref3.columns,
          scrolled = _ref3.scrolled,
          translates = _ref3.translates;
        if (scrolled === false && !translates) {
          return;
        }
        columns.forEach(function (column, i) {
          return column.forEach(function (el, j) {
            return css(el, 'transform', !scrolled && !translates ? '' : "translateY(".concat((translates && -translates[i][j]) + (scrolled ? i % 2 ? scrolled : scrolled / 8 : 0), "px)"));
          });
        });
      },
      events: ['scroll', 'resize']
    }]
  };
  function positionedAbsolute(el) {
    return children(el).some(function (el) {
      return css(el, 'position') === 'absolute';
    });
  }
  function getTranslates(rows, columns) {
    var rowHeights = rows.map(function (row) {
      return Math.max.apply(Math, _toConsumableArray(row.map(function (el) {
        return el.offsetHeight;
      })));
    });
    return columns.map(function (elements) {
      var prev = 0;
      return elements.map(function (element, row) {
        return prev += row ? rowHeights[row - 1] - elements[row - 1].offsetHeight : 0;
      });
    });
  }
  function getMarginTop(nodes, cls) {
    var _nodes$filter = nodes.filter(function (el) {
        return hasClass(el, cls);
      }),
      _nodes$filter2 = _slicedToArray(_nodes$filter, 1),
      node = _nodes$filter2[0];
    return toFloat(node ? css(node, 'marginTop') : css(nodes[0], 'paddingLeft'));
  }
  function getColumnHeights(columns) {
    return columns.map(function (column) {
      return column.reduce(function (sum, el) {
        return sum + el.offsetHeight;
      }, 0);
    });
  }

  var heightMatch = {
    mixins: [Resize],
    args: 'target',
    props: {
      target: String,
      row: Boolean
    },
    data: {
      target: '> *',
      row: true
    },
    computed: {
      elements: {
        get: function get(_ref, $el) {
          var target = _ref.target;
          return $$(target, $el);
        },
        watch: function watch() {
          this.$reset();
        }
      }
    },
    resizeTargets: function resizeTargets() {
      return [this.$el].concat(_toConsumableArray(this.elements));
    },
    update: {
      read: function read() {
        return {
          rows: (this.row ? getRows(this.elements) : [this.elements]).map(match$1)
        };
      },
      write: function write(_ref2) {
        var rows = _ref2.rows;
        var _iterator = _createForOfIteratorHelper(rows),
          _step;
        try {
          var _loop = function _loop() {
            var _step$value = _step.value,
              heights = _step$value.heights,
              elements = _step$value.elements;
            elements.forEach(function (el, i) {
              return css(el, 'minHeight', heights[i]);
            });
          };
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            _loop();
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      },
      events: ['resize']
    }
  };
  function match$1(elements) {
    if (elements.length < 2) {
      return {
        heights: [''],
        elements: elements
      };
    }
    css(elements, 'minHeight', '');
    var heights = elements.map(getHeight);
    var max = Math.max.apply(Math, _toConsumableArray(heights));
    return {
      heights: elements.map(function (el, i) {
        return heights[i].toFixed(2) === max.toFixed(2) ? '' : max;
      }),
      elements: elements
    };
  }
  function getHeight(element) {
    var style = false;
    if (!isVisible(element)) {
      style = element.style.display;
      css(element, 'display', 'block', 'important');
    }
    var height = dimensions$1(element).height - boxModelAdjust(element, 'height', 'content-box');
    if (style !== false) {
      css(element, 'display', style);
    }
    return height;
  }

  var heightViewport = {
    mixins: [Resize],
    props: {
      expand: Boolean,
      offsetTop: Boolean,
      offsetBottom: Boolean,
      minHeight: Number
    },
    data: {
      expand: false,
      offsetTop: false,
      offsetBottom: false,
      minHeight: 0
    },
    resizeTargets: function resizeTargets() {
      // check for offsetTop change
      return [this.$el].concat(_toConsumableArray(scrollParents(this.$el, /auto|scroll/)));
    },
    update: {
      read: function read(_ref) {
        var prev = _ref.minHeight;
        if (!isVisible(this.$el)) {
          return false;
        }
        var minHeight = '';
        var box = boxModelAdjust(this.$el, 'height', 'content-box');
        var _document = document,
          body = _document.body,
          scrollingElement = _document.scrollingElement;
        var _scrollParents = scrollParents(this.$el, /auto|scroll/),
          _scrollParents2 = _slicedToArray(_scrollParents, 1),
          scrollElement = _scrollParents2[0];
        var _offsetViewport = offsetViewport(scrollElement === body ? scrollingElement : scrollElement),
          viewportHeight = _offsetViewport.height;
        if (this.expand) {
          minHeight = Math.max(viewportHeight - (dimensions$1(scrollElement).height - dimensions$1(this.$el).height) - box, 0);
        } else {
          var isScrollingElement = scrollingElement === scrollElement || body === scrollElement;

          // on mobile devices (iOS and Android) window.innerHeight !== 100vh
          minHeight = "calc(".concat(isScrollingElement ? '100vh' : "".concat(viewportHeight, "px"));
          if (this.offsetTop) {
            if (isScrollingElement) {
              var top = offsetPosition(this.$el)[0] - offsetPosition(scrollElement)[0];
              minHeight += top > 0 && top < viewportHeight / 2 ? " - ".concat(top, "px") : '';
            } else {
              minHeight += " - ".concat(css(scrollElement, 'paddingTop'));
            }
          }
          if (this.offsetBottom === true) {
            minHeight += " - ".concat(dimensions$1(this.$el.nextElementSibling).height, "px");
          } else if (isNumeric(this.offsetBottom)) {
            minHeight += " - ".concat(this.offsetBottom, "vh");
          } else if (this.offsetBottom && endsWith(this.offsetBottom, 'px')) {
            minHeight += " - ".concat(toFloat(this.offsetBottom), "px");
          } else if (isString(this.offsetBottom)) {
            minHeight += " - ".concat(dimensions$1(query(this.offsetBottom, this.$el)).height, "px");
          }
          minHeight += "".concat(box ? " - ".concat(box, "px") : '', ")");
        }
        return {
          minHeight: minHeight,
          prev: prev
        };
      },
      write: function write(_ref2) {
        var minHeight = _ref2.minHeight;
        css(this.$el, {
          minHeight: minHeight
        });
        if (this.minHeight && toFloat(css(this.$el, 'minHeight')) < this.minHeight) {
          css(this.$el, 'minHeight', this.minHeight);
        }
      },
      events: ['resize']
    }
  };

  var nativeLazyLoad = inBrowser && 'loading' in HTMLImageElement.prototype;
  var img = {
    args: 'dataSrc',
    props: {
      dataSrc: String,
      sources: String,
      offsetTop: String,
      offsetLeft: String,
      target: String,
      loading: String
    },
    data: {
      dataSrc: '',
      sources: false,
      offsetTop: '50vh',
      offsetLeft: '50vw',
      target: false,
      loading: 'lazy'
    },
    connected: function connected() {
      var _this = this;
      if (this.loading !== 'lazy') {
        this.load();
        return;
      }
      var target = [this.$el].concat(_toConsumableArray(queryAll(this.$props.target, this.$el)));
      if (nativeLazyLoad && isImg(this.$el)) {
        this.$el.loading = 'lazy';
        setSrcAttrs(this.$el);
        if (target.length === 1) {
          return;
        }
      }
      ensureSrcAttribute(this.$el);
      this.registerObserver(observeIntersection(target, function (entries, observer) {
        _this.load();
        observer.disconnect();
      }, {
        rootMargin: "".concat(toPx(this.offsetTop, 'height'), "px ").concat(toPx(this.offsetLeft, 'width'), "px")
      }));
    },
    disconnected: function disconnected() {
      if (this._data.image) {
        this._data.image.onload = '';
      }
    },
    methods: {
      load: function load() {
        if (this._data.image) {
          return this._data.image;
        }
        var image = isImg(this.$el) ? this.$el : getImageFromElement(this.$el, this.dataSrc, this.sources);
        removeAttr(image, 'loading');
        setSrcAttrs(this.$el, image.currentSrc);
        return this._data.image = image;
      }
    }
  };
  function setSrcAttrs(el, src) {
    if (isImg(el)) {
      var parentNode = parent(el);
      var elements = isPicture(parentNode) ? children(parentNode) : [el];
      elements.forEach(function (el) {
        return setSourceProps(el, el);
      });
    } else if (src) {
      var change = !includes(el.style.backgroundImage, src);
      if (change) {
        css(el, 'backgroundImage', "url(".concat(escape(src), ")"));
        trigger(el, createEvent('load', false));
      }
    }
  }
  var srcProps = ['data-src', 'data-srcset', 'sizes'];
  function setSourceProps(sourceEl, targetEl) {
    srcProps.forEach(function (prop) {
      var value = data(sourceEl, prop);
      if (value) {
        attr(targetEl, prop.replace(/^(data-)+/, ''), value);
      }
    });
  }
  function getImageFromElement(el, src, sources) {
    var img = new Image();
    wrapInPicture(img, sources);
    setSourceProps(el, img);
    img.onload = function () {
      setSrcAttrs(el, img.currentSrc);
    };
    attr(img, 'src', src);
    return img;
  }
  function wrapInPicture(img, sources) {
    sources = parseSources(sources);
    if (sources.length) {
      var picture = fragment('<picture>');
      var _iterator = _createForOfIteratorHelper(sources),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var attrs = _step.value;
          var source = fragment('<source>');
          attr(source, attrs);
          append(picture, source);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      append(picture, img);
    }
  }
  function parseSources(sources) {
    if (!sources) {
      return [];
    }
    if (startsWith(sources, '[')) {
      try {
        sources = JSON.parse(sources);
      } catch (e) {
        sources = [];
      }
    } else {
      sources = parseOptions(sources);
    }
    if (!isArray(sources)) {
      sources = [sources];
    }
    return sources.filter(function (source) {
      return !isEmpty(source);
    });
  }
  function ensureSrcAttribute(el) {
    if (isImg(el) && !hasAttr(el, 'src')) {
      attr(el, 'src', 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"></svg>');
    }
  }
  function isPicture(el) {
    return isTag(el, 'picture');
  }
  function isImg(el) {
    return isTag(el, 'img');
  }

  var Media = {
    props: {
      media: Boolean
    },
    data: {
      media: false
    },
    connected: function connected() {
      var _this = this;
      var media = toMedia(this.media, this.$el);
      this.matchMedia = true;
      if (media) {
        this.mediaObj = window.matchMedia(media);
        var handler = function handler() {
          _this.matchMedia = _this.mediaObj.matches;
          trigger(_this.$el, createEvent('mediachange', false, true, [_this.mediaObj]));
        };
        this.offMediaObj = on(this.mediaObj, 'change', function () {
          handler();
          _this.$emit('resize');
        });
        handler();
      }
    },
    disconnected: function disconnected() {
      var _this$offMediaObj;
      (_this$offMediaObj = this.offMediaObj) === null || _this$offMediaObj === void 0 ? void 0 : _this$offMediaObj.call(this);
    }
  };
  function toMedia(value, element) {
    if (isString(value)) {
      if (startsWith(value, '@')) {
        value = toFloat(css(element, "--uk-breakpoint-".concat(value.substr(1))));
      } else if (isNaN(value)) {
        return value;
      }
    }
    return value && isNumeric(value) ? "(min-width: ".concat(value, "px)") : '';
  }

  var leader = {
    mixins: [Class, Media, Resize],
    props: {
      fill: String
    },
    data: {
      fill: '',
      clsWrapper: 'uk-leader-fill',
      clsHide: 'uk-leader-hide',
      attrFill: 'data-fill'
    },
    computed: {
      fill: function fill(_ref) {
        var fill = _ref.fill;
        return fill || css(this.$el, '--uk-leader-fill-content');
      }
    },
    connected: function connected() {
      var _wrapInner = wrapInner(this.$el, "<span class=\"".concat(this.clsWrapper, "\">"));
      var _wrapInner2 = _slicedToArray(_wrapInner, 1);
      this.wrapper = _wrapInner2[0];
    },
    disconnected: function disconnected() {
      unwrap(this.wrapper.childNodes);
    },
    update: {
      read: function read() {
        var width = Math.trunc(this.$el.offsetWidth / 2);
        return {
          width: width,
          fill: this.fill,
          hide: !this.matchMedia
        };
      },
      write: function write(_ref2) {
        var width = _ref2.width,
          fill = _ref2.fill,
          hide = _ref2.hide;
        toggleClass(this.wrapper, this.clsHide, hide);
        attr(this.wrapper, this.attrFill, new Array(width).join(fill));
      },
      events: ['resize']
    }
  };

  var modal = {
    install: install$2,
    mixins: [Modal],
    data: {
      clsPage: 'uk-modal-page',
      selPanel: '.uk-modal-dialog',
      selClose: '.uk-modal-close, .uk-modal-close-default, .uk-modal-close-outside, .uk-modal-close-full'
    },
    events: [{
      name: 'show',
      self: true,
      handler: function handler() {
        if (hasClass(this.panel, 'uk-margin-auto-vertical')) {
          addClass(this.$el, 'uk-flex');
        } else {
          css(this.$el, 'display', 'block');
        }
        height(this.$el); // force reflow
      }
    }, {
      name: 'hidden',
      self: true,
      handler: function handler() {
        css(this.$el, 'display', '');
        removeClass(this.$el, 'uk-flex');
      }
    }]
  };
  function install$2(_ref) {
    var modal = _ref.modal;
    modal.dialog = function (content, options) {
      var dialog = modal("<div class=\"uk-modal\">\n                <div class=\"uk-modal-dialog\">".concat(content, "</div>\n             </div>"), options);
      dialog.show();
      on(dialog.$el, 'hidden', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return Promise.resolve();
              case 2:
                dialog.$destroy(true);
              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      })), {
        self: true
      });
      return dialog;
    };
    modal.alert = function (message, options) {
      return openDialog(function (_ref3) {
        var labels = _ref3.labels;
        return "<div class=\"uk-modal-body\">".concat(isString(message) ? message : html(message), "</div>\n            <div class=\"uk-modal-footer uk-text-right\">\n                <button class=\"uk-button uk-button-primary uk-modal-close\" autofocus>").concat(labels.ok, "</button>\n            </div>");
      }, options, function (deferred) {
        return deferred.resolve();
      });
    };
    modal.confirm = function (message, options) {
      return openDialog(function (_ref4) {
        var labels = _ref4.labels;
        return "<form>\n                <div class=\"uk-modal-body\">".concat(isString(message) ? message : html(message), "</div>\n                <div class=\"uk-modal-footer uk-text-right\">\n                    <button class=\"uk-button uk-button-default uk-modal-close\" type=\"button\">").concat(labels.cancel, "</button>\n                    <button class=\"uk-button uk-button-primary\" autofocus>").concat(labels.ok, "</button>\n                </div>\n            </form>");
      }, options, function (deferred) {
        return deferred.reject();
      });
    };
    modal.prompt = function (message, value, options) {
      return openDialog(function (_ref5) {
        var labels = _ref5.labels;
        return "<form class=\"uk-form-stacked\">\n                <div class=\"uk-modal-body\">\n                    <label>".concat(isString(message) ? message : html(message), "</label>\n                    <input class=\"uk-input\" value=\"").concat(value || '', "\" autofocus>\n                </div>\n                <div class=\"uk-modal-footer uk-text-right\">\n                    <button class=\"uk-button uk-button-default uk-modal-close\" type=\"button\">").concat(labels.cancel, "</button>\n                    <button class=\"uk-button uk-button-primary\">").concat(labels.ok, "</button>\n                </div>\n            </form>");
      }, options, function (deferred) {
        return deferred.resolve(null);
      }, function (dialog) {
        return $('input', dialog.$el).value;
      });
    };
    modal.labels = {
      ok: 'Ok',
      cancel: 'Cancel'
    };
    function openDialog(tmpl, options, hideFn, submitFn) {
      options = _objectSpread2({
        bgClose: false,
        escClose: true,
        labels: modal.labels
      }, options);
      var dialog = modal.dialog(tmpl(options), options);
      var deferred = new Deferred();
      var resolved = false;
      on(dialog.$el, 'submit', 'form', function (e) {
        e.preventDefault();
        deferred.resolve(submitFn === null || submitFn === void 0 ? void 0 : submitFn(dialog));
        resolved = true;
        dialog.hide();
      });
      on(dialog.$el, 'hide', function () {
        return !resolved && hideFn(deferred);
      });
      deferred.promise.dialog = dialog;
      return deferred.promise;
    }
  }

  var nav = {
    "extends": Accordion,
    data: {
      targets: '> .uk-parent',
      toggle: '> a',
      content: '> ul'
    }
  };

  var navbar = {
    mixins: [Class, Container],
    props: {
      dropdown: String,
      align: String,
      clsDrop: String,
      boundary: Boolean,
      dropbar: Boolean,
      dropbarAnchor: Boolean,
      duration: Number,
      mode: Boolean,
      offset: Boolean,
      stretch: Boolean,
      delayShow: Boolean,
      delayHide: Boolean,
      target: Boolean,
      targetX: Boolean,
      targetY: Boolean,
      animation: Boolean,
      animateOut: Boolean
    },
    data: {
      dropdown: '.uk-navbar-nav > li > a, .uk-navbar-item, .uk-navbar-toggle',
      align: isRtl ? 'right' : 'left',
      clsDrop: 'uk-navbar-dropdown',
      boundary: true,
      dropbar: false,
      dropbarAnchor: false,
      duration: 200,
      container: false
    },
    computed: {
      dropbarAnchor: function dropbarAnchor(_ref, $el) {
        var dropbarAnchor = _ref.dropbarAnchor;
        return query(dropbarAnchor, $el) || $el;
      },
      dropbar: {
        get: function get(_ref2) {
          var dropbar = _ref2.dropbar;
          if (!dropbar) {
            return null;
          }
          dropbar = this._dropbar || query(dropbar, this.$el) || $('+ .uk-navbar-dropbar', this.$el);
          return dropbar ? dropbar : this._dropbar = $('<div></div>');
        },
        watch: function watch(dropbar) {
          addClass(dropbar, 'uk-dropbar', 'uk-dropbar-top', 'uk-navbar-dropbar');
        },
        immediate: true
      },
      dropContainer: function dropContainer(_, $el) {
        return this.container || $el;
      },
      dropdowns: {
        get: function get(_ref3, $el) {
          var clsDrop = _ref3.clsDrop;
          var dropdowns = $$(".".concat(clsDrop), $el);
          if (this.dropContainer !== $el) {
            var _iterator = _createForOfIteratorHelper($$(".".concat(clsDrop), this.dropContainer)),
              _step;
            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var _this$getDropdown;
                var el = _step.value;
                var target = (_this$getDropdown = this.getDropdown(el)) === null || _this$getDropdown === void 0 ? void 0 : _this$getDropdown.targetEl;
                if (!includes(dropdowns, el) && target && within(target, this.$el)) {
                  dropdowns.push(el);
                }
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
          }
          return dropdowns;
        },
        watch: function watch(dropdowns) {
          var _this = this;
          this.$create('drop', dropdowns.filter(function (el) {
            return !_this.getDropdown(el);
          }), _objectSpread2(_objectSpread2({}, this.$props), {}, {
            flip: false,
            shift: true,
            pos: "bottom-".concat(this.align),
            boundary: this.boundary === true ? this.$el : this.boundary
          }));
        },
        immediate: true
      },
      toggles: {
        get: function get(_ref4, $el) {
          var dropdown = _ref4.dropdown;
          return $$(dropdown, $el);
        },
        watch: function watch() {
          var justify = hasClass(this.$el, 'uk-navbar-justify');
          var _iterator2 = _createForOfIteratorHelper($$('.uk-navbar-nav, .uk-navbar-left, .uk-navbar-right', this.$el)),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var container = _step2.value;
              css(container, 'flexGrow', justify ? $$(this.dropdown, container).length : '');
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        },
        immediate: true
      }
    },
    disconnected: function disconnected() {
      this.dropbar && remove$1(this.dropbar);
      delete this._dropbar;
    },
    events: [{
      name: 'mouseover focusin',
      delegate: function delegate() {
        return this.dropdown;
      },
      handler: function handler(_ref5) {
        var current = _ref5.current;
        var active = this.getActive();
        if (active && includes(active.mode, 'hover') && active.targetEl && !within(active.targetEl, current) && !active.isDelaying) {
          active.hide(false);
        }
      }
    }, {
      name: 'keydown',
      delegate: function delegate() {
        return this.dropdown;
      },
      handler: function handler(e) {
        var current = e.current,
          keyCode = e.keyCode;
        var active = this.getActive();
        if (keyCode === keyMap.DOWN && hasAttr(current, 'aria-expanded')) {
          e.preventDefault();
          if (!active || active.targetEl !== current) {
            current.click();
            once(this.dropContainer, 'show', function (_ref6) {
              var target = _ref6.target;
              return focusFirstFocusableElement(target);
            });
          } else {
            focusFirstFocusableElement(active.$el);
          }
        }
        handleNavItemNavigation(e, this.toggles, active);
      }
    }, {
      name: 'keydown',
      el: function el() {
        return this.dropContainer;
      },
      delegate: function delegate() {
        return ".".concat(this.clsDrop);
      },
      handler: function handler(e) {
        var current = e.current,
          keyCode = e.keyCode;
        if (!includes(this.dropdowns, current)) {
          return;
        }
        var active = this.getActive();
        var elements = $$(selFocusable, current);
        var i = findIndex(elements, function (el) {
          return matches(el, ':focus');
        });
        if (keyCode === keyMap.UP) {
          e.preventDefault();
          if (i > 0) {
            elements[i - 1].focus();
          }
        }
        if (keyCode === keyMap.DOWN) {
          e.preventDefault();
          if (i < elements.length - 1) {
            elements[i + 1].focus();
          }
        }
        if (keyCode === keyMap.ESC) {
          var _active$targetEl;
          active === null || active === void 0 ? void 0 : (_active$targetEl = active.targetEl) === null || _active$targetEl === void 0 ? void 0 : _active$targetEl.focus();
        }
        handleNavItemNavigation(e, this.toggles, active);
      }
    }, {
      name: 'mouseleave',
      el: function el() {
        return this.dropbar;
      },
      filter: function filter() {
        return this.dropbar;
      },
      handler: function handler() {
        var active = this.getActive();
        if (active && includes(active.mode, 'hover') && !this.dropdowns.some(function (el) {
          return matches(el, ':hover');
        })) {
          active.hide();
        }
      }
    }, {
      name: 'beforeshow',
      el: function el() {
        return this.dropContainer;
      },
      filter: function filter() {
        return this.dropbar;
      },
      handler: function handler(_ref7) {
        var target = _ref7.target;
        if (!this.isDropbarDrop(target)) {
          return;
        }
        if (this.dropbar.previousElementSibling !== this.dropbarAnchor) {
          after(this.dropbarAnchor, this.dropbar);
        }
        addClass(target, "".concat(this.clsDrop, "-dropbar"));
      }
    }, {
      name: 'show',
      el: function el() {
        return this.dropContainer;
      },
      filter: function filter() {
        return this.dropbar;
      },
      handler: function handler(_ref8) {
        var _this2 = this;
        var target = _ref8.target;
        if (!this.isDropbarDrop(target)) {
          return;
        }
        var drop = this.getDropdown(target);
        this._observer = observeResize([drop.$el].concat(_toConsumableArray(drop.target)), function () {
          var targetOffsets = parents(target, ".".concat(_this2.clsDrop)).concat(target).map(function (el) {
            return offset(el);
          });
          var minTop = Math.min.apply(Math, _toConsumableArray(targetOffsets.map(function (_ref9) {
            var top = _ref9.top;
            return top;
          })));
          var maxBottom = Math.max.apply(Math, _toConsumableArray(targetOffsets.map(function (_ref10) {
            var bottom = _ref10.bottom;
            return bottom;
          })));
          var dropbarOffset = offset(_this2.dropbar);
          css(_this2.dropbar, 'top', _this2.dropbar.offsetTop - (dropbarOffset.top - minTop));
          _this2.transitionTo(maxBottom - minTop + toFloat(css(target, 'marginBottom')), target);
        });
      }
    }, {
      name: 'beforehide',
      el: function el() {
        return this.dropContainer;
      },
      filter: function filter() {
        return this.dropbar;
      },
      handler: function handler(e) {
        var active = this.getActive();
        if (matches(this.dropbar, ':hover') && (active === null || active === void 0 ? void 0 : active.$el) === e.target && !this.toggles.some(function (el) {
          return active.targetEl !== el && matches(el, ':focus');
        })) {
          e.preventDefault();
        }
      }
    }, {
      name: 'hide',
      el: function el() {
        return this.dropContainer;
      },
      filter: function filter() {
        return this.dropbar;
      },
      handler: function handler(_ref11) {
        var _this$_observer;
        var target = _ref11.target;
        if (!this.isDropbarDrop(target)) {
          return;
        }
        (_this$_observer = this._observer) === null || _this$_observer === void 0 ? void 0 : _this$_observer.disconnect();
        var active = this.getActive();
        if (!active || (active === null || active === void 0 ? void 0 : active.$el) === target) {
          this.transitionTo(0);
        }
      }
    }],
    methods: {
      getActive: function getActive() {
        return includes(this.dropdowns, active === null || active === void 0 ? void 0 : active.$el) && active;
      },
      transitionTo: function transitionTo(newHeight, el) {
        var dropbar = this.dropbar;
        var oldHeight = height(dropbar);
        el = oldHeight < newHeight && el;
        css(el, 'clipPath', "polygon(0 0,100% 0,100% ".concat(oldHeight, "px,0 ").concat(oldHeight, "px)"));
        height(dropbar, oldHeight);
        Transition.cancel([el, dropbar]);
        Promise.all([Transition.start(dropbar, {
          height: newHeight
        }, this.duration), Transition.start(el, {
          clipPath: "polygon(0 0,100% 0,100% ".concat(newHeight, "px,0 ").concat(newHeight, "px)")
        }, this.duration)])["catch"](noop).then(function () {
          return css(el, {
            clipPath: ''
          });
        });
      },
      getDropdown: function getDropdown(el) {
        return this.$getComponent(el, 'drop') || this.$getComponent(el, 'dropdown');
      },
      isDropbarDrop: function isDropbarDrop(el) {
        return this.getDropdown(el) && hasClass(el, this.clsDrop);
      }
    }
  };
  function handleNavItemNavigation(e, toggles, active) {
    var current = e.current,
      keyCode = e.keyCode;
    var target = (active === null || active === void 0 ? void 0 : active.targetEl) || current;
    var i = toggles.indexOf(target);

    // Left
    if (keyCode === keyMap.LEFT && i > 0) {
      active === null || active === void 0 ? void 0 : active.hide(false);
      toggles[i - 1].focus();
    }

    // Right
    if (keyCode === keyMap.RIGHT && i < toggles.length - 1) {
      active === null || active === void 0 ? void 0 : active.hide(false);
      toggles[i + 1].focus();
    }
    if (keyCode === keyMap.TAB) {
      target.focus();
      active === null || active === void 0 ? void 0 : active.hide(false);
    }
  }
  function focusFirstFocusableElement(el) {
    if (!$(':focus', el)) {
      var _$;
      (_$ = $(selFocusable, el)) === null || _$ === void 0 ? void 0 : _$.focus();
    }
  }
  var keyMap = {
    TAB: 9,
    ESC: 27,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
  };

  var Swipe = {
    props: {
      swiping: Boolean
    },
    data: {
      swiping: true
    },
    computed: {
      swipeTarget: function swipeTarget(props, $el) {
        return $el;
      }
    },
    connected: function connected() {
      if (!this.swiping) {
        return;
      }
      registerEvent(this, {
        el: this.swipeTarget,
        name: pointerDown$1,
        passive: true,
        handler: function handler(e) {
          if (!isTouch(e)) {
            return;
          }

          // Handle Swipe Gesture
          var pos = getEventPos(e);
          var target = 'tagName' in e.target ? e.target : parent(e.target);
          once(document, "".concat(pointerUp$1, " ").concat(pointerCancel, " scroll"), function (e) {
            var _getEventPos = getEventPos(e),
              x = _getEventPos.x,
              y = _getEventPos.y;

            // swipe
            if (e.type !== 'scroll' && target && x && Math.abs(pos.x - x) > 100 || y && Math.abs(pos.y - y) > 100) {
              setTimeout(function () {
                trigger(target, 'swipe');
                trigger(target, "swipe".concat(swipeDirection(pos.x, pos.y, x, y)));
              });
            }
          });
        }
      });
    }
  };
  function swipeDirection(x1, y1, x2, y2) {
    return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? x1 - x2 > 0 ? 'Left' : 'Right' : y1 - y2 > 0 ? 'Up' : 'Down';
  }

  var offcanvas = {
    mixins: [Modal, Swipe],
    args: 'mode',
    props: {
      mode: String,
      flip: Boolean,
      overlay: Boolean
    },
    data: {
      mode: 'slide',
      flip: false,
      overlay: false,
      clsPage: 'uk-offcanvas-page',
      clsContainer: 'uk-offcanvas-container',
      selPanel: '.uk-offcanvas-bar',
      clsFlip: 'uk-offcanvas-flip',
      clsContainerAnimation: 'uk-offcanvas-container-animation',
      clsSidebarAnimation: 'uk-offcanvas-bar-animation',
      clsMode: 'uk-offcanvas',
      clsOverlay: 'uk-offcanvas-overlay',
      selClose: '.uk-offcanvas-close',
      container: false
    },
    computed: {
      clsFlip: function clsFlip(_ref) {
        var flip = _ref.flip,
          clsFlip = _ref.clsFlip;
        return flip ? clsFlip : '';
      },
      clsOverlay: function clsOverlay(_ref2) {
        var overlay = _ref2.overlay,
          clsOverlay = _ref2.clsOverlay;
        return overlay ? clsOverlay : '';
      },
      clsMode: function clsMode(_ref3) {
        var mode = _ref3.mode,
          clsMode = _ref3.clsMode;
        return "".concat(clsMode, "-").concat(mode);
      },
      clsSidebarAnimation: function clsSidebarAnimation(_ref4) {
        var mode = _ref4.mode,
          clsSidebarAnimation = _ref4.clsSidebarAnimation;
        return mode === 'none' || mode === 'reveal' ? '' : clsSidebarAnimation;
      },
      clsContainerAnimation: function clsContainerAnimation(_ref5) {
        var mode = _ref5.mode,
          clsContainerAnimation = _ref5.clsContainerAnimation;
        return mode !== 'push' && mode !== 'reveal' ? '' : clsContainerAnimation;
      },
      transitionElement: function transitionElement(_ref6) {
        var mode = _ref6.mode;
        return mode === 'reveal' ? parent(this.panel) : this.panel;
      }
    },
    update: {
      read: function read() {
        if (this.isToggled() && !isVisible(this.$el)) {
          this.hide();
        }
      },
      events: ['resize']
    },
    events: [{
      name: 'click',
      delegate: function delegate() {
        return 'a[href^="#"]';
      },
      handler: function handler(_ref7) {
        var hash = _ref7.current.hash,
          defaultPrevented = _ref7.defaultPrevented;
        if (!defaultPrevented && hash && $(hash, document.body)) {
          this.hide();
        }
      }
    }, {
      name: 'touchmove',
      self: true,
      passive: false,
      filter: function filter() {
        return this.overlay;
      },
      handler: function handler(e) {
        e.cancelable && e.preventDefault();
      }
    }, {
      name: 'show',
      self: true,
      handler: function handler() {
        if (this.mode === 'reveal' && !hasClass(parent(this.panel), this.clsMode)) {
          wrapAll(this.panel, '<div>');
          addClass(parent(this.panel), this.clsMode);
        }
        var _document = document,
          body = _document.body,
          scrollingElement = _document.scrollingElement;
        addClass(body, this.clsContainer, this.clsFlip);
        css(body, 'touch-action', 'pan-y pinch-zoom');
        css(this.$el, 'display', 'block');
        css(this.panel, 'maxWidth', scrollingElement.clientWidth);
        addClass(this.$el, this.clsOverlay);
        addClass(this.panel, this.clsSidebarAnimation, this.mode === 'reveal' ? '' : this.clsMode);
        height(body); // force reflow
        addClass(body, this.clsContainerAnimation);
        this.clsContainerAnimation && suppressUserScale();
      }
    }, {
      name: 'hide',
      self: true,
      handler: function handler() {
        removeClass(document.body, this.clsContainerAnimation);
        css(document.body, 'touch-action', '');
      }
    }, {
      name: 'hidden',
      self: true,
      handler: function handler() {
        this.clsContainerAnimation && resumeUserScale();
        if (this.mode === 'reveal') {
          unwrap(this.panel);
        }
        removeClass(this.panel, this.clsSidebarAnimation, this.clsMode);
        removeClass(this.$el, this.clsOverlay);
        css(this.$el, 'display', '');
        css(this.panel, 'maxWidth', '');
        removeClass(document.body, this.clsContainer, this.clsFlip);
      }
    }, {
      name: 'swipeLeft swipeRight',
      handler: function handler(e) {
        if (this.isToggled() && endsWith(e.type, 'Left') ^ this.flip) {
          this.hide();
        }
      }
    }]
  };

  // Chrome in responsive mode zooms page upon opening offcanvas
  function suppressUserScale() {
    getViewport().content += ',user-scalable=0';
  }
  function resumeUserScale() {
    var viewport = getViewport();
    viewport.content = viewport.content.replace(/,user-scalable=0$/, '');
  }
  function getViewport() {
    return $('meta[name="viewport"]', document.head) || append(document.head, '<meta name="viewport">');
  }

  var overflowAuto = {
    mixins: [Class, Resize],
    props: {
      selContainer: String,
      selContent: String,
      minHeight: Number
    },
    data: {
      selContainer: '.uk-modal',
      selContent: '.uk-modal-dialog',
      minHeight: 150
    },
    computed: {
      container: function container(_ref, $el) {
        var selContainer = _ref.selContainer;
        return closest($el, selContainer);
      },
      content: function content(_ref2, $el) {
        var selContent = _ref2.selContent;
        return closest($el, selContent);
      }
    },
    resizeTargets: function resizeTargets() {
      return [this.container, this.content];
    },
    update: {
      read: function read() {
        if (!this.content || !this.container || !isVisible(this.$el)) {
          return false;
        }
        return {
          max: Math.max(this.minHeight, height(this.container) - (dimensions$1(this.content).height - height(this.$el)))
        };
      },
      write: function write(_ref3) {
        var max = _ref3.max;
        css(this.$el, {
          minHeight: this.minHeight,
          maxHeight: max
        });
      },
      events: ['resize']
    }
  };

  var responsive = {
    mixins: [Resize],
    props: ['width', 'height'],
    resizeTargets: function resizeTargets() {
      return [this.$el, parent(this.$el)];
    },
    connected: function connected() {
      addClass(this.$el, 'uk-responsive-width');
    },
    update: {
      read: function read() {
        return isVisible(this.$el) && this.width && this.height ? {
          width: width(parent(this.$el)),
          height: this.height
        } : false;
      },
      write: function write(dim) {
        height(this.$el, Dimensions.contain({
          height: this.height,
          width: this.width
        }, dim).height);
      },
      events: ['resize']
    }
  };

  var scroll = {
    props: {
      offset: Number
    },
    data: {
      offset: 0
    },
    connected: function connected() {
      registerClick(this);
    },
    disconnected: function disconnected() {
      unregisterClick(this);
    },
    methods: {
      scrollTo: function scrollTo(el) {
        var _this = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  el = el && $(el) || document.body;
                  if (!trigger(_this.$el, 'beforescroll', [_this, el])) {
                    _context.next = 5;
                    break;
                  }
                  _context.next = 4;
                  return scrollIntoView(el, {
                    offset: _this.offset
                  });
                case 4:
                  trigger(_this.$el, 'scrolled', [_this, el]);
                case 5:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }))();
      }
    }
  };
  var components$2 = new Set();
  function registerClick(cmp) {
    if (!components$2.size) {
      on(document, 'click', clickHandler);
    }
    components$2.add(cmp);
  }
  function unregisterClick(cmp) {
    components$2["delete"](cmp);
    if (!components$2.length) {
      off(document, 'click', clickHandler);
    }
  }
  function clickHandler(e) {
    if (e.defaultPrevented) {
      return;
    }
    var _iterator = _createForOfIteratorHelper(components$2),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var component = _step.value;
        if (within(e.target, component.$el)) {
          e.preventDefault();
          component.scrollTo(getTargetElement(component.$el));
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  function getTargetElement(el) {
    return document.getElementById(decodeURIComponent(el.hash).substring(1));
  }

  var scrollspy = {
    mixins: [Scroll],
    args: 'cls',
    props: {
      cls: String,
      target: String,
      hidden: Boolean,
      offsetTop: Number,
      offsetLeft: Number,
      repeat: Boolean,
      delay: Number
    },
    data: function data() {
      return {
        cls: '',
        target: false,
        hidden: true,
        offsetTop: 0,
        offsetLeft: 0,
        repeat: false,
        delay: 0,
        inViewClass: 'uk-scrollspy-inview'
      };
    },
    computed: {
      elements: {
        get: function get(_ref, $el) {
          var target = _ref.target;
          return target ? $$(target, $el) : [$el];
        },
        watch: function watch(elements, prev) {
          if (this.hidden) {
            css(filter$1(elements, ":not(.".concat(this.inViewClass, ")")), 'visibility', 'hidden');
          }
          if (!isEqual(elements, prev)) {
            this.$reset();
          }
        },
        immediate: true
      }
    },
    connected: function connected() {
      var _this = this;
      this._data.elements = new Map();
      this.registerObserver(observeIntersection(this.elements, function (records) {
        var elements = _this._data.elements;
        var _iterator = _createForOfIteratorHelper(records),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _step$value = _step.value,
              el = _step$value.target,
              isIntersecting = _step$value.isIntersecting;
            if (!elements.has(el)) {
              elements.set(el, {
                cls: data(el, 'uk-scrollspy-class') || _this.cls
              });
            }
            var state = elements.get(el);
            if (!_this.repeat && state.show) {
              continue;
            }
            state.show = isIntersecting;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        _this.$emit();
      }, {
        rootMargin: "".concat(toPx(this.offsetTop, 'height') - 1, "px ").concat(toPx(this.offsetLeft, 'width') - 1, "px")
      }, false));
    },
    disconnected: function disconnected() {
      var _iterator2 = _createForOfIteratorHelper(this._data.elements.entries()),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _step2$value = _slicedToArray(_step2.value, 2),
            el = _step2$value[0],
            state = _step2$value[1];
          removeClass(el, this.inViewClass, (state === null || state === void 0 ? void 0 : state.cls) || '');
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    },
    update: [{
      write: function write(data) {
        var _this2 = this;
        var _iterator3 = _createForOfIteratorHelper(data.elements.entries()),
          _step3;
        try {
          var _loop = function _loop() {
            var _step3$value = _slicedToArray(_step3.value, 2),
              el = _step3$value[0],
              state = _step3$value[1];
            if (state.show && !state.inview && !state.queued) {
              state.queued = true;
              data.promise = (data.promise || Promise.resolve()).then(function () {
                return new Promise(function (resolve) {
                  return setTimeout(resolve, _this2.delay);
                });
              }).then(function () {
                _this2.toggle(el, true);
                setTimeout(function () {
                  state.queued = false;
                  _this2.$emit();
                }, 300);
              });
            } else if (!state.show && state.inview && !state.queued && _this2.repeat) {
              _this2.toggle(el, false);
            }
          };
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            _loop();
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }
    }],
    methods: {
      toggle: function toggle(el, inview) {
        var _state$off;
        var state = this._data.elements.get(el);
        if (!state) {
          return;
        }
        (_state$off = state.off) === null || _state$off === void 0 ? void 0 : _state$off.call(state);
        css(el, 'visibility', !inview && this.hidden ? 'hidden' : '');
        toggleClass(el, this.inViewClass, inview);
        toggleClass(el, state.cls);
        if (/\buk-animation-/.test(state.cls)) {
          var removeAnimationClasses = function removeAnimationClasses() {
            return removeClasses(el, 'uk-animation-[\\w-]+');
          };
          if (inview) {
            state.off = once(el, 'animationcancel animationend', removeAnimationClasses);
          } else {
            removeAnimationClasses();
          }
        }
        trigger(el, inview ? 'inview' : 'outview');
        state.inview = inview;
        this.$update(el);
      }
    }
  };

  var scrollspyNav = {
    mixins: [Scroll],
    props: {
      cls: String,
      closest: String,
      scroll: Boolean,
      overflow: Boolean,
      offset: Number
    },
    data: {
      cls: 'uk-active',
      closest: false,
      scroll: false,
      overflow: true,
      offset: 0
    },
    computed: {
      links: {
        get: function get(_, $el) {
          return $$('a[href^="#"]', $el).filter(function (el) {
            return el.hash;
          });
        },
        watch: function watch(links) {
          if (this.scroll) {
            this.$create('scroll', links, {
              offset: this.offset || 0
            });
          }
        },
        immediate: true
      },
      elements: function elements(_ref) {
        var selector = _ref.closest;
        return closest(this.links, selector || '*');
      }
    },
    update: [{
      read: function read() {
        var targets = this.links.map(getTargetElement).filter(Boolean);
        var length = targets.length;
        if (!length || !isVisible(this.$el)) {
          return false;
        }
        var _scrollParents = scrollParents(targets, /auto|scroll/, true),
          _scrollParents2 = _slicedToArray(_scrollParents, 1),
          scrollElement = _scrollParents2[0];
        var scrollTop = scrollElement.scrollTop,
          scrollHeight = scrollElement.scrollHeight;
        var viewport = offsetViewport(scrollElement);
        var max = scrollHeight - viewport.height;
        var active = false;
        if (scrollTop === max) {
          active = length - 1;
        } else {
          for (var i = 0; i < targets.length; i++) {
            if (offset(targets[i]).top - viewport.top - this.offset > 0) {
              break;
            }
            active = +i;
          }
          if (active === false && this.overflow) {
            active = 0;
          }
        }
        return {
          active: active
        };
      },
      write: function write(_ref2) {
        var active = _ref2.active;
        var changed = active !== false && !hasClass(this.elements[active], this.cls);
        this.links.forEach(function (el) {
          return el.blur();
        });
        for (var i = 0; i < this.elements.length; i++) {
          toggleClass(this.elements[i], this.cls, +i === active);
        }
        if (changed) {
          trigger(this.$el, 'active', [active, this.elements[active]]);
        }
      },
      events: ['scroll', 'resize']
    }]
  };

  var sticky = {
    mixins: [Class, Media, Resize, Scroll],
    props: {
      position: String,
      top: null,
      bottom: null,
      start: null,
      end: null,
      offset: String,
      overflowFlip: Boolean,
      animation: String,
      clsActive: String,
      clsInactive: String,
      clsFixed: String,
      clsBelow: String,
      selTarget: String,
      showOnUp: Boolean,
      targetOffset: Number
    },
    data: {
      position: 'top',
      top: false,
      bottom: false,
      start: false,
      end: false,
      offset: 0,
      overflowFlip: false,
      animation: '',
      clsActive: 'uk-active',
      clsInactive: '',
      clsFixed: 'uk-sticky-fixed',
      clsBelow: 'uk-sticky-below',
      selTarget: '',
      showOnUp: false,
      targetOffset: false
    },
    computed: {
      selTarget: function selTarget(_ref, $el) {
        var selTarget = _ref.selTarget;
        return selTarget && $(selTarget, $el) || $el;
      }
    },
    resizeTargets: function resizeTargets() {
      return document.documentElement;
    },
    connected: function connected() {
      this.start = coerce(this.start || this.top);
      this.end = coerce(this.end || this.bottom);
      this.placeholder = $('+ .uk-sticky-placeholder', this.$el) || $('<div class="uk-sticky-placeholder"></div>');
      this.isFixed = false;
      this.setActive(false);
    },
    disconnected: function disconnected() {
      if (this.isFixed) {
        this.hide();
        removeClass(this.selTarget, this.clsInactive);
      }
      remove$1(this.placeholder);
      this.placeholder = null;
    },
    events: [{
      name: 'resize',
      el: function el() {
        return window;
      },
      handler: function handler() {
        this.$emit('resize');
      }
    }, {
      name: 'load hashchange popstate',
      el: function el() {
        return window;
      },
      filter: function filter() {
        return this.targetOffset !== false;
      },
      handler: function handler() {
        var _this = this;
        var _document = document,
          scrollingElement = _document.scrollingElement;
        if (!location.hash || scrollingElement.scrollTop === 0) {
          return;
        }
        setTimeout(function () {
          var targetOffset = offset($(location.hash));
          var elOffset = offset(_this.$el);
          if (_this.isFixed && intersectRect(targetOffset, elOffset)) {
            scrollingElement.scrollTop = targetOffset.top - elOffset.height - toPx(_this.targetOffset, 'height', _this.placeholder) - toPx(_this.offset, 'height', _this.placeholder);
          }
        });
      }
    }],
    update: [{
      read: function read(_ref2, types) {
        var _this2 = this;
        var height$1 = _ref2.height,
          margin = _ref2.margin;
        this.inactive = !this.matchMedia || !isVisible(this.$el);
        if (this.inactive) {
          return false;
        }
        var hide = this.active && types.has('resize');
        if (hide) {
          css(this.selTarget, 'transition', '0s');
          this.hide();
        }
        if (!this.active) {
          height$1 = offset(this.$el).height;
          margin = css(this.$el, 'margin');
        }
        if (hide) {
          this.show();
          requestAnimationFrame(function () {
            return css(_this2.selTarget, 'transition', '');
          });
        }
        var referenceElement = this.isFixed ? this.placeholder : this.$el;
        var windowHeight = height(window);
        var position = this.position;
        if (this.overflowFlip && height$1 > windowHeight) {
          position = position === 'top' ? 'bottom' : 'top';
        }
        var offset$1 = toPx(this.offset, 'height', referenceElement);
        if (position === 'bottom' && (height$1 < windowHeight || this.overflowFlip)) {
          offset$1 += windowHeight - height$1;
        }
        var overflow = this.overflowFlip ? 0 : Math.max(0, height$1 + offset$1 - windowHeight);
        var topOffset = offset(referenceElement).top;
        var start = (this.start === false ? topOffset : parseProp(this.start, this.$el, topOffset)) - offset$1;
        var end = this.end === false ? document.scrollingElement.scrollHeight - windowHeight : parseProp(this.end, this.$el, topOffset + height$1, true) - offset(this.$el).height + overflow - offset$1;
        return {
          start: start,
          end: end,
          offset: offset$1,
          overflow: overflow,
          topOffset: topOffset,
          height: height$1,
          margin: margin,
          width: dimensions$1(referenceElement).width,
          top: offsetPosition(referenceElement)[0]
        };
      },
      write: function write(_ref3) {
        var height = _ref3.height,
          margin = _ref3.margin;
        var placeholder = this.placeholder;
        css(placeholder, {
          height: height,
          margin: margin
        });
        if (!within(placeholder, document)) {
          after(this.$el, placeholder);
          placeholder.hidden = true;
        }
      },
      events: ['resize']
    }, {
      read: function read(_ref4) {
        var _ref4$scroll = _ref4.scroll,
          prevScroll = _ref4$scroll === void 0 ? 0 : _ref4$scroll,
          _ref4$dir = _ref4.dir,
          prevDir = _ref4$dir === void 0 ? 'down' : _ref4$dir,
          overflow = _ref4.overflow,
          _ref4$overflowScroll = _ref4.overflowScroll,
          overflowScroll = _ref4$overflowScroll === void 0 ? 0 : _ref4$overflowScroll,
          start = _ref4.start,
          end = _ref4.end;
        var scroll = document.scrollingElement.scrollTop;
        var dir = prevScroll <= scroll ? 'down' : 'up';
        return {
          dir: dir,
          prevDir: prevDir,
          scroll: scroll,
          prevScroll: prevScroll,
          offsetParentTop: offset((this.isFixed ? this.placeholder : this.$el).offsetParent).top,
          overflowScroll: clamp(overflowScroll + clamp(scroll, start, end) - clamp(prevScroll, start, end), 0, overflow)
        };
      },
      write: function write(data, types) {
        var _this3 = this;
        var isScrollUpdate = types.has('scroll');
        var _data$initTimestamp = data.initTimestamp,
          initTimestamp = _data$initTimestamp === void 0 ? 0 : _data$initTimestamp,
          dir = data.dir,
          prevDir = data.prevDir,
          scroll = data.scroll,
          _data$prevScroll = data.prevScroll,
          prevScroll = _data$prevScroll === void 0 ? 0 : _data$prevScroll,
          top = data.top,
          start = data.start,
          topOffset = data.topOffset,
          height = data.height;
        if (scroll < 0 || scroll === prevScroll && isScrollUpdate || this.showOnUp && !isScrollUpdate && !this.isFixed) {
          return;
        }
        var now = Date.now();
        if (now - initTimestamp > 300 || dir !== prevDir) {
          data.initScroll = scroll;
          data.initTimestamp = now;
        }
        if (this.showOnUp && !this.isFixed && Math.abs(data.initScroll - scroll) <= 30 && Math.abs(prevScroll - scroll) <= 10) {
          return;
        }
        if (this.inactive || scroll < start || this.showOnUp && (scroll <= start || dir === 'down' && isScrollUpdate || dir === 'up' && !this.isFixed && scroll <= topOffset + height)) {
          if (!this.isFixed) {
            if (Animation.inProgress(this.$el) && top > scroll) {
              Animation.cancel(this.$el);
              this.hide();
            }
            return;
          }
          this.isFixed = false;
          if (this.animation && scroll > topOffset) {
            Animation.cancel(this.$el);
            Animation.out(this.$el, this.animation).then(function () {
              return _this3.hide();
            }, noop);
          } else {
            this.hide();
          }
        } else if (this.isFixed) {
          this.update();
        } else if (this.animation && scroll > topOffset) {
          Animation.cancel(this.$el);
          this.show();
          Animation["in"](this.$el, this.animation)["catch"](noop);
        } else {
          this.show();
        }
      },
      events: ['resize', 'scroll']
    }],
    methods: {
      show: function show() {
        this.isFixed = true;
        this.update();
        this.placeholder.hidden = false;
      },
      hide: function hide() {
        this.setActive(false);
        removeClass(this.$el, this.clsFixed, this.clsBelow);
        css(this.$el, {
          position: '',
          top: '',
          width: ''
        });
        this.placeholder.hidden = true;
      },
      update: function update() {
        var _this$_data = this._data,
          width = _this$_data.width,
          _this$_data$scroll = _this$_data.scroll,
          scroll = _this$_data$scroll === void 0 ? 0 : _this$_data$scroll,
          overflow = _this$_data.overflow,
          _this$_data$overflowS = _this$_data.overflowScroll,
          overflowScroll = _this$_data$overflowS === void 0 ? 0 : _this$_data$overflowS,
          start = _this$_data.start,
          end = _this$_data.end,
          offset = _this$_data.offset,
          topOffset = _this$_data.topOffset,
          height = _this$_data.height,
          offsetParentTop = _this$_data.offsetParentTop;
        var active = start !== 0 || scroll > start;
        var position = 'fixed';
        if (scroll > end) {
          offset += end - offsetParentTop;
          position = 'absolute';
        }
        if (overflow) {
          offset -= overflowScroll;
        }
        css(this.$el, {
          position: position,
          top: "".concat(offset, "px"),
          width: width
        });
        this.setActive(active);
        toggleClass(this.$el, this.clsBelow, scroll > topOffset + height);
        addClass(this.$el, this.clsFixed);
      },
      setActive: function setActive(active) {
        var prev = this.active;
        this.active = active;
        if (active) {
          replaceClass(this.selTarget, this.clsInactive, this.clsActive);
          prev !== active && trigger(this.$el, 'active');
        } else {
          replaceClass(this.selTarget, this.clsActive, this.clsInactive);
          prev !== active && trigger(this.$el, 'inactive');
        }
      }
    }
  };
  function parseProp(value, el, propOffset, padding) {
    if (!value) {
      return 0;
    }
    if (isNumeric(value) || isString(value) && value.match(/^-?\d/)) {
      return propOffset + toPx(value, 'height', el, true);
    } else {
      var refElement = value === true ? parent(el) : query(value, el);
      return offset(refElement).bottom - (padding && refElement && within(el, refElement) ? toFloat(css(refElement, 'paddingBottom')) : 0);
    }
  }
  function coerce(value) {
    if (value === 'true') {
      return true;
    } else if (value === 'false') {
      return false;
    }
    return value;
  }

  var svg = {
    args: 'src',
    props: {
      id: Boolean,
      icon: String,
      src: String,
      style: String,
      width: Number,
      height: Number,
      ratio: Number,
      "class": String,
      strokeAnimation: Boolean,
      focusable: Boolean,
      // IE 11
      attributes: 'list'
    },
    data: {
      ratio: 1,
      include: ['style', 'class', 'focusable'],
      "class": '',
      strokeAnimation: false
    },
    beforeConnect: function beforeConnect() {
      this["class"] += ' uk-svg';
    },
    connected: function connected() {
      var _this = this;
      if (!this.icon && includes(this.src, '#')) {
        var _this$src$split = this.src.split('#');
        var _this$src$split2 = _slicedToArray(_this$src$split, 2);
        this.src = _this$src$split2[0];
        this.icon = _this$src$split2[1];
      }
      this.svg = this.getSvg().then(function (el) {
        if (_this._connected) {
          var svg = insertSVG(el, _this.$el);
          if (_this.svgEl && svg !== _this.svgEl) {
            remove$1(_this.svgEl);
          }
          _this.applyAttributes(svg, el);
          return _this.svgEl = svg;
        }
      }, noop);
      if (this.strokeAnimation) {
        this.svg.then(function (el) {
          if (_this._connected) {
            applyAnimation(el);
            _this.registerObserver(observeIntersection(el, function (records, observer) {
              applyAnimation(el);
              observer.disconnect();
            }));
          }
        });
      }
    },
    disconnected: function disconnected() {
      var _this2 = this;
      this.svg.then(function (svg) {
        if (_this2._connected) {
          return;
        }
        if (isVoidElement(_this2.$el)) {
          _this2.$el.hidden = false;
        }
        remove$1(svg);
        _this2.svgEl = null;
      });
      this.svg = null;
    },
    methods: {
      getSvg: function getSvg() {
        var _this3 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!(isTag(_this3.$el, 'img') && !_this3.$el.complete && _this3.$el.loading === 'lazy')) {
                    _context.next = 2;
                    break;
                  }
                  return _context.abrupt("return", new Promise(function (resolve) {
                    return once(_this3.$el, 'load', function () {
                      return resolve(_this3.getSvg());
                    });
                  }));
                case 2:
                  _context.t1 = parseSVG;
                  _context.next = 5;
                  return loadSVG(_this3.src);
                case 5:
                  _context.t2 = _context.sent;
                  _context.t3 = _this3.icon;
                  _context.t0 = (0, _context.t1)(_context.t2, _context.t3);
                  if (_context.t0) {
                    _context.next = 10;
                    break;
                  }
                  _context.t0 = Promise.reject('SVG not found.');
                case 10:
                  return _context.abrupt("return", _context.t0);
                case 11:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }))();
      },
      applyAttributes: function applyAttributes(el, ref) {
        var _this4 = this;
        for (var prop in this.$options.props) {
          if (includes(this.include, prop) && prop in this) {
            attr(el, prop, this[prop]);
          }
        }
        for (var attribute in this.attributes) {
          var _this$attributes$attr = this.attributes[attribute].split(':', 2),
            _this$attributes$attr2 = _slicedToArray(_this$attributes$attr, 2),
            _prop = _this$attributes$attr2[0],
            value = _this$attributes$attr2[1];
          attr(el, _prop, value);
        }
        if (!this.id) {
          removeAttr(el, 'id');
        }
        var props = ['width', 'height'];
        var dimensions = props.map(function (prop) {
          return _this4[prop];
        });
        if (!dimensions.some(function (val) {
          return val;
        })) {
          dimensions = props.map(function (prop) {
            return attr(ref, prop);
          });
        }
        var viewBox = attr(ref, 'viewBox');
        if (viewBox && !dimensions.some(function (val) {
          return val;
        })) {
          dimensions = viewBox.split(' ').slice(2);
        }
        dimensions.forEach(function (val, i) {
          return attr(el, props[i], toFloat(val) * _this4.ratio || null);
        });
      }
    }
  };
  var loadSVG = memoize( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(src) {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!src) {
                _context2.next = 10;
                break;
              }
              if (!startsWith(src, 'data:')) {
                _context2.next = 5;
                break;
              }
              return _context2.abrupt("return", decodeURIComponent(src.split(',')[1]));
            case 5:
              _context2.next = 7;
              return fetch(src);
            case 7:
              return _context2.abrupt("return", _context2.sent.text());
            case 8:
              _context2.next = 11;
              break;
            case 10:
              return _context2.abrupt("return", Promise.reject());
            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
  function parseSVG(svg, icon) {
    var _svg;
    if (icon && includes(svg, '<symbol')) {
      svg = parseSymbols(svg, icon) || svg;
    }
    svg = $(svg.substr(svg.indexOf('<svg')));
    return ((_svg = svg) === null || _svg === void 0 ? void 0 : _svg.hasChildNodes()) && svg;
  }
  var symbolRe = /<symbol([^]*?id=(['"])(.+?)\2[^]*?<\/)symbol>/g;
  var symbols = {};
  function parseSymbols(svg, icon) {
    if (!symbols[svg]) {
      symbols[svg] = {};
      symbolRe.lastIndex = 0;
      var match;
      while (match = symbolRe.exec(svg)) {
        symbols[svg][match[3]] = "<svg xmlns=\"http://www.w3.org/2000/svg\"".concat(match[1], "svg>");
      }
    }
    return symbols[svg][icon];
  }
  function applyAnimation(el) {
    var length = getMaxPathLength(el);
    if (length) {
      el.style.setProperty('--uk-animation-stroke', length);
    }
  }
  function getMaxPathLength(el) {
    return Math.ceil(Math.max.apply(Math, [0].concat(_toConsumableArray($$('[stroke]', el).map(function (stroke) {
      try {
        return stroke.getTotalLength();
      } catch (e) {
        return 0;
      }
    })))));
  }
  function insertSVG(el, root) {
    if (isVoidElement(root) || isTag(root, 'canvas')) {
      root.hidden = true;
      var next = root.nextElementSibling;
      return equals(el, next) ? next : after(root, el);
    }
    var last = root.lastElementChild;
    return equals(el, last) ? last : append(root, el);
  }
  function equals(el, other) {
    return isTag(el, 'svg') && isTag(other, 'svg') && innerHTML(el) === innerHTML(other);
  }
  function innerHTML(el) {
    return (el.innerHTML || new XMLSerializer().serializeToString(el).replace(/<svg.*?>(.*?)<\/svg>/g, '$1')).replace(/\s/g, '');
  }

  var Switcher = {
    mixins: [Lazyload, Swipe, Togglable],
    args: 'connect',
    props: {
      connect: String,
      toggle: String,
      itemNav: String,
      active: Number
    },
    data: {
      connect: '~.uk-switcher',
      toggle: '> * > :first-child',
      itemNav: false,
      active: 0,
      cls: 'uk-active',
      attrItem: 'uk-switcher-item'
    },
    computed: {
      connects: {
        get: function get(_ref, $el) {
          var connect = _ref.connect;
          return queryAll(connect, $el);
        },
        watch: function watch(connects) {
          var _this = this;
          if (this.swiping) {
            css(connects, 'touchAction', 'pan-y pinch-zoom');
          }
          var index = this.index();
          this.connects.forEach(function (el) {
            children(el).forEach(function (child, i) {
              return toggleClass(child, _this.cls, i === index);
            });
            _this.lazyload(_this.$el, children(el));
          });
        },
        immediate: true
      },
      toggles: {
        get: function get(_ref2, $el) {
          var toggle = _ref2.toggle;
          return $$(toggle, $el).filter(function (el) {
            return !matches(el, '.uk-disabled *, .uk-disabled, [disabled]');
          });
        },
        watch: function watch(toggles) {
          var active = this.index();
          this.show(~active ? active : toggles[this.active] || toggles[0]);
        },
        immediate: true
      },
      children: function children$1() {
        var _this2 = this;
        return children(this.$el).filter(function (child) {
          return _this2.toggles.some(function (toggle) {
            return within(toggle, child);
          });
        });
      },
      swipeTarget: function swipeTarget() {
        return this.connects;
      }
    },
    connected: function connected() {
      var _this3 = this;
      // check for connects
      ready(function () {
        return _this3.$emit();
      });
    },
    events: [{
      name: 'click',
      delegate: function delegate() {
        return this.toggle;
      },
      handler: function handler(e) {
        e.preventDefault();
        this.show(e.current);
      }
    }, {
      name: 'click',
      el: function el() {
        return this.connects.concat(this.itemNav ? queryAll(this.itemNav, this.$el) : []);
      },
      delegate: function delegate() {
        return "[".concat(this.attrItem, "],[data-").concat(this.attrItem, "]");
      },
      handler: function handler(e) {
        e.preventDefault();
        this.show(data(e.current, this.attrItem));
      }
    }, {
      name: 'swipeRight swipeLeft',
      filter: function filter() {
        return this.swiping;
      },
      el: function el() {
        return this.connects;
      },
      handler: function handler(_ref3) {
        var type = _ref3.type;
        this.show(endsWith(type, 'Left') ? 'next' : 'previous');
      }
    }],
    methods: {
      index: function index() {
        var _this4 = this;
        return findIndex(this.children, function (el) {
          return hasClass(el, _this4.cls);
        });
      },
      show: function show(item) {
        var _this5 = this;
        var prev = this.index();
        var next = getIndex(item, this.toggles, prev);
        var active = getIndex(this.children[next], children(this.$el));
        children(this.$el).forEach(function (child, i) {
          toggleClass(child, _this5.cls, active === i);
          attr(_this5.toggles[i], 'aria-expanded', active === i);
        });
        var animate = prev >= 0 && prev !== next;
        this.connects.forEach( /*#__PURE__*/function () {
          var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(_ref4) {
            var children;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    children = _ref4.children;
                    _context.next = 3;
                    return _this5.toggleElement(toNodes(children).filter(function (child) {
                      return hasClass(child, _this5.cls);
                    }), false, animate);
                  case 3:
                    _context.next = 5;
                    return _this5.toggleElement(children[active], true, animate);
                  case 5:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));
          return function (_x) {
            return _ref5.apply(this, arguments);
          };
        }());
      }
    }
  };

  var tab = {
    mixins: [Class],
    "extends": Switcher,
    props: {
      media: Boolean
    },
    data: {
      media: 960,
      attrItem: 'uk-tab-item'
    },
    connected: function connected() {
      var cls = hasClass(this.$el, 'uk-tab-left') ? 'uk-tab-left' : hasClass(this.$el, 'uk-tab-right') ? 'uk-tab-right' : false;
      if (cls) {
        this.$create('toggle', this.$el, {
          cls: cls,
          mode: 'media',
          media: this.media
        });
      }
    }
  };

  var KEY_SPACE = 32;
  var toggle = {
    mixins: [Lazyload, Media, Togglable],
    args: 'target',
    props: {
      href: String,
      target: null,
      mode: 'list',
      queued: Boolean
    },
    data: {
      href: false,
      target: false,
      mode: 'click',
      queued: true
    },
    computed: {
      target: {
        get: function get(_ref, $el) {
          var href = _ref.href,
            target = _ref.target;
          target = queryAll(target || href, $el);
          return target.length && target || [$el];
        },
        watch: function watch() {
          this.updateAria();
          this.lazyload(this.$el, this.target);
        },
        immediate: true
      }
    },
    connected: function connected() {
      var _this = this;
      if (!includes(this.mode, 'media') && !isFocusable(this.$el)) {
        attr(this.$el, 'tabindex', '0');
      }

      // check for target
      ready(function () {
        return _this.$emit();
      });
    },
    events: [{
      name: pointerDown$1,
      filter: function filter() {
        return includes(this.mode, 'hover');
      },
      handler: function handler(e) {
        var _this2 = this;
        this._preventClick = null;
        if (!isTouch(e) || this._showState) {
          return;
        }

        // Clicking a button does not give it focus on all browsers and platforms
        // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#clicking_and_focus
        trigger(this.$el, 'focus');
        once(document, pointerDown$1, function () {
          return trigger(_this2.$el, 'blur');
        }, true, function (e) {
          return !within(e.target, _this2.$el);
        });

        // Prevent initial click to prevent double toggle through focus + click
        if (includes(this.mode, 'click')) {
          this._preventClick = true;
        }
      }
    }, {
      name: "".concat(pointerEnter, " ").concat(pointerLeave, " focus blur"),
      filter: function filter() {
        return includes(this.mode, 'hover');
      },
      handler: function handler(e) {
        if (isTouch(e)) {
          return;
        }
        var show = includes([pointerEnter, 'focus'], e.type);
        var expanded = attr(this.$el, 'aria-expanded');

        // Skip hide if still hovered or focused
        if (!show && (e.type === pointerLeave && matches(this.$el, ':focus') || e.type === 'blur' && matches(this.$el, ':hover'))) {
          return;
        }

        // Skip if state does not change e.g. hover + focus received
        if (this._showState && show && expanded !== this._showState) {
          // Ensure reset if state has changed through click
          if (!show) {
            this._showState = null;
          }
          return;
        }
        this._showState = show ? expanded : null;
        this.toggle("toggle".concat(show ? 'show' : 'hide'));
      }
    }, {
      name: 'keydown',
      filter: function filter() {
        return includes(this.mode, 'click') && !isTag(this.$el, 'input');
      },
      handler: function handler(e) {
        if (e.keyCode === KEY_SPACE) {
          e.preventDefault();
          this.$el.click();
        }
      }
    }, {
      name: 'click',
      filter: function filter() {
        var _this3 = this;
        return ['click', 'hover'].some(function (mode) {
          return includes(_this3.mode, mode);
        });
      },
      handler: function handler(e) {
        var link;
        if (this._preventClick || closest(e.target, 'a[href="#"], a[href=""]') || (link = closest(e.target, 'a[href]')) && (attr(this.$el, 'aria-expanded') !== 'true' || link.hash && matches(this.target, link.hash))) {
          e.preventDefault();
        }
        if (!this._preventClick && includes(this.mode, 'click')) {
          this.toggle();
        }
      }
    }, {
      name: 'hide show',
      self: true,
      el: function el() {
        return this.target;
      },
      handler: function handler(_ref2) {
        var type = _ref2.type;
        this.updateAria(type === 'show');
      }
    }, {
      name: 'mediachange',
      filter: function filter() {
        return includes(this.mode, 'media');
      },
      el: function el() {
        return this.target;
      },
      handler: function handler(e, mediaObj) {
        if (mediaObj.matches ^ this.isToggled(this.target)) {
          this.toggle();
        }
      }
    }],
    methods: {
      toggle: function toggle(type) {
        var _this4 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var leaving, _iterator, _step, el, isLeaving, toggled;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (trigger(_this4.target, type || 'toggle', [_this4])) {
                    _context.next = 2;
                    break;
                  }
                  return _context.abrupt("return");
                case 2:
                  if (_this4.queued) {
                    _context.next = 4;
                    break;
                  }
                  return _context.abrupt("return", _this4.toggleElement(_this4.target));
                case 4:
                  leaving = _this4.target.filter(function (el) {
                    return hasClass(el, _this4.clsLeave);
                  });
                  if (!leaving.length) {
                    _context.next = 9;
                    break;
                  }
                  _iterator = _createForOfIteratorHelper(_this4.target);
                  try {
                    for (_iterator.s(); !(_step = _iterator.n()).done;) {
                      el = _step.value;
                      isLeaving = includes(leaving, el);
                      _this4.toggleElement(el, isLeaving, isLeaving);
                    }
                  } catch (err) {
                    _iterator.e(err);
                  } finally {
                    _iterator.f();
                  }
                  return _context.abrupt("return");
                case 9:
                  toggled = _this4.target.filter(_this4.isToggled);
                  _context.next = 12;
                  return _this4.toggleElement(toggled, false);
                case 12:
                  _context.next = 14;
                  return _this4.toggleElement(_this4.target.filter(function (el) {
                    return !includes(toggled, el);
                  }), true);
                case 14:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }))();
      },
      updateAria: function updateAria(toggled) {
        if (includes(this.mode, 'media')) {
          return;
        }
        attr(this.$el, 'aria-expanded', isBoolean(toggled) ? toggled : this.isToggled(this.target));
      }
    }
  };

  // Icon components
  // export { Close } from './icon';
  // export { Spinner } from './icon';
  // export { NavParentIcon } from './icon';
  // export { Slidenav as SlidenavNext } from './icon';
  // export { Slidenav as SlidenavPrevious } from './icon';
  // export { Search as SearchIcon } from './icon';
  // export { IconComponent as Marker } from './icon';
  // export { IconComponent as NavbarParentIcon } from './icon';
  // export { IconComponent as NavbarToggleIcon } from './icon';
  // export { IconComponent as OverlayIcon } from './icon';
  // export { IconComponent as PaginationNext } from './icon';
  // export { IconComponent as PaginationPrevious } from './icon';
  // export { IconComponent as Totop } from './icon';

  var components$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Accordion: Accordion,
    Alert: alert$1,
    Cover: cover,
    Drop: drop,
    Dropdown: drop,
    FormCustom: formCustom,
    Grid: grid,
    HeightMatch: heightMatch,
    HeightViewport: heightViewport,
    Img: img,
    Leader: leader,
    Margin: Margin,
    Modal: modal,
    Nav: nav,
    Navbar: navbar,
    Offcanvas: offcanvas,
    OverflowAuto: overflowAuto,
    Responsive: responsive,
    Scroll: scroll,
    Scrollspy: scrollspy,
    ScrollspyNav: scrollspyNav,
    Sticky: sticky,
    Svg: svg,
    Switcher: Switcher,
    Tab: tab,
    Toggle: toggle,
    Video: Video
  });

  // register components
  each(components$1, function (component, name) {
    return UIkit.component(name, component);
  });
  boot(UIkit);

  var units = ['days', 'hours', 'minutes', 'seconds'];
  var countdown = {
    mixins: [Class],
    props: {
      date: String,
      clsWrapper: String
    },
    data: {
      date: '',
      clsWrapper: '.uk-countdown-%unit%'
    },
    connected: function connected() {
      this.date = Date.parse(this.$props.date);
      this.start();
    },
    disconnected: function disconnected() {
      this.stop();
    },
    events: [{
      name: 'visibilitychange',
      el: function el() {
        return document;
      },
      handler: function handler() {
        if (document.hidden) {
          this.stop();
        } else {
          this.start();
        }
      }
    }],
    methods: {
      start: function start() {
        this.stop();
        this.update();
        this.timer = setInterval(this.update, 1000);
      },
      stop: function stop() {
        clearInterval(this.timer);
      },
      update: function update() {
        var _this = this;
        var timespan = getTimeSpan(this.date);
        if (!this.date || timespan.total <= 0) {
          this.stop();
          timespan.days = timespan.hours = timespan.minutes = timespan.seconds = 0;
        }
        var _iterator = _createForOfIteratorHelper(units),
          _step;
        try {
          var _loop = function _loop() {
            var unit = _step.value;
            var el = $(_this.clsWrapper.replace('%unit%', unit), _this.$el);
            if (!el) {
              return "continue";
            }
            var digits = String(Math.trunc(timespan[unit]));
            digits = digits.length < 2 ? "0".concat(digits) : digits;
            if (el.textContent !== digits) {
              digits = digits.split('');
              if (digits.length !== el.children.length) {
                html(el, digits.map(function () {
                  return '<span></span>';
                }).join(''));
              }
              digits.forEach(function (digit, i) {
                return el.children[i].textContent = digit;
              });
            }
          };
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _ret = _loop();
            if (_ret === "continue") continue;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }
  };
  function getTimeSpan(date) {
    var total = date - Date.now();
    return {
      total: total,
      seconds: total / 1000 % 60,
      minutes: total / 1000 / 60 % 60,
      hours: total / 1000 / 60 / 60 % 24,
      days: total / 1000 / 60 / 60 / 24
    };
  }

  var clsLeave = 'uk-transition-leave';
  var clsEnter = 'uk-transition-enter';
  function fade(action, target, duration) {
    var stagger = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var index = transitionIndex(target, true);
    var propsIn = {
      opacity: 1
    };
    var propsOut = {
      opacity: 0
    };
    var wrapIndexFn = function wrapIndexFn(fn) {
      return function () {
        return index === transitionIndex(target) ? fn() : Promise.reject();
      };
    };
    var leaveFn = wrapIndexFn(function () {
      addClass(target, clsLeave);
      return Promise.all(getTransitionNodes(target).map(function (child, i) {
        return new Promise(function (resolve) {
          return setTimeout(function () {
            return Transition.start(child, propsOut, duration / 2, 'ease').then(resolve);
          }, i * stagger);
        });
      })).then(function () {
        return removeClass(target, clsLeave);
      });
    });
    var enterFn = wrapIndexFn(function () {
      var oldHeight = height(target);
      addClass(target, clsEnter);
      action();
      css(children(target), {
        opacity: 0
      });

      // Ensure UIkit updates have propagated
      return new Promise(function (resolve) {
        return requestAnimationFrame(function () {
          var nodes = children(target);
          var newHeight = height(target);

          // Ensure Grid cells do not stretch when height is applied
          css(target, 'alignContent', 'flex-start');
          height(target, oldHeight);
          var transitionNodes = getTransitionNodes(target);
          css(nodes, propsOut);
          var transitions = transitionNodes.map(function (child, i) {
            return new Promise(function (resolve) {
              return setTimeout(function () {
                return Transition.start(child, propsIn, duration / 2, 'ease').then(resolve);
              }, i * stagger);
            });
          });
          if (oldHeight !== newHeight) {
            transitions.push(Transition.start(target, {
              height: newHeight
            }, duration / 2 + transitionNodes.length * stagger, 'ease'));
          }
          Promise.all(transitions).then(function () {
            removeClass(target, clsEnter);
            if (index === transitionIndex(target)) {
              css(target, {
                height: '',
                alignContent: ''
              });
              css(nodes, {
                opacity: ''
              });
              delete target.dataset.transition;
            }
            resolve();
          });
        });
      });
    });
    return hasClass(target, clsLeave) ? waitTransitionend(target).then(enterFn) : hasClass(target, clsEnter) ? waitTransitionend(target).then(leaveFn).then(enterFn) : leaveFn().then(enterFn);
  }
  function transitionIndex(target, next) {
    if (next) {
      target.dataset.transition = 1 + transitionIndex(target);
    }
    return toNumber(target.dataset.transition) || 0;
  }
  function waitTransitionend(target) {
    return Promise.all(children(target).filter(Transition.inProgress).map(function (el) {
      return new Promise(function (resolve) {
        return once(el, 'transitionend transitioncanceled', resolve);
      });
    }));
  }
  function getTransitionNodes(target) {
    return getRows(children(target)).reduce(function (nodes, row) {
      return nodes.concat(sortBy$1(row.filter(function (el) {
        return isInView(el);
      }), 'offsetLeft'));
    }, []);
  }

  function slide (action, target, duration) {
    return new Promise(function (resolve) {
      return requestAnimationFrame(function () {
        var nodes = children(target);

        // Get current state
        var currentProps = nodes.map(function (el) {
          return getProps(el, true);
        });
        var targetProps = css(target, ['height', 'padding']);

        // Cancel previous animations
        Transition.cancel(target);
        nodes.forEach(Transition.cancel);
        reset(target);

        // Adding, sorting, removing nodes
        action();

        // Find new nodes
        nodes = nodes.concat(children(target).filter(function (el) {
          return !includes(nodes, el);
        }));

        // Wait for update to propagate
        Promise.resolve().then(function () {
          // Force update
          fastdom.flush();

          // Get new state
          var targetPropsTo = css(target, ['height', 'padding']);
          var _getTransitionProps = getTransitionProps(target, nodes, currentProps),
            _getTransitionProps2 = _slicedToArray(_getTransitionProps, 2),
            propsTo = _getTransitionProps2[0],
            propsFrom = _getTransitionProps2[1];

          // Reset to previous state
          nodes.forEach(function (el, i) {
            return propsFrom[i] && css(el, propsFrom[i]);
          });
          css(target, _objectSpread2({
            display: 'block'
          }, targetProps));

          // Start transitions on next frame
          requestAnimationFrame(function () {
            var transitions = nodes.map(function (el, i) {
              return parent(el) === target && Transition.start(el, propsTo[i], duration, 'ease');
            }).concat(Transition.start(target, targetPropsTo, duration, 'ease'));
            Promise.all(transitions).then(function () {
              nodes.forEach(function (el, i) {
                return parent(el) === target && css(el, 'display', propsTo[i].opacity === 0 ? 'none' : '');
              });
              reset(target);
            }, noop).then(resolve);
          });
        });
      });
    });
  }
  function getProps(el, opacity) {
    var zIndex = css(el, 'zIndex');
    return isVisible(el) ? _objectSpread2({
      display: '',
      opacity: opacity ? css(el, 'opacity') : '0',
      pointerEvents: 'none',
      position: 'absolute',
      zIndex: zIndex === 'auto' ? index(el) : zIndex
    }, getPositionWithMargin(el)) : false;
  }
  function getTransitionProps(target, nodes, currentProps) {
    var propsTo = nodes.map(function (el, i) {
      return parent(el) && i in currentProps ? currentProps[i] ? isVisible(el) ? getPositionWithMargin(el) : {
        opacity: 0
      } : {
        opacity: isVisible(el) ? 1 : 0
      } : false;
    });
    var propsFrom = propsTo.map(function (props, i) {
      var from = parent(nodes[i]) === target && (currentProps[i] || getProps(nodes[i]));
      if (!from) {
        return false;
      }
      if (!props) {
        delete from.opacity;
      } else if (!('opacity' in props)) {
        var opacity = from.opacity;
        if (opacity % 1) {
          props.opacity = 1;
        } else {
          delete from.opacity;
        }
      }
      return from;
    });
    return [propsTo, propsFrom];
  }
  function reset(el) {
    css(el.children, {
      height: '',
      left: '',
      opacity: '',
      pointerEvents: '',
      position: '',
      top: '',
      marginTop: '',
      marginLeft: '',
      transform: '',
      width: '',
      zIndex: ''
    });
    css(el, {
      height: '',
      display: '',
      padding: ''
    });
  }
  function getPositionWithMargin(el) {
    var _offset = offset(el),
      height = _offset.height,
      width = _offset.width;
    var _position = position(el),
      top = _position.top,
      left = _position.left;
    var _css = css(el, ['marginTop', 'marginLeft']),
      marginLeft = _css.marginLeft,
      marginTop = _css.marginTop;
    return {
      top: top,
      left: left,
      height: height,
      width: width,
      marginLeft: marginLeft,
      marginTop: marginTop,
      transform: ''
    };
  }

  var Animate = {
    props: {
      duration: Number,
      animation: Boolean
    },
    data: {
      duration: 150,
      animation: 'slide'
    },
    methods: {
      animate: function animate(action) {
        var _this = this;
        var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.$el;
        var name = this.animation;
        var animationFn = name === 'fade' ? fade : name === 'delayed-fade' ? function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return fade.apply(void 0, args.concat([40]));
        } : name ? slide : function () {
          action();
          return Promise.resolve();
        };
        return animationFn(action, target, this.duration).then(function () {
          return _this.$update(target, 'resize');
        }, noop);
      }
    }
  };

  var filter = {
    mixins: [Animate],
    args: 'target',
    props: {
      target: Boolean,
      selActive: Boolean
    },
    data: {
      target: null,
      selActive: false,
      attrItem: 'uk-filter-control',
      cls: 'uk-active',
      duration: 250
    },
    computed: {
      toggles: {
        get: function get(_ref, $el) {
          var attrItem = _ref.attrItem;
          return $$("[".concat(attrItem, "],[data-").concat(attrItem, "]"), $el);
        },
        watch: function watch() {
          var _this = this;
          this.updateState();
          if (this.selActive !== false) {
            var actives = $$(this.selActive, this.$el);
            this.toggles.forEach(function (el) {
              return toggleClass(el, _this.cls, includes(actives, el));
            });
          }
        },
        immediate: true
      },
      children: {
        get: function get(_ref2, $el) {
          var target = _ref2.target;
          return $$("".concat(target, " > *"), $el);
        },
        watch: function watch(list, old) {
          if (old && !isEqualList(list, old)) {
            this.updateState();
          }
        },
        immediate: true
      }
    },
    events: [{
      name: 'click',
      delegate: function delegate() {
        return "[".concat(this.attrItem, "],[data-").concat(this.attrItem, "]");
      },
      handler: function handler(e) {
        e.preventDefault();
        this.apply(e.current);
      }
    }],
    methods: {
      apply: function apply(el) {
        var prevState = this.getState();
        var newState = mergeState(el, this.attrItem, this.getState());
        if (!isEqualState(prevState, newState)) {
          this.setState(newState);
        }
      },
      getState: function getState() {
        var _this2 = this;
        return this.toggles.filter(function (item) {
          return hasClass(item, _this2.cls);
        }).reduce(function (state, el) {
          return mergeState(el, _this2.attrItem, state);
        }, {
          filter: {
            '': ''
          },
          sort: []
        });
      },
      setState: function setState(state) {
        var _arguments = arguments,
          _this3 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var animate;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  animate = _arguments.length > 1 && _arguments[1] !== undefined ? _arguments[1] : true;
                  state = _objectSpread2({
                    filter: {
                      '': ''
                    },
                    sort: []
                  }, state);
                  trigger(_this3.$el, 'beforeFilter', [_this3, state]);
                  _this3.toggles.forEach(function (el) {
                    return toggleClass(el, _this3.cls, !!matchFilter(el, _this3.attrItem, state));
                  });
                  _context.next = 6;
                  return Promise.all($$(_this3.target, _this3.$el).map(function (target) {
                    var filterFn = function filterFn() {
                      applyState(state, target, children(target));
                      _this3.$update(_this3.$el);
                    };
                    return animate ? _this3.animate(filterFn, target) : filterFn();
                  }));
                case 6:
                  trigger(_this3.$el, 'afterFilter', [_this3]);
                case 7:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }))();
      },
      updateState: function updateState() {
        var _this4 = this;
        fastdom.write(function () {
          return _this4.setState(_this4.getState(), false);
        });
      }
    }
  };
  function getFilter(el, attr) {
    return parseOptions(data(el, attr), ['filter']);
  }
  function isEqualState(stateA, stateB) {
    return ['filter', 'sort'].every(function (prop) {
      return isEqual(stateA[prop], stateB[prop]);
    });
  }
  function applyState(state, target, children) {
    var selector = getSelector(state);
    children.forEach(function (el) {
      return css(el, 'display', selector && !matches(el, selector) ? 'none' : '');
    });
    var _state$sort = _slicedToArray(state.sort, 2),
      sort = _state$sort[0],
      order = _state$sort[1];
    if (sort) {
      var sorted = sortItems(children, sort, order);
      if (!isEqual(sorted, children)) {
        append(target, sorted);
      }
    }
  }
  function mergeState(el, attr, state) {
    var filterBy = getFilter(el, attr);
    var filter = filterBy.filter,
      group = filterBy.group,
      sort = filterBy.sort,
      _filterBy$order = filterBy.order,
      order = _filterBy$order === void 0 ? 'asc' : _filterBy$order;
    if (filter || isUndefined(sort)) {
      if (group) {
        if (filter) {
          delete state.filter[''];
          state.filter[group] = filter;
        } else {
          delete state.filter[group];
          if (isEmpty(state.filter) || '' in state.filter) {
            state.filter = {
              '': filter || ''
            };
          }
        }
      } else {
        state.filter = {
          '': filter || ''
        };
      }
    }
    if (!isUndefined(sort)) {
      state.sort = [sort, order];
    }
    return state;
  }
  function matchFilter(el, attr, _ref3) {
    var _ref3$filter = _ref3.filter,
      stateFilter = _ref3$filter === void 0 ? {
        '': ''
      } : _ref3$filter,
      _ref3$sort = _slicedToArray(_ref3.sort, 2),
      stateSort = _ref3$sort[0],
      stateOrder = _ref3$sort[1];
    var _getFilter = getFilter(el, attr),
      _getFilter$filter = _getFilter.filter,
      filter = _getFilter$filter === void 0 ? '' : _getFilter$filter,
      _getFilter$group = _getFilter.group,
      group = _getFilter$group === void 0 ? '' : _getFilter$group,
      sort = _getFilter.sort,
      _getFilter$order = _getFilter.order,
      order = _getFilter$order === void 0 ? 'asc' : _getFilter$order;
    return isUndefined(sort) ? group in stateFilter && filter === stateFilter[group] || !filter && group && !(group in stateFilter) && !stateFilter[''] : stateSort === sort && stateOrder === order;
  }
  function isEqualList(listA, listB) {
    return listA.length === listB.length && listA.every(function (el) {
      return listB.includes(el);
    });
  }
  function getSelector(_ref4) {
    var filter = _ref4.filter;
    var selector = '';
    each(filter, function (value) {
      return selector += value || '';
    });
    return selector;
  }
  function sortItems(nodes, sort, order) {
    return _toConsumableArray(nodes).sort(function (a, b) {
      return data(a, sort).localeCompare(data(b, sort), undefined, {
        numeric: true
      }) * (order === 'asc' || -1);
    });
  }

  var Animations$2 = {
    slide: {
      show: function show(dir) {
        return [{
          transform: _translate(dir * -100)
        }, {
          transform: _translate()
        }];
      },
      percent: function percent(current) {
        return translated(current);
      },
      translate: function translate(percent, dir) {
        return [{
          transform: _translate(dir * -100 * percent)
        }, {
          transform: _translate(dir * 100 * (1 - percent))
        }];
      }
    }
  };
  function translated(el) {
    return Math.abs(css(el, 'transform').split(',')[4] / el.offsetWidth) || 0;
  }
  function _translate() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '%';
    value += value ? unit : '';
    return "translate3d(".concat(value, ", 0, 0)");
  }
  function scale3d(value) {
    return "scale3d(".concat(value, ", ").concat(value, ", 1)");
  }

  var Animations$1 = _objectSpread2(_objectSpread2({}, Animations$2), {}, {
    fade: {
      show: function show() {
        return [{
          opacity: 0
        }, {
          opacity: 1
        }];
      },
      percent: function percent(current) {
        return 1 - css(current, 'opacity');
      },
      translate: function translate(percent) {
        return [{
          opacity: 1 - percent
        }, {
          opacity: percent
        }];
      }
    },
    scale: {
      show: function show() {
        return [{
          opacity: 0,
          transform: scale3d(1 - 0.2)
        }, {
          opacity: 1,
          transform: scale3d(1)
        }];
      },
      percent: function percent(current) {
        return 1 - css(current, 'opacity');
      },
      translate: function translate(percent) {
        return [{
          opacity: 1 - percent,
          transform: scale3d(1 - 0.2 * percent)
        }, {
          opacity: percent,
          transform: scale3d(1 - 0.2 + 0.2 * percent)
        }];
      }
    }
  });

  function Transitioner$1(prev, next, dir, _ref) {
    var animation = _ref.animation,
      easing = _ref.easing;
    var _percent = animation.percent,
      _translate = animation.translate,
      _animation$show = animation.show,
      show = _animation$show === void 0 ? noop : _animation$show;
    var props = show(dir);
    var deferred = new Deferred();
    return {
      dir: dir,
      show: function show(duration) {
        var _this = this;
        var percent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var linear = arguments.length > 2 ? arguments[2] : undefined;
        var timing = linear ? 'linear' : easing;
        duration -= Math.round(duration * clamp(percent, -1, 1));
        this.translate(percent);
        triggerUpdate$1(next, 'itemin', {
          percent: percent,
          duration: duration,
          timing: timing,
          dir: dir
        });
        triggerUpdate$1(prev, 'itemout', {
          percent: 1 - percent,
          duration: duration,
          timing: timing,
          dir: dir
        });
        Promise.all([Transition.start(next, props[1], duration, timing), Transition.start(prev, props[0], duration, timing)]).then(function () {
          _this.reset();
          deferred.resolve();
        }, noop);
        return deferred.promise;
      },
      cancel: function cancel() {
        Transition.cancel([next, prev]);
      },
      reset: function reset() {
        for (var prop in props[0]) {
          css([next, prev], prop, '');
        }
      },
      forward: function forward(duration) {
        var percent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.percent();
        Transition.cancel([next, prev]);
        return this.show(duration, percent, true);
      },
      translate: function translate(percent) {
        this.reset();
        var props = _translate(percent, dir);
        css(next, props[1]);
        css(prev, props[0]);
        triggerUpdate$1(next, 'itemtranslatein', {
          percent: percent,
          dir: dir
        });
        triggerUpdate$1(prev, 'itemtranslateout', {
          percent: 1 - percent,
          dir: dir
        });
      },
      percent: function percent() {
        return _percent(prev || next, next, dir);
      },
      getDistance: function getDistance() {
        return prev === null || prev === void 0 ? void 0 : prev.offsetWidth;
      }
    };
  }
  function triggerUpdate$1(el, type, data) {
    trigger(el, createEvent(type, false, false, data));
  }

  var SliderAutoplay = {
    props: {
      autoplay: Boolean,
      autoplayInterval: Number,
      pauseOnHover: Boolean
    },
    data: {
      autoplay: false,
      autoplayInterval: 7000,
      pauseOnHover: true
    },
    connected: function connected() {
      this.autoplay && this.startAutoplay();
    },
    disconnected: function disconnected() {
      this.stopAutoplay();
    },
    update: function update() {
      attr(this.slides, 'tabindex', '-1');
    },
    events: [{
      name: 'visibilitychange',
      el: function el() {
        return document;
      },
      filter: function filter() {
        return this.autoplay;
      },
      handler: function handler() {
        if (document.hidden) {
          this.stopAutoplay();
        } else {
          this.startAutoplay();
        }
      }
    }],
    methods: {
      startAutoplay: function startAutoplay() {
        var _this = this;
        this.stopAutoplay();
        this.interval = setInterval(function () {
          return (!_this.draggable || !$(':focus', _this.$el)) && (!_this.pauseOnHover || !matches(_this.$el, ':hover')) && !_this.stack.length && _this.show('next');
        }, this.autoplayInterval);
      },
      stopAutoplay: function stopAutoplay() {
        this.interval && clearInterval(this.interval);
      }
    }
  };

  var pointerOptions = {
    passive: false,
    capture: true
  };
  var pointerDown = 'touchstart mousedown';
  var pointerMove = 'touchmove mousemove';
  var pointerUp = 'touchend touchcancel mouseup click input';
  var SliderDrag = {
    props: {
      draggable: Boolean
    },
    data: {
      draggable: true,
      threshold: 10
    },
    created: function created() {
      var _this = this;
      var _loop = function _loop() {
        var key = _arr[_i];
        var fn = _this[key];
        _this[key] = function (e) {
          var pos = getEventPos(e).x * (isRtl ? -1 : 1);
          _this.prevPos = pos === _this.pos ? _this.prevPos : _this.pos;
          _this.pos = pos;
          fn(e);
        };
      };
      for (var _i = 0, _arr = ['start', 'move', 'end']; _i < _arr.length; _i++) {
        _loop();
      }
    },
    events: [{
      name: pointerDown,
      delegate: function delegate() {
        return this.selSlides;
      },
      handler: function handler(e) {
        if (!this.draggable || !isTouch(e) && hasTextNodesOnly(e.target) || closest(e.target, selInput) || e.button > 0 || this.length < 2) {
          return;
        }
        this.start(e);
      }
    }, {
      name: 'dragstart',
      handler: function handler(e) {
        e.preventDefault();
      }
    }, _objectSpread2({
      // iOS workaround for slider stopping if swiping fast
      name: "".concat(pointerMove, " ").concat(pointerUp),
      el: function el() {
        return this.list;
      },
      handler: noop
    }, pointerOptions)],
    methods: {
      start: function start() {
        this.drag = this.pos;
        if (this._transitioner) {
          this.percent = this._transitioner.percent();
          this.drag += this._transitioner.getDistance() * this.percent * this.dir;
          this._transitioner.cancel();
          this._transitioner.translate(this.percent);
          this.dragging = true;
          this.stack = [];
        } else {
          this.prevIndex = this.index;
        }
        on(document, pointerMove, this.move, pointerOptions);

        // 'input' event is triggered by video controls
        on(document, pointerUp, this.end, pointerOptions);
        css(this.list, 'userSelect', 'none');
      },
      move: function move(e) {
        var _this2 = this;
        var distance = this.pos - this.drag;
        if (distance === 0 || this.prevPos === this.pos || !this.dragging && Math.abs(distance) < this.threshold) {
          return;
        }

        // prevent click event
        css(this.list, 'pointerEvents', 'none');
        e.cancelable && e.preventDefault();
        this.dragging = true;
        this.dir = distance < 0 ? 1 : -1;
        var slides = this.slides;
        var prevIndex = this.prevIndex;
        var dis = Math.abs(distance);
        var nextIndex = this.getIndex(prevIndex + this.dir, prevIndex);
        var width = this._getDistance(prevIndex, nextIndex) || slides[prevIndex].offsetWidth;
        while (nextIndex !== prevIndex && dis > width) {
          this.drag -= width * this.dir;
          prevIndex = nextIndex;
          dis -= width;
          nextIndex = this.getIndex(prevIndex + this.dir, prevIndex);
          width = this._getDistance(prevIndex, nextIndex) || slides[prevIndex].offsetWidth;
        }
        this.percent = dis / width;
        var prev = slides[prevIndex];
        var next = slides[nextIndex];
        var changed = this.index !== nextIndex;
        var edge = prevIndex === nextIndex;
        var itemShown;
        [this.index, this.prevIndex].filter(function (i) {
          return !includes([nextIndex, prevIndex], i);
        }).forEach(function (i) {
          trigger(slides[i], 'itemhidden', [_this2]);
          if (edge) {
            itemShown = true;
            _this2.prevIndex = prevIndex;
          }
        });
        if (this.index === prevIndex && this.prevIndex !== prevIndex || itemShown) {
          trigger(slides[this.index], 'itemshown', [this]);
        }
        if (changed) {
          this.prevIndex = prevIndex;
          this.index = nextIndex;
          !edge && trigger(prev, 'beforeitemhide', [this]);
          trigger(next, 'beforeitemshow', [this]);
        }
        this._transitioner = this._translate(Math.abs(this.percent), prev, !edge && next);
        if (changed) {
          !edge && trigger(prev, 'itemhide', [this]);
          trigger(next, 'itemshow', [this]);
        }
      },
      end: function end() {
        off(document, pointerMove, this.move, pointerOptions);
        off(document, pointerUp, this.end, pointerOptions);
        if (this.dragging) {
          this.dragging = null;
          if (this.index === this.prevIndex) {
            this.percent = 1 - this.percent;
            this.dir *= -1;
            this._show(false, this.index, true);
            this._transitioner = null;
          } else {
            var dirChange = (isRtl ? this.dir * (isRtl ? 1 : -1) : this.dir) < 0 === this.prevPos > this.pos;
            this.index = dirChange ? this.index : this.prevIndex;
            if (dirChange) {
              this.percent = 1 - this.percent;
            }
            this.show(this.dir > 0 && !dirChange || this.dir < 0 && dirChange ? 'next' : 'previous', true);
          }
        }
        css(this.list, {
          userSelect: '',
          pointerEvents: ''
        });
        this.drag = this.percent = null;
      }
    }
  };
  function hasTextNodesOnly(el) {
    return !el.children.length && el.childNodes.length;
  }

  var SliderNav = {
    data: {
      selNav: false
    },
    computed: {
      nav: function nav(_ref, $el) {
        var selNav = _ref.selNav;
        return $(selNav, $el);
      },
      selNavItem: function selNavItem(_ref2) {
        var attrItem = _ref2.attrItem;
        return "[".concat(attrItem, "],[data-").concat(attrItem, "]");
      },
      navItems: function navItems(_, $el) {
        return $$(this.selNavItem, $el);
      }
    },
    update: {
      write: function write() {
        var _this = this;
        if (this.nav && this.length !== this.nav.children.length) {
          html(this.nav, this.slides.map(function (_, i) {
            return "<li ".concat(_this.attrItem, "=\"").concat(i, "\"><a href></a></li>");
          }).join(''));
        }
        this.navItems.concat(this.nav).forEach(function (el) {
          return el && (el.hidden = !_this.maxIndex);
        });
        this.updateNav();
      },
      events: ['resize']
    },
    events: [{
      name: 'click',
      delegate: function delegate() {
        return this.selNavItem;
      },
      handler: function handler(e) {
        e.preventDefault();
        this.show(data(e.current, this.attrItem));
      }
    }, {
      name: 'itemshow',
      handler: 'updateNav'
    }],
    methods: {
      updateNav: function updateNav() {
        var i = this.getValidIndex();
        var _iterator = _createForOfIteratorHelper(this.navItems),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var el = _step.value;
            var cmd = data(el, this.attrItem);
            toggleClass(el, this.clsActive, toNumber(cmd) === i);
            toggleClass(el, 'uk-invisible', this.finite && (cmd === 'previous' && i === 0 || cmd === 'next' && i >= this.maxIndex));
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }
  };

  var Slider = {
    mixins: [SliderAutoplay, SliderDrag, SliderNav, Resize],
    props: {
      clsActivated: Boolean,
      easing: String,
      index: Number,
      finite: Boolean,
      velocity: Number,
      selSlides: String
    },
    data: function data() {
      return {
        easing: 'ease',
        finite: false,
        velocity: 1,
        index: 0,
        prevIndex: -1,
        stack: [],
        percent: 0,
        clsActive: 'uk-active',
        clsActivated: false,
        Transitioner: false,
        transitionOptions: {}
      };
    },
    connected: function connected() {
      this.prevIndex = -1;
      this.index = this.getValidIndex(this.$props.index);
      this.stack = [];
    },
    disconnected: function disconnected() {
      removeClass(this.slides, this.clsActive);
    },
    computed: {
      duration: function duration(_ref, $el) {
        var velocity = _ref.velocity;
        return speedUp($el.offsetWidth / velocity);
      },
      list: function list(_ref2, $el) {
        var selList = _ref2.selList;
        return $(selList, $el);
      },
      maxIndex: function maxIndex() {
        return this.length - 1;
      },
      selSlides: function selSlides(_ref3) {
        var selList = _ref3.selList,
          selSlides = _ref3.selSlides;
        return "".concat(selList, " ").concat(selSlides || '> *');
      },
      slides: {
        get: function get() {
          return $$(this.selSlides, this.$el);
        },
        watch: function watch() {
          this.$reset();
        }
      },
      length: function length() {
        return this.slides.length;
      }
    },
    methods: {
      show: function show(index) {
        var _this = this;
        var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        if (this.dragging || !this.length) {
          return;
        }
        var stack = this.stack;
        var queueIndex = force ? 0 : stack.length;
        var reset = function reset() {
          stack.splice(queueIndex, 1);
          if (stack.length) {
            _this.show(stack.shift(), true);
          }
        };
        stack[force ? 'unshift' : 'push'](index);
        if (!force && stack.length > 1) {
          if (stack.length === 2) {
            this._transitioner.forward(Math.min(this.duration, 200));
          }
          return;
        }
        var prevIndex = this.getIndex(this.index);
        var prev = hasClass(this.slides, this.clsActive) && this.slides[prevIndex];
        var nextIndex = this.getIndex(index, this.index);
        var next = this.slides[nextIndex];
        if (prev === next) {
          reset();
          return;
        }
        this.dir = getDirection(index, prevIndex);
        this.prevIndex = prevIndex;
        this.index = nextIndex;
        if (prev && !trigger(prev, 'beforeitemhide', [this]) || !trigger(next, 'beforeitemshow', [this, prev])) {
          this.index = this.prevIndex;
          reset();
          return;
        }
        var promise = this._show(prev, next, force).then(function () {
          prev && trigger(prev, 'itemhidden', [_this]);
          trigger(next, 'itemshown', [_this]);
          return new Promise(function (resolve) {
            fastdom.write(function () {
              stack.shift();
              if (stack.length) {
                _this.show(stack.shift(), true);
              } else {
                _this._transitioner = null;
              }
              resolve();
            });
          });
        });
        prev && trigger(prev, 'itemhide', [this]);
        trigger(next, 'itemshow', [this]);
        return promise;
      },
      getIndex: function getIndex$1() {
        var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.index;
        var prev = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.index;
        return clamp(getIndex(index, this.slides, prev, this.finite), 0, this.maxIndex);
      },
      getValidIndex: function getValidIndex() {
        var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.index;
        var prevIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.prevIndex;
        return this.getIndex(index, prevIndex);
      },
      _show: function _show(prev, next, force) {
        this._transitioner = this._getTransitioner(prev, next, this.dir, _objectSpread2({
          easing: force ? next.offsetWidth < 600 ? 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' /* easeOutQuad */ : 'cubic-bezier(0.165, 0.84, 0.44, 1)' /* easeOutQuart */ : this.easing
        }, this.transitionOptions));
        if (!force && !prev) {
          this._translate(1);
          return Promise.resolve();
        }
        var length = this.stack.length;
        return this._transitioner[length > 1 ? 'forward' : 'show'](length > 1 ? Math.min(this.duration, 75 + 75 / (length - 1)) : this.duration, this.percent);
      },
      _getDistance: function _getDistance(prev, next) {
        return this._getTransitioner(prev, prev !== next && next).getDistance();
      },
      _translate: function _translate(percent) {
        var prev = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.prevIndex;
        var next = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.index;
        var transitioner = this._getTransitioner(prev !== next ? prev : false, next);
        transitioner.translate(percent);
        return transitioner;
      },
      _getTransitioner: function _getTransitioner() {
        var prev = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.prevIndex;
        var next = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.index;
        var dir = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.dir || 1;
        var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.transitionOptions;
        return new this.Transitioner(isNumber(prev) ? this.slides[prev] : prev, isNumber(next) ? this.slides[next] : next, dir * (isRtl ? -1 : 1), options);
      }
    }
  };
  function getDirection(index, prevIndex) {
    return index === 'next' ? 1 : index === 'previous' ? -1 : index < prevIndex ? -1 : 1;
  }
  function speedUp(x) {
    return 0.5 * x + 300; // parabola through (400,500; 600,600; 1800,1200)
  }

  var Slideshow = {
    mixins: [Slider],
    props: {
      animation: String
    },
    data: {
      animation: 'slide',
      clsActivated: 'uk-transition-active',
      Animations: Animations$2,
      Transitioner: Transitioner$1
    },
    computed: {
      animation: function animation(_ref) {
        var animation = _ref.animation,
          Animations = _ref.Animations;
        return _objectSpread2(_objectSpread2({}, Animations[animation] || Animations.slide), {}, {
          name: animation
        });
      },
      transitionOptions: function transitionOptions() {
        return {
          animation: this.animation
        };
      }
    },
    events: {
      beforeitemshow: function beforeitemshow(_ref2) {
        var target = _ref2.target;
        addClass(target, this.clsActive);
      },
      itemshown: function itemshown(_ref3) {
        var target = _ref3.target;
        addClass(target, this.clsActivated);
      },
      itemhidden: function itemhidden(_ref4) {
        var target = _ref4.target;
        removeClass(target, this.clsActive, this.clsActivated);
      }
    }
  };

  var LightboxPanel = {
    mixins: [Container, Modal, Togglable, Slideshow],
    functional: true,
    props: {
      delayControls: Number,
      preload: Number,
      videoAutoplay: Boolean,
      template: String
    },
    data: function data() {
      return {
        preload: 1,
        videoAutoplay: false,
        delayControls: 3000,
        items: [],
        cls: 'uk-open',
        clsPage: 'uk-lightbox-page',
        selList: '.uk-lightbox-items',
        attrItem: 'uk-lightbox-item',
        selClose: '.uk-close-large',
        selCaption: '.uk-lightbox-caption',
        pauseOnHover: false,
        velocity: 2,
        Animations: Animations$1,
        template: "<div class=\"uk-lightbox uk-overflow-hidden\">\n                        <ul class=\"uk-lightbox-items\"></ul>\n                        <div class=\"uk-lightbox-toolbar uk-position-top uk-text-right uk-transition-slide-top uk-transition-opaque\">\n                            <button class=\"uk-lightbox-toolbar-icon uk-close-large\" type=\"button\" uk-close></button>\n                         </div>\n                        <a class=\"uk-lightbox-button uk-position-center-left uk-position-medium uk-transition-fade\" href uk-slidenav-previous uk-lightbox-item=\"previous\"></a>\n                        <a class=\"uk-lightbox-button uk-position-center-right uk-position-medium uk-transition-fade\" href uk-slidenav-next uk-lightbox-item=\"next\"></a>\n                        <div class=\"uk-lightbox-toolbar uk-lightbox-caption uk-position-bottom uk-text-center uk-transition-slide-bottom uk-transition-opaque\"></div>\n                    </div>"
      };
    },
    created: function created() {
      var $el = $(this.template);
      var list = $(this.selList, $el);
      this.items.forEach(function () {
        return append(list, '<li>');
      });
      this.$mount(append(this.container, $el));
    },
    computed: {
      caption: function caption(_ref, $el) {
        var selCaption = _ref.selCaption;
        return $(selCaption, $el);
      }
    },
    events: [{
      name: "".concat(pointerMove$1, " ").concat(pointerDown$1, " keydown"),
      handler: 'showControls'
    }, {
      name: 'click',
      self: true,
      delegate: function delegate() {
        return this.selSlides;
      },
      handler: function handler(e) {
        if (e.defaultPrevented) {
          return;
        }
        this.hide();
      }
    }, {
      name: 'shown',
      self: true,
      handler: function handler() {
        this.showControls();
      }
    }, {
      name: 'hide',
      self: true,
      handler: function handler() {
        this.hideControls();
        removeClass(this.slides, this.clsActive);
        Transition.stop(this.slides);
      }
    }, {
      name: 'hidden',
      self: true,
      handler: function handler() {
        this.$destroy(true);
      }
    }, {
      name: 'keyup',
      el: function el() {
        return document;
      },
      handler: function handler(e) {
        if (!this.isToggled(this.$el) || !this.draggable) {
          return;
        }
        switch (e.keyCode) {
          case 37:
            this.show('previous');
            break;
          case 39:
            this.show('next');
            break;
        }
      }
    }, {
      name: 'beforeitemshow',
      handler: function handler(e) {
        if (this.isToggled()) {
          return;
        }
        this.draggable = false;
        e.preventDefault();
        this.toggleElement(this.$el, true, false);
        this.animation = Animations$1['scale'];
        removeClass(e.target, this.clsActive);
        this.stack.splice(1, 0, this.index);
      }
    }, {
      name: 'itemshow',
      handler: function handler() {
        html(this.caption, this.getItem().caption || '');
        for (var j = -this.preload; j <= this.preload; j++) {
          this.loadItem(this.index + j);
        }
      }
    }, {
      name: 'itemshown',
      handler: function handler() {
        this.draggable = this.$props.draggable;
      }
    }, {
      name: 'itemload',
      handler: function handler(_, item) {
        var _this = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var src, type, _item$alt, alt, poster, _item$attrs, attrs, matches, iframeAttrs, _yield$getImage, width, height, video, _yield$yield$fetch$js, _height, _width;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  src = item.source, type = item.type, _item$alt = item.alt, alt = _item$alt === void 0 ? '' : _item$alt, poster = item.poster, _item$attrs = item.attrs, attrs = _item$attrs === void 0 ? {} : _item$attrs;
                  _this.setItem(item, '<span uk-spinner></span>');
                  if (src) {
                    _context.next = 4;
                    break;
                  }
                  return _context.abrupt("return");
                case 4:
                  iframeAttrs = {
                    frameborder: '0',
                    allowfullscreen: '',
                    style: 'max-width: 100%; box-sizing: border-box;',
                    'uk-responsive': '',
                    'uk-video': "".concat(_this.videoAutoplay)
                  }; // Image
                  if (!(type === 'image' || src.match(/\.(avif|jpe?g|jfif|a?png|gif|svg|webp)($|\?)/i))) {
                    _context.next = 20;
                    break;
                  }
                  _context.prev = 6;
                  _context.next = 9;
                  return getImage(src, attrs.srcset, attrs.size);
                case 9:
                  _yield$getImage = _context.sent;
                  width = _yield$getImage.width;
                  height = _yield$getImage.height;
                  _this.setItem(item, createEl('img', _objectSpread2({
                    src: src,
                    width: width,
                    height: height,
                    alt: alt
                  }, attrs)));
                  _context.next = 18;
                  break;
                case 15:
                  _context.prev = 15;
                  _context.t0 = _context["catch"](6);
                  _this.setError(item);
                case 18:
                  _context.next = 49;
                  break;
                case 20:
                  if (!(type === 'video' || src.match(/\.(mp4|webm|ogv)($|\?)/i))) {
                    _context.next = 26;
                    break;
                  }
                  video = createEl('video', _objectSpread2({
                    src: src,
                    poster: poster,
                    controls: '',
                    playsinline: '',
                    'uk-video': "".concat(_this.videoAutoplay)
                  }, attrs));
                  on(video, 'loadedmetadata', function () {
                    attr(video, {
                      width: video.videoWidth,
                      height: video.videoHeight
                    });
                    _this.setItem(item, video);
                  });
                  on(video, 'error', function () {
                    return _this.setError(item);
                  });

                  // Iframe
                  _context.next = 49;
                  break;
                case 26:
                  if (!(type === 'iframe' || src.match(/\.(html|php)($|\?)/i))) {
                    _context.next = 30;
                    break;
                  }
                  _this.setItem(item, createEl('iframe', _objectSpread2({
                    src: src,
                    frameborder: '0',
                    allowfullscreen: '',
                    "class": 'uk-lightbox-iframe'
                  }, attrs)));

                  // YouTube
                  _context.next = 49;
                  break;
                case 30:
                  if (!(matches = src.match(/\/\/(?:.*?youtube(-nocookie)?\..*?[?&]v=|youtu\.be\/)([\w-]{11})[&?]?(.*)?/))) {
                    _context.next = 34;
                    break;
                  }
                  _this.setItem(item, createEl('iframe', _objectSpread2(_objectSpread2({
                    src: "https://www.youtube".concat(matches[1] || '', ".com/embed/").concat(matches[2]).concat(matches[3] ? "?".concat(matches[3]) : ''),
                    width: 1920,
                    height: 1080
                  }, iframeAttrs), attrs)));

                  // Vimeo
                  _context.next = 49;
                  break;
                case 34:
                  if (!(matches = src.match(/\/\/.*?vimeo\.[a-z]+\/(\d+)[&?]?(.*)?/))) {
                    _context.next = 49;
                    break;
                  }
                  _context.prev = 35;
                  _context.next = 38;
                  return fetch("https://vimeo.com/api/oembed.json?maxwidth=1920&url=".concat(encodeURI(src)), {
                    credentials: 'omit'
                  });
                case 38:
                  _context.next = 40;
                  return _context.sent.json();
                case 40:
                  _yield$yield$fetch$js = _context.sent;
                  _height = _yield$yield$fetch$js.height;
                  _width = _yield$yield$fetch$js.width;
                  _this.setItem(item, createEl('iframe', _objectSpread2(_objectSpread2({
                    src: "https://player.vimeo.com/video/".concat(matches[1]).concat(matches[2] ? "?".concat(matches[2]) : ''),
                    width: _width,
                    height: _height
                  }, iframeAttrs), attrs)));
                  _context.next = 49;
                  break;
                case 46:
                  _context.prev = 46;
                  _context.t1 = _context["catch"](35);
                  _this.setError(item);
                case 49:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[6, 15], [35, 46]]);
        }))();
      }
    }],
    methods: {
      loadItem: function loadItem() {
        var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.index;
        var item = this.getItem(index);
        if (!this.getSlide(item).childElementCount) {
          trigger(this.$el, 'itemload', [item]);
        }
      },
      getItem: function getItem() {
        var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.index;
        return this.items[getIndex(index, this.slides)];
      },
      setItem: function setItem(item, content) {
        trigger(this.$el, 'itemloaded', [this, html(this.getSlide(item), content)]);
      },
      getSlide: function getSlide(item) {
        return this.slides[this.items.indexOf(item)];
      },
      setError: function setError(item) {
        this.setItem(item, '<span uk-icon="icon: bolt; ratio: 2"></span>');
      },
      showControls: function showControls() {
        clearTimeout(this.controlsTimer);
        this.controlsTimer = setTimeout(this.hideControls, this.delayControls);
        addClass(this.$el, 'uk-active', 'uk-transition-active');
      },
      hideControls: function hideControls() {
        removeClass(this.$el, 'uk-active', 'uk-transition-active');
      }
    }
  };
  function createEl(tag, attrs) {
    var el = fragment("<".concat(tag, ">"));
    attr(el, attrs);
    return el;
  }

  var lightbox = {
    install: install$1,
    props: {
      toggle: String
    },
    data: {
      toggle: 'a'
    },
    computed: {
      toggles: {
        get: function get(_ref, $el) {
          var toggle = _ref.toggle;
          return $$(toggle, $el);
        },
        watch: function watch() {
          this.hide();
        }
      }
    },
    disconnected: function disconnected() {
      this.hide();
    },
    events: [{
      name: 'click',
      delegate: function delegate() {
        return "".concat(this.toggle, ":not(.uk-disabled)");
      },
      handler: function handler(e) {
        e.preventDefault();
        this.show(e.current);
      }
    }],
    methods: {
      show: function show(index) {
        var _this = this;
        var items = uniqueBy(this.toggles.map(toItem), 'source');
        if (isElement(index)) {
          var _toItem = toItem(index),
            source = _toItem.source;
          index = findIndex(items, function (_ref2) {
            var src = _ref2.source;
            return source === src;
          });
        }
        this.panel = this.panel || this.$create('lightboxPanel', _objectSpread2(_objectSpread2({}, this.$props), {}, {
          items: items
        }));
        on(this.panel.$el, 'hidden', function () {
          return _this.panel = false;
        });
        return this.panel.show(index);
      },
      hide: function hide() {
        var _this$panel;
        return (_this$panel = this.panel) === null || _this$panel === void 0 ? void 0 : _this$panel.hide();
      }
    }
  };
  function install$1(UIkit, Lightbox) {
    if (!UIkit.lightboxPanel) {
      UIkit.component('lightboxPanel', LightboxPanel);
    }
    assign(Lightbox.props, UIkit.component('lightboxPanel').options.props);
  }
  function toItem(el) {
    var item = {};
    for (var _i = 0, _arr = ['href', 'caption', 'type', 'poster', 'alt', 'attrs']; _i < _arr.length; _i++) {
      var attr = _arr[_i];
      item[attr === 'href' ? 'source' : attr] = data(el, attr);
    }
    item.attrs = parseOptions(item.attrs);
    return item;
  }

  var _events$1;
  var notification = {
    mixins: [Container],
    functional: true,
    args: ['message', 'status'],
    data: {
      message: '',
      status: '',
      timeout: 5000,
      group: null,
      pos: 'top-center',
      clsContainer: 'uk-notification',
      clsClose: 'uk-notification-close',
      clsMsg: 'uk-notification-message'
    },
    install: install,
    computed: {
      marginProp: function marginProp(_ref) {
        var pos = _ref.pos;
        return "margin".concat(startsWith(pos, 'top') ? 'Top' : 'Bottom');
      },
      startProps: function startProps() {
        return _defineProperty({
          opacity: 0
        }, this.marginProp, -this.$el.offsetHeight);
      }
    },
    created: function created() {
      var container = $(".".concat(this.clsContainer, "-").concat(this.pos), this.container) || append(this.container, "<div class=\"".concat(this.clsContainer, " ").concat(this.clsContainer, "-").concat(this.pos, "\" style=\"display: block\"></div>"));
      this.$mount(append(container, "<div class=\"".concat(this.clsMsg).concat(this.status ? " ".concat(this.clsMsg, "-").concat(this.status) : '', "\" role=\"alert\">\n                <a href class=\"").concat(this.clsClose, "\" data-uk-close></a>\n                <div>").concat(this.message, "</div>\n            </div>")));
    },
    connected: function connected() {
      var _this = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var margin;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                margin = toFloat(css(_this.$el, _this.marginProp));
                _context.next = 3;
                return Transition.start(css(_this.$el, _this.startProps), _defineProperty({
                  opacity: 1
                }, _this.marginProp, margin));
              case 3:
                if (_this.timeout) {
                  _this.timer = setTimeout(_this.close, _this.timeout);
                }
              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    events: (_events$1 = {
      click: function click(e) {
        if (closest(e.target, 'a[href="#"],a[href=""]')) {
          e.preventDefault();
        }
        this.close();
      }
    }, _defineProperty(_events$1, pointerEnter, function () {
      if (this.timer) {
        clearTimeout(this.timer);
      }
    }), _defineProperty(_events$1, pointerLeave, function () {
      if (this.timeout) {
        this.timer = setTimeout(this.close, this.timeout);
      }
    }), _events$1),
    methods: {
      close: function close(immediate) {
        var _this2 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          var removeFn;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  removeFn = function removeFn(el) {
                    var container = parent(el);
                    trigger(el, 'close', [_this2]);
                    remove$1(el);
                    if (!(container !== null && container !== void 0 && container.hasChildNodes())) {
                      remove$1(container);
                    }
                  };
                  if (_this2.timer) {
                    clearTimeout(_this2.timer);
                  }
                  if (immediate) {
                    _context2.next = 5;
                    break;
                  }
                  _context2.next = 5;
                  return Transition.start(_this2.$el, _this2.startProps);
                case 5:
                  removeFn(_this2.$el);
                case 6:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }))();
      }
    }
  };
  function install(UIkit) {
    UIkit.notification.closeAll = function (group, immediate) {
      apply(document.body, function (el) {
        var notification = UIkit.getComponent(el, 'notification');
        if (notification && (!group || group === notification.group)) {
          notification.close(immediate);
        }
      });
    };
  }

  var _props = {
    x: transformFn,
    y: transformFn,
    rotate: transformFn,
    scale: transformFn,
    color: colorFn,
    backgroundColor: colorFn,
    borderColor: colorFn,
    blur: filterFn,
    hue: filterFn,
    fopacity: filterFn,
    grayscale: filterFn,
    invert: filterFn,
    saturate: filterFn,
    sepia: filterFn,
    opacity: cssPropFn,
    stroke: strokeFn,
    bgx: backgroundFn,
    bgy: backgroundFn
  };
  var keys = Object.keys;
  var Parallax = {
    mixins: [Media],
    props: fillObject(keys(_props), 'list'),
    data: fillObject(keys(_props), undefined),
    computed: {
      props: function props(properties, $el) {
        var stops = {};
        for (var prop in properties) {
          if (prop in _props && !isUndefined(properties[prop])) {
            stops[prop] = properties[prop].slice();
          }
        }
        var result = {};
        for (var _prop in stops) {
          result[_prop] = _props[_prop](_prop, $el, stops[_prop], stops);
        }
        return result;
      }
    },
    events: {
      load: function load() {
        this.$emit();
      }
    },
    methods: {
      reset: function reset() {
        for (var prop in this.getCss(0)) {
          css(this.$el, prop, '');
        }
      },
      getCss: function getCss(percent) {
        var css = {
          transform: '',
          filter: ''
        };
        for (var prop in this.props) {
          this.props[prop](css, percent);
        }
        return css;
      }
    }
  };
  function transformFn(prop, el, stops) {
    var unit = getUnit(stops) || {
      x: 'px',
      y: 'px',
      rotate: 'deg'
    }[prop] || '';
    var transformFn;
    if (prop === 'x' || prop === 'y') {
      prop = "translate".concat(ucfirst(prop));
      transformFn = function transformFn(stop) {
        return toFloat(toFloat(stop).toFixed(unit === 'px' ? 0 : 6));
      };
    } else if (prop === 'scale') {
      unit = '';
      transformFn = function transformFn(stop) {
        return getUnit([stop]) ? toPx(stop, 'width', el, true) / el.offsetWidth : stop;
      };
    }
    if (stops.length === 1) {
      stops.unshift(prop === 'scale' ? 1 : 0);
    }
    stops = parseStops(stops, transformFn);
    return function (css, percent) {
      css.transform += " ".concat(prop, "(").concat(getValue(stops, percent)).concat(unit, ")");
    };
  }
  function colorFn(prop, el, stops) {
    if (stops.length === 1) {
      stops.unshift(getCssValue(el, prop, ''));
    }
    stops = parseStops(stops, function (stop) {
      return parseColor(el, stop);
    });
    return function (css, percent) {
      var _getStop = getStop(stops, percent),
        _getStop2 = _slicedToArray(_getStop, 3),
        start = _getStop2[0],
        end = _getStop2[1],
        p = _getStop2[2];
      var value = start.map(function (value, i) {
        value += p * (end[i] - value);
        return i === 3 ? toFloat(value) : parseInt(value, 10);
      }).join(',');
      css[prop] = "rgba(".concat(value, ")");
    };
  }
  function parseColor(el, color) {
    return getCssValue(el, 'color', color).split(/[(),]/g).slice(1, -1).concat(1).slice(0, 4).map(toFloat);
  }
  function filterFn(prop, el, stops) {
    if (stops.length === 1) {
      stops.unshift(0);
    }
    var unit = getUnit(stops) || {
      blur: 'px',
      hue: 'deg'
    }[prop] || '%';
    prop = {
      fopacity: 'opacity',
      hue: 'hue-rotate'
    }[prop] || prop;
    stops = parseStops(stops);
    return function (css, percent) {
      var value = getValue(stops, percent);
      css.filter += " ".concat(prop, "(").concat(value + unit, ")");
    };
  }
  function cssPropFn(prop, el, stops) {
    if (stops.length === 1) {
      stops.unshift(getCssValue(el, prop, ''));
    }
    stops = parseStops(stops);
    return function (css, percent) {
      css[prop] = getValue(stops, percent);
    };
  }
  function strokeFn(prop, el, stops) {
    if (stops.length === 1) {
      stops.unshift(0);
    }
    var unit = getUnit(stops);
    var length = getMaxPathLength(el);
    stops = parseStops(stops.reverse(), function (stop) {
      stop = toFloat(stop);
      return unit === '%' ? stop * length / 100 : stop;
    });
    if (!stops.some(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 1),
        value = _ref2[0];
      return value;
    })) {
      return noop;
    }
    css(el, 'strokeDasharray', length);
    return function (css, percent) {
      css.strokeDashoffset = getValue(stops, percent);
    };
  }
  function backgroundFn(prop, el, stops, props) {
    if (stops.length === 1) {
      stops.unshift(0);
    }
    var attr = prop === 'bgy' ? 'height' : 'width';
    props[prop] = parseStops(stops, function (stop) {
      return toPx(stop, attr, el);
    });
    var bgProps = ['bgx', 'bgy'].filter(function (prop) {
      return prop in props;
    });
    if (bgProps.length === 2 && prop === 'bgx') {
      return noop;
    }
    if (getCssValue(el, 'backgroundSize', '') === 'cover') {
      return backgroundCoverFn(prop, el, stops, props);
    }
    var positions = {};
    var _iterator = _createForOfIteratorHelper(bgProps),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _prop2 = _step.value;
        positions[_prop2] = getBackgroundPos(el, _prop2);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return setBackgroundPosFn(bgProps, positions, props);
  }
  function backgroundCoverFn(prop, el, stops, props) {
    var dimImage = getBackgroundImageDimensions(el);
    if (!dimImage.width) {
      return noop;
    }
    var dimEl = {
      width: el.offsetWidth,
      height: el.offsetHeight
    };
    var bgProps = ['bgx', 'bgy'].filter(function (prop) {
      return prop in props;
    });
    var positions = {};
    var _iterator2 = _createForOfIteratorHelper(bgProps),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _prop3 = _step2.value;
        var values = props[_prop3].map(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 1),
            value = _ref4[0];
          return value;
        });
        var min = Math.min.apply(Math, _toConsumableArray(values));
        var max = Math.max.apply(Math, _toConsumableArray(values));
        var down = values.indexOf(min) < values.indexOf(max);
        var diff = max - min;
        positions[_prop3] = "".concat((down ? -diff : 0) - (down ? min : max), "px");
        dimEl[_prop3 === 'bgy' ? 'height' : 'width'] += diff;
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    var dim = Dimensions.cover(dimImage, dimEl);
    var _iterator3 = _createForOfIteratorHelper(bgProps),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var _prop4 = _step3.value;
        var attr = _prop4 === 'bgy' ? 'height' : 'width';
        var overflow = dim[attr] - dimEl[attr];
        positions[_prop4] = "max(".concat(getBackgroundPos(el, _prop4), ",-").concat(overflow, "px) + ").concat(positions[_prop4]);
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    var fn = setBackgroundPosFn(bgProps, positions, props);
    return function (css, percent) {
      fn(css, percent);
      css.backgroundSize = "".concat(dim.width, "px ").concat(dim.height, "px");
      css.backgroundRepeat = 'no-repeat';
    };
  }
  function getBackgroundPos(el, prop) {
    return getCssValue(el, "background-position-".concat(prop.substr(-1)), '');
  }
  function setBackgroundPosFn(bgProps, positions, props) {
    return function (css, percent) {
      var _iterator4 = _createForOfIteratorHelper(bgProps),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var prop = _step4.value;
          var value = getValue(props[prop], percent);
          css["background-position-".concat(prop.substr(-1))] = "calc(".concat(positions[prop], " + ").concat(value, "px)");
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    };
  }
  var dimensions = {};
  function getBackgroundImageDimensions(el) {
    var src = css(el, 'backgroundImage').replace(/^none|url\(["']?(.+?)["']?\)$/, '$1');
    if (dimensions[src]) {
      return dimensions[src];
    }
    var image = new Image();
    if (src) {
      image.src = src;
      if (!image.naturalWidth) {
        image.onload = function () {
          dimensions[src] = toDimensions(image);
          trigger(el, createEvent('load', false));
        };
        return toDimensions(image);
      }
    }
    return dimensions[src] = toDimensions(image);
  }
  function toDimensions(image) {
    return {
      width: image.naturalWidth,
      height: image.naturalHeight
    };
  }
  function parseStops(stops) {
    var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : toFloat;
    var result = [];
    var length = stops.length;
    var nullIndex = 0;
    for (var i = 0; i < length; i++) {
      var _ref5 = isString(stops[i]) ? stops[i].trim().split(' ') : [stops[i]],
        _ref6 = _slicedToArray(_ref5, 2),
        value = _ref6[0],
        percent = _ref6[1];
      value = fn(value);
      percent = percent ? toFloat(percent) / 100 : null;
      if (i === 0) {
        if (percent === null) {
          percent = 0;
        } else if (percent) {
          result.push([value, 0]);
        }
      } else if (i === length - 1) {
        if (percent === null) {
          percent = 1;
        } else if (percent !== 1) {
          result.push([value, percent]);
          percent = 1;
        }
      }
      result.push([value, percent]);
      if (percent === null) {
        nullIndex++;
      } else if (nullIndex) {
        var leftPercent = result[i - nullIndex - 1][1];
        var p = (percent - leftPercent) / (nullIndex + 1);
        for (var j = nullIndex; j > 0; j--) {
          result[i - j][1] = leftPercent + p * (nullIndex - j + 1);
        }
        nullIndex = 0;
      }
    }
    return result;
  }
  function getStop(stops, percent) {
    var index = findIndex(stops.slice(1), function (_ref7) {
      var _ref8 = _slicedToArray(_ref7, 2),
        targetPercent = _ref8[1];
      return percent <= targetPercent;
    }) + 1;
    return [stops[index - 1][0], stops[index][0], (percent - stops[index - 1][1]) / (stops[index][1] - stops[index - 1][1])];
  }
  function getValue(stops, percent) {
    var _getStop3 = getStop(stops, percent),
      _getStop4 = _slicedToArray(_getStop3, 3),
      start = _getStop4[0],
      end = _getStop4[1],
      p = _getStop4[2];
    return isNumber(start) ? start + Math.abs(start - end) * p * (start < end ? 1 : -1) : +end;
  }
  var unitRe = /^-?\d+(\S*)/;
  function getUnit(stops, defaultUnit) {
    var _iterator5 = _createForOfIteratorHelper(stops),
      _step5;
    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var _stop$match;
        var stop = _step5.value;
        var match = (_stop$match = stop.match) === null || _stop$match === void 0 ? void 0 : _stop$match.call(stop, unitRe);
        if (match) {
          return match[1];
        }
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }
    return defaultUnit;
  }
  function getCssValue(el, prop, value) {
    var prev = el.style[prop];
    var val = css(css(el, prop, value), prop);
    el.style[prop] = prev;
    return val;
  }
  function fillObject(keys, value) {
    return keys.reduce(function (data, prop) {
      data[prop] = value;
      return data;
    }, {});
  }

  var parallax = {
    mixins: [Parallax, Resize, Scroll],
    props: {
      target: String,
      viewport: Number,
      // Deprecated
      easing: Number,
      start: String,
      end: String
    },
    data: {
      target: false,
      viewport: 1,
      easing: 1,
      start: 0,
      end: 0
    },
    computed: {
      target: function target(_ref, $el) {
        var target = _ref.target;
        return getOffsetElement(target && query(target, $el) || $el);
      },
      start: function start(_ref2) {
        var start = _ref2.start;
        return toPx(start, 'height', this.target, true);
      },
      end: function end(_ref3) {
        var end = _ref3.end,
          viewport = _ref3.viewport;
        return toPx(end || (viewport = (1 - viewport) * 100) && "".concat(viewport, "vh+").concat(viewport, "%"), 'height', this.target, true);
      }
    },
    update: {
      read: function read(_ref4, types) {
        var percent = _ref4.percent;
        if (!types.has('scroll')) {
          percent = false;
        }
        if (!this.matchMedia) {
          return;
        }
        var prev = percent;
        percent = ease(scrolledOver(this.target, this.start, this.end), this.easing);
        return {
          percent: percent,
          style: prev === percent ? false : this.getCss(percent)
        };
      },
      write: function write(_ref5) {
        var style = _ref5.style;
        if (!this.matchMedia) {
          this.reset();
          return;
        }
        style && css(this.$el, style);
      },
      events: ['scroll', 'resize']
    }
  };

  /*
   * Inspired by https://gist.github.com/gre/1650294?permalink_comment_id=3477425#gistcomment-3477425
   *
   * linear: 0
   * easeInSine: 0.5
   * easeOutSine: -0.5
   * easeInQuad: 1
   * easeOutQuad: -1
   * easeInCubic: 2
   * easeOutCubic: -2
   * easeInQuart: 3
   * easeOutQuart: -3
   * easeInQuint: 4
   * easeOutQuint: -4
   */
  function ease(percent, easing) {
    return easing >= 0 ? Math.pow(percent, easing + 1) : 1 - Math.pow(1 - percent, 1 - easing);
  }

  // SVG elements do not inherit from HTMLElement
  function getOffsetElement(el) {
    return el ? 'offsetTop' in el ? el : getOffsetElement(parent(el)) : document.documentElement;
  }

  var SliderReactive = {
    update: {
      write: function write() {
        if (this.stack.length || this.dragging) {
          return;
        }
        var index = this.getValidIndex(this.index);
        if (!~this.prevIndex || this.index !== index) {
          this.show(index);
        }
      },
      events: ['resize']
    }
  };

  var SliderPreload = {
    mixins: [Lazyload],
    connected: function connected() {
      this.lazyload(this.slides, this.getAdjacentSlides);
    }
  };

  function Transitioner (prev, next, dir, _ref) {
    var center = _ref.center,
      easing = _ref.easing,
      list = _ref.list;
    var deferred = new Deferred();
    var from = prev ? getLeft(prev, list, center) : getLeft(next, list, center) + dimensions$1(next).width * dir;
    var to = next ? getLeft(next, list, center) : from + dimensions$1(prev).width * dir * (isRtl ? -1 : 1);
    return {
      dir: dir,
      show: function show(duration) {
        var percent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var linear = arguments.length > 2 ? arguments[2] : undefined;
        var timing = linear ? 'linear' : easing;
        duration -= Math.round(duration * clamp(percent, -1, 1));
        this.translate(percent);
        percent = prev ? percent : clamp(percent, 0, 1);
        triggerUpdate(this.getItemIn(), 'itemin', {
          percent: percent,
          duration: duration,
          timing: timing,
          dir: dir
        });
        prev && triggerUpdate(this.getItemIn(true), 'itemout', {
          percent: 1 - percent,
          duration: duration,
          timing: timing,
          dir: dir
        });
        Transition.start(list, {
          transform: _translate(-to * (isRtl ? -1 : 1), 'px')
        }, duration, timing).then(deferred.resolve, noop);
        return deferred.promise;
      },
      cancel: function cancel() {
        Transition.cancel(list);
      },
      reset: function reset() {
        css(list, 'transform', '');
      },
      forward: function forward(duration) {
        var percent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.percent();
        Transition.cancel(list);
        return this.show(duration, percent, true);
      },
      translate: function translate(percent) {
        var distance = this.getDistance() * dir * (isRtl ? -1 : 1);
        css(list, 'transform', _translate(clamp(-to + (distance - distance * percent), -getWidth(list), dimensions$1(list).width) * (isRtl ? -1 : 1), 'px'));
        var actives = this.getActives();
        var itemIn = this.getItemIn();
        var itemOut = this.getItemIn(true);
        percent = prev ? clamp(percent, -1, 1) : 0;
        var _iterator = _createForOfIteratorHelper(children(list)),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var slide = _step.value;
            var isActive = includes(actives, slide);
            var isIn = slide === itemIn;
            var isOut = slide === itemOut;
            var translateIn = isIn || !isOut && (isActive || dir * (isRtl ? -1 : 1) === -1 ^ getElLeft(slide, list) > getElLeft(prev || next));
            triggerUpdate(slide, "itemtranslate".concat(translateIn ? 'in' : 'out'), {
              dir: dir,
              percent: isOut ? 1 - percent : isIn ? percent : isActive ? 1 : 0
            });
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      },
      percent: function percent() {
        return Math.abs((css(list, 'transform').split(',')[4] * (isRtl ? -1 : 1) + from) / (to - from));
      },
      getDistance: function getDistance() {
        return Math.abs(to - from);
      },
      getItemIn: function getItemIn() {
        var out = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var actives = this.getActives();
        var nextActives = inView(list, getLeft(next || prev, list, center));
        if (out) {
          var temp = actives;
          actives = nextActives;
          nextActives = temp;
        }
        return nextActives[findIndex(nextActives, function (el) {
          return !includes(actives, el);
        })];
      },
      getActives: function getActives() {
        return inView(list, getLeft(prev || next, list, center));
      }
    };
  }
  function getLeft(el, list, center) {
    var left = getElLeft(el, list);
    return center ? left - centerEl(el, list) : Math.min(left, getMax(list));
  }
  function getMax(list) {
    return Math.max(0, getWidth(list) - dimensions$1(list).width);
  }
  function getWidth(list) {
    return children(list).reduce(function (right, el) {
      return dimensions$1(el).width + right;
    }, 0);
  }
  function centerEl(el, list) {
    return dimensions$1(list).width / 2 - dimensions$1(el).width / 2;
  }
  function getElLeft(el, list) {
    return el && (position(el).left + (isRtl ? dimensions$1(el).width - dimensions$1(list).width : 0)) * (isRtl ? -1 : 1) || 0;
  }
  function inView(list, listLeft) {
    listLeft -= 1;
    var listWidth = dimensions$1(list).width;
    var listRight = listLeft + listWidth + 2;
    return children(list).filter(function (slide) {
      var slideLeft = getElLeft(slide, list);
      var slideRight = slideLeft + Math.min(dimensions$1(slide).width, listWidth);
      return slideLeft >= listLeft && slideRight <= listRight;
    });
  }
  function triggerUpdate(el, type, data) {
    trigger(el, createEvent(type, false, false, data));
  }

  var slider = {
    mixins: [Class, Slider, SliderReactive, SliderPreload],
    props: {
      center: Boolean,
      sets: Boolean
    },
    data: {
      center: false,
      sets: false,
      attrItem: 'uk-slider-item',
      selList: '.uk-slider-items',
      selNav: '.uk-slider-nav',
      clsContainer: 'uk-slider-container',
      Transitioner: Transitioner
    },
    computed: {
      avgWidth: function avgWidth() {
        return getWidth(this.list) / this.length;
      },
      finite: function finite(_ref) {
        var finite = _ref.finite;
        return finite || Math.ceil(getWidth(this.list)) < Math.trunc(dimensions$1(this.list).width + getMaxElWidth(this.list) + this.center);
      },
      maxIndex: function maxIndex() {
        if (!this.finite || this.center && !this.sets) {
          return this.length - 1;
        }
        if (this.center) {
          return last(this.sets);
        }
        var lft = 0;
        var max = getMax(this.list);
        var index = findIndex(this.slides, function (el) {
          if (lft >= max) {
            return true;
          }
          lft += dimensions$1(el).width;
        });
        return ~index ? index : this.length - 1;
      },
      sets: function sets(_ref2) {
        var enabled = _ref2.sets;
        if (!enabled) {
          return;
        }
        var left = 0;
        var sets = [];
        var width = dimensions$1(this.list).width;
        for (var i = 0; i < this.slides.length; i++) {
          var slideWidth = dimensions$1(this.slides[i]).width;
          if (left + slideWidth > width) {
            left = 0;
          }
          if (this.center) {
            if (left < width / 2 && left + slideWidth + dimensions$1(this.slides[+i + 1]).width / 2 > width / 2) {
              sets.push(+i);
              left = width / 2 - slideWidth / 2;
            }
          } else if (left === 0) {
            sets.push(Math.min(+i, this.maxIndex));
          }
          left += slideWidth;
        }
        if (sets.length) {
          return sets;
        }
      },
      transitionOptions: function transitionOptions() {
        return {
          center: this.center,
          list: this.list
        };
      }
    },
    connected: function connected() {
      toggleClass(this.$el, this.clsContainer, !$(".".concat(this.clsContainer), this.$el));
    },
    update: {
      write: function write() {
        var _iterator = _createForOfIteratorHelper(this.navItems),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var el = _step.value;
            var index = toNumber(data(el, this.attrItem));
            if (index !== false) {
              el.hidden = !this.maxIndex || index > this.maxIndex || this.sets && !includes(this.sets, index);
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        if (this.length && !this.dragging && !this.stack.length) {
          this.reorder();
          this._translate(1);
        }
        this.updateActiveClasses();
      },
      events: ['resize']
    },
    events: {
      beforeitemshow: function beforeitemshow(e) {
        if (!this.dragging && this.sets && this.stack.length < 2 && !includes(this.sets, this.index)) {
          this.index = this.getValidIndex();
        }
        var diff = Math.abs(this.index - this.prevIndex + (this.dir > 0 && this.index < this.prevIndex || this.dir < 0 && this.index > this.prevIndex ? (this.maxIndex + 1) * this.dir : 0));
        if (!this.dragging && diff > 1) {
          for (var i = 0; i < diff; i++) {
            this.stack.splice(1, 0, this.dir > 0 ? 'next' : 'previous');
          }
          e.preventDefault();
          return;
        }
        var index = this.dir < 0 || !this.slides[this.prevIndex] ? this.index : this.prevIndex;
        this.duration = speedUp(this.avgWidth / this.velocity) * (dimensions$1(this.slides[index]).width / this.avgWidth);
        this.reorder();
      },
      itemshow: function itemshow() {
        if (~this.prevIndex) {
          addClass(this._getTransitioner().getItemIn(), this.clsActive);
        }
      },
      itemshown: function itemshown() {
        this.updateActiveClasses();
      }
    },
    methods: {
      reorder: function reorder() {
        var _this = this;
        if (this.finite) {
          css(this.slides, 'order', '');
          return;
        }
        var index = this.dir > 0 && this.slides[this.prevIndex] ? this.prevIndex : this.index;
        this.slides.forEach(function (slide, i) {
          return css(slide, 'order', _this.dir > 0 && i < index ? 1 : _this.dir < 0 && i >= _this.index ? -1 : '');
        });
        if (!this.center) {
          return;
        }
        var next = this.slides[index];
        var width = dimensions$1(this.list).width / 2 - dimensions$1(next).width / 2;
        var j = 0;
        while (width > 0) {
          var slideIndex = this.getIndex(--j + index, index);
          var slide = this.slides[slideIndex];
          css(slide, 'order', slideIndex > index ? -2 : -1);
          width -= dimensions$1(slide).width;
        }
      },
      updateActiveClasses: function updateActiveClasses() {
        var actives = this._getTransitioner(this.index).getActives();
        var activeClasses = [this.clsActive, (!this.sets || includes(this.sets, toFloat(this.index))) && this.clsActivated || ''];
        var _iterator2 = _createForOfIteratorHelper(this.slides),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var slide = _step2.value;
            toggleClass(slide, activeClasses, includes(actives, slide));
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      },
      getValidIndex: function getValidIndex() {
        var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.index;
        var prevIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.prevIndex;
        index = this.getIndex(index, prevIndex);
        if (!this.sets) {
          return index;
        }
        var prev;
        do {
          if (includes(this.sets, index)) {
            return index;
          }
          prev = index;
          index = this.getIndex(index + this.dir, prevIndex);
        } while (index !== prev);
        return index;
      },
      getAdjacentSlides: function getAdjacentSlides() {
        var _dimensions = dimensions$1(this.list),
          width = _dimensions.width;
        var left = -width;
        var right = width * 2;
        var slideWidth = dimensions$1(this.slides[this.index]).width;
        var slideLeft = this.center ? width / 2 - slideWidth / 2 : 0;
        var slides = new Set();
        for (var _i = 0, _arr = [-1, 1]; _i < _arr.length; _i++) {
          var i = _arr[_i];
          var currentLeft = slideLeft + (i > 0 ? slideWidth : 0);
          var j = 0;
          do {
            var slide = this.slides[this.getIndex(this.index + i + j++ * i)];
            currentLeft += dimensions$1(slide).width * i;
            slides.add(slide);
          } while (this.slides.length > j && currentLeft > left && currentLeft < right);
        }
        return Array.from(slides);
      }
    }
  };
  function getMaxElWidth(list) {
    return Math.max.apply(Math, [0].concat(_toConsumableArray(children(list).map(function (el) {
      return dimensions$1(el).width;
    }))));
  }

  var sliderParallax = {
    mixins: [Parallax],
    data: {
      selItem: '!li'
    },
    beforeConnect: function beforeConnect() {
      this.item = query(this.selItem, this.$el);
    },
    disconnected: function disconnected() {
      this.item = null;
    },
    events: [{
      name: 'itemin itemout',
      self: true,
      el: function el() {
        return this.item;
      },
      handler: function handler(_ref) {
        var _this = this;
        var type = _ref.type,
          _ref$detail = _ref.detail,
          percent = _ref$detail.percent,
          duration = _ref$detail.duration,
          timing = _ref$detail.timing,
          dir = _ref$detail.dir;
        fastdom.read(function () {
          var propsFrom = _this.getCss(getCurrentPercent(type, dir, percent));
          var propsTo = _this.getCss(isIn(type) ? 0.5 : dir > 0 ? 1 : 0);
          fastdom.write(function () {
            css(_this.$el, propsFrom);
            Transition.start(_this.$el, propsTo, duration, timing)["catch"](noop);
          });
        });
      }
    }, {
      name: 'transitioncanceled transitionend',
      self: true,
      el: function el() {
        return this.item;
      },
      handler: function handler() {
        Transition.cancel(this.$el);
      }
    }, {
      name: 'itemtranslatein itemtranslateout',
      self: true,
      el: function el() {
        return this.item;
      },
      handler: function handler(_ref2) {
        var _this2 = this;
        var type = _ref2.type,
          _ref2$detail = _ref2.detail,
          percent = _ref2$detail.percent,
          dir = _ref2$detail.dir;
        fastdom.read(function () {
          var props = _this2.getCss(getCurrentPercent(type, dir, percent));
          fastdom.write(function () {
            return css(_this2.$el, props);
          });
        });
      }
    }]
  };
  function isIn(type) {
    return endsWith(type, 'in');
  }
  function getCurrentPercent(type, dir, percent) {
    percent /= 2;
    return isIn(type) ^ dir < 0 ? percent : 1 - percent;
  }

  var Animations = _objectSpread2(_objectSpread2({}, Animations$2), {}, {
    fade: {
      show: function show() {
        return [{
          opacity: 0,
          zIndex: 0
        }, {
          zIndex: -1
        }];
      },
      percent: function percent(current) {
        return 1 - css(current, 'opacity');
      },
      translate: function translate(percent) {
        return [{
          opacity: 1 - percent,
          zIndex: 0
        }, {
          zIndex: -1
        }];
      }
    },
    scale: {
      show: function show() {
        return [{
          opacity: 0,
          transform: scale3d(1 + 0.5),
          zIndex: 0
        }, {
          zIndex: -1
        }];
      },
      percent: function percent(current) {
        return 1 - css(current, 'opacity');
      },
      translate: function translate(percent) {
        return [{
          opacity: 1 - percent,
          transform: scale3d(1 + 0.5 * percent),
          zIndex: 0
        }, {
          zIndex: -1
        }];
      }
    },
    pull: {
      show: function show(dir) {
        return dir < 0 ? [{
          transform: _translate(30),
          zIndex: -1
        }, {
          transform: _translate(),
          zIndex: 0
        }] : [{
          transform: _translate(-100),
          zIndex: 0
        }, {
          transform: _translate(),
          zIndex: -1
        }];
      },
      percent: function percent(current, next, dir) {
        return dir < 0 ? 1 - translated(next) : translated(current);
      },
      translate: function translate(percent, dir) {
        return dir < 0 ? [{
          transform: _translate(30 * percent),
          zIndex: -1
        }, {
          transform: _translate(-100 * (1 - percent)),
          zIndex: 0
        }] : [{
          transform: _translate(-percent * 100),
          zIndex: 0
        }, {
          transform: _translate(30 * (1 - percent)),
          zIndex: -1
        }];
      }
    },
    push: {
      show: function show(dir) {
        return dir < 0 ? [{
          transform: _translate(100),
          zIndex: 0
        }, {
          transform: _translate(),
          zIndex: -1
        }] : [{
          transform: _translate(-30),
          zIndex: -1
        }, {
          transform: _translate(),
          zIndex: 0
        }];
      },
      percent: function percent(current, next, dir) {
        return dir > 0 ? 1 - translated(next) : translated(current);
      },
      translate: function translate(percent, dir) {
        return dir < 0 ? [{
          transform: _translate(percent * 100),
          zIndex: 0
        }, {
          transform: _translate(-30 * (1 - percent)),
          zIndex: -1
        }] : [{
          transform: _translate(-30 * percent),
          zIndex: -1
        }, {
          transform: _translate(100 * (1 - percent)),
          zIndex: 0
        }];
      }
    }
  });

  var slideshow = {
    mixins: [Class, Slideshow, SliderReactive, SliderPreload],
    props: {
      ratio: String,
      minHeight: Number,
      maxHeight: Number
    },
    data: {
      ratio: '16:9',
      minHeight: false,
      maxHeight: false,
      selList: '.uk-slideshow-items',
      attrItem: 'uk-slideshow-item',
      selNav: '.uk-slideshow-nav',
      Animations: Animations
    },
    update: {
      read: function read() {
        if (!this.list) {
          return false;
        }
        var _this$ratio$split$map = this.ratio.split(':').map(Number),
          _this$ratio$split$map2 = _slicedToArray(_this$ratio$split$map, 2),
          width = _this$ratio$split$map2[0],
          height = _this$ratio$split$map2[1];
        height = height * this.list.offsetWidth / width || 0;
        if (this.minHeight) {
          height = Math.max(this.minHeight, height);
        }
        if (this.maxHeight) {
          height = Math.min(this.maxHeight, height);
        }
        return {
          height: height - boxModelAdjust(this.list, 'height', 'content-box')
        };
      },
      write: function write(_ref) {
        var height = _ref.height;
        height > 0 && css(this.list, 'minHeight', height);
      },
      events: ['resize']
    },
    methods: {
      getAdjacentSlides: function getAdjacentSlides() {
        var _this = this;
        return [1, -1].map(function (i) {
          return _this.slides[_this.getIndex(_this.index + i)];
        });
      }
    }
  };

  var sortable = {
    mixins: [Class, Animate],
    props: {
      group: String,
      threshold: Number,
      clsItem: String,
      clsPlaceholder: String,
      clsDrag: String,
      clsDragState: String,
      clsBase: String,
      clsNoDrag: String,
      clsEmpty: String,
      clsCustom: String,
      handle: String
    },
    data: {
      group: false,
      threshold: 5,
      clsItem: 'uk-sortable-item',
      clsPlaceholder: 'uk-sortable-placeholder',
      clsDrag: 'uk-sortable-drag',
      clsDragState: 'uk-drag',
      clsBase: 'uk-sortable',
      clsNoDrag: 'uk-sortable-nodrag',
      clsEmpty: 'uk-sortable-empty',
      clsCustom: '',
      handle: false,
      pos: {}
    },
    created: function created() {
      var _this = this;
      var _loop = function _loop() {
        var key = _arr[_i];
        var fn = _this[key];
        _this[key] = function (e) {
          assign(_this.pos, getEventPos(e));
          fn(e);
        };
      };
      for (var _i = 0, _arr = ['init', 'start', 'move', 'end']; _i < _arr.length; _i++) {
        _loop();
      }
    },
    events: {
      name: pointerDown$1,
      passive: false,
      handler: 'init'
    },
    computed: {
      target: function target() {
        return (this.$el.tBodies || [this.$el])[0];
      },
      items: function items() {
        return children(this.target);
      },
      isEmpty: {
        get: function get() {
          return isEmpty(this.items);
        },
        watch: function watch(empty) {
          toggleClass(this.target, this.clsEmpty, empty);
        },
        immediate: true
      },
      handles: {
        get: function get(_ref, el) {
          var handle = _ref.handle;
          return handle ? $$(handle, el) : this.items;
        },
        watch: function watch(handles, prev) {
          css(prev, {
            touchAction: '',
            userSelect: ''
          });
          css(handles, {
            touchAction: hasTouch ? 'none' : '',
            userSelect: 'none'
          }); // touchAction set to 'none' causes a performance drop in Chrome 80
        },

        immediate: true
      }
    },
    update: {
      write: function write(data) {
        if (!this.drag || !parent(this.placeholder)) {
          return;
        }
        var _this$pos = this.pos,
          x = _this$pos.x,
          y = _this$pos.y,
          _this$origin = this.origin,
          offsetTop = _this$origin.offsetTop,
          offsetLeft = _this$origin.offsetLeft,
          placeholder = this.placeholder;
        css(this.drag, {
          top: y - offsetTop,
          left: x - offsetLeft
        });
        var sortable = this.getSortable(document.elementFromPoint(x, y));
        if (!sortable) {
          return;
        }
        var items = sortable.items;
        if (items.some(Transition.inProgress)) {
          return;
        }
        var target = findTarget(items, {
          x: x,
          y: y
        });
        if (items.length && (!target || target === placeholder)) {
          return;
        }
        var previous = this.getSortable(placeholder);
        var insertTarget = findInsertTarget(sortable.target, target, placeholder, x, y, sortable === previous && data.moved !== target);
        if (insertTarget === false) {
          return;
        }
        if (insertTarget && placeholder === insertTarget) {
          return;
        }
        if (sortable !== previous) {
          previous.remove(placeholder);
          data.moved = target;
        } else {
          delete data.moved;
        }
        sortable.insert(placeholder, insertTarget);
        this.touched.add(sortable);
      },
      events: ['move']
    },
    methods: {
      init: function init(e) {
        var target = e.target,
          button = e.button,
          defaultPrevented = e.defaultPrevented;
        var _this$items$filter = this.items.filter(function (el) {
            return within(target, el);
          }),
          _this$items$filter2 = _slicedToArray(_this$items$filter, 1),
          placeholder = _this$items$filter2[0];
        if (!placeholder || defaultPrevented || button > 0 || isInput(target) || within(target, ".".concat(this.clsNoDrag)) || this.handle && !within(target, this.handle)) {
          return;
        }
        e.preventDefault();
        this.touched = new Set([this]);
        this.placeholder = placeholder;
        this.origin = _objectSpread2({
          target: target,
          index: index(placeholder)
        }, this.pos);
        on(document, pointerMove$1, this.move);
        on(document, pointerUp$1, this.end);
        if (!this.threshold) {
          this.start(e);
        }
      },
      start: function start(e) {
        this.drag = appendDrag(this.$container, this.placeholder);
        var _this$placeholder$get = this.placeholder.getBoundingClientRect(),
          left = _this$placeholder$get.left,
          top = _this$placeholder$get.top;
        assign(this.origin, {
          offsetLeft: this.pos.x - left,
          offsetTop: this.pos.y - top
        });
        addClass(this.drag, this.clsDrag, this.clsCustom);
        addClass(this.placeholder, this.clsPlaceholder);
        addClass(this.items, this.clsItem);
        addClass(document.documentElement, this.clsDragState);
        trigger(this.$el, 'start', [this, this.placeholder]);
        trackScroll(this.pos);
        this.move(e);
      },
      move: function move(e) {
        if (this.drag) {
          this.$emit('move');
        } else if (Math.abs(this.pos.x - this.origin.x) > this.threshold || Math.abs(this.pos.y - this.origin.y) > this.threshold) {
          this.start(e);
        }
      },
      end: function end() {
        off(document, pointerMove$1, this.move);
        off(document, pointerUp$1, this.end);
        if (!this.drag) {
          return;
        }
        untrackScroll();
        var sortable = this.getSortable(this.placeholder);
        if (this === sortable) {
          if (this.origin.index !== index(this.placeholder)) {
            trigger(this.$el, 'moved', [this, this.placeholder]);
          }
        } else {
          trigger(sortable.$el, 'added', [sortable, this.placeholder]);
          trigger(this.$el, 'removed', [this, this.placeholder]);
        }
        trigger(this.$el, 'stop', [this, this.placeholder]);
        remove$1(this.drag);
        this.drag = null;
        var _iterator = _createForOfIteratorHelper(this.touched),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _step$value = _step.value,
              clsPlaceholder = _step$value.clsPlaceholder,
              clsItem = _step$value.clsItem;
            var _iterator2 = _createForOfIteratorHelper(this.touched),
              _step2;
            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var _sortable = _step2.value;
                removeClass(_sortable.items, clsPlaceholder, clsItem);
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        this.touched = null;
        removeClass(document.documentElement, this.clsDragState);
      },
      insert: function insert(element, target) {
        var _this2 = this;
        addClass(this.items, this.clsItem);
        var insert = function insert() {
          return target ? before(target, element) : append(_this2.target, element);
        };
        this.animate(insert);
      },
      remove: function remove(element) {
        if (!within(element, this.target)) {
          return;
        }
        this.animate(function () {
          return remove$1(element);
        });
      },
      getSortable: function getSortable(element) {
        do {
          var sortable = this.$getComponent(element, 'sortable');
          if (sortable && (sortable === this || this.group !== false && sortable.group === this.group)) {
            return sortable;
          }
        } while (element = parent(element));
      }
    }
  };
  var trackTimer;
  function trackScroll(pos) {
    var last = Date.now();
    trackTimer = setInterval(function () {
      var x = pos.x,
        y = pos.y;
      y += document.scrollingElement.scrollTop;
      var dist = (Date.now() - last) * 0.3;
      last = Date.now();
      scrollParents(document.elementFromPoint(x, pos.y), /auto|scroll/).reverse().some(function (scrollEl) {
        var scroll = scrollEl.scrollTop,
          scrollHeight = scrollEl.scrollHeight;
        var _offsetViewport = offsetViewport(scrollEl),
          top = _offsetViewport.top,
          bottom = _offsetViewport.bottom,
          height = _offsetViewport.height;
        if (top < y && top + 35 > y) {
          scroll -= dist;
        } else if (bottom > y && bottom - 35 < y) {
          scroll += dist;
        } else {
          return;
        }
        if (scroll > 0 && scroll < scrollHeight - height) {
          scrollEl.scrollTop = scroll;
          return true;
        }
      });
    }, 15);
  }
  function untrackScroll() {
    clearInterval(trackTimer);
  }
  function appendDrag(container, element) {
    var clone = append(container, element.outerHTML.replace(/(^<)(?:li|tr)|(?:li|tr)(\/>$)/g, '$1div$2'));
    css(clone, 'margin', '0', 'important');
    css(clone, {
      boxSizing: 'border-box',
      width: element.offsetWidth,
      height: element.offsetHeight,
      padding: css(element, 'padding')
    });
    height(clone.firstElementChild, height(element.firstElementChild));
    return clone;
  }
  function findTarget(items, point) {
    return items[findIndex(items, function (item) {
      return pointInRect(point, item.getBoundingClientRect());
    })];
  }
  function findInsertTarget(list, target, placeholder, x, y, sameList) {
    if (!children(list).length) {
      return;
    }
    var rect = target.getBoundingClientRect();
    if (!sameList) {
      if (!isHorizontal(list, placeholder)) {
        return y < rect.top + rect.height / 2 ? target : target.nextElementSibling;
      }
      return target;
    }
    var placeholderRect = placeholder.getBoundingClientRect();
    var sameRow = linesIntersect([rect.top, rect.bottom], [placeholderRect.top, placeholderRect.bottom]);
    var pointerPos = sameRow ? x : y;
    var lengthProp = sameRow ? 'width' : 'height';
    var startProp = sameRow ? 'left' : 'top';
    var endProp = sameRow ? 'right' : 'bottom';
    var diff = placeholderRect[lengthProp] < rect[lengthProp] ? rect[lengthProp] - placeholderRect[lengthProp] : 0;
    if (placeholderRect[startProp] < rect[startProp]) {
      if (diff && pointerPos < rect[startProp] + diff) {
        return false;
      }
      return target.nextElementSibling;
    }
    if (diff && pointerPos > rect[endProp] - diff) {
      return false;
    }
    return target;
  }
  function isHorizontal(list, placeholder) {
    var single = children(list).length === 1;
    if (single) {
      append(list, placeholder);
    }
    var items = children(list);
    var isHorizontal = items.some(function (el, i) {
      var rectA = el.getBoundingClientRect();
      return items.slice(i + 1).some(function (el) {
        var rectB = el.getBoundingClientRect();
        return !linesIntersect([rectA.left, rectA.right], [rectB.left, rectB.right]);
      });
    });
    if (single) {
      remove$1(placeholder);
    }
    return isHorizontal;
  }
  function linesIntersect(lineA, lineB) {
    return lineA[1] > lineB[0] && lineB[1] > lineA[0];
  }

  var _events;
  var tooltip = {
    mixins: [Container, Togglable, Position],
    args: 'title',
    props: {
      delay: Number,
      title: String
    },
    data: {
      pos: 'top',
      title: '',
      delay: 0,
      animation: ['uk-animation-scale-up'],
      duration: 100,
      cls: 'uk-active'
    },
    beforeConnect: function beforeConnect() {
      this._hasTitle = hasAttr(this.$el, 'title');
      attr(this.$el, 'title', '');
      this.updateAria(false);
      makeFocusable(this.$el);
    },
    disconnected: function disconnected() {
      this.hide();
      attr(this.$el, 'title', this._hasTitle ? this.title : null);
    },
    methods: {
      show: function show() {
        var _this = this;
        if (this.isToggled(this.tooltip || null) || !this.title) {
          return;
        }
        this._unbind = once(document, "show keydown ".concat(pointerDown$1), this.hide, false, function (e) {
          return e.type === pointerDown$1 && !within(e.target, _this.$el) || e.type === 'keydown' && e.keyCode === 27 || e.type === 'show' && e.detail[0] !== _this && e.detail[0].$name === _this.$name;
        });
        clearTimeout(this.showTimer);
        this.showTimer = setTimeout(this._show, this.delay);
      },
      hide: function hide() {
        var _this2 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!matches(_this2.$el, 'input:focus')) {
                    _context.next = 2;
                    break;
                  }
                  return _context.abrupt("return");
                case 2:
                  clearTimeout(_this2.showTimer);
                  if (_this2.isToggled(_this2.tooltip || null)) {
                    _context.next = 5;
                    break;
                  }
                  return _context.abrupt("return");
                case 5:
                  _context.next = 7;
                  return _this2.toggleElement(_this2.tooltip, false, false);
                case 7:
                  remove$1(_this2.tooltip);
                  _this2.tooltip = null;
                  _this2._unbind();
                case 10:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }))();
      },
      _show: function _show() {
        var _this3 = this;
        this.tooltip = append(this.container, "<div class=\"uk-".concat(this.$options.name, "\">\n                    <div class=\"uk-").concat(this.$options.name, "-inner\">").concat(this.title, "</div>\n                 </div>"));
        on(this.tooltip, 'toggled', function (e, toggled) {
          _this3.updateAria(toggled);
          if (!toggled) {
            return;
          }
          _this3.positionAt(_this3.tooltip, _this3.$el);
          var _getAlignment = getAlignment(_this3.tooltip, _this3.$el, _this3.pos),
            _getAlignment2 = _slicedToArray(_getAlignment, 2),
            dir = _getAlignment2[0],
            align = _getAlignment2[1];
          _this3.origin = _this3.axis === 'y' ? "".concat(flipPosition(dir), "-").concat(align) : "".concat(align, "-").concat(flipPosition(dir));
        });
        this.toggleElement(this.tooltip, true);
      },
      updateAria: function updateAria(toggled) {
        attr(this.$el, 'aria-expanded', toggled);
      }
    },
    events: (_events = {
      focus: 'show',
      blur: 'hide'
    }, _defineProperty(_events, "".concat(pointerEnter, " ").concat(pointerLeave), function _(e) {
      if (!isTouch(e)) {
        this[e.type === pointerEnter ? 'show' : 'hide']();
      }
    }), _defineProperty(_events, pointerDown$1, function (e) {
      if (isTouch(e)) {
        this.show();
      }
    }), _events)
  };
  function makeFocusable(el) {
    if (!isFocusable(el)) {
      attr(el, 'tabindex', '0');
    }
  }
  function getAlignment(el, target, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      dir = _ref2[0],
      align = _ref2[1];
    var elOffset = offset(el);
    var targetOffset = offset(target);
    var properties = [['left', 'right'], ['top', 'bottom']];
    for (var _i = 0, _properties = properties; _i < _properties.length; _i++) {
      var _props = _properties[_i];
      if (elOffset[_props[0]] >= targetOffset[_props[1]]) {
        dir = _props[1];
        break;
      }
      if (elOffset[_props[1]] <= targetOffset[_props[0]]) {
        dir = _props[0];
        break;
      }
    }
    var props = includes(properties[0], dir) ? properties[1] : properties[0];
    if (elOffset[props[0]] === targetOffset[props[0]]) {
      align = props[0];
    } else if (elOffset[props[1]] === targetOffset[props[1]]) {
      align = props[1];
    } else {
      align = 'center';
    }
    return [dir, align];
  }

  var upload = {
    props: {
      allow: String,
      clsDragover: String,
      concurrent: Number,
      maxSize: Number,
      method: String,
      mime: String,
      msgInvalidMime: String,
      msgInvalidName: String,
      msgInvalidSize: String,
      multiple: Boolean,
      name: String,
      params: Object,
      type: String,
      url: String
    },
    data: {
      allow: false,
      clsDragover: 'uk-dragover',
      concurrent: 1,
      maxSize: 0,
      method: 'POST',
      mime: false,
      msgInvalidMime: 'Invalid File Type: %s',
      msgInvalidName: 'Invalid File Name: %s',
      msgInvalidSize: 'Invalid File Size: %s Kilobytes Max',
      multiple: false,
      name: 'files[]',
      params: {},
      type: '',
      url: '',
      abort: noop,
      beforeAll: noop,
      beforeSend: noop,
      complete: noop,
      completeAll: noop,
      error: noop,
      fail: noop,
      load: noop,
      loadEnd: noop,
      loadStart: noop,
      progress: noop
    },
    events: {
      change: function change(e) {
        if (!matches(e.target, 'input[type="file"]')) {
          return;
        }
        e.preventDefault();
        if (e.target.files) {
          this.upload(e.target.files);
        }
        e.target.value = '';
      },
      drop: function drop(e) {
        stop(e);
        var transfer = e.dataTransfer;
        if (!(transfer !== null && transfer !== void 0 && transfer.files)) {
          return;
        }
        removeClass(this.$el, this.clsDragover);
        this.upload(transfer.files);
      },
      dragenter: function dragenter(e) {
        stop(e);
      },
      dragover: function dragover(e) {
        stop(e);
        addClass(this.$el, this.clsDragover);
      },
      dragleave: function dragleave(e) {
        stop(e);
        removeClass(this.$el, this.clsDragover);
      }
    },
    methods: {
      upload: function upload(files) {
        var _this = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          var _iterator, _step, file, chunks, upload;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  files = toArray(files);
                  if (files.length) {
                    _context2.next = 3;
                    break;
                  }
                  return _context2.abrupt("return");
                case 3:
                  trigger(_this.$el, 'upload', [files]);
                  _iterator = _createForOfIteratorHelper(files);
                  _context2.prev = 5;
                  _iterator.s();
                case 7:
                  if ((_step = _iterator.n()).done) {
                    _context2.next = 20;
                    break;
                  }
                  file = _step.value;
                  if (!(_this.maxSize && _this.maxSize * 1000 < file.size)) {
                    _context2.next = 12;
                    break;
                  }
                  _this.fail(_this.msgInvalidSize.replace('%s', _this.maxSize));
                  return _context2.abrupt("return");
                case 12:
                  if (!(_this.allow && !match(_this.allow, file.name))) {
                    _context2.next = 15;
                    break;
                  }
                  _this.fail(_this.msgInvalidName.replace('%s', _this.allow));
                  return _context2.abrupt("return");
                case 15:
                  if (!(_this.mime && !match(_this.mime, file.type))) {
                    _context2.next = 18;
                    break;
                  }
                  _this.fail(_this.msgInvalidMime.replace('%s', _this.mime));
                  return _context2.abrupt("return");
                case 18:
                  _context2.next = 7;
                  break;
                case 20:
                  _context2.next = 25;
                  break;
                case 22:
                  _context2.prev = 22;
                  _context2.t0 = _context2["catch"](5);
                  _iterator.e(_context2.t0);
                case 25:
                  _context2.prev = 25;
                  _iterator.f();
                  return _context2.finish(25);
                case 28:
                  if (!_this.multiple) {
                    files = files.slice(0, 1);
                  }
                  _this.beforeAll(_this, files);
                  chunks = chunk(files, _this.concurrent);
                  upload = /*#__PURE__*/function () {
                    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(files) {
                      var data, key, xhr;
                      return _regeneratorRuntime().wrap(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              data = new FormData();
                              files.forEach(function (file) {
                                return data.append(_this.name, file);
                              });
                              for (key in _this.params) {
                                data.append(key, _this.params[key]);
                              }
                              _context.prev = 3;
                              _context.next = 6;
                              return ajax(_this.url, {
                                data: data,
                                method: _this.method,
                                responseType: _this.type,
                                beforeSend: function beforeSend(env) {
                                  var xhr = env.xhr;
                                  xhr.upload && on(xhr.upload, 'progress', _this.progress);
                                  for (var _i = 0, _arr = ['loadStart', 'load', 'loadEnd', 'abort']; _i < _arr.length; _i++) {
                                    var type = _arr[_i];
                                    on(xhr, type.toLowerCase(), _this[type]);
                                  }
                                  return _this.beforeSend(env);
                                }
                              });
                            case 6:
                              xhr = _context.sent;
                              _this.complete(xhr);
                              if (!chunks.length) {
                                _context.next = 13;
                                break;
                              }
                              _context.next = 11;
                              return upload(chunks.shift());
                            case 11:
                              _context.next = 14;
                              break;
                            case 13:
                              _this.completeAll(xhr);
                            case 14:
                              _context.next = 19;
                              break;
                            case 16:
                              _context.prev = 16;
                              _context.t0 = _context["catch"](3);
                              _this.error(_context.t0);
                            case 19:
                            case "end":
                              return _context.stop();
                          }
                        }
                      }, _callee, null, [[3, 16]]);
                    }));
                    return function upload(_x) {
                      return _ref.apply(this, arguments);
                    };
                  }();
                  _context2.next = 34;
                  return upload(chunks.shift());
                case 34:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, null, [[5, 22, 25, 28]]);
        }))();
      }
    }
  };
  function match(pattern, path) {
    return path.match(new RegExp("^".concat(pattern.replace(/\//g, '\\/').replace(/\*\*/g, '(\\/[^\\/]+)*').replace(/\*/g, '[^\\/]+').replace(/((?!\\))\?/g, '$1.'), "$"), 'i'));
  }
  function chunk(files, size) {
    var chunks = [];
    for (var i = 0; i < files.length; i += size) {
      chunks.push(files.slice(i, i + size));
    }
    return chunks;
  }
  function stop(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  var worklists = {
    props: {
      selector: String
    },
    data: {
      mainPath: '/pages/index.html',
      sidePath: '#pageLists',
      selector: " .tree-title",
      topNav: '#topNav a',
      sideTabLists: '#pages > div',
      clsOpen: "tree-open",
      clsClose: "tree-close",
      treeLists: ".lists button",
      contentframe: "#content_frame"
    },
    computed: {
      contentframe: function contentframe(_ref) {
        var contentframe = _ref.contentframe;
        return $(contentframe);
      },
      mainPath: function mainPath(_ref2) {
        var mainPath = _ref2.mainPath;
        return !!localStorage.getItem('url') ? localStorage.getItem('url') : mainPath;
      },
      sidePath: function sidePath(_ref3) {
        var sidePath = _ref3.sidePath;
        return !!localStorage.getItem('sideNav') ? localStorage.getItem('sideNav') : sidePath;
      }
    },
    events: [{
      name: "readystatechange load hashchange popstate",
      el: inBrowser && window,
      handler: function handler(e) {
        this.viewMainFrame(this.mainPath);
        this.viewsideNavigation(this.sidePath);
      }
    }, {
      name: "click",
      delegate: function delegate() {
        return "".concat(this.selector);
      },
      handler: function handler(e) {
        e.preventDefault();
        console.log(this.path);
      }
    }, {
      name: "click",
      delegate: function delegate() {
        return "".concat(this.topNav);
      },
      handler: function handler(e) {
        e.preventDefault();
        console.log(e.current.hash);
        this.viewsideNavigation(e.current.hash);
      }
    }, {
      name: "click",
      delegate: function delegate() {
        return "".concat(this.treeLists);
      },
      handler: function handler(e) {
        e.preventDefault();
        var path = attr(e.current, 'data-href');
        this.viewMainFrame(path);
      }
    }, {
      name: "scroll",
      el: window,
      handler: function handler() {
        // this.$emit('resize');
      }
    }],
    methods: {
      test: function test() {
        alert("dddddd");
      },
      setMainContent: function setMainContent() {
        console.log('sdfsdf');
      },
      viewMainFrame: function viewMainFrame(path) {
        localStorage.setItem('url', path);
        attr(this.contentframe, 'src', path);
      },
      viewsideNavigation: function viewsideNavigation(id) {
        localStorage.setItem('sideNav', id);
        $$(this.sideTabLists).forEach(function (el) {
          return css(el, 'display', "#".concat(el.id) === id ? 'block' : 'none');
        });
      }
    }
  };

  var components = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Countdown: countdown,
    Filter: filter,
    Lightbox: lightbox,
    LightboxPanel: LightboxPanel,
    Notification: notification,
    Parallax: parallax,
    Slider: slider,
    SliderParallax: sliderParallax,
    Slideshow: slideshow,
    SlideshowParallax: sliderParallax,
    Sortable: sortable,
    Tooltip: tooltip,
    Upload: upload,
    Worklists: worklists
  });

  each(components, function (component, name) {
    return UIkit.component(name, component);
  });

  return UIkit;

}));
//# sourceMappingURL=index.js.map
