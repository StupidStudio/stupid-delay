(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Iterator = require('stupid-iterator');

function Delay(opts){
 	var self = {};
	var opts = opts || {};
	var collection = [];
	var tick = opts.tick;
	
	/*
	* Private
	*/

	function init(){
		
	}

	function update(){
		var now = Date.now();
		for (var i = 0; i < collection.length; i++) {
			var delayObject = collection[i];
			if(delayObject.time <= now){
				if(collection.length === 1) stop();
				delayObject.callback();
				Iterator.remove(delayObject, collection);
			}
		};
	}

	function add(_time, _callback){
		start();
		var delayObject = {time: parseInt(_time) + Date.now(), callback: _callback};
		Iterator.add(delayObject, collection);
	}

	function stop(){
		tick.remove(update);
	}

	function start(){
		try{
			tick.add(update);
		}catch(e){
			console.error("Module missing: 'stupid-tick'. Download the 'stupid-tick' module from npm or github");
		}
		
	}

	function destroy(){
		stop();
		collection = [];
	}

	/*
	* Public
	*/
	self.add = add;
	self.destroy = destroy;
	self.start = start;
	self.stop = stop;

	/*
	* Init
	*/

	init();

	return self;
}

module.exports = Delay;
},{"stupid-iterator":2}],2:[function(require,module,exports){
/**
 * Iterator iterates over a collection
 * @example var current = iterator.next(current, collection);
 */
var iterator = {
	/**
	 * Get the next item in a collection
	 * @example var current = iterator.next(current, collection);
	 * @param {object} current The current item (thats in the collection)
	 * @param {array} collection The collection (that hold the current)
	 * @return {object} the new current
	 */
 	next: function(current, collection){
		return collection[ collection.indexOf(current) + 1 ] || collection[ 0 ];
	},

	/**
	 * Get the previous item in a collection
	 * @example var current = iterator.prev(current, collection);
	 * @param {object} current The current item (thats in the collection)
	 * @param {array} collection The collection (that hold the current)
	 * @return {object} the new current
	 */
	prev: function(current, collection){
		return collection[ collection.indexOf(current) - 1 ] || collection[ collection.length - 1 ];
	},

	/**
	 * Get the next item in a collection or return false
	 * @example var current = iterator.nextOrFalse(current, collection);
	 * @param {object} current The current item (thats in the collection)
	 * @param {array} collection The collection (that hold the current)
	 * @return {object | boolean} the new current or false
	 */
	nextOrFalse: function(current, collection){
		return collection[ collection.indexOf(current) + 1 ] || false;
	},

	/**
	 * Get the previous item in a collection or return false
	 * @example var current = iterator.prevOrFalse(current, collection);
	 * @param {object} current The current item (thats in the collection)
	 * @param {array} collection The collection (that hold the current)
	 * @return {object | boolean} the new current or false
	 */
	prevOrFalse: function(current, collection){
		return collection[ collection.indexOf(current) - 1 ] || false;
	},

	/**
	 * Check if item is the first in the collection
	 * @example var current = iterator.isFirst(current, collection);
	 * @param {object} current The current item (thats in the collection)
	 * @param {array} collection The collection (that hold the current)
	 * @return {boolean}
	 */
	isFirst:function(current, collection){
		return Boolean(current === collection[ 0 ]);
	},

	/**
	 * Check if item is the last in the collection
	 * @example var current = iterator.isLast(current, collection);
	 * @param {object} current The current item (thats in the collection)
	 * @param {array} collection The collection (that hold the current)
	 * @return {boolean}
	 */
	isLast: function(current, collection){
		return Boolean(current === collection[ collection.length - 1 ]);
	},

	/**
	 * Add newObject to collection if its not already in it.
	 * @example iterator.add(newObject, collection);
	 * @param {object} newObject 
	 * @param {array} collection The collection
	 * @return {number} Return the location object have in array
	 */
	add: function(newObject, collection){
		var index = collection.indexOf(newObject);
		if (index === -1) collection.push(newObject);
	},

	/**
	 * Removes object from collection if its in it.
	 * @example iterator.remove(object, collection);
	 * @param {object} object 
	 * @param {array} collection The collection
	 * @return {number} Return the location object had in array
	 */
	remove: function(object, collection){
        var index = collection.indexOf(object);
        if (index != -1) collection.splice(index, 1);
	},

	/**
	 * Return an object with prefixed current and collection
	 * @example iterator.create(current, collection);
	 * @param {object} current The current item (thats in the collection)
	 * @param {array} collection The collection (that hold the current)
	 * @return {object} return new object that uses iterator
	 */
	create: function(current, collection){
		return {

			/**
			 * Get next in collection
			 * @return {object} The current object
			 */
			next: function(){
				current = iterator.next(current, collection);
				return current;
			},

			/**
			 * Get previous in collection
			 * @return {object} The current object
			 */
			prev: function(){
				current = iterator.prev(current, collection);
				return current;
			},

			/**
			 * Get previous or false (set current if not false)
			 * @return {object | boolean} The current object or false
			 */
			nextOrFalse: function(){
				var objectOrFalse = iterator.nextOrFalse(current, collection);
				current = objectOrFalse || current;
				return objectOrFalse;
			},

			/**
			 * Get next or false (set current if not false)
			 * @return {object | boolean} The current object or false
			 */
			prevOrFalse: function(){
				var objectOrFalse = iterator.prevOrFalse(current, collection);
				current = objectOrFalse || current;
				return objectOrFalse;
			},

			/**
			 * Is current first item in array
			 * @return {boolean} True / false
			 */
			isFirst: function(){
				return iterator.isFirst(current, collection);
			},

			/**
			 * Is current last item in array
			 * @return {boolean} True / false
			 */
			isLast: function(){
				return iterator.isLast(current, collection);
			},

			/**
			 * Add object to collection
			 * @return {object} The current object
			 */
			add: function(object){
				iterator.add(object, collection);
				return current;
			},

			/**
			 * Remove object from collection
			 * Set current to new object if current if removed
			 * @return {object} The current object
			 */
			remove: function(object){

				/**
				 * If object is current do something
				 */
				if(object === current){

					/**
					 * If current is first, set current to the next item
					 * Else set current to previous item
					 */
					if(iterator.isFirst(current, collection)){
						current = iterator.next(current, collection);	
					}else{
						current = iterator.prev(current, collection);
					}
				}

				/** Return object from collection */
				iterator.remove(object, collection);

				return current;
			},

			/**
			 * Set object to current
			 * @return {object} The current object
			 */
			set: function(object){
				current = object;
				return current;
			},

			/**
			 * Get the current object
			 * @return {object} The current object
			 */
			get: function(){
				return current;
			}
		};
	}
}

/** @export */
module.exports = iterator;
},{}],3:[function(require,module,exports){
/**
 * Call controller
 */
var callctrl = {
	/**
	 * Once (call a function once)
	 * @example once.trigger(); once.reset();
	 * @param {function} callback The callback
	 * @config {boolean} bool Boolean to control actions
	 * @return {object} Returns a object to trigger callback
	 */
	once: function once(callback){
		var bool = false;
		return{
			trigger:function(){
				if(bool) return;
				bool = true;
				callback();
			},
			reset:function(){
				bool = false;
			}	
		}
	},

	/**
	 * Shift (callbackA can only be called once, until callbackB has been called)
	 * @example shift.alpha(); shift.beta();
	 * @param {function} callbackA The callback
	 * @param {function} callbackB The callback
	 * @config {boolean} bool Boolean to control actions
	 * @return {object} Returns a object to trigger callbacks
	 */
	shift: function shift(callbackA, callbackB){
		var bool = false;
		var callbackA = callbackA || function(){};
		var callbackB = callbackB || function(){};
		return {
			alpha:function() {
				if(bool) return;
				bool = true;
				callbackA();
			},
			beta:function() {
				if(!bool) return;
				bool = false;
				callbackB();
			}
		}
	},

	/**
	 * Toggle (toggle between callbackA and callbackB)
	 * @example toggle.trigger(); toggle.reset();
	 * @param {function} callbackA The callback
	 * @param {function} callbackB The callback
	 * @config {boolean} bool Boolean to control actions
	 * @return {object} Returns a object to trigger callbacks
	 */
	toggle: function toggle(callbackA, callbackB){
		var bool = true;
		return {
			trigger: function() {
				if(bool){
		 			callbackA();
		 		}else{
		 			callbackB();
		 		}
	 			bool = !bool;
			},
			reset:function(){
				bool = true;	
			}
		}
	}
}

/** @export */
module.exports = callctrl;

},{}],4:[function(require,module,exports){
/**
 * @fileoverview Tick RAF controller
 * @author david@stupid-studio.com (David Adalberth Andersen)
 */

var Callctrl = require('stupid-callctrl');
/**
 * Deferred
 * @constructor
 * @param {object} opts Options for the constructor
 */
function Tick(opts) {
    /**
     * @define {object} Collection of public methods.
     */
    var self = {};

    /**
     * @define {object} options for the constructor 
     */
    var opts = opts || {};

    /**
     * @define {array} Collection of function that should be called on every RAF
     */
    var collection = [];

    /**
     * @define {function} requestAnimationFrame variable
     */
    var raf;

    /**
     * @define {number} Holds the current time every tick
     */
    var now;

    /**
     * @define {number} Holds the last time of every tick
     */
    var then = Date.now();

    /**
     * @define {number} Holds the difference bwteen now and then
     */
    var delta;

    /**
     * @define {number} Frames pr second (defaults to 60fps)
     */
    var fps = opts.fps || 60;

    /**
     * @define {boolean} Should stop when collection is empty
     */
    var autoPlayStop = opts.autoPlayStop || false;

    /**
     * @define {number} Converting fps to miliseconds
     */
    var interval = 1000/fps;

    /**
     * @define {boolean} Control is the loop should run
     */
    var isStopped = false;

    /**
     * @define {object} Create a once callback
     */
    var startOnce = Callctrl.once(function(){
        start();
    });

    /**
     * Renders update function at fps giving above
     * @param {type} varname description
     * @config {number} now Set the current time
     * @config {number} delta Calculates the difference between now and then
     */
    function render() {
        if (isStopped) return;

        now = Date.now();
        delta = now - then;
        /**
         * If the difference between now and then is bigger than fps (miliseconds) draw collection.
         */
        if (delta >= interval) {
            /** calculates new then time */
            then = now - (delta % interval);
            /** run updates */
            update();
        }

        /** Runs requestAnimationFrame for continues loop */
        raf = requestAnimationFrame(render);
    }

    /** Update run all the callbacks stored in collection */
    function update(){
        for (var i = 0; i < collection.length; i++) {
            collection[i]();
        };
    }

    /** Stars the render loop */
    function start(){
        isStopped = false;
        render();
    }

    /** Stops the render loop */
    function stop(){
        isStopped = true;
        if(raf) cancelAnimationFrame(raf);
        startOnce.reset();
    }

    /** Checks if Tick should stop or start if collection is empty */
    function shouldPlayOrPause() {
        if(autoPlayStop){
            if(collection.length){
                start();
            }else{
                stop();
            }
        }else{
            startOnce.trigger();
        }
    }

    /** Adds new callback, but checks if its already added */
    function add(callback) {
        var index = collection.indexOf(callback);
        if (index === -1){
            collection.push(callback);
            shouldPlayOrPause();
        }
    }

    /** Removes callback if its in the collection array */
    function remove(callback) {
        var index = collection.indexOf(callback);
        if (index != -1){
            collection.splice(index, 1);
            shouldPlayOrPause();
        }
    }

    /**
     * Public methos
     * @public {function}
     */
    self.add = add;
    self.remove = remove;
    self.start = start;
    self.stop = stop;

    /**
     * @return {object} Returns public methods
     */
    return self;
}

/** @export */
module.exports = Tick;
},{"stupid-callctrl":3}],5:[function(require,module,exports){
var Tick = require('stupid-tick');
var Delay = require('../../delay');

var tick = Tick();
var delay = Delay({
	tick: tick
});

console.log("A");
var time = Date.now();
delay.add(1000, function(){

	console.log("B", Date.now() - time);	
	time = Date.now();

	delay.add(500, function(){
		console.log("C", Date.now() - time);
		time = Date.now();
	});
	
	delay.add(1000, function(){
		console.log("D", Date.now() - time);
		time = Date.now();
		console.log("stop");
		delay.stop();
		setTimeout(function(){
			console.log("start");
			delay.start();
		}, 1000)
	});
	
	delay.add(1500, function(){
		console.log("E", Date.now() - time);
		time = Date.now();
		delay.destroy();
	});

	delay.add(3000, function(){
		console.log("F", Date.now() - time);
		time = Date.now();
	});
});
},{"../../delay":1,"stupid-tick":4}]},{},[5]);
