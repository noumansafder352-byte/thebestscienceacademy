import { r as __toESM, t as __commonJSMin } from "../_runtime.mjs";
import { c as require_react } from "./react+tanstack__react-query.mjs";
//#region node_modules/prop-types/lib/ReactPropTypesSecret.js
/**
* Copyright (c) 2013-present, Facebook, Inc.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_ReactPropTypesSecret = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
}));
//#endregion
//#region node_modules/prop-types/factoryWithThrowingShims.js
/**
* Copyright (c) 2013-present, Facebook, Inc.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_factoryWithThrowingShims = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var ReactPropTypesSecret = require_ReactPropTypesSecret();
	function emptyFunction() {}
	function emptyFunctionWithReset() {}
	emptyFunctionWithReset.resetWarningCache = emptyFunction;
	module.exports = function() {
		function shim(props, propName, componentName, location, propFullName, secret) {
			if (secret === ReactPropTypesSecret) return;
			var err = /* @__PURE__ */ new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
			err.name = "Invariant Violation";
			throw err;
		}
		shim.isRequired = shim;
		function getShim() {
			return shim;
		}
		var ReactPropTypes = {
			array: shim,
			bigint: shim,
			bool: shim,
			func: shim,
			number: shim,
			object: shim,
			string: shim,
			symbol: shim,
			any: shim,
			arrayOf: getShim,
			element: shim,
			elementType: shim,
			instanceOf: getShim,
			node: shim,
			objectOf: getShim,
			oneOf: getShim,
			oneOfType: getShim,
			shape: getShim,
			exact: getShim,
			checkPropTypes: emptyFunctionWithReset,
			resetWarningCache: emptyFunction
		};
		ReactPropTypes.PropTypes = ReactPropTypes;
		return ReactPropTypes;
	};
}));
//#endregion
//#region node_modules/prop-types/index.js
var require_prop_types = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_factoryWithThrowingShims()();
}));
//#endregion
//#region node_modules/input-format/modules/edit.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_prop_types = /* @__PURE__ */ __toESM(require_prop_types(), 1);
function edit(value, caret, operation) {
	switch (operation) {
		case "Backspace":
			if (caret > 0) {
				value = value.slice(0, caret - 1) + value.slice(caret);
				caret--;
			}
			break;
		case "Delete":
			value = value.slice(0, caret) + value.slice(caret + 1);
			break;
	}
	return {
		value,
		caret
	};
}
//#endregion
//#region node_modules/input-format/modules/parse.js
function parse(text, caret_position, parse_character) {
	var context = {};
	var value = "";
	var focused_input_character_index = 0;
	var index = 0;
	while (index < text.length) {
		var character = parse_character(text[index], value, context);
		if (character !== void 0) {
			value += character;
			if (caret_position !== void 0) {
				if (caret_position === index) focused_input_character_index = value.length - 1;
				else if (caret_position > index) focused_input_character_index = value.length;
			}
		}
		index++;
	}
	if (caret_position === void 0) focused_input_character_index = value.length;
	return {
		value,
		caret: focused_input_character_index
	};
}
//#endregion
//#region node_modules/input-format/modules/helpers.js
function _createForOfIteratorHelperLoose$1(o, allowArrayLike) {
	var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
	if (it) return (it = it.call(o)).next.bind(it);
	if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") {
		if (it) o = it;
		var i = 0;
		return function() {
			if (i >= o.length) return { done: true };
			return {
				done: false,
				value: o[i++]
			};
		};
	}
	throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$1(o, minLen) {
	if (!o) return;
	if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
	var n = Object.prototype.toString.call(o).slice(8, -1);
	if (n === "Object" && o.constructor) n = o.constructor.name;
	if (n === "Map" || n === "Set") return Array.from(o);
	if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
}
function _arrayLikeToArray$1(arr, len) {
	if (len == null || len > arr.length) len = arr.length;
	for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
	return arr2;
}
function count_occurences(symbol, string) {
	var count = 0;
	for (var _iterator = _createForOfIteratorHelperLoose$1(string.split("")), _step; !(_step = _iterator()).done;) if (_step.value === symbol) count++;
	return count;
}
//#endregion
//#region node_modules/input-format/modules/closeBraces.js
function closeBraces(retained_template, template) {
	var placeholder = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "x";
	var empty_placeholder = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : " ";
	var cut_before = retained_template.length;
	var dangling_braces = count_occurences("(", retained_template) - count_occurences(")", retained_template);
	while (dangling_braces > 0 && cut_before < template.length) {
		retained_template += template[cut_before].replace(placeholder, empty_placeholder);
		if (template[cut_before] === ")") dangling_braces--;
		cut_before++;
	}
	return retained_template;
}
//#endregion
//#region node_modules/input-format/modules/templateFormatter.js
function _createForOfIteratorHelperLoose(o, allowArrayLike) {
	var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
	if (it) return (it = it.call(o)).next.bind(it);
	if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
		if (it) o = it;
		var i = 0;
		return function() {
			if (i >= o.length) return { done: true };
			return {
				done: false,
				value: o[i++]
			};
		};
	}
	throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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
function templateFormatter_default(template) {
	var placeholder = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "x";
	var shouldCloseBraces = arguments.length > 2 ? arguments[2] : void 0;
	if (!template) return function(value) {
		return { text: value };
	};
	var placeholdersCountInTemplate = count_occurences(placeholder, template);
	return function(value) {
		if (!value) return {
			text: "",
			template
		};
		var characterIndexInValue = 0;
		var templateWithFilledInPlaceholders = "";
		for (var _iterator = _createForOfIteratorHelperLoose(template.split("")), _step; !(_step = _iterator()).done;) {
			var character = _step.value;
			if (character !== placeholder) {
				templateWithFilledInPlaceholders += character;
				continue;
			}
			templateWithFilledInPlaceholders += value[characterIndexInValue];
			characterIndexInValue++;
			if (characterIndexInValue === value.length) {
				if (value.length < placeholdersCountInTemplate) break;
			}
		}
		if (shouldCloseBraces) templateWithFilledInPlaceholders = closeBraces(templateWithFilledInPlaceholders, template);
		return {
			text: templateWithFilledInPlaceholders,
			template
		};
	};
}
//#endregion
//#region node_modules/input-format/modules/format.js
function format(value, caret, formatter) {
	if (typeof formatter === "string") formatter = templateFormatter_default(formatter);
	var _ref = formatter(value) || {}, text = _ref.text, template = _ref.template;
	if (text === void 0) text = value;
	if (template) if (caret === void 0) caret = text.length;
	else {
		var index = 0;
		var found = false;
		var possibly_last_input_character_index = -1;
		while (index < text.length && index < template.length) {
			if (text[index] !== template[index]) {
				if (caret === 0) {
					found = true;
					caret = index;
					break;
				}
				possibly_last_input_character_index = index;
				caret--;
			}
			index++;
		}
		if (!found) caret = possibly_last_input_character_index + 1;
	}
	return {
		text,
		caret
	};
}
//#endregion
//#region node_modules/input-format/modules/dom.js
function isReadOnly(element) {
	return element.hasAttribute("readonly");
}
function getSelection(element) {
	if (element.selectionStart === element.selectionEnd) return;
	return {
		start: element.selectionStart,
		end: element.selectionEnd
	};
}
var Keys = {
	Backspace: 8,
	Delete: 46
};
function getOperation(event) {
	switch (event.keyCode) {
		case Keys.Backspace: return "Backspace";
		case Keys.Delete: return "Delete";
	}
}
function getCaretPosition(element) {
	return element.selectionStart;
}
function setCaretPosition(element, caret_position) {
	if (caret_position === void 0) return;
	if (isAndroid()) setTimeout(function() {
		return element.setSelectionRange(caret_position, caret_position);
	}, 0);
	else element.setSelectionRange(caret_position, caret_position);
}
function isAndroid() {
	if (typeof navigator !== "undefined") return ANDROID_USER_AGENT_REG_EXP.test(navigator.userAgent);
}
var ANDROID_USER_AGENT_REG_EXP = /Android/i;
//#endregion
//#region node_modules/input-format/modules/inputControl.js
function onChange(event, input, _parse, _format, on_change) {
	formatInputText(input, _parse, _format, void 0, on_change);
}
function onKeyDown(event, input, _parse, _format, on_change) {
	if (isReadOnly(input)) return;
	var operation = getOperation(event);
	switch (operation) {
		case "Delete":
		case "Backspace":
			event.preventDefault();
			var selection = getSelection(input);
			if (selection) {
				eraseSelection(input, selection);
				return formatInputText(input, _parse, _format, void 0, on_change);
			}
			return formatInputText(input, _parse, _format, operation, on_change);
		default:
	}
}
/**
* Erases the selected text inside an `<input/>`.
* @param  {DOMElement} input
* @param  {Selection} selection
*/
function eraseSelection(input, selection) {
	var text = input.value;
	text = text.slice(0, selection.start) + text.slice(selection.end);
	input.value = text;
	setCaretPosition(input, selection.start);
}
/**
* Parses and re-formats `<input/>` textual value.
* E.g. when a user enters something into the `<input/>`
* that raw input must first be parsed and the re-formatted properly.
* Is called either after some user input (e.g. entered a character, pasted something)
* or after the user performed an `operation` (e.g. "Backspace", "Delete").
* @param  {DOMElement} input
* @param  {Function} parse
* @param  {Function} format
* @param  {string} [operation] - The operation that triggered `<input/>` textual value change. E.g. "Backspace", "Delete".
* @param  {Function} onChange
*/
function formatInputText(input, _parse, _format, operation, on_change) {
	var _parse2 = parse(input.value, getCaretPosition(input), _parse), value = _parse2.value, caret = _parse2.caret;
	if (operation) {
		var newValueAndCaret = edit(value, caret, operation);
		value = newValueAndCaret.value;
		caret = newValueAndCaret.caret;
	}
	var formatted = format(value, caret, _format);
	var text = formatted.text;
	caret = formatted.caret;
	input.value = text;
	setCaretPosition(input, caret);
	if (on_change) on_change(value);
}
//#endregion
//#region node_modules/input-format/modules/react/useInput.js
var _excluded$1 = [
	"ref",
	"parse",
	"format",
	"value",
	"defaultValue",
	"controlled",
	"onChange",
	"onKeyDown"
];
function ownKeys$1(object, enumerableOnly) {
	var keys = Object.keys(object);
	if (Object.getOwnPropertySymbols) {
		var symbols = Object.getOwnPropertySymbols(object);
		enumerableOnly && (symbols = symbols.filter(function(sym) {
			return Object.getOwnPropertyDescriptor(object, sym).enumerable;
		})), keys.push.apply(keys, symbols);
	}
	return keys;
}
function _objectSpread$1(target) {
	for (var i = 1; i < arguments.length; i++) {
		var source = null != arguments[i] ? arguments[i] : {};
		i % 2 ? ownKeys$1(Object(source), !0).forEach(function(key) {
			_defineProperty$1(target, key, source[key]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function(key) {
			Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
		});
	}
	return target;
}
function _defineProperty$1(obj, key, value) {
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _objectWithoutProperties$1(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$1(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose$1(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
function useInput(_ref) {
	var ref = _ref.ref, parse = _ref.parse, format = _ref.format, value = _ref.value, defaultValue = _ref.defaultValue, _ref$controlled = _ref.controlled, controlled = _ref$controlled === void 0 ? true : _ref$controlled, onChange$1 = _ref.onChange, onKeyDown$1 = _ref.onKeyDown, rest = _objectWithoutProperties$1(_ref, _excluded$1);
	var internalRef = (0, import_react.useRef)();
	var setRef = (0, import_react.useCallback)(function(instance) {
		internalRef.current = instance;
		if (ref) if (typeof ref === "function") ref(instance);
		else ref.current = instance;
	}, [ref]);
	var _onChange = (0, import_react.useCallback)(function(event) {
		return onChange(event, internalRef.current, parse, format, onChange$1);
	}, [
		internalRef,
		parse,
		format,
		onChange$1
	]);
	var _onKeyDown = (0, import_react.useCallback)(function(event) {
		if (onKeyDown$1) onKeyDown$1(event);
		if (event.defaultPrevented) return;
		return onKeyDown(event, internalRef.current, parse, format, onChange$1);
	}, [
		internalRef,
		parse,
		format,
		onChange$1,
		onKeyDown$1
	]);
	var commonProps = _objectSpread$1(_objectSpread$1({}, rest), {}, {
		ref: setRef,
		onChange: _onChange,
		onKeyDown: _onKeyDown
	});
	if (controlled) return _objectSpread$1(_objectSpread$1({}, commonProps), {}, { value: format(isEmptyValue(value) ? "" : value).text });
	return _objectSpread$1(_objectSpread$1({}, commonProps), {}, { defaultValue: format(isEmptyValue(defaultValue) ? "" : defaultValue).text });
}
function isEmptyValue(value) {
	return value === void 0 || value === null;
}
//#endregion
//#region node_modules/input-format/modules/react/Input.js
var _excluded = [
	"inputComponent",
	"parse",
	"format",
	"value",
	"defaultValue",
	"onChange",
	"controlled",
	"onKeyDown",
	"type"
];
function ownKeys(object, enumerableOnly) {
	var keys = Object.keys(object);
	if (Object.getOwnPropertySymbols) {
		var symbols = Object.getOwnPropertySymbols(object);
		enumerableOnly && (symbols = symbols.filter(function(sym) {
			return Object.getOwnPropertyDescriptor(object, sym).enumerable;
		})), keys.push.apply(keys, symbols);
	}
	return keys;
}
function _objectSpread(target) {
	for (var i = 1; i < arguments.length; i++) {
		var source = null != arguments[i] ? arguments[i] : {};
		i % 2 ? ownKeys(Object(source), !0).forEach(function(key) {
			_defineProperty(target, key, source[key]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
			Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
		});
	}
	return target;
}
function _defineProperty(obj, key, value) {
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _objectWithoutProperties(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
function Input(_ref, ref) {
	var _ref$inputComponent = _ref.inputComponent, InputComponent = _ref$inputComponent === void 0 ? "input" : _ref$inputComponent, parse = _ref.parse, format = _ref.format, value = _ref.value, defaultValue = _ref.defaultValue, onChange = _ref.onChange, controlled = _ref.controlled, onKeyDown = _ref.onKeyDown, _ref$type = _ref.type, type = _ref$type === void 0 ? "text" : _ref$type, rest = _objectWithoutProperties(_ref, _excluded);
	var inputProps = useInput(_objectSpread({
		ref,
		parse,
		format,
		value,
		defaultValue,
		onChange,
		controlled,
		onKeyDown,
		type
	}, rest));
	return /*#__PURE__*/ import_react.createElement(InputComponent, inputProps);
}
Input = /*#__PURE__*/ import_react.forwardRef(Input);
Input.propTypes = {
	parse: import_prop_types.default.func.isRequired,
	format: import_prop_types.default.func.isRequired,
	inputComponent: import_prop_types.default.elementType,
	type: import_prop_types.default.string,
	value: import_prop_types.default.string,
	defaultValue: import_prop_types.default.string,
	onChange: import_prop_types.default.func,
	controlled: import_prop_types.default.bool,
	onKeyDown: import_prop_types.default.func,
	onCut: import_prop_types.default.func,
	onPaste: import_prop_types.default.func
};
var Input_default = Input;
//#endregion
export { require_prop_types as n, Input_default as t };
