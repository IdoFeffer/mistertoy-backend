;(function () {
  const c = document.createElement("link").relList
  if (c && c.supports && c.supports("modulepreload")) return
  for (const d of document.querySelectorAll('link[rel="modulepreload"]')) r(d)
  new MutationObserver((d) => {
    for (const h of d)
      if (h.type === "childList")
        for (const b of h.addedNodes)
          b.tagName === "LINK" && b.rel === "modulepreload" && r(b)
  }).observe(document, { childList: !0, subtree: !0 })
  function o(d) {
    const h = {}
    return (
      d.integrity && (h.integrity = d.integrity),
      d.referrerPolicy && (h.referrerPolicy = d.referrerPolicy),
      d.crossOrigin === "use-credentials"
        ? (h.credentials = "include")
        : d.crossOrigin === "anonymous"
        ? (h.credentials = "omit")
        : (h.credentials = "same-origin"),
      h
    )
  }
  function r(d) {
    if (d.ep) return
    d.ep = !0
    const h = o(d)
    fetch(d.href, h)
  }
})()
var Yf = { exports: {} },
  Gn = {}
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var fh
function zy() {
  if (fh) return Gn
  fh = 1
  var i = Symbol.for("react.transitional.element"),
    c = Symbol.for("react.fragment")
  function o(r, d, h) {
    var b = null
    if (
      (h !== void 0 && (b = "" + h),
      d.key !== void 0 && (b = "" + d.key),
      "key" in d)
    ) {
      h = {}
      for (var T in d) T !== "key" && (h[T] = d[T])
    } else h = d
    return (
      (d = h.ref),
      { $$typeof: i, type: r, key: b, ref: d !== void 0 ? d : null, props: h }
    )
  }
  return (Gn.Fragment = c), (Gn.jsx = o), (Gn.jsxs = o), Gn
}
var rh
function Uy() {
  return rh || ((rh = 1), (Yf.exports = zy())), Yf.exports
}
var S = Uy(),
  Gf = { exports: {} },
  Xn = {},
  Xf = { exports: {} },
  Qf = {}
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var oh
function Ny() {
  return (
    oh ||
      ((oh = 1),
      (function (i) {
        function c(C, X) {
          var I = C.length
          C.push(X)
          e: for (; 0 < I; ) {
            var ge = (I - 1) >>> 1,
              g = C[ge]
            if (0 < d(g, X)) (C[ge] = X), (C[I] = g), (I = ge)
            else break e
          }
        }
        function o(C) {
          return C.length === 0 ? null : C[0]
        }
        function r(C) {
          if (C.length === 0) return null
          var X = C[0],
            I = C.pop()
          if (I !== X) {
            C[0] = I
            e: for (var ge = 0, g = C.length, B = g >>> 1; ge < B; ) {
              var Q = 2 * (ge + 1) - 1,
                G = C[Q],
                $ = Q + 1,
                fe = C[$]
              if (0 > d(G, I))
                $ < g && 0 > d(fe, G)
                  ? ((C[ge] = fe), (C[$] = I), (ge = $))
                  : ((C[ge] = G), (C[Q] = I), (ge = Q))
              else if ($ < g && 0 > d(fe, I)) (C[ge] = fe), (C[$] = I), (ge = $)
              else break e
            }
          }
          return X
        }
        function d(C, X) {
          var I = C.sortIndex - X.sortIndex
          return I !== 0 ? I : C.id - X.id
        }
        if (
          ((i.unstable_now = void 0),
          typeof performance == "object" &&
            typeof performance.now == "function")
        ) {
          var h = performance
          i.unstable_now = function () {
            return h.now()
          }
        } else {
          var b = Date,
            T = b.now()
          i.unstable_now = function () {
            return b.now() - T
          }
        }
        var v = [],
          m = [],
          _ = 1,
          H = null,
          z = 3,
          w = !1,
          N = !1,
          Z = !1,
          q = !1,
          L = typeof setTimeout == "function" ? setTimeout : null,
          K = typeof clearTimeout == "function" ? clearTimeout : null,
          Y = typeof setImmediate < "u" ? setImmediate : null
        function le(C) {
          for (var X = o(m); X !== null; ) {
            if (X.callback === null) r(m)
            else if (X.startTime <= C)
              r(m), (X.sortIndex = X.expirationTime), c(v, X)
            else break
            X = o(m)
          }
        }
        function J(C) {
          if (((Z = !1), le(C), !N))
            if (o(v) !== null) (N = !0), ve || ((ve = !0), Qe())
            else {
              var X = o(m)
              X !== null && Ze(J, X.startTime - C)
            }
        }
        var ve = !1,
          be = -1,
          Me = 5,
          Ee = -1
        function $e() {
          return q ? !0 : !(i.unstable_now() - Ee < Me)
        }
        function mt() {
          if (((q = !1), ve)) {
            var C = i.unstable_now()
            Ee = C
            var X = !0
            try {
              e: {
                ;(N = !1), Z && ((Z = !1), K(be), (be = -1)), (w = !0)
                var I = z
                try {
                  t: {
                    for (
                      le(C), H = o(v);
                      H !== null && !(H.expirationTime > C && $e());

                    ) {
                      var ge = H.callback
                      if (typeof ge == "function") {
                        ;(H.callback = null), (z = H.priorityLevel)
                        var g = ge(H.expirationTime <= C)
                        if (((C = i.unstable_now()), typeof g == "function")) {
                          ;(H.callback = g), le(C), (X = !0)
                          break t
                        }
                        H === o(v) && r(v), le(C)
                      } else r(v)
                      H = o(v)
                    }
                    if (H !== null) X = !0
                    else {
                      var B = o(m)
                      B !== null && Ze(J, B.startTime - C), (X = !1)
                    }
                  }
                  break e
                } finally {
                  ;(H = null), (z = I), (w = !1)
                }
                X = void 0
              }
            } finally {
              X ? Qe() : (ve = !1)
            }
          }
        }
        var Qe
        if (typeof Y == "function")
          Qe = function () {
            Y(mt)
          }
        else if (typeof MessageChannel < "u") {
          var Ul = new MessageChannel(),
            Nl = Ul.port2
          ;(Ul.port1.onmessage = mt),
            (Qe = function () {
              Nl.postMessage(null)
            })
        } else
          Qe = function () {
            L(mt, 0)
          }
        function Ze(C, X) {
          be = L(function () {
            C(i.unstable_now())
          }, X)
        }
        ;(i.unstable_IdlePriority = 5),
          (i.unstable_ImmediatePriority = 1),
          (i.unstable_LowPriority = 4),
          (i.unstable_NormalPriority = 3),
          (i.unstable_Profiling = null),
          (i.unstable_UserBlockingPriority = 2),
          (i.unstable_cancelCallback = function (C) {
            C.callback = null
          }),
          (i.unstable_forceFrameRate = function (C) {
            0 > C || 125 < C
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
                )
              : (Me = 0 < C ? Math.floor(1e3 / C) : 5)
          }),
          (i.unstable_getCurrentPriorityLevel = function () {
            return z
          }),
          (i.unstable_next = function (C) {
            switch (z) {
              case 1:
              case 2:
              case 3:
                var X = 3
                break
              default:
                X = z
            }
            var I = z
            z = X
            try {
              return C()
            } finally {
              z = I
            }
          }),
          (i.unstable_requestPaint = function () {
            q = !0
          }),
          (i.unstable_runWithPriority = function (C, X) {
            switch (C) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break
              default:
                C = 3
            }
            var I = z
            z = C
            try {
              return X()
            } finally {
              z = I
            }
          }),
          (i.unstable_scheduleCallback = function (C, X, I) {
            var ge = i.unstable_now()
            switch (
              (typeof I == "object" && I !== null
                ? ((I = I.delay),
                  (I = typeof I == "number" && 0 < I ? ge + I : ge))
                : (I = ge),
              C)
            ) {
              case 1:
                var g = -1
                break
              case 2:
                g = 250
                break
              case 5:
                g = 1073741823
                break
              case 4:
                g = 1e4
                break
              default:
                g = 5e3
            }
            return (
              (g = I + g),
              (C = {
                id: _++,
                callback: X,
                priorityLevel: C,
                startTime: I,
                expirationTime: g,
                sortIndex: -1,
              }),
              I > ge
                ? ((C.sortIndex = I),
                  c(m, C),
                  o(v) === null &&
                    C === o(m) &&
                    (Z ? (K(be), (be = -1)) : (Z = !0), Ze(J, I - ge)))
                : ((C.sortIndex = g),
                  c(v, C),
                  N || w || ((N = !0), ve || ((ve = !0), Qe()))),
              C
            )
          }),
          (i.unstable_shouldYield = $e),
          (i.unstable_wrapCallback = function (C) {
            var X = z
            return function () {
              var I = z
              z = X
              try {
                return C.apply(this, arguments)
              } finally {
                z = I
              }
            }
          })
      })(Qf)),
    Qf
  )
}
var sh
function jy() {
  return sh || ((sh = 1), (Xf.exports = Ny())), Xf.exports
}
var Zf = { exports: {} },
  te = {}
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var dh
function Hy() {
  if (dh) return te
  dh = 1
  var i = Symbol.for("react.transitional.element"),
    c = Symbol.for("react.portal"),
    o = Symbol.for("react.fragment"),
    r = Symbol.for("react.strict_mode"),
    d = Symbol.for("react.profiler"),
    h = Symbol.for("react.consumer"),
    b = Symbol.for("react.context"),
    T = Symbol.for("react.forward_ref"),
    v = Symbol.for("react.suspense"),
    m = Symbol.for("react.memo"),
    _ = Symbol.for("react.lazy"),
    H = Symbol.iterator
  function z(g) {
    return g === null || typeof g != "object"
      ? null
      : ((g = (H && g[H]) || g["@@iterator"]),
        typeof g == "function" ? g : null)
  }
  var w = {
      isMounted: function () {
        return !1
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    N = Object.assign,
    Z = {}
  function q(g, B, Q) {
    ;(this.props = g),
      (this.context = B),
      (this.refs = Z),
      (this.updater = Q || w)
  }
  ;(q.prototype.isReactComponent = {}),
    (q.prototype.setState = function (g, B) {
      if (typeof g != "object" && typeof g != "function" && g != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables."
        )
      this.updater.enqueueSetState(this, g, B, "setState")
    }),
    (q.prototype.forceUpdate = function (g) {
      this.updater.enqueueForceUpdate(this, g, "forceUpdate")
    })
  function L() {}
  L.prototype = q.prototype
  function K(g, B, Q) {
    ;(this.props = g),
      (this.context = B),
      (this.refs = Z),
      (this.updater = Q || w)
  }
  var Y = (K.prototype = new L())
  ;(Y.constructor = K), N(Y, q.prototype), (Y.isPureReactComponent = !0)
  var le = Array.isArray,
    J = { H: null, A: null, T: null, S: null, V: null },
    ve = Object.prototype.hasOwnProperty
  function be(g, B, Q, G, $, fe) {
    return (
      (Q = fe.ref),
      { $$typeof: i, type: g, key: B, ref: Q !== void 0 ? Q : null, props: fe }
    )
  }
  function Me(g, B) {
    return be(g.type, B, void 0, void 0, void 0, g.props)
  }
  function Ee(g) {
    return typeof g == "object" && g !== null && g.$$typeof === i
  }
  function $e(g) {
    var B = { "=": "=0", ":": "=2" }
    return (
      "$" +
      g.replace(/[=:]/g, function (Q) {
        return B[Q]
      })
    )
  }
  var mt = /\/+/g
  function Qe(g, B) {
    return typeof g == "object" && g !== null && g.key != null
      ? $e("" + g.key)
      : B.toString(36)
  }
  function Ul() {}
  function Nl(g) {
    switch (g.status) {
      case "fulfilled":
        return g.value
      case "rejected":
        throw g.reason
      default:
        switch (
          (typeof g.status == "string"
            ? g.then(Ul, Ul)
            : ((g.status = "pending"),
              g.then(
                function (B) {
                  g.status === "pending" &&
                    ((g.status = "fulfilled"), (g.value = B))
                },
                function (B) {
                  g.status === "pending" &&
                    ((g.status = "rejected"), (g.reason = B))
                }
              )),
          g.status)
        ) {
          case "fulfilled":
            return g.value
          case "rejected":
            throw g.reason
        }
    }
    throw g
  }
  function Ze(g, B, Q, G, $) {
    var fe = typeof g
    ;(fe === "undefined" || fe === "boolean") && (g = null)
    var ee = !1
    if (g === null) ee = !0
    else
      switch (fe) {
        case "bigint":
        case "string":
        case "number":
          ee = !0
          break
        case "object":
          switch (g.$$typeof) {
            case i:
            case c:
              ee = !0
              break
            case _:
              return (ee = g._init), Ze(ee(g._payload), B, Q, G, $)
          }
      }
    if (ee)
      return (
        ($ = $(g)),
        (ee = G === "" ? "." + Qe(g, 0) : G),
        le($)
          ? ((Q = ""),
            ee != null && (Q = ee.replace(mt, "$&/") + "/"),
            Ze($, B, Q, "", function (ul) {
              return ul
            }))
          : $ != null &&
            (Ee($) &&
              ($ = Me(
                $,
                Q +
                  ($.key == null || (g && g.key === $.key)
                    ? ""
                    : ("" + $.key).replace(mt, "$&/") + "/") +
                  ee
              )),
            B.push($)),
        1
      )
    ee = 0
    var nt = G === "" ? "." : G + ":"
    if (le(g))
      for (var Te = 0; Te < g.length; Te++)
        (G = g[Te]), (fe = nt + Qe(G, Te)), (ee += Ze(G, B, Q, fe, $))
    else if (((Te = z(g)), typeof Te == "function"))
      for (g = Te.call(g), Te = 0; !(G = g.next()).done; )
        (G = G.value), (fe = nt + Qe(G, Te++)), (ee += Ze(G, B, Q, fe, $))
    else if (fe === "object") {
      if (typeof g.then == "function") return Ze(Nl(g), B, Q, G, $)
      throw (
        ((B = String(g)),
        Error(
          "Objects are not valid as a React child (found: " +
            (B === "[object Object]"
              ? "object with keys {" + Object.keys(g).join(", ") + "}"
              : B) +
            "). If you meant to render a collection of children, use an array instead."
        ))
      )
    }
    return ee
  }
  function C(g, B, Q) {
    if (g == null) return g
    var G = [],
      $ = 0
    return (
      Ze(g, G, "", "", function (fe) {
        return B.call(Q, fe, $++)
      }),
      G
    )
  }
  function X(g) {
    if (g._status === -1) {
      var B = g._result
      ;(B = B()),
        B.then(
          function (Q) {
            ;(g._status === 0 || g._status === -1) &&
              ((g._status = 1), (g._result = Q))
          },
          function (Q) {
            ;(g._status === 0 || g._status === -1) &&
              ((g._status = 2), (g._result = Q))
          }
        ),
        g._status === -1 && ((g._status = 0), (g._result = B))
    }
    if (g._status === 1) return g._result.default
    throw g._result
  }
  var I =
    typeof reportError == "function"
      ? reportError
      : function (g) {
          if (
            typeof window == "object" &&
            typeof window.ErrorEvent == "function"
          ) {
            var B = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof g == "object" &&
                g !== null &&
                typeof g.message == "string"
                  ? String(g.message)
                  : String(g),
              error: g,
            })
            if (!window.dispatchEvent(B)) return
          } else if (
            typeof process == "object" &&
            typeof process.emit == "function"
          ) {
            process.emit("uncaughtException", g)
            return
          }
          console.error(g)
        }
  function ge() {}
  return (
    (te.Children = {
      map: C,
      forEach: function (g, B, Q) {
        C(
          g,
          function () {
            B.apply(this, arguments)
          },
          Q
        )
      },
      count: function (g) {
        var B = 0
        return (
          C(g, function () {
            B++
          }),
          B
        )
      },
      toArray: function (g) {
        return (
          C(g, function (B) {
            return B
          }) || []
        )
      },
      only: function (g) {
        if (!Ee(g))
          throw Error(
            "React.Children.only expected to receive a single React element child."
          )
        return g
      },
    }),
    (te.Component = q),
    (te.Fragment = o),
    (te.Profiler = d),
    (te.PureComponent = K),
    (te.StrictMode = r),
    (te.Suspense = v),
    (te.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = J),
    (te.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (g) {
        return J.H.useMemoCache(g)
      },
    }),
    (te.cache = function (g) {
      return function () {
        return g.apply(null, arguments)
      }
    }),
    (te.cloneElement = function (g, B, Q) {
      if (g == null)
        throw Error(
          "The argument must be a React element, but you passed " + g + "."
        )
      var G = N({}, g.props),
        $ = g.key,
        fe = void 0
      if (B != null)
        for (ee in (B.ref !== void 0 && (fe = void 0),
        B.key !== void 0 && ($ = "" + B.key),
        B))
          !ve.call(B, ee) ||
            ee === "key" ||
            ee === "__self" ||
            ee === "__source" ||
            (ee === "ref" && B.ref === void 0) ||
            (G[ee] = B[ee])
      var ee = arguments.length - 2
      if (ee === 1) G.children = Q
      else if (1 < ee) {
        for (var nt = Array(ee), Te = 0; Te < ee; Te++)
          nt[Te] = arguments[Te + 2]
        G.children = nt
      }
      return be(g.type, $, void 0, void 0, fe, G)
    }),
    (te.createContext = function (g) {
      return (
        (g = {
          $$typeof: b,
          _currentValue: g,
          _currentValue2: g,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (g.Provider = g),
        (g.Consumer = { $$typeof: h, _context: g }),
        g
      )
    }),
    (te.createElement = function (g, B, Q) {
      var G,
        $ = {},
        fe = null
      if (B != null)
        for (G in (B.key !== void 0 && (fe = "" + B.key), B))
          ve.call(B, G) &&
            G !== "key" &&
            G !== "__self" &&
            G !== "__source" &&
            ($[G] = B[G])
      var ee = arguments.length - 2
      if (ee === 1) $.children = Q
      else if (1 < ee) {
        for (var nt = Array(ee), Te = 0; Te < ee; Te++)
          nt[Te] = arguments[Te + 2]
        $.children = nt
      }
      if (g && g.defaultProps)
        for (G in ((ee = g.defaultProps), ee)) $[G] === void 0 && ($[G] = ee[G])
      return be(g, fe, void 0, void 0, null, $)
    }),
    (te.createRef = function () {
      return { current: null }
    }),
    (te.forwardRef = function (g) {
      return { $$typeof: T, render: g }
    }),
    (te.isValidElement = Ee),
    (te.lazy = function (g) {
      return { $$typeof: _, _payload: { _status: -1, _result: g }, _init: X }
    }),
    (te.memo = function (g, B) {
      return { $$typeof: m, type: g, compare: B === void 0 ? null : B }
    }),
    (te.startTransition = function (g) {
      var B = J.T,
        Q = {}
      J.T = Q
      try {
        var G = g(),
          $ = J.S
        $ !== null && $(Q, G),
          typeof G == "object" &&
            G !== null &&
            typeof G.then == "function" &&
            G.then(ge, I)
      } catch (fe) {
        I(fe)
      } finally {
        J.T = B
      }
    }),
    (te.unstable_useCacheRefresh = function () {
      return J.H.useCacheRefresh()
    }),
    (te.use = function (g) {
      return J.H.use(g)
    }),
    (te.useActionState = function (g, B, Q) {
      return J.H.useActionState(g, B, Q)
    }),
    (te.useCallback = function (g, B) {
      return J.H.useCallback(g, B)
    }),
    (te.useContext = function (g) {
      return J.H.useContext(g)
    }),
    (te.useDebugValue = function () {}),
    (te.useDeferredValue = function (g, B) {
      return J.H.useDeferredValue(g, B)
    }),
    (te.useEffect = function (g, B, Q) {
      var G = J.H
      if (typeof Q == "function")
        throw Error(
          "useEffect CRUD overload is not enabled in this build of React."
        )
      return G.useEffect(g, B)
    }),
    (te.useId = function () {
      return J.H.useId()
    }),
    (te.useImperativeHandle = function (g, B, Q) {
      return J.H.useImperativeHandle(g, B, Q)
    }),
    (te.useInsertionEffect = function (g, B) {
      return J.H.useInsertionEffect(g, B)
    }),
    (te.useLayoutEffect = function (g, B) {
      return J.H.useLayoutEffect(g, B)
    }),
    (te.useMemo = function (g, B) {
      return J.H.useMemo(g, B)
    }),
    (te.useOptimistic = function (g, B) {
      return J.H.useOptimistic(g, B)
    }),
    (te.useReducer = function (g, B, Q) {
      return J.H.useReducer(g, B, Q)
    }),
    (te.useRef = function (g) {
      return J.H.useRef(g)
    }),
    (te.useState = function (g) {
      return J.H.useState(g)
    }),
    (te.useSyncExternalStore = function (g, B, Q) {
      return J.H.useSyncExternalStore(g, B, Q)
    }),
    (te.useTransition = function () {
      return J.H.useTransition()
    }),
    (te.version = "19.1.0"),
    te
  )
}
var hh
function Si() {
  return hh || ((hh = 1), (Zf.exports = Hy())), Zf.exports
}
var Vf = { exports: {} },
  Je = {}
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var mh
function By() {
  if (mh) return Je
  mh = 1
  var i = Si()
  function c(v) {
    var m = "https://react.dev/errors/" + v
    if (1 < arguments.length) {
      m += "?args[]=" + encodeURIComponent(arguments[1])
      for (var _ = 2; _ < arguments.length; _++)
        m += "&args[]=" + encodeURIComponent(arguments[_])
    }
    return (
      "Minified React error #" +
      v +
      "; visit " +
      m +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    )
  }
  function o() {}
  var r = {
      d: {
        f: o,
        r: function () {
          throw Error(c(522))
        },
        D: o,
        C: o,
        L: o,
        m: o,
        X: o,
        S: o,
        M: o,
      },
      p: 0,
      findDOMNode: null,
    },
    d = Symbol.for("react.portal")
  function h(v, m, _) {
    var H =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null
    return {
      $$typeof: d,
      key: H == null ? null : "" + H,
      children: v,
      containerInfo: m,
      implementation: _,
    }
  }
  var b = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE
  function T(v, m) {
    if (v === "font") return ""
    if (typeof m == "string") return m === "use-credentials" ? m : ""
  }
  return (
    (Je.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r),
    (Je.createPortal = function (v, m) {
      var _ =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null
      if (!m || (m.nodeType !== 1 && m.nodeType !== 9 && m.nodeType !== 11))
        throw Error(c(299))
      return h(v, m, null, _)
    }),
    (Je.flushSync = function (v) {
      var m = b.T,
        _ = r.p
      try {
        if (((b.T = null), (r.p = 2), v)) return v()
      } finally {
        ;(b.T = m), (r.p = _), r.d.f()
      }
    }),
    (Je.preconnect = function (v, m) {
      typeof v == "string" &&
        (m
          ? ((m = m.crossOrigin),
            (m =
              typeof m == "string"
                ? m === "use-credentials"
                  ? m
                  : ""
                : void 0))
          : (m = null),
        r.d.C(v, m))
    }),
    (Je.prefetchDNS = function (v) {
      typeof v == "string" && r.d.D(v)
    }),
    (Je.preinit = function (v, m) {
      if (typeof v == "string" && m && typeof m.as == "string") {
        var _ = m.as,
          H = T(_, m.crossOrigin),
          z = typeof m.integrity == "string" ? m.integrity : void 0,
          w = typeof m.fetchPriority == "string" ? m.fetchPriority : void 0
        _ === "style"
          ? r.d.S(v, typeof m.precedence == "string" ? m.precedence : void 0, {
              crossOrigin: H,
              integrity: z,
              fetchPriority: w,
            })
          : _ === "script" &&
            r.d.X(v, {
              crossOrigin: H,
              integrity: z,
              fetchPriority: w,
              nonce: typeof m.nonce == "string" ? m.nonce : void 0,
            })
      }
    }),
    (Je.preinitModule = function (v, m) {
      if (typeof v == "string")
        if (typeof m == "object" && m !== null) {
          if (m.as == null || m.as === "script") {
            var _ = T(m.as, m.crossOrigin)
            r.d.M(v, {
              crossOrigin: _,
              integrity: typeof m.integrity == "string" ? m.integrity : void 0,
              nonce: typeof m.nonce == "string" ? m.nonce : void 0,
            })
          }
        } else m == null && r.d.M(v)
    }),
    (Je.preload = function (v, m) {
      if (
        typeof v == "string" &&
        typeof m == "object" &&
        m !== null &&
        typeof m.as == "string"
      ) {
        var _ = m.as,
          H = T(_, m.crossOrigin)
        r.d.L(v, _, {
          crossOrigin: H,
          integrity: typeof m.integrity == "string" ? m.integrity : void 0,
          nonce: typeof m.nonce == "string" ? m.nonce : void 0,
          type: typeof m.type == "string" ? m.type : void 0,
          fetchPriority:
            typeof m.fetchPriority == "string" ? m.fetchPriority : void 0,
          referrerPolicy:
            typeof m.referrerPolicy == "string" ? m.referrerPolicy : void 0,
          imageSrcSet:
            typeof m.imageSrcSet == "string" ? m.imageSrcSet : void 0,
          imageSizes: typeof m.imageSizes == "string" ? m.imageSizes : void 0,
          media: typeof m.media == "string" ? m.media : void 0,
        })
      }
    }),
    (Je.preloadModule = function (v, m) {
      if (typeof v == "string")
        if (m) {
          var _ = T(m.as, m.crossOrigin)
          r.d.m(v, {
            as: typeof m.as == "string" && m.as !== "script" ? m.as : void 0,
            crossOrigin: _,
            integrity: typeof m.integrity == "string" ? m.integrity : void 0,
          })
        } else r.d.m(v)
    }),
    (Je.requestFormReset = function (v) {
      r.d.r(v)
    }),
    (Je.unstable_batchedUpdates = function (v, m) {
      return v(m)
    }),
    (Je.useFormState = function (v, m, _) {
      return b.H.useFormState(v, m, _)
    }),
    (Je.useFormStatus = function () {
      return b.H.useHostTransitionStatus()
    }),
    (Je.version = "19.1.0"),
    Je
  )
}
var yh
function Ly() {
  if (yh) return Vf.exports
  yh = 1
  function i() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i)
      } catch (c) {
        console.error(c)
      }
  }
  return i(), (Vf.exports = By()), Vf.exports
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var vh
function qy() {
  if (vh) return Xn
  vh = 1
  var i = jy(),
    c = Si(),
    o = Ly()
  function r(e) {
    var t = "https://react.dev/errors/" + e
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1])
      for (var l = 2; l < arguments.length; l++)
        t += "&args[]=" + encodeURIComponent(arguments[l])
    }
    return (
      "Minified React error #" +
      e +
      "; visit " +
      t +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    )
  }
  function d(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11))
  }
  function h(e) {
    var t = e,
      l = e
    if (e.alternate) for (; t.return; ) t = t.return
    else {
      e = t
      do (t = e), (t.flags & 4098) !== 0 && (l = t.return), (e = t.return)
      while (e)
    }
    return t.tag === 3 ? l : null
  }
  function b(e) {
    if (e.tag === 13) {
      var t = e.memoizedState
      if (
        (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
        t !== null)
      )
        return t.dehydrated
    }
    return null
  }
  function T(e) {
    if (h(e) !== e) throw Error(r(188))
  }
  function v(e) {
    var t = e.alternate
    if (!t) {
      if (((t = h(e)), t === null)) throw Error(r(188))
      return t !== e ? null : e
    }
    for (var l = e, a = t; ; ) {
      var n = l.return
      if (n === null) break
      var u = n.alternate
      if (u === null) {
        if (((a = n.return), a !== null)) {
          l = a
          continue
        }
        break
      }
      if (n.child === u.child) {
        for (u = n.child; u; ) {
          if (u === l) return T(n), e
          if (u === a) return T(n), t
          u = u.sibling
        }
        throw Error(r(188))
      }
      if (l.return !== a.return) (l = n), (a = u)
      else {
        for (var f = !1, s = n.child; s; ) {
          if (s === l) {
            ;(f = !0), (l = n), (a = u)
            break
          }
          if (s === a) {
            ;(f = !0), (a = n), (l = u)
            break
          }
          s = s.sibling
        }
        if (!f) {
          for (s = u.child; s; ) {
            if (s === l) {
              ;(f = !0), (l = u), (a = n)
              break
            }
            if (s === a) {
              ;(f = !0), (a = u), (l = n)
              break
            }
            s = s.sibling
          }
          if (!f) throw Error(r(189))
        }
      }
      if (l.alternate !== a) throw Error(r(190))
    }
    if (l.tag !== 3) throw Error(r(188))
    return l.stateNode.current === l ? e : t
  }
  function m(e) {
    var t = e.tag
    if (t === 5 || t === 26 || t === 27 || t === 6) return e
    for (e = e.child; e !== null; ) {
      if (((t = m(e)), t !== null)) return t
      e = e.sibling
    }
    return null
  }
  var _ = Object.assign,
    H = Symbol.for("react.element"),
    z = Symbol.for("react.transitional.element"),
    w = Symbol.for("react.portal"),
    N = Symbol.for("react.fragment"),
    Z = Symbol.for("react.strict_mode"),
    q = Symbol.for("react.profiler"),
    L = Symbol.for("react.provider"),
    K = Symbol.for("react.consumer"),
    Y = Symbol.for("react.context"),
    le = Symbol.for("react.forward_ref"),
    J = Symbol.for("react.suspense"),
    ve = Symbol.for("react.suspense_list"),
    be = Symbol.for("react.memo"),
    Me = Symbol.for("react.lazy"),
    Ee = Symbol.for("react.activity"),
    $e = Symbol.for("react.memo_cache_sentinel"),
    mt = Symbol.iterator
  function Qe(e) {
    return e === null || typeof e != "object"
      ? null
      : ((e = (mt && e[mt]) || e["@@iterator"]),
        typeof e == "function" ? e : null)
  }
  var Ul = Symbol.for("react.client.reference")
  function Nl(e) {
    if (e == null) return null
    if (typeof e == "function")
      return e.$$typeof === Ul ? null : e.displayName || e.name || null
    if (typeof e == "string") return e
    switch (e) {
      case N:
        return "Fragment"
      case q:
        return "Profiler"
      case Z:
        return "StrictMode"
      case J:
        return "Suspense"
      case ve:
        return "SuspenseList"
      case Ee:
        return "Activity"
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case w:
          return "Portal"
        case Y:
          return (e.displayName || "Context") + ".Provider"
        case K:
          return (e._context.displayName || "Context") + ".Consumer"
        case le:
          var t = e.render
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ""),
              (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
            e
          )
        case be:
          return (
            (t = e.displayName || null), t !== null ? t : Nl(e.type) || "Memo"
          )
        case Me:
          ;(t = e._payload), (e = e._init)
          try {
            return Nl(e(t))
          } catch {}
      }
    return null
  }
  var Ze = Array.isArray,
    C = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    X = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    I = { pending: !1, data: null, method: null, action: null },
    ge = [],
    g = -1
  function B(e) {
    return { current: e }
  }
  function Q(e) {
    0 > g || ((e.current = ge[g]), (ge[g] = null), g--)
  }
  function G(e, t) {
    g++, (ge[g] = e.current), (e.current = t)
  }
  var $ = B(null),
    fe = B(null),
    ee = B(null),
    nt = B(null)
  function Te(e, t) {
    switch ((G(ee, t), G(fe, e), G($, null), t.nodeType)) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Bd(e) : 0
        break
      default:
        if (((e = t.tagName), (t = t.namespaceURI))) (t = Bd(t)), (e = Ld(t, e))
        else
          switch (e) {
            case "svg":
              e = 1
              break
            case "math":
              e = 2
              break
            default:
              e = 0
          }
    }
    Q($), G($, e)
  }
  function ul() {
    Q($), Q(fe), Q(ee)
  }
  function Ai(e) {
    e.memoizedState !== null && G(nt, e)
    var t = $.current,
      l = Ld(t, e.type)
    t !== l && (G(fe, e), G($, l))
  }
  function Fn(e) {
    fe.current === e && (Q($), Q(fe)),
      nt.current === e && (Q(nt), (Bn._currentValue = I))
  }
  var _i = Object.prototype.hasOwnProperty,
    Oi = i.unstable_scheduleCallback,
    Ri = i.unstable_cancelCallback,
    rm = i.unstable_shouldYield,
    om = i.unstable_requestPaint,
    zt = i.unstable_now,
    sm = i.unstable_getCurrentPriorityLevel,
    yr = i.unstable_ImmediatePriority,
    vr = i.unstable_UserBlockingPriority,
    In = i.unstable_NormalPriority,
    dm = i.unstable_LowPriority,
    gr = i.unstable_IdlePriority,
    hm = i.log,
    mm = i.unstable_setDisableYieldValue,
    Qa = null,
    ut = null
  function il(e) {
    if (
      (typeof hm == "function" && mm(e),
      ut && typeof ut.setStrictMode == "function")
    )
      try {
        ut.setStrictMode(Qa, e)
      } catch {}
  }
  var it = Math.clz32 ? Math.clz32 : gm,
    ym = Math.log,
    vm = Math.LN2
  function gm(e) {
    return (e >>>= 0), e === 0 ? 32 : (31 - ((ym(e) / vm) | 0)) | 0
  }
  var Pn = 256,
    eu = 4194304
  function jl(e) {
    var t = e & 42
    if (t !== 0) return t
    switch (e & -e) {
      case 1:
        return 1
      case 2:
        return 2
      case 4:
        return 4
      case 8:
        return 8
      case 16:
        return 16
      case 32:
        return 32
      case 64:
        return 64
      case 128:
        return 128
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 4194048
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560
      case 67108864:
        return 67108864
      case 134217728:
        return 134217728
      case 268435456:
        return 268435456
      case 536870912:
        return 536870912
      case 1073741824:
        return 0
      default:
        return e
    }
  }
  function tu(e, t, l) {
    var a = e.pendingLanes
    if (a === 0) return 0
    var n = 0,
      u = e.suspendedLanes,
      f = e.pingedLanes
    e = e.warmLanes
    var s = a & 134217727
    return (
      s !== 0
        ? ((a = s & ~u),
          a !== 0
            ? (n = jl(a))
            : ((f &= s),
              f !== 0
                ? (n = jl(f))
                : l || ((l = s & ~e), l !== 0 && (n = jl(l)))))
        : ((s = a & ~u),
          s !== 0
            ? (n = jl(s))
            : f !== 0
            ? (n = jl(f))
            : l || ((l = a & ~e), l !== 0 && (n = jl(l)))),
      n === 0
        ? 0
        : t !== 0 &&
          t !== n &&
          (t & u) === 0 &&
          ((u = n & -n),
          (l = t & -t),
          u >= l || (u === 32 && (l & 4194048) !== 0))
        ? t
        : n
    )
  }
  function Za(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0
  }
  function pm(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1
      default:
        return -1
    }
  }
  function pr() {
    var e = Pn
    return (Pn <<= 1), (Pn & 4194048) === 0 && (Pn = 256), e
  }
  function Sr() {
    var e = eu
    return (eu <<= 1), (eu & 62914560) === 0 && (eu = 4194304), e
  }
  function Mi(e) {
    for (var t = [], l = 0; 31 > l; l++) t.push(e)
    return t
  }
  function Va(e, t) {
    ;(e.pendingLanes |= t),
      t !== 268435456 &&
        ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0))
  }
  function Sm(e, t, l, a, n, u) {
    var f = e.pendingLanes
    ;(e.pendingLanes = l),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.warmLanes = 0),
      (e.expiredLanes &= l),
      (e.entangledLanes &= l),
      (e.errorRecoveryDisabledLanes &= l),
      (e.shellSuspendCounter = 0)
    var s = e.entanglements,
      y = e.expirationTimes,
      A = e.hiddenUpdates
    for (l = f & ~l; 0 < l; ) {
      var D = 31 - it(l),
        j = 1 << D
      ;(s[D] = 0), (y[D] = -1)
      var O = A[D]
      if (O !== null)
        for (A[D] = null, D = 0; D < O.length; D++) {
          var M = O[D]
          M !== null && (M.lane &= -536870913)
        }
      l &= ~j
    }
    a !== 0 && br(e, a, 0),
      u !== 0 && n === 0 && e.tag !== 0 && (e.suspendedLanes |= u & ~(f & ~t))
  }
  function br(e, t, l) {
    ;(e.pendingLanes |= t), (e.suspendedLanes &= ~t)
    var a = 31 - it(t)
    ;(e.entangledLanes |= t),
      (e.entanglements[a] = e.entanglements[a] | 1073741824 | (l & 4194090))
  }
  function Er(e, t) {
    var l = (e.entangledLanes |= t)
    for (e = e.entanglements; l; ) {
      var a = 31 - it(l),
        n = 1 << a
      ;(n & t) | (e[a] & t) && (e[a] |= t), (l &= ~n)
    }
  }
  function Di(e) {
    switch (e) {
      case 2:
        e = 1
        break
      case 8:
        e = 4
        break
      case 32:
        e = 16
        break
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        e = 128
        break
      case 268435456:
        e = 134217728
        break
      default:
        e = 0
    }
    return e
  }
  function Ci(e) {
    return (
      (e &= -e),
      2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
    )
  }
  function Tr() {
    var e = X.p
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : lh(e.type))
  }
  function bm(e, t) {
    var l = X.p
    try {
      return (X.p = e), t()
    } finally {
      X.p = l
    }
  }
  var cl = Math.random().toString(36).slice(2),
    Ve = "__reactFiber$" + cl,
    Pe = "__reactProps$" + cl,
    ea = "__reactContainer$" + cl,
    zi = "__reactEvents$" + cl,
    Em = "__reactListeners$" + cl,
    Tm = "__reactHandles$" + cl,
    xr = "__reactResources$" + cl,
    Ka = "__reactMarker$" + cl
  function Ui(e) {
    delete e[Ve], delete e[Pe], delete e[zi], delete e[Em], delete e[Tm]
  }
  function ta(e) {
    var t = e[Ve]
    if (t) return t
    for (var l = e.parentNode; l; ) {
      if ((t = l[ea] || l[Ve])) {
        if (
          ((l = t.alternate),
          t.child !== null || (l !== null && l.child !== null))
        )
          for (e = Gd(e); e !== null; ) {
            if ((l = e[Ve])) return l
            e = Gd(e)
          }
        return t
      }
      ;(e = l), (l = e.parentNode)
    }
    return null
  }
  function la(e) {
    if ((e = e[Ve] || e[ea])) {
      var t = e.tag
      if (t === 5 || t === 6 || t === 13 || t === 26 || t === 27 || t === 3)
        return e
    }
    return null
  }
  function Ja(e) {
    var t = e.tag
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode
    throw Error(r(33))
  }
  function aa(e) {
    var t = e[xr]
    return (
      t ||
        (t = e[xr] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
      t
    )
  }
  function Be(e) {
    e[Ka] = !0
  }
  var Ar = new Set(),
    _r = {}
  function Hl(e, t) {
    na(e, t), na(e + "Capture", t)
  }
  function na(e, t) {
    for (_r[e] = t, e = 0; e < t.length; e++) Ar.add(t[e])
  }
  var xm = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ),
    Or = {},
    Rr = {}
  function Am(e) {
    return _i.call(Rr, e)
      ? !0
      : _i.call(Or, e)
      ? !1
      : xm.test(e)
      ? (Rr[e] = !0)
      : ((Or[e] = !0), !1)
  }
  function lu(e, t, l) {
    if (Am(t))
      if (l === null) e.removeAttribute(t)
      else {
        switch (typeof l) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t)
            return
          case "boolean":
            var a = t.toLowerCase().slice(0, 5)
            if (a !== "data-" && a !== "aria-") {
              e.removeAttribute(t)
              return
            }
        }
        e.setAttribute(t, "" + l)
      }
  }
  function au(e, t, l) {
    if (l === null) e.removeAttribute(t)
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t)
          return
      }
      e.setAttribute(t, "" + l)
    }
  }
  function wt(e, t, l, a) {
    if (a === null) e.removeAttribute(l)
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(l)
          return
      }
      e.setAttributeNS(t, l, "" + a)
    }
  }
  var Ni, Mr
  function ua(e) {
    if (Ni === void 0)
      try {
        throw Error()
      } catch (l) {
        var t = l.stack.trim().match(/\n( *(at )?)/)
        ;(Ni = (t && t[1]) || ""),
          (Mr =
            -1 <
            l.stack.indexOf(`
    at`)
              ? " (<anonymous>)"
              : -1 < l.stack.indexOf("@")
              ? "@unknown:0:0"
              : "")
      }
    return (
      `
` +
      Ni +
      e +
      Mr
    )
  }
  var ji = !1
  function Hi(e, t) {
    if (!e || ji) return ""
    ji = !0
    var l = Error.prepareStackTrace
    Error.prepareStackTrace = void 0
    try {
      var a = {
        DetermineComponentFrameRoot: function () {
          try {
            if (t) {
              var j = function () {
                throw Error()
              }
              if (
                (Object.defineProperty(j.prototype, "props", {
                  set: function () {
                    throw Error()
                  },
                }),
                typeof Reflect == "object" && Reflect.construct)
              ) {
                try {
                  Reflect.construct(j, [])
                } catch (M) {
                  var O = M
                }
                Reflect.construct(e, [], j)
              } else {
                try {
                  j.call()
                } catch (M) {
                  O = M
                }
                e.call(j.prototype)
              }
            } else {
              try {
                throw Error()
              } catch (M) {
                O = M
              }
              ;(j = e()) &&
                typeof j.catch == "function" &&
                j.catch(function () {})
            }
          } catch (M) {
            if (M && O && typeof M.stack == "string") return [M.stack, O.stack]
          }
          return [null, null]
        },
      }
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot"
      var n = Object.getOwnPropertyDescriptor(
        a.DetermineComponentFrameRoot,
        "name"
      )
      n &&
        n.configurable &&
        Object.defineProperty(a.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot",
        })
      var u = a.DetermineComponentFrameRoot(),
        f = u[0],
        s = u[1]
      if (f && s) {
        var y = f.split(`
`),
          A = s.split(`
`)
        for (
          n = a = 0;
          a < y.length && !y[a].includes("DetermineComponentFrameRoot");

        )
          a++
        for (; n < A.length && !A[n].includes("DetermineComponentFrameRoot"); )
          n++
        if (a === y.length || n === A.length)
          for (
            a = y.length - 1, n = A.length - 1;
            1 <= a && 0 <= n && y[a] !== A[n];

          )
            n--
        for (; 1 <= a && 0 <= n; a--, n--)
          if (y[a] !== A[n]) {
            if (a !== 1 || n !== 1)
              do
                if ((a--, n--, 0 > n || y[a] !== A[n])) {
                  var D =
                    `
` + y[a].replace(" at new ", " at ")
                  return (
                    e.displayName &&
                      D.includes("<anonymous>") &&
                      (D = D.replace("<anonymous>", e.displayName)),
                    D
                  )
                }
              while (1 <= a && 0 <= n)
            break
          }
      }
    } finally {
      ;(ji = !1), (Error.prepareStackTrace = l)
    }
    return (l = e ? e.displayName || e.name : "") ? ua(l) : ""
  }
  function _m(e) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return ua(e.type)
      case 16:
        return ua("Lazy")
      case 13:
        return ua("Suspense")
      case 19:
        return ua("SuspenseList")
      case 0:
      case 15:
        return Hi(e.type, !1)
      case 11:
        return Hi(e.type.render, !1)
      case 1:
        return Hi(e.type, !0)
      case 31:
        return ua("Activity")
      default:
        return ""
    }
  }
  function Dr(e) {
    try {
      var t = ""
      do (t += _m(e)), (e = e.return)
      while (e)
      return t
    } catch (l) {
      return (
        `
Error generating stack: ` +
        l.message +
        `
` +
        l.stack
      )
    }
  }
  function yt(e) {
    switch (typeof e) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e
      case "object":
        return e
      default:
        return ""
    }
  }
  function Cr(e) {
    var t = e.type
    return (
      (e = e.nodeName) &&
      e.toLowerCase() === "input" &&
      (t === "checkbox" || t === "radio")
    )
  }
  function Om(e) {
    var t = Cr(e) ? "checked" : "value",
      l = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
      a = "" + e[t]
    if (
      !e.hasOwnProperty(t) &&
      typeof l < "u" &&
      typeof l.get == "function" &&
      typeof l.set == "function"
    ) {
      var n = l.get,
        u = l.set
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return n.call(this)
          },
          set: function (f) {
            ;(a = "" + f), u.call(this, f)
          },
        }),
        Object.defineProperty(e, t, { enumerable: l.enumerable }),
        {
          getValue: function () {
            return a
          },
          setValue: function (f) {
            a = "" + f
          },
          stopTracking: function () {
            ;(e._valueTracker = null), delete e[t]
          },
        }
      )
    }
  }
  function nu(e) {
    e._valueTracker || (e._valueTracker = Om(e))
  }
  function zr(e) {
    if (!e) return !1
    var t = e._valueTracker
    if (!t) return !0
    var l = t.getValue(),
      a = ""
    return (
      e && (a = Cr(e) ? (e.checked ? "true" : "false") : e.value),
      (e = a),
      e !== l ? (t.setValue(e), !0) : !1
    )
  }
  function uu(e) {
    if (
      ((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u")
    )
      return null
    try {
      return e.activeElement || e.body
    } catch {
      return e.body
    }
  }
  var Rm = /[\n"\\]/g
  function vt(e) {
    return e.replace(Rm, function (t) {
      return "\\" + t.charCodeAt(0).toString(16) + " "
    })
  }
  function Bi(e, t, l, a, n, u, f, s) {
    ;(e.name = ""),
      f != null &&
      typeof f != "function" &&
      typeof f != "symbol" &&
      typeof f != "boolean"
        ? (e.type = f)
        : e.removeAttribute("type"),
      t != null
        ? f === "number"
          ? ((t === 0 && e.value === "") || e.value != t) &&
            (e.value = "" + yt(t))
          : e.value !== "" + yt(t) && (e.value = "" + yt(t))
        : (f !== "submit" && f !== "reset") || e.removeAttribute("value"),
      t != null
        ? Li(e, f, yt(t))
        : l != null
        ? Li(e, f, yt(l))
        : a != null && e.removeAttribute("value"),
      n == null && u != null && (e.defaultChecked = !!u),
      n != null &&
        (e.checked = n && typeof n != "function" && typeof n != "symbol"),
      s != null &&
      typeof s != "function" &&
      typeof s != "symbol" &&
      typeof s != "boolean"
        ? (e.name = "" + yt(s))
        : e.removeAttribute("name")
  }
  function Ur(e, t, l, a, n, u, f, s) {
    if (
      (u != null &&
        typeof u != "function" &&
        typeof u != "symbol" &&
        typeof u != "boolean" &&
        (e.type = u),
      t != null || l != null)
    ) {
      if (!((u !== "submit" && u !== "reset") || t != null)) return
      ;(l = l != null ? "" + yt(l) : ""),
        (t = t != null ? "" + yt(t) : l),
        s || t === e.value || (e.value = t),
        (e.defaultValue = t)
    }
    ;(a = a ?? n),
      (a = typeof a != "function" && typeof a != "symbol" && !!a),
      (e.checked = s ? e.checked : !!a),
      (e.defaultChecked = !!a),
      f != null &&
        typeof f != "function" &&
        typeof f != "symbol" &&
        typeof f != "boolean" &&
        (e.name = f)
  }
  function Li(e, t, l) {
    ;(t === "number" && uu(e.ownerDocument) === e) ||
      e.defaultValue === "" + l ||
      (e.defaultValue = "" + l)
  }
  function ia(e, t, l, a) {
    if (((e = e.options), t)) {
      t = {}
      for (var n = 0; n < l.length; n++) t["$" + l[n]] = !0
      for (l = 0; l < e.length; l++)
        (n = t.hasOwnProperty("$" + e[l].value)),
          e[l].selected !== n && (e[l].selected = n),
          n && a && (e[l].defaultSelected = !0)
    } else {
      for (l = "" + yt(l), t = null, n = 0; n < e.length; n++) {
        if (e[n].value === l) {
          ;(e[n].selected = !0), a && (e[n].defaultSelected = !0)
          return
        }
        t !== null || e[n].disabled || (t = e[n])
      }
      t !== null && (t.selected = !0)
    }
  }
  function Nr(e, t, l) {
    if (
      t != null &&
      ((t = "" + yt(t)), t !== e.value && (e.value = t), l == null)
    ) {
      e.defaultValue !== t && (e.defaultValue = t)
      return
    }
    e.defaultValue = l != null ? "" + yt(l) : ""
  }
  function jr(e, t, l, a) {
    if (t == null) {
      if (a != null) {
        if (l != null) throw Error(r(92))
        if (Ze(a)) {
          if (1 < a.length) throw Error(r(93))
          a = a[0]
        }
        l = a
      }
      l == null && (l = ""), (t = l)
    }
    ;(l = yt(t)),
      (e.defaultValue = l),
      (a = e.textContent),
      a === l && a !== "" && a !== null && (e.value = a)
  }
  function ca(e, t) {
    if (t) {
      var l = e.firstChild
      if (l && l === e.lastChild && l.nodeType === 3) {
        l.nodeValue = t
        return
      }
    }
    e.textContent = t
  }
  var Mm = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  )
  function Hr(e, t, l) {
    var a = t.indexOf("--") === 0
    l == null || typeof l == "boolean" || l === ""
      ? a
        ? e.setProperty(t, "")
        : t === "float"
        ? (e.cssFloat = "")
        : (e[t] = "")
      : a
      ? e.setProperty(t, l)
      : typeof l != "number" || l === 0 || Mm.has(t)
      ? t === "float"
        ? (e.cssFloat = l)
        : (e[t] = ("" + l).trim())
      : (e[t] = l + "px")
  }
  function Br(e, t, l) {
    if (t != null && typeof t != "object") throw Error(r(62))
    if (((e = e.style), l != null)) {
      for (var a in l)
        !l.hasOwnProperty(a) ||
          (t != null && t.hasOwnProperty(a)) ||
          (a.indexOf("--") === 0
            ? e.setProperty(a, "")
            : a === "float"
            ? (e.cssFloat = "")
            : (e[a] = ""))
      for (var n in t)
        (a = t[n]), t.hasOwnProperty(n) && l[n] !== a && Hr(e, n, a)
    } else for (var u in t) t.hasOwnProperty(u) && Hr(e, u, t[u])
  }
  function qi(e) {
    if (e.indexOf("-") === -1) return !1
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1
      default:
        return !0
    }
  }
  var Dm = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"],
    ]),
    Cm =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i
  function iu(e) {
    return Cm.test("" + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e
  }
  var wi = null
  function Yi(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    )
  }
  var fa = null,
    ra = null
  function Lr(e) {
    var t = la(e)
    if (t && (e = t.stateNode)) {
      var l = e[Pe] || null
      e: switch (((e = t.stateNode), t.type)) {
        case "input":
          if (
            (Bi(
              e,
              l.value,
              l.defaultValue,
              l.defaultValue,
              l.checked,
              l.defaultChecked,
              l.type,
              l.name
            ),
            (t = l.name),
            l.type === "radio" && t != null)
          ) {
            for (l = e; l.parentNode; ) l = l.parentNode
            for (
              l = l.querySelectorAll(
                'input[name="' + vt("" + t) + '"][type="radio"]'
              ),
                t = 0;
              t < l.length;
              t++
            ) {
              var a = l[t]
              if (a !== e && a.form === e.form) {
                var n = a[Pe] || null
                if (!n) throw Error(r(90))
                Bi(
                  a,
                  n.value,
                  n.defaultValue,
                  n.defaultValue,
                  n.checked,
                  n.defaultChecked,
                  n.type,
                  n.name
                )
              }
            }
            for (t = 0; t < l.length; t++)
              (a = l[t]), a.form === e.form && zr(a)
          }
          break e
        case "textarea":
          Nr(e, l.value, l.defaultValue)
          break e
        case "select":
          ;(t = l.value), t != null && ia(e, !!l.multiple, t, !1)
      }
    }
  }
  var Gi = !1
  function qr(e, t, l) {
    if (Gi) return e(t, l)
    Gi = !0
    try {
      var a = e(t)
      return a
    } finally {
      if (
        ((Gi = !1),
        (fa !== null || ra !== null) &&
          (Vu(), fa && ((t = fa), (e = ra), (ra = fa = null), Lr(t), e)))
      )
        for (t = 0; t < e.length; t++) Lr(e[t])
    }
  }
  function ka(e, t) {
    var l = e.stateNode
    if (l === null) return null
    var a = l[Pe] || null
    if (a === null) return null
    l = a[t]
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        ;(a = !a.disabled) ||
          ((e = e.type),
          (a = !(
            e === "button" ||
            e === "input" ||
            e === "select" ||
            e === "textarea"
          ))),
          (e = !a)
        break e
      default:
        e = !1
    }
    if (e) return null
    if (l && typeof l != "function") throw Error(r(231, t, typeof l))
    return l
  }
  var Yt = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    Xi = !1
  if (Yt)
    try {
      var $a = {}
      Object.defineProperty($a, "passive", {
        get: function () {
          Xi = !0
        },
      }),
        window.addEventListener("test", $a, $a),
        window.removeEventListener("test", $a, $a)
    } catch {
      Xi = !1
    }
  var fl = null,
    Qi = null,
    cu = null
  function wr() {
    if (cu) return cu
    var e,
      t = Qi,
      l = t.length,
      a,
      n = "value" in fl ? fl.value : fl.textContent,
      u = n.length
    for (e = 0; e < l && t[e] === n[e]; e++);
    var f = l - e
    for (a = 1; a <= f && t[l - a] === n[u - a]; a++);
    return (cu = n.slice(e, 1 < a ? 1 - a : void 0))
  }
  function fu(e) {
    var t = e.keyCode
    return (
      "charCode" in e
        ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
        : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    )
  }
  function ru() {
    return !0
  }
  function Yr() {
    return !1
  }
  function et(e) {
    function t(l, a, n, u, f) {
      ;(this._reactName = l),
        (this._targetInst = n),
        (this.type = a),
        (this.nativeEvent = u),
        (this.target = f),
        (this.currentTarget = null)
      for (var s in e)
        e.hasOwnProperty(s) && ((l = e[s]), (this[s] = l ? l(u) : u[s]))
      return (
        (this.isDefaultPrevented = (
          u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1
        )
          ? ru
          : Yr),
        (this.isPropagationStopped = Yr),
        this
      )
    }
    return (
      _(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0
          var l = this.nativeEvent
          l &&
            (l.preventDefault
              ? l.preventDefault()
              : typeof l.returnValue != "unknown" && (l.returnValue = !1),
            (this.isDefaultPrevented = ru))
        },
        stopPropagation: function () {
          var l = this.nativeEvent
          l &&
            (l.stopPropagation
              ? l.stopPropagation()
              : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0),
            (this.isPropagationStopped = ru))
        },
        persist: function () {},
        isPersistent: ru,
      }),
      t
    )
  }
  var Bl = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now()
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    ou = et(Bl),
    Wa = _({}, Bl, { view: 0, detail: 0 }),
    zm = et(Wa),
    Zi,
    Vi,
    Fa,
    su = _({}, Wa, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: Ji,
      button: 0,
      buttons: 0,
      relatedTarget: function (e) {
        return e.relatedTarget === void 0
          ? e.fromElement === e.srcElement
            ? e.toElement
            : e.fromElement
          : e.relatedTarget
      },
      movementX: function (e) {
        return "movementX" in e
          ? e.movementX
          : (e !== Fa &&
              (Fa && e.type === "mousemove"
                ? ((Zi = e.screenX - Fa.screenX), (Vi = e.screenY - Fa.screenY))
                : (Vi = Zi = 0),
              (Fa = e)),
            Zi)
      },
      movementY: function (e) {
        return "movementY" in e ? e.movementY : Vi
      },
    }),
    Gr = et(su),
    Um = _({}, su, { dataTransfer: 0 }),
    Nm = et(Um),
    jm = _({}, Wa, { relatedTarget: 0 }),
    Ki = et(jm),
    Hm = _({}, Bl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Bm = et(Hm),
    Lm = _({}, Bl, {
      clipboardData: function (e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData
      },
    }),
    qm = et(Lm),
    wm = _({}, Bl, { data: 0 }),
    Xr = et(wm),
    Ym = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    Gm = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    Xm = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    }
  function Qm(e) {
    var t = this.nativeEvent
    return t.getModifierState
      ? t.getModifierState(e)
      : (e = Xm[e])
      ? !!t[e]
      : !1
  }
  function Ji() {
    return Qm
  }
  var Zm = _({}, Wa, {
      key: function (e) {
        if (e.key) {
          var t = Ym[e.key] || e.key
          if (t !== "Unidentified") return t
        }
        return e.type === "keypress"
          ? ((e = fu(e)), e === 13 ? "Enter" : String.fromCharCode(e))
          : e.type === "keydown" || e.type === "keyup"
          ? Gm[e.keyCode] || "Unidentified"
          : ""
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Ji,
      charCode: function (e) {
        return e.type === "keypress" ? fu(e) : 0
      },
      keyCode: function (e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
      },
      which: function (e) {
        return e.type === "keypress"
          ? fu(e)
          : e.type === "keydown" || e.type === "keyup"
          ? e.keyCode
          : 0
      },
    }),
    Vm = et(Zm),
    Km = _({}, su, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    Qr = et(Km),
    Jm = _({}, Wa, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Ji,
    }),
    km = et(Jm),
    $m = _({}, Bl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Wm = et($m),
    Fm = _({}, su, {
      deltaX: function (e) {
        return "deltaX" in e
          ? e.deltaX
          : "wheelDeltaX" in e
          ? -e.wheelDeltaX
          : 0
      },
      deltaY: function (e) {
        return "deltaY" in e
          ? e.deltaY
          : "wheelDeltaY" in e
          ? -e.wheelDeltaY
          : "wheelDelta" in e
          ? -e.wheelDelta
          : 0
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    Im = et(Fm),
    Pm = _({}, Bl, { newState: 0, oldState: 0 }),
    e0 = et(Pm),
    t0 = [9, 13, 27, 32],
    ki = Yt && "CompositionEvent" in window,
    Ia = null
  Yt && "documentMode" in document && (Ia = document.documentMode)
  var l0 = Yt && "TextEvent" in window && !Ia,
    Zr = Yt && (!ki || (Ia && 8 < Ia && 11 >= Ia)),
    Vr = " ",
    Kr = !1
  function Jr(e, t) {
    switch (e) {
      case "keyup":
        return t0.indexOf(t.keyCode) !== -1
      case "keydown":
        return t.keyCode !== 229
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0
      default:
        return !1
    }
  }
  function kr(e) {
    return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null
  }
  var oa = !1
  function a0(e, t) {
    switch (e) {
      case "compositionend":
        return kr(t)
      case "keypress":
        return t.which !== 32 ? null : ((Kr = !0), Vr)
      case "textInput":
        return (e = t.data), e === Vr && Kr ? null : e
      default:
        return null
    }
  }
  function n0(e, t) {
    if (oa)
      return e === "compositionend" || (!ki && Jr(e, t))
        ? ((e = wr()), (cu = Qi = fl = null), (oa = !1), e)
        : null
    switch (e) {
      case "paste":
        return null
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
          if (t.char && 1 < t.char.length) return t.char
          if (t.which) return String.fromCharCode(t.which)
        }
        return null
      case "compositionend":
        return Zr && t.locale !== "ko" ? null : t.data
      default:
        return null
    }
  }
  var u0 = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  }
  function $r(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase()
    return t === "input" ? !!u0[e.type] : t === "textarea"
  }
  function Wr(e, t, l, a) {
    fa ? (ra ? ra.push(a) : (ra = [a])) : (fa = a),
      (t = Fu(t, "onChange")),
      0 < t.length &&
        ((l = new ou("onChange", "change", null, l, a)),
        e.push({ event: l, listeners: t }))
  }
  var Pa = null,
    en = null
  function i0(e) {
    zd(e, 0)
  }
  function du(e) {
    var t = Ja(e)
    if (zr(t)) return e
  }
  function Fr(e, t) {
    if (e === "change") return t
  }
  var Ir = !1
  if (Yt) {
    var $i
    if (Yt) {
      var Wi = "oninput" in document
      if (!Wi) {
        var Pr = document.createElement("div")
        Pr.setAttribute("oninput", "return;"),
          (Wi = typeof Pr.oninput == "function")
      }
      $i = Wi
    } else $i = !1
    Ir = $i && (!document.documentMode || 9 < document.documentMode)
  }
  function eo() {
    Pa && (Pa.detachEvent("onpropertychange", to), (en = Pa = null))
  }
  function to(e) {
    if (e.propertyName === "value" && du(en)) {
      var t = []
      Wr(t, en, e, Yi(e)), qr(i0, t)
    }
  }
  function c0(e, t, l) {
    e === "focusin"
      ? (eo(), (Pa = t), (en = l), Pa.attachEvent("onpropertychange", to))
      : e === "focusout" && eo()
  }
  function f0(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return du(en)
  }
  function r0(e, t) {
    if (e === "click") return du(t)
  }
  function o0(e, t) {
    if (e === "input" || e === "change") return du(t)
  }
  function s0(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t)
  }
  var ct = typeof Object.is == "function" ? Object.is : s0
  function tn(e, t) {
    if (ct(e, t)) return !0
    if (
      typeof e != "object" ||
      e === null ||
      typeof t != "object" ||
      t === null
    )
      return !1
    var l = Object.keys(e),
      a = Object.keys(t)
    if (l.length !== a.length) return !1
    for (a = 0; a < l.length; a++) {
      var n = l[a]
      if (!_i.call(t, n) || !ct(e[n], t[n])) return !1
    }
    return !0
  }
  function lo(e) {
    for (; e && e.firstChild; ) e = e.firstChild
    return e
  }
  function ao(e, t) {
    var l = lo(e)
    e = 0
    for (var a; l; ) {
      if (l.nodeType === 3) {
        if (((a = e + l.textContent.length), e <= t && a >= t))
          return { node: l, offset: t - e }
        e = a
      }
      e: {
        for (; l; ) {
          if (l.nextSibling) {
            l = l.nextSibling
            break e
          }
          l = l.parentNode
        }
        l = void 0
      }
      l = lo(l)
    }
  }
  function no(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
        ? no(e, t.parentNode)
        : "contains" in e
        ? e.contains(t)
        : e.compareDocumentPosition
        ? !!(e.compareDocumentPosition(t) & 16)
        : !1
      : !1
  }
  function uo(e) {
    e =
      e != null &&
      e.ownerDocument != null &&
      e.ownerDocument.defaultView != null
        ? e.ownerDocument.defaultView
        : window
    for (var t = uu(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var l = typeof t.contentWindow.location.href == "string"
      } catch {
        l = !1
      }
      if (l) e = t.contentWindow
      else break
      t = uu(e.document)
    }
    return t
  }
  function Fi(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase()
    return (
      t &&
      ((t === "input" &&
        (e.type === "text" ||
          e.type === "search" ||
          e.type === "tel" ||
          e.type === "url" ||
          e.type === "password")) ||
        t === "textarea" ||
        e.contentEditable === "true")
    )
  }
  var d0 = Yt && "documentMode" in document && 11 >= document.documentMode,
    sa = null,
    Ii = null,
    ln = null,
    Pi = !1
  function io(e, t, l) {
    var a = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument
    Pi ||
      sa == null ||
      sa !== uu(a) ||
      ((a = sa),
      "selectionStart" in a && Fi(a)
        ? (a = { start: a.selectionStart, end: a.selectionEnd })
        : ((a = (
            (a.ownerDocument && a.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (a = {
            anchorNode: a.anchorNode,
            anchorOffset: a.anchorOffset,
            focusNode: a.focusNode,
            focusOffset: a.focusOffset,
          })),
      (ln && tn(ln, a)) ||
        ((ln = a),
        (a = Fu(Ii, "onSelect")),
        0 < a.length &&
          ((t = new ou("onSelect", "select", null, t, l)),
          e.push({ event: t, listeners: a }),
          (t.target = sa))))
  }
  function Ll(e, t) {
    var l = {}
    return (
      (l[e.toLowerCase()] = t.toLowerCase()),
      (l["Webkit" + e] = "webkit" + t),
      (l["Moz" + e] = "moz" + t),
      l
    )
  }
  var da = {
      animationend: Ll("Animation", "AnimationEnd"),
      animationiteration: Ll("Animation", "AnimationIteration"),
      animationstart: Ll("Animation", "AnimationStart"),
      transitionrun: Ll("Transition", "TransitionRun"),
      transitionstart: Ll("Transition", "TransitionStart"),
      transitioncancel: Ll("Transition", "TransitionCancel"),
      transitionend: Ll("Transition", "TransitionEnd"),
    },
    ec = {},
    co = {}
  Yt &&
    ((co = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete da.animationend.animation,
      delete da.animationiteration.animation,
      delete da.animationstart.animation),
    "TransitionEvent" in window || delete da.transitionend.transition)
  function ql(e) {
    if (ec[e]) return ec[e]
    if (!da[e]) return e
    var t = da[e],
      l
    for (l in t) if (t.hasOwnProperty(l) && l in co) return (ec[e] = t[l])
    return e
  }
  var fo = ql("animationend"),
    ro = ql("animationiteration"),
    oo = ql("animationstart"),
    h0 = ql("transitionrun"),
    m0 = ql("transitionstart"),
    y0 = ql("transitioncancel"),
    so = ql("transitionend"),
    ho = new Map(),
    tc =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " "
      )
  tc.push("scrollEnd")
  function At(e, t) {
    ho.set(e, t), Hl(t, [e])
  }
  var mo = new WeakMap()
  function gt(e, t) {
    if (typeof e == "object" && e !== null) {
      var l = mo.get(e)
      return l !== void 0
        ? l
        : ((t = { value: e, source: t, stack: Dr(t) }), mo.set(e, t), t)
    }
    return { value: e, source: t, stack: Dr(t) }
  }
  var pt = [],
    ha = 0,
    lc = 0
  function hu() {
    for (var e = ha, t = (lc = ha = 0); t < e; ) {
      var l = pt[t]
      pt[t++] = null
      var a = pt[t]
      pt[t++] = null
      var n = pt[t]
      pt[t++] = null
      var u = pt[t]
      if (((pt[t++] = null), a !== null && n !== null)) {
        var f = a.pending
        f === null ? (n.next = n) : ((n.next = f.next), (f.next = n)),
          (a.pending = n)
      }
      u !== 0 && yo(l, n, u)
    }
  }
  function mu(e, t, l, a) {
    ;(pt[ha++] = e),
      (pt[ha++] = t),
      (pt[ha++] = l),
      (pt[ha++] = a),
      (lc |= a),
      (e.lanes |= a),
      (e = e.alternate),
      e !== null && (e.lanes |= a)
  }
  function ac(e, t, l, a) {
    return mu(e, t, l, a), yu(e)
  }
  function ma(e, t) {
    return mu(e, null, null, t), yu(e)
  }
  function yo(e, t, l) {
    e.lanes |= l
    var a = e.alternate
    a !== null && (a.lanes |= l)
    for (var n = !1, u = e.return; u !== null; )
      (u.childLanes |= l),
        (a = u.alternate),
        a !== null && (a.childLanes |= l),
        u.tag === 22 &&
          ((e = u.stateNode), e === null || e._visibility & 1 || (n = !0)),
        (e = u),
        (u = u.return)
    return e.tag === 3
      ? ((u = e.stateNode),
        n &&
          t !== null &&
          ((n = 31 - it(l)),
          (e = u.hiddenUpdates),
          (a = e[n]),
          a === null ? (e[n] = [t]) : a.push(t),
          (t.lane = l | 536870912)),
        u)
      : null
  }
  function yu(e) {
    if (50 < Mn) throw ((Mn = 0), (of = null), Error(r(185)))
    for (var t = e.return; t !== null; ) (e = t), (t = e.return)
    return e.tag === 3 ? e.stateNode : null
  }
  var ya = {}
  function v0(e, t, l, a) {
    ;(this.tag = e),
      (this.key = l),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = t),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = a),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null)
  }
  function ft(e, t, l, a) {
    return new v0(e, t, l, a)
  }
  function nc(e) {
    return (e = e.prototype), !(!e || !e.isReactComponent)
  }
  function Gt(e, t) {
    var l = e.alternate
    return (
      l === null
        ? ((l = ft(e.tag, t, e.key, e.mode)),
          (l.elementType = e.elementType),
          (l.type = e.type),
          (l.stateNode = e.stateNode),
          (l.alternate = e),
          (e.alternate = l))
        : ((l.pendingProps = t),
          (l.type = e.type),
          (l.flags = 0),
          (l.subtreeFlags = 0),
          (l.deletions = null)),
      (l.flags = e.flags & 65011712),
      (l.childLanes = e.childLanes),
      (l.lanes = e.lanes),
      (l.child = e.child),
      (l.memoizedProps = e.memoizedProps),
      (l.memoizedState = e.memoizedState),
      (l.updateQueue = e.updateQueue),
      (t = e.dependencies),
      (l.dependencies =
        t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (l.sibling = e.sibling),
      (l.index = e.index),
      (l.ref = e.ref),
      (l.refCleanup = e.refCleanup),
      l
    )
  }
  function vo(e, t) {
    e.flags &= 65011714
    var l = e.alternate
    return (
      l === null
        ? ((e.childLanes = 0),
          (e.lanes = t),
          (e.child = null),
          (e.subtreeFlags = 0),
          (e.memoizedProps = null),
          (e.memoizedState = null),
          (e.updateQueue = null),
          (e.dependencies = null),
          (e.stateNode = null))
        : ((e.childLanes = l.childLanes),
          (e.lanes = l.lanes),
          (e.child = l.child),
          (e.subtreeFlags = 0),
          (e.deletions = null),
          (e.memoizedProps = l.memoizedProps),
          (e.memoizedState = l.memoizedState),
          (e.updateQueue = l.updateQueue),
          (e.type = l.type),
          (t = l.dependencies),
          (e.dependencies =
            t === null
              ? null
              : { lanes: t.lanes, firstContext: t.firstContext })),
      e
    )
  }
  function vu(e, t, l, a, n, u) {
    var f = 0
    if (((a = e), typeof e == "function")) nc(e) && (f = 1)
    else if (typeof e == "string")
      f = py(e, l, $.current)
        ? 26
        : e === "html" || e === "head" || e === "body"
        ? 27
        : 5
    else
      e: switch (e) {
        case Ee:
          return (e = ft(31, l, t, n)), (e.elementType = Ee), (e.lanes = u), e
        case N:
          return wl(l.children, n, u, t)
        case Z:
          ;(f = 8), (n |= 24)
          break
        case q:
          return (
            (e = ft(12, l, t, n | 2)), (e.elementType = q), (e.lanes = u), e
          )
        case J:
          return (e = ft(13, l, t, n)), (e.elementType = J), (e.lanes = u), e
        case ve:
          return (e = ft(19, l, t, n)), (e.elementType = ve), (e.lanes = u), e
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case L:
              case Y:
                f = 10
                break e
              case K:
                f = 9
                break e
              case le:
                f = 11
                break e
              case be:
                f = 14
                break e
              case Me:
                ;(f = 16), (a = null)
                break e
            }
          ;(f = 29),
            (l = Error(r(130, e === null ? "null" : typeof e, ""))),
            (a = null)
      }
    return (
      (t = ft(f, l, t, n)), (t.elementType = e), (t.type = a), (t.lanes = u), t
    )
  }
  function wl(e, t, l, a) {
    return (e = ft(7, e, a, t)), (e.lanes = l), e
  }
  function uc(e, t, l) {
    return (e = ft(6, e, null, t)), (e.lanes = l), e
  }
  function ic(e, t, l) {
    return (
      (t = ft(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = l),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    )
  }
  var va = [],
    ga = 0,
    gu = null,
    pu = 0,
    St = [],
    bt = 0,
    Yl = null,
    Xt = 1,
    Qt = ""
  function Gl(e, t) {
    ;(va[ga++] = pu), (va[ga++] = gu), (gu = e), (pu = t)
  }
  function go(e, t, l) {
    ;(St[bt++] = Xt), (St[bt++] = Qt), (St[bt++] = Yl), (Yl = e)
    var a = Xt
    e = Qt
    var n = 32 - it(a) - 1
    ;(a &= ~(1 << n)), (l += 1)
    var u = 32 - it(t) + n
    if (30 < u) {
      var f = n - (n % 5)
      ;(u = (a & ((1 << f) - 1)).toString(32)),
        (a >>= f),
        (n -= f),
        (Xt = (1 << (32 - it(t) + n)) | (l << n) | a),
        (Qt = u + e)
    } else (Xt = (1 << u) | (l << n) | a), (Qt = e)
  }
  function cc(e) {
    e.return !== null && (Gl(e, 1), go(e, 1, 0))
  }
  function fc(e) {
    for (; e === gu; )
      (gu = va[--ga]), (va[ga] = null), (pu = va[--ga]), (va[ga] = null)
    for (; e === Yl; )
      (Yl = St[--bt]),
        (St[bt] = null),
        (Qt = St[--bt]),
        (St[bt] = null),
        (Xt = St[--bt]),
        (St[bt] = null)
  }
  var We = null,
    Oe = null,
    oe = !1,
    Xl = null,
    Ut = !1,
    rc = Error(r(519))
  function Ql(e) {
    var t = Error(r(418, ""))
    throw (un(gt(t, e)), rc)
  }
  function po(e) {
    var t = e.stateNode,
      l = e.type,
      a = e.memoizedProps
    switch (((t[Ve] = e), (t[Pe] = a), l)) {
      case "dialog":
        ie("cancel", t), ie("close", t)
        break
      case "iframe":
      case "object":
      case "embed":
        ie("load", t)
        break
      case "video":
      case "audio":
        for (l = 0; l < Cn.length; l++) ie(Cn[l], t)
        break
      case "source":
        ie("error", t)
        break
      case "img":
      case "image":
      case "link":
        ie("error", t), ie("load", t)
        break
      case "details":
        ie("toggle", t)
        break
      case "input":
        ie("invalid", t),
          Ur(
            t,
            a.value,
            a.defaultValue,
            a.checked,
            a.defaultChecked,
            a.type,
            a.name,
            !0
          ),
          nu(t)
        break
      case "select":
        ie("invalid", t)
        break
      case "textarea":
        ie("invalid", t), jr(t, a.value, a.defaultValue, a.children), nu(t)
    }
    ;(l = a.children),
      (typeof l != "string" && typeof l != "number" && typeof l != "bigint") ||
      t.textContent === "" + l ||
      a.suppressHydrationWarning === !0 ||
      Hd(t.textContent, l)
        ? (a.popover != null && (ie("beforetoggle", t), ie("toggle", t)),
          a.onScroll != null && ie("scroll", t),
          a.onScrollEnd != null && ie("scrollend", t),
          a.onClick != null && (t.onclick = Iu),
          (t = !0))
        : (t = !1),
      t || Ql(e)
  }
  function So(e) {
    for (We = e.return; We; )
      switch (We.tag) {
        case 5:
        case 13:
          Ut = !1
          return
        case 27:
        case 3:
          Ut = !0
          return
        default:
          We = We.return
      }
  }
  function an(e) {
    if (e !== We) return !1
    if (!oe) return So(e), (oe = !0), !1
    var t = e.tag,
      l
    if (
      ((l = t !== 3 && t !== 27) &&
        ((l = t === 5) &&
          ((l = e.type),
          (l =
            !(l !== "form" && l !== "button") || Of(e.type, e.memoizedProps))),
        (l = !l)),
      l && Oe && Ql(e),
      So(e),
      t === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(r(317))
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8)
            if (((l = e.data), l === "/$")) {
              if (t === 0) {
                Oe = Ot(e.nextSibling)
                break e
              }
              t--
            } else (l !== "$" && l !== "$!" && l !== "$?") || t++
          e = e.nextSibling
        }
        Oe = null
      }
    } else
      t === 27
        ? ((t = Oe), Al(e.type) ? ((e = Cf), (Cf = null), (Oe = e)) : (Oe = t))
        : (Oe = We ? Ot(e.stateNode.nextSibling) : null)
    return !0
  }
  function nn() {
    ;(Oe = We = null), (oe = !1)
  }
  function bo() {
    var e = Xl
    return (
      e !== null &&
        (at === null ? (at = e) : at.push.apply(at, e), (Xl = null)),
      e
    )
  }
  function un(e) {
    Xl === null ? (Xl = [e]) : Xl.push(e)
  }
  var oc = B(null),
    Zl = null,
    Zt = null
  function rl(e, t, l) {
    G(oc, t._currentValue), (t._currentValue = l)
  }
  function Vt(e) {
    ;(e._currentValue = oc.current), Q(oc)
  }
  function sc(e, t, l) {
    for (; e !== null; ) {
      var a = e.alternate
      if (
        ((e.childLanes & t) !== t
          ? ((e.childLanes |= t), a !== null && (a.childLanes |= t))
          : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t),
        e === l)
      )
        break
      e = e.return
    }
  }
  function dc(e, t, l, a) {
    var n = e.child
    for (n !== null && (n.return = e); n !== null; ) {
      var u = n.dependencies
      if (u !== null) {
        var f = n.child
        u = u.firstContext
        e: for (; u !== null; ) {
          var s = u
          u = n
          for (var y = 0; y < t.length; y++)
            if (s.context === t[y]) {
              ;(u.lanes |= l),
                (s = u.alternate),
                s !== null && (s.lanes |= l),
                sc(u.return, l, e),
                a || (f = null)
              break e
            }
          u = s.next
        }
      } else if (n.tag === 18) {
        if (((f = n.return), f === null)) throw Error(r(341))
        ;(f.lanes |= l),
          (u = f.alternate),
          u !== null && (u.lanes |= l),
          sc(f, l, e),
          (f = null)
      } else f = n.child
      if (f !== null) f.return = n
      else
        for (f = n; f !== null; ) {
          if (f === e) {
            f = null
            break
          }
          if (((n = f.sibling), n !== null)) {
            ;(n.return = f.return), (f = n)
            break
          }
          f = f.return
        }
      n = f
    }
  }
  function cn(e, t, l, a) {
    e = null
    for (var n = t, u = !1; n !== null; ) {
      if (!u) {
        if ((n.flags & 524288) !== 0) u = !0
        else if ((n.flags & 262144) !== 0) break
      }
      if (n.tag === 10) {
        var f = n.alternate
        if (f === null) throw Error(r(387))
        if (((f = f.memoizedProps), f !== null)) {
          var s = n.type
          ct(n.pendingProps.value, f.value) ||
            (e !== null ? e.push(s) : (e = [s]))
        }
      } else if (n === nt.current) {
        if (((f = n.alternate), f === null)) throw Error(r(387))
        f.memoizedState.memoizedState !== n.memoizedState.memoizedState &&
          (e !== null ? e.push(Bn) : (e = [Bn]))
      }
      n = n.return
    }
    e !== null && dc(t, e, l, a), (t.flags |= 262144)
  }
  function Su(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!ct(e.context._currentValue, e.memoizedValue)) return !0
      e = e.next
    }
    return !1
  }
  function Vl(e) {
    ;(Zl = e),
      (Zt = null),
      (e = e.dependencies),
      e !== null && (e.firstContext = null)
  }
  function Ke(e) {
    return Eo(Zl, e)
  }
  function bu(e, t) {
    return Zl === null && Vl(e), Eo(e, t)
  }
  function Eo(e, t) {
    var l = t._currentValue
    if (((t = { context: t, memoizedValue: l, next: null }), Zt === null)) {
      if (e === null) throw Error(r(308))
      ;(Zt = t),
        (e.dependencies = { lanes: 0, firstContext: t }),
        (e.flags |= 524288)
    } else Zt = Zt.next = t
    return l
  }
  var g0 =
      typeof AbortController < "u"
        ? AbortController
        : function () {
            var e = [],
              t = (this.signal = {
                aborted: !1,
                addEventListener: function (l, a) {
                  e.push(a)
                },
              })
            this.abort = function () {
              ;(t.aborted = !0),
                e.forEach(function (l) {
                  return l()
                })
            }
          },
    p0 = i.unstable_scheduleCallback,
    S0 = i.unstable_NormalPriority,
    je = {
      $$typeof: Y,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    }
  function hc() {
    return { controller: new g0(), data: new Map(), refCount: 0 }
  }
  function fn(e) {
    e.refCount--,
      e.refCount === 0 &&
        p0(S0, function () {
          e.controller.abort()
        })
  }
  var rn = null,
    mc = 0,
    pa = 0,
    Sa = null
  function b0(e, t) {
    if (rn === null) {
      var l = (rn = [])
      ;(mc = 0),
        (pa = gf()),
        (Sa = {
          status: "pending",
          value: void 0,
          then: function (a) {
            l.push(a)
          },
        })
    }
    return mc++, t.then(To, To), t
  }
  function To() {
    if (--mc === 0 && rn !== null) {
      Sa !== null && (Sa.status = "fulfilled")
      var e = rn
      ;(rn = null), (pa = 0), (Sa = null)
      for (var t = 0; t < e.length; t++) (0, e[t])()
    }
  }
  function E0(e, t) {
    var l = [],
      a = {
        status: "pending",
        value: null,
        reason: null,
        then: function (n) {
          l.push(n)
        },
      }
    return (
      e.then(
        function () {
          ;(a.status = "fulfilled"), (a.value = t)
          for (var n = 0; n < l.length; n++) (0, l[n])(t)
        },
        function (n) {
          for (a.status = "rejected", a.reason = n, n = 0; n < l.length; n++)
            (0, l[n])(void 0)
        }
      ),
      a
    )
  }
  var xo = C.S
  C.S = function (e, t) {
    typeof t == "object" &&
      t !== null &&
      typeof t.then == "function" &&
      b0(e, t),
      xo !== null && xo(e, t)
  }
  var Kl = B(null)
  function yc() {
    var e = Kl.current
    return e !== null ? e : Se.pooledCache
  }
  function Eu(e, t) {
    t === null ? G(Kl, Kl.current) : G(Kl, t.pool)
  }
  function Ao() {
    var e = yc()
    return e === null ? null : { parent: je._currentValue, pool: e }
  }
  var on = Error(r(460)),
    _o = Error(r(474)),
    Tu = Error(r(542)),
    vc = { then: function () {} }
  function Oo(e) {
    return (e = e.status), e === "fulfilled" || e === "rejected"
  }
  function xu() {}
  function Ro(e, t, l) {
    switch (
      ((l = e[l]),
      l === void 0 ? e.push(t) : l !== t && (t.then(xu, xu), (t = l)),
      t.status)
    ) {
      case "fulfilled":
        return t.value
      case "rejected":
        throw ((e = t.reason), Do(e), e)
      default:
        if (typeof t.status == "string") t.then(xu, xu)
        else {
          if (((e = Se), e !== null && 100 < e.shellSuspendCounter))
            throw Error(r(482))
          ;(e = t),
            (e.status = "pending"),
            e.then(
              function (a) {
                if (t.status === "pending") {
                  var n = t
                  ;(n.status = "fulfilled"), (n.value = a)
                }
              },
              function (a) {
                if (t.status === "pending") {
                  var n = t
                  ;(n.status = "rejected"), (n.reason = a)
                }
              }
            )
        }
        switch (t.status) {
          case "fulfilled":
            return t.value
          case "rejected":
            throw ((e = t.reason), Do(e), e)
        }
        throw ((sn = t), on)
    }
  }
  var sn = null
  function Mo() {
    if (sn === null) throw Error(r(459))
    var e = sn
    return (sn = null), e
  }
  function Do(e) {
    if (e === on || e === Tu) throw Error(r(483))
  }
  var ol = !1
  function gc(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    }
  }
  function pc(e, t) {
    ;(e = e.updateQueue),
      t.updateQueue === e &&
        (t.updateQueue = {
          baseState: e.baseState,
          firstBaseUpdate: e.firstBaseUpdate,
          lastBaseUpdate: e.lastBaseUpdate,
          shared: e.shared,
          callbacks: null,
        })
  }
  function sl(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null }
  }
  function dl(e, t, l) {
    var a = e.updateQueue
    if (a === null) return null
    if (((a = a.shared), (se & 2) !== 0)) {
      var n = a.pending
      return (
        n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
        (a.pending = t),
        (t = yu(e)),
        yo(e, null, l),
        t
      )
    }
    return mu(e, a, t, l), yu(e)
  }
  function dn(e, t, l) {
    if (
      ((t = t.updateQueue), t !== null && ((t = t.shared), (l & 4194048) !== 0))
    ) {
      var a = t.lanes
      ;(a &= e.pendingLanes), (l |= a), (t.lanes = l), Er(e, l)
    }
  }
  function Sc(e, t) {
    var l = e.updateQueue,
      a = e.alternate
    if (a !== null && ((a = a.updateQueue), l === a)) {
      var n = null,
        u = null
      if (((l = l.firstBaseUpdate), l !== null)) {
        do {
          var f = {
            lane: l.lane,
            tag: l.tag,
            payload: l.payload,
            callback: null,
            next: null,
          }
          u === null ? (n = u = f) : (u = u.next = f), (l = l.next)
        } while (l !== null)
        u === null ? (n = u = t) : (u = u.next = t)
      } else n = u = t
      ;(l = {
        baseState: a.baseState,
        firstBaseUpdate: n,
        lastBaseUpdate: u,
        shared: a.shared,
        callbacks: a.callbacks,
      }),
        (e.updateQueue = l)
      return
    }
    ;(e = l.lastBaseUpdate),
      e === null ? (l.firstBaseUpdate = t) : (e.next = t),
      (l.lastBaseUpdate = t)
  }
  var bc = !1
  function hn() {
    if (bc) {
      var e = Sa
      if (e !== null) throw e
    }
  }
  function mn(e, t, l, a) {
    bc = !1
    var n = e.updateQueue
    ol = !1
    var u = n.firstBaseUpdate,
      f = n.lastBaseUpdate,
      s = n.shared.pending
    if (s !== null) {
      n.shared.pending = null
      var y = s,
        A = y.next
      ;(y.next = null), f === null ? (u = A) : (f.next = A), (f = y)
      var D = e.alternate
      D !== null &&
        ((D = D.updateQueue),
        (s = D.lastBaseUpdate),
        s !== f &&
          (s === null ? (D.firstBaseUpdate = A) : (s.next = A),
          (D.lastBaseUpdate = y)))
    }
    if (u !== null) {
      var j = n.baseState
      ;(f = 0), (D = A = y = null), (s = u)
      do {
        var O = s.lane & -536870913,
          M = O !== s.lane
        if (M ? (ce & O) === O : (a & O) === O) {
          O !== 0 && O === pa && (bc = !0),
            D !== null &&
              (D = D.next =
                {
                  lane: 0,
                  tag: s.tag,
                  payload: s.payload,
                  callback: null,
                  next: null,
                })
          e: {
            var P = e,
              W = s
            O = t
            var ye = l
            switch (W.tag) {
              case 1:
                if (((P = W.payload), typeof P == "function")) {
                  j = P.call(ye, j, O)
                  break e
                }
                j = P
                break e
              case 3:
                P.flags = (P.flags & -65537) | 128
              case 0:
                if (
                  ((P = W.payload),
                  (O = typeof P == "function" ? P.call(ye, j, O) : P),
                  O == null)
                )
                  break e
                j = _({}, j, O)
                break e
              case 2:
                ol = !0
            }
          }
          ;(O = s.callback),
            O !== null &&
              ((e.flags |= 64),
              M && (e.flags |= 8192),
              (M = n.callbacks),
              M === null ? (n.callbacks = [O]) : M.push(O))
        } else
          (M = {
            lane: O,
            tag: s.tag,
            payload: s.payload,
            callback: s.callback,
            next: null,
          }),
            D === null ? ((A = D = M), (y = j)) : (D = D.next = M),
            (f |= O)
        if (((s = s.next), s === null)) {
          if (((s = n.shared.pending), s === null)) break
          ;(M = s),
            (s = M.next),
            (M.next = null),
            (n.lastBaseUpdate = M),
            (n.shared.pending = null)
        }
      } while (!0)
      D === null && (y = j),
        (n.baseState = y),
        (n.firstBaseUpdate = A),
        (n.lastBaseUpdate = D),
        u === null && (n.shared.lanes = 0),
        (bl |= f),
        (e.lanes = f),
        (e.memoizedState = j)
    }
  }
  function Co(e, t) {
    if (typeof e != "function") throw Error(r(191, e))
    e.call(t)
  }
  function zo(e, t) {
    var l = e.callbacks
    if (l !== null)
      for (e.callbacks = null, e = 0; e < l.length; e++) Co(l[e], t)
  }
  var ba = B(null),
    Au = B(0)
  function Uo(e, t) {
    ;(e = It), G(Au, e), G(ba, t), (It = e | t.baseLanes)
  }
  function Ec() {
    G(Au, It), G(ba, ba.current)
  }
  function Tc() {
    ;(It = Au.current), Q(ba), Q(Au)
  }
  var hl = 0,
    ae = null,
    he = null,
    Ue = null,
    _u = !1,
    Ea = !1,
    Jl = !1,
    Ou = 0,
    yn = 0,
    Ta = null,
    T0 = 0
  function De() {
    throw Error(r(321))
  }
  function xc(e, t) {
    if (t === null) return !1
    for (var l = 0; l < t.length && l < e.length; l++)
      if (!ct(e[l], t[l])) return !1
    return !0
  }
  function Ac(e, t, l, a, n, u) {
    return (
      (hl = u),
      (ae = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (C.H = e === null || e.memoizedState === null ? ys : vs),
      (Jl = !1),
      (u = l(a, n)),
      (Jl = !1),
      Ea && (u = jo(t, l, a, n)),
      No(e),
      u
    )
  }
  function No(e) {
    C.H = Uu
    var t = he !== null && he.next !== null
    if (((hl = 0), (Ue = he = ae = null), (_u = !1), (yn = 0), (Ta = null), t))
      throw Error(r(300))
    e === null || Le || ((e = e.dependencies), e !== null && Su(e) && (Le = !0))
  }
  function jo(e, t, l, a) {
    ae = e
    var n = 0
    do {
      if ((Ea && (Ta = null), (yn = 0), (Ea = !1), 25 <= n)) throw Error(r(301))
      if (((n += 1), (Ue = he = null), e.updateQueue != null)) {
        var u = e.updateQueue
        ;(u.lastEffect = null),
          (u.events = null),
          (u.stores = null),
          u.memoCache != null && (u.memoCache.index = 0)
      }
      ;(C.H = D0), (u = t(l, a))
    } while (Ea)
    return u
  }
  function x0() {
    var e = C.H,
      t = e.useState()[0]
    return (
      (t = typeof t.then == "function" ? vn(t) : t),
      (e = e.useState()[0]),
      (he !== null ? he.memoizedState : null) !== e && (ae.flags |= 1024),
      t
    )
  }
  function _c() {
    var e = Ou !== 0
    return (Ou = 0), e
  }
  function Oc(e, t, l) {
    ;(t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~l)
  }
  function Rc(e) {
    if (_u) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue
        t !== null && (t.pending = null), (e = e.next)
      }
      _u = !1
    }
    ;(hl = 0), (Ue = he = ae = null), (Ea = !1), (yn = Ou = 0), (Ta = null)
  }
  function tt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    }
    return Ue === null ? (ae.memoizedState = Ue = e) : (Ue = Ue.next = e), Ue
  }
  function Ne() {
    if (he === null) {
      var e = ae.alternate
      e = e !== null ? e.memoizedState : null
    } else e = he.next
    var t = Ue === null ? ae.memoizedState : Ue.next
    if (t !== null) (Ue = t), (he = e)
    else {
      if (e === null)
        throw ae.alternate === null ? Error(r(467)) : Error(r(310))
      ;(he = e),
        (e = {
          memoizedState: he.memoizedState,
          baseState: he.baseState,
          baseQueue: he.baseQueue,
          queue: he.queue,
          next: null,
        }),
        Ue === null ? (ae.memoizedState = Ue = e) : (Ue = Ue.next = e)
    }
    return Ue
  }
  function Mc() {
    return { lastEffect: null, events: null, stores: null, memoCache: null }
  }
  function vn(e) {
    var t = yn
    return (
      (yn += 1),
      Ta === null && (Ta = []),
      (e = Ro(Ta, e, t)),
      (t = ae),
      (Ue === null ? t.memoizedState : Ue.next) === null &&
        ((t = t.alternate),
        (C.H = t === null || t.memoizedState === null ? ys : vs)),
      e
    )
  }
  function Ru(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return vn(e)
      if (e.$$typeof === Y) return Ke(e)
    }
    throw Error(r(438, String(e)))
  }
  function Dc(e) {
    var t = null,
      l = ae.updateQueue
    if ((l !== null && (t = l.memoCache), t == null)) {
      var a = ae.alternate
      a !== null &&
        ((a = a.updateQueue),
        a !== null &&
          ((a = a.memoCache),
          a != null &&
            (t = {
              data: a.data.map(function (n) {
                return n.slice()
              }),
              index: 0,
            })))
    }
    if (
      (t == null && (t = { data: [], index: 0 }),
      l === null && ((l = Mc()), (ae.updateQueue = l)),
      (l.memoCache = t),
      (l = t.data[t.index]),
      l === void 0)
    )
      for (l = t.data[t.index] = Array(e), a = 0; a < e; a++) l[a] = $e
    return t.index++, l
  }
  function Kt(e, t) {
    return typeof t == "function" ? t(e) : t
  }
  function Mu(e) {
    var t = Ne()
    return Cc(t, he, e)
  }
  function Cc(e, t, l) {
    var a = e.queue
    if (a === null) throw Error(r(311))
    a.lastRenderedReducer = l
    var n = e.baseQueue,
      u = a.pending
    if (u !== null) {
      if (n !== null) {
        var f = n.next
        ;(n.next = u.next), (u.next = f)
      }
      ;(t.baseQueue = n = u), (a.pending = null)
    }
    if (((u = e.baseState), n === null)) e.memoizedState = u
    else {
      t = n.next
      var s = (f = null),
        y = null,
        A = t,
        D = !1
      do {
        var j = A.lane & -536870913
        if (j !== A.lane ? (ce & j) === j : (hl & j) === j) {
          var O = A.revertLane
          if (O === 0)
            y !== null &&
              (y = y.next =
                {
                  lane: 0,
                  revertLane: 0,
                  action: A.action,
                  hasEagerState: A.hasEagerState,
                  eagerState: A.eagerState,
                  next: null,
                }),
              j === pa && (D = !0)
          else if ((hl & O) === O) {
            ;(A = A.next), O === pa && (D = !0)
            continue
          } else
            (j = {
              lane: 0,
              revertLane: A.revertLane,
              action: A.action,
              hasEagerState: A.hasEagerState,
              eagerState: A.eagerState,
              next: null,
            }),
              y === null ? ((s = y = j), (f = u)) : (y = y.next = j),
              (ae.lanes |= O),
              (bl |= O)
          ;(j = A.action),
            Jl && l(u, j),
            (u = A.hasEagerState ? A.eagerState : l(u, j))
        } else
          (O = {
            lane: j,
            revertLane: A.revertLane,
            action: A.action,
            hasEagerState: A.hasEagerState,
            eagerState: A.eagerState,
            next: null,
          }),
            y === null ? ((s = y = O), (f = u)) : (y = y.next = O),
            (ae.lanes |= j),
            (bl |= j)
        A = A.next
      } while (A !== null && A !== t)
      if (
        (y === null ? (f = u) : (y.next = s),
        !ct(u, e.memoizedState) && ((Le = !0), D && ((l = Sa), l !== null)))
      )
        throw l
      ;(e.memoizedState = u),
        (e.baseState = f),
        (e.baseQueue = y),
        (a.lastRenderedState = u)
    }
    return n === null && (a.lanes = 0), [e.memoizedState, a.dispatch]
  }
  function zc(e) {
    var t = Ne(),
      l = t.queue
    if (l === null) throw Error(r(311))
    l.lastRenderedReducer = e
    var a = l.dispatch,
      n = l.pending,
      u = t.memoizedState
    if (n !== null) {
      l.pending = null
      var f = (n = n.next)
      do (u = e(u, f.action)), (f = f.next)
      while (f !== n)
      ct(u, t.memoizedState) || (Le = !0),
        (t.memoizedState = u),
        t.baseQueue === null && (t.baseState = u),
        (l.lastRenderedState = u)
    }
    return [u, a]
  }
  function Ho(e, t, l) {
    var a = ae,
      n = Ne(),
      u = oe
    if (u) {
      if (l === void 0) throw Error(r(407))
      l = l()
    } else l = t()
    var f = !ct((he || n).memoizedState, l)
    f && ((n.memoizedState = l), (Le = !0)), (n = n.queue)
    var s = qo.bind(null, a, n, e)
    if (
      (gn(2048, 8, s, [e]),
      n.getSnapshot !== t || f || (Ue !== null && Ue.memoizedState.tag & 1))
    ) {
      if (
        ((a.flags |= 2048),
        xa(9, Du(), Lo.bind(null, a, n, l, t), null),
        Se === null)
      )
        throw Error(r(349))
      u || (hl & 124) !== 0 || Bo(a, t, l)
    }
    return l
  }
  function Bo(e, t, l) {
    ;(e.flags |= 16384),
      (e = { getSnapshot: t, value: l }),
      (t = ae.updateQueue),
      t === null
        ? ((t = Mc()), (ae.updateQueue = t), (t.stores = [e]))
        : ((l = t.stores), l === null ? (t.stores = [e]) : l.push(e))
  }
  function Lo(e, t, l, a) {
    ;(t.value = l), (t.getSnapshot = a), wo(t) && Yo(e)
  }
  function qo(e, t, l) {
    return l(function () {
      wo(t) && Yo(e)
    })
  }
  function wo(e) {
    var t = e.getSnapshot
    e = e.value
    try {
      var l = t()
      return !ct(e, l)
    } catch {
      return !0
    }
  }
  function Yo(e) {
    var t = ma(e, 2)
    t !== null && ht(t, e, 2)
  }
  function Uc(e) {
    var t = tt()
    if (typeof e == "function") {
      var l = e
      if (((e = l()), Jl)) {
        il(!0)
        try {
          l()
        } finally {
          il(!1)
        }
      }
    }
    return (
      (t.memoizedState = t.baseState = e),
      (t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Kt,
        lastRenderedState: e,
      }),
      t
    )
  }
  function Go(e, t, l, a) {
    return (e.baseState = l), Cc(e, he, typeof a == "function" ? a : Kt)
  }
  function A0(e, t, l, a, n) {
    if (zu(e)) throw Error(r(485))
    if (((e = t.action), e !== null)) {
      var u = {
        payload: n,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (f) {
          u.listeners.push(f)
        },
      }
      C.T !== null ? l(!0) : (u.isTransition = !1),
        a(u),
        (l = t.pending),
        l === null
          ? ((u.next = t.pending = u), Xo(t, u))
          : ((u.next = l.next), (t.pending = l.next = u))
    }
  }
  function Xo(e, t) {
    var l = t.action,
      a = t.payload,
      n = e.state
    if (t.isTransition) {
      var u = C.T,
        f = {}
      C.T = f
      try {
        var s = l(n, a),
          y = C.S
        y !== null && y(f, s), Qo(e, t, s)
      } catch (A) {
        Nc(e, t, A)
      } finally {
        C.T = u
      }
    } else
      try {
        ;(u = l(n, a)), Qo(e, t, u)
      } catch (A) {
        Nc(e, t, A)
      }
  }
  function Qo(e, t, l) {
    l !== null && typeof l == "object" && typeof l.then == "function"
      ? l.then(
          function (a) {
            Zo(e, t, a)
          },
          function (a) {
            return Nc(e, t, a)
          }
        )
      : Zo(e, t, l)
  }
  function Zo(e, t, l) {
    ;(t.status = "fulfilled"),
      (t.value = l),
      Vo(t),
      (e.state = l),
      (t = e.pending),
      t !== null &&
        ((l = t.next),
        l === t ? (e.pending = null) : ((l = l.next), (t.next = l), Xo(e, l)))
  }
  function Nc(e, t, l) {
    var a = e.pending
    if (((e.pending = null), a !== null)) {
      a = a.next
      do (t.status = "rejected"), (t.reason = l), Vo(t), (t = t.next)
      while (t !== a)
    }
    e.action = null
  }
  function Vo(e) {
    e = e.listeners
    for (var t = 0; t < e.length; t++) (0, e[t])()
  }
  function Ko(e, t) {
    return t
  }
  function Jo(e, t) {
    if (oe) {
      var l = Se.formState
      if (l !== null) {
        e: {
          var a = ae
          if (oe) {
            if (Oe) {
              t: {
                for (var n = Oe, u = Ut; n.nodeType !== 8; ) {
                  if (!u) {
                    n = null
                    break t
                  }
                  if (((n = Ot(n.nextSibling)), n === null)) {
                    n = null
                    break t
                  }
                }
                ;(u = n.data), (n = u === "F!" || u === "F" ? n : null)
              }
              if (n) {
                ;(Oe = Ot(n.nextSibling)), (a = n.data === "F!")
                break e
              }
            }
            Ql(a)
          }
          a = !1
        }
        a && (t = l[0])
      }
    }
    return (
      (l = tt()),
      (l.memoizedState = l.baseState = t),
      (a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ko,
        lastRenderedState: t,
      }),
      (l.queue = a),
      (l = ds.bind(null, ae, a)),
      (a.dispatch = l),
      (a = Uc(!1)),
      (u = qc.bind(null, ae, !1, a.queue)),
      (a = tt()),
      (n = { state: t, dispatch: null, action: e, pending: null }),
      (a.queue = n),
      (l = A0.bind(null, ae, n, u, l)),
      (n.dispatch = l),
      (a.memoizedState = e),
      [t, l, !1]
    )
  }
  function ko(e) {
    var t = Ne()
    return $o(t, he, e)
  }
  function $o(e, t, l) {
    if (
      ((t = Cc(e, t, Ko)[0]),
      (e = Mu(Kt)[0]),
      typeof t == "object" && t !== null && typeof t.then == "function")
    )
      try {
        var a = vn(t)
      } catch (f) {
        throw f === on ? Tu : f
      }
    else a = t
    t = Ne()
    var n = t.queue,
      u = n.dispatch
    return (
      l !== t.memoizedState &&
        ((ae.flags |= 2048), xa(9, Du(), _0.bind(null, n, l), null)),
      [a, u, e]
    )
  }
  function _0(e, t) {
    e.action = t
  }
  function Wo(e) {
    var t = Ne(),
      l = he
    if (l !== null) return $o(t, l, e)
    Ne(), (t = t.memoizedState), (l = Ne())
    var a = l.queue.dispatch
    return (l.memoizedState = e), [t, a, !1]
  }
  function xa(e, t, l, a) {
    return (
      (e = { tag: e, create: l, deps: a, inst: t, next: null }),
      (t = ae.updateQueue),
      t === null && ((t = Mc()), (ae.updateQueue = t)),
      (l = t.lastEffect),
      l === null
        ? (t.lastEffect = e.next = e)
        : ((a = l.next), (l.next = e), (e.next = a), (t.lastEffect = e)),
      e
    )
  }
  function Du() {
    return { destroy: void 0, resource: void 0 }
  }
  function Fo() {
    return Ne().memoizedState
  }
  function Cu(e, t, l, a) {
    var n = tt()
    ;(a = a === void 0 ? null : a),
      (ae.flags |= e),
      (n.memoizedState = xa(1 | t, Du(), l, a))
  }
  function gn(e, t, l, a) {
    var n = Ne()
    a = a === void 0 ? null : a
    var u = n.memoizedState.inst
    he !== null && a !== null && xc(a, he.memoizedState.deps)
      ? (n.memoizedState = xa(t, u, l, a))
      : ((ae.flags |= e), (n.memoizedState = xa(1 | t, u, l, a)))
  }
  function Io(e, t) {
    Cu(8390656, 8, e, t)
  }
  function Po(e, t) {
    gn(2048, 8, e, t)
  }
  function es(e, t) {
    return gn(4, 2, e, t)
  }
  function ts(e, t) {
    return gn(4, 4, e, t)
  }
  function ls(e, t) {
    if (typeof t == "function") {
      e = e()
      var l = t(e)
      return function () {
        typeof l == "function" ? l() : t(null)
      }
    }
    if (t != null)
      return (
        (e = e()),
        (t.current = e),
        function () {
          t.current = null
        }
      )
  }
  function as(e, t, l) {
    ;(l = l != null ? l.concat([e]) : null), gn(4, 4, ls.bind(null, t, e), l)
  }
  function jc() {}
  function ns(e, t) {
    var l = Ne()
    t = t === void 0 ? null : t
    var a = l.memoizedState
    return t !== null && xc(t, a[1]) ? a[0] : ((l.memoizedState = [e, t]), e)
  }
  function us(e, t) {
    var l = Ne()
    t = t === void 0 ? null : t
    var a = l.memoizedState
    if (t !== null && xc(t, a[1])) return a[0]
    if (((a = e()), Jl)) {
      il(!0)
      try {
        e()
      } finally {
        il(!1)
      }
    }
    return (l.memoizedState = [a, t]), a
  }
  function Hc(e, t, l) {
    return l === void 0 || (hl & 1073741824) !== 0
      ? (e.memoizedState = t)
      : ((e.memoizedState = l), (e = fd()), (ae.lanes |= e), (bl |= e), l)
  }
  function is(e, t, l, a) {
    return ct(l, t)
      ? l
      : ba.current !== null
      ? ((e = Hc(e, l, a)), ct(e, t) || (Le = !0), e)
      : (hl & 42) === 0
      ? ((Le = !0), (e.memoizedState = l))
      : ((e = fd()), (ae.lanes |= e), (bl |= e), t)
  }
  function cs(e, t, l, a, n) {
    var u = X.p
    X.p = u !== 0 && 8 > u ? u : 8
    var f = C.T,
      s = {}
    ;(C.T = s), qc(e, !1, t, l)
    try {
      var y = n(),
        A = C.S
      if (
        (A !== null && A(s, y),
        y !== null && typeof y == "object" && typeof y.then == "function")
      ) {
        var D = E0(y, a)
        pn(e, t, D, dt(e))
      } else pn(e, t, a, dt(e))
    } catch (j) {
      pn(e, t, { then: function () {}, status: "rejected", reason: j }, dt())
    } finally {
      ;(X.p = u), (C.T = f)
    }
  }
  function O0() {}
  function Bc(e, t, l, a) {
    if (e.tag !== 5) throw Error(r(476))
    var n = fs(e).queue
    cs(
      e,
      n,
      t,
      I,
      l === null
        ? O0
        : function () {
            return rs(e), l(a)
          }
    )
  }
  function fs(e) {
    var t = e.memoizedState
    if (t !== null) return t
    t = {
      memoizedState: I,
      baseState: I,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Kt,
        lastRenderedState: I,
      },
      next: null,
    }
    var l = {}
    return (
      (t.next = {
        memoizedState: l,
        baseState: l,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Kt,
          lastRenderedState: l,
        },
        next: null,
      }),
      (e.memoizedState = t),
      (e = e.alternate),
      e !== null && (e.memoizedState = t),
      t
    )
  }
  function rs(e) {
    var t = fs(e).next.queue
    pn(e, t, {}, dt())
  }
  function Lc() {
    return Ke(Bn)
  }
  function os() {
    return Ne().memoizedState
  }
  function ss() {
    return Ne().memoizedState
  }
  function R0(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var l = dt()
          e = sl(l)
          var a = dl(t, e, l)
          a !== null && (ht(a, t, l), dn(a, t, l)),
            (t = { cache: hc() }),
            (e.payload = t)
          return
      }
      t = t.return
    }
  }
  function M0(e, t, l) {
    var a = dt()
    ;(l = {
      lane: a,
      revertLane: 0,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      zu(e)
        ? hs(t, l)
        : ((l = ac(e, t, l, a)), l !== null && (ht(l, e, a), ms(l, t, a)))
  }
  function ds(e, t, l) {
    var a = dt()
    pn(e, t, l, a)
  }
  function pn(e, t, l, a) {
    var n = {
      lane: a,
      revertLane: 0,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }
    if (zu(e)) hs(t, n)
    else {
      var u = e.alternate
      if (
        e.lanes === 0 &&
        (u === null || u.lanes === 0) &&
        ((u = t.lastRenderedReducer), u !== null)
      )
        try {
          var f = t.lastRenderedState,
            s = u(f, l)
          if (((n.hasEagerState = !0), (n.eagerState = s), ct(s, f)))
            return mu(e, t, n, 0), Se === null && hu(), !1
        } catch {
        } finally {
        }
      if (((l = ac(e, t, n, a)), l !== null))
        return ht(l, e, a), ms(l, t, a), !0
    }
    return !1
  }
  function qc(e, t, l, a) {
    if (
      ((a = {
        lane: 2,
        revertLane: gf(),
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      zu(e))
    ) {
      if (t) throw Error(r(479))
    } else (t = ac(e, l, a, 2)), t !== null && ht(t, e, 2)
  }
  function zu(e) {
    var t = e.alternate
    return e === ae || (t !== null && t === ae)
  }
  function hs(e, t) {
    Ea = _u = !0
    var l = e.pending
    l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)),
      (e.pending = t)
  }
  function ms(e, t, l) {
    if ((l & 4194048) !== 0) {
      var a = t.lanes
      ;(a &= e.pendingLanes), (l |= a), (t.lanes = l), Er(e, l)
    }
  }
  var Uu = {
      readContext: Ke,
      use: Ru,
      useCallback: De,
      useContext: De,
      useEffect: De,
      useImperativeHandle: De,
      useLayoutEffect: De,
      useInsertionEffect: De,
      useMemo: De,
      useReducer: De,
      useRef: De,
      useState: De,
      useDebugValue: De,
      useDeferredValue: De,
      useTransition: De,
      useSyncExternalStore: De,
      useId: De,
      useHostTransitionStatus: De,
      useFormState: De,
      useActionState: De,
      useOptimistic: De,
      useMemoCache: De,
      useCacheRefresh: De,
    },
    ys = {
      readContext: Ke,
      use: Ru,
      useCallback: function (e, t) {
        return (tt().memoizedState = [e, t === void 0 ? null : t]), e
      },
      useContext: Ke,
      useEffect: Io,
      useImperativeHandle: function (e, t, l) {
        ;(l = l != null ? l.concat([e]) : null),
          Cu(4194308, 4, ls.bind(null, t, e), l)
      },
      useLayoutEffect: function (e, t) {
        return Cu(4194308, 4, e, t)
      },
      useInsertionEffect: function (e, t) {
        Cu(4, 2, e, t)
      },
      useMemo: function (e, t) {
        var l = tt()
        t = t === void 0 ? null : t
        var a = e()
        if (Jl) {
          il(!0)
          try {
            e()
          } finally {
            il(!1)
          }
        }
        return (l.memoizedState = [a, t]), a
      },
      useReducer: function (e, t, l) {
        var a = tt()
        if (l !== void 0) {
          var n = l(t)
          if (Jl) {
            il(!0)
            try {
              l(t)
            } finally {
              il(!1)
            }
          }
        } else n = t
        return (
          (a.memoizedState = a.baseState = n),
          (e = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: n,
          }),
          (a.queue = e),
          (e = e.dispatch = M0.bind(null, ae, e)),
          [a.memoizedState, e]
        )
      },
      useRef: function (e) {
        var t = tt()
        return (e = { current: e }), (t.memoizedState = e)
      },
      useState: function (e) {
        e = Uc(e)
        var t = e.queue,
          l = ds.bind(null, ae, t)
        return (t.dispatch = l), [e.memoizedState, l]
      },
      useDebugValue: jc,
      useDeferredValue: function (e, t) {
        var l = tt()
        return Hc(l, e, t)
      },
      useTransition: function () {
        var e = Uc(!1)
        return (
          (e = cs.bind(null, ae, e.queue, !0, !1)),
          (tt().memoizedState = e),
          [!1, e]
        )
      },
      useSyncExternalStore: function (e, t, l) {
        var a = ae,
          n = tt()
        if (oe) {
          if (l === void 0) throw Error(r(407))
          l = l()
        } else {
          if (((l = t()), Se === null)) throw Error(r(349))
          ;(ce & 124) !== 0 || Bo(a, t, l)
        }
        n.memoizedState = l
        var u = { value: l, getSnapshot: t }
        return (
          (n.queue = u),
          Io(qo.bind(null, a, u, e), [e]),
          (a.flags |= 2048),
          xa(9, Du(), Lo.bind(null, a, u, l, t), null),
          l
        )
      },
      useId: function () {
        var e = tt(),
          t = Se.identifierPrefix
        if (oe) {
          var l = Qt,
            a = Xt
          ;(l = (a & ~(1 << (32 - it(a) - 1))).toString(32) + l),
            (t = "«" + t + "R" + l),
            (l = Ou++),
            0 < l && (t += "H" + l.toString(32)),
            (t += "»")
        } else (l = T0++), (t = "«" + t + "r" + l.toString(32) + "»")
        return (e.memoizedState = t)
      },
      useHostTransitionStatus: Lc,
      useFormState: Jo,
      useActionState: Jo,
      useOptimistic: function (e) {
        var t = tt()
        t.memoizedState = t.baseState = e
        var l = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        }
        return (
          (t.queue = l),
          (t = qc.bind(null, ae, !0, l)),
          (l.dispatch = t),
          [e, t]
        )
      },
      useMemoCache: Dc,
      useCacheRefresh: function () {
        return (tt().memoizedState = R0.bind(null, ae))
      },
    },
    vs = {
      readContext: Ke,
      use: Ru,
      useCallback: ns,
      useContext: Ke,
      useEffect: Po,
      useImperativeHandle: as,
      useInsertionEffect: es,
      useLayoutEffect: ts,
      useMemo: us,
      useReducer: Mu,
      useRef: Fo,
      useState: function () {
        return Mu(Kt)
      },
      useDebugValue: jc,
      useDeferredValue: function (e, t) {
        var l = Ne()
        return is(l, he.memoizedState, e, t)
      },
      useTransition: function () {
        var e = Mu(Kt)[0],
          t = Ne().memoizedState
        return [typeof e == "boolean" ? e : vn(e), t]
      },
      useSyncExternalStore: Ho,
      useId: os,
      useHostTransitionStatus: Lc,
      useFormState: ko,
      useActionState: ko,
      useOptimistic: function (e, t) {
        var l = Ne()
        return Go(l, he, e, t)
      },
      useMemoCache: Dc,
      useCacheRefresh: ss,
    },
    D0 = {
      readContext: Ke,
      use: Ru,
      useCallback: ns,
      useContext: Ke,
      useEffect: Po,
      useImperativeHandle: as,
      useInsertionEffect: es,
      useLayoutEffect: ts,
      useMemo: us,
      useReducer: zc,
      useRef: Fo,
      useState: function () {
        return zc(Kt)
      },
      useDebugValue: jc,
      useDeferredValue: function (e, t) {
        var l = Ne()
        return he === null ? Hc(l, e, t) : is(l, he.memoizedState, e, t)
      },
      useTransition: function () {
        var e = zc(Kt)[0],
          t = Ne().memoizedState
        return [typeof e == "boolean" ? e : vn(e), t]
      },
      useSyncExternalStore: Ho,
      useId: os,
      useHostTransitionStatus: Lc,
      useFormState: Wo,
      useActionState: Wo,
      useOptimistic: function (e, t) {
        var l = Ne()
        return he !== null
          ? Go(l, he, e, t)
          : ((l.baseState = e), [e, l.queue.dispatch])
      },
      useMemoCache: Dc,
      useCacheRefresh: ss,
    },
    Aa = null,
    Sn = 0
  function Nu(e) {
    var t = Sn
    return (Sn += 1), Aa === null && (Aa = []), Ro(Aa, e, t)
  }
  function bn(e, t) {
    ;(t = t.props.ref), (e.ref = t !== void 0 ? t : null)
  }
  function ju(e, t) {
    throw t.$$typeof === H
      ? Error(r(525))
      : ((e = Object.prototype.toString.call(t)),
        Error(
          r(
            31,
            e === "[object Object]"
              ? "object with keys {" + Object.keys(t).join(", ") + "}"
              : e
          )
        ))
  }
  function gs(e) {
    var t = e._init
    return t(e._payload)
  }
  function ps(e) {
    function t(E, p) {
      if (e) {
        var x = E.deletions
        x === null ? ((E.deletions = [p]), (E.flags |= 16)) : x.push(p)
      }
    }
    function l(E, p) {
      if (!e) return null
      for (; p !== null; ) t(E, p), (p = p.sibling)
      return null
    }
    function a(E) {
      for (var p = new Map(); E !== null; )
        E.key !== null ? p.set(E.key, E) : p.set(E.index, E), (E = E.sibling)
      return p
    }
    function n(E, p) {
      return (E = Gt(E, p)), (E.index = 0), (E.sibling = null), E
    }
    function u(E, p, x) {
      return (
        (E.index = x),
        e
          ? ((x = E.alternate),
            x !== null
              ? ((x = x.index), x < p ? ((E.flags |= 67108866), p) : x)
              : ((E.flags |= 67108866), p))
          : ((E.flags |= 1048576), p)
      )
    }
    function f(E) {
      return e && E.alternate === null && (E.flags |= 67108866), E
    }
    function s(E, p, x, U) {
      return p === null || p.tag !== 6
        ? ((p = uc(x, E.mode, U)), (p.return = E), p)
        : ((p = n(p, x)), (p.return = E), p)
    }
    function y(E, p, x, U) {
      var V = x.type
      return V === N
        ? D(E, p, x.props.children, U, x.key)
        : p !== null &&
          (p.elementType === V ||
            (typeof V == "object" &&
              V !== null &&
              V.$$typeof === Me &&
              gs(V) === p.type))
        ? ((p = n(p, x.props)), bn(p, x), (p.return = E), p)
        : ((p = vu(x.type, x.key, x.props, null, E.mode, U)),
          bn(p, x),
          (p.return = E),
          p)
    }
    function A(E, p, x, U) {
      return p === null ||
        p.tag !== 4 ||
        p.stateNode.containerInfo !== x.containerInfo ||
        p.stateNode.implementation !== x.implementation
        ? ((p = ic(x, E.mode, U)), (p.return = E), p)
        : ((p = n(p, x.children || [])), (p.return = E), p)
    }
    function D(E, p, x, U, V) {
      return p === null || p.tag !== 7
        ? ((p = wl(x, E.mode, U, V)), (p.return = E), p)
        : ((p = n(p, x)), (p.return = E), p)
    }
    function j(E, p, x) {
      if (
        (typeof p == "string" && p !== "") ||
        typeof p == "number" ||
        typeof p == "bigint"
      )
        return (p = uc("" + p, E.mode, x)), (p.return = E), p
      if (typeof p == "object" && p !== null) {
        switch (p.$$typeof) {
          case z:
            return (
              (x = vu(p.type, p.key, p.props, null, E.mode, x)),
              bn(x, p),
              (x.return = E),
              x
            )
          case w:
            return (p = ic(p, E.mode, x)), (p.return = E), p
          case Me:
            var U = p._init
            return (p = U(p._payload)), j(E, p, x)
        }
        if (Ze(p) || Qe(p))
          return (p = wl(p, E.mode, x, null)), (p.return = E), p
        if (typeof p.then == "function") return j(E, Nu(p), x)
        if (p.$$typeof === Y) return j(E, bu(E, p), x)
        ju(E, p)
      }
      return null
    }
    function O(E, p, x, U) {
      var V = p !== null ? p.key : null
      if (
        (typeof x == "string" && x !== "") ||
        typeof x == "number" ||
        typeof x == "bigint"
      )
        return V !== null ? null : s(E, p, "" + x, U)
      if (typeof x == "object" && x !== null) {
        switch (x.$$typeof) {
          case z:
            return x.key === V ? y(E, p, x, U) : null
          case w:
            return x.key === V ? A(E, p, x, U) : null
          case Me:
            return (V = x._init), (x = V(x._payload)), O(E, p, x, U)
        }
        if (Ze(x) || Qe(x)) return V !== null ? null : D(E, p, x, U, null)
        if (typeof x.then == "function") return O(E, p, Nu(x), U)
        if (x.$$typeof === Y) return O(E, p, bu(E, x), U)
        ju(E, x)
      }
      return null
    }
    function M(E, p, x, U, V) {
      if (
        (typeof U == "string" && U !== "") ||
        typeof U == "number" ||
        typeof U == "bigint"
      )
        return (E = E.get(x) || null), s(p, E, "" + U, V)
      if (typeof U == "object" && U !== null) {
        switch (U.$$typeof) {
          case z:
            return (
              (E = E.get(U.key === null ? x : U.key) || null), y(p, E, U, V)
            )
          case w:
            return (
              (E = E.get(U.key === null ? x : U.key) || null), A(p, E, U, V)
            )
          case Me:
            var ne = U._init
            return (U = ne(U._payload)), M(E, p, x, U, V)
        }
        if (Ze(U) || Qe(U)) return (E = E.get(x) || null), D(p, E, U, V, null)
        if (typeof U.then == "function") return M(E, p, x, Nu(U), V)
        if (U.$$typeof === Y) return M(E, p, x, bu(p, U), V)
        ju(p, U)
      }
      return null
    }
    function P(E, p, x, U) {
      for (
        var V = null, ne = null, k = p, F = (p = 0), we = null;
        k !== null && F < x.length;
        F++
      ) {
        k.index > F ? ((we = k), (k = null)) : (we = k.sibling)
        var re = O(E, k, x[F], U)
        if (re === null) {
          k === null && (k = we)
          break
        }
        e && k && re.alternate === null && t(E, k),
          (p = u(re, p, F)),
          ne === null ? (V = re) : (ne.sibling = re),
          (ne = re),
          (k = we)
      }
      if (F === x.length) return l(E, k), oe && Gl(E, F), V
      if (k === null) {
        for (; F < x.length; F++)
          (k = j(E, x[F], U)),
            k !== null &&
              ((p = u(k, p, F)),
              ne === null ? (V = k) : (ne.sibling = k),
              (ne = k))
        return oe && Gl(E, F), V
      }
      for (k = a(k); F < x.length; F++)
        (we = M(k, E, F, x[F], U)),
          we !== null &&
            (e &&
              we.alternate !== null &&
              k.delete(we.key === null ? F : we.key),
            (p = u(we, p, F)),
            ne === null ? (V = we) : (ne.sibling = we),
            (ne = we))
      return (
        e &&
          k.forEach(function (Dl) {
            return t(E, Dl)
          }),
        oe && Gl(E, F),
        V
      )
    }
    function W(E, p, x, U) {
      if (x == null) throw Error(r(151))
      for (
        var V = null, ne = null, k = p, F = (p = 0), we = null, re = x.next();
        k !== null && !re.done;
        F++, re = x.next()
      ) {
        k.index > F ? ((we = k), (k = null)) : (we = k.sibling)
        var Dl = O(E, k, re.value, U)
        if (Dl === null) {
          k === null && (k = we)
          break
        }
        e && k && Dl.alternate === null && t(E, k),
          (p = u(Dl, p, F)),
          ne === null ? (V = Dl) : (ne.sibling = Dl),
          (ne = Dl),
          (k = we)
      }
      if (re.done) return l(E, k), oe && Gl(E, F), V
      if (k === null) {
        for (; !re.done; F++, re = x.next())
          (re = j(E, re.value, U)),
            re !== null &&
              ((p = u(re, p, F)),
              ne === null ? (V = re) : (ne.sibling = re),
              (ne = re))
        return oe && Gl(E, F), V
      }
      for (k = a(k); !re.done; F++, re = x.next())
        (re = M(k, E, F, re.value, U)),
          re !== null &&
            (e &&
              re.alternate !== null &&
              k.delete(re.key === null ? F : re.key),
            (p = u(re, p, F)),
            ne === null ? (V = re) : (ne.sibling = re),
            (ne = re))
      return (
        e &&
          k.forEach(function (Cy) {
            return t(E, Cy)
          }),
        oe && Gl(E, F),
        V
      )
    }
    function ye(E, p, x, U) {
      if (
        (typeof x == "object" &&
          x !== null &&
          x.type === N &&
          x.key === null &&
          (x = x.props.children),
        typeof x == "object" && x !== null)
      ) {
        switch (x.$$typeof) {
          case z:
            e: {
              for (var V = x.key; p !== null; ) {
                if (p.key === V) {
                  if (((V = x.type), V === N)) {
                    if (p.tag === 7) {
                      l(E, p.sibling),
                        (U = n(p, x.props.children)),
                        (U.return = E),
                        (E = U)
                      break e
                    }
                  } else if (
                    p.elementType === V ||
                    (typeof V == "object" &&
                      V !== null &&
                      V.$$typeof === Me &&
                      gs(V) === p.type)
                  ) {
                    l(E, p.sibling),
                      (U = n(p, x.props)),
                      bn(U, x),
                      (U.return = E),
                      (E = U)
                    break e
                  }
                  l(E, p)
                  break
                } else t(E, p)
                p = p.sibling
              }
              x.type === N
                ? ((U = wl(x.props.children, E.mode, U, x.key)),
                  (U.return = E),
                  (E = U))
                : ((U = vu(x.type, x.key, x.props, null, E.mode, U)),
                  bn(U, x),
                  (U.return = E),
                  (E = U))
            }
            return f(E)
          case w:
            e: {
              for (V = x.key; p !== null; ) {
                if (p.key === V)
                  if (
                    p.tag === 4 &&
                    p.stateNode.containerInfo === x.containerInfo &&
                    p.stateNode.implementation === x.implementation
                  ) {
                    l(E, p.sibling),
                      (U = n(p, x.children || [])),
                      (U.return = E),
                      (E = U)
                    break e
                  } else {
                    l(E, p)
                    break
                  }
                else t(E, p)
                p = p.sibling
              }
              ;(U = ic(x, E.mode, U)), (U.return = E), (E = U)
            }
            return f(E)
          case Me:
            return (V = x._init), (x = V(x._payload)), ye(E, p, x, U)
        }
        if (Ze(x)) return P(E, p, x, U)
        if (Qe(x)) {
          if (((V = Qe(x)), typeof V != "function")) throw Error(r(150))
          return (x = V.call(x)), W(E, p, x, U)
        }
        if (typeof x.then == "function") return ye(E, p, Nu(x), U)
        if (x.$$typeof === Y) return ye(E, p, bu(E, x), U)
        ju(E, x)
      }
      return (typeof x == "string" && x !== "") ||
        typeof x == "number" ||
        typeof x == "bigint"
        ? ((x = "" + x),
          p !== null && p.tag === 6
            ? (l(E, p.sibling), (U = n(p, x)), (U.return = E), (E = U))
            : (l(E, p), (U = uc(x, E.mode, U)), (U.return = E), (E = U)),
          f(E))
        : l(E, p)
    }
    return function (E, p, x, U) {
      try {
        Sn = 0
        var V = ye(E, p, x, U)
        return (Aa = null), V
      } catch (k) {
        if (k === on || k === Tu) throw k
        var ne = ft(29, k, null, E.mode)
        return (ne.lanes = U), (ne.return = E), ne
      } finally {
      }
    }
  }
  var _a = ps(!0),
    Ss = ps(!1),
    Et = B(null),
    Nt = null
  function ml(e) {
    var t = e.alternate
    G(He, He.current & 1),
      G(Et, e),
      Nt === null &&
        (t === null || ba.current !== null || t.memoizedState !== null) &&
        (Nt = e)
  }
  function bs(e) {
    if (e.tag === 22) {
      if ((G(He, He.current), G(Et, e), Nt === null)) {
        var t = e.alternate
        t !== null && t.memoizedState !== null && (Nt = e)
      }
    } else yl()
  }
  function yl() {
    G(He, He.current), G(Et, Et.current)
  }
  function Jt(e) {
    Q(Et), Nt === e && (Nt = null), Q(He)
  }
  var He = B(0)
  function Hu(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var l = t.memoizedState
        if (
          l !== null &&
          ((l = l.dehydrated), l === null || l.data === "$?" || Df(l))
        )
          return t
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
        if ((t.flags & 128) !== 0) return t
      } else if (t.child !== null) {
        ;(t.child.return = t), (t = t.child)
        continue
      }
      if (t === e) break
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null
        t = t.return
      }
      ;(t.sibling.return = t.return), (t = t.sibling)
    }
    return null
  }
  function wc(e, t, l, a) {
    ;(t = e.memoizedState),
      (l = l(a, t)),
      (l = l == null ? t : _({}, t, l)),
      (e.memoizedState = l),
      e.lanes === 0 && (e.updateQueue.baseState = l)
  }
  var Yc = {
    enqueueSetState: function (e, t, l) {
      e = e._reactInternals
      var a = dt(),
        n = sl(a)
      ;(n.payload = t),
        l != null && (n.callback = l),
        (t = dl(e, n, a)),
        t !== null && (ht(t, e, a), dn(t, e, a))
    },
    enqueueReplaceState: function (e, t, l) {
      e = e._reactInternals
      var a = dt(),
        n = sl(a)
      ;(n.tag = 1),
        (n.payload = t),
        l != null && (n.callback = l),
        (t = dl(e, n, a)),
        t !== null && (ht(t, e, a), dn(t, e, a))
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals
      var l = dt(),
        a = sl(l)
      ;(a.tag = 2),
        t != null && (a.callback = t),
        (t = dl(e, a, l)),
        t !== null && (ht(t, e, l), dn(t, e, l))
    },
  }
  function Es(e, t, l, a, n, u, f) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == "function"
        ? e.shouldComponentUpdate(a, u, f)
        : t.prototype && t.prototype.isPureReactComponent
        ? !tn(l, a) || !tn(n, u)
        : !0
    )
  }
  function Ts(e, t, l, a) {
    ;(e = t.state),
      typeof t.componentWillReceiveProps == "function" &&
        t.componentWillReceiveProps(l, a),
      typeof t.UNSAFE_componentWillReceiveProps == "function" &&
        t.UNSAFE_componentWillReceiveProps(l, a),
      t.state !== e && Yc.enqueueReplaceState(t, t.state, null)
  }
  function kl(e, t) {
    var l = t
    if ("ref" in t) {
      l = {}
      for (var a in t) a !== "ref" && (l[a] = t[a])
    }
    if ((e = e.defaultProps)) {
      l === t && (l = _({}, l))
      for (var n in e) l[n] === void 0 && (l[n] = e[n])
    }
    return l
  }
  var Bu =
    typeof reportError == "function"
      ? reportError
      : function (e) {
          if (
            typeof window == "object" &&
            typeof window.ErrorEvent == "function"
          ) {
            var t = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof e == "object" &&
                e !== null &&
                typeof e.message == "string"
                  ? String(e.message)
                  : String(e),
              error: e,
            })
            if (!window.dispatchEvent(t)) return
          } else if (
            typeof process == "object" &&
            typeof process.emit == "function"
          ) {
            process.emit("uncaughtException", e)
            return
          }
          console.error(e)
        }
  function xs(e) {
    Bu(e)
  }
  function As(e) {
    console.error(e)
  }
  function _s(e) {
    Bu(e)
  }
  function Lu(e, t) {
    try {
      var l = e.onUncaughtError
      l(t.value, { componentStack: t.stack })
    } catch (a) {
      setTimeout(function () {
        throw a
      })
    }
  }
  function Os(e, t, l) {
    try {
      var a = e.onCaughtError
      a(l.value, {
        componentStack: l.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null,
      })
    } catch (n) {
      setTimeout(function () {
        throw n
      })
    }
  }
  function Gc(e, t, l) {
    return (
      (l = sl(l)),
      (l.tag = 3),
      (l.payload = { element: null }),
      (l.callback = function () {
        Lu(e, t)
      }),
      l
    )
  }
  function Rs(e) {
    return (e = sl(e)), (e.tag = 3), e
  }
  function Ms(e, t, l, a) {
    var n = l.type.getDerivedStateFromError
    if (typeof n == "function") {
      var u = a.value
      ;(e.payload = function () {
        return n(u)
      }),
        (e.callback = function () {
          Os(t, l, a)
        })
    }
    var f = l.stateNode
    f !== null &&
      typeof f.componentDidCatch == "function" &&
      (e.callback = function () {
        Os(t, l, a),
          typeof n != "function" &&
            (El === null ? (El = new Set([this])) : El.add(this))
        var s = a.stack
        this.componentDidCatch(a.value, { componentStack: s !== null ? s : "" })
      })
  }
  function C0(e, t, l, a, n) {
    if (
      ((l.flags |= 32768),
      a !== null && typeof a == "object" && typeof a.then == "function")
    ) {
      if (
        ((t = l.alternate),
        t !== null && cn(t, l, n, !0),
        (l = Et.current),
        l !== null)
      ) {
        switch (l.tag) {
          case 13:
            return (
              Nt === null ? df() : l.alternate === null && Re === 0 && (Re = 3),
              (l.flags &= -257),
              (l.flags |= 65536),
              (l.lanes = n),
              a === vc
                ? (l.flags |= 16384)
                : ((t = l.updateQueue),
                  t === null ? (l.updateQueue = new Set([a])) : t.add(a),
                  mf(e, a, n)),
              !1
            )
          case 22:
            return (
              (l.flags |= 65536),
              a === vc
                ? (l.flags |= 16384)
                : ((t = l.updateQueue),
                  t === null
                    ? ((t = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([a]),
                      }),
                      (l.updateQueue = t))
                    : ((l = t.retryQueue),
                      l === null ? (t.retryQueue = new Set([a])) : l.add(a)),
                  mf(e, a, n)),
              !1
            )
        }
        throw Error(r(435, l.tag))
      }
      return mf(e, a, n), df(), !1
    }
    if (oe)
      return (
        (t = Et.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = n),
            a !== rc && ((e = Error(r(422), { cause: a })), un(gt(e, l))))
          : (a !== rc && ((t = Error(r(423), { cause: a })), un(gt(t, l))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (n &= -n),
            (e.lanes |= n),
            (a = gt(a, l)),
            (n = Gc(e.stateNode, a, n)),
            Sc(e, n),
            Re !== 4 && (Re = 2)),
        !1
      )
    var u = Error(r(520), { cause: a })
    if (
      ((u = gt(u, l)),
      Rn === null ? (Rn = [u]) : Rn.push(u),
      Re !== 4 && (Re = 2),
      t === null)
    )
      return !0
    ;(a = gt(a, l)), (l = t)
    do {
      switch (l.tag) {
        case 3:
          return (
            (l.flags |= 65536),
            (e = n & -n),
            (l.lanes |= e),
            (e = Gc(l.stateNode, a, e)),
            Sc(l, e),
            !1
          )
        case 1:
          if (
            ((t = l.type),
            (u = l.stateNode),
            (l.flags & 128) === 0 &&
              (typeof t.getDerivedStateFromError == "function" ||
                (u !== null &&
                  typeof u.componentDidCatch == "function" &&
                  (El === null || !El.has(u)))))
          )
            return (
              (l.flags |= 65536),
              (n &= -n),
              (l.lanes |= n),
              (n = Rs(n)),
              Ms(n, e, l, a),
              Sc(l, n),
              !1
            )
      }
      l = l.return
    } while (l !== null)
    return !1
  }
  var Ds = Error(r(461)),
    Le = !1
  function Ye(e, t, l, a) {
    t.child = e === null ? Ss(t, null, l, a) : _a(t, e.child, l, a)
  }
  function Cs(e, t, l, a, n) {
    l = l.render
    var u = t.ref
    if ("ref" in a) {
      var f = {}
      for (var s in a) s !== "ref" && (f[s] = a[s])
    } else f = a
    return (
      Vl(t),
      (a = Ac(e, t, l, f, u, n)),
      (s = _c()),
      e !== null && !Le
        ? (Oc(e, t, n), kt(e, t, n))
        : (oe && s && cc(t), (t.flags |= 1), Ye(e, t, a, n), t.child)
    )
  }
  function zs(e, t, l, a, n) {
    if (e === null) {
      var u = l.type
      return typeof u == "function" &&
        !nc(u) &&
        u.defaultProps === void 0 &&
        l.compare === null
        ? ((t.tag = 15), (t.type = u), Us(e, t, u, a, n))
        : ((e = vu(l.type, null, a, t, t.mode, n)),
          (e.ref = t.ref),
          (e.return = t),
          (t.child = e))
    }
    if (((u = e.child), !$c(e, n))) {
      var f = u.memoizedProps
      if (
        ((l = l.compare), (l = l !== null ? l : tn), l(f, a) && e.ref === t.ref)
      )
        return kt(e, t, n)
    }
    return (
      (t.flags |= 1),
      (e = Gt(u, a)),
      (e.ref = t.ref),
      (e.return = t),
      (t.child = e)
    )
  }
  function Us(e, t, l, a, n) {
    if (e !== null) {
      var u = e.memoizedProps
      if (tn(u, a) && e.ref === t.ref)
        if (((Le = !1), (t.pendingProps = a = u), $c(e, n)))
          (e.flags & 131072) !== 0 && (Le = !0)
        else return (t.lanes = e.lanes), kt(e, t, n)
    }
    return Xc(e, t, l, a, n)
  }
  function Ns(e, t, l) {
    var a = t.pendingProps,
      n = a.children,
      u = e !== null ? e.memoizedState : null
    if (a.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (((a = u !== null ? u.baseLanes | l : l), e !== null)) {
          for (n = t.child = e.child, u = 0; n !== null; )
            (u = u | n.lanes | n.childLanes), (n = n.sibling)
          t.childLanes = u & ~a
        } else (t.childLanes = 0), (t.child = null)
        return js(e, t, a, l)
      }
      if ((l & 536870912) !== 0)
        (t.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && Eu(t, u !== null ? u.cachePool : null),
          u !== null ? Uo(t, u) : Ec(),
          bs(t)
      else
        return (
          (t.lanes = t.childLanes = 536870912),
          js(e, t, u !== null ? u.baseLanes | l : l, l)
        )
    } else
      u !== null
        ? (Eu(t, u.cachePool), Uo(t, u), yl(), (t.memoizedState = null))
        : (e !== null && Eu(t, null), Ec(), yl())
    return Ye(e, t, n, l), t.child
  }
  function js(e, t, l, a) {
    var n = yc()
    return (
      (n = n === null ? null : { parent: je._currentValue, pool: n }),
      (t.memoizedState = { baseLanes: l, cachePool: n }),
      e !== null && Eu(t, null),
      Ec(),
      bs(t),
      e !== null && cn(e, t, a, !0),
      null
    )
  }
  function qu(e, t) {
    var l = t.ref
    if (l === null) e !== null && e.ref !== null && (t.flags |= 4194816)
    else {
      if (typeof l != "function" && typeof l != "object") throw Error(r(284))
      ;(e === null || e.ref !== l) && (t.flags |= 4194816)
    }
  }
  function Xc(e, t, l, a, n) {
    return (
      Vl(t),
      (l = Ac(e, t, l, a, void 0, n)),
      (a = _c()),
      e !== null && !Le
        ? (Oc(e, t, n), kt(e, t, n))
        : (oe && a && cc(t), (t.flags |= 1), Ye(e, t, l, n), t.child)
    )
  }
  function Hs(e, t, l, a, n, u) {
    return (
      Vl(t),
      (t.updateQueue = null),
      (l = jo(t, a, l, n)),
      No(e),
      (a = _c()),
      e !== null && !Le
        ? (Oc(e, t, u), kt(e, t, u))
        : (oe && a && cc(t), (t.flags |= 1), Ye(e, t, l, u), t.child)
    )
  }
  function Bs(e, t, l, a, n) {
    if ((Vl(t), t.stateNode === null)) {
      var u = ya,
        f = l.contextType
      typeof f == "object" && f !== null && (u = Ke(f)),
        (u = new l(a, u)),
        (t.memoizedState =
          u.state !== null && u.state !== void 0 ? u.state : null),
        (u.updater = Yc),
        (t.stateNode = u),
        (u._reactInternals = t),
        (u = t.stateNode),
        (u.props = a),
        (u.state = t.memoizedState),
        (u.refs = {}),
        gc(t),
        (f = l.contextType),
        (u.context = typeof f == "object" && f !== null ? Ke(f) : ya),
        (u.state = t.memoizedState),
        (f = l.getDerivedStateFromProps),
        typeof f == "function" && (wc(t, l, f, a), (u.state = t.memoizedState)),
        typeof l.getDerivedStateFromProps == "function" ||
          typeof u.getSnapshotBeforeUpdate == "function" ||
          (typeof u.UNSAFE_componentWillMount != "function" &&
            typeof u.componentWillMount != "function") ||
          ((f = u.state),
          typeof u.componentWillMount == "function" && u.componentWillMount(),
          typeof u.UNSAFE_componentWillMount == "function" &&
            u.UNSAFE_componentWillMount(),
          f !== u.state && Yc.enqueueReplaceState(u, u.state, null),
          mn(t, a, u, n),
          hn(),
          (u.state = t.memoizedState)),
        typeof u.componentDidMount == "function" && (t.flags |= 4194308),
        (a = !0)
    } else if (e === null) {
      u = t.stateNode
      var s = t.memoizedProps,
        y = kl(l, s)
      u.props = y
      var A = u.context,
        D = l.contextType
      ;(f = ya), typeof D == "object" && D !== null && (f = Ke(D))
      var j = l.getDerivedStateFromProps
      ;(D =
        typeof j == "function" ||
        typeof u.getSnapshotBeforeUpdate == "function"),
        (s = t.pendingProps !== s),
        D ||
          (typeof u.UNSAFE_componentWillReceiveProps != "function" &&
            typeof u.componentWillReceiveProps != "function") ||
          ((s || A !== f) && Ts(t, u, a, f)),
        (ol = !1)
      var O = t.memoizedState
      ;(u.state = O),
        mn(t, a, u, n),
        hn(),
        (A = t.memoizedState),
        s || O !== A || ol
          ? (typeof j == "function" && (wc(t, l, j, a), (A = t.memoizedState)),
            (y = ol || Es(t, l, y, a, O, A, f))
              ? (D ||
                  (typeof u.UNSAFE_componentWillMount != "function" &&
                    typeof u.componentWillMount != "function") ||
                  (typeof u.componentWillMount == "function" &&
                    u.componentWillMount(),
                  typeof u.UNSAFE_componentWillMount == "function" &&
                    u.UNSAFE_componentWillMount()),
                typeof u.componentDidMount == "function" &&
                  (t.flags |= 4194308))
              : (typeof u.componentDidMount == "function" &&
                  (t.flags |= 4194308),
                (t.memoizedProps = a),
                (t.memoizedState = A)),
            (u.props = a),
            (u.state = A),
            (u.context = f),
            (a = y))
          : (typeof u.componentDidMount == "function" && (t.flags |= 4194308),
            (a = !1))
    } else {
      ;(u = t.stateNode),
        pc(e, t),
        (f = t.memoizedProps),
        (D = kl(l, f)),
        (u.props = D),
        (j = t.pendingProps),
        (O = u.context),
        (A = l.contextType),
        (y = ya),
        typeof A == "object" && A !== null && (y = Ke(A)),
        (s = l.getDerivedStateFromProps),
        (A =
          typeof s == "function" ||
          typeof u.getSnapshotBeforeUpdate == "function") ||
          (typeof u.UNSAFE_componentWillReceiveProps != "function" &&
            typeof u.componentWillReceiveProps != "function") ||
          ((f !== j || O !== y) && Ts(t, u, a, y)),
        (ol = !1),
        (O = t.memoizedState),
        (u.state = O),
        mn(t, a, u, n),
        hn()
      var M = t.memoizedState
      f !== j ||
      O !== M ||
      ol ||
      (e !== null && e.dependencies !== null && Su(e.dependencies))
        ? (typeof s == "function" && (wc(t, l, s, a), (M = t.memoizedState)),
          (D =
            ol ||
            Es(t, l, D, a, O, M, y) ||
            (e !== null && e.dependencies !== null && Su(e.dependencies)))
            ? (A ||
                (typeof u.UNSAFE_componentWillUpdate != "function" &&
                  typeof u.componentWillUpdate != "function") ||
                (typeof u.componentWillUpdate == "function" &&
                  u.componentWillUpdate(a, M, y),
                typeof u.UNSAFE_componentWillUpdate == "function" &&
                  u.UNSAFE_componentWillUpdate(a, M, y)),
              typeof u.componentDidUpdate == "function" && (t.flags |= 4),
              typeof u.getSnapshotBeforeUpdate == "function" &&
                (t.flags |= 1024))
            : (typeof u.componentDidUpdate != "function" ||
                (f === e.memoizedProps && O === e.memoizedState) ||
                (t.flags |= 4),
              typeof u.getSnapshotBeforeUpdate != "function" ||
                (f === e.memoizedProps && O === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = a),
              (t.memoizedState = M)),
          (u.props = a),
          (u.state = M),
          (u.context = y),
          (a = D))
        : (typeof u.componentDidUpdate != "function" ||
            (f === e.memoizedProps && O === e.memoizedState) ||
            (t.flags |= 4),
          typeof u.getSnapshotBeforeUpdate != "function" ||
            (f === e.memoizedProps && O === e.memoizedState) ||
            (t.flags |= 1024),
          (a = !1))
    }
    return (
      (u = a),
      qu(e, t),
      (a = (t.flags & 128) !== 0),
      u || a
        ? ((u = t.stateNode),
          (l =
            a && typeof l.getDerivedStateFromError != "function"
              ? null
              : u.render()),
          (t.flags |= 1),
          e !== null && a
            ? ((t.child = _a(t, e.child, null, n)),
              (t.child = _a(t, null, l, n)))
            : Ye(e, t, l, n),
          (t.memoizedState = u.state),
          (e = t.child))
        : (e = kt(e, t, n)),
      e
    )
  }
  function Ls(e, t, l, a) {
    return nn(), (t.flags |= 256), Ye(e, t, l, a), t.child
  }
  var Qc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null,
  }
  function Zc(e) {
    return { baseLanes: e, cachePool: Ao() }
  }
  function Vc(e, t, l) {
    return (e = e !== null ? e.childLanes & ~l : 0), t && (e |= Tt), e
  }
  function qs(e, t, l) {
    var a = t.pendingProps,
      n = !1,
      u = (t.flags & 128) !== 0,
      f
    if (
      ((f = u) ||
        (f =
          e !== null && e.memoizedState === null ? !1 : (He.current & 2) !== 0),
      f && ((n = !0), (t.flags &= -129)),
      (f = (t.flags & 32) !== 0),
      (t.flags &= -33),
      e === null)
    ) {
      if (oe) {
        if ((n ? ml(t) : yl(), oe)) {
          var s = Oe,
            y
          if ((y = s)) {
            e: {
              for (y = s, s = Ut; y.nodeType !== 8; ) {
                if (!s) {
                  s = null
                  break e
                }
                if (((y = Ot(y.nextSibling)), y === null)) {
                  s = null
                  break e
                }
              }
              s = y
            }
            s !== null
              ? ((t.memoizedState = {
                  dehydrated: s,
                  treeContext: Yl !== null ? { id: Xt, overflow: Qt } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (y = ft(18, null, null, 0)),
                (y.stateNode = s),
                (y.return = t),
                (t.child = y),
                (We = t),
                (Oe = null),
                (y = !0))
              : (y = !1)
          }
          y || Ql(t)
        }
        if (
          ((s = t.memoizedState),
          s !== null && ((s = s.dehydrated), s !== null))
        )
          return Df(s) ? (t.lanes = 32) : (t.lanes = 536870912), null
        Jt(t)
      }
      return (
        (s = a.children),
        (a = a.fallback),
        n
          ? (yl(),
            (n = t.mode),
            (s = wu({ mode: "hidden", children: s }, n)),
            (a = wl(a, n, l, null)),
            (s.return = t),
            (a.return = t),
            (s.sibling = a),
            (t.child = s),
            (n = t.child),
            (n.memoizedState = Zc(l)),
            (n.childLanes = Vc(e, f, l)),
            (t.memoizedState = Qc),
            a)
          : (ml(t), Kc(t, s))
      )
    }
    if (
      ((y = e.memoizedState), y !== null && ((s = y.dehydrated), s !== null))
    ) {
      if (u)
        t.flags & 256
          ? (ml(t), (t.flags &= -257), (t = Jc(e, t, l)))
          : t.memoizedState !== null
          ? (yl(), (t.child = e.child), (t.flags |= 128), (t = null))
          : (yl(),
            (n = a.fallback),
            (s = t.mode),
            (a = wu({ mode: "visible", children: a.children }, s)),
            (n = wl(n, s, l, null)),
            (n.flags |= 2),
            (a.return = t),
            (n.return = t),
            (a.sibling = n),
            (t.child = a),
            _a(t, e.child, null, l),
            (a = t.child),
            (a.memoizedState = Zc(l)),
            (a.childLanes = Vc(e, f, l)),
            (t.memoizedState = Qc),
            (t = n))
      else if ((ml(t), Df(s))) {
        if (((f = s.nextSibling && s.nextSibling.dataset), f)) var A = f.dgst
        ;(f = A),
          (a = Error(r(419))),
          (a.stack = ""),
          (a.digest = f),
          un({ value: a, source: null, stack: null }),
          (t = Jc(e, t, l))
      } else if (
        (Le || cn(e, t, l, !1), (f = (l & e.childLanes) !== 0), Le || f)
      ) {
        if (
          ((f = Se),
          f !== null &&
            ((a = l & -l),
            (a = (a & 42) !== 0 ? 1 : Di(a)),
            (a = (a & (f.suspendedLanes | l)) !== 0 ? 0 : a),
            a !== 0 && a !== y.retryLane))
        )
          throw ((y.retryLane = a), ma(e, a), ht(f, e, a), Ds)
        s.data === "$?" || df(), (t = Jc(e, t, l))
      } else
        s.data === "$?"
          ? ((t.flags |= 192), (t.child = e.child), (t = null))
          : ((e = y.treeContext),
            (Oe = Ot(s.nextSibling)),
            (We = t),
            (oe = !0),
            (Xl = null),
            (Ut = !1),
            e !== null &&
              ((St[bt++] = Xt),
              (St[bt++] = Qt),
              (St[bt++] = Yl),
              (Xt = e.id),
              (Qt = e.overflow),
              (Yl = t)),
            (t = Kc(t, a.children)),
            (t.flags |= 4096))
      return t
    }
    return n
      ? (yl(),
        (n = a.fallback),
        (s = t.mode),
        (y = e.child),
        (A = y.sibling),
        (a = Gt(y, { mode: "hidden", children: a.children })),
        (a.subtreeFlags = y.subtreeFlags & 65011712),
        A !== null ? (n = Gt(A, n)) : ((n = wl(n, s, l, null)), (n.flags |= 2)),
        (n.return = t),
        (a.return = t),
        (a.sibling = n),
        (t.child = a),
        (a = n),
        (n = t.child),
        (s = e.child.memoizedState),
        s === null
          ? (s = Zc(l))
          : ((y = s.cachePool),
            y !== null
              ? ((A = je._currentValue),
                (y = y.parent !== A ? { parent: A, pool: A } : y))
              : (y = Ao()),
            (s = { baseLanes: s.baseLanes | l, cachePool: y })),
        (n.memoizedState = s),
        (n.childLanes = Vc(e, f, l)),
        (t.memoizedState = Qc),
        a)
      : (ml(t),
        (l = e.child),
        (e = l.sibling),
        (l = Gt(l, { mode: "visible", children: a.children })),
        (l.return = t),
        (l.sibling = null),
        e !== null &&
          ((f = t.deletions),
          f === null ? ((t.deletions = [e]), (t.flags |= 16)) : f.push(e)),
        (t.child = l),
        (t.memoizedState = null),
        l)
  }
  function Kc(e, t) {
    return (
      (t = wu({ mode: "visible", children: t }, e.mode)),
      (t.return = e),
      (e.child = t)
    )
  }
  function wu(e, t) {
    return (
      (e = ft(22, e, null, t)),
      (e.lanes = 0),
      (e.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null,
      }),
      e
    )
  }
  function Jc(e, t, l) {
    return (
      _a(t, e.child, null, l),
      (e = Kc(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    )
  }
  function ws(e, t, l) {
    e.lanes |= t
    var a = e.alternate
    a !== null && (a.lanes |= t), sc(e.return, t, l)
  }
  function kc(e, t, l, a, n) {
    var u = e.memoizedState
    u === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: a,
          tail: l,
          tailMode: n,
        })
      : ((u.isBackwards = t),
        (u.rendering = null),
        (u.renderingStartTime = 0),
        (u.last = a),
        (u.tail = l),
        (u.tailMode = n))
  }
  function Ys(e, t, l) {
    var a = t.pendingProps,
      n = a.revealOrder,
      u = a.tail
    if ((Ye(e, t, a.children, l), (a = He.current), (a & 2) !== 0))
      (a = (a & 1) | 2), (t.flags |= 128)
    else {
      if (e !== null && (e.flags & 128) !== 0)
        e: for (e = t.child; e !== null; ) {
          if (e.tag === 13) e.memoizedState !== null && ws(e, l, t)
          else if (e.tag === 19) ws(e, l, t)
          else if (e.child !== null) {
            ;(e.child.return = e), (e = e.child)
            continue
          }
          if (e === t) break e
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === t) break e
            e = e.return
          }
          ;(e.sibling.return = e.return), (e = e.sibling)
        }
      a &= 1
    }
    switch ((G(He, a), n)) {
      case "forwards":
        for (l = t.child, n = null; l !== null; )
          (e = l.alternate),
            e !== null && Hu(e) === null && (n = l),
            (l = l.sibling)
        ;(l = n),
          l === null
            ? ((n = t.child), (t.child = null))
            : ((n = l.sibling), (l.sibling = null)),
          kc(t, !1, n, l, u)
        break
      case "backwards":
        for (l = null, n = t.child, t.child = null; n !== null; ) {
          if (((e = n.alternate), e !== null && Hu(e) === null)) {
            t.child = n
            break
          }
          ;(e = n.sibling), (n.sibling = l), (l = n), (n = e)
        }
        kc(t, !0, l, null, u)
        break
      case "together":
        kc(t, !1, null, null, void 0)
        break
      default:
        t.memoizedState = null
    }
    return t.child
  }
  function kt(e, t, l) {
    if (
      (e !== null && (t.dependencies = e.dependencies),
      (bl |= t.lanes),
      (l & t.childLanes) === 0)
    )
      if (e !== null) {
        if ((cn(e, t, l, !1), (l & t.childLanes) === 0)) return null
      } else return null
    if (e !== null && t.child !== e.child) throw Error(r(153))
    if (t.child !== null) {
      for (
        e = t.child, l = Gt(e, e.pendingProps), t.child = l, l.return = t;
        e.sibling !== null;

      )
        (e = e.sibling), (l = l.sibling = Gt(e, e.pendingProps)), (l.return = t)
      l.sibling = null
    }
    return t.child
  }
  function $c(e, t) {
    return (e.lanes & t) !== 0
      ? !0
      : ((e = e.dependencies), !!(e !== null && Su(e)))
  }
  function z0(e, t, l) {
    switch (t.tag) {
      case 3:
        Te(t, t.stateNode.containerInfo), rl(t, je, e.memoizedState.cache), nn()
        break
      case 27:
      case 5:
        Ai(t)
        break
      case 4:
        Te(t, t.stateNode.containerInfo)
        break
      case 10:
        rl(t, t.type, t.memoizedProps.value)
        break
      case 13:
        var a = t.memoizedState
        if (a !== null)
          return a.dehydrated !== null
            ? (ml(t), (t.flags |= 128), null)
            : (l & t.child.childLanes) !== 0
            ? qs(e, t, l)
            : (ml(t), (e = kt(e, t, l)), e !== null ? e.sibling : null)
        ml(t)
        break
      case 19:
        var n = (e.flags & 128) !== 0
        if (
          ((a = (l & t.childLanes) !== 0),
          a || (cn(e, t, l, !1), (a = (l & t.childLanes) !== 0)),
          n)
        ) {
          if (a) return Ys(e, t, l)
          t.flags |= 128
        }
        if (
          ((n = t.memoizedState),
          n !== null &&
            ((n.rendering = null), (n.tail = null), (n.lastEffect = null)),
          G(He, He.current),
          a)
        )
          break
        return null
      case 22:
      case 23:
        return (t.lanes = 0), Ns(e, t, l)
      case 24:
        rl(t, je, e.memoizedState.cache)
    }
    return kt(e, t, l)
  }
  function Gs(e, t, l) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps) Le = !0
      else {
        if (!$c(e, l) && (t.flags & 128) === 0) return (Le = !1), z0(e, t, l)
        Le = (e.flags & 131072) !== 0
      }
    else (Le = !1), oe && (t.flags & 1048576) !== 0 && go(t, pu, t.index)
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        e: {
          e = t.pendingProps
          var a = t.elementType,
            n = a._init
          if (((a = n(a._payload)), (t.type = a), typeof a == "function"))
            nc(a)
              ? ((e = kl(a, e)), (t.tag = 1), (t = Bs(null, t, a, e, l)))
              : ((t.tag = 0), (t = Xc(null, t, a, e, l)))
          else {
            if (a != null) {
              if (((n = a.$$typeof), n === le)) {
                ;(t.tag = 11), (t = Cs(null, t, a, e, l))
                break e
              } else if (n === be) {
                ;(t.tag = 14), (t = zs(null, t, a, e, l))
                break e
              }
            }
            throw ((t = Nl(a) || a), Error(r(306, t, "")))
          }
        }
        return t
      case 0:
        return Xc(e, t, t.type, t.pendingProps, l)
      case 1:
        return (a = t.type), (n = kl(a, t.pendingProps)), Bs(e, t, a, n, l)
      case 3:
        e: {
          if ((Te(t, t.stateNode.containerInfo), e === null))
            throw Error(r(387))
          a = t.pendingProps
          var u = t.memoizedState
          ;(n = u.element), pc(e, t), mn(t, a, null, l)
          var f = t.memoizedState
          if (
            ((a = f.cache),
            rl(t, je, a),
            a !== u.cache && dc(t, [je], l, !0),
            hn(),
            (a = f.element),
            u.isDehydrated)
          )
            if (
              ((u = { element: a, isDehydrated: !1, cache: f.cache }),
              (t.updateQueue.baseState = u),
              (t.memoizedState = u),
              t.flags & 256)
            ) {
              t = Ls(e, t, a, l)
              break e
            } else if (a !== n) {
              ;(n = gt(Error(r(424)), t)), un(n), (t = Ls(e, t, a, l))
              break e
            } else {
              switch (((e = t.stateNode.containerInfo), e.nodeType)) {
                case 9:
                  e = e.body
                  break
                default:
                  e = e.nodeName === "HTML" ? e.ownerDocument.body : e
              }
              for (
                Oe = Ot(e.firstChild),
                  We = t,
                  oe = !0,
                  Xl = null,
                  Ut = !0,
                  l = Ss(t, null, a, l),
                  t.child = l;
                l;

              )
                (l.flags = (l.flags & -3) | 4096), (l = l.sibling)
            }
          else {
            if ((nn(), a === n)) {
              t = kt(e, t, l)
              break e
            }
            Ye(e, t, a, l)
          }
          t = t.child
        }
        return t
      case 26:
        return (
          qu(e, t),
          e === null
            ? (l = Vd(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = l)
              : oe ||
                ((l = t.type),
                (e = t.pendingProps),
                (a = Pu(ee.current).createElement(l)),
                (a[Ve] = t),
                (a[Pe] = e),
                Xe(a, l, e),
                Be(a),
                (t.stateNode = a))
            : (t.memoizedState = Vd(
                t.type,
                e.memoizedProps,
                t.pendingProps,
                e.memoizedState
              )),
          null
        )
      case 27:
        return (
          Ai(t),
          e === null &&
            oe &&
            ((a = t.stateNode = Xd(t.type, t.pendingProps, ee.current)),
            (We = t),
            (Ut = !0),
            (n = Oe),
            Al(t.type) ? ((Cf = n), (Oe = Ot(a.firstChild))) : (Oe = n)),
          Ye(e, t, t.pendingProps.children, l),
          qu(e, t),
          e === null && (t.flags |= 4194304),
          t.child
        )
      case 5:
        return (
          e === null &&
            oe &&
            ((n = a = Oe) &&
              ((a = uy(a, t.type, t.pendingProps, Ut)),
              a !== null
                ? ((t.stateNode = a),
                  (We = t),
                  (Oe = Ot(a.firstChild)),
                  (Ut = !1),
                  (n = !0))
                : (n = !1)),
            n || Ql(t)),
          Ai(t),
          (n = t.type),
          (u = t.pendingProps),
          (f = e !== null ? e.memoizedProps : null),
          (a = u.children),
          Of(n, u) ? (a = null) : f !== null && Of(n, f) && (t.flags |= 32),
          t.memoizedState !== null &&
            ((n = Ac(e, t, x0, null, null, l)), (Bn._currentValue = n)),
          qu(e, t),
          Ye(e, t, a, l),
          t.child
        )
      case 6:
        return (
          e === null &&
            oe &&
            ((e = l = Oe) &&
              ((l = iy(l, t.pendingProps, Ut)),
              l !== null
                ? ((t.stateNode = l), (We = t), (Oe = null), (e = !0))
                : (e = !1)),
            e || Ql(t)),
          null
        )
      case 13:
        return qs(e, t, l)
      case 4:
        return (
          Te(t, t.stateNode.containerInfo),
          (a = t.pendingProps),
          e === null ? (t.child = _a(t, null, a, l)) : Ye(e, t, a, l),
          t.child
        )
      case 11:
        return Cs(e, t, t.type, t.pendingProps, l)
      case 7:
        return Ye(e, t, t.pendingProps, l), t.child
      case 8:
        return Ye(e, t, t.pendingProps.children, l), t.child
      case 12:
        return Ye(e, t, t.pendingProps.children, l), t.child
      case 10:
        return (
          (a = t.pendingProps),
          rl(t, t.type, a.value),
          Ye(e, t, a.children, l),
          t.child
        )
      case 9:
        return (
          (n = t.type._context),
          (a = t.pendingProps.children),
          Vl(t),
          (n = Ke(n)),
          (a = a(n)),
          (t.flags |= 1),
          Ye(e, t, a, l),
          t.child
        )
      case 14:
        return zs(e, t, t.type, t.pendingProps, l)
      case 15:
        return Us(e, t, t.type, t.pendingProps, l)
      case 19:
        return Ys(e, t, l)
      case 31:
        return (
          (a = t.pendingProps),
          (l = t.mode),
          (a = { mode: a.mode, children: a.children }),
          e === null
            ? ((l = wu(a, l)),
              (l.ref = t.ref),
              (t.child = l),
              (l.return = t),
              (t = l))
            : ((l = Gt(e.child, a)),
              (l.ref = t.ref),
              (t.child = l),
              (l.return = t),
              (t = l)),
          t
        )
      case 22:
        return Ns(e, t, l)
      case 24:
        return (
          Vl(t),
          (a = Ke(je)),
          e === null
            ? ((n = yc()),
              n === null &&
                ((n = Se),
                (u = hc()),
                (n.pooledCache = u),
                u.refCount++,
                u !== null && (n.pooledCacheLanes |= l),
                (n = u)),
              (t.memoizedState = { parent: a, cache: n }),
              gc(t),
              rl(t, je, n))
            : ((e.lanes & l) !== 0 && (pc(e, t), mn(t, null, null, l), hn()),
              (n = e.memoizedState),
              (u = t.memoizedState),
              n.parent !== a
                ? ((n = { parent: a, cache: a }),
                  (t.memoizedState = n),
                  t.lanes === 0 &&
                    (t.memoizedState = t.updateQueue.baseState = n),
                  rl(t, je, a))
                : ((a = u.cache),
                  rl(t, je, a),
                  a !== n.cache && dc(t, [je], l, !0))),
          Ye(e, t, t.pendingProps.children, l),
          t.child
        )
      case 29:
        throw t.pendingProps
    }
    throw Error(r(156, t.tag))
  }
  function $t(e) {
    e.flags |= 4
  }
  function Xs(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217
    else if (((e.flags |= 16777216), !Wd(t))) {
      if (
        ((t = Et.current),
        t !== null &&
          ((ce & 4194048) === ce
            ? Nt !== null
            : ((ce & 62914560) !== ce && (ce & 536870912) === 0) || t !== Nt))
      )
        throw ((sn = vc), _o)
      e.flags |= 8192
    }
  }
  function Yu(e, t) {
    t !== null && (e.flags |= 4),
      e.flags & 16384 &&
        ((t = e.tag !== 22 ? Sr() : 536870912), (e.lanes |= t), (Da |= t))
  }
  function En(e, t) {
    if (!oe)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail
          for (var l = null; t !== null; )
            t.alternate !== null && (l = t), (t = t.sibling)
          l === null ? (e.tail = null) : (l.sibling = null)
          break
        case "collapsed":
          l = e.tail
          for (var a = null; l !== null; )
            l.alternate !== null && (a = l), (l = l.sibling)
          a === null
            ? t || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (a.sibling = null)
      }
  }
  function _e(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      l = 0,
      a = 0
    if (t)
      for (var n = e.child; n !== null; )
        (l |= n.lanes | n.childLanes),
          (a |= n.subtreeFlags & 65011712),
          (a |= n.flags & 65011712),
          (n.return = e),
          (n = n.sibling)
    else
      for (n = e.child; n !== null; )
        (l |= n.lanes | n.childLanes),
          (a |= n.subtreeFlags),
          (a |= n.flags),
          (n.return = e),
          (n = n.sibling)
    return (e.subtreeFlags |= a), (e.childLanes = l), t
  }
  function U0(e, t, l) {
    var a = t.pendingProps
    switch ((fc(t), t.tag)) {
      case 31:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return _e(t), null
      case 1:
        return _e(t), null
      case 3:
        return (
          (l = t.stateNode),
          (a = null),
          e !== null && (a = e.memoizedState.cache),
          t.memoizedState.cache !== a && (t.flags |= 2048),
          Vt(je),
          ul(),
          l.pendingContext &&
            ((l.context = l.pendingContext), (l.pendingContext = null)),
          (e === null || e.child === null) &&
            (an(t)
              ? $t(t)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), bo())),
          _e(t),
          null
        )
      case 26:
        return (
          (l = t.memoizedState),
          e === null
            ? ($t(t),
              l !== null ? (_e(t), Xs(t, l)) : (_e(t), (t.flags &= -16777217)))
            : l
            ? l !== e.memoizedState
              ? ($t(t), _e(t), Xs(t, l))
              : (_e(t), (t.flags &= -16777217))
            : (e.memoizedProps !== a && $t(t), _e(t), (t.flags &= -16777217)),
          null
        )
      case 27:
        Fn(t), (l = ee.current)
        var n = t.type
        if (e !== null && t.stateNode != null) e.memoizedProps !== a && $t(t)
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(r(166))
            return _e(t), null
          }
          ;(e = $.current),
            an(t) ? po(t) : ((e = Xd(n, a, l)), (t.stateNode = e), $t(t))
        }
        return _e(t), null
      case 5:
        if ((Fn(t), (l = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== a && $t(t)
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(r(166))
            return _e(t), null
          }
          if (((e = $.current), an(t))) po(t)
          else {
            switch (((n = Pu(ee.current)), e)) {
              case 1:
                e = n.createElementNS("http://www.w3.org/2000/svg", l)
                break
              case 2:
                e = n.createElementNS("http://www.w3.org/1998/Math/MathML", l)
                break
              default:
                switch (l) {
                  case "svg":
                    e = n.createElementNS("http://www.w3.org/2000/svg", l)
                    break
                  case "math":
                    e = n.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      l
                    )
                    break
                  case "script":
                    ;(e = n.createElement("div")),
                      (e.innerHTML = "<script></script>"),
                      (e = e.removeChild(e.firstChild))
                    break
                  case "select":
                    ;(e =
                      typeof a.is == "string"
                        ? n.createElement("select", { is: a.is })
                        : n.createElement("select")),
                      a.multiple
                        ? (e.multiple = !0)
                        : a.size && (e.size = a.size)
                    break
                  default:
                    e =
                      typeof a.is == "string"
                        ? n.createElement(l, { is: a.is })
                        : n.createElement(l)
                }
            }
            ;(e[Ve] = t), (e[Pe] = a)
            e: for (n = t.child; n !== null; ) {
              if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode)
              else if (n.tag !== 4 && n.tag !== 27 && n.child !== null) {
                ;(n.child.return = n), (n = n.child)
                continue
              }
              if (n === t) break e
              for (; n.sibling === null; ) {
                if (n.return === null || n.return === t) break e
                n = n.return
              }
              ;(n.sibling.return = n.return), (n = n.sibling)
            }
            t.stateNode = e
            e: switch ((Xe(e, l, a), l)) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                e = !!a.autoFocus
                break e
              case "img":
                e = !0
                break e
              default:
                e = !1
            }
            e && $t(t)
          }
        }
        return _e(t), (t.flags &= -16777217), null
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== a && $t(t)
        else {
          if (typeof a != "string" && t.stateNode === null) throw Error(r(166))
          if (((e = ee.current), an(t))) {
            if (
              ((e = t.stateNode),
              (l = t.memoizedProps),
              (a = null),
              (n = We),
              n !== null)
            )
              switch (n.tag) {
                case 27:
                case 5:
                  a = n.memoizedProps
              }
            ;(e[Ve] = t),
              (e = !!(
                e.nodeValue === l ||
                (a !== null && a.suppressHydrationWarning === !0) ||
                Hd(e.nodeValue, l)
              )),
              e || Ql(t)
          } else (e = Pu(e).createTextNode(a)), (e[Ve] = t), (t.stateNode = e)
        }
        return _e(t), null
      case 13:
        if (
          ((a = t.memoizedState),
          e === null ||
            (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (((n = an(t)), a !== null && a.dehydrated !== null)) {
            if (e === null) {
              if (!n) throw Error(r(318))
              if (
                ((n = t.memoizedState),
                (n = n !== null ? n.dehydrated : null),
                !n)
              )
                throw Error(r(317))
              n[Ve] = t
            } else
              nn(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4)
            _e(t), (n = !1)
          } else
            (n = bo()),
              e !== null &&
                e.memoizedState !== null &&
                (e.memoizedState.hydrationErrors = n),
              (n = !0)
          if (!n) return t.flags & 256 ? (Jt(t), t) : (Jt(t), null)
        }
        if ((Jt(t), (t.flags & 128) !== 0)) return (t.lanes = l), t
        if (
          ((l = a !== null), (e = e !== null && e.memoizedState !== null), l)
        ) {
          ;(a = t.child),
            (n = null),
            a.alternate !== null &&
              a.alternate.memoizedState !== null &&
              a.alternate.memoizedState.cachePool !== null &&
              (n = a.alternate.memoizedState.cachePool.pool)
          var u = null
          a.memoizedState !== null &&
            a.memoizedState.cachePool !== null &&
            (u = a.memoizedState.cachePool.pool),
            u !== n && (a.flags |= 2048)
        }
        return (
          l !== e && l && (t.child.flags |= 8192),
          Yu(t, t.updateQueue),
          _e(t),
          null
        )
      case 4:
        return ul(), e === null && Ef(t.stateNode.containerInfo), _e(t), null
      case 10:
        return Vt(t.type), _e(t), null
      case 19:
        if ((Q(He), (n = t.memoizedState), n === null)) return _e(t), null
        if (((a = (t.flags & 128) !== 0), (u = n.rendering), u === null))
          if (a) En(n, !1)
          else {
            if (Re !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((u = Hu(e)), u !== null)) {
                  for (
                    t.flags |= 128,
                      En(n, !1),
                      e = u.updateQueue,
                      t.updateQueue = e,
                      Yu(t, e),
                      t.subtreeFlags = 0,
                      e = l,
                      l = t.child;
                    l !== null;

                  )
                    vo(l, e), (l = l.sibling)
                  return G(He, (He.current & 1) | 2), t.child
                }
                e = e.sibling
              }
            n.tail !== null &&
              zt() > Qu &&
              ((t.flags |= 128), (a = !0), En(n, !1), (t.lanes = 4194304))
          }
        else {
          if (!a)
            if (((e = Hu(u)), e !== null)) {
              if (
                ((t.flags |= 128),
                (a = !0),
                (e = e.updateQueue),
                (t.updateQueue = e),
                Yu(t, e),
                En(n, !0),
                n.tail === null &&
                  n.tailMode === "hidden" &&
                  !u.alternate &&
                  !oe)
              )
                return _e(t), null
            } else
              2 * zt() - n.renderingStartTime > Qu &&
                l !== 536870912 &&
                ((t.flags |= 128), (a = !0), En(n, !1), (t.lanes = 4194304))
          n.isBackwards
            ? ((u.sibling = t.child), (t.child = u))
            : ((e = n.last),
              e !== null ? (e.sibling = u) : (t.child = u),
              (n.last = u))
        }
        return n.tail !== null
          ? ((t = n.tail),
            (n.rendering = t),
            (n.tail = t.sibling),
            (n.renderingStartTime = zt()),
            (t.sibling = null),
            (e = He.current),
            G(He, a ? (e & 1) | 2 : e & 1),
            t)
          : (_e(t), null)
      case 22:
      case 23:
        return (
          Jt(t),
          Tc(),
          (a = t.memoizedState !== null),
          e !== null
            ? (e.memoizedState !== null) !== a && (t.flags |= 8192)
            : a && (t.flags |= 8192),
          a
            ? (l & 536870912) !== 0 &&
              (t.flags & 128) === 0 &&
              (_e(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : _e(t),
          (l = t.updateQueue),
          l !== null && Yu(t, l.retryQueue),
          (l = null),
          e !== null &&
            e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (l = e.memoizedState.cachePool.pool),
          (a = null),
          t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (a = t.memoizedState.cachePool.pool),
          a !== l && (t.flags |= 2048),
          e !== null && Q(Kl),
          null
        )
      case 24:
        return (
          (l = null),
          e !== null && (l = e.memoizedState.cache),
          t.memoizedState.cache !== l && (t.flags |= 2048),
          Vt(je),
          _e(t),
          null
        )
      case 25:
        return null
      case 30:
        return null
    }
    throw Error(r(156, t.tag))
  }
  function N0(e, t) {
    switch ((fc(t), t.tag)) {
      case 1:
        return (
          (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        )
      case 3:
        return (
          Vt(je),
          ul(),
          (e = t.flags),
          (e & 65536) !== 0 && (e & 128) === 0
            ? ((t.flags = (e & -65537) | 128), t)
            : null
        )
      case 26:
      case 27:
      case 5:
        return Fn(t), null
      case 13:
        if (
          (Jt(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)
        ) {
          if (t.alternate === null) throw Error(r(340))
          nn()
        }
        return (
          (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        )
      case 19:
        return Q(He), null
      case 4:
        return ul(), null
      case 10:
        return Vt(t.type), null
      case 22:
      case 23:
        return (
          Jt(t),
          Tc(),
          e !== null && Q(Kl),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        )
      case 24:
        return Vt(je), null
      case 25:
        return null
      default:
        return null
    }
  }
  function Qs(e, t) {
    switch ((fc(t), t.tag)) {
      case 3:
        Vt(je), ul()
        break
      case 26:
      case 27:
      case 5:
        Fn(t)
        break
      case 4:
        ul()
        break
      case 13:
        Jt(t)
        break
      case 19:
        Q(He)
        break
      case 10:
        Vt(t.type)
        break
      case 22:
      case 23:
        Jt(t), Tc(), e !== null && Q(Kl)
        break
      case 24:
        Vt(je)
    }
  }
  function Tn(e, t) {
    try {
      var l = t.updateQueue,
        a = l !== null ? l.lastEffect : null
      if (a !== null) {
        var n = a.next
        l = n
        do {
          if ((l.tag & e) === e) {
            a = void 0
            var u = l.create,
              f = l.inst
            ;(a = u()), (f.destroy = a)
          }
          l = l.next
        } while (l !== n)
      }
    } catch (s) {
      pe(t, t.return, s)
    }
  }
  function vl(e, t, l) {
    try {
      var a = t.updateQueue,
        n = a !== null ? a.lastEffect : null
      if (n !== null) {
        var u = n.next
        a = u
        do {
          if ((a.tag & e) === e) {
            var f = a.inst,
              s = f.destroy
            if (s !== void 0) {
              ;(f.destroy = void 0), (n = t)
              var y = l,
                A = s
              try {
                A()
              } catch (D) {
                pe(n, y, D)
              }
            }
          }
          a = a.next
        } while (a !== u)
      }
    } catch (D) {
      pe(t, t.return, D)
    }
  }
  function Zs(e) {
    var t = e.updateQueue
    if (t !== null) {
      var l = e.stateNode
      try {
        zo(t, l)
      } catch (a) {
        pe(e, e.return, a)
      }
    }
  }
  function Vs(e, t, l) {
    ;(l.props = kl(e.type, e.memoizedProps)), (l.state = e.memoizedState)
    try {
      l.componentWillUnmount()
    } catch (a) {
      pe(e, t, a)
    }
  }
  function xn(e, t) {
    try {
      var l = e.ref
      if (l !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var a = e.stateNode
            break
          case 30:
            a = e.stateNode
            break
          default:
            a = e.stateNode
        }
        typeof l == "function" ? (e.refCleanup = l(a)) : (l.current = a)
      }
    } catch (n) {
      pe(e, t, n)
    }
  }
  function jt(e, t) {
    var l = e.ref,
      a = e.refCleanup
    if (l !== null)
      if (typeof a == "function")
        try {
          a()
        } catch (n) {
          pe(e, t, n)
        } finally {
          ;(e.refCleanup = null),
            (e = e.alternate),
            e != null && (e.refCleanup = null)
        }
      else if (typeof l == "function")
        try {
          l(null)
        } catch (n) {
          pe(e, t, n)
        }
      else l.current = null
  }
  function Ks(e) {
    var t = e.type,
      l = e.memoizedProps,
      a = e.stateNode
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          l.autoFocus && a.focus()
          break e
        case "img":
          l.src ? (a.src = l.src) : l.srcSet && (a.srcset = l.srcSet)
      }
    } catch (n) {
      pe(e, e.return, n)
    }
  }
  function Wc(e, t, l) {
    try {
      var a = e.stateNode
      ey(a, e.type, l, t), (a[Pe] = t)
    } catch (n) {
      pe(e, e.return, n)
    }
  }
  function Js(e) {
    return (
      e.tag === 5 ||
      e.tag === 3 ||
      e.tag === 26 ||
      (e.tag === 27 && Al(e.type)) ||
      e.tag === 4
    )
  }
  function Fc(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || Js(e.return)) return null
        e = e.return
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

      ) {
        if (
          (e.tag === 27 && Al(e.type)) ||
          e.flags & 2 ||
          e.child === null ||
          e.tag === 4
        )
          continue e
        ;(e.child.return = e), (e = e.child)
      }
      if (!(e.flags & 2)) return e.stateNode
    }
  }
  function Ic(e, t, l) {
    var a = e.tag
    if (a === 5 || a === 6)
      (e = e.stateNode),
        t
          ? (l.nodeType === 9
              ? l.body
              : l.nodeName === "HTML"
              ? l.ownerDocument.body
              : l
            ).insertBefore(e, t)
          : ((t =
              l.nodeType === 9
                ? l.body
                : l.nodeName === "HTML"
                ? l.ownerDocument.body
                : l),
            t.appendChild(e),
            (l = l._reactRootContainer),
            l != null || t.onclick !== null || (t.onclick = Iu))
    else if (
      a !== 4 &&
      (a === 27 && Al(e.type) && ((l = e.stateNode), (t = null)),
      (e = e.child),
      e !== null)
    )
      for (Ic(e, t, l), e = e.sibling; e !== null; )
        Ic(e, t, l), (e = e.sibling)
  }
  function Gu(e, t, l) {
    var a = e.tag
    if (a === 5 || a === 6)
      (e = e.stateNode), t ? l.insertBefore(e, t) : l.appendChild(e)
    else if (
      a !== 4 &&
      (a === 27 && Al(e.type) && (l = e.stateNode), (e = e.child), e !== null)
    )
      for (Gu(e, t, l), e = e.sibling; e !== null; )
        Gu(e, t, l), (e = e.sibling)
  }
  function ks(e) {
    var t = e.stateNode,
      l = e.memoizedProps
    try {
      for (var a = e.type, n = t.attributes; n.length; )
        t.removeAttributeNode(n[0])
      Xe(t, a, l), (t[Ve] = e), (t[Pe] = l)
    } catch (u) {
      pe(e, e.return, u)
    }
  }
  var Wt = !1,
    Ce = !1,
    Pc = !1,
    $s = typeof WeakSet == "function" ? WeakSet : Set,
    qe = null
  function j0(e, t) {
    if (((e = e.containerInfo), (Af = ui), (e = uo(e)), Fi(e))) {
      if ("selectionStart" in e)
        var l = { start: e.selectionStart, end: e.selectionEnd }
      else
        e: {
          l = ((l = e.ownerDocument) && l.defaultView) || window
          var a = l.getSelection && l.getSelection()
          if (a && a.rangeCount !== 0) {
            l = a.anchorNode
            var n = a.anchorOffset,
              u = a.focusNode
            a = a.focusOffset
            try {
              l.nodeType, u.nodeType
            } catch {
              l = null
              break e
            }
            var f = 0,
              s = -1,
              y = -1,
              A = 0,
              D = 0,
              j = e,
              O = null
            t: for (;;) {
              for (
                var M;
                j !== l || (n !== 0 && j.nodeType !== 3) || (s = f + n),
                  j !== u || (a !== 0 && j.nodeType !== 3) || (y = f + a),
                  j.nodeType === 3 && (f += j.nodeValue.length),
                  (M = j.firstChild) !== null;

              )
                (O = j), (j = M)
              for (;;) {
                if (j === e) break t
                if (
                  (O === l && ++A === n && (s = f),
                  O === u && ++D === a && (y = f),
                  (M = j.nextSibling) !== null)
                )
                  break
                ;(j = O), (O = j.parentNode)
              }
              j = M
            }
            l = s === -1 || y === -1 ? null : { start: s, end: y }
          } else l = null
        }
      l = l || { start: 0, end: 0 }
    } else l = null
    for (
      _f = { focusedElem: e, selectionRange: l }, ui = !1, qe = t;
      qe !== null;

    )
      if (
        ((t = qe), (e = t.child), (t.subtreeFlags & 1024) !== 0 && e !== null)
      )
        (e.return = t), (qe = e)
      else
        for (; qe !== null; ) {
          switch (((t = qe), (u = t.alternate), (e = t.flags), t.tag)) {
            case 0:
              break
            case 11:
            case 15:
              break
            case 1:
              if ((e & 1024) !== 0 && u !== null) {
                ;(e = void 0),
                  (l = t),
                  (n = u.memoizedProps),
                  (u = u.memoizedState),
                  (a = l.stateNode)
                try {
                  var P = kl(l.type, n, l.elementType === l.type)
                  ;(e = a.getSnapshotBeforeUpdate(P, u)),
                    (a.__reactInternalSnapshotBeforeUpdate = e)
                } catch (W) {
                  pe(l, l.return, W)
                }
              }
              break
            case 3:
              if ((e & 1024) !== 0) {
                if (
                  ((e = t.stateNode.containerInfo), (l = e.nodeType), l === 9)
                )
                  Mf(e)
                else if (l === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Mf(e)
                      break
                    default:
                      e.textContent = ""
                  }
              }
              break
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break
            default:
              if ((e & 1024) !== 0) throw Error(r(163))
          }
          if (((e = t.sibling), e !== null)) {
            ;(e.return = t.return), (qe = e)
            break
          }
          qe = t.return
        }
  }
  function Ws(e, t, l) {
    var a = l.flags
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        gl(e, l), a & 4 && Tn(5, l)
        break
      case 1:
        if ((gl(e, l), a & 4))
          if (((e = l.stateNode), t === null))
            try {
              e.componentDidMount()
            } catch (f) {
              pe(l, l.return, f)
            }
          else {
            var n = kl(l.type, t.memoizedProps)
            t = t.memoizedState
            try {
              e.componentDidUpdate(n, t, e.__reactInternalSnapshotBeforeUpdate)
            } catch (f) {
              pe(l, l.return, f)
            }
          }
        a & 64 && Zs(l), a & 512 && xn(l, l.return)
        break
      case 3:
        if ((gl(e, l), a & 64 && ((e = l.updateQueue), e !== null))) {
          if (((t = null), l.child !== null))
            switch (l.child.tag) {
              case 27:
              case 5:
                t = l.child.stateNode
                break
              case 1:
                t = l.child.stateNode
            }
          try {
            zo(e, t)
          } catch (f) {
            pe(l, l.return, f)
          }
        }
        break
      case 27:
        t === null && a & 4 && ks(l)
      case 26:
      case 5:
        gl(e, l), t === null && a & 4 && Ks(l), a & 512 && xn(l, l.return)
        break
      case 12:
        gl(e, l)
        break
      case 13:
        gl(e, l),
          a & 4 && Ps(e, l),
          a & 64 &&
            ((e = l.memoizedState),
            e !== null &&
              ((e = e.dehydrated),
              e !== null && ((l = Q0.bind(null, l)), cy(e, l))))
        break
      case 22:
        if (((a = l.memoizedState !== null || Wt), !a)) {
          ;(t = (t !== null && t.memoizedState !== null) || Ce), (n = Wt)
          var u = Ce
          ;(Wt = a),
            (Ce = t) && !u ? pl(e, l, (l.subtreeFlags & 8772) !== 0) : gl(e, l),
            (Wt = n),
            (Ce = u)
        }
        break
      case 30:
        break
      default:
        gl(e, l)
    }
  }
  function Fs(e) {
    var t = e.alternate
    t !== null && ((e.alternate = null), Fs(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 && ((t = e.stateNode), t !== null && Ui(t)),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null)
  }
  var xe = null,
    lt = !1
  function Ft(e, t, l) {
    for (l = l.child; l !== null; ) Is(e, t, l), (l = l.sibling)
  }
  function Is(e, t, l) {
    if (ut && typeof ut.onCommitFiberUnmount == "function")
      try {
        ut.onCommitFiberUnmount(Qa, l)
      } catch {}
    switch (l.tag) {
      case 26:
        Ce || jt(l, t),
          Ft(e, t, l),
          l.memoizedState
            ? l.memoizedState.count--
            : l.stateNode && ((l = l.stateNode), l.parentNode.removeChild(l))
        break
      case 27:
        Ce || jt(l, t)
        var a = xe,
          n = lt
        Al(l.type) && ((xe = l.stateNode), (lt = !1)),
          Ft(e, t, l),
          Un(l.stateNode),
          (xe = a),
          (lt = n)
        break
      case 5:
        Ce || jt(l, t)
      case 6:
        if (
          ((a = xe),
          (n = lt),
          (xe = null),
          Ft(e, t, l),
          (xe = a),
          (lt = n),
          xe !== null)
        )
          if (lt)
            try {
              ;(xe.nodeType === 9
                ? xe.body
                : xe.nodeName === "HTML"
                ? xe.ownerDocument.body
                : xe
              ).removeChild(l.stateNode)
            } catch (u) {
              pe(l, t, u)
            }
          else
            try {
              xe.removeChild(l.stateNode)
            } catch (u) {
              pe(l, t, u)
            }
        break
      case 18:
        xe !== null &&
          (lt
            ? ((e = xe),
              Yd(
                e.nodeType === 9
                  ? e.body
                  : e.nodeName === "HTML"
                  ? e.ownerDocument.body
                  : e,
                l.stateNode
              ),
              Yn(e))
            : Yd(xe, l.stateNode))
        break
      case 4:
        ;(a = xe),
          (n = lt),
          (xe = l.stateNode.containerInfo),
          (lt = !0),
          Ft(e, t, l),
          (xe = a),
          (lt = n)
        break
      case 0:
      case 11:
      case 14:
      case 15:
        Ce || vl(2, l, t), Ce || vl(4, l, t), Ft(e, t, l)
        break
      case 1:
        Ce ||
          (jt(l, t),
          (a = l.stateNode),
          typeof a.componentWillUnmount == "function" && Vs(l, t, a)),
          Ft(e, t, l)
        break
      case 21:
        Ft(e, t, l)
        break
      case 22:
        ;(Ce = (a = Ce) || l.memoizedState !== null), Ft(e, t, l), (Ce = a)
        break
      default:
        Ft(e, t, l)
    }
  }
  function Ps(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate),
      e !== null &&
        ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
    )
      try {
        Yn(e)
      } catch (l) {
        pe(t, t.return, l)
      }
  }
  function H0(e) {
    switch (e.tag) {
      case 13:
      case 19:
        var t = e.stateNode
        return t === null && (t = e.stateNode = new $s()), t
      case 22:
        return (
          (e = e.stateNode),
          (t = e._retryCache),
          t === null && (t = e._retryCache = new $s()),
          t
        )
      default:
        throw Error(r(435, e.tag))
    }
  }
  function ef(e, t) {
    var l = H0(e)
    t.forEach(function (a) {
      var n = Z0.bind(null, e, a)
      l.has(a) || (l.add(a), a.then(n, n))
    })
  }
  function rt(e, t) {
    var l = t.deletions
    if (l !== null)
      for (var a = 0; a < l.length; a++) {
        var n = l[a],
          u = e,
          f = t,
          s = f
        e: for (; s !== null; ) {
          switch (s.tag) {
            case 27:
              if (Al(s.type)) {
                ;(xe = s.stateNode), (lt = !1)
                break e
              }
              break
            case 5:
              ;(xe = s.stateNode), (lt = !1)
              break e
            case 3:
            case 4:
              ;(xe = s.stateNode.containerInfo), (lt = !0)
              break e
          }
          s = s.return
        }
        if (xe === null) throw Error(r(160))
        Is(u, f, n),
          (xe = null),
          (lt = !1),
          (u = n.alternate),
          u !== null && (u.return = null),
          (n.return = null)
      }
    if (t.subtreeFlags & 13878)
      for (t = t.child; t !== null; ) ed(t, e), (t = t.sibling)
  }
  var _t = null
  function ed(e, t) {
    var l = e.alternate,
      a = e.flags
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        rt(t, e),
          ot(e),
          a & 4 && (vl(3, e, e.return), Tn(3, e), vl(5, e, e.return))
        break
      case 1:
        rt(t, e),
          ot(e),
          a & 512 && (Ce || l === null || jt(l, l.return)),
          a & 64 &&
            Wt &&
            ((e = e.updateQueue),
            e !== null &&
              ((a = e.callbacks),
              a !== null &&
                ((l = e.shared.hiddenCallbacks),
                (e.shared.hiddenCallbacks = l === null ? a : l.concat(a)))))
        break
      case 26:
        var n = _t
        if (
          (rt(t, e),
          ot(e),
          a & 512 && (Ce || l === null || jt(l, l.return)),
          a & 4)
        ) {
          var u = l !== null ? l.memoizedState : null
          if (((a = e.memoizedState), l === null))
            if (a === null)
              if (e.stateNode === null) {
                e: {
                  ;(a = e.type),
                    (l = e.memoizedProps),
                    (n = n.ownerDocument || n)
                  t: switch (a) {
                    case "title":
                      ;(u = n.getElementsByTagName("title")[0]),
                        (!u ||
                          u[Ka] ||
                          u[Ve] ||
                          u.namespaceURI === "http://www.w3.org/2000/svg" ||
                          u.hasAttribute("itemprop")) &&
                          ((u = n.createElement(a)),
                          n.head.insertBefore(
                            u,
                            n.querySelector("head > title")
                          )),
                        Xe(u, a, l),
                        (u[Ve] = e),
                        Be(u),
                        (a = u)
                      break e
                    case "link":
                      var f = kd("link", "href", n).get(a + (l.href || ""))
                      if (f) {
                        for (var s = 0; s < f.length; s++)
                          if (
                            ((u = f[s]),
                            u.getAttribute("href") ===
                              (l.href == null || l.href === ""
                                ? null
                                : l.href) &&
                              u.getAttribute("rel") ===
                                (l.rel == null ? null : l.rel) &&
                              u.getAttribute("title") ===
                                (l.title == null ? null : l.title) &&
                              u.getAttribute("crossorigin") ===
                                (l.crossOrigin == null ? null : l.crossOrigin))
                          ) {
                            f.splice(s, 1)
                            break t
                          }
                      }
                      ;(u = n.createElement(a)),
                        Xe(u, a, l),
                        n.head.appendChild(u)
                      break
                    case "meta":
                      if (
                        (f = kd("meta", "content", n).get(
                          a + (l.content || "")
                        ))
                      ) {
                        for (s = 0; s < f.length; s++)
                          if (
                            ((u = f[s]),
                            u.getAttribute("content") ===
                              (l.content == null ? null : "" + l.content) &&
                              u.getAttribute("name") ===
                                (l.name == null ? null : l.name) &&
                              u.getAttribute("property") ===
                                (l.property == null ? null : l.property) &&
                              u.getAttribute("http-equiv") ===
                                (l.httpEquiv == null ? null : l.httpEquiv) &&
                              u.getAttribute("charset") ===
                                (l.charSet == null ? null : l.charSet))
                          ) {
                            f.splice(s, 1)
                            break t
                          }
                      }
                      ;(u = n.createElement(a)),
                        Xe(u, a, l),
                        n.head.appendChild(u)
                      break
                    default:
                      throw Error(r(468, a))
                  }
                  ;(u[Ve] = e), Be(u), (a = u)
                }
                e.stateNode = a
              } else $d(n, e.type, e.stateNode)
            else e.stateNode = Jd(n, a, e.memoizedProps)
          else
            u !== a
              ? (u === null
                  ? l.stateNode !== null &&
                    ((l = l.stateNode), l.parentNode.removeChild(l))
                  : u.count--,
                a === null
                  ? $d(n, e.type, e.stateNode)
                  : Jd(n, a, e.memoizedProps))
              : a === null &&
                e.stateNode !== null &&
                Wc(e, e.memoizedProps, l.memoizedProps)
        }
        break
      case 27:
        rt(t, e),
          ot(e),
          a & 512 && (Ce || l === null || jt(l, l.return)),
          l !== null && a & 4 && Wc(e, e.memoizedProps, l.memoizedProps)
        break
      case 5:
        if (
          (rt(t, e),
          ot(e),
          a & 512 && (Ce || l === null || jt(l, l.return)),
          e.flags & 32)
        ) {
          n = e.stateNode
          try {
            ca(n, "")
          } catch (M) {
            pe(e, e.return, M)
          }
        }
        a & 4 &&
          e.stateNode != null &&
          ((n = e.memoizedProps), Wc(e, n, l !== null ? l.memoizedProps : n)),
          a & 1024 && (Pc = !0)
        break
      case 6:
        if ((rt(t, e), ot(e), a & 4)) {
          if (e.stateNode === null) throw Error(r(162))
          ;(a = e.memoizedProps), (l = e.stateNode)
          try {
            l.nodeValue = a
          } catch (M) {
            pe(e, e.return, M)
          }
        }
        break
      case 3:
        if (
          ((li = null),
          (n = _t),
          (_t = ei(t.containerInfo)),
          rt(t, e),
          (_t = n),
          ot(e),
          a & 4 && l !== null && l.memoizedState.isDehydrated)
        )
          try {
            Yn(t.containerInfo)
          } catch (M) {
            pe(e, e.return, M)
          }
        Pc && ((Pc = !1), td(e))
        break
      case 4:
        ;(a = _t),
          (_t = ei(e.stateNode.containerInfo)),
          rt(t, e),
          ot(e),
          (_t = a)
        break
      case 12:
        rt(t, e), ot(e)
        break
      case 13:
        rt(t, e),
          ot(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) !=
              (l !== null && l.memoizedState !== null) &&
            (cf = zt()),
          a & 4 &&
            ((a = e.updateQueue),
            a !== null && ((e.updateQueue = null), ef(e, a)))
        break
      case 22:
        n = e.memoizedState !== null
        var y = l !== null && l.memoizedState !== null,
          A = Wt,
          D = Ce
        if (
          ((Wt = A || n),
          (Ce = D || y),
          rt(t, e),
          (Ce = D),
          (Wt = A),
          ot(e),
          a & 8192)
        )
          e: for (
            t = e.stateNode,
              t._visibility = n ? t._visibility & -2 : t._visibility | 1,
              n && (l === null || y || Wt || Ce || $l(e)),
              l = null,
              t = e;
            ;

          ) {
            if (t.tag === 5 || t.tag === 26) {
              if (l === null) {
                y = l = t
                try {
                  if (((u = y.stateNode), n))
                    (f = u.style),
                      typeof f.setProperty == "function"
                        ? f.setProperty("display", "none", "important")
                        : (f.display = "none")
                  else {
                    s = y.stateNode
                    var j = y.memoizedProps.style,
                      O =
                        j != null && j.hasOwnProperty("display")
                          ? j.display
                          : null
                    s.style.display =
                      O == null || typeof O == "boolean" ? "" : ("" + O).trim()
                  }
                } catch (M) {
                  pe(y, y.return, M)
                }
              }
            } else if (t.tag === 6) {
              if (l === null) {
                y = t
                try {
                  y.stateNode.nodeValue = n ? "" : y.memoizedProps
                } catch (M) {
                  pe(y, y.return, M)
                }
              }
            } else if (
              ((t.tag !== 22 && t.tag !== 23) ||
                t.memoizedState === null ||
                t === e) &&
              t.child !== null
            ) {
              ;(t.child.return = t), (t = t.child)
              continue
            }
            if (t === e) break e
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e
              l === t && (l = null), (t = t.return)
            }
            l === t && (l = null),
              (t.sibling.return = t.return),
              (t = t.sibling)
          }
        a & 4 &&
          ((a = e.updateQueue),
          a !== null &&
            ((l = a.retryQueue),
            l !== null && ((a.retryQueue = null), ef(e, l))))
        break
      case 19:
        rt(t, e),
          ot(e),
          a & 4 &&
            ((a = e.updateQueue),
            a !== null && ((e.updateQueue = null), ef(e, a)))
        break
      case 30:
        break
      case 21:
        break
      default:
        rt(t, e), ot(e)
    }
  }
  function ot(e) {
    var t = e.flags
    if (t & 2) {
      try {
        for (var l, a = e.return; a !== null; ) {
          if (Js(a)) {
            l = a
            break
          }
          a = a.return
        }
        if (l == null) throw Error(r(160))
        switch (l.tag) {
          case 27:
            var n = l.stateNode,
              u = Fc(e)
            Gu(e, u, n)
            break
          case 5:
            var f = l.stateNode
            l.flags & 32 && (ca(f, ""), (l.flags &= -33))
            var s = Fc(e)
            Gu(e, s, f)
            break
          case 3:
          case 4:
            var y = l.stateNode.containerInfo,
              A = Fc(e)
            Ic(e, A, y)
            break
          default:
            throw Error(r(161))
        }
      } catch (D) {
        pe(e, e.return, D)
      }
      e.flags &= -3
    }
    t & 4096 && (e.flags &= -4097)
  }
  function td(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e
        td(t),
          t.tag === 5 && t.flags & 1024 && t.stateNode.reset(),
          (e = e.sibling)
      }
  }
  function gl(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) Ws(e, t.alternate, t), (t = t.sibling)
  }
  function $l(e) {
    for (e = e.child; e !== null; ) {
      var t = e
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          vl(4, t, t.return), $l(t)
          break
        case 1:
          jt(t, t.return)
          var l = t.stateNode
          typeof l.componentWillUnmount == "function" && Vs(t, t.return, l),
            $l(t)
          break
        case 27:
          Un(t.stateNode)
        case 26:
        case 5:
          jt(t, t.return), $l(t)
          break
        case 22:
          t.memoizedState === null && $l(t)
          break
        case 30:
          $l(t)
          break
        default:
          $l(t)
      }
      e = e.sibling
    }
  }
  function pl(e, t, l) {
    for (l = l && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var a = t.alternate,
        n = e,
        u = t,
        f = u.flags
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          pl(n, u, l), Tn(4, u)
          break
        case 1:
          if (
            (pl(n, u, l),
            (a = u),
            (n = a.stateNode),
            typeof n.componentDidMount == "function")
          )
            try {
              n.componentDidMount()
            } catch (A) {
              pe(a, a.return, A)
            }
          if (((a = u), (n = a.updateQueue), n !== null)) {
            var s = a.stateNode
            try {
              var y = n.shared.hiddenCallbacks
              if (y !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < y.length; n++)
                  Co(y[n], s)
            } catch (A) {
              pe(a, a.return, A)
            }
          }
          l && f & 64 && Zs(u), xn(u, u.return)
          break
        case 27:
          ks(u)
        case 26:
        case 5:
          pl(n, u, l), l && a === null && f & 4 && Ks(u), xn(u, u.return)
          break
        case 12:
          pl(n, u, l)
          break
        case 13:
          pl(n, u, l), l && f & 4 && Ps(n, u)
          break
        case 22:
          u.memoizedState === null && pl(n, u, l), xn(u, u.return)
          break
        case 30:
          break
        default:
          pl(n, u, l)
      }
      t = t.sibling
    }
  }
  function tf(e, t) {
    var l = null
    e !== null &&
      e.memoizedState !== null &&
      e.memoizedState.cachePool !== null &&
      (l = e.memoizedState.cachePool.pool),
      (e = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (e = t.memoizedState.cachePool.pool),
      e !== l && (e != null && e.refCount++, l != null && fn(l))
  }
  function lf(e, t) {
    ;(e = null),
      t.alternate !== null && (e = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== e && (t.refCount++, e != null && fn(e))
  }
  function Ht(e, t, l, a) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) ld(e, t, l, a), (t = t.sibling)
  }
  function ld(e, t, l, a) {
    var n = t.flags
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Ht(e, t, l, a), n & 2048 && Tn(9, t)
        break
      case 1:
        Ht(e, t, l, a)
        break
      case 3:
        Ht(e, t, l, a),
          n & 2048 &&
            ((e = null),
            t.alternate !== null && (e = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== e && (t.refCount++, e != null && fn(e)))
        break
      case 12:
        if (n & 2048) {
          Ht(e, t, l, a), (e = t.stateNode)
          try {
            var u = t.memoizedProps,
              f = u.id,
              s = u.onPostCommit
            typeof s == "function" &&
              s(
                f,
                t.alternate === null ? "mount" : "update",
                e.passiveEffectDuration,
                -0
              )
          } catch (y) {
            pe(t, t.return, y)
          }
        } else Ht(e, t, l, a)
        break
      case 13:
        Ht(e, t, l, a)
        break
      case 23:
        break
      case 22:
        ;(u = t.stateNode),
          (f = t.alternate),
          t.memoizedState !== null
            ? u._visibility & 2
              ? Ht(e, t, l, a)
              : An(e, t)
            : u._visibility & 2
            ? Ht(e, t, l, a)
            : ((u._visibility |= 2),
              Oa(e, t, l, a, (t.subtreeFlags & 10256) !== 0)),
          n & 2048 && tf(f, t)
        break
      case 24:
        Ht(e, t, l, a), n & 2048 && lf(t.alternate, t)
        break
      default:
        Ht(e, t, l, a)
    }
  }
  function Oa(e, t, l, a, n) {
    for (n = n && (t.subtreeFlags & 10256) !== 0, t = t.child; t !== null; ) {
      var u = e,
        f = t,
        s = l,
        y = a,
        A = f.flags
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          Oa(u, f, s, y, n), Tn(8, f)
          break
        case 23:
          break
        case 22:
          var D = f.stateNode
          f.memoizedState !== null
            ? D._visibility & 2
              ? Oa(u, f, s, y, n)
              : An(u, f)
            : ((D._visibility |= 2), Oa(u, f, s, y, n)),
            n && A & 2048 && tf(f.alternate, f)
          break
        case 24:
          Oa(u, f, s, y, n), n && A & 2048 && lf(f.alternate, f)
          break
        default:
          Oa(u, f, s, y, n)
      }
      t = t.sibling
    }
  }
  function An(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var l = e,
          a = t,
          n = a.flags
        switch (a.tag) {
          case 22:
            An(l, a), n & 2048 && tf(a.alternate, a)
            break
          case 24:
            An(l, a), n & 2048 && lf(a.alternate, a)
            break
          default:
            An(l, a)
        }
        t = t.sibling
      }
  }
  var _n = 8192
  function Ra(e) {
    if (e.subtreeFlags & _n)
      for (e = e.child; e !== null; ) ad(e), (e = e.sibling)
  }
  function ad(e) {
    switch (e.tag) {
      case 26:
        Ra(e),
          e.flags & _n &&
            e.memoizedState !== null &&
            by(_t, e.memoizedState, e.memoizedProps)
        break
      case 5:
        Ra(e)
        break
      case 3:
      case 4:
        var t = _t
        ;(_t = ei(e.stateNode.containerInfo)), Ra(e), (_t = t)
        break
      case 22:
        e.memoizedState === null &&
          ((t = e.alternate),
          t !== null && t.memoizedState !== null
            ? ((t = _n), (_n = 16777216), Ra(e), (_n = t))
            : Ra(e))
        break
      default:
        Ra(e)
    }
  }
  function nd(e) {
    var t = e.alternate
    if (t !== null && ((e = t.child), e !== null)) {
      t.child = null
      do (t = e.sibling), (e.sibling = null), (e = t)
      while (e !== null)
    }
  }
  function On(e) {
    var t = e.deletions
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var a = t[l]
          ;(qe = a), id(a, e)
        }
      nd(e)
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) ud(e), (e = e.sibling)
  }
  function ud(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        On(e), e.flags & 2048 && vl(9, e, e.return)
        break
      case 3:
        On(e)
        break
      case 12:
        On(e)
        break
      case 22:
        var t = e.stateNode
        e.memoizedState !== null &&
        t._visibility & 2 &&
        (e.return === null || e.return.tag !== 13)
          ? ((t._visibility &= -3), Xu(e))
          : On(e)
        break
      default:
        On(e)
    }
  }
  function Xu(e) {
    var t = e.deletions
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var a = t[l]
          ;(qe = a), id(a, e)
        }
      nd(e)
    }
    for (e = e.child; e !== null; ) {
      switch (((t = e), t.tag)) {
        case 0:
        case 11:
        case 15:
          vl(8, t, t.return), Xu(t)
          break
        case 22:
          ;(l = t.stateNode),
            l._visibility & 2 && ((l._visibility &= -3), Xu(t))
          break
        default:
          Xu(t)
      }
      e = e.sibling
    }
  }
  function id(e, t) {
    for (; qe !== null; ) {
      var l = qe
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          vl(8, l, t)
          break
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var a = l.memoizedState.cachePool.pool
            a != null && a.refCount++
          }
          break
        case 24:
          fn(l.memoizedState.cache)
      }
      if (((a = l.child), a !== null)) (a.return = l), (qe = a)
      else
        e: for (l = e; qe !== null; ) {
          a = qe
          var n = a.sibling,
            u = a.return
          if ((Fs(a), a === l)) {
            qe = null
            break e
          }
          if (n !== null) {
            ;(n.return = u), (qe = n)
            break e
          }
          qe = u
        }
    }
  }
  var B0 = {
      getCacheForType: function (e) {
        var t = Ke(je),
          l = t.data.get(e)
        return l === void 0 && ((l = e()), t.data.set(e, l)), l
      },
    },
    L0 = typeof WeakMap == "function" ? WeakMap : Map,
    se = 0,
    Se = null,
    ue = null,
    ce = 0,
    de = 0,
    st = null,
    Sl = !1,
    Ma = !1,
    af = !1,
    It = 0,
    Re = 0,
    bl = 0,
    Wl = 0,
    nf = 0,
    Tt = 0,
    Da = 0,
    Rn = null,
    at = null,
    uf = !1,
    cf = 0,
    Qu = 1 / 0,
    Zu = null,
    El = null,
    Ge = 0,
    Tl = null,
    Ca = null,
    za = 0,
    ff = 0,
    rf = null,
    cd = null,
    Mn = 0,
    of = null
  function dt() {
    if ((se & 2) !== 0 && ce !== 0) return ce & -ce
    if (C.T !== null) {
      var e = pa
      return e !== 0 ? e : gf()
    }
    return Tr()
  }
  function fd() {
    Tt === 0 && (Tt = (ce & 536870912) === 0 || oe ? pr() : 536870912)
    var e = Et.current
    return e !== null && (e.flags |= 32), Tt
  }
  function ht(e, t, l) {
    ;((e === Se && (de === 2 || de === 9)) || e.cancelPendingCommit !== null) &&
      (Ua(e, 0), xl(e, ce, Tt, !1)),
      Va(e, l),
      ((se & 2) === 0 || e !== Se) &&
        (e === Se &&
          ((se & 2) === 0 && (Wl |= l), Re === 4 && xl(e, ce, Tt, !1)),
        Bt(e))
  }
  function rd(e, t, l) {
    if ((se & 6) !== 0) throw Error(r(327))
    var a = (!l && (t & 124) === 0 && (t & e.expiredLanes) === 0) || Za(e, t),
      n = a ? Y0(e, t) : hf(e, t, !0),
      u = a
    do {
      if (n === 0) {
        Ma && !a && xl(e, t, 0, !1)
        break
      } else {
        if (((l = e.current.alternate), u && !q0(l))) {
          ;(n = hf(e, t, !1)), (u = !1)
          continue
        }
        if (n === 2) {
          if (((u = t), e.errorRecoveryDisabledLanes & u)) var f = 0
          else
            (f = e.pendingLanes & -536870913),
              (f = f !== 0 ? f : f & 536870912 ? 536870912 : 0)
          if (f !== 0) {
            t = f
            e: {
              var s = e
              n = Rn
              var y = s.current.memoizedState.isDehydrated
              if ((y && (Ua(s, f).flags |= 256), (f = hf(s, f, !1)), f !== 2)) {
                if (af && !y) {
                  ;(s.errorRecoveryDisabledLanes |= u), (Wl |= u), (n = 4)
                  break e
                }
                ;(u = at),
                  (at = n),
                  u !== null && (at === null ? (at = u) : at.push.apply(at, u))
              }
              n = f
            }
            if (((u = !1), n !== 2)) continue
          }
        }
        if (n === 1) {
          Ua(e, 0), xl(e, t, 0, !0)
          break
        }
        e: {
          switch (((a = e), (u = n), u)) {
            case 0:
            case 1:
              throw Error(r(345))
            case 4:
              if ((t & 4194048) !== t) break
            case 6:
              xl(a, t, Tt, !Sl)
              break e
            case 2:
              at = null
              break
            case 3:
            case 5:
              break
            default:
              throw Error(r(329))
          }
          if ((t & 62914560) === t && ((n = cf + 300 - zt()), 10 < n)) {
            if ((xl(a, t, Tt, !Sl), tu(a, 0, !0) !== 0)) break e
            a.timeoutHandle = qd(
              od.bind(null, a, l, at, Zu, uf, t, Tt, Wl, Da, Sl, u, 2, -0, 0),
              n
            )
            break e
          }
          od(a, l, at, Zu, uf, t, Tt, Wl, Da, Sl, u, 0, -0, 0)
        }
      }
      break
    } while (!0)
    Bt(e)
  }
  function od(e, t, l, a, n, u, f, s, y, A, D, j, O, M) {
    if (
      ((e.timeoutHandle = -1),
      (j = t.subtreeFlags),
      (j & 8192 || (j & 16785408) === 16785408) &&
        ((Hn = { stylesheets: null, count: 0, unsuspend: Sy }),
        ad(t),
        (j = Ey()),
        j !== null))
    ) {
      ;(e.cancelPendingCommit = j(
        gd.bind(null, e, t, u, l, a, n, f, s, y, D, 1, O, M)
      )),
        xl(e, u, f, !A)
      return
    }
    gd(e, t, u, l, a, n, f, s, y)
  }
  function q0(e) {
    for (var t = e; ; ) {
      var l = t.tag
      if (
        (l === 0 || l === 11 || l === 15) &&
        t.flags & 16384 &&
        ((l = t.updateQueue), l !== null && ((l = l.stores), l !== null))
      )
        for (var a = 0; a < l.length; a++) {
          var n = l[a],
            u = n.getSnapshot
          n = n.value
          try {
            if (!ct(u(), n)) return !1
          } catch {
            return !1
          }
        }
      if (((l = t.child), t.subtreeFlags & 16384 && l !== null))
        (l.return = t), (t = l)
      else {
        if (t === e) break
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0
          t = t.return
        }
        ;(t.sibling.return = t.return), (t = t.sibling)
      }
    }
    return !0
  }
  function xl(e, t, l, a) {
    ;(t &= ~nf),
      (t &= ~Wl),
      (e.suspendedLanes |= t),
      (e.pingedLanes &= ~t),
      a && (e.warmLanes |= t),
      (a = e.expirationTimes)
    for (var n = t; 0 < n; ) {
      var u = 31 - it(n),
        f = 1 << u
      ;(a[u] = -1), (n &= ~f)
    }
    l !== 0 && br(e, l, t)
  }
  function Vu() {
    return (se & 6) === 0 ? (Dn(0), !1) : !0
  }
  function sf() {
    if (ue !== null) {
      if (de === 0) var e = ue.return
      else (e = ue), (Zt = Zl = null), Rc(e), (Aa = null), (Sn = 0), (e = ue)
      for (; e !== null; ) Qs(e.alternate, e), (e = e.return)
      ue = null
    }
  }
  function Ua(e, t) {
    var l = e.timeoutHandle
    l !== -1 && ((e.timeoutHandle = -1), ly(l)),
      (l = e.cancelPendingCommit),
      l !== null && ((e.cancelPendingCommit = null), l()),
      sf(),
      (Se = e),
      (ue = l = Gt(e.current, null)),
      (ce = t),
      (de = 0),
      (st = null),
      (Sl = !1),
      (Ma = Za(e, t)),
      (af = !1),
      (Da = Tt = nf = Wl = bl = Re = 0),
      (at = Rn = null),
      (uf = !1),
      (t & 8) !== 0 && (t |= t & 32)
    var a = e.entangledLanes
    if (a !== 0)
      for (e = e.entanglements, a &= t; 0 < a; ) {
        var n = 31 - it(a),
          u = 1 << n
        ;(t |= e[n]), (a &= ~u)
      }
    return (It = t), hu(), l
  }
  function sd(e, t) {
    ;(ae = null),
      (C.H = Uu),
      t === on || t === Tu
        ? ((t = Mo()), (de = 3))
        : t === _o
        ? ((t = Mo()), (de = 4))
        : (de =
            t === Ds
              ? 8
              : t !== null &&
                typeof t == "object" &&
                typeof t.then == "function"
              ? 6
              : 1),
      (st = t),
      ue === null && ((Re = 1), Lu(e, gt(t, e.current)))
  }
  function dd() {
    var e = C.H
    return (C.H = Uu), e === null ? Uu : e
  }
  function hd() {
    var e = C.A
    return (C.A = B0), e
  }
  function df() {
    ;(Re = 4),
      Sl || ((ce & 4194048) !== ce && Et.current !== null) || (Ma = !0),
      ((bl & 134217727) === 0 && (Wl & 134217727) === 0) ||
        Se === null ||
        xl(Se, ce, Tt, !1)
  }
  function hf(e, t, l) {
    var a = se
    se |= 2
    var n = dd(),
      u = hd()
    ;(Se !== e || ce !== t) && ((Zu = null), Ua(e, t)), (t = !1)
    var f = Re
    e: do
      try {
        if (de !== 0 && ue !== null) {
          var s = ue,
            y = st
          switch (de) {
            case 8:
              sf(), (f = 6)
              break e
            case 3:
            case 2:
            case 9:
            case 6:
              Et.current === null && (t = !0)
              var A = de
              if (((de = 0), (st = null), Na(e, s, y, A), l && Ma)) {
                f = 0
                break e
              }
              break
            default:
              ;(A = de), (de = 0), (st = null), Na(e, s, y, A)
          }
        }
        w0(), (f = Re)
        break
      } catch (D) {
        sd(e, D)
      }
    while (!0)
    return (
      t && e.shellSuspendCounter++,
      (Zt = Zl = null),
      (se = a),
      (C.H = n),
      (C.A = u),
      ue === null && ((Se = null), (ce = 0), hu()),
      f
    )
  }
  function w0() {
    for (; ue !== null; ) md(ue)
  }
  function Y0(e, t) {
    var l = se
    se |= 2
    var a = dd(),
      n = hd()
    Se !== e || ce !== t
      ? ((Zu = null), (Qu = zt() + 500), Ua(e, t))
      : (Ma = Za(e, t))
    e: do
      try {
        if (de !== 0 && ue !== null) {
          t = ue
          var u = st
          t: switch (de) {
            case 1:
              ;(de = 0), (st = null), Na(e, t, u, 1)
              break
            case 2:
            case 9:
              if (Oo(u)) {
                ;(de = 0), (st = null), yd(t)
                break
              }
              ;(t = function () {
                ;(de !== 2 && de !== 9) || Se !== e || (de = 7), Bt(e)
              }),
                u.then(t, t)
              break e
            case 3:
              de = 7
              break e
            case 4:
              de = 5
              break e
            case 7:
              Oo(u)
                ? ((de = 0), (st = null), yd(t))
                : ((de = 0), (st = null), Na(e, t, u, 7))
              break
            case 5:
              var f = null
              switch (ue.tag) {
                case 26:
                  f = ue.memoizedState
                case 5:
                case 27:
                  var s = ue
                  if (!f || Wd(f)) {
                    ;(de = 0), (st = null)
                    var y = s.sibling
                    if (y !== null) ue = y
                    else {
                      var A = s.return
                      A !== null ? ((ue = A), Ku(A)) : (ue = null)
                    }
                    break t
                  }
              }
              ;(de = 0), (st = null), Na(e, t, u, 5)
              break
            case 6:
              ;(de = 0), (st = null), Na(e, t, u, 6)
              break
            case 8:
              sf(), (Re = 6)
              break e
            default:
              throw Error(r(462))
          }
        }
        G0()
        break
      } catch (D) {
        sd(e, D)
      }
    while (!0)
    return (
      (Zt = Zl = null),
      (C.H = a),
      (C.A = n),
      (se = l),
      ue !== null ? 0 : ((Se = null), (ce = 0), hu(), Re)
    )
  }
  function G0() {
    for (; ue !== null && !rm(); ) md(ue)
  }
  function md(e) {
    var t = Gs(e.alternate, e, It)
    ;(e.memoizedProps = e.pendingProps), t === null ? Ku(e) : (ue = t)
  }
  function yd(e) {
    var t = e,
      l = t.alternate
    switch (t.tag) {
      case 15:
      case 0:
        t = Hs(l, t, t.pendingProps, t.type, void 0, ce)
        break
      case 11:
        t = Hs(l, t, t.pendingProps, t.type.render, t.ref, ce)
        break
      case 5:
        Rc(t)
      default:
        Qs(l, t), (t = ue = vo(t, It)), (t = Gs(l, t, It))
    }
    ;(e.memoizedProps = e.pendingProps), t === null ? Ku(e) : (ue = t)
  }
  function Na(e, t, l, a) {
    ;(Zt = Zl = null), Rc(t), (Aa = null), (Sn = 0)
    var n = t.return
    try {
      if (C0(e, n, t, l, ce)) {
        ;(Re = 1), Lu(e, gt(l, e.current)), (ue = null)
        return
      }
    } catch (u) {
      if (n !== null) throw ((ue = n), u)
      ;(Re = 1), Lu(e, gt(l, e.current)), (ue = null)
      return
    }
    t.flags & 32768
      ? (oe || a === 1
          ? (e = !0)
          : Ma || (ce & 536870912) !== 0
          ? (e = !1)
          : ((Sl = e = !0),
            (a === 2 || a === 9 || a === 3 || a === 6) &&
              ((a = Et.current),
              a !== null && a.tag === 13 && (a.flags |= 16384))),
        vd(t, e))
      : Ku(t)
  }
  function Ku(e) {
    var t = e
    do {
      if ((t.flags & 32768) !== 0) {
        vd(t, Sl)
        return
      }
      e = t.return
      var l = U0(t.alternate, t, It)
      if (l !== null) {
        ue = l
        return
      }
      if (((t = t.sibling), t !== null)) {
        ue = t
        return
      }
      ue = t = e
    } while (t !== null)
    Re === 0 && (Re = 5)
  }
  function vd(e, t) {
    do {
      var l = N0(e.alternate, e)
      if (l !== null) {
        ;(l.flags &= 32767), (ue = l)
        return
      }
      if (
        ((l = e.return),
        l !== null &&
          ((l.flags |= 32768), (l.subtreeFlags = 0), (l.deletions = null)),
        !t && ((e = e.sibling), e !== null))
      ) {
        ue = e
        return
      }
      ue = e = l
    } while (e !== null)
    ;(Re = 6), (ue = null)
  }
  function gd(e, t, l, a, n, u, f, s, y) {
    e.cancelPendingCommit = null
    do Ju()
    while (Ge !== 0)
    if ((se & 6) !== 0) throw Error(r(327))
    if (t !== null) {
      if (t === e.current) throw Error(r(177))
      if (
        ((u = t.lanes | t.childLanes),
        (u |= lc),
        Sm(e, l, u, f, s, y),
        e === Se && ((ue = Se = null), (ce = 0)),
        (Ca = t),
        (Tl = e),
        (za = l),
        (ff = u),
        (rf = n),
        (cd = a),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            V0(In, function () {
              return Td(), null
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (a = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || a)
      ) {
        ;(a = C.T), (C.T = null), (n = X.p), (X.p = 2), (f = se), (se |= 4)
        try {
          j0(e, t, l)
        } finally {
          ;(se = f), (X.p = n), (C.T = a)
        }
      }
      ;(Ge = 1), pd(), Sd(), bd()
    }
  }
  function pd() {
    if (Ge === 1) {
      Ge = 0
      var e = Tl,
        t = Ca,
        l = (t.flags & 13878) !== 0
      if ((t.subtreeFlags & 13878) !== 0 || l) {
        ;(l = C.T), (C.T = null)
        var a = X.p
        X.p = 2
        var n = se
        se |= 4
        try {
          ed(t, e)
          var u = _f,
            f = uo(e.containerInfo),
            s = u.focusedElem,
            y = u.selectionRange
          if (
            f !== s &&
            s &&
            s.ownerDocument &&
            no(s.ownerDocument.documentElement, s)
          ) {
            if (y !== null && Fi(s)) {
              var A = y.start,
                D = y.end
              if ((D === void 0 && (D = A), "selectionStart" in s))
                (s.selectionStart = A),
                  (s.selectionEnd = Math.min(D, s.value.length))
              else {
                var j = s.ownerDocument || document,
                  O = (j && j.defaultView) || window
                if (O.getSelection) {
                  var M = O.getSelection(),
                    P = s.textContent.length,
                    W = Math.min(y.start, P),
                    ye = y.end === void 0 ? W : Math.min(y.end, P)
                  !M.extend && W > ye && ((f = ye), (ye = W), (W = f))
                  var E = ao(s, W),
                    p = ao(s, ye)
                  if (
                    E &&
                    p &&
                    (M.rangeCount !== 1 ||
                      M.anchorNode !== E.node ||
                      M.anchorOffset !== E.offset ||
                      M.focusNode !== p.node ||
                      M.focusOffset !== p.offset)
                  ) {
                    var x = j.createRange()
                    x.setStart(E.node, E.offset),
                      M.removeAllRanges(),
                      W > ye
                        ? (M.addRange(x), M.extend(p.node, p.offset))
                        : (x.setEnd(p.node, p.offset), M.addRange(x))
                  }
                }
              }
            }
            for (j = [], M = s; (M = M.parentNode); )
              M.nodeType === 1 &&
                j.push({ element: M, left: M.scrollLeft, top: M.scrollTop })
            for (
              typeof s.focus == "function" && s.focus(), s = 0;
              s < j.length;
              s++
            ) {
              var U = j[s]
              ;(U.element.scrollLeft = U.left), (U.element.scrollTop = U.top)
            }
          }
          ;(ui = !!Af), (_f = Af = null)
        } finally {
          ;(se = n), (X.p = a), (C.T = l)
        }
      }
      ;(e.current = t), (Ge = 2)
    }
  }
  function Sd() {
    if (Ge === 2) {
      Ge = 0
      var e = Tl,
        t = Ca,
        l = (t.flags & 8772) !== 0
      if ((t.subtreeFlags & 8772) !== 0 || l) {
        ;(l = C.T), (C.T = null)
        var a = X.p
        X.p = 2
        var n = se
        se |= 4
        try {
          Ws(e, t.alternate, t)
        } finally {
          ;(se = n), (X.p = a), (C.T = l)
        }
      }
      Ge = 3
    }
  }
  function bd() {
    if (Ge === 4 || Ge === 3) {
      ;(Ge = 0), om()
      var e = Tl,
        t = Ca,
        l = za,
        a = cd
      ;(t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (Ge = 5)
        : ((Ge = 0), (Ca = Tl = null), Ed(e, e.pendingLanes))
      var n = e.pendingLanes
      if (
        (n === 0 && (El = null),
        Ci(l),
        (t = t.stateNode),
        ut && typeof ut.onCommitFiberRoot == "function")
      )
        try {
          ut.onCommitFiberRoot(Qa, t, void 0, (t.current.flags & 128) === 128)
        } catch {}
      if (a !== null) {
        ;(t = C.T), (n = X.p), (X.p = 2), (C.T = null)
        try {
          for (var u = e.onRecoverableError, f = 0; f < a.length; f++) {
            var s = a[f]
            u(s.value, { componentStack: s.stack })
          }
        } finally {
          ;(C.T = t), (X.p = n)
        }
      }
      ;(za & 3) !== 0 && Ju(),
        Bt(e),
        (n = e.pendingLanes),
        (l & 4194090) !== 0 && (n & 42) !== 0
          ? e === of
            ? Mn++
            : ((Mn = 0), (of = e))
          : (Mn = 0),
        Dn(0)
    }
  }
  function Ed(e, t) {
    ;(e.pooledCacheLanes &= t) === 0 &&
      ((t = e.pooledCache), t != null && ((e.pooledCache = null), fn(t)))
  }
  function Ju(e) {
    return pd(), Sd(), bd(), Td()
  }
  function Td() {
    if (Ge !== 5) return !1
    var e = Tl,
      t = ff
    ff = 0
    var l = Ci(za),
      a = C.T,
      n = X.p
    try {
      ;(X.p = 32 > l ? 32 : l), (C.T = null), (l = rf), (rf = null)
      var u = Tl,
        f = za
      if (((Ge = 0), (Ca = Tl = null), (za = 0), (se & 6) !== 0))
        throw Error(r(331))
      var s = se
      if (
        ((se |= 4),
        ud(u.current),
        ld(u, u.current, f, l),
        (se = s),
        Dn(0, !1),
        ut && typeof ut.onPostCommitFiberRoot == "function")
      )
        try {
          ut.onPostCommitFiberRoot(Qa, u)
        } catch {}
      return !0
    } finally {
      ;(X.p = n), (C.T = a), Ed(e, t)
    }
  }
  function xd(e, t, l) {
    ;(t = gt(l, t)),
      (t = Gc(e.stateNode, t, 2)),
      (e = dl(e, t, 2)),
      e !== null && (Va(e, 2), Bt(e))
  }
  function pe(e, t, l) {
    if (e.tag === 3) xd(e, e, l)
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          xd(t, e, l)
          break
        } else if (t.tag === 1) {
          var a = t.stateNode
          if (
            typeof t.type.getDerivedStateFromError == "function" ||
            (typeof a.componentDidCatch == "function" &&
              (El === null || !El.has(a)))
          ) {
            ;(e = gt(l, e)),
              (l = Rs(2)),
              (a = dl(t, l, 2)),
              a !== null && (Ms(l, a, t, e), Va(a, 2), Bt(a))
            break
          }
        }
        t = t.return
      }
  }
  function mf(e, t, l) {
    var a = e.pingCache
    if (a === null) {
      a = e.pingCache = new L0()
      var n = new Set()
      a.set(t, n)
    } else (n = a.get(t)), n === void 0 && ((n = new Set()), a.set(t, n))
    n.has(l) ||
      ((af = !0), n.add(l), (e = X0.bind(null, e, t, l)), t.then(e, e))
  }
  function X0(e, t, l) {
    var a = e.pingCache
    a !== null && a.delete(t),
      (e.pingedLanes |= e.suspendedLanes & l),
      (e.warmLanes &= ~l),
      Se === e &&
        (ce & l) === l &&
        (Re === 4 || (Re === 3 && (ce & 62914560) === ce && 300 > zt() - cf)
          ? (se & 2) === 0 && Ua(e, 0)
          : (nf |= l),
        Da === ce && (Da = 0)),
      Bt(e)
  }
  function Ad(e, t) {
    t === 0 && (t = Sr()), (e = ma(e, t)), e !== null && (Va(e, t), Bt(e))
  }
  function Q0(e) {
    var t = e.memoizedState,
      l = 0
    t !== null && (l = t.retryLane), Ad(e, l)
  }
  function Z0(e, t) {
    var l = 0
    switch (e.tag) {
      case 13:
        var a = e.stateNode,
          n = e.memoizedState
        n !== null && (l = n.retryLane)
        break
      case 19:
        a = e.stateNode
        break
      case 22:
        a = e.stateNode._retryCache
        break
      default:
        throw Error(r(314))
    }
    a !== null && a.delete(t), Ad(e, l)
  }
  function V0(e, t) {
    return Oi(e, t)
  }
  var ku = null,
    ja = null,
    yf = !1,
    $u = !1,
    vf = !1,
    Fl = 0
  function Bt(e) {
    e !== ja &&
      e.next === null &&
      (ja === null ? (ku = ja = e) : (ja = ja.next = e)),
      ($u = !0),
      yf || ((yf = !0), J0())
  }
  function Dn(e, t) {
    if (!vf && $u) {
      vf = !0
      do
        for (var l = !1, a = ku; a !== null; ) {
          if (e !== 0) {
            var n = a.pendingLanes
            if (n === 0) var u = 0
            else {
              var f = a.suspendedLanes,
                s = a.pingedLanes
              ;(u = (1 << (31 - it(42 | e) + 1)) - 1),
                (u &= n & ~(f & ~s)),
                (u = u & 201326741 ? (u & 201326741) | 1 : u ? u | 2 : 0)
            }
            u !== 0 && ((l = !0), Md(a, u))
          } else
            (u = ce),
              (u = tu(
                a,
                a === Se ? u : 0,
                a.cancelPendingCommit !== null || a.timeoutHandle !== -1
              )),
              (u & 3) === 0 || Za(a, u) || ((l = !0), Md(a, u))
          a = a.next
        }
      while (l)
      vf = !1
    }
  }
  function K0() {
    _d()
  }
  function _d() {
    $u = yf = !1
    var e = 0
    Fl !== 0 && (ty() && (e = Fl), (Fl = 0))
    for (var t = zt(), l = null, a = ku; a !== null; ) {
      var n = a.next,
        u = Od(a, t)
      u === 0
        ? ((a.next = null),
          l === null ? (ku = n) : (l.next = n),
          n === null && (ja = l))
        : ((l = a), (e !== 0 || (u & 3) !== 0) && ($u = !0)),
        (a = n)
    }
    Dn(e)
  }
  function Od(e, t) {
    for (
      var l = e.suspendedLanes,
        a = e.pingedLanes,
        n = e.expirationTimes,
        u = e.pendingLanes & -62914561;
      0 < u;

    ) {
      var f = 31 - it(u),
        s = 1 << f,
        y = n[f]
      y === -1
        ? ((s & l) === 0 || (s & a) !== 0) && (n[f] = pm(s, t))
        : y <= t && (e.expiredLanes |= s),
        (u &= ~s)
    }
    if (
      ((t = Se),
      (l = ce),
      (l = tu(
        e,
        e === t ? l : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== -1
      )),
      (a = e.callbackNode),
      l === 0 ||
        (e === t && (de === 2 || de === 9)) ||
        e.cancelPendingCommit !== null)
    )
      return (
        a !== null && a !== null && Ri(a),
        (e.callbackNode = null),
        (e.callbackPriority = 0)
      )
    if ((l & 3) === 0 || Za(e, l)) {
      if (((t = l & -l), t === e.callbackPriority)) return t
      switch ((a !== null && Ri(a), Ci(l))) {
        case 2:
        case 8:
          l = vr
          break
        case 32:
          l = In
          break
        case 268435456:
          l = gr
          break
        default:
          l = In
      }
      return (
        (a = Rd.bind(null, e)),
        (l = Oi(l, a)),
        (e.callbackPriority = t),
        (e.callbackNode = l),
        t
      )
    }
    return (
      a !== null && a !== null && Ri(a),
      (e.callbackPriority = 2),
      (e.callbackNode = null),
      2
    )
  }
  function Rd(e, t) {
    if (Ge !== 0 && Ge !== 5)
      return (e.callbackNode = null), (e.callbackPriority = 0), null
    var l = e.callbackNode
    if (Ju() && e.callbackNode !== l) return null
    var a = ce
    return (
      (a = tu(
        e,
        e === Se ? a : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== -1
      )),
      a === 0
        ? null
        : (rd(e, a, t),
          Od(e, zt()),
          e.callbackNode != null && e.callbackNode === l
            ? Rd.bind(null, e)
            : null)
    )
  }
  function Md(e, t) {
    if (Ju()) return null
    rd(e, t, !0)
  }
  function J0() {
    ay(function () {
      ;(se & 6) !== 0 ? Oi(yr, K0) : _d()
    })
  }
  function gf() {
    return Fl === 0 && (Fl = pr()), Fl
  }
  function Dd(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean"
      ? null
      : typeof e == "function"
      ? e
      : iu("" + e)
  }
  function Cd(e, t) {
    var l = t.ownerDocument.createElement("input")
    return (
      (l.name = t.name),
      (l.value = t.value),
      e.id && l.setAttribute("form", e.id),
      t.parentNode.insertBefore(l, t),
      (e = new FormData(e)),
      l.parentNode.removeChild(l),
      e
    )
  }
  function k0(e, t, l, a, n) {
    if (t === "submit" && l && l.stateNode === n) {
      var u = Dd((n[Pe] || null).action),
        f = a.submitter
      f &&
        ((t = (t = f[Pe] || null)
          ? Dd(t.formAction)
          : f.getAttribute("formAction")),
        t !== null && ((u = t), (f = null)))
      var s = new ou("action", "action", null, a, n)
      e.push({
        event: s,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (a.defaultPrevented) {
                if (Fl !== 0) {
                  var y = f ? Cd(n, f) : new FormData(n)
                  Bc(
                    l,
                    { pending: !0, data: y, method: n.method, action: u },
                    null,
                    y
                  )
                }
              } else
                typeof u == "function" &&
                  (s.preventDefault(),
                  (y = f ? Cd(n, f) : new FormData(n)),
                  Bc(
                    l,
                    { pending: !0, data: y, method: n.method, action: u },
                    u,
                    y
                  ))
            },
            currentTarget: n,
          },
        ],
      })
    }
  }
  for (var pf = 0; pf < tc.length; pf++) {
    var Sf = tc[pf],
      $0 = Sf.toLowerCase(),
      W0 = Sf[0].toUpperCase() + Sf.slice(1)
    At($0, "on" + W0)
  }
  At(fo, "onAnimationEnd"),
    At(ro, "onAnimationIteration"),
    At(oo, "onAnimationStart"),
    At("dblclick", "onDoubleClick"),
    At("focusin", "onFocus"),
    At("focusout", "onBlur"),
    At(h0, "onTransitionRun"),
    At(m0, "onTransitionStart"),
    At(y0, "onTransitionCancel"),
    At(so, "onTransitionEnd"),
    na("onMouseEnter", ["mouseout", "mouseover"]),
    na("onMouseLeave", ["mouseout", "mouseover"]),
    na("onPointerEnter", ["pointerout", "pointerover"]),
    na("onPointerLeave", ["pointerout", "pointerover"]),
    Hl(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " "
      )
    ),
    Hl(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " "
      )
    ),
    Hl("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    Hl(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" ")
    ),
    Hl(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" ")
    ),
    Hl(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
    )
  var Cn =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " "
      ),
    F0 = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle"
        .split(" ")
        .concat(Cn)
    )
  function zd(e, t) {
    t = (t & 4) !== 0
    for (var l = 0; l < e.length; l++) {
      var a = e[l],
        n = a.event
      a = a.listeners
      e: {
        var u = void 0
        if (t)
          for (var f = a.length - 1; 0 <= f; f--) {
            var s = a[f],
              y = s.instance,
              A = s.currentTarget
            if (((s = s.listener), y !== u && n.isPropagationStopped())) break e
            ;(u = s), (n.currentTarget = A)
            try {
              u(n)
            } catch (D) {
              Bu(D)
            }
            ;(n.currentTarget = null), (u = y)
          }
        else
          for (f = 0; f < a.length; f++) {
            if (
              ((s = a[f]),
              (y = s.instance),
              (A = s.currentTarget),
              (s = s.listener),
              y !== u && n.isPropagationStopped())
            )
              break e
            ;(u = s), (n.currentTarget = A)
            try {
              u(n)
            } catch (D) {
              Bu(D)
            }
            ;(n.currentTarget = null), (u = y)
          }
      }
    }
  }
  function ie(e, t) {
    var l = t[zi]
    l === void 0 && (l = t[zi] = new Set())
    var a = e + "__bubble"
    l.has(a) || (Ud(t, e, 2, !1), l.add(a))
  }
  function bf(e, t, l) {
    var a = 0
    t && (a |= 4), Ud(l, e, a, t)
  }
  var Wu = "_reactListening" + Math.random().toString(36).slice(2)
  function Ef(e) {
    if (!e[Wu]) {
      ;(e[Wu] = !0),
        Ar.forEach(function (l) {
          l !== "selectionchange" && (F0.has(l) || bf(l, !1, e), bf(l, !0, e))
        })
      var t = e.nodeType === 9 ? e : e.ownerDocument
      t === null || t[Wu] || ((t[Wu] = !0), bf("selectionchange", !1, t))
    }
  }
  function Ud(e, t, l, a) {
    switch (lh(t)) {
      case 2:
        var n = Ay
        break
      case 8:
        n = _y
        break
      default:
        n = Hf
    }
    ;(l = n.bind(null, t, l, e)),
      (n = void 0),
      !Xi ||
        (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
        (n = !0),
      a
        ? n !== void 0
          ? e.addEventListener(t, l, { capture: !0, passive: n })
          : e.addEventListener(t, l, !0)
        : n !== void 0
        ? e.addEventListener(t, l, { passive: n })
        : e.addEventListener(t, l, !1)
  }
  function Tf(e, t, l, a, n) {
    var u = a
    if ((t & 1) === 0 && (t & 2) === 0 && a !== null)
      e: for (;;) {
        if (a === null) return
        var f = a.tag
        if (f === 3 || f === 4) {
          var s = a.stateNode.containerInfo
          if (s === n) break
          if (f === 4)
            for (f = a.return; f !== null; ) {
              var y = f.tag
              if ((y === 3 || y === 4) && f.stateNode.containerInfo === n)
                return
              f = f.return
            }
          for (; s !== null; ) {
            if (((f = ta(s)), f === null)) return
            if (((y = f.tag), y === 5 || y === 6 || y === 26 || y === 27)) {
              a = u = f
              continue e
            }
            s = s.parentNode
          }
        }
        a = a.return
      }
    qr(function () {
      var A = u,
        D = Yi(l),
        j = []
      e: {
        var O = ho.get(e)
        if (O !== void 0) {
          var M = ou,
            P = e
          switch (e) {
            case "keypress":
              if (fu(l) === 0) break e
            case "keydown":
            case "keyup":
              M = Vm
              break
            case "focusin":
              ;(P = "focus"), (M = Ki)
              break
            case "focusout":
              ;(P = "blur"), (M = Ki)
              break
            case "beforeblur":
            case "afterblur":
              M = Ki
              break
            case "click":
              if (l.button === 2) break e
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              M = Gr
              break
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              M = Nm
              break
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              M = km
              break
            case fo:
            case ro:
            case oo:
              M = Bm
              break
            case so:
              M = Wm
              break
            case "scroll":
            case "scrollend":
              M = zm
              break
            case "wheel":
              M = Im
              break
            case "copy":
            case "cut":
            case "paste":
              M = qm
              break
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              M = Qr
              break
            case "toggle":
            case "beforetoggle":
              M = e0
          }
          var W = (t & 4) !== 0,
            ye = !W && (e === "scroll" || e === "scrollend"),
            E = W ? (O !== null ? O + "Capture" : null) : O
          W = []
          for (var p = A, x; p !== null; ) {
            var U = p
            if (
              ((x = U.stateNode),
              (U = U.tag),
              (U !== 5 && U !== 26 && U !== 27) ||
                x === null ||
                E === null ||
                ((U = ka(p, E)), U != null && W.push(zn(p, U, x))),
              ye)
            )
              break
            p = p.return
          }
          0 < W.length &&
            ((O = new M(O, P, null, l, D)), j.push({ event: O, listeners: W }))
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((O = e === "mouseover" || e === "pointerover"),
            (M = e === "mouseout" || e === "pointerout"),
            O &&
              l !== wi &&
              (P = l.relatedTarget || l.fromElement) &&
              (ta(P) || P[ea]))
          )
            break e
          if (
            (M || O) &&
            ((O =
              D.window === D
                ? D
                : (O = D.ownerDocument)
                ? O.defaultView || O.parentWindow
                : window),
            M
              ? ((P = l.relatedTarget || l.toElement),
                (M = A),
                (P = P ? ta(P) : null),
                P !== null &&
                  ((ye = h(P)),
                  (W = P.tag),
                  P !== ye || (W !== 5 && W !== 27 && W !== 6)) &&
                  (P = null))
              : ((M = null), (P = A)),
            M !== P)
          ) {
            if (
              ((W = Gr),
              (U = "onMouseLeave"),
              (E = "onMouseEnter"),
              (p = "mouse"),
              (e === "pointerout" || e === "pointerover") &&
                ((W = Qr),
                (U = "onPointerLeave"),
                (E = "onPointerEnter"),
                (p = "pointer")),
              (ye = M == null ? O : Ja(M)),
              (x = P == null ? O : Ja(P)),
              (O = new W(U, p + "leave", M, l, D)),
              (O.target = ye),
              (O.relatedTarget = x),
              (U = null),
              ta(D) === A &&
                ((W = new W(E, p + "enter", P, l, D)),
                (W.target = x),
                (W.relatedTarget = ye),
                (U = W)),
              (ye = U),
              M && P)
            )
              t: {
                for (W = M, E = P, p = 0, x = W; x; x = Ha(x)) p++
                for (x = 0, U = E; U; U = Ha(U)) x++
                for (; 0 < p - x; ) (W = Ha(W)), p--
                for (; 0 < x - p; ) (E = Ha(E)), x--
                for (; p--; ) {
                  if (W === E || (E !== null && W === E.alternate)) break t
                  ;(W = Ha(W)), (E = Ha(E))
                }
                W = null
              }
            else W = null
            M !== null && Nd(j, O, M, W, !1),
              P !== null && ye !== null && Nd(j, ye, P, W, !0)
          }
        }
        e: {
          if (
            ((O = A ? Ja(A) : window),
            (M = O.nodeName && O.nodeName.toLowerCase()),
            M === "select" || (M === "input" && O.type === "file"))
          )
            var V = Fr
          else if ($r(O))
            if (Ir) V = o0
            else {
              V = f0
              var ne = c0
            }
          else
            (M = O.nodeName),
              !M ||
              M.toLowerCase() !== "input" ||
              (O.type !== "checkbox" && O.type !== "radio")
                ? A && qi(A.elementType) && (V = Fr)
                : (V = r0)
          if (V && (V = V(e, A))) {
            Wr(j, V, l, D)
            break e
          }
          ne && ne(e, O, A),
            e === "focusout" &&
              A &&
              O.type === "number" &&
              A.memoizedProps.value != null &&
              Li(O, "number", O.value)
        }
        switch (((ne = A ? Ja(A) : window), e)) {
          case "focusin":
            ;($r(ne) || ne.contentEditable === "true") &&
              ((sa = ne), (Ii = A), (ln = null))
            break
          case "focusout":
            ln = Ii = sa = null
            break
          case "mousedown":
            Pi = !0
            break
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ;(Pi = !1), io(j, l, D)
            break
          case "selectionchange":
            if (d0) break
          case "keydown":
          case "keyup":
            io(j, l, D)
        }
        var k
        if (ki)
          e: {
            switch (e) {
              case "compositionstart":
                var F = "onCompositionStart"
                break e
              case "compositionend":
                F = "onCompositionEnd"
                break e
              case "compositionupdate":
                F = "onCompositionUpdate"
                break e
            }
            F = void 0
          }
        else
          oa
            ? Jr(e, l) && (F = "onCompositionEnd")
            : e === "keydown" && l.keyCode === 229 && (F = "onCompositionStart")
        F &&
          (Zr &&
            l.locale !== "ko" &&
            (oa || F !== "onCompositionStart"
              ? F === "onCompositionEnd" && oa && (k = wr())
              : ((fl = D),
                (Qi = "value" in fl ? fl.value : fl.textContent),
                (oa = !0))),
          (ne = Fu(A, F)),
          0 < ne.length &&
            ((F = new Xr(F, e, null, l, D)),
            j.push({ event: F, listeners: ne }),
            k ? (F.data = k) : ((k = kr(l)), k !== null && (F.data = k)))),
          (k = l0 ? a0(e, l) : n0(e, l)) &&
            ((F = Fu(A, "onBeforeInput")),
            0 < F.length &&
              ((ne = new Xr("onBeforeInput", "beforeinput", null, l, D)),
              j.push({ event: ne, listeners: F }),
              (ne.data = k))),
          k0(j, e, A, l, D)
      }
      zd(j, t)
    })
  }
  function zn(e, t, l) {
    return { instance: e, listener: t, currentTarget: l }
  }
  function Fu(e, t) {
    for (var l = t + "Capture", a = []; e !== null; ) {
      var n = e,
        u = n.stateNode
      if (
        ((n = n.tag),
        (n !== 5 && n !== 26 && n !== 27) ||
          u === null ||
          ((n = ka(e, l)),
          n != null && a.unshift(zn(e, n, u)),
          (n = ka(e, t)),
          n != null && a.push(zn(e, n, u))),
        e.tag === 3)
      )
        return a
      e = e.return
    }
    return []
  }
  function Ha(e) {
    if (e === null) return null
    do e = e.return
    while (e && e.tag !== 5 && e.tag !== 27)
    return e || null
  }
  function Nd(e, t, l, a, n) {
    for (var u = t._reactName, f = []; l !== null && l !== a; ) {
      var s = l,
        y = s.alternate,
        A = s.stateNode
      if (((s = s.tag), y !== null && y === a)) break
      ;(s !== 5 && s !== 26 && s !== 27) ||
        A === null ||
        ((y = A),
        n
          ? ((A = ka(l, u)), A != null && f.unshift(zn(l, A, y)))
          : n || ((A = ka(l, u)), A != null && f.push(zn(l, A, y)))),
        (l = l.return)
    }
    f.length !== 0 && e.push({ event: t, listeners: f })
  }
  var I0 = /\r\n?/g,
    P0 = /\u0000|\uFFFD/g
  function jd(e) {
    return (typeof e == "string" ? e : "" + e)
      .replace(
        I0,
        `
`
      )
      .replace(P0, "")
  }
  function Hd(e, t) {
    return (t = jd(t)), jd(e) === t
  }
  function Iu() {}
  function me(e, t, l, a, n, u) {
    switch (l) {
      case "children":
        typeof a == "string"
          ? t === "body" || (t === "textarea" && a === "") || ca(e, a)
          : (typeof a == "number" || typeof a == "bigint") &&
            t !== "body" &&
            ca(e, "" + a)
        break
      case "className":
        au(e, "class", a)
        break
      case "tabIndex":
        au(e, "tabindex", a)
        break
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        au(e, l, a)
        break
      case "style":
        Br(e, a, u)
        break
      case "data":
        if (t !== "object") {
          au(e, "data", a)
          break
        }
      case "src":
      case "href":
        if (a === "" && (t !== "a" || l !== "href")) {
          e.removeAttribute(l)
          break
        }
        if (
          a == null ||
          typeof a == "function" ||
          typeof a == "symbol" ||
          typeof a == "boolean"
        ) {
          e.removeAttribute(l)
          break
        }
        ;(a = iu("" + a)), e.setAttribute(l, a)
        break
      case "action":
      case "formAction":
        if (typeof a == "function") {
          e.setAttribute(
            l,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          )
          break
        } else
          typeof u == "function" &&
            (l === "formAction"
              ? (t !== "input" && me(e, t, "name", n.name, n, null),
                me(e, t, "formEncType", n.formEncType, n, null),
                me(e, t, "formMethod", n.formMethod, n, null),
                me(e, t, "formTarget", n.formTarget, n, null))
              : (me(e, t, "encType", n.encType, n, null),
                me(e, t, "method", n.method, n, null),
                me(e, t, "target", n.target, n, null)))
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          e.removeAttribute(l)
          break
        }
        ;(a = iu("" + a)), e.setAttribute(l, a)
        break
      case "onClick":
        a != null && (e.onclick = Iu)
        break
      case "onScroll":
        a != null && ie("scroll", e)
        break
      case "onScrollEnd":
        a != null && ie("scrollend", e)
        break
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a)) throw Error(r(61))
          if (((l = a.__html), l != null)) {
            if (n.children != null) throw Error(r(60))
            e.innerHTML = l
          }
        }
        break
      case "multiple":
        e.multiple = a && typeof a != "function" && typeof a != "symbol"
        break
      case "muted":
        e.muted = a && typeof a != "function" && typeof a != "symbol"
        break
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break
      case "autoFocus":
        break
      case "xlinkHref":
        if (
          a == null ||
          typeof a == "function" ||
          typeof a == "boolean" ||
          typeof a == "symbol"
        ) {
          e.removeAttribute("xlink:href")
          break
        }
        ;(l = iu("" + a)),
          e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", l)
        break
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        a != null && typeof a != "function" && typeof a != "symbol"
          ? e.setAttribute(l, "" + a)
          : e.removeAttribute(l)
        break
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        a && typeof a != "function" && typeof a != "symbol"
          ? e.setAttribute(l, "")
          : e.removeAttribute(l)
        break
      case "capture":
      case "download":
        a === !0
          ? e.setAttribute(l, "")
          : a !== !1 &&
            a != null &&
            typeof a != "function" &&
            typeof a != "symbol"
          ? e.setAttribute(l, a)
          : e.removeAttribute(l)
        break
      case "cols":
      case "rows":
      case "size":
      case "span":
        a != null &&
        typeof a != "function" &&
        typeof a != "symbol" &&
        !isNaN(a) &&
        1 <= a
          ? e.setAttribute(l, a)
          : e.removeAttribute(l)
        break
      case "rowSpan":
      case "start":
        a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a)
          ? e.removeAttribute(l)
          : e.setAttribute(l, a)
        break
      case "popover":
        ie("beforetoggle", e), ie("toggle", e), lu(e, "popover", a)
        break
      case "xlinkActuate":
        wt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", a)
        break
      case "xlinkArcrole":
        wt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", a)
        break
      case "xlinkRole":
        wt(e, "http://www.w3.org/1999/xlink", "xlink:role", a)
        break
      case "xlinkShow":
        wt(e, "http://www.w3.org/1999/xlink", "xlink:show", a)
        break
      case "xlinkTitle":
        wt(e, "http://www.w3.org/1999/xlink", "xlink:title", a)
        break
      case "xlinkType":
        wt(e, "http://www.w3.org/1999/xlink", "xlink:type", a)
        break
      case "xmlBase":
        wt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", a)
        break
      case "xmlLang":
        wt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", a)
        break
      case "xmlSpace":
        wt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", a)
        break
      case "is":
        lu(e, "is", a)
        break
      case "innerText":
      case "textContent":
        break
      default:
        ;(!(2 < l.length) ||
          (l[0] !== "o" && l[0] !== "O") ||
          (l[1] !== "n" && l[1] !== "N")) &&
          ((l = Dm.get(l) || l), lu(e, l, a))
    }
  }
  function xf(e, t, l, a, n, u) {
    switch (l) {
      case "style":
        Br(e, a, u)
        break
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a)) throw Error(r(61))
          if (((l = a.__html), l != null)) {
            if (n.children != null) throw Error(r(60))
            e.innerHTML = l
          }
        }
        break
      case "children":
        typeof a == "string"
          ? ca(e, a)
          : (typeof a == "number" || typeof a == "bigint") && ca(e, "" + a)
        break
      case "onScroll":
        a != null && ie("scroll", e)
        break
      case "onScrollEnd":
        a != null && ie("scrollend", e)
        break
      case "onClick":
        a != null && (e.onclick = Iu)
        break
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break
      case "innerText":
      case "textContent":
        break
      default:
        if (!_r.hasOwnProperty(l))
          e: {
            if (
              l[0] === "o" &&
              l[1] === "n" &&
              ((n = l.endsWith("Capture")),
              (t = l.slice(2, n ? l.length - 7 : void 0)),
              (u = e[Pe] || null),
              (u = u != null ? u[l] : null),
              typeof u == "function" && e.removeEventListener(t, u, n),
              typeof a == "function")
            ) {
              typeof u != "function" &&
                u !== null &&
                (l in e
                  ? (e[l] = null)
                  : e.hasAttribute(l) && e.removeAttribute(l)),
                e.addEventListener(t, a, n)
              break e
            }
            l in e ? (e[l] = a) : a === !0 ? e.setAttribute(l, "") : lu(e, l, a)
          }
    }
  }
  function Xe(e, t, l) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break
      case "img":
        ie("error", e), ie("load", e)
        var a = !1,
          n = !1,
          u
        for (u in l)
          if (l.hasOwnProperty(u)) {
            var f = l[u]
            if (f != null)
              switch (u) {
                case "src":
                  a = !0
                  break
                case "srcSet":
                  n = !0
                  break
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(r(137, t))
                default:
                  me(e, t, u, f, l, null)
              }
          }
        n && me(e, t, "srcSet", l.srcSet, l, null),
          a && me(e, t, "src", l.src, l, null)
        return
      case "input":
        ie("invalid", e)
        var s = (u = f = n = null),
          y = null,
          A = null
        for (a in l)
          if (l.hasOwnProperty(a)) {
            var D = l[a]
            if (D != null)
              switch (a) {
                case "name":
                  n = D
                  break
                case "type":
                  f = D
                  break
                case "checked":
                  y = D
                  break
                case "defaultChecked":
                  A = D
                  break
                case "value":
                  u = D
                  break
                case "defaultValue":
                  s = D
                  break
                case "children":
                case "dangerouslySetInnerHTML":
                  if (D != null) throw Error(r(137, t))
                  break
                default:
                  me(e, t, a, D, l, null)
              }
          }
        Ur(e, u, s, y, A, f, n, !1), nu(e)
        return
      case "select":
        ie("invalid", e), (a = f = u = null)
        for (n in l)
          if (l.hasOwnProperty(n) && ((s = l[n]), s != null))
            switch (n) {
              case "value":
                u = s
                break
              case "defaultValue":
                f = s
                break
              case "multiple":
                a = s
              default:
                me(e, t, n, s, l, null)
            }
        ;(t = u),
          (l = f),
          (e.multiple = !!a),
          t != null ? ia(e, !!a, t, !1) : l != null && ia(e, !!a, l, !0)
        return
      case "textarea":
        ie("invalid", e), (u = n = a = null)
        for (f in l)
          if (l.hasOwnProperty(f) && ((s = l[f]), s != null))
            switch (f) {
              case "value":
                a = s
                break
              case "defaultValue":
                n = s
                break
              case "children":
                u = s
                break
              case "dangerouslySetInnerHTML":
                if (s != null) throw Error(r(91))
                break
              default:
                me(e, t, f, s, l, null)
            }
        jr(e, a, n, u), nu(e)
        return
      case "option":
        for (y in l)
          if (l.hasOwnProperty(y) && ((a = l[y]), a != null))
            switch (y) {
              case "selected":
                e.selected = a && typeof a != "function" && typeof a != "symbol"
                break
              default:
                me(e, t, y, a, l, null)
            }
        return
      case "dialog":
        ie("beforetoggle", e), ie("toggle", e), ie("cancel", e), ie("close", e)
        break
      case "iframe":
      case "object":
        ie("load", e)
        break
      case "video":
      case "audio":
        for (a = 0; a < Cn.length; a++) ie(Cn[a], e)
        break
      case "image":
        ie("error", e), ie("load", e)
        break
      case "details":
        ie("toggle", e)
        break
      case "embed":
      case "source":
      case "link":
        ie("error", e), ie("load", e)
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (A in l)
          if (l.hasOwnProperty(A) && ((a = l[A]), a != null))
            switch (A) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(r(137, t))
              default:
                me(e, t, A, a, l, null)
            }
        return
      default:
        if (qi(t)) {
          for (D in l)
            l.hasOwnProperty(D) &&
              ((a = l[D]), a !== void 0 && xf(e, t, D, a, l, void 0))
          return
        }
    }
    for (s in l)
      l.hasOwnProperty(s) && ((a = l[s]), a != null && me(e, t, s, a, l, null))
  }
  function ey(e, t, l, a) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break
      case "input":
        var n = null,
          u = null,
          f = null,
          s = null,
          y = null,
          A = null,
          D = null
        for (M in l) {
          var j = l[M]
          if (l.hasOwnProperty(M) && j != null)
            switch (M) {
              case "checked":
                break
              case "value":
                break
              case "defaultValue":
                y = j
              default:
                a.hasOwnProperty(M) || me(e, t, M, null, a, j)
            }
        }
        for (var O in a) {
          var M = a[O]
          if (((j = l[O]), a.hasOwnProperty(O) && (M != null || j != null)))
            switch (O) {
              case "type":
                u = M
                break
              case "name":
                n = M
                break
              case "checked":
                A = M
                break
              case "defaultChecked":
                D = M
                break
              case "value":
                f = M
                break
              case "defaultValue":
                s = M
                break
              case "children":
              case "dangerouslySetInnerHTML":
                if (M != null) throw Error(r(137, t))
                break
              default:
                M !== j && me(e, t, O, M, a, j)
            }
        }
        Bi(e, f, s, y, A, D, u, n)
        return
      case "select":
        M = f = s = O = null
        for (u in l)
          if (((y = l[u]), l.hasOwnProperty(u) && y != null))
            switch (u) {
              case "value":
                break
              case "multiple":
                M = y
              default:
                a.hasOwnProperty(u) || me(e, t, u, null, a, y)
            }
        for (n in a)
          if (
            ((u = a[n]),
            (y = l[n]),
            a.hasOwnProperty(n) && (u != null || y != null))
          )
            switch (n) {
              case "value":
                O = u
                break
              case "defaultValue":
                s = u
                break
              case "multiple":
                f = u
              default:
                u !== y && me(e, t, n, u, a, y)
            }
        ;(t = s),
          (l = f),
          (a = M),
          O != null
            ? ia(e, !!l, O, !1)
            : !!a != !!l &&
              (t != null ? ia(e, !!l, t, !0) : ia(e, !!l, l ? [] : "", !1))
        return
      case "textarea":
        M = O = null
        for (s in l)
          if (
            ((n = l[s]),
            l.hasOwnProperty(s) && n != null && !a.hasOwnProperty(s))
          )
            switch (s) {
              case "value":
                break
              case "children":
                break
              default:
                me(e, t, s, null, a, n)
            }
        for (f in a)
          if (
            ((n = a[f]),
            (u = l[f]),
            a.hasOwnProperty(f) && (n != null || u != null))
          )
            switch (f) {
              case "value":
                O = n
                break
              case "defaultValue":
                M = n
                break
              case "children":
                break
              case "dangerouslySetInnerHTML":
                if (n != null) throw Error(r(91))
                break
              default:
                n !== u && me(e, t, f, n, a, u)
            }
        Nr(e, O, M)
        return
      case "option":
        for (var P in l)
          if (
            ((O = l[P]),
            l.hasOwnProperty(P) && O != null && !a.hasOwnProperty(P))
          )
            switch (P) {
              case "selected":
                e.selected = !1
                break
              default:
                me(e, t, P, null, a, O)
            }
        for (y in a)
          if (
            ((O = a[y]),
            (M = l[y]),
            a.hasOwnProperty(y) && O !== M && (O != null || M != null))
          )
            switch (y) {
              case "selected":
                e.selected = O && typeof O != "function" && typeof O != "symbol"
                break
              default:
                me(e, t, y, O, a, M)
            }
        return
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var W in l)
          (O = l[W]),
            l.hasOwnProperty(W) &&
              O != null &&
              !a.hasOwnProperty(W) &&
              me(e, t, W, null, a, O)
        for (A in a)
          if (
            ((O = a[A]),
            (M = l[A]),
            a.hasOwnProperty(A) && O !== M && (O != null || M != null))
          )
            switch (A) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (O != null) throw Error(r(137, t))
                break
              default:
                me(e, t, A, O, a, M)
            }
        return
      default:
        if (qi(t)) {
          for (var ye in l)
            (O = l[ye]),
              l.hasOwnProperty(ye) &&
                O !== void 0 &&
                !a.hasOwnProperty(ye) &&
                xf(e, t, ye, void 0, a, O)
          for (D in a)
            (O = a[D]),
              (M = l[D]),
              !a.hasOwnProperty(D) ||
                O === M ||
                (O === void 0 && M === void 0) ||
                xf(e, t, D, O, a, M)
          return
        }
    }
    for (var E in l)
      (O = l[E]),
        l.hasOwnProperty(E) &&
          O != null &&
          !a.hasOwnProperty(E) &&
          me(e, t, E, null, a, O)
    for (j in a)
      (O = a[j]),
        (M = l[j]),
        !a.hasOwnProperty(j) ||
          O === M ||
          (O == null && M == null) ||
          me(e, t, j, O, a, M)
  }
  var Af = null,
    _f = null
  function Pu(e) {
    return e.nodeType === 9 ? e : e.ownerDocument
  }
  function Bd(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1
      case "http://www.w3.org/1998/Math/MathML":
        return 2
      default:
        return 0
    }
  }
  function Ld(e, t) {
    if (e === 0)
      switch (t) {
        case "svg":
          return 1
        case "math":
          return 2
        default:
          return 0
      }
    return e === 1 && t === "foreignObject" ? 0 : e
  }
  function Of(e, t) {
    return (
      e === "textarea" ||
      e === "noscript" ||
      typeof t.children == "string" ||
      typeof t.children == "number" ||
      typeof t.children == "bigint" ||
      (typeof t.dangerouslySetInnerHTML == "object" &&
        t.dangerouslySetInnerHTML !== null &&
        t.dangerouslySetInnerHTML.__html != null)
    )
  }
  var Rf = null
  function ty() {
    var e = window.event
    return e && e.type === "popstate"
      ? e === Rf
        ? !1
        : ((Rf = e), !0)
      : ((Rf = null), !1)
  }
  var qd = typeof setTimeout == "function" ? setTimeout : void 0,
    ly = typeof clearTimeout == "function" ? clearTimeout : void 0,
    wd = typeof Promise == "function" ? Promise : void 0,
    ay =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof wd < "u"
        ? function (e) {
            return wd.resolve(null).then(e).catch(ny)
          }
        : qd
  function ny(e) {
    setTimeout(function () {
      throw e
    })
  }
  function Al(e) {
    return e === "head"
  }
  function Yd(e, t) {
    var l = t,
      a = 0,
      n = 0
    do {
      var u = l.nextSibling
      if ((e.removeChild(l), u && u.nodeType === 8))
        if (((l = u.data), l === "/$")) {
          if (0 < a && 8 > a) {
            l = a
            var f = e.ownerDocument
            if ((l & 1 && Un(f.documentElement), l & 2 && Un(f.body), l & 4))
              for (l = f.head, Un(l), f = l.firstChild; f; ) {
                var s = f.nextSibling,
                  y = f.nodeName
                f[Ka] ||
                  y === "SCRIPT" ||
                  y === "STYLE" ||
                  (y === "LINK" && f.rel.toLowerCase() === "stylesheet") ||
                  l.removeChild(f),
                  (f = s)
              }
          }
          if (n === 0) {
            e.removeChild(u), Yn(t)
            return
          }
          n--
        } else
          l === "$" || l === "$?" || l === "$!"
            ? n++
            : (a = l.charCodeAt(0) - 48)
      else a = 0
      l = u
    } while (l)
    Yn(t)
  }
  function Mf(e) {
    var t = e.firstChild
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var l = t
      switch (((t = t.nextSibling), l.nodeName)) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Mf(l), Ui(l)
          continue
        case "SCRIPT":
        case "STYLE":
          continue
        case "LINK":
          if (l.rel.toLowerCase() === "stylesheet") continue
      }
      e.removeChild(l)
    }
  }
  function uy(e, t, l, a) {
    for (; e.nodeType === 1; ) {
      var n = l
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!a && (e.nodeName !== "INPUT" || e.type !== "hidden")) break
      } else if (a) {
        if (!e[Ka])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break
              return e
            case "link":
              if (
                ((u = e.getAttribute("rel")),
                u === "stylesheet" && e.hasAttribute("data-precedence"))
              )
                break
              if (
                u !== n.rel ||
                e.getAttribute("href") !==
                  (n.href == null || n.href === "" ? null : n.href) ||
                e.getAttribute("crossorigin") !==
                  (n.crossOrigin == null ? null : n.crossOrigin) ||
                e.getAttribute("title") !== (n.title == null ? null : n.title)
              )
                break
              return e
            case "style":
              if (e.hasAttribute("data-precedence")) break
              return e
            case "script":
              if (
                ((u = e.getAttribute("src")),
                (u !== (n.src == null ? null : n.src) ||
                  e.getAttribute("type") !== (n.type == null ? null : n.type) ||
                  e.getAttribute("crossorigin") !==
                    (n.crossOrigin == null ? null : n.crossOrigin)) &&
                  u &&
                  e.hasAttribute("async") &&
                  !e.hasAttribute("itemprop"))
              )
                break
              return e
            default:
              return e
          }
      } else if (t === "input" && e.type === "hidden") {
        var u = n.name == null ? null : "" + n.name
        if (n.type === "hidden" && e.getAttribute("name") === u) return e
      } else return e
      if (((e = Ot(e.nextSibling)), e === null)) break
    }
    return null
  }
  function iy(e, t, l) {
    if (t === "") return null
    for (; e.nodeType !== 3; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") &&
          !l) ||
        ((e = Ot(e.nextSibling)), e === null)
      )
        return null
    return e
  }
  function Df(e) {
    return (
      e.data === "$!" ||
      (e.data === "$?" && e.ownerDocument.readyState === "complete")
    )
  }
  function cy(e, t) {
    var l = e.ownerDocument
    if (e.data !== "$?" || l.readyState === "complete") t()
    else {
      var a = function () {
        t(), l.removeEventListener("DOMContentLoaded", a)
      }
      l.addEventListener("DOMContentLoaded", a), (e._reactRetry = a)
    }
  }
  function Ot(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType
      if (t === 1 || t === 3) break
      if (t === 8) {
        if (
          ((t = e.data),
          t === "$" || t === "$!" || t === "$?" || t === "F!" || t === "F")
        )
          break
        if (t === "/$") return null
      }
    }
    return e
  }
  var Cf = null
  function Gd(e) {
    e = e.previousSibling
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var l = e.data
        if (l === "$" || l === "$!" || l === "$?") {
          if (t === 0) return e
          t--
        } else l === "/$" && t++
      }
      e = e.previousSibling
    }
    return null
  }
  function Xd(e, t, l) {
    switch (((t = Pu(l)), e)) {
      case "html":
        if (((e = t.documentElement), !e)) throw Error(r(452))
        return e
      case "head":
        if (((e = t.head), !e)) throw Error(r(453))
        return e
      case "body":
        if (((e = t.body), !e)) throw Error(r(454))
        return e
      default:
        throw Error(r(451))
    }
  }
  function Un(e) {
    for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0])
    Ui(e)
  }
  var xt = new Map(),
    Qd = new Set()
  function ei(e) {
    return typeof e.getRootNode == "function"
      ? e.getRootNode()
      : e.nodeType === 9
      ? e
      : e.ownerDocument
  }
  var Pt = X.d
  X.d = { f: fy, r: ry, D: oy, C: sy, L: dy, m: hy, X: yy, S: my, M: vy }
  function fy() {
    var e = Pt.f(),
      t = Vu()
    return e || t
  }
  function ry(e) {
    var t = la(e)
    t !== null && t.tag === 5 && t.type === "form" ? rs(t) : Pt.r(e)
  }
  var Ba = typeof document > "u" ? null : document
  function Zd(e, t, l) {
    var a = Ba
    if (a && typeof t == "string" && t) {
      var n = vt(t)
      ;(n = 'link[rel="' + e + '"][href="' + n + '"]'),
        typeof l == "string" && (n += '[crossorigin="' + l + '"]'),
        Qd.has(n) ||
          (Qd.add(n),
          (e = { rel: e, crossOrigin: l, href: t }),
          a.querySelector(n) === null &&
            ((t = a.createElement("link")),
            Xe(t, "link", e),
            Be(t),
            a.head.appendChild(t)))
    }
  }
  function oy(e) {
    Pt.D(e), Zd("dns-prefetch", e, null)
  }
  function sy(e, t) {
    Pt.C(e, t), Zd("preconnect", e, t)
  }
  function dy(e, t, l) {
    Pt.L(e, t, l)
    var a = Ba
    if (a && e && t) {
      var n = 'link[rel="preload"][as="' + vt(t) + '"]'
      t === "image" && l && l.imageSrcSet
        ? ((n += '[imagesrcset="' + vt(l.imageSrcSet) + '"]'),
          typeof l.imageSizes == "string" &&
            (n += '[imagesizes="' + vt(l.imageSizes) + '"]'))
        : (n += '[href="' + vt(e) + '"]')
      var u = n
      switch (t) {
        case "style":
          u = La(e)
          break
        case "script":
          u = qa(e)
      }
      xt.has(u) ||
        ((e = _(
          {
            rel: "preload",
            href: t === "image" && l && l.imageSrcSet ? void 0 : e,
            as: t,
          },
          l
        )),
        xt.set(u, e),
        a.querySelector(n) !== null ||
          (t === "style" && a.querySelector(Nn(u))) ||
          (t === "script" && a.querySelector(jn(u))) ||
          ((t = a.createElement("link")),
          Xe(t, "link", e),
          Be(t),
          a.head.appendChild(t)))
    }
  }
  function hy(e, t) {
    Pt.m(e, t)
    var l = Ba
    if (l && e) {
      var a = t && typeof t.as == "string" ? t.as : "script",
        n =
          'link[rel="modulepreload"][as="' + vt(a) + '"][href="' + vt(e) + '"]',
        u = n
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = qa(e)
      }
      if (
        !xt.has(u) &&
        ((e = _({ rel: "modulepreload", href: e }, t)),
        xt.set(u, e),
        l.querySelector(n) === null)
      ) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector(jn(u))) return
        }
        ;(a = l.createElement("link")),
          Xe(a, "link", e),
          Be(a),
          l.head.appendChild(a)
      }
    }
  }
  function my(e, t, l) {
    Pt.S(e, t, l)
    var a = Ba
    if (a && e) {
      var n = aa(a).hoistableStyles,
        u = La(e)
      t = t || "default"
      var f = n.get(u)
      if (!f) {
        var s = { loading: 0, preload: null }
        if ((f = a.querySelector(Nn(u)))) s.loading = 5
        else {
          ;(e = _({ rel: "stylesheet", href: e, "data-precedence": t }, l)),
            (l = xt.get(u)) && zf(e, l)
          var y = (f = a.createElement("link"))
          Be(y),
            Xe(y, "link", e),
            (y._p = new Promise(function (A, D) {
              ;(y.onload = A), (y.onerror = D)
            })),
            y.addEventListener("load", function () {
              s.loading |= 1
            }),
            y.addEventListener("error", function () {
              s.loading |= 2
            }),
            (s.loading |= 4),
            ti(f, t, a)
        }
        ;(f = { type: "stylesheet", instance: f, count: 1, state: s }),
          n.set(u, f)
      }
    }
  }
  function yy(e, t) {
    Pt.X(e, t)
    var l = Ba
    if (l && e) {
      var a = aa(l).hoistableScripts,
        n = qa(e),
        u = a.get(n)
      u ||
        ((u = l.querySelector(jn(n))),
        u ||
          ((e = _({ src: e, async: !0 }, t)),
          (t = xt.get(n)) && Uf(e, t),
          (u = l.createElement("script")),
          Be(u),
          Xe(u, "link", e),
          l.head.appendChild(u)),
        (u = { type: "script", instance: u, count: 1, state: null }),
        a.set(n, u))
    }
  }
  function vy(e, t) {
    Pt.M(e, t)
    var l = Ba
    if (l && e) {
      var a = aa(l).hoistableScripts,
        n = qa(e),
        u = a.get(n)
      u ||
        ((u = l.querySelector(jn(n))),
        u ||
          ((e = _({ src: e, async: !0, type: "module" }, t)),
          (t = xt.get(n)) && Uf(e, t),
          (u = l.createElement("script")),
          Be(u),
          Xe(u, "link", e),
          l.head.appendChild(u)),
        (u = { type: "script", instance: u, count: 1, state: null }),
        a.set(n, u))
    }
  }
  function Vd(e, t, l, a) {
    var n = (n = ee.current) ? ei(n) : null
    if (!n) throw Error(r(446))
    switch (e) {
      case "meta":
      case "title":
        return null
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string"
          ? ((t = La(l.href)),
            (l = aa(n).hoistableStyles),
            (a = l.get(t)),
            a ||
              ((a = { type: "style", instance: null, count: 0, state: null }),
              l.set(t, a)),
            a)
          : { type: "void", instance: null, count: 0, state: null }
      case "link":
        if (
          l.rel === "stylesheet" &&
          typeof l.href == "string" &&
          typeof l.precedence == "string"
        ) {
          e = La(l.href)
          var u = aa(n).hoistableStyles,
            f = u.get(e)
          if (
            (f ||
              ((n = n.ownerDocument || n),
              (f = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              u.set(e, f),
              (u = n.querySelector(Nn(e))) &&
                !u._p &&
                ((f.instance = u), (f.state.loading = 5)),
              xt.has(e) ||
                ((l = {
                  rel: "preload",
                  as: "style",
                  href: l.href,
                  crossOrigin: l.crossOrigin,
                  integrity: l.integrity,
                  media: l.media,
                  hrefLang: l.hrefLang,
                  referrerPolicy: l.referrerPolicy,
                }),
                xt.set(e, l),
                u || gy(n, e, l, f.state))),
            t && a === null)
          )
            throw Error(r(528, ""))
          return f
        }
        if (t && a !== null) throw Error(r(529, ""))
        return null
      case "script":
        return (
          (t = l.async),
          (l = l.src),
          typeof l == "string" &&
          t &&
          typeof t != "function" &&
          typeof t != "symbol"
            ? ((t = qa(l)),
              (l = aa(n).hoistableScripts),
              (a = l.get(t)),
              a ||
                ((a = {
                  type: "script",
                  instance: null,
                  count: 0,
                  state: null,
                }),
                l.set(t, a)),
              a)
            : { type: "void", instance: null, count: 0, state: null }
        )
      default:
        throw Error(r(444, e))
    }
  }
  function La(e) {
    return 'href="' + vt(e) + '"'
  }
  function Nn(e) {
    return 'link[rel="stylesheet"][' + e + "]"
  }
  function Kd(e) {
    return _({}, e, { "data-precedence": e.precedence, precedence: null })
  }
  function gy(e, t, l, a) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]")
      ? (a.loading = 1)
      : ((t = e.createElement("link")),
        (a.preload = t),
        t.addEventListener("load", function () {
          return (a.loading |= 1)
        }),
        t.addEventListener("error", function () {
          return (a.loading |= 2)
        }),
        Xe(t, "link", l),
        Be(t),
        e.head.appendChild(t))
  }
  function qa(e) {
    return '[src="' + vt(e) + '"]'
  }
  function jn(e) {
    return "script[async]" + e
  }
  function Jd(e, t, l) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case "style":
          var a = e.querySelector('style[data-href~="' + vt(l.href) + '"]')
          if (a) return (t.instance = a), Be(a), a
          var n = _({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null,
          })
          return (
            (a = (e.ownerDocument || e).createElement("style")),
            Be(a),
            Xe(a, "style", n),
            ti(a, l.precedence, e),
            (t.instance = a)
          )
        case "stylesheet":
          n = La(l.href)
          var u = e.querySelector(Nn(n))
          if (u) return (t.state.loading |= 4), (t.instance = u), Be(u), u
          ;(a = Kd(l)),
            (n = xt.get(n)) && zf(a, n),
            (u = (e.ownerDocument || e).createElement("link")),
            Be(u)
          var f = u
          return (
            (f._p = new Promise(function (s, y) {
              ;(f.onload = s), (f.onerror = y)
            })),
            Xe(u, "link", a),
            (t.state.loading |= 4),
            ti(u, l.precedence, e),
            (t.instance = u)
          )
        case "script":
          return (
            (u = qa(l.src)),
            (n = e.querySelector(jn(u)))
              ? ((t.instance = n), Be(n), n)
              : ((a = l),
                (n = xt.get(u)) && ((a = _({}, l)), Uf(a, n)),
                (e = e.ownerDocument || e),
                (n = e.createElement("script")),
                Be(n),
                Xe(n, "link", a),
                e.head.appendChild(n),
                (t.instance = n))
          )
        case "void":
          return null
        default:
          throw Error(r(443, t.type))
      }
    else
      t.type === "stylesheet" &&
        (t.state.loading & 4) === 0 &&
        ((a = t.instance), (t.state.loading |= 4), ti(a, l.precedence, e))
    return t.instance
  }
  function ti(e, t, l) {
    for (
      var a = l.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]'
        ),
        n = a.length ? a[a.length - 1] : null,
        u = n,
        f = 0;
      f < a.length;
      f++
    ) {
      var s = a[f]
      if (s.dataset.precedence === t) u = s
      else if (u !== n) break
    }
    u
      ? u.parentNode.insertBefore(e, u.nextSibling)
      : ((t = l.nodeType === 9 ? l.head : l), t.insertBefore(e, t.firstChild))
  }
  function zf(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.title == null && (e.title = t.title)
  }
  function Uf(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.integrity == null && (e.integrity = t.integrity)
  }
  var li = null
  function kd(e, t, l) {
    if (li === null) {
      var a = new Map(),
        n = (li = new Map())
      n.set(l, a)
    } else (n = li), (a = n.get(l)), a || ((a = new Map()), n.set(l, a))
    if (a.has(e)) return a
    for (
      a.set(e, null), l = l.getElementsByTagName(e), n = 0;
      n < l.length;
      n++
    ) {
      var u = l[n]
      if (
        !(
          u[Ka] ||
          u[Ve] ||
          (e === "link" && u.getAttribute("rel") === "stylesheet")
        ) &&
        u.namespaceURI !== "http://www.w3.org/2000/svg"
      ) {
        var f = u.getAttribute(t) || ""
        f = e + f
        var s = a.get(f)
        s ? s.push(u) : a.set(f, [u])
      }
    }
    return a
  }
  function $d(e, t, l) {
    ;(e = e.ownerDocument || e),
      e.head.insertBefore(
        l,
        t === "title" ? e.querySelector("head > title") : null
      )
  }
  function py(e, t, l) {
    if (l === 1 || t.itemProp != null) return !1
    switch (e) {
      case "meta":
      case "title":
        return !0
      case "style":
        if (
          typeof t.precedence != "string" ||
          typeof t.href != "string" ||
          t.href === ""
        )
          break
        return !0
      case "link":
        if (
          typeof t.rel != "string" ||
          typeof t.href != "string" ||
          t.href === "" ||
          t.onLoad ||
          t.onError
        )
          break
        switch (t.rel) {
          case "stylesheet":
            return (
              (e = t.disabled), typeof t.precedence == "string" && e == null
            )
          default:
            return !0
        }
      case "script":
        if (
          t.async &&
          typeof t.async != "function" &&
          typeof t.async != "symbol" &&
          !t.onLoad &&
          !t.onError &&
          t.src &&
          typeof t.src == "string"
        )
          return !0
    }
    return !1
  }
  function Wd(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0)
  }
  var Hn = null
  function Sy() {}
  function by(e, t, l) {
    if (Hn === null) throw Error(r(475))
    var a = Hn
    if (
      t.type === "stylesheet" &&
      (typeof l.media != "string" || matchMedia(l.media).matches !== !1) &&
      (t.state.loading & 4) === 0
    ) {
      if (t.instance === null) {
        var n = La(l.href),
          u = e.querySelector(Nn(n))
        if (u) {
          ;(e = u._p),
            e !== null &&
              typeof e == "object" &&
              typeof e.then == "function" &&
              (a.count++, (a = ai.bind(a)), e.then(a, a)),
            (t.state.loading |= 4),
            (t.instance = u),
            Be(u)
          return
        }
        ;(u = e.ownerDocument || e),
          (l = Kd(l)),
          (n = xt.get(n)) && zf(l, n),
          (u = u.createElement("link")),
          Be(u)
        var f = u
        ;(f._p = new Promise(function (s, y) {
          ;(f.onload = s), (f.onerror = y)
        })),
          Xe(u, "link", l),
          (t.instance = u)
      }
      a.stylesheets === null && (a.stylesheets = new Map()),
        a.stylesheets.set(t, e),
        (e = t.state.preload) &&
          (t.state.loading & 3) === 0 &&
          (a.count++,
          (t = ai.bind(a)),
          e.addEventListener("load", t),
          e.addEventListener("error", t))
    }
  }
  function Ey() {
    if (Hn === null) throw Error(r(475))
    var e = Hn
    return (
      e.stylesheets && e.count === 0 && Nf(e, e.stylesheets),
      0 < e.count
        ? function (t) {
            var l = setTimeout(function () {
              if ((e.stylesheets && Nf(e, e.stylesheets), e.unsuspend)) {
                var a = e.unsuspend
                ;(e.unsuspend = null), a()
              }
            }, 6e4)
            return (
              (e.unsuspend = t),
              function () {
                ;(e.unsuspend = null), clearTimeout(l)
              }
            )
          }
        : null
    )
  }
  function ai() {
    if ((this.count--, this.count === 0)) {
      if (this.stylesheets) Nf(this, this.stylesheets)
      else if (this.unsuspend) {
        var e = this.unsuspend
        ;(this.unsuspend = null), e()
      }
    }
  }
  var ni = null
  function Nf(e, t) {
    ;(e.stylesheets = null),
      e.unsuspend !== null &&
        (e.count++, (ni = new Map()), t.forEach(Ty, e), (ni = null), ai.call(e))
  }
  function Ty(e, t) {
    if (!(t.state.loading & 4)) {
      var l = ni.get(e)
      if (l) var a = l.get(null)
      else {
        ;(l = new Map()), ni.set(e, l)
        for (
          var n = e.querySelectorAll(
              "link[data-precedence],style[data-precedence]"
            ),
            u = 0;
          u < n.length;
          u++
        ) {
          var f = n[u]
          ;(f.nodeName === "LINK" || f.getAttribute("media") !== "not all") &&
            (l.set(f.dataset.precedence, f), (a = f))
        }
        a && l.set(null, a)
      }
      ;(n = t.instance),
        (f = n.getAttribute("data-precedence")),
        (u = l.get(f) || a),
        u === a && l.set(null, n),
        l.set(f, n),
        this.count++,
        (a = ai.bind(this)),
        n.addEventListener("load", a),
        n.addEventListener("error", a),
        u
          ? u.parentNode.insertBefore(n, u.nextSibling)
          : ((e = e.nodeType === 9 ? e.head : e),
            e.insertBefore(n, e.firstChild)),
        (t.state.loading |= 4)
    }
  }
  var Bn = {
    $$typeof: Y,
    Provider: null,
    Consumer: null,
    _currentValue: I,
    _currentValue2: I,
    _threadCount: 0,
  }
  function xy(e, t, l, a, n, u, f, s) {
    ;(this.tag = 1),
      (this.containerInfo = e),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = Mi(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Mi(0)),
      (this.hiddenUpdates = Mi(null)),
      (this.identifierPrefix = a),
      (this.onUncaughtError = n),
      (this.onCaughtError = u),
      (this.onRecoverableError = f),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = s),
      (this.incompleteTransitions = new Map())
  }
  function Fd(e, t, l, a, n, u, f, s, y, A, D, j) {
    return (
      (e = new xy(e, t, l, f, s, y, A, j)),
      (t = 1),
      u === !0 && (t |= 24),
      (u = ft(3, null, null, t)),
      (e.current = u),
      (u.stateNode = e),
      (t = hc()),
      t.refCount++,
      (e.pooledCache = t),
      t.refCount++,
      (u.memoizedState = { element: a, isDehydrated: l, cache: t }),
      gc(u),
      e
    )
  }
  function Id(e) {
    return e ? ((e = ya), e) : ya
  }
  function Pd(e, t, l, a, n, u) {
    ;(n = Id(n)),
      a.context === null ? (a.context = n) : (a.pendingContext = n),
      (a = sl(t)),
      (a.payload = { element: l }),
      (u = u === void 0 ? null : u),
      u !== null && (a.callback = u),
      (l = dl(e, a, t)),
      l !== null && (ht(l, e, t), dn(l, e, t))
  }
  function eh(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var l = e.retryLane
      e.retryLane = l !== 0 && l < t ? l : t
    }
  }
  function jf(e, t) {
    eh(e, t), (e = e.alternate) && eh(e, t)
  }
  function th(e) {
    if (e.tag === 13) {
      var t = ma(e, 67108864)
      t !== null && ht(t, e, 67108864), jf(e, 67108864)
    }
  }
  var ui = !0
  function Ay(e, t, l, a) {
    var n = C.T
    C.T = null
    var u = X.p
    try {
      ;(X.p = 2), Hf(e, t, l, a)
    } finally {
      ;(X.p = u), (C.T = n)
    }
  }
  function _y(e, t, l, a) {
    var n = C.T
    C.T = null
    var u = X.p
    try {
      ;(X.p = 8), Hf(e, t, l, a)
    } finally {
      ;(X.p = u), (C.T = n)
    }
  }
  function Hf(e, t, l, a) {
    if (ui) {
      var n = Bf(a)
      if (n === null) Tf(e, t, a, ii, l), ah(e, a)
      else if (Ry(n, e, t, l, a)) a.stopPropagation()
      else if ((ah(e, a), t & 4 && -1 < Oy.indexOf(e))) {
        for (; n !== null; ) {
          var u = la(n)
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (((u = u.stateNode), u.current.memoizedState.isDehydrated)) {
                  var f = jl(u.pendingLanes)
                  if (f !== 0) {
                    var s = u
                    for (s.pendingLanes |= 2, s.entangledLanes |= 2; f; ) {
                      var y = 1 << (31 - it(f))
                      ;(s.entanglements[1] |= y), (f &= ~y)
                    }
                    Bt(u), (se & 6) === 0 && ((Qu = zt() + 500), Dn(0))
                  }
                }
                break
              case 13:
                ;(s = ma(u, 2)), s !== null && ht(s, u, 2), Vu(), jf(u, 2)
            }
          if (((u = Bf(a)), u === null && Tf(e, t, a, ii, l), u === n)) break
          n = u
        }
        n !== null && a.stopPropagation()
      } else Tf(e, t, a, null, l)
    }
  }
  function Bf(e) {
    return (e = Yi(e)), Lf(e)
  }
  var ii = null
  function Lf(e) {
    if (((ii = null), (e = ta(e)), e !== null)) {
      var t = h(e)
      if (t === null) e = null
      else {
        var l = t.tag
        if (l === 13) {
          if (((e = b(t)), e !== null)) return e
          e = null
        } else if (l === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null
          e = null
        } else t !== e && (e = null)
      }
    }
    return (ii = e), null
  }
  function lh(e) {
    switch (e) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8
      case "message":
        switch (sm()) {
          case yr:
            return 2
          case vr:
            return 8
          case In:
          case dm:
            return 32
          case gr:
            return 268435456
          default:
            return 32
        }
      default:
        return 32
    }
  }
  var qf = !1,
    _l = null,
    Ol = null,
    Rl = null,
    Ln = new Map(),
    qn = new Map(),
    Ml = [],
    Oy =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " "
      )
  function ah(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        _l = null
        break
      case "dragenter":
      case "dragleave":
        Ol = null
        break
      case "mouseover":
      case "mouseout":
        Rl = null
        break
      case "pointerover":
      case "pointerout":
        Ln.delete(t.pointerId)
        break
      case "gotpointercapture":
      case "lostpointercapture":
        qn.delete(t.pointerId)
    }
  }
  function wn(e, t, l, a, n, u) {
    return e === null || e.nativeEvent !== u
      ? ((e = {
          blockedOn: t,
          domEventName: l,
          eventSystemFlags: a,
          nativeEvent: u,
          targetContainers: [n],
        }),
        t !== null && ((t = la(t)), t !== null && th(t)),
        e)
      : ((e.eventSystemFlags |= a),
        (t = e.targetContainers),
        n !== null && t.indexOf(n) === -1 && t.push(n),
        e)
  }
  function Ry(e, t, l, a, n) {
    switch (t) {
      case "focusin":
        return (_l = wn(_l, e, t, l, a, n)), !0
      case "dragenter":
        return (Ol = wn(Ol, e, t, l, a, n)), !0
      case "mouseover":
        return (Rl = wn(Rl, e, t, l, a, n)), !0
      case "pointerover":
        var u = n.pointerId
        return Ln.set(u, wn(Ln.get(u) || null, e, t, l, a, n)), !0
      case "gotpointercapture":
        return (
          (u = n.pointerId), qn.set(u, wn(qn.get(u) || null, e, t, l, a, n)), !0
        )
    }
    return !1
  }
  function nh(e) {
    var t = ta(e.target)
    if (t !== null) {
      var l = h(t)
      if (l !== null) {
        if (((t = l.tag), t === 13)) {
          if (((t = b(l)), t !== null)) {
            ;(e.blockedOn = t),
              bm(e.priority, function () {
                if (l.tag === 13) {
                  var a = dt()
                  a = Di(a)
                  var n = ma(l, a)
                  n !== null && ht(n, l, a), jf(l, a)
                }
              })
            return
          }
        } else if (t === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null
          return
        }
      }
    }
    e.blockedOn = null
  }
  function ci(e) {
    if (e.blockedOn !== null) return !1
    for (var t = e.targetContainers; 0 < t.length; ) {
      var l = Bf(e.nativeEvent)
      if (l === null) {
        l = e.nativeEvent
        var a = new l.constructor(l.type, l)
        ;(wi = a), l.target.dispatchEvent(a), (wi = null)
      } else return (t = la(l)), t !== null && th(t), (e.blockedOn = l), !1
      t.shift()
    }
    return !0
  }
  function uh(e, t, l) {
    ci(e) && l.delete(t)
  }
  function My() {
    ;(qf = !1),
      _l !== null && ci(_l) && (_l = null),
      Ol !== null && ci(Ol) && (Ol = null),
      Rl !== null && ci(Rl) && (Rl = null),
      Ln.forEach(uh),
      qn.forEach(uh)
  }
  function fi(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      qf ||
        ((qf = !0), i.unstable_scheduleCallback(i.unstable_NormalPriority, My)))
  }
  var ri = null
  function ih(e) {
    ri !== e &&
      ((ri = e),
      i.unstable_scheduleCallback(i.unstable_NormalPriority, function () {
        ri === e && (ri = null)
        for (var t = 0; t < e.length; t += 3) {
          var l = e[t],
            a = e[t + 1],
            n = e[t + 2]
          if (typeof a != "function") {
            if (Lf(a || l) === null) continue
            break
          }
          var u = la(l)
          u !== null &&
            (e.splice(t, 3),
            (t -= 3),
            Bc(u, { pending: !0, data: n, method: l.method, action: a }, a, n))
        }
      }))
  }
  function Yn(e) {
    function t(y) {
      return fi(y, e)
    }
    _l !== null && fi(_l, e),
      Ol !== null && fi(Ol, e),
      Rl !== null && fi(Rl, e),
      Ln.forEach(t),
      qn.forEach(t)
    for (var l = 0; l < Ml.length; l++) {
      var a = Ml[l]
      a.blockedOn === e && (a.blockedOn = null)
    }
    for (; 0 < Ml.length && ((l = Ml[0]), l.blockedOn === null); )
      nh(l), l.blockedOn === null && Ml.shift()
    if (((l = (e.ownerDocument || e).$$reactFormReplay), l != null))
      for (a = 0; a < l.length; a += 3) {
        var n = l[a],
          u = l[a + 1],
          f = n[Pe] || null
        if (typeof u == "function") f || ih(l)
        else if (f) {
          var s = null
          if (u && u.hasAttribute("formAction")) {
            if (((n = u), (f = u[Pe] || null))) s = f.formAction
            else if (Lf(n) !== null) continue
          } else s = f.action
          typeof s == "function" ? (l[a + 1] = s) : (l.splice(a, 3), (a -= 3)),
            ih(l)
        }
      }
  }
  function wf(e) {
    this._internalRoot = e
  }
  ;(oi.prototype.render = wf.prototype.render =
    function (e) {
      var t = this._internalRoot
      if (t === null) throw Error(r(409))
      var l = t.current,
        a = dt()
      Pd(l, a, e, t, null, null)
    }),
    (oi.prototype.unmount = wf.prototype.unmount =
      function () {
        var e = this._internalRoot
        if (e !== null) {
          this._internalRoot = null
          var t = e.containerInfo
          Pd(e.current, 2, null, e, null, null), Vu(), (t[ea] = null)
        }
      })
  function oi(e) {
    this._internalRoot = e
  }
  oi.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = Tr()
      e = { blockedOn: null, target: e, priority: t }
      for (var l = 0; l < Ml.length && t !== 0 && t < Ml[l].priority; l++);
      Ml.splice(l, 0, e), l === 0 && nh(e)
    }
  }
  var ch = c.version
  if (ch !== "19.1.0") throw Error(r(527, ch, "19.1.0"))
  X.findDOMNode = function (e) {
    var t = e._reactInternals
    if (t === void 0)
      throw typeof e.render == "function"
        ? Error(r(188))
        : ((e = Object.keys(e).join(",")), Error(r(268, e)))
    return (
      (e = v(t)),
      (e = e !== null ? m(e) : null),
      (e = e === null ? null : e.stateNode),
      e
    )
  }
  var Dy = {
    bundleType: 0,
    version: "19.1.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: C,
    reconcilerVersion: "19.1.0",
  }
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var si = __REACT_DEVTOOLS_GLOBAL_HOOK__
    if (!si.isDisabled && si.supportsFiber)
      try {
        ;(Qa = si.inject(Dy)), (ut = si)
      } catch {}
  }
  return (
    (Xn.createRoot = function (e, t) {
      if (!d(e)) throw Error(r(299))
      var l = !1,
        a = "",
        n = xs,
        u = As,
        f = _s,
        s = null
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (l = !0),
          t.identifierPrefix !== void 0 && (a = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (n = t.onUncaughtError),
          t.onCaughtError !== void 0 && (u = t.onCaughtError),
          t.onRecoverableError !== void 0 && (f = t.onRecoverableError),
          t.unstable_transitionCallbacks !== void 0 &&
            (s = t.unstable_transitionCallbacks)),
        (t = Fd(e, 1, !1, null, null, l, a, n, u, f, s, null)),
        (e[ea] = t.current),
        Ef(e),
        new wf(t)
      )
    }),
    (Xn.hydrateRoot = function (e, t, l) {
      if (!d(e)) throw Error(r(299))
      var a = !1,
        n = "",
        u = xs,
        f = As,
        s = _s,
        y = null,
        A = null
      return (
        l != null &&
          (l.unstable_strictMode === !0 && (a = !0),
          l.identifierPrefix !== void 0 && (n = l.identifierPrefix),
          l.onUncaughtError !== void 0 && (u = l.onUncaughtError),
          l.onCaughtError !== void 0 && (f = l.onCaughtError),
          l.onRecoverableError !== void 0 && (s = l.onRecoverableError),
          l.unstable_transitionCallbacks !== void 0 &&
            (y = l.unstable_transitionCallbacks),
          l.formState !== void 0 && (A = l.formState)),
        (t = Fd(e, 1, !0, t, l ?? null, a, n, u, f, s, y, A)),
        (t.context = Id(null)),
        (l = t.current),
        (a = dt()),
        (a = Di(a)),
        (n = sl(a)),
        (n.callback = null),
        dl(l, n, a),
        (l = a),
        (t.current.lanes = l),
        Va(t, l),
        Bt(t),
        (e[ea] = t.current),
        Ef(e),
        new oi(t)
      )
    }),
    (Xn.version = "19.1.0"),
    Xn
  )
}
var gh
function wy() {
  if (gh) return Gf.exports
  gh = 1
  function i() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i)
      } catch (c) {
        console.error(c)
      }
  }
  return i(), (Gf.exports = qy()), Gf.exports
}
var Yy = wy(),
  R = Si(),
  Qn = {},
  ph
function Gy() {
  if (ph) return Qn
  ;(ph = 1),
    Object.defineProperty(Qn, "__esModule", { value: !0 }),
    (Qn.parse = b),
    (Qn.serialize = m)
  const i = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/,
    c = /^[\u0021-\u003A\u003C-\u007E]*$/,
    o =
      /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,
    r = /^[\u0020-\u003A\u003D-\u007E]*$/,
    d = Object.prototype.toString,
    h = (() => {
      const z = function () {}
      return (z.prototype = Object.create(null)), z
    })()
  function b(z, w) {
    const N = new h(),
      Z = z.length
    if (Z < 2) return N
    const q = (w == null ? void 0 : w.decode) || _
    let L = 0
    do {
      const K = z.indexOf("=", L)
      if (K === -1) break
      const Y = z.indexOf(";", L),
        le = Y === -1 ? Z : Y
      if (K > le) {
        L = z.lastIndexOf(";", K - 1) + 1
        continue
      }
      const J = T(z, L, K),
        ve = v(z, K, J),
        be = z.slice(J, ve)
      if (N[be] === void 0) {
        let Me = T(z, K + 1, le),
          Ee = v(z, le, Me)
        const $e = q(z.slice(Me, Ee))
        N[be] = $e
      }
      L = le + 1
    } while (L < Z)
    return N
  }
  function T(z, w, N) {
    do {
      const Z = z.charCodeAt(w)
      if (Z !== 32 && Z !== 9) return w
    } while (++w < N)
    return N
  }
  function v(z, w, N) {
    for (; w > N; ) {
      const Z = z.charCodeAt(--w)
      if (Z !== 32 && Z !== 9) return w + 1
    }
    return N
  }
  function m(z, w, N) {
    const Z = (N == null ? void 0 : N.encode) || encodeURIComponent
    if (!i.test(z)) throw new TypeError(`argument name is invalid: ${z}`)
    const q = Z(w)
    if (!c.test(q)) throw new TypeError(`argument val is invalid: ${w}`)
    let L = z + "=" + q
    if (!N) return L
    if (N.maxAge !== void 0) {
      if (!Number.isInteger(N.maxAge))
        throw new TypeError(`option maxAge is invalid: ${N.maxAge}`)
      L += "; Max-Age=" + N.maxAge
    }
    if (N.domain) {
      if (!o.test(N.domain))
        throw new TypeError(`option domain is invalid: ${N.domain}`)
      L += "; Domain=" + N.domain
    }
    if (N.path) {
      if (!r.test(N.path))
        throw new TypeError(`option path is invalid: ${N.path}`)
      L += "; Path=" + N.path
    }
    if (N.expires) {
      if (!H(N.expires) || !Number.isFinite(N.expires.valueOf()))
        throw new TypeError(`option expires is invalid: ${N.expires}`)
      L += "; Expires=" + N.expires.toUTCString()
    }
    if (
      (N.httpOnly && (L += "; HttpOnly"),
      N.secure && (L += "; Secure"),
      N.partitioned && (L += "; Partitioned"),
      N.priority)
    )
      switch (
        typeof N.priority == "string" ? N.priority.toLowerCase() : void 0
      ) {
        case "low":
          L += "; Priority=Low"
          break
        case "medium":
          L += "; Priority=Medium"
          break
        case "high":
          L += "; Priority=High"
          break
        default:
          throw new TypeError(`option priority is invalid: ${N.priority}`)
      }
    if (N.sameSite)
      switch (
        typeof N.sameSite == "string" ? N.sameSite.toLowerCase() : N.sameSite
      ) {
        case !0:
        case "strict":
          L += "; SameSite=Strict"
          break
        case "lax":
          L += "; SameSite=Lax"
          break
        case "none":
          L += "; SameSite=None"
          break
        default:
          throw new TypeError(`option sameSite is invalid: ${N.sameSite}`)
      }
    return L
  }
  function _(z) {
    if (z.indexOf("%") === -1) return z
    try {
      return decodeURIComponent(z)
    } catch {
      return z
    }
  }
  function H(z) {
    return d.call(z) === "[object Date]"
  }
  return Qn
}
Gy()
var Sh = "popstate"
function Xy(i = {}) {
  function c(r, d) {
    let { pathname: h, search: b, hash: T } = r.location
    return Pf(
      "",
      { pathname: h, search: b, hash: T },
      (d.state && d.state.usr) || null,
      (d.state && d.state.key) || "default"
    )
  }
  function o(r, d) {
    return typeof d == "string" ? d : Vn(d)
  }
  return Zy(c, o, null, i)
}
function Ae(i, c) {
  if (i === !1 || i === null || typeof i > "u") throw new Error(c)
}
function Mt(i, c) {
  if (!i) {
    typeof console < "u" && console.warn(c)
    try {
      throw new Error(c)
    } catch {}
  }
}
function Qy() {
  return Math.random().toString(36).substring(2, 10)
}
function bh(i, c) {
  return { usr: i.state, key: i.key, idx: c }
}
function Pf(i, c, o = null, r) {
  return {
    pathname: typeof i == "string" ? i : i.pathname,
    search: "",
    hash: "",
    ...(typeof c == "string" ? Ya(c) : c),
    state: o,
    key: (c && c.key) || r || Qy(),
  }
}
function Vn({ pathname: i = "/", search: c = "", hash: o = "" }) {
  return (
    c && c !== "?" && (i += c.charAt(0) === "?" ? c : "?" + c),
    o && o !== "#" && (i += o.charAt(0) === "#" ? o : "#" + o),
    i
  )
}
function Ya(i) {
  let c = {}
  if (i) {
    let o = i.indexOf("#")
    o >= 0 && ((c.hash = i.substring(o)), (i = i.substring(0, o)))
    let r = i.indexOf("?")
    r >= 0 && ((c.search = i.substring(r)), (i = i.substring(0, r))),
      i && (c.pathname = i)
  }
  return c
}
function Zy(i, c, o, r = {}) {
  let { window: d = document.defaultView, v5Compat: h = !1 } = r,
    b = d.history,
    T = "POP",
    v = null,
    m = _()
  m == null && ((m = 0), b.replaceState({ ...b.state, idx: m }, ""))
  function _() {
    return (b.state || { idx: null }).idx
  }
  function H() {
    T = "POP"
    let q = _(),
      L = q == null ? null : q - m
    ;(m = q), v && v({ action: T, location: Z.location, delta: L })
  }
  function z(q, L) {
    T = "PUSH"
    let K = Pf(Z.location, q, L)
    m = _() + 1
    let Y = bh(K, m),
      le = Z.createHref(K)
    try {
      b.pushState(Y, "", le)
    } catch (J) {
      if (J instanceof DOMException && J.name === "DataCloneError") throw J
      d.location.assign(le)
    }
    h && v && v({ action: T, location: Z.location, delta: 1 })
  }
  function w(q, L) {
    T = "REPLACE"
    let K = Pf(Z.location, q, L)
    m = _()
    let Y = bh(K, m),
      le = Z.createHref(K)
    b.replaceState(Y, "", le),
      h && v && v({ action: T, location: Z.location, delta: 0 })
  }
  function N(q) {
    let L = d.location.origin !== "null" ? d.location.origin : d.location.href,
      K = typeof q == "string" ? q : Vn(q)
    return (
      (K = K.replace(/ $/, "%20")),
      Ae(
        L,
        `No window.location.(origin|href) available to create URL for href: ${K}`
      ),
      new URL(K, L)
    )
  }
  let Z = {
    get action() {
      return T
    },
    get location() {
      return i(d, b)
    },
    listen(q) {
      if (v) throw new Error("A history only accepts one active listener")
      return (
        d.addEventListener(Sh, H),
        (v = q),
        () => {
          d.removeEventListener(Sh, H), (v = null)
        }
      )
    },
    createHref(q) {
      return c(d, q)
    },
    createURL: N,
    encodeLocation(q) {
      let L = N(q)
      return { pathname: L.pathname, search: L.search, hash: L.hash }
    },
    push: z,
    replace: w,
    go(q) {
      return b.go(q)
    },
  }
  return Z
}
function Ch(i, c, o = "/") {
  return Vy(i, c, o, !1)
}
function Vy(i, c, o, r) {
  let d = typeof c == "string" ? Ya(c) : c,
    h = al(d.pathname || "/", o)
  if (h == null) return null
  let b = zh(i)
  Ky(b)
  let T = null
  for (let v = 0; T == null && v < b.length; ++v) {
    let m = av(h)
    T = tv(b[v], m, r)
  }
  return T
}
function zh(i, c = [], o = [], r = "") {
  let d = (h, b, T) => {
    let v = {
      relativePath: T === void 0 ? h.path || "" : T,
      caseSensitive: h.caseSensitive === !0,
      childrenIndex: b,
      route: h,
    }
    v.relativePath.startsWith("/") &&
      (Ae(
        v.relativePath.startsWith(r),
        `Absolute route path "${v.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ),
      (v.relativePath = v.relativePath.slice(r.length)))
    let m = ll([r, v.relativePath]),
      _ = o.concat(v)
    h.children &&
      h.children.length > 0 &&
      (Ae(
        h.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${m}".`
      ),
      zh(h.children, c, _, m)),
      !(h.path == null && !h.index) &&
        c.push({ path: m, score: Py(m, h.index), routesMeta: _ })
  }
  return (
    i.forEach((h, b) => {
      var T
      if (h.path === "" || !((T = h.path) != null && T.includes("?"))) d(h, b)
      else for (let v of Uh(h.path)) d(h, b, v)
    }),
    c
  )
}
function Uh(i) {
  let c = i.split("/")
  if (c.length === 0) return []
  let [o, ...r] = c,
    d = o.endsWith("?"),
    h = o.replace(/\?$/, "")
  if (r.length === 0) return d ? [h, ""] : [h]
  let b = Uh(r.join("/")),
    T = []
  return (
    T.push(...b.map((v) => (v === "" ? h : [h, v].join("/")))),
    d && T.push(...b),
    T.map((v) => (i.startsWith("/") && v === "" ? "/" : v))
  )
}
function Ky(i) {
  i.sort((c, o) =>
    c.score !== o.score
      ? o.score - c.score
      : ev(
          c.routesMeta.map((r) => r.childrenIndex),
          o.routesMeta.map((r) => r.childrenIndex)
        )
  )
}
var Jy = /^:[\w-]+$/,
  ky = 3,
  $y = 2,
  Wy = 1,
  Fy = 10,
  Iy = -2,
  Eh = (i) => i === "*"
function Py(i, c) {
  let o = i.split("/"),
    r = o.length
  return (
    o.some(Eh) && (r += Iy),
    c && (r += $y),
    o
      .filter((d) => !Eh(d))
      .reduce((d, h) => d + (Jy.test(h) ? ky : h === "" ? Wy : Fy), r)
  )
}
function ev(i, c) {
  return i.length === c.length && i.slice(0, -1).every((r, d) => r === c[d])
    ? i[i.length - 1] - c[c.length - 1]
    : 0
}
function tv(i, c, o = !1) {
  let { routesMeta: r } = i,
    d = {},
    h = "/",
    b = []
  for (let T = 0; T < r.length; ++T) {
    let v = r[T],
      m = T === r.length - 1,
      _ = h === "/" ? c : c.slice(h.length) || "/",
      H = vi(
        { path: v.relativePath, caseSensitive: v.caseSensitive, end: m },
        _
      ),
      z = v.route
    if (
      (!H &&
        m &&
        o &&
        !r[r.length - 1].route.index &&
        (H = vi(
          { path: v.relativePath, caseSensitive: v.caseSensitive, end: !1 },
          _
        )),
      !H)
    )
      return null
    Object.assign(d, H.params),
      b.push({
        params: d,
        pathname: ll([h, H.pathname]),
        pathnameBase: cv(ll([h, H.pathnameBase])),
        route: z,
      }),
      H.pathnameBase !== "/" && (h = ll([h, H.pathnameBase]))
  }
  return b
}
function vi(i, c) {
  typeof i == "string" && (i = { path: i, caseSensitive: !1, end: !0 })
  let [o, r] = lv(i.path, i.caseSensitive, i.end),
    d = c.match(o)
  if (!d) return null
  let h = d[0],
    b = h.replace(/(.)\/+$/, "$1"),
    T = d.slice(1)
  return {
    params: r.reduce((m, { paramName: _, isOptional: H }, z) => {
      if (_ === "*") {
        let N = T[z] || ""
        b = h.slice(0, h.length - N.length).replace(/(.)\/+$/, "$1")
      }
      const w = T[z]
      return (
        H && !w ? (m[_] = void 0) : (m[_] = (w || "").replace(/%2F/g, "/")), m
      )
    }, {}),
    pathname: h,
    pathnameBase: b,
    pattern: i,
  }
}
function lv(i, c = !1, o = !0) {
  Mt(
    i === "*" || !i.endsWith("*") || i.endsWith("/*"),
    `Route path "${i}" will be treated as if it were "${i.replace(
      /\*$/,
      "/*"
    )}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${i.replace(
      /\*$/,
      "/*"
    )}".`
  )
  let r = [],
    d =
      "^" +
      i
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (b, T, v) => (
            r.push({ paramName: T, isOptional: v != null }),
            v ? "/?([^\\/]+)?" : "/([^\\/]+)"
          )
        )
  return (
    i.endsWith("*")
      ? (r.push({ paramName: "*" }),
        (d += i === "*" || i === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : o
      ? (d += "\\/*$")
      : i !== "" && i !== "/" && (d += "(?:(?=\\/|$))"),
    [new RegExp(d, c ? void 0 : "i"), r]
  )
}
function av(i) {
  try {
    return i
      .split("/")
      .map((c) => decodeURIComponent(c).replace(/\//g, "%2F"))
      .join("/")
  } catch (c) {
    return (
      Mt(
        !1,
        `The URL path "${i}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${c}).`
      ),
      i
    )
  }
}
function al(i, c) {
  if (c === "/") return i
  if (!i.toLowerCase().startsWith(c.toLowerCase())) return null
  let o = c.endsWith("/") ? c.length - 1 : c.length,
    r = i.charAt(o)
  return r && r !== "/" ? null : i.slice(o) || "/"
}
function nv(i, c = "/") {
  let {
    pathname: o,
    search: r = "",
    hash: d = "",
  } = typeof i == "string" ? Ya(i) : i
  return {
    pathname: o ? (o.startsWith("/") ? o : uv(o, c)) : c,
    search: fv(r),
    hash: rv(d),
  }
}
function uv(i, c) {
  let o = c.replace(/\/+$/, "").split("/")
  return (
    i.split("/").forEach((d) => {
      d === ".." ? o.length > 1 && o.pop() : d !== "." && o.push(d)
    }),
    o.length > 1 ? o.join("/") : "/"
  )
}
function Kf(i, c, o, r) {
  return `Cannot include a '${i}' character in a manually specified \`to.${c}\` field [${JSON.stringify(
    r
  )}].  Please separate it out to the \`to.${o}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`
}
function iv(i) {
  return i.filter(
    (c, o) => o === 0 || (c.route.path && c.route.path.length > 0)
  )
}
function ar(i) {
  let c = iv(i)
  return c.map((o, r) => (r === c.length - 1 ? o.pathname : o.pathnameBase))
}
function nr(i, c, o, r = !1) {
  let d
  typeof i == "string"
    ? (d = Ya(i))
    : ((d = { ...i }),
      Ae(
        !d.pathname || !d.pathname.includes("?"),
        Kf("?", "pathname", "search", d)
      ),
      Ae(
        !d.pathname || !d.pathname.includes("#"),
        Kf("#", "pathname", "hash", d)
      ),
      Ae(!d.search || !d.search.includes("#"), Kf("#", "search", "hash", d)))
  let h = i === "" || d.pathname === "",
    b = h ? "/" : d.pathname,
    T
  if (b == null) T = o
  else {
    let H = c.length - 1
    if (!r && b.startsWith("..")) {
      let z = b.split("/")
      for (; z[0] === ".."; ) z.shift(), (H -= 1)
      d.pathname = z.join("/")
    }
    T = H >= 0 ? c[H] : "/"
  }
  let v = nv(d, T),
    m = b && b !== "/" && b.endsWith("/"),
    _ = (h || b === ".") && o.endsWith("/")
  return !v.pathname.endsWith("/") && (m || _) && (v.pathname += "/"), v
}
var ll = (i) => i.join("/").replace(/\/\/+/g, "/"),
  cv = (i) => i.replace(/\/+$/, "").replace(/^\/*/, "/"),
  fv = (i) => (!i || i === "?" ? "" : i.startsWith("?") ? i : "?" + i),
  rv = (i) => (!i || i === "#" ? "" : i.startsWith("#") ? i : "#" + i)
function ov(i) {
  return (
    i != null &&
    typeof i.status == "number" &&
    typeof i.statusText == "string" &&
    typeof i.internal == "boolean" &&
    "data" in i
  )
}
var Nh = ["POST", "PUT", "PATCH", "DELETE"]
new Set(Nh)
var sv = ["GET", ...Nh]
new Set(sv)
var Ga = R.createContext(null)
Ga.displayName = "DataRouter"
var bi = R.createContext(null)
bi.displayName = "DataRouterState"
var jh = R.createContext({ isTransitioning: !1 })
jh.displayName = "ViewTransition"
var dv = R.createContext(new Map())
dv.displayName = "Fetchers"
var hv = R.createContext(null)
hv.displayName = "Await"
var Dt = R.createContext(null)
Dt.displayName = "Navigation"
var Kn = R.createContext(null)
Kn.displayName = "Location"
var Ct = R.createContext({ outlet: null, matches: [], isDataRoute: !1 })
Ct.displayName = "Route"
var ur = R.createContext(null)
ur.displayName = "RouteError"
function mv(i, { relative: c } = {}) {
  Ae(Xa(), "useHref() may be used only in the context of a <Router> component.")
  let { basename: o, navigator: r } = R.useContext(Dt),
    { hash: d, pathname: h, search: b } = kn(i, { relative: c }),
    T = h
  return (
    o !== "/" && (T = h === "/" ? o : ll([o, h])),
    r.createHref({ pathname: T, search: b, hash: d })
  )
}
function Xa() {
  return R.useContext(Kn) != null
}
function zl() {
  return (
    Ae(
      Xa(),
      "useLocation() may be used only in the context of a <Router> component."
    ),
    R.useContext(Kn).location
  )
}
var Hh =
  "You should call navigate() in a React.useEffect(), not when your component is first rendered."
function Bh(i) {
  R.useContext(Dt).static || R.useLayoutEffect(i)
}
function Jn() {
  let { isDataRoute: i } = R.useContext(Ct)
  return i ? Rv() : yv()
}
function yv() {
  Ae(
    Xa(),
    "useNavigate() may be used only in the context of a <Router> component."
  )
  let i = R.useContext(Ga),
    { basename: c, navigator: o } = R.useContext(Dt),
    { matches: r } = R.useContext(Ct),
    { pathname: d } = zl(),
    h = JSON.stringify(ar(r)),
    b = R.useRef(!1)
  return (
    Bh(() => {
      b.current = !0
    }),
    R.useCallback(
      (v, m = {}) => {
        if ((Mt(b.current, Hh), !b.current)) return
        if (typeof v == "number") {
          o.go(v)
          return
        }
        let _ = nr(v, JSON.parse(h), d, m.relative === "path")
        i == null &&
          c !== "/" &&
          (_.pathname = _.pathname === "/" ? c : ll([c, _.pathname])),
          (m.replace ? o.replace : o.push)(_, m.state, m)
      },
      [c, o, h, d, i]
    )
  )
}
R.createContext(null)
function ir() {
  let { matches: i } = R.useContext(Ct),
    c = i[i.length - 1]
  return c ? c.params : {}
}
function kn(i, { relative: c } = {}) {
  let { matches: o } = R.useContext(Ct),
    { pathname: r } = zl(),
    d = JSON.stringify(ar(o))
  return R.useMemo(() => nr(i, JSON.parse(d), r, c === "path"), [i, d, r, c])
}
function vv(i, c) {
  return Lh(i, c)
}
function Lh(i, c, o, r) {
  var K
  Ae(
    Xa(),
    "useRoutes() may be used only in the context of a <Router> component."
  )
  let { navigator: d, static: h } = R.useContext(Dt),
    { matches: b } = R.useContext(Ct),
    T = b[b.length - 1],
    v = T ? T.params : {},
    m = T ? T.pathname : "/",
    _ = T ? T.pathnameBase : "/",
    H = T && T.route
  {
    let Y = (H && H.path) || ""
    qh(
      m,
      !H || Y.endsWith("*") || Y.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${m}" (under <Route path="${Y}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${Y}"> to <Route path="${
        Y === "/" ? "*" : `${Y}/*`
      }">.`
    )
  }
  let z = zl(),
    w
  if (c) {
    let Y = typeof c == "string" ? Ya(c) : c
    Ae(
      _ === "/" || ((K = Y.pathname) == null ? void 0 : K.startsWith(_)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${_}" but pathname "${Y.pathname}" was given in the \`location\` prop.`
    ),
      (w = Y)
  } else w = z
  let N = w.pathname || "/",
    Z = N
  if (_ !== "/") {
    let Y = _.replace(/^\//, "").split("/")
    Z = "/" + N.replace(/^\//, "").split("/").slice(Y.length).join("/")
  }
  let q =
    !h && o && o.matches && o.matches.length > 0
      ? o.matches
      : Ch(i, { pathname: Z })
  Mt(
    H || q != null,
    `No routes matched location "${w.pathname}${w.search}${w.hash}" `
  ),
    Mt(
      q == null ||
        q[q.length - 1].route.element !== void 0 ||
        q[q.length - 1].route.Component !== void 0 ||
        q[q.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${w.pathname}${w.search}${w.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    )
  let L = Ev(
    q &&
      q.map((Y) =>
        Object.assign({}, Y, {
          params: Object.assign({}, v, Y.params),
          pathname: ll([
            _,
            d.encodeLocation
              ? d.encodeLocation(Y.pathname).pathname
              : Y.pathname,
          ]),
          pathnameBase:
            Y.pathnameBase === "/"
              ? _
              : ll([
                  _,
                  d.encodeLocation
                    ? d.encodeLocation(Y.pathnameBase).pathname
                    : Y.pathnameBase,
                ]),
        })
      ),
    b,
    o,
    r
  )
  return c && L
    ? R.createElement(
        Kn.Provider,
        {
          value: {
            location: {
              pathname: "/",
              search: "",
              hash: "",
              state: null,
              key: "default",
              ...w,
            },
            navigationType: "POP",
          },
        },
        L
      )
    : L
}
function gv() {
  let i = Ov(),
    c = ov(i)
      ? `${i.status} ${i.statusText}`
      : i instanceof Error
      ? i.message
      : JSON.stringify(i),
    o = i instanceof Error ? i.stack : null,
    r = "rgba(200,200,200, 0.5)",
    d = { padding: "0.5rem", backgroundColor: r },
    h = { padding: "2px 4px", backgroundColor: r },
    b = null
  return (
    console.error("Error handled by React Router default ErrorBoundary:", i),
    (b = R.createElement(
      R.Fragment,
      null,
      R.createElement("p", null, "💿 Hey developer 👋"),
      R.createElement(
        "p",
        null,
        "You can provide a way better UX than this when your app throws errors by providing your own ",
        R.createElement("code", { style: h }, "ErrorBoundary"),
        " or",
        " ",
        R.createElement("code", { style: h }, "errorElement"),
        " prop on your route."
      )
    )),
    R.createElement(
      R.Fragment,
      null,
      R.createElement("h2", null, "Unexpected Application Error!"),
      R.createElement("h3", { style: { fontStyle: "italic" } }, c),
      o ? R.createElement("pre", { style: d }, o) : null,
      b
    )
  )
}
var pv = R.createElement(gv, null),
  Sv = class extends R.Component {
    constructor(i) {
      super(i),
        (this.state = {
          location: i.location,
          revalidation: i.revalidation,
          error: i.error,
        })
    }
    static getDerivedStateFromError(i) {
      return { error: i }
    }
    static getDerivedStateFromProps(i, c) {
      return c.location !== i.location ||
        (c.revalidation !== "idle" && i.revalidation === "idle")
        ? { error: i.error, location: i.location, revalidation: i.revalidation }
        : {
            error: i.error !== void 0 ? i.error : c.error,
            location: c.location,
            revalidation: i.revalidation || c.revalidation,
          }
    }
    componentDidCatch(i, c) {
      console.error(
        "React Router caught the following error during render",
        i,
        c
      )
    }
    render() {
      return this.state.error !== void 0
        ? R.createElement(
            Ct.Provider,
            { value: this.props.routeContext },
            R.createElement(ur.Provider, {
              value: this.state.error,
              children: this.props.component,
            })
          )
        : this.props.children
    }
  }
function bv({ routeContext: i, match: c, children: o }) {
  let r = R.useContext(Ga)
  return (
    r &&
      r.static &&
      r.staticContext &&
      (c.route.errorElement || c.route.ErrorBoundary) &&
      (r.staticContext._deepestRenderedBoundaryId = c.route.id),
    R.createElement(Ct.Provider, { value: i }, o)
  )
}
function Ev(i, c = [], o = null, r = null) {
  if (i == null) {
    if (!o) return null
    if (o.errors) i = o.matches
    else if (c.length === 0 && !o.initialized && o.matches.length > 0)
      i = o.matches
    else return null
  }
  let d = i,
    h = o == null ? void 0 : o.errors
  if (h != null) {
    let v = d.findIndex(
      (m) => m.route.id && (h == null ? void 0 : h[m.route.id]) !== void 0
    )
    Ae(
      v >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        h
      ).join(",")}`
    ),
      (d = d.slice(0, Math.min(d.length, v + 1)))
  }
  let b = !1,
    T = -1
  if (o)
    for (let v = 0; v < d.length; v++) {
      let m = d[v]
      if (
        ((m.route.HydrateFallback || m.route.hydrateFallbackElement) && (T = v),
        m.route.id)
      ) {
        let { loaderData: _, errors: H } = o,
          z =
            m.route.loader &&
            !_.hasOwnProperty(m.route.id) &&
            (!H || H[m.route.id] === void 0)
        if (m.route.lazy || z) {
          ;(b = !0), T >= 0 ? (d = d.slice(0, T + 1)) : (d = [d[0]])
          break
        }
      }
    }
  return d.reduceRight((v, m, _) => {
    let H,
      z = !1,
      w = null,
      N = null
    o &&
      ((H = h && m.route.id ? h[m.route.id] : void 0),
      (w = m.route.errorElement || pv),
      b &&
        (T < 0 && _ === 0
          ? (qh(
              "route-fallback",
              !1,
              "No `HydrateFallback` element provided to render during initial hydration"
            ),
            (z = !0),
            (N = null))
          : T === _ &&
            ((z = !0), (N = m.route.hydrateFallbackElement || null))))
    let Z = c.concat(d.slice(0, _ + 1)),
      q = () => {
        let L
        return (
          H
            ? (L = w)
            : z
            ? (L = N)
            : m.route.Component
            ? (L = R.createElement(m.route.Component, null))
            : m.route.element
            ? (L = m.route.element)
            : (L = v),
          R.createElement(bv, {
            match: m,
            routeContext: { outlet: v, matches: Z, isDataRoute: o != null },
            children: L,
          })
        )
      }
    return o && (m.route.ErrorBoundary || m.route.errorElement || _ === 0)
      ? R.createElement(Sv, {
          location: o.location,
          revalidation: o.revalidation,
          component: w,
          error: H,
          children: q(),
          routeContext: { outlet: null, matches: Z, isDataRoute: !0 },
        })
      : q()
  }, null)
}
function cr(i) {
  return `${i} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`
}
function Tv(i) {
  let c = R.useContext(Ga)
  return Ae(c, cr(i)), c
}
function xv(i) {
  let c = R.useContext(bi)
  return Ae(c, cr(i)), c
}
function Av(i) {
  let c = R.useContext(Ct)
  return Ae(c, cr(i)), c
}
function fr(i) {
  let c = Av(i),
    o = c.matches[c.matches.length - 1]
  return (
    Ae(
      o.route.id,
      `${i} can only be used on routes that contain a unique "id"`
    ),
    o.route.id
  )
}
function _v() {
  return fr("useRouteId")
}
function Ov() {
  var r
  let i = R.useContext(ur),
    c = xv("useRouteError"),
    o = fr("useRouteError")
  return i !== void 0 ? i : (r = c.errors) == null ? void 0 : r[o]
}
function Rv() {
  let { router: i } = Tv("useNavigate"),
    c = fr("useNavigate"),
    o = R.useRef(!1)
  return (
    Bh(() => {
      o.current = !0
    }),
    R.useCallback(
      async (d, h = {}) => {
        Mt(o.current, Hh),
          o.current &&
            (typeof d == "number"
              ? i.navigate(d)
              : await i.navigate(d, { fromRouteId: c, ...h }))
      },
      [i, c]
    )
  )
}
var Th = {}
function qh(i, c, o) {
  !c && !Th[i] && ((Th[i] = !0), Mt(!1, o))
}
R.memo(Mv)
function Mv({ routes: i, future: c, state: o }) {
  return Lh(i, void 0, o, c)
}
function Dv({ to: i, replace: c, state: o, relative: r }) {
  Ae(
    Xa(),
    "<Navigate> may be used only in the context of a <Router> component."
  )
  let { static: d } = R.useContext(Dt)
  Mt(
    !d,
    "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change."
  )
  let { matches: h } = R.useContext(Ct),
    { pathname: b } = zl(),
    T = Jn(),
    v = nr(i, ar(h), b, r === "path"),
    m = JSON.stringify(v)
  return (
    R.useEffect(() => {
      T(JSON.parse(m), { replace: c, state: o, relative: r })
    }, [T, m, r, c, o]),
    null
  )
}
function el(i) {
  Ae(
    !1,
    "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>."
  )
}
function Cv({
  basename: i = "/",
  children: c = null,
  location: o,
  navigationType: r = "POP",
  navigator: d,
  static: h = !1,
}) {
  Ae(
    !Xa(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  )
  let b = i.replace(/^\/*/, "/"),
    T = R.useMemo(
      () => ({ basename: b, navigator: d, static: h, future: {} }),
      [b, d, h]
    )
  typeof o == "string" && (o = Ya(o))
  let {
      pathname: v = "/",
      search: m = "",
      hash: _ = "",
      state: H = null,
      key: z = "default",
    } = o,
    w = R.useMemo(() => {
      let N = al(v, b)
      return N == null
        ? null
        : {
            location: { pathname: N, search: m, hash: _, state: H, key: z },
            navigationType: r,
          }
    }, [b, v, m, _, H, z, r])
  return (
    Mt(
      w != null,
      `<Router basename="${b}"> is not able to match the URL "${v}${m}${_}" because it does not start with the basename, so the <Router> won't render anything.`
    ),
    w == null
      ? null
      : R.createElement(
          Dt.Provider,
          { value: T },
          R.createElement(Kn.Provider, { children: c, value: w })
        )
  )
}
function zv({ children: i, location: c }) {
  return vv(er(i), c)
}
function er(i, c = []) {
  let o = []
  return (
    R.Children.forEach(i, (r, d) => {
      if (!R.isValidElement(r)) return
      let h = [...c, d]
      if (r.type === R.Fragment) {
        o.push.apply(o, er(r.props.children, h))
        return
      }
      Ae(
        r.type === el,
        `[${
          typeof r.type == "string" ? r.type : r.type.name
        }] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
      ),
        Ae(
          !r.props.index || !r.props.children,
          "An index route cannot have child routes."
        )
      let b = {
        id: r.props.id || h.join("-"),
        caseSensitive: r.props.caseSensitive,
        element: r.props.element,
        Component: r.props.Component,
        index: r.props.index,
        path: r.props.path,
        loader: r.props.loader,
        action: r.props.action,
        hydrateFallbackElement: r.props.hydrateFallbackElement,
        HydrateFallback: r.props.HydrateFallback,
        errorElement: r.props.errorElement,
        ErrorBoundary: r.props.ErrorBoundary,
        hasErrorBoundary:
          r.props.hasErrorBoundary === !0 ||
          r.props.ErrorBoundary != null ||
          r.props.errorElement != null,
        shouldRevalidate: r.props.shouldRevalidate,
        handle: r.props.handle,
        lazy: r.props.lazy,
      }
      r.props.children && (b.children = er(r.props.children, h)), o.push(b)
    }),
    o
  )
}
var hi = "get",
  mi = "application/x-www-form-urlencoded"
function Ei(i) {
  return i != null && typeof i.tagName == "string"
}
function Uv(i) {
  return Ei(i) && i.tagName.toLowerCase() === "button"
}
function Nv(i) {
  return Ei(i) && i.tagName.toLowerCase() === "form"
}
function jv(i) {
  return Ei(i) && i.tagName.toLowerCase() === "input"
}
function Hv(i) {
  return !!(i.metaKey || i.altKey || i.ctrlKey || i.shiftKey)
}
function Bv(i, c) {
  return i.button === 0 && (!c || c === "_self") && !Hv(i)
}
var di = null
function Lv() {
  if (di === null)
    try {
      new FormData(document.createElement("form"), 0), (di = !1)
    } catch {
      di = !0
    }
  return di
}
var qv = new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain",
])
function Jf(i) {
  return i != null && !qv.has(i)
    ? (Mt(
        !1,
        `"${i}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${mi}"`
      ),
      null)
    : i
}
function wv(i, c) {
  let o, r, d, h, b
  if (Nv(i)) {
    let T = i.getAttribute("action")
    ;(r = T ? al(T, c) : null),
      (o = i.getAttribute("method") || hi),
      (d = Jf(i.getAttribute("enctype")) || mi),
      (h = new FormData(i))
  } else if (Uv(i) || (jv(i) && (i.type === "submit" || i.type === "image"))) {
    let T = i.form
    if (T == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      )
    let v = i.getAttribute("formaction") || T.getAttribute("action")
    if (
      ((r = v ? al(v, c) : null),
      (o = i.getAttribute("formmethod") || T.getAttribute("method") || hi),
      (d =
        Jf(i.getAttribute("formenctype")) ||
        Jf(T.getAttribute("enctype")) ||
        mi),
      (h = new FormData(T, i)),
      !Lv())
    ) {
      let { name: m, type: _, value: H } = i
      if (_ === "image") {
        let z = m ? `${m}.` : ""
        h.append(`${z}x`, "0"), h.append(`${z}y`, "0")
      } else m && h.append(m, H)
    }
  } else {
    if (Ei(i))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      )
    ;(o = hi), (r = null), (d = mi), (b = i)
  }
  return (
    h && d === "text/plain" && ((b = h), (h = void 0)),
    { action: r, method: o.toLowerCase(), encType: d, formData: h, body: b }
  )
}
function rr(i, c) {
  if (i === !1 || i === null || typeof i > "u") throw new Error(c)
}
async function Yv(i, c) {
  if (i.id in c) return c[i.id]
  try {
    let o = await import(i.module)
    return (c[i.id] = o), o
  } catch (o) {
    return (
      console.error(
        `Error loading route module \`${i.module}\`, reloading page...`
      ),
      console.error(o),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    )
  }
}
function Gv(i) {
  return i == null
    ? !1
    : i.href == null
    ? i.rel === "preload" &&
      typeof i.imageSrcSet == "string" &&
      typeof i.imageSizes == "string"
    : typeof i.rel == "string" && typeof i.href == "string"
}
async function Xv(i, c, o) {
  let r = await Promise.all(
    i.map(async (d) => {
      let h = c.routes[d.route.id]
      if (h) {
        let b = await Yv(h, o)
        return b.links ? b.links() : []
      }
      return []
    })
  )
  return Kv(
    r
      .flat(1)
      .filter(Gv)
      .filter((d) => d.rel === "stylesheet" || d.rel === "preload")
      .map((d) =>
        d.rel === "stylesheet"
          ? { ...d, rel: "prefetch", as: "style" }
          : { ...d, rel: "prefetch" }
      )
  )
}
function xh(i, c, o, r, d, h) {
  let b = (v, m) => (o[m] ? v.route.id !== o[m].route.id : !0),
    T = (v, m) => {
      var _
      return (
        o[m].pathname !== v.pathname ||
        (((_ = o[m].route.path) == null ? void 0 : _.endsWith("*")) &&
          o[m].params["*"] !== v.params["*"])
      )
    }
  return h === "assets"
    ? c.filter((v, m) => b(v, m) || T(v, m))
    : h === "data"
    ? c.filter((v, m) => {
        var H
        let _ = r.routes[v.route.id]
        if (!_ || !_.hasLoader) return !1
        if (b(v, m) || T(v, m)) return !0
        if (v.route.shouldRevalidate) {
          let z = v.route.shouldRevalidate({
            currentUrl: new URL(d.pathname + d.search + d.hash, window.origin),
            currentParams: ((H = o[0]) == null ? void 0 : H.params) || {},
            nextUrl: new URL(i, window.origin),
            nextParams: v.params,
            defaultShouldRevalidate: !0,
          })
          if (typeof z == "boolean") return z
        }
        return !0
      })
    : []
}
function Qv(i, c, { includeHydrateFallback: o } = {}) {
  return Zv(
    i
      .map((r) => {
        let d = c.routes[r.route.id]
        if (!d) return []
        let h = [d.module]
        return (
          d.clientActionModule && (h = h.concat(d.clientActionModule)),
          d.clientLoaderModule && (h = h.concat(d.clientLoaderModule)),
          o &&
            d.hydrateFallbackModule &&
            (h = h.concat(d.hydrateFallbackModule)),
          d.imports && (h = h.concat(d.imports)),
          h
        )
      })
      .flat(1)
  )
}
function Zv(i) {
  return [...new Set(i)]
}
function Vv(i) {
  let c = {},
    o = Object.keys(i).sort()
  for (let r of o) c[r] = i[r]
  return c
}
function Kv(i, c) {
  let o = new Set()
  return (
    new Set(c),
    i.reduce((r, d) => {
      let h = JSON.stringify(Vv(d))
      return o.has(h) || (o.add(h), r.push({ key: h, link: d })), r
    }, [])
  )
}
var Jv = new Set([100, 101, 204, 205])
function kv(i, c) {
  let o =
    typeof i == "string"
      ? new URL(
          i,
          typeof window > "u" ? "server://singlefetch/" : window.location.origin
        )
      : i
  return (
    o.pathname === "/"
      ? (o.pathname = "_root.data")
      : c && al(o.pathname, c) === "/"
      ? (o.pathname = `${c.replace(/\/$/, "")}/_root.data`)
      : (o.pathname = `${o.pathname.replace(/\/$/, "")}.data`),
    o
  )
}
function wh() {
  let i = R.useContext(Ga)
  return (
    rr(
      i,
      "You must render this element inside a <DataRouterContext.Provider> element"
    ),
    i
  )
}
function $v() {
  let i = R.useContext(bi)
  return (
    rr(
      i,
      "You must render this element inside a <DataRouterStateContext.Provider> element"
    ),
    i
  )
}
var or = R.createContext(void 0)
or.displayName = "FrameworkContext"
function Yh() {
  let i = R.useContext(or)
  return (
    rr(i, "You must render this element inside a <HydratedRouter> element"), i
  )
}
function Wv(i, c) {
  let o = R.useContext(or),
    [r, d] = R.useState(!1),
    [h, b] = R.useState(!1),
    {
      onFocus: T,
      onBlur: v,
      onMouseEnter: m,
      onMouseLeave: _,
      onTouchStart: H,
    } = c,
    z = R.useRef(null)
  R.useEffect(() => {
    if ((i === "render" && b(!0), i === "viewport")) {
      let Z = (L) => {
          L.forEach((K) => {
            b(K.isIntersecting)
          })
        },
        q = new IntersectionObserver(Z, { threshold: 0.5 })
      return (
        z.current && q.observe(z.current),
        () => {
          q.disconnect()
        }
      )
    }
  }, [i]),
    R.useEffect(() => {
      if (r) {
        let Z = setTimeout(() => {
          b(!0)
        }, 100)
        return () => {
          clearTimeout(Z)
        }
      }
    }, [r])
  let w = () => {
      d(!0)
    },
    N = () => {
      d(!1), b(!1)
    }
  return o
    ? i !== "intent"
      ? [h, z, {}]
      : [
          h,
          z,
          {
            onFocus: Zn(T, w),
            onBlur: Zn(v, N),
            onMouseEnter: Zn(m, w),
            onMouseLeave: Zn(_, N),
            onTouchStart: Zn(H, w),
          },
        ]
    : [!1, z, {}]
}
function Zn(i, c) {
  return (o) => {
    i && i(o), o.defaultPrevented || c(o)
  }
}
function Fv({ page: i, ...c }) {
  let { router: o } = wh(),
    r = R.useMemo(() => Ch(o.routes, i, o.basename), [o.routes, i, o.basename])
  return r ? R.createElement(Pv, { page: i, matches: r, ...c }) : null
}
function Iv(i) {
  let { manifest: c, routeModules: o } = Yh(),
    [r, d] = R.useState([])
  return (
    R.useEffect(() => {
      let h = !1
      return (
        Xv(i, c, o).then((b) => {
          h || d(b)
        }),
        () => {
          h = !0
        }
      )
    }, [i, c, o]),
    r
  )
}
function Pv({ page: i, matches: c, ...o }) {
  let r = zl(),
    { manifest: d, routeModules: h } = Yh(),
    { basename: b } = wh(),
    { loaderData: T, matches: v } = $v(),
    m = R.useMemo(() => xh(i, c, v, d, r, "data"), [i, c, v, d, r]),
    _ = R.useMemo(() => xh(i, c, v, d, r, "assets"), [i, c, v, d, r]),
    H = R.useMemo(() => {
      if (i === r.pathname + r.search + r.hash) return []
      let N = new Set(),
        Z = !1
      if (
        (c.forEach((L) => {
          var Y
          let K = d.routes[L.route.id]
          !K ||
            !K.hasLoader ||
            ((!m.some((le) => le.route.id === L.route.id) &&
              L.route.id in T &&
              (Y = h[L.route.id]) != null &&
              Y.shouldRevalidate) ||
            K.hasClientLoader
              ? (Z = !0)
              : N.add(L.route.id))
        }),
        N.size === 0)
      )
        return []
      let q = kv(i, b)
      return (
        Z &&
          N.size > 0 &&
          q.searchParams.set(
            "_routes",
            c
              .filter((L) => N.has(L.route.id))
              .map((L) => L.route.id)
              .join(",")
          ),
        [q.pathname + q.search]
      )
    }, [b, T, r, d, m, c, i, h]),
    z = R.useMemo(() => Qv(_, d), [_, d]),
    w = Iv(_)
  return R.createElement(
    R.Fragment,
    null,
    H.map((N) =>
      R.createElement("link", {
        key: N,
        rel: "prefetch",
        as: "fetch",
        href: N,
        ...o,
      })
    ),
    z.map((N) =>
      R.createElement("link", { key: N, rel: "modulepreload", href: N, ...o })
    ),
    w.map(({ key: N, link: Z }) => R.createElement("link", { key: N, ...Z }))
  )
}
function eg(...i) {
  return (c) => {
    i.forEach((o) => {
      typeof o == "function" ? o(c) : o != null && (o.current = c)
    })
  }
}
var Gh =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u"
try {
  Gh && (window.__reactRouterVersion = "7.5.3")
} catch {}
function tg({ basename: i, children: c, window: o }) {
  let r = R.useRef()
  r.current == null && (r.current = Xy({ window: o, v5Compat: !0 }))
  let d = r.current,
    [h, b] = R.useState({ action: d.action, location: d.location }),
    T = R.useCallback(
      (v) => {
        R.startTransition(() => b(v))
      },
      [b]
    )
  return (
    R.useLayoutEffect(() => d.listen(T), [d, T]),
    R.createElement(Cv, {
      basename: i,
      children: c,
      location: h.location,
      navigationType: h.action,
      navigator: d,
    })
  )
}
var Xh = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  nl = R.forwardRef(function (
    {
      onClick: c,
      discover: o = "render",
      prefetch: r = "none",
      relative: d,
      reloadDocument: h,
      replace: b,
      state: T,
      target: v,
      to: m,
      preventScrollReset: _,
      viewTransition: H,
      ...z
    },
    w
  ) {
    let { basename: N } = R.useContext(Dt),
      Z = typeof m == "string" && Xh.test(m),
      q,
      L = !1
    if (typeof m == "string" && Z && ((q = m), Gh))
      try {
        let Ee = new URL(window.location.href),
          $e = m.startsWith("//") ? new URL(Ee.protocol + m) : new URL(m),
          mt = al($e.pathname, N)
        $e.origin === Ee.origin && mt != null
          ? (m = mt + $e.search + $e.hash)
          : (L = !0)
      } catch {
        Mt(
          !1,
          `<Link to="${m}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
        )
      }
    let K = mv(m, { relative: d }),
      [Y, le, J] = Wv(r, z),
      ve = ng(m, {
        replace: b,
        state: T,
        target: v,
        preventScrollReset: _,
        relative: d,
        viewTransition: H,
      })
    function be(Ee) {
      c && c(Ee), Ee.defaultPrevented || ve(Ee)
    }
    let Me = R.createElement("a", {
      ...z,
      ...J,
      href: q || K,
      onClick: L || h ? c : be,
      ref: eg(w, le),
      target: v,
      "data-discover": !Z && o === "render" ? "true" : void 0,
    })
    return Y && !Z
      ? R.createElement(R.Fragment, null, Me, R.createElement(Fv, { page: K }))
      : Me
  })
nl.displayName = "Link"
var yi = R.forwardRef(function (
  {
    "aria-current": c = "page",
    caseSensitive: o = !1,
    className: r = "",
    end: d = !1,
    style: h,
    to: b,
    viewTransition: T,
    children: v,
    ...m
  },
  _
) {
  let H = kn(b, { relative: m.relative }),
    z = zl(),
    w = R.useContext(bi),
    { navigator: N, basename: Z } = R.useContext(Dt),
    q = w != null && rg(H) && T === !0,
    L = N.encodeLocation ? N.encodeLocation(H).pathname : H.pathname,
    K = z.pathname,
    Y =
      w && w.navigation && w.navigation.location
        ? w.navigation.location.pathname
        : null
  o ||
    ((K = K.toLowerCase()),
    (Y = Y ? Y.toLowerCase() : null),
    (L = L.toLowerCase())),
    Y && Z && (Y = al(Y, Z) || Y)
  const le = L !== "/" && L.endsWith("/") ? L.length - 1 : L.length
  let J = K === L || (!d && K.startsWith(L) && K.charAt(le) === "/"),
    ve =
      Y != null &&
      (Y === L || (!d && Y.startsWith(L) && Y.charAt(L.length) === "/")),
    be = { isActive: J, isPending: ve, isTransitioning: q },
    Me = J ? c : void 0,
    Ee
  typeof r == "function"
    ? (Ee = r(be))
    : (Ee = [
        r,
        J ? "active" : null,
        ve ? "pending" : null,
        q ? "transitioning" : null,
      ]
        .filter(Boolean)
        .join(" "))
  let $e = typeof h == "function" ? h(be) : h
  return R.createElement(
    nl,
    {
      ...m,
      "aria-current": Me,
      className: Ee,
      ref: _,
      style: $e,
      to: b,
      viewTransition: T,
    },
    typeof v == "function" ? v(be) : v
  )
})
yi.displayName = "NavLink"
var lg = R.forwardRef(
  (
    {
      discover: i = "render",
      fetcherKey: c,
      navigate: o,
      reloadDocument: r,
      replace: d,
      state: h,
      method: b = hi,
      action: T,
      onSubmit: v,
      relative: m,
      preventScrollReset: _,
      viewTransition: H,
      ...z
    },
    w
  ) => {
    let N = cg(),
      Z = fg(T, { relative: m }),
      q = b.toLowerCase() === "get" ? "get" : "post",
      L = typeof T == "string" && Xh.test(T),
      K = (Y) => {
        if ((v && v(Y), Y.defaultPrevented)) return
        Y.preventDefault()
        let le = Y.nativeEvent.submitter,
          J = (le == null ? void 0 : le.getAttribute("formmethod")) || b
        N(le || Y.currentTarget, {
          fetcherKey: c,
          method: J,
          navigate: o,
          replace: d,
          state: h,
          relative: m,
          preventScrollReset: _,
          viewTransition: H,
        })
      }
    return R.createElement("form", {
      ref: w,
      method: q,
      action: Z,
      onSubmit: r ? v : K,
      ...z,
      "data-discover": !L && i === "render" ? "true" : void 0,
    })
  }
)
lg.displayName = "Form"
function ag(i) {
  return `${i} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`
}
function Qh(i) {
  let c = R.useContext(Ga)
  return Ae(c, ag(i)), c
}
function ng(
  i,
  {
    target: c,
    replace: o,
    state: r,
    preventScrollReset: d,
    relative: h,
    viewTransition: b,
  } = {}
) {
  let T = Jn(),
    v = zl(),
    m = kn(i, { relative: h })
  return R.useCallback(
    (_) => {
      if (Bv(_, c)) {
        _.preventDefault()
        let H = o !== void 0 ? o : Vn(v) === Vn(m)
        T(i, {
          replace: H,
          state: r,
          preventScrollReset: d,
          relative: h,
          viewTransition: b,
        })
      }
    },
    [v, T, m, o, r, c, i, d, h, b]
  )
}
var ug = 0,
  ig = () => `__${String(++ug)}__`
function cg() {
  let { router: i } = Qh("useSubmit"),
    { basename: c } = R.useContext(Dt),
    o = _v()
  return R.useCallback(
    async (r, d = {}) => {
      let { action: h, method: b, encType: T, formData: v, body: m } = wv(r, c)
      if (d.navigate === !1) {
        let _ = d.fetcherKey || ig()
        await i.fetch(_, o, d.action || h, {
          preventScrollReset: d.preventScrollReset,
          formData: v,
          body: m,
          formMethod: d.method || b,
          formEncType: d.encType || T,
          flushSync: d.flushSync,
        })
      } else
        await i.navigate(d.action || h, {
          preventScrollReset: d.preventScrollReset,
          formData: v,
          body: m,
          formMethod: d.method || b,
          formEncType: d.encType || T,
          replace: d.replace,
          state: d.state,
          fromRouteId: o,
          flushSync: d.flushSync,
          viewTransition: d.viewTransition,
        })
    },
    [i, c, o]
  )
}
function fg(i, { relative: c } = {}) {
  let { basename: o } = R.useContext(Dt),
    r = R.useContext(Ct)
  Ae(r, "useFormAction must be used inside a RouteContext")
  let [d] = r.matches.slice(-1),
    h = { ...kn(i || ".", { relative: c }) },
    b = zl()
  if (i == null) {
    h.search = b.search
    let T = new URLSearchParams(h.search),
      v = T.getAll("index")
    if (v.some((_) => _ === "")) {
      T.delete("index"), v.filter((H) => H).forEach((H) => T.append("index", H))
      let _ = T.toString()
      h.search = _ ? `?${_}` : ""
    }
  }
  return (
    (!i || i === ".") &&
      d.route.index &&
      (h.search = h.search ? h.search.replace(/^\?/, "?index&") : "?index"),
    o !== "/" && (h.pathname = h.pathname === "/" ? o : ll([o, h.pathname])),
    Vn(h)
  )
}
function rg(i, c = {}) {
  let o = R.useContext(jh)
  Ae(
    o != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  )
  let { basename: r } = Qh("useViewTransitionState"),
    d = kn(i, { relative: c.relative })
  if (!o.isTransitioning) return !1
  let h = al(o.currentLocation.pathname, r) || o.currentLocation.pathname,
    b = al(o.nextLocation.pathname, r) || o.nextLocation.pathname
  return vi(d.pathname, b) != null || vi(d.pathname, h) != null
}
new TextEncoder()
;[...Jv]
function og() {
  const i = {}
  return (
    (window.mapmap = i),
    {
      on(c, o) {
        return (
          (i[c] = i[c] ? [...i[c], o] : [o]),
          () => {
            i[c] = i[c].filter((r) => r !== o)
          }
        )
      },
      emit(c, o) {
        i[c] && i[c].forEach((r) => r(o))
      },
    }
  )
}
const Zh = og()
function Vh(i) {
  Zh.emit("show-user-msg", i)
}
function Lt(i) {
  Vh({ txt: i, type: "success" })
}
function tl(i) {
  Vh({ txt: i, type: "error" })
}
function Kh() {
  const [i, c] = R.useState(null),
    o = R.useRef()
  R.useEffect(
    () =>
      Zh.on("show-user-msg", (h) => {
        c(h),
          o.current && ((o.current = null), clearTimeout(o.current)),
          (o.current = setTimeout(r, 3e3))
      }),
    []
  )
  function r() {
    c(null)
  }
  return i
    ? S.jsxs("section", {
        className: `user-msg ${i.type}`,
        children: [S.jsx("button", { onClick: r, children: "x" }), i.txt],
      })
    : S.jsx("span", {})
}
const Ie = { query: $n, get: sg, post: dg, put: hg, remove: mg }
function $n(i, c = 500) {
  var o = JSON.parse(localStorage.getItem(i)) || []
  return new Promise((r) => setTimeout(() => r(o), c))
}
function sg(i, c) {
  return $n(i).then((o) => {
    const r = o.find((d) => d._id === c)
    if (!r)
      throw new Error(`Get failed, cannot find entity with id: ${c} in: ${i}`)
    return r
  })
}
function dg(i, c) {
  return (
    (c = { ...c }), (c._id = yg()), $n(i).then((o) => (o.push(c), sr(i, o), c))
  )
}
function hg(i, c) {
  return $n(i).then((o) => {
    const r = o.findIndex((d) => d._id === c._id)
    if (r < 0)
      throw new Error(
        `Update failed, cannot find entity with id: ${c._id} in: ${i}`
      )
    return o.splice(r, 1, c), sr(i, o), c
  })
}
function mg(i, c) {
  return $n(i).then((o) => {
    const r = o.findIndex((d) => d._id === c)
    if (r < 0)
      throw new Error(
        `Remove failed, cannot find entity with id: ${c} in: ${i}`
      )
    o.splice(r, 1), sr(i, o)
  })
}
function sr(i, c) {
  localStorage.setItem(i, JSON.stringify(c))
}
function yg(i = 5) {
  for (
    var c = "",
      o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
      r = 0;
    r < i;
    r++
  )
    c += o.charAt(Math.floor(Math.random() * o.length))
  return c
}
const Ti = "userDB",
  dr = "loggedinUser",
  qt = {
    login: gg,
    logout: bg,
    signup: pg,
    getById: vg,
    getLoggedinUser: Jh,
    updateScore: Sg,
    getEmptyCredentials: Eg,
  }
function vg(i) {
  return Ie.get(Ti, i)
}
function gg({ username: i, password: c }) {
  return Ie.query(Ti).then((o) => {
    const r = o.find((d) => d.username === i)
    return (r && r.password !== c) || r
      ? gi(r)
      : Promise.reject("Invalid login")
  })
}
function pg({ username: i, password: c, fullname: o }) {
  const r = { username: i, password: c, fullname: o, score: 1e4 }
  return Ie.post(Ti, r).then(gi)
}
function Sg(i) {
  const c = Jh()._id
  return qt
    .getById(c)
    .then((o) =>
      o.score + i < 0
        ? Promise.reject("No credit")
        : ((o.score += i), Ie.put(Ti, o))
    )
    .then((o) => (gi(o), o.score))
}
function bg() {
  return sessionStorage.removeItem(dr), Promise.resolve()
}
function Jh() {
  return JSON.parse(sessionStorage.getItem(dr))
}
function gi(i) {
  const c = { _id: i._id, fullname: i.fullname, score: i.score }
  return sessionStorage.setItem(dr, JSON.stringify(c)), c
}
function Eg() {
  return { username: "", password: "", fullname: "" }
}
const ze = {
  makeId: Tg,
  makeLorem: xg,
  getRandomIntInclusive: Ag,
  loadFromStorage: Og,
  saveToStorage: _g,
  animateCSS: Rg,
  debounce: Mg,
}
function Tg(i = 6) {
  for (
    var c = "",
      o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
      r = 0;
    r < i;
    r++
  )
    c += o.charAt(Math.floor(Math.random() * o.length))
  return c
}
function xg(i = 100) {
  for (
    var c = [
        "The sky",
        "above",
        "the port",
        "was",
        "the color of television",
        "tuned",
        "to",
        "a dead channel",
        ".",
        "All",
        "this happened",
        "more or less",
        ".",
        "I",
        "had",
        "the story",
        "bit by bit",
        "from various people",
        "and",
        "as generally",
        "happens",
        "in such cases",
        "each time",
        "it",
        "was",
        "a different story",
        ".",
        "It",
        "was",
        "a pleasure",
        "to",
        "burn",
      ],
      o = "";
    i > 0;

  )
    i--, (o += c[Math.floor(Math.random() * c.length)] + " ")
  return o
}
function Ag(i, c) {
  return (
    (i = Math.ceil(i)),
    (c = Math.floor(c)),
    Math.floor(Math.random() * (c - i + 1)) + i
  )
}
function _g(i, c) {
  localStorage.setItem(i, JSON.stringify(c))
}
function Og(i) {
  const c = localStorage.getItem(i)
  return c ? JSON.parse(c) : void 0
}
function Rg(i, c) {
  const o = "animate__"
  return new Promise((r, d) => {
    if (!i) return d("Missing element for animation")
    const h = `${o}${c}`
    i.classList.add(`${o}animated`, h)
    function b(T) {
      T.stopPropagation(),
        i.classList.remove(`${o}animated`, h),
        r("Animation ended")
    }
    i.addEventListener("animationend", b, { once: !0 })
  })
}
function Mg(i, c = 300) {
  let o
  return (...r) => {
    clearTimeout(o),
      (o = setTimeout(() => {
        i.apply(this, r)
      }, c))
  }
}
const wa = "toys",
  Dg = {
    query: Cg,
    getById: zg,
    save: Ng,
    remove: Ug,
    getDefaultFilter: jg,
    _setNextPrevToyId: kh,
    getEmptyToy: Hg,
  }
function Cg(i = {}) {
  return Ie.query(wa).then((c) => {
    if (i.txt) {
      const o = new RegExp(i.txt, "i")
      c = c.filter((r) => o.test(r.name))
    }
    return c
  })
}
function zg(i) {
  return Ie.get(wa, i).then(kh)
}
function Ug(i) {
  return Ie.remove(wa, i)
}
function Ng(i) {
  return i._id
    ? Ie.put(wa, i)
    : ((i._id = ze.makeId()), (i.createdAt = Date.now()), Ie.post(wa, i))
}
function jg() {
  return { txt: "", inStock: void 0, labels: [], sortBy: "name", sortDir: 1 }
}
function kh(i) {
  return Ie.query(wa).then((c) => {
    const o = c.findIndex((h) => h._id === i._id),
      r = c[o + 1] ? c[o + 1] : c[0],
      d = c[o - 1] ? c[o - 1] : c[c.length - 1]
    return (i.nextToyId = r._id), (i.prevToyId = d._id), i
  })
}
function Hg() {
  return { name: "", price: "", labels: [], inStock: !0, createdAt: Date.now() }
}
const $h = "SET_TOYS",
  Wh = "REMOVE_TOY",
  Fh = "ADD_TOY",
  Ih = "UPDATE_TOY",
  Ph = "TOY_UNDO",
  hr = "TOGGLE_CART_IS_SHOWN",
  em = "ADD_TOY_TO_CART",
  tm = "REMOVE_TOY_FROM_CART",
  lm = "CLEAR_CART",
  am = "SET_FILTER_BY",
  tr = "SET_IS_LOADING",
  Bg = {
    toys: [],
    isToytShown: !1,
    shoppingToyt: [],
    isLoading: !1,
    filterBy: Dg.getDefaultFilter(),
    lastToys: [],
  }
function Lg(i = Bg, c = {}) {
  switch (c.type) {
    case $h:
      return { ...i, toys: c.toys }
    case Wh:
      return {
        ...i,
        toys: i.toys.filter((o) => o._id !== c.toyId),
        lastToys: [...i.toys],
      }
    case Fh:
      return { ...i, toys: [...i.toys, c.toy] }
    case Ih:
      return {
        ...i,
        toys: i.toys.map((o) => (o._id === c.toy._id ? c.toy : o)),
      }
    case hr:
      return { ...i, isToytShown: !i.isToytShown }
    case em:
      return { ...i, shoppingToyt: [...i.shoppingToyt, c.toy] }
    case tm:
      return {
        ...i,
        shoppingToyt: i.shoppingToyt.filter((o) => o._id !== c.toyId),
      }
    case lm:
      return { ...i, shoppingToyt: [] }
    case am:
      return { ...i, filterBy: { ...i.filterBy, ...c.filterBy } }
    case tr:
      return { ...i, isLoading: c.isLoading }
    case Ph:
      return { ...i, toys: [...i.lastToys] }
    default:
      return i
  }
}
const qg = "INCREMENT",
  wg = "DECREMENT",
  nm = "CHANGE_BY",
  xi = "SET_USER",
  um = "SET_USER_SCORE",
  Yg = { count: 105, loggedInUser: qt.getLoggedinUser() }
function Gg(i = Yg, c = {}) {
  switch (c.type) {
    case qg:
      return { ...i, count: i.count + 1 }
    case wg:
      return { ...i, count: i.count - 1 }
    case nm:
      return { ...i, count: i.count + c.diff }
    case xi:
      return { ...i, loggedInUser: c.user }
    case um:
      const o = { ...i.loggedInUser, score: c.score }
      return { ...i, loggedInUser: o }
    default:
      return i
  }
}
function ke(i) {
  return `Minified Redux error #${i}; visit https://redux.js.org/Errors?code=${i} for the full message or use the non-minified dev environment for full errors. `
}
var Xg = (typeof Symbol == "function" && Symbol.observable) || "@@observable",
  Ah = Xg,
  kf = () => Math.random().toString(36).substring(7).split("").join("."),
  Qg = {
    INIT: `@@redux/INIT${kf()}`,
    REPLACE: `@@redux/REPLACE${kf()}`,
    PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${kf()}`,
  },
  pi = Qg
function Zg(i) {
  if (typeof i != "object" || i === null) return !1
  let c = i
  for (; Object.getPrototypeOf(c) !== null; ) c = Object.getPrototypeOf(c)
  return Object.getPrototypeOf(i) === c || Object.getPrototypeOf(i) === null
}
function im(i, c, o) {
  if (typeof i != "function") throw new Error(ke(2))
  if (
    (typeof c == "function" && typeof o == "function") ||
    (typeof o == "function" && typeof arguments[3] == "function")
  )
    throw new Error(ke(0))
  if (
    (typeof c == "function" && typeof o > "u" && ((o = c), (c = void 0)),
    typeof o < "u")
  ) {
    if (typeof o != "function") throw new Error(ke(1))
    return o(im)(i, c)
  }
  let r = i,
    d = c,
    h = new Map(),
    b = h,
    T = 0,
    v = !1
  function m() {
    b === h &&
      ((b = new Map()),
      h.forEach((q, L) => {
        b.set(L, q)
      }))
  }
  function _() {
    if (v) throw new Error(ke(3))
    return d
  }
  function H(q) {
    if (typeof q != "function") throw new Error(ke(4))
    if (v) throw new Error(ke(5))
    let L = !0
    m()
    const K = T++
    return (
      b.set(K, q),
      function () {
        if (L) {
          if (v) throw new Error(ke(6))
          ;(L = !1), m(), b.delete(K), (h = null)
        }
      }
    )
  }
  function z(q) {
    if (!Zg(q)) throw new Error(ke(7))
    if (typeof q.type > "u") throw new Error(ke(8))
    if (typeof q.type != "string") throw new Error(ke(17))
    if (v) throw new Error(ke(9))
    try {
      ;(v = !0), (d = r(d, q))
    } finally {
      v = !1
    }
    return (
      (h = b).forEach((K) => {
        K()
      }),
      q
    )
  }
  function w(q) {
    if (typeof q != "function") throw new Error(ke(10))
    ;(r = q), z({ type: pi.REPLACE })
  }
  function N() {
    const q = H
    return {
      subscribe(L) {
        if (typeof L != "object" || L === null) throw new Error(ke(11))
        function K() {
          const le = L
          le.next && le.next(_())
        }
        return K(), { unsubscribe: q(K) }
      },
      [Ah]() {
        return this
      },
    }
  }
  return (
    z({ type: pi.INIT }),
    { dispatch: z, subscribe: H, getState: _, replaceReducer: w, [Ah]: N }
  )
}
function Vg(i, c, o) {
  return im(i, c, o)
}
function Kg(i) {
  Object.keys(i).forEach((c) => {
    const o = i[c]
    if (typeof o(void 0, { type: pi.INIT }) > "u") throw new Error(ke(12))
    if (typeof o(void 0, { type: pi.PROBE_UNKNOWN_ACTION() }) > "u")
      throw new Error(ke(13))
  })
}
function Jg(i) {
  const c = Object.keys(i),
    o = {}
  for (let h = 0; h < c.length; h++) {
    const b = c[h]
    typeof i[b] == "function" && (o[b] = i[b])
  }
  const r = Object.keys(o)
  let d
  try {
    Kg(o)
  } catch (h) {
    d = h
  }
  return function (b = {}, T) {
    if (d) throw d
    let v = !1
    const m = {}
    for (let _ = 0; _ < r.length; _++) {
      const H = r[_],
        z = o[H],
        w = b[H],
        N = z(w, T)
      if (typeof N > "u") throw (T && T.type, new Error(ke(14)))
      ;(m[H] = N), (v = v || N !== w)
    }
    return (v = v || r.length !== Object.keys(b).length), v ? m : b
  }
}
function kg(...i) {
  return i.length === 0
    ? (c) => c
    : i.length === 1
    ? i[0]
    : i.reduce(
        (c, o) =>
          (...r) =>
            c(o(...r))
      )
}
const $g = Jg({ toyModule: Lg, userModule: Gg }),
  Wg = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || kg,
  Fe = Vg($g, Wg())
window.gStore = Fe
function Fg(i) {
  return qt
    .login(i)
    .then((c) => {
      Fe.dispatch({ type: xi, user: c })
    })
    .catch((c) => {
      throw (console.log("user actions -> Cannot login", c), c)
    })
}
function Ig(i) {
  return qt
    .signup(i)
    .then((c) => {
      Fe.dispatch({ type: xi, user: c })
    })
    .catch((c) => {
      throw (console.log("user actions -> Cannot signup", c), c)
    })
}
function Pg(i) {
  return qt
    .logout(i)
    .then(() => {
      Fe.dispatch({ type: xi, user: null })
    })
    .catch((c) => {
      console.log("user actions -> Cannot logout", c)
    })
}
function ep(i) {
  return qt
    .updateScore(-i)
    .then((c) => {
      Fe.dispatch({ type: lm }), Fe.dispatch({ type: um, score: c })
    })
    .catch((c) => {
      throw (console.log("user actions -> Cannot checkout", c), c)
    })
}
function tp({ onLogin: i, isSignup: c }) {
  const [o, r] = R.useState(qt.getEmptyCredentials())
  function d({ target: b }) {
    const { name: T, value: v } = b
    r((m) => ({ ...m, [T]: v }))
  }
  function h(b) {
    b.preventDefault(), i(o)
  }
  return S.jsxs("form", {
    className: "login-form",
    onSubmit: h,
    children: [
      S.jsx("input", {
        type: "text",
        name: "username",
        value: o.username,
        placeholder: "Username",
        onChange: d,
        required: !0,
        autoFocus: !0,
      }),
      S.jsx("input", {
        type: "password",
        name: "password",
        value: o.password,
        placeholder: "Password",
        onChange: d,
        required: !0,
        autoComplete: "off",
      }),
      c &&
        S.jsx("input", {
          type: "text",
          name: "fullname",
          value: o.fullname,
          placeholder: "Full name",
          onChange: d,
          required: !0,
        }),
      S.jsx("button", { children: c ? "Signup" : "Login" }),
    ],
  })
}
function lp() {
  const [i, c] = R.useState(!1)
  function o(h) {
    i ? d(h) : r(h)
  }
  function r(h) {
    Fg(h)
      .then(() => Lt("Logged in successfully"))
      .catch(() => tl("Oops! Login failed."))
  }
  function d(h) {
    Ig(h)
      .then(() => Lt("Signup successful"))
      .catch(() => tl("Oops! Signup failed."))
  }
  return S.jsxs("section", {
    className: "login-signup",
    children: [
      S.jsx(tp, { onLogin: o, isSignup: i }),
      S.jsx("div", {
        className: "btns",
        children: S.jsx("a", {
          href: "#",
          onClick: () => c((h) => !h),
          children: i ? "Already a member? Login" : "New user? Signup here",
        }),
      }),
    ],
  })
}
var $f = { exports: {} },
  Wf = {}
/**
 * @license React
 * use-sync-external-store-with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var _h
function ap() {
  if (_h) return Wf
  _h = 1
  var i = Si()
  function c(v, m) {
    return (v === m && (v !== 0 || 1 / v === 1 / m)) || (v !== v && m !== m)
  }
  var o = typeof Object.is == "function" ? Object.is : c,
    r = i.useSyncExternalStore,
    d = i.useRef,
    h = i.useEffect,
    b = i.useMemo,
    T = i.useDebugValue
  return (
    (Wf.useSyncExternalStoreWithSelector = function (v, m, _, H, z) {
      var w = d(null)
      if (w.current === null) {
        var N = { hasValue: !1, value: null }
        w.current = N
      } else N = w.current
      w = b(
        function () {
          function q(J) {
            if (!L) {
              if (((L = !0), (K = J), (J = H(J)), z !== void 0 && N.hasValue)) {
                var ve = N.value
                if (z(ve, J)) return (Y = ve)
              }
              return (Y = J)
            }
            if (((ve = Y), o(K, J))) return ve
            var be = H(J)
            return z !== void 0 && z(ve, be)
              ? ((K = J), ve)
              : ((K = J), (Y = be))
          }
          var L = !1,
            K,
            Y,
            le = _ === void 0 ? null : _
          return [
            function () {
              return q(m())
            },
            le === null
              ? void 0
              : function () {
                  return q(le())
                },
          ]
        },
        [m, _, H, z]
      )
      var Z = r(v, w[0], w[1])
      return (
        h(
          function () {
            ;(N.hasValue = !0), (N.value = Z)
          },
          [Z]
        ),
        T(Z),
        Z
      )
    }),
    Wf
  )
}
var Oh
function np() {
  return Oh || ((Oh = 1), ($f.exports = ap())), $f.exports
}
var up = np()
function ip(i) {
  i()
}
function cp() {
  let i = null,
    c = null
  return {
    clear() {
      ;(i = null), (c = null)
    },
    notify() {
      ip(() => {
        let o = i
        for (; o; ) o.callback(), (o = o.next)
      })
    },
    get() {
      const o = []
      let r = i
      for (; r; ) o.push(r), (r = r.next)
      return o
    },
    subscribe(o) {
      let r = !0
      const d = (c = { callback: o, next: null, prev: c })
      return (
        d.prev ? (d.prev.next = d) : (i = d),
        function () {
          !r ||
            i === null ||
            ((r = !1),
            d.next ? (d.next.prev = d.prev) : (c = d.prev),
            d.prev ? (d.prev.next = d.next) : (i = d.next))
        }
      )
    },
  }
}
var Rh = { notify() {}, get: () => [] }
function fp(i, c) {
  let o,
    r = Rh,
    d = 0,
    h = !1
  function b(Z) {
    _()
    const q = r.subscribe(Z)
    let L = !1
    return () => {
      L || ((L = !0), q(), H())
    }
  }
  function T() {
    r.notify()
  }
  function v() {
    N.onStateChange && N.onStateChange()
  }
  function m() {
    return h
  }
  function _() {
    d++, o || ((o = i.subscribe(v)), (r = cp()))
  }
  function H() {
    d--, o && d === 0 && (o(), (o = void 0), r.clear(), (r = Rh))
  }
  function z() {
    h || ((h = !0), _())
  }
  function w() {
    h && ((h = !1), H())
  }
  const N = {
    addNestedSub: b,
    notifyNestedSubs: T,
    handleChangeWrapper: v,
    isSubscribed: m,
    trySubscribe: z,
    tryUnsubscribe: w,
    getListeners: () => r,
  }
  return N
}
var rp = () =>
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u",
  op = rp(),
  sp = () => typeof navigator < "u" && navigator.product === "ReactNative",
  dp = sp(),
  hp = () => (op || dp ? R.useLayoutEffect : R.useEffect),
  mp = hp(),
  Ff = Symbol.for("react-redux-context"),
  If = typeof globalThis < "u" ? globalThis : {}
function yp() {
  if (!R.createContext) return {}
  const i = If[Ff] ?? (If[Ff] = new Map())
  let c = i.get(R.createContext)
  return c || ((c = R.createContext(null)), i.set(R.createContext, c)), c
}
var Cl = yp()
function vp(i) {
  const { children: c, context: o, serverState: r, store: d } = i,
    h = R.useMemo(() => {
      const v = fp(d)
      return { store: d, subscription: v, getServerState: r ? () => r : void 0 }
    }, [d, r]),
    b = R.useMemo(() => d.getState(), [d])
  mp(() => {
    const { subscription: v } = h
    return (
      (v.onStateChange = v.notifyNestedSubs),
      v.trySubscribe(),
      b !== d.getState() && v.notifyNestedSubs(),
      () => {
        v.tryUnsubscribe(), (v.onStateChange = void 0)
      }
    )
  }, [h, b])
  const T = o || Cl
  return R.createElement(T.Provider, { value: h }, c)
}
var gp = vp
function mr(i = Cl) {
  return function () {
    return R.useContext(i)
  }
}
var cm = mr()
function fm(i = Cl) {
  const c = i === Cl ? cm : mr(i),
    o = () => {
      const { store: r } = c()
      return r
    }
  return Object.assign(o, { withTypes: () => o }), o
}
var pp = fm()
function Sp(i = Cl) {
  const c = i === Cl ? pp : fm(i),
    o = () => c().dispatch
  return Object.assign(o, { withTypes: () => o }), o
}
var Wn = Sp(),
  bp = (i, c) => i === c
function Ep(i = Cl) {
  const c = i === Cl ? cm : mr(i),
    o = (r, d = {}) => {
      const { equalityFn: h = bp } =
          typeof d == "function" ? { equalityFn: d } : d,
        b = c(),
        { store: T, subscription: v, getServerState: m } = b
      R.useRef(!0)
      const _ = R.useCallback(
          {
            [r.name](z) {
              return r(z)
            },
          }[r.name],
          [r]
        ),
        H = up.useSyncExternalStoreWithSelector(
          v.addNestedSub,
          T.getState,
          m || T.getState,
          _,
          h
        )
      return R.useDebugValue(H), H
    }
  return Object.assign(o, { withTypes: () => o }), o
}
var Rt = Ep()
function Tp() {
  const i = Wn(),
    c = Rt((d) => d.userModule.loggedInUser)
  function o() {
    Pg()
      .then(() => {
        Lt("logout successfully")
      })
      .catch((d) => {
        tl("OOPs try again")
      })
  }
  function r(d) {
    d.preventDefault(), i({ type: hr })
  }
  return S.jsxs("header", {
    className: "app-header full main-layout",
    children: [
      S.jsxs("section", {
        className: "header-container",
        children: [
          S.jsx("h1", { children: "React Toy App" }),
          S.jsxs("nav", {
            className: "app-nav",
            children: [
              S.jsx(yi, { to: "/", children: "Home" }),
              S.jsx(yi, { to: "/about", children: "About" }),
              S.jsx(yi, { to: "/toy", children: "Toys" }),
              S.jsx("a", { onClick: r, href: "#", children: "🛒 Toyt" }),
            ],
          }),
        ],
      }),
      c
        ? S.jsxs("section", {
            children: [
              S.jsxs("span", {
                to: `/user/${c._id}`,
                children: [
                  "Hello ",
                  c.fullname,
                  " ",
                  S.jsxs("span", { children: ["$", c.score.toLocaleString()] }),
                ],
              }),
              S.jsx("button", { onClick: o, children: "Logout" }),
            ],
          })
        : S.jsx("section", { children: S.jsx(lp, {}) }),
      S.jsx(Kh, {}),
    ],
  })
}
function xp({ isToytShown: i }) {
  const c = Wn(),
    o = Rt((v) => v.toyModule.shoppingToyt),
    r = Rt((v) => v.userModule.loggedInUser)
  function d(v) {
    c({ type: tm, toyId: v })
  }
  function h() {
    return o.reduce((v, m) => v + m.price, 0)
  }
  function b() {
    const v = h()
    ep(v)
      .then(() => {
        Lt(`Charged you: $${v.toLocaleString()}`)
      })
      .catch(() => {
        tl("There was a problem checking out!")
      })
  }
  if (!i) return null
  const T = h()
  return S.jsxs("section", {
    className: "Toyt",
    children: [
      S.jsx("h5", { children: "Your Toyt" }),
      S.jsx("ul", {
        children: o.map((v, m) =>
          S.jsxs(
            "li",
            {
              children: [
                S.jsx("button", { onClick: () => d(v._id), children: "x" }),
                v.name,
                " | $",
                v.price,
              ],
            },
            m
          )
        ),
      }),
      S.jsxs("p", { children: ["Total: $", T] }),
      S.jsx("button", { disabled: !r || !T, onClick: b, children: "Checkout" }),
    ],
  })
}
function Ap() {
  const i = Wn(),
    c = Rt((h) => h.toyModule.isToytShown),
    o = Rt((h) => h.userModule.count),
    r = Rt((h) => h.toyModule.toys.length),
    d = Rt((h) => h.toyModule.shoppingToyt.length)
  return S.jsxs("footer", {
    className: "app-footer",
    children: [
      S.jsxs("h5", { children: ["Currently ", r, " toys in the shop"] }),
      S.jsxs("p", { children: ["Coffeerights to all - Count: ", o] }),
      S.jsxs("h5", {
        children: [
          S.jsx("span", { children: d }),
          " Products in your Toyt",
          S.jsxs("a", {
            href: "#",
            onClick: (h) => {
              h.preventDefault(), i({ type: hr })
            },
            children: ["(", c ? "hide" : "show", ")"],
          }),
        ],
      }),
      S.jsx(xp, { isToytShown: c }),
      S.jsx(Kh, {}),
    ],
  })
}
const _p = "/assets/logo-DfQC6zIw.png"
function Op() {
  const i = Wn(),
    c = Rt((r) => r.userModule.count)
  function o(r) {
    i({ type: nm, diff: r })
  }
  return S.jsxs("section", {
    className: "home-page main-layout",
    children: [
      S.jsx("h1", { children: "Welcome to MisterToy 🎁" }),
      S.jsxs("section", {
        className: "count-section",
        children: [
          S.jsxs("h2", { children: ["Count: ", c] }),
          S.jsxs("div", {
            className: "btns",
            children: [
              S.jsx("button", { onClick: () => o(1), children: "+1" }),
              S.jsx("button", { onClick: () => o(10), children: "+10" }),
            ],
          }),
        ],
      }),
      S.jsx("img", { src: _p, alt: "MisterToy Logo", className: "logo" }),
    ],
  })
}
function Rp() {
  return S.jsxs("section", {
    children: [
      S.jsx("h2", { children: "About Us" }),
      S.jsx("p", {
        children:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni aperiam quo veniam velit dolor reprehenderit, laudantium consequatur neque numquam labore quae. Accusamus libero perferendis ducimus? Alias unde hic quisquam doloremque.",
      }),
    ],
  })
}
function Mp({ filterBy: i, onSetFilter: c }) {
  const [o, r] = R.useState({ ...i }),
    d = R.useRef(ze.debounce(c, 300))
  R.useEffect(() => {
    d.current(o)
  }, [o])
  function h({ target: b }) {
    let { value: T, name: v, type: m, selectedOptions: _ } = b
    m === "number" && (T = +T),
      m === "select-multiple" && (T = Array.from(_, (H) => H.value)),
      v === "inStock" && (T === "all" ? (T = void 0) : (T = T === "true")),
      r((H) => ({ ...H, [v]: T }))
  }
  return S.jsxs("section", {
    className: "toy-filter full main-layout",
    children: [
      S.jsx("h2", { children: "Toys Filter" }),
      S.jsxs("form", {
        children: [
          S.jsx("label", { htmlFor: "name", children: "Name:" }),
          S.jsx("input", {
            type: "text",
            id: "name",
            name: "txt",
            placeholder: "Search by name",
            value: o.txt,
            onChange: h,
          }),
          S.jsx("label", { htmlFor: "inStock", children: "In Stock:" }),
          S.jsxs("select", {
            id: "inStock",
            name: "inStock",
            value: o.inStock === void 0 ? "all" : String(o.inStock),
            onChange: h,
            children: [
              S.jsx("option", { value: "all", children: "All" }),
              S.jsx("option", { value: "true", children: "In stock" }),
              S.jsx("option", { value: "false", children: "Out of stock" }),
            ],
          }),
          S.jsx("label", { htmlFor: "labels", children: "Label:" }),
          S.jsxs("select", {
            id: "labels",
            name: "label",
            value: o.label || "all",
            onChange: h,
            children: [
              S.jsx("option", { value: "", children: "All" }),
              S.jsx("option", { value: "On-wheels", children: "On wheels" }),
              S.jsx("option", { value: "Box game", children: "Box game" }),
              S.jsx("option", { value: "Fashion", children: "Fashion" }),
              S.jsx("option", { value: "Art", children: "Art" }),
              S.jsx("option", { value: "Baby", children: "Baby" }),
              S.jsx("option", { value: "Doll", children: "Doll" }),
              S.jsx("option", {
                value: "Battery Powered",
                children: "Battery Powered",
              }),
            ],
          }),
          S.jsx("label", { htmlFor: "sortBy", children: "Sort by:" }),
          S.jsxs("select", {
            id: "sortBy",
            name: "sortBy",
            value: o.sortBy || "name",
            onChange: h,
            children: [
              S.jsx("option", { value: "name", children: "Name" }),
              S.jsx("option", { value: "price", children: "Price" }),
              S.jsx("option", { value: "createdAt", children: "Created At" }),
            ],
          }),
        ],
      }),
    ],
  })
}
function Dp({ toy: i }) {
  return S.jsxs("article", {
    className: "toy-preview",
    children: [
      S.jsx("h4", { children: i.name }),
      S.jsx("h1", { children: "🧸" }),
      S.jsxs("p", {
        children: [
          "Price: ",
          S.jsxs("span", { children: ["$", i.price.toLocaleString()] }),
        ],
      }),
      i.labels &&
        S.jsxs("p", {
          children: [
            "Labels: ",
            S.jsx("span", { children: i.labels.join(", ") }),
          ],
        }),
      S.jsxs("p", {
        children: [
          "In Stock: ",
          S.jsx("span", { children: i.inStock ? "Yes" : "No" }),
        ],
      }),
      S.jsx("hr", {}),
      S.jsx(nl, { to: `/toy/edit/${i._id}`, children: "Edit" }),
      "   |  ",
      S.jsx(nl, { to: `/toy/${i._id}`, children: "Details" }),
    ],
  })
}
function Cp({ toys: i, onRemoveToy: c, onEditToy: o, addToToyt: r }) {
  return S.jsx("ul", {
    className: "toy-list",
    children: i.map((d) =>
      S.jsxs(
        "li",
        {
          className: "toy-preview",
          children: [
            S.jsx(Dp, { toy: d }),
            S.jsxs("div", {
              className: "actions",
              children: [
                S.jsx("button", { onClick: () => c(d._id), children: "❌" }),
                S.jsx("button", { onClick: () => o(d), children: "Edit" }),
              ],
            }),
            S.jsx("button", {
              className: "buy",
              onClick: () => r(d),
              children: "Add to Toyt 🛒",
            }),
          ],
        },
        d._id
      )
    ),
  })
}
const Il = "toyDB"
qp()
const Pl = {
  query: zp,
  getById: Up,
  save: jp,
  remove: Np,
  getEmptyToy: Hp,
  getRandomToy: Bp,
  getDefaultFilter: Lp,
}
function zp(i = {}) {
  return Ie.query(Il).then((c) => {
    i.txt || (i.txt = ""),
      i.maxPrice || (i.maxPrice = 1 / 0),
      i.minSpeed || (i.minSpeed = -1 / 0)
    const o = new RegExp(i.txt, "i")
    let r = c.filter(
      (d) =>
        o.test(d.name) &&
        (i.inStock === void 0 || d.inStock === i.inStock) &&
        (!i.label || d.labels.includes(i.label))
    )
    return (
      i.sortBy &&
        (i.sortBy === "name"
          ? r.sort((d, h) => d.name.localeCompare(h.name))
          : i.sortBy === "price"
          ? r.sort((d, h) => d.price - h.price)
          : i.sortBy === "createdAt" &&
            r.sort((d, h) => d.createdAt - h.createdAt)),
      r
    )
  })
}
function Up(i) {
  return Ie.get(Il, i)
}
function Np(i) {
  return Ie.remove(Il, i)
}
function jp(i) {
  return i._id
    ? Ie.put(Il, i)
    : ((i.owner = qt.getLoggedinUser()), Ie.post(Il, i))
}
function Hp() {
  return { name: "", price: "", labels: [], inStock: !0, createdAt: Date.now() }
}
function Bp() {
  const i = [
    "On wheels",
    "Box game",
    "Art",
    "Baby",
    "Doll",
    "Puzzle",
    "Outdoor",
    "Battery Powered",
  ]
  return {
    name: "Toy-" + (Date.now() % 1e3),
    price: ze.getRandomIntInclusive(10, 300),
    labels: ze.getRandomLabels(i),
    inStock: Math.random() > 0.3,
    createdAt: Date.now(),
  }
}
function Lp() {
  return { txt: "", inStock: void 0, labels: [], sortBy: "name", sortDir: 1 }
}
function qp() {
  let i = ze.loadFromStorage(Il)
  ;(i && i.length > 0) ||
    ((i = [
      {
        _id: ze.makeId(),
        name: "Super Hero Figure",
        imgUrl:
          "https://cdn.pixabay.com/photo/2016/11/29/05/08/superhero-1868733_1280.jpg",
        price: 180,
        labels: ["Action", "Collectible"],
        createdAt: 1631e9,
        inStock: !0,
      },
      {
        _id: ze.makeId(),
        name: "Soccer Ball",
        imgUrl:
          "https://cdn.pixabay.com/photo/2016/11/29/05/08/soccer-1867175_1280.jpg",
        price: 90,
        labels: ["Sport", "Outdoor"],
        createdAt: 1632e9,
        inStock: !0,
      },
      {
        _id: ze.makeId(),
        name: "Magic Set",
        imgUrl:
          "https://cdn.pixabay.com/photo/2015/09/05/22/46/magic-924867_1280.jpg",
        price: 120,
        labels: ["Mind Game", "Creative"],
        createdAt: 1633e9,
        inStock: !1,
      },
      {
        _id: ze.makeId(),
        name: "Building Blocks",
        imgUrl:
          "https://cdn.pixabay.com/photo/2017/06/26/02/47/lego-2443587_1280.jpg",
        price: 110,
        labels: ["Building", "Educational"],
        createdAt: 1634e9,
        inStock: !0,
      },
      {
        _id: ze.makeId(),
        name: "Rubik Cube",
        imgUrl:
          "https://cdn.pixabay.com/photo/2015/01/08/18/29/rubik-s-cube-593654_1280.jpg",
        price: 60,
        labels: ["Puzzle", "Mind Game"],
        createdAt: 1635e9,
        inStock: !0,
      },
      {
        _id: ze.makeId(),
        name: "Train Set",
        imgUrl:
          "https://cdn.pixabay.com/photo/2014/11/04/09/06/toy-train-516100_1280.jpg",
        price: 200,
        labels: ["On wheels", "Indoor"],
        createdAt: 1636e9,
        inStock: !0,
      },
      {
        _id: ze.makeId(),
        name: "Board Game",
        imgUrl:
          "https://cdn.pixabay.com/photo/2017/05/08/13/15/chess-2295274_1280.jpg",
        price: 140,
        labels: ["Box game", "Mind Game"],
        createdAt: 1637e9,
        inStock: !1,
      },
      {
        _id: ze.makeId(),
        name: "Drum Set",
        imgUrl:
          "https://cdn.pixabay.com/photo/2016/11/19/14/00/drum-1839387_1280.jpg",
        price: 230,
        labels: ["Music", "Creative"],
        createdAt: 1638e9,
        inStock: !0,
      },
      {
        _id: ze.makeId(),
        name: "Action Figure",
        imgUrl:
          "https://cdn.pixabay.com/photo/2016/05/27/20/52/toy-1423928_1280.jpg",
        price: 170,
        labels: ["Action", "Collectible"],
        createdAt: 1639e9,
        inStock: !0,
      },
      {
        _id: ze.makeId(),
        name: "Basketball Hoop",
        imgUrl:
          "https://cdn.pixabay.com/photo/2017/08/06/13/44/basketball-2593387_1280.jpg",
        price: 210,
        labels: ["Outdoor", "Sport"],
        createdAt: 164e10,
        inStock: !0,
      },
      {
        _id: ze.makeId(),
        name: "Water Gun",
        imgUrl:
          "https://cdn.pixabay.com/photo/2018/08/30/07/25/water-gun-3641813_1280.jpg",
        price: 85,
        labels: ["Outdoor", "Water Game"],
        createdAt: 1641e9,
        inStock: !1,
      },
      {
        _id: ze.makeId(),
        name: "Barbie Doll",
        imgUrl:
          "https://cdn.pixabay.com/photo/2017/06/30/00/45/barbie-2451887_1280.jpg",
        price: 190,
        labels: ["Doll", "Fashion"],
        createdAt: 1642e9,
        inStock: !0,
      },
      {
        _id: ze.makeId(),
        name: "Electric Scooter",
        imgUrl:
          "https://cdn.pixabay.com/photo/2016/11/29/02/14/scooter-1866781_1280.jpg",
        price: 500,
        labels: ["Outdoor", "Battery Powered"],
        createdAt: 1643e9,
        inStock: !0,
      },
      {
        _id: ze.makeId(),
        name: "Musical Piano",
        imgUrl:
          "https://cdn.pixabay.com/photo/2016/05/06/12/22/keyboard-1375783_1280.jpg",
        price: 270,
        labels: ["Music", "Creative"],
        createdAt: 1644e9,
        inStock: !0,
      },
      {
        _id: ze.makeId(),
        name: "Outdoor Tent",
        imgUrl:
          "https://cdn.pixabay.com/photo/2016/03/27/22/22/tent-1289822_1280.jpg",
        price: 320,
        labels: ["Outdoor", "Adventure"],
        createdAt: 1645e9,
        inStock: !0,
      },
    ]),
    ze.saveToStorage(Il, i))
}
function wp() {
  const [i, c] = R.useState(!1),
    [o, r] = R.useState(null),
    d = [
      {
        id: 1,
        name: "Leanne Graham",
        email: "leanne@example.com",
        phone: "123-456-7890",
        website: "leanne.org",
      },
      {
        id: 2,
        name: "Ervin Howell",
        email: "Shanna@melissa.tv",
        phone: "010-692-6593 x09125",
        website: "anastasia.net",
      },
      {
        id: 3,
        name: "Clementine Bauch",
        email: "clementine@example.com",
        phone: "999-000-1111",
        website: "clementine.net",
      },
      {
        id: 4,
        name: "Patricia Lebsack",
        email: "patricia@example.com",
        phone: "222-333-4444",
        website: "patricia.org",
      },
      {
        id: 5,
        name: "Chelsey Dietrich",
        email: "chelsey@example.com",
        phone: "555-666-7777",
        website: "chelsey.com",
      },
      {
        id: 6,
        name: "Mrs. Dennis Schulist",
        email: "dennis@example.com",
        phone: "888-999-0000",
        website: "dennis.io",
      },
    ]
  return S.jsxs("section", {
    className: "accordion-wrapper",
    children: [
      S.jsx("button", {
        onClick: () => c((h) => !h),
        children: i ? "Hide Users" : "See Users",
      }),
      i &&
        S.jsx("section", {
          className: "user-list",
          children: d.map((h) =>
            S.jsxs(
              "div",
              {
                className: "user-preview",
                children: [
                  S.jsx("h4", {
                    className: "user-name",
                    onClick: () => r((b) => (b === h.id ? null : h.id)),
                    children: h.name,
                  }),
                  o === h.id &&
                    S.jsxs("div", {
                      className: "user-details",
                      children: [
                        S.jsxs("p", {
                          children: [
                            S.jsx("strong", { children: "Email:" }),
                            " ",
                            h.email,
                          ],
                        }),
                        S.jsxs("p", {
                          children: [
                            S.jsx("strong", { children: "Phone:" }),
                            " ",
                            h.phone,
                          ],
                        }),
                        S.jsxs("p", {
                          children: [
                            S.jsx("strong", { children: "Website:" }),
                            " ",
                            h.website,
                          ],
                        }),
                      ],
                    }),
                ],
              },
              h.id
            )
          ),
        }),
    ],
  })
}
function Yp() {
  const i = Fe.getState().toyModule.filterBy
  return (
    Fe.dispatch({ type: tr, isLoading: !0 }),
    Pl.query(i)
      .then((c) => {
        Fe.dispatch({ type: $h, toys: c })
      })
      .catch((c) => {
        throw (console.log("toy action -> Cannot load toys", c), c)
      })
      .finally(() => {
        Fe.dispatch({ type: tr, isLoading: !1 })
      })
  )
}
function Gp(i) {
  return (
    Fe.dispatch({ type: Wh, toyId: i }),
    Pl.remove(i)
      .then(() => {
        Lt("Toy removed!")
      })
      .catch((c) => {
        throw (
          (Fe.dispatch({ type: Ph }),
          console.log("toy action -> Cannot remove toy", c),
          c)
        )
      })
  )
}
function lr(i) {
  const c = i._id ? Ih : Fh
  return Pl.save(i)
    .then((o) => (Fe.dispatch({ type: c, toy: o }), o))
    .catch((o) => {
      throw (console.log("toy action -> Cannot save toy", o), o)
    })
}
function Xp(i) {
  Fe.dispatch({ type: am, filterBy: i })
}
function Qp() {
  const i = Wn(),
    c = Rt((m) => m.toyModule.toys),
    o = Rt((m) => m.toyModule.filterBy),
    r = Rt((m) => m.toyModule.isLoading)
  R.useEffect(() => {
    Yp().catch((m) => {
      tl("Cannot load toys!")
    })
  }, [o])
  function d(m) {
    Xp(m)
  }
  function h(m) {
    Gp(m)
      .then(() => {
        Lt("Toy removed")
      })
      .catch((_) => {
        tl("Cannot remove toy")
      })
  }
  function b() {
    const m = Pl.getEmptyToy()
    lr(m)
      .then((_) => {
        Lt(`Toy added (id: ${_._id})`)
      })
      .catch((_) => {
        tl("Cannot add toy")
      })
  }
  function T(m) {
    const _ = +prompt("New price?", m.price)
    if (!_) return
    const H = { ...m, price: _ }
    lr(H)
      .then((z) => {
        Lt(`Toy updated to price: $${z.price}`)
      })
      .catch((z) => {
        tl("Cannot update toy")
      })
  }
  function v(m) {
    console.log(`Adding ${m.name} to Toyt`),
      i({ type: em, toy: m }),
      Lt("Added to Toyt")
  }
  return S.jsxs("div", {
    className: "toy-index",
    children: [
      S.jsx(wp, {}),
      S.jsx("h3", { children: "MisterToy - Toy List" }),
      S.jsxs("main", {
        children: [
          S.jsx(nl, { to: "/toy/edit", children: "Add Toy" }),
          S.jsx("button", {
            className: "add-btn",
            onClick: b,
            children: "Add Random Toy 🧸",
          }),
          S.jsx(Mp, { filterBy: o, onSetFilter: d }),
          r
            ? S.jsx("div", { children: "Loading..." })
            : S.jsx(Cp, {
                toys: c,
                onRemoveToy: h,
                onEditToy: T,
                addToToyt: v,
              }),
          S.jsx("hr", {}),
        ],
      }),
    ],
  })
}
function Zp() {
  const [i, c] = R.useState(!0)
  return (
    R.useEffect(() => {
      function o() {
        c(!0)
      }
      function r() {
        c(!1)
      }
      return (
        window.addEventListener("online", o),
        window.addEventListener("offline", r),
        () => {
          window.removeEventListener("online", o),
            window.removeEventListener("offline", r)
        }
      )
    }, []),
    i
  )
}
const Mh = "You have unsaved changes. Continue?"
function Vp() {
  const [i, c] = R.useState(!1)
  return (
    R.useEffect(() => {
      function o(r) {
        if (i) return (r.returnValue = Mh), Mh
      }
      return (
        window.addEventListener("beforeunload", o),
        () => {
          window.removeEventListener("beforeunload", o)
        }
      )
    }, [i]),
    c
  )
}
function Dh() {
  const i = Jn(),
    [c, o] = R.useState(Pl.getEmptyToy()),
    { toyId: r } = ir(),
    d = Zp(),
    h = Vp()
  R.useEffect(() => {
    r && b()
  }, [r])
  function b() {
    Pl.getById(r)
      .then((m) => {
        o(m)
      })
      .catch((m) => {
        console.log("Had issues in toy edit", m), i("/toy")
      })
  }
  function T({ target: m }) {
    let { value: _, type: H, name: z } = m
    H === "number" && (_ = +_),
      H === "checkbox" && (_ = m.checked),
      o((w) => ({ ...w, [z]: _ })),
      h(!0)
  }
  function v(m) {
    m.preventDefault(),
      c.price || (c.price = 100),
      lr(c)
        .then(() => {
          Lt("Toy saved!"), h(!1), i("/toy")
        })
        .catch((_) => {
          console.log("Had issues in toy save", _), tl("Could not save toy")
        })
  }
  return S.jsxs("section", {
    className: "toy-edit",
    children: [
      S.jsxs("h2", { children: [c._id ? "Edit" : "Add", " Toy"] }),
      S.jsxs("form", {
        onSubmit: v,
        children: [
          S.jsx("label", { htmlFor: "name", children: "Name:" }),
          S.jsx("input", {
            type: "text",
            id: "name",
            name: "name",
            placeholder: "Enter name...",
            value: c.name,
            onChange: T,
          }),
          S.jsx("label", { htmlFor: "price", children: "Price:" }),
          S.jsx("input", {
            type: "number",
            id: "price",
            name: "price",
            placeholder: "Enter price",
            value: c.price,
            onChange: T,
          }),
          S.jsxs("label", {
            htmlFor: "inStock",
            children: [
              S.jsx("input", {
                type: "checkbox",
                id: "inStock",
                name: "inStock",
                checked: c.inStock,
                onChange: T,
              }),
              "In Stock",
            ],
          }),
          S.jsxs("div", {
            className: "actions",
            children: [
              S.jsx("button", { children: c._id ? "Save" : "Add" }),
              S.jsx(nl, { to: "/toy", children: "Cancel" }),
            ],
          }),
          S.jsx("section", {
            className: "online-status",
            children: S.jsx("h4", {
              children: d ? "✅ Online" : "❌ Disconnected",
            }),
          }),
        ],
      }),
    ],
  })
}
function Kp({ heading: i, footing: c, onClose: o, children: r }) {
  return (
    R.useEffect(() => {
      function d(h) {
        h.key === "Escape" && o()
      }
      return (
        document.body.addEventListener("keydown", d),
        () => document.body.removeEventListener("keydown", d)
      )
    }, [o]),
    S.jsxs("section", {
      className: "nice-popup",
      children: [
        S.jsxs("header", {
          className: "popup-header",
          children: [
            S.jsx("h3", { children: i }),
            S.jsx("button", { onClick: o, children: "X" }),
          ],
        }),
        S.jsx("main", { className: "popup-main", children: r }),
        S.jsx("footer", { className: "popup-footer", children: c }),
      ],
    })
  )
}
function Jp() {
  const [i, c] = R.useState([]),
    [o, r] = R.useState("")
  function d(b) {
    r(b.target.value)
  }
  function h(b) {
    b.preventDefault(),
      o &&
        (c([...i, { from: "Ya", txt: o }]),
        setTimeout(() => {
          c((T) => [...T, { from: "Support", txt: "Sure thing honey" }])
        }, 500),
        r(""))
  }
  return S.jsxs("section", {
    children: [
      S.jsx("form", {
        onSubmit: h,
        children: S.jsx("input", { type: "text", value: o, onChange: d }),
      }),
      S.jsx("ul", {
        children: i.map((b, T) =>
          S.jsxs(
            "li",
            {
              children: [
                S.jsxs("strong", { children: [b.from, ":"] }),
                " ",
                b.txt,
              ],
            },
            T
          )
        ),
      }),
    ],
  })
}
function kp() {
  var T
  const [i, c] = R.useState(null),
    [o, r] = R.useState(!1),
    { toyId: d } = ir(),
    h = Jn()
  R.useEffect(() => {
    d && b()
  }, [d])
  function b() {
    Pl.getById(d)
      .then((v) => c(v))
      .catch((v) => {
        console.log("Had issues in toy details", v), h("/toy")
      })
  }
  return i
    ? S.jsxs("section", {
        className: "toy-details",
        children: [
          S.jsxs("h1", { children: ["Toy Name: ", i.name] }),
          S.jsxs("h5", { children: ["Price: $", i.price] }),
          S.jsx("p", { children: "🧸" }),
          S.jsxs("p", { children: ["In Stock: ", i.inStock ? "Yes" : "No"] }),
          S.jsxs("p", {
            children: [
              "Labels: ",
              ((T = i.labels) == null ? void 0 : T.join(", ")) || "No labels",
            ],
          }),
          S.jsxs("p", {
            children: [
              "Created At: ",
              new Date(i.createdAt).toLocaleDateString(),
            ],
          }),
          S.jsx("button", { onClick: () => r(!0), children: "💬 Chat" }),
          o &&
            S.jsx(Kp, {
              heading: "Live Support",
              footing: "We’re here to help",
              onClose: () => r(!1),
              children: S.jsx(Jp, {}),
            }),
          S.jsx(nl, { to: `/toy/edit/${i._id}`, children: "Edit" }),
          "  ",
          S.jsx(nl, { to: "/toy", children: "Back" }),
        ],
      })
    : S.jsx("div", { children: "Loading..." })
}
function $p() {
  const [i, c] = R.useState(null),
    { userId: o } = ir(),
    r = Jn()
  R.useEffect(() => {
    o && d()
  }, [o])
  function d() {
    qt.getById(o)
      .then((T) => c(T))
      .catch((T) => {
        console.log("Had issues loading user details", T), r("/")
      })
  }
  if (!i) return S.jsx("div", { children: "Loading user..." })
  const h = qt.getLoggedinUser(),
    b = (h == null ? void 0 : h._id) === o
  return S.jsxs("section", {
    className: "user-details",
    children: [
      S.jsx("h1", { children: "User Profile" }),
      S.jsxs("h2", { children: ["Fullname: ", i.fullname] }),
      S.jsxs("h3", { children: ["Score: ", i.score.toLocaleString()] }),
      b &&
        S.jsxs("section", {
          className: "my-profile-info",
          children: [
            S.jsx("h4", { children: "🛍️ My Shopping Info:" }),
            S.jsx("p", {
              children:
                "(Here you can show toys bought, Toyt items, etc... בהמשך)",
            }),
          ],
        }),
      S.jsx("p", {
        className: "user-bio",
        children: "Welcome to MisterToy! Where dreams come true 🎁",
      }),
      S.jsx(nl, {
        to: "/toy",
        className: "btn-back",
        children: "← Back to Toys",
      }),
    ],
  })
}
function Wp() {
  return S.jsx(gp, {
    store: Fe,
    children: S.jsx(tg, {
      children: S.jsxs("section", {
        className: "app full main-layout",
        children: [
          S.jsxs("main", {
            children: [
              S.jsx(Tp, {}),
              S.jsxs(zv, {
                children: [
                  S.jsx(el, { path: "/", element: S.jsx(Op, {}) }),
                  S.jsx(el, { path: "/about", element: S.jsx(Rp, {}) }),
                  S.jsx(el, { path: "/toy", element: S.jsx(Qp, {}) }),
                  S.jsx(el, { path: "/toy/edit", element: S.jsx(Dh, {}) }),
                  S.jsx(el, {
                    path: "/toy/edit/:toyId",
                    element: S.jsx(Dh, {}),
                  }),
                  S.jsx(el, { path: "/toy/:toyId", element: S.jsx(kp, {}) }),
                  S.jsx(el, { path: "/user/:userId", element: S.jsx($p, {}) }),
                  S.jsx(el, { path: "*", element: S.jsx(Dv, { to: "/" }) }),
                ],
              }),
            ],
          }),
          S.jsx(Ap, {}),
        ],
      }),
    }),
  })
}
Yy.createRoot(document.getElementById("root")).render(S.jsx(Wp, {}))
