"use strict";

require("@babel/polyfill");

var _MicroODM = _interopRequireDefault(require("./MicroODM"));

var _CollectionODM = _interopRequireDefault(require("./CollectionODM"));

var _ContextMicroODM = _interopRequireDefault(require("./ContextMicroODM"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

module.exports = {
  MicroODM: _MicroODM["default"],
  CollectionODM: _CollectionODM["default"],
  ContextMicroODM: _ContextMicroODM["default"]
}; // export default MicroODM;
// export default CollectionODM;