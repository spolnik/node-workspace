require("source-map-support").install();
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var command_1 = __webpack_require__(1);
	var contact_1 = __webpack_require__(2);
	var command = new command_1.Command(new contact_1.JsonfileContactRepository(), new contact_1.ContactFactory());
	function handleError(err) {
	    if (err) {
	        console.log(err);
	    }
	    else {
	        console.log('OK! The command ran successfully!');
	    }
	}
	command.executeCurrentOperation(handleError);


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	var Command = (function () {
	    function Command(contactRepository, contactFactory) {
	        this.contactRepository = contactRepository;
	        this.contactFactory = contactFactory;
	    }
	    Command.prototype.add = function (done) {
	        if (this.getOperation() !== 'add') {
	            return;
	        }
	        var data = this.getOperationData();
	        var name = this.parseName(data);
	        var number = this.parseNumber(data);
	        var contact = this.contactFactory.createContact(name, number);
	        this.contactRepository.saveContact(contact, done);
	    };
	    Command.prototype.find = function (done) {
	        if (this.getOperation() !== 'find') {
	            return;
	        }
	        var data = this.getOperationData();
	        this.contactRepository.findContacts(data, function (err, data) {
	            if (err) {
	                return done(err);
	            }
	            data.forEach(function (contact) {
	                console.log(contact.name, contact.number);
	            });
	            done(null, data);
	        });
	    };
	    Command.prototype.getOperation = function () {
	        return process.argv[2];
	    };
	    Command.prototype.getOperationData = function () {
	        return process.argv[3];
	    };
	    Command.prototype.parseName = function (input) {
	        return input.split(',')[0].trim();
	    };
	    Command.prototype.parseNumber = function (input) {
	        return input.split(',')[1].trim();
	    };
	    Command.prototype.executeCurrentOperation = function (done) {
	        var operation = this.getOperation();
	        var command;
	        switch (operation) {
	            case "add":
	                command = this.add;
	                break;
	            case "find":
	                command = this.find;
	                break;
	            default:
	                command = function (done) {
	                    done('Invalid command!');
	                };
	        }
	        command.bind(this)(done);
	    };
	    return Command;
	}());
	exports.Command = Command;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var util_1 = __webpack_require__(3);
	var jsonfile_1 = __webpack_require__(6);
	var ContactFactory = (function () {
	    function ContactFactory() {
	    }
	    ContactFactory.prototype.createContact = function (name, number) {
	        return {
	            name: name,
	            number: number
	        };
	    };
	    return ContactFactory;
	}());
	exports.ContactFactory = ContactFactory;
	var JsonfileContactRepository = (function () {
	    function JsonfileContactRepository() {
	        this.jsonfile = new jsonfile_1.Jsonfile();
	    }
	    JsonfileContactRepository.prototype.saveContact = function (contact, done) {
	        var that = this;
	        this.loadContacts(function (err, contacts) {
	            if (err) {
	                return done(err);
	            }
	            contacts.push(contact);
	            that.saveContacts(contacts, done);
	        });
	    };
	    JsonfileContactRepository.prototype.findContacts = function (name, done) {
	        this.loadContacts(function (err, contacts) {
	            if (err) {
	                return done(err);
	            }
	            var byName = function (contact) {
	                return contact.name === name;
	            };
	            var result = contacts.filter(byName);
	            done(null, result);
	        });
	    };
	    JsonfileContactRepository.prototype.loadContacts = function (done) {
	        var jsonPath = util_1.Util.getDataPath();
	        this.jsonfile.readFile(jsonPath, done, null);
	    };
	    JsonfileContactRepository.prototype.saveContacts = function (contacts, done) {
	        var jsonPath = util_1.Util.getDataPath();
	        this.jsonfile.writeFile(jsonPath, contacts, done, null);
	    };
	    return JsonfileContactRepository;
	}());
	exports.JsonfileContactRepository = JsonfileContactRepository;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var fs = __webpack_require__(4);
	var path = __webpack_require__(5);
	var Util = (function () {
	    function Util() {
	    }
	    Util.getHomeDirectory = function () {
	        return process.platform === 'win32'
	            ? process.env['USERPROFILE']
	            : process.env['HOME'];
	    };
	    ;
	    Util.makeSureDataFileExists = function (dataPath) {
	        fs.exists(dataPath, function (exists) {
	            if (!exists) {
	                fs.writeFile(dataPath, '[]');
	            }
	        });
	    };
	    ;
	    Util.getDataPath = function () {
	        var dataPath = path.join(this.getHomeDirectory(), './data.json');
	        this.makeSureDataFileExists(dataPath);
	        return dataPath;
	    };
	    ;
	    return Util;
	}());
	exports.Util = Util;


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var fs = __webpack_require__(4);
	var Jsonfile = (function () {
	    function Jsonfile(spaces) {
	        if (spaces === void 0) { spaces = null; }
	        this.spaces = spaces;
	    }
	    Jsonfile.prototype.readFile = function (file, options, callback) {
	        if (callback == null) {
	            callback = options;
	            options = {};
	        }
	        fs.readFile(file, options, function (err, data) {
	            if (err)
	                return callback(err);
	            var obj;
	            try {
	                obj = JSON.parse(data, options ? options.reviver : null);
	            }
	            catch (err2) {
	                err2.message = file + ": " + err2.message;
	                return callback(err2);
	            }
	            callback(null, obj);
	        });
	    };
	    Jsonfile.prototype.writeFile = function (file, obj, options, callback) {
	        if (callback == null) {
	            callback = options;
	            options = {};
	        }
	        var spaces = typeof options === 'object' && options !== null
	            ? 'spaces' in options
	                ? options.spaces : this.spaces
	            : this.spaces;
	        var str = '';
	        try {
	            str = JSON.stringify(obj, options ? options.replacer : null, spaces) + "\n";
	        }
	        catch (err) {
	            if (callback)
	                return callback(err, null);
	        }
	        fs.writeFile(file, str, options, callback);
	    };
	    return Jsonfile;
	}());
	exports.Jsonfile = Jsonfile;


/***/ }
/******/ ]);
//# sourceMappingURL=addressBook.js.map