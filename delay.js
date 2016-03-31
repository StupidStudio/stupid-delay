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