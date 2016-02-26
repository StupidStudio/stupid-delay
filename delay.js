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
		tick.add(update);
	}

	function update(){
		var now = Date.now();
		for (var i = 0; i < collection.length; i++) {
			var delayObject = collection[i];
			if(delayObject.time <= now){
				delayObject.callback();
				Iterator.remove(delayObject, collection);
			}
		};
	}

	function add(_time, _callback){
		var delayObject = {time: parseInt(_time) + Date.now(), callback: _callback};
		Iterator.add(delayObject, collection);
	}

	/*
	* Public
	*/
	self.add = add;

	/*
	* Init
	*/

	init();

	return self;
}

module.exports = Delay;