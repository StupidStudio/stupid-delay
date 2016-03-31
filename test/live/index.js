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