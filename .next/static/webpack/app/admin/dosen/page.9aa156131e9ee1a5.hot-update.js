"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/admin/dosen/page",{

/***/ "(app-pages-browser)/./src/app/actions/ujian.js":
/*!**********************************!*\
  !*** ./src/app/actions/ujian.js ***!
  \**********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addPengawasUjian: function() { return /* binding */ addPengawasUjian; },
/* harmony export */   addUjian: function() { return /* binding */ addUjian; },
/* harmony export */   deleteUjian: function() { return /* binding */ deleteUjian; },
/* harmony export */   editRuanganUjian: function() { return /* binding */ editRuanganUjian; },
/* harmony export */   editUjian: function() { return /* binding */ editUjian; },
/* harmony export */   getDatesBySemester: function() { return /* binding */ getDatesBySemester; },
/* harmony export */   getUjian: function() { return /* binding */ getUjian; },
/* harmony export */   getUjianByDateWaktu: function() { return /* binding */ getUjianByDateWaktu; },
/* harmony export */   getUjianById: function() { return /* binding */ getUjianById; },
/* harmony export */   getUjianBySemester: function() { return /* binding */ getUjianBySemester; },
/* harmony export */   getUjianRuanganDosen: function() { return /* binding */ getUjianRuanganDosen; },
/* harmony export */   getUjianSemesterGroupByDate: function() { return /* binding */ getUjianSemesterGroupByDate; }
/* harmony export */ });
/* harmony import */ var next_dist_client_app_call_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/client/app-call-server */ "(app-pages-browser)/./node_modules/next/dist/client/app-call-server.js");
/* harmony import */ var next_dist_client_app_call_server__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_client_app_call_server__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! private-next-rsc-action-client-wrapper */ "(app-pages-browser)/./node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js");



function __build_action__(action, args) {
  return (0,next_dist_client_app_call_server__WEBPACK_IMPORTED_MODULE_0__.callServer)(action.$$id, args)
}

/* __next_internal_action_entry_do_not_use__ {"14007aa94128a5b80f34e7519fd3ee808b85e560":"editRuanganUjian","34147bb24e85e5317c179401364fa721c3a79c28":"getUjianByDateWaktu","57bcf1b0fc7d2b89920d7eef461a3ff7d69e05c1":"addUjian","5a2723e55c1e93f7ea178425cb0dce9f7d9d5c0e":"getUjianRuanganDosen","7bf0ed94de2874eadad5668546e23cb8ae729e43":"getUjian","a71f9257d9a57496d904f7aa05c1a7ecaec74d56":"editUjian","ae14c5099ab7605e000315529665ebf718667fff":"addPengawasUjian","b1c93b9a0b802164b530b1ca339ec1fb495fea91":"getDatesBySemester","c1f85c03a3e1d3bcf1181f9706508f1094105129":"getUjianBySemester","c5a71cf23d6dceae6d644fe63a4cc7ab7d5f4eb7":"getUjianById","ce8f68316468603c46b51f218ca572f07644df19":"deleteUjian","ff9e077b9e82d107084cf0e5cc83db587dffe545":"getUjianSemesterGroupByDate"} */ var getUjianByDateWaktu = (0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__.createServerReference)("34147bb24e85e5317c179401364fa721c3a79c28");

var getUjian = (0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__.createServerReference)("7bf0ed94de2874eadad5668546e23cb8ae729e43");
var getDatesBySemester = (0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__.createServerReference)("b1c93b9a0b802164b530b1ca339ec1fb495fea91");
var getUjianBySemester = (0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__.createServerReference)("c1f85c03a3e1d3bcf1181f9706508f1094105129");
var getUjianRuanganDosen = (0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__.createServerReference)("5a2723e55c1e93f7ea178425cb0dce9f7d9d5c0e");
var getUjianSemesterGroupByDate = (0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__.createServerReference)("ff9e077b9e82d107084cf0e5cc83db587dffe545");
var getUjianById = (0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__.createServerReference)("c5a71cf23d6dceae6d644fe63a4cc7ab7d5f4eb7");
var deleteUjian = (0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__.createServerReference)("ce8f68316468603c46b51f218ca572f07644df19");
var addUjian = (0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__.createServerReference)("57bcf1b0fc7d2b89920d7eef461a3ff7d69e05c1");
var editUjian = (0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__.createServerReference)("a71f9257d9a57496d904f7aa05c1a7ecaec74d56");
var editRuanganUjian = (0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__.createServerReference)("14007aa94128a5b80f34e7519fd3ee808b85e560");
var addPengawasUjian = (0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__.createServerReference)("ae14c5099ab7605e000315529665ebf718667fff");



;
    // Wrapped in an IIFE to avoid polluting the global scope
    ;
    (function () {
        var _a, _b;
        // Legacy CSS implementations will `eval` browser code in a Node.js context
        // to extract CSS. For backwards compatibility, we need to check we're in a
        // browser context before continuing.
        if (typeof self !== 'undefined' &&
            // AMP / No-JS mode does not inject these helpers:
            '$RefreshHelpers$' in self) {
            // @ts-ignore __webpack_module__ is global
            var currentExports = module.exports;
            // @ts-ignore __webpack_module__ is global
            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;
            // This cannot happen in MainTemplate because the exports mismatch between
            // templating and execution.
            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
            // A module can be accepted automatically based on its exports, e.g. when
            // it is a Refresh Boundary.
            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
                // Save the previous exports signature on update so we can compare the boundary
                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)
                module.hot.dispose(function (data) {
                    data.prevSignature =
                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);
                });
                // Unconditionally accept an update to this module, we'll check if it's
                // still a Refresh Boundary later.
                // @ts-ignore importMeta is replaced in the loader
                module.hot.accept();
                // This field is set when the previous version of this module was a
                // Refresh Boundary, letting us know we need to check for invalidation or
                // enqueue an update.
                if (prevSignature !== null) {
                    // A boundary can become ineligible if its exports are incompatible
                    // with the previous exports.
                    //
                    // For example, if you add/remove/change exports, we'll want to
                    // re-execute the importing modules, and force those components to
                    // re-render. Similarly, if you convert a class component to a
                    // function, we want to invalidate the boundary.
                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {
                        module.hot.invalidate();
                    }
                    else {
                        self.$RefreshHelpers$.scheduleUpdate();
                    }
                }
            }
            else {
                // Since we just executed the code for the module, it's possible that the
                // new exports made it ineligible for being a boundary.
                // We only care about the case when we were _previously_ a boundary,
                // because we already accepted this update (accidental side effect).
                var isNoLongerABoundary = prevSignature !== null;
                if (isNoLongerABoundary) {
                    module.hot.invalidate();
                }
            }
        }
    })();


/***/ })

});