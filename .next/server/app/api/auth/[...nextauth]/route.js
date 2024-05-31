"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/[...nextauth]/route";
exports.ids = ["app/api/auth/[...nextauth]/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist\\client\\components\\action-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist\\client\\components\\action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist\\client\\components\\request-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist\\client\\components\\request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!*********************************************************************************************!*\
  !*** external "next/dist\\client\\components\\static-generation-async-storage.external.js" ***!
  \*********************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist\\client\\components\\static-generation-async-storage.external.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.js&appDir=C%3A%5CUsers%5CDearen%5CDocuments%5CDearen%5CSkripsi%5Ctugas-akhir-dearen-hippy%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CDearen%5CDocuments%5CDearen%5CSkripsi%5Ctugas-akhir-dearen-hippy&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.js&appDir=C%3A%5CUsers%5CDearen%5CDocuments%5CDearen%5CSkripsi%5Ctugas-akhir-dearen-hippy%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CDearen%5CDocuments%5CDearen%5CSkripsi%5Ctugas-akhir-dearen-hippy&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   headerHooks: () => (/* binding */ headerHooks),\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),\n/* harmony export */   staticGenerationBailout: () => (/* binding */ staticGenerationBailout)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Dearen_Documents_Dearen_Skripsi_tugas_akhir_dearen_hippy_src_app_api_auth_nextauth_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/auth/[...nextauth]/route.js */ \"(rsc)/./src/app/api/auth/[...nextauth]/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Dearen\\\\Documents\\\\Dearen\\\\Skripsi\\\\tugas-akhir-dearen-hippy\\\\src\\\\app\\\\api\\\\auth\\\\[...nextauth]\\\\route.js\",\n    nextConfigOutput,\n    userland: C_Users_Dearen_Documents_Dearen_Skripsi_tugas_akhir_dearen_hippy_src_app_api_auth_nextauth_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks, headerHooks, staticGenerationBailout } = routeModule;\nconst originalPathname = \"/api/auth/[...nextauth]/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNEZWFyZW4lNUNEb2N1bWVudHMlNUNEZWFyZW4lNUNTa3JpcHNpJTVDdHVnYXMtYWtoaXItZGVhcmVuLWhpcHB5JTVDc3JjJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNEZWFyZW4lNUNEb2N1bWVudHMlNUNEZWFyZW4lNUNTa3JpcHNpJTVDdHVnYXMtYWtoaXItZGVhcmVuLWhpcHB5JmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFzRztBQUN2QztBQUNjO0FBQ3FFO0FBQ2xKO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnSEFBbUI7QUFDM0M7QUFDQSxjQUFjLHlFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsdUdBQXVHO0FBQy9HO0FBQ0E7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDNko7O0FBRTdKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbGVhcm5yZWFjdG5leHQvPzM4YjgiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcRGVhcmVuXFxcXERvY3VtZW50c1xcXFxEZWFyZW5cXFxcU2tyaXBzaVxcXFx0dWdhcy1ha2hpci1kZWFyZW4taGlwcHlcXFxcc3JjXFxcXGFwcFxcXFxhcGlcXFxcYXV0aFxcXFxbLi4ubmV4dGF1dGhdXFxcXHJvdXRlLmpzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hdXRoL1suLi5uZXh0YXV0aF1cIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXERlYXJlblxcXFxEb2N1bWVudHNcXFxcRGVhcmVuXFxcXFNrcmlwc2lcXFxcdHVnYXMtYWtoaXItZGVhcmVuLWhpcHB5XFxcXHNyY1xcXFxhcHBcXFxcYXBpXFxcXGF1dGhcXFxcWy4uLm5leHRhdXRoXVxcXFxyb3V0ZS5qc1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBoZWFkZXJIb29rcywgc3RhdGljR2VuZXJhdGlvbkJhaWxvdXQgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgaGVhZGVySG9va3MsIHN0YXRpY0dlbmVyYXRpb25CYWlsb3V0LCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.js&appDir=C%3A%5CUsers%5CDearen%5CDocuments%5CDearen%5CSkripsi%5Ctugas-akhir-dearen-hippy%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CDearen%5CDocuments%5CDearen%5CSkripsi%5Ctugas-akhir-dearen-hippy&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/auth/[...nextauth]/route.js":
/*!*************************************************!*\
  !*** ./src/app/api/auth/[...nextauth]/route.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var next_auth_next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/next */ \"(rsc)/./node_modules/next-auth/next/index.js\");\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/google */ \"(rsc)/./node_modules/next-auth/providers/google.js\");\n/* harmony import */ var _modules_db__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../modules/db */ \"(rsc)/./src/modules/db.ts\");\n/* harmony import */ var _modules_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/modules/auth */ \"(rsc)/./src/modules/auth.ts\");\n\n\n\n\nconst handler = (0,next_auth_next__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_modules_auth__WEBPACK_IMPORTED_MODULE_3__.authConfig);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQXNDO0FBQ2tCO0FBQ2hCO0FBQ0k7QUFFNUMsTUFBTUksVUFBVUosMERBQVFBLENBQUNHLHFEQUFVQTtBQUVNIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbGVhcm5yZWFjdG5leHQvLi9zcmMvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUuanM/MjMyZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTmV4dEF1dGggZnJvbSBcIm5leHQtYXV0aC9uZXh0XCI7XHJcbmltcG9ydCBHb29nbGVQcm92aWRlciBmcm9tIFwibmV4dC1hdXRoL3Byb3ZpZGVycy9nb29nbGVcIjtcclxuaW1wb3J0IGRiIGZyb20gXCIuLi8uLi8uLi8uLi9tb2R1bGVzL2RiXCI7XHJcbmltcG9ydCB7IGF1dGhDb25maWcgfSBmcm9tIFwiQC9tb2R1bGVzL2F1dGhcIjtcclxuXHJcbmNvbnN0IGhhbmRsZXIgPSBOZXh0QXV0aChhdXRoQ29uZmlnKTtcclxuXHJcbmV4cG9ydCB7aGFuZGxlciBhcyBHRVQsIGhhbmRsZXIgYXMgUE9TVH07Il0sIm5hbWVzIjpbIk5leHRBdXRoIiwiR29vZ2xlUHJvdmlkZXIiLCJkYiIsImF1dGhDb25maWciLCJoYW5kbGVyIiwiR0VUIiwiUE9TVCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/auth/[...nextauth]/route.js\n");

/***/ }),

/***/ "(rsc)/./src/modules/auth.ts":
/*!*****************************!*\
  !*** ./src/modules/auth.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authConfig: () => (/* binding */ authConfig)\n/* harmony export */ });\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/providers/google */ \"(rsc)/./node_modules/next-auth/providers/google.js\");\n/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./db */ \"(rsc)/./src/modules/db.ts\");\n\n\nconst authConfig = {\n    providers: [\n        (0,next_auth_providers_google__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n            clientId: process.env.GOOGLE_CLIENT_ID,\n            clientSecret: process.env.GOOGLE_CLIENT_SECRET\n        })\n    ],\n    callbacks: {\n        async signIn (user) {\n            // console.log(user);\n            const userDB = await _db__WEBPACK_IMPORTED_MODULE_1__[\"default\"].user.findFirst({\n                where: {\n                    email: String(user.user.email)\n                },\n                include: {\n                    role: true\n                }\n            });\n            if (!userDB) {\n                console.log(\"Error\");\n                return Promise.resolve(false);\n            }\n            return Promise.resolve(true);\n        }\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbW9kdWxlcy9hdXRoLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUN3RDtBQUNsQztBQUVmLE1BQU1FLGFBQThCO0lBQ3ZDQyxXQUFVO1FBQ05ILHNFQUFjQSxDQUFDO1lBQ1hJLFVBQVNDLFFBQVFDLEdBQUcsQ0FBQ0MsZ0JBQWdCO1lBQ3JDQyxjQUFhSCxRQUFRQyxHQUFHLENBQUNHLG9CQUFvQjtRQUNqRDtLQUNIO0lBQ0RDLFdBQVc7UUFDUCxNQUFNQyxRQUFPQyxJQUFJO1lBQ2IscUJBQXFCO1lBQ3JCLE1BQU1DLFNBQVMsTUFBTVosMkNBQUVBLENBQUNXLElBQUksQ0FBQ0UsU0FBUyxDQUFDO2dCQUNuQ0MsT0FBTztvQkFDSEMsT0FBT0MsT0FBT0wsS0FBS0EsSUFBSSxDQUFDSSxLQUFLO2dCQUNqQztnQkFDQUUsU0FBUztvQkFDTEMsTUFBTTtnQkFDVjtZQUNKO1lBRUEsSUFBRyxDQUFDTixRQUFPO2dCQUNQTyxRQUFRQyxHQUFHLENBQUM7Z0JBQ1osT0FBT0MsUUFBUUMsT0FBTyxDQUFDO1lBQzNCO1lBRUEsT0FBT0QsUUFBUUMsT0FBTyxDQUFDO1FBQzNCO0lBQ0o7QUFDSixFQUFFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbGVhcm5yZWFjdG5leHQvLi9zcmMvbW9kdWxlcy9hdXRoLnRzP2JlNjYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dEF1dGhPcHRpb25zLCBnZXRTZXJ2ZXJTZXNzaW9uIH0gZnJvbSBcIm5leHQtYXV0aFwiO1xyXG5pbXBvcnQgR29vZ2xlUHJvdmlkZXIgZnJvbSBcIm5leHQtYXV0aC9wcm92aWRlcnMvZ29vZ2xlXCI7XHJcbmltcG9ydCBkYiBmcm9tIFwiLi9kYlwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IGF1dGhDb25maWc6IE5leHRBdXRoT3B0aW9ucyA9IHtcclxuICAgIHByb3ZpZGVyczpbXHJcbiAgICAgICAgR29vZ2xlUHJvdmlkZXIoe1xyXG4gICAgICAgICAgICBjbGllbnRJZDpwcm9jZXNzLmVudi5HT09HTEVfQ0xJRU5UX0lEIGFzIHN0cmluZyxcclxuICAgICAgICAgICAgY2xpZW50U2VjcmV0OnByb2Nlc3MuZW52LkdPT0dMRV9DTElFTlRfU0VDUkVUIGFzIHN0cmluZ1xyXG4gICAgICAgIH0pLFxyXG4gICAgXSxcclxuICAgIGNhbGxiYWNrczoge1xyXG4gICAgICAgIGFzeW5jIHNpZ25Jbih1c2VyKXtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codXNlcik7XHJcbiAgICAgICAgICAgIGNvbnN0IHVzZXJEQiA9IGF3YWl0IGRiLnVzZXIuZmluZEZpcnN0KHtcclxuICAgICAgICAgICAgICAgIHdoZXJlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6IFN0cmluZyh1c2VyLnVzZXIuZW1haWwpLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGluY2x1ZGU6IHtcclxuICAgICAgICAgICAgICAgICAgICByb2xlOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoIXVzZXJEQil7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59OyJdLCJuYW1lcyI6WyJHb29nbGVQcm92aWRlciIsImRiIiwiYXV0aENvbmZpZyIsInByb3ZpZGVycyIsImNsaWVudElkIiwicHJvY2VzcyIsImVudiIsIkdPT0dMRV9DTElFTlRfSUQiLCJjbGllbnRTZWNyZXQiLCJHT09HTEVfQ0xJRU5UX1NFQ1JFVCIsImNhbGxiYWNrcyIsInNpZ25JbiIsInVzZXIiLCJ1c2VyREIiLCJmaW5kRmlyc3QiLCJ3aGVyZSIsImVtYWlsIiwiU3RyaW5nIiwiaW5jbHVkZSIsInJvbGUiLCJjb25zb2xlIiwibG9nIiwiUHJvbWlzZSIsInJlc29sdmUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/modules/auth.ts\n");

/***/ }),

/***/ "(rsc)/./src/modules/db.ts":
/*!***************************!*\
  !*** ./src/modules/db.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst prismaClientSingleton = ()=>{\n    return new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\n};\nconst db = globalThis.prismaGlobal ?? prismaClientSingleton();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (db);\nif (true) globalThis.prismaGlobal = db;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbW9kdWxlcy9kYi50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBNkM7QUFFN0MsTUFBTUMsd0JBQXdCO0lBQzVCLE9BQU8sSUFBSUQsd0RBQVlBO0FBQ3pCO0FBTUEsTUFBTUUsS0FBS0MsV0FBV0MsWUFBWSxJQUFJSDtBQUV0QyxpRUFBZUMsRUFBRUEsRUFBQTtBQUVqQixJQUFJRyxJQUF5QixFQUFjRixXQUFXQyxZQUFZLEdBQUdGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbGVhcm5yZWFjdG5leHQvLi9zcmMvbW9kdWxlcy9kYi50cz8yMjQ5Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gJ0BwcmlzbWEvY2xpZW50J1xyXG5cclxuY29uc3QgcHJpc21hQ2xpZW50U2luZ2xldG9uID0gKCkgPT4ge1xyXG4gIHJldHVybiBuZXcgUHJpc21hQ2xpZW50KClcclxufVxyXG5cclxuZGVjbGFyZSBnbG9iYWwge1xyXG4gIHZhciBwcmlzbWFHbG9iYWw6IHVuZGVmaW5lZCB8IFJldHVyblR5cGU8dHlwZW9mIHByaXNtYUNsaWVudFNpbmdsZXRvbj5cclxufVxyXG5cclxuY29uc3QgZGIgPSBnbG9iYWxUaGlzLnByaXNtYUdsb2JhbCA/PyBwcmlzbWFDbGllbnRTaW5nbGV0b24oKVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGJcclxuXHJcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSBnbG9iYWxUaGlzLnByaXNtYUdsb2JhbCA9IGRiIl0sIm5hbWVzIjpbIlByaXNtYUNsaWVudCIsInByaXNtYUNsaWVudFNpbmdsZXRvbiIsImRiIiwiZ2xvYmFsVGhpcyIsInByaXNtYUdsb2JhbCIsInByb2Nlc3MiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/modules/db.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/@babel","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/preact-render-to-string","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.js&appDir=C%3A%5CUsers%5CDearen%5CDocuments%5CDearen%5CSkripsi%5Ctugas-akhir-dearen-hippy%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CDearen%5CDocuments%5CDearen%5CSkripsi%5Ctugas-akhir-dearen-hippy&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();