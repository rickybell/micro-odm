"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollectionODM = exports.MicroODM = void 0;

require("@babel/polyfill");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MicroODM =
/*#__PURE__*/
function () {
  function MicroODM() {
    var document = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, MicroODM);

    document.type = this.constructor.name.toLowerCase();
    document.name = this.constructor.name;
    this.document = document;
    if (!this.document._id) this.document._id = Math.random().toString();
    var configuration = {};
    Object.keys(document).forEach(function (prop) {
      configuration[prop] = {
        get: function get() {
          return this.document[prop];
        },
        set: function set(value) {
          this.document[prop] = value;
        }
      };
    });
    Object.defineProperties(this, configuration);
  }

  _createClass(MicroODM, [{
    key: "export",
    value: function _export() {
      return JSON.stringify(this.document);
    }
  }]);

  return MicroODM;
}();

exports.MicroODM = MicroODM;

var CollectionODM =
/*#__PURE__*/
function () {
  function CollectionODM() {
    var initialItens = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, CollectionODM);

    var configuration = {};
    this.document = {};
    this.document.type = this.constructor.name.toLowerCase();
    configuration.type = {
      get: function get() {
        return this.document.type;
      },
      set: function set(value) {
        this.document.type = value;
      }
    };
    Object.defineProperties(this, configuration);
    this.setOfItems = initialItens;
  }

  _createClass(CollectionODM, [{
    key: "add",
    value: function add(item) {
      this.setOfItems.push(item);
    }
  }, {
    key: "find",
    value: function find(infoToSearch) {
      var keyToSearch = Object.keys(infoToSearch)[0];
      var indexIfFound = this.setOfItems.findIndex(function (itemToCompare) {
        return Object.keys(itemToCompare.document).find(function (keyFromItem) {
          if (keyFromItem === keyToSearch) {
            return itemToCompare[keyFromItem].toString() === infoToSearch[keyToSearch].toString();
          }
        });
      });
      return this.setOfItems[indexIfFound];
    }
  }, {
    key: "delete",
    value: function _delete(info) {
      var index = this.setOfItems.findIndex(function (item) {
        return item.id === info.id;
      });
      this.setOfItems.splice(index, 1);
    }
  }, {
    key: "size",
    value: function size() {
      return this.setOfItems.length;
    }
  }, {
    key: "export",
    value: function _export() {
      return JSON.stringify(this.setOfItems);
    }
  }, {
    key: "iterator",
    value:
    /*#__PURE__*/
    regeneratorRuntime.mark(function iterator() {
      var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item;

      return regeneratorRuntime.wrap(function iterator$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // eslint-disable-next-line no-restricted-syntax
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 3;
              _iterator = this.setOfItems[Symbol.iterator]();

            case 5:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 12;
                break;
              }

              item = _step.value;
              _context.next = 9;
              return item;

            case 9:
              _iteratorNormalCompletion = true;
              _context.next = 5;
              break;

            case 12:
              _context.next = 18;
              break;

            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](3);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 18:
              _context.prev = 18;
              _context.prev = 19;

              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }

            case 21:
              _context.prev = 21;

              if (!_didIteratorError) {
                _context.next = 24;
                break;
              }

              throw _iteratorError;

            case 24:
              return _context.finish(21);

            case 25:
              return _context.finish(18);

            case 26:
            case "end":
              return _context.stop();
          }
        }
      }, iterator, this, [[3, 14, 18, 26], [19,, 21, 25]]);
    })
  }]);

  return CollectionODM;
}();

exports.CollectionODM = CollectionODM;