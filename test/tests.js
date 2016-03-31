var test = require('tape');
var Tick = require('stupid-tick');
var Delay = require('../delay');
var tick = Tick();

test('Can delay', function(t){
	t.plan(1);
	var delay = Delay({
		tick: tick
	});
	var time = Date.now();
	delay.add(100, function(){
		var now = Date.now() - time;
		if(now > 100){
			t.pass();
		}
	});
});

test('Can have multiple delays', function(t){
	t.plan(2);
	var delay = Delay({
		tick: tick
	});
	var time = Date.now();
	delay.add(100, function(){
		var now = Date.now() - time;
		if(now > 100){
			t.pass();
		}
	});
	delay.add(200, function(){
		var now = Date.now() - time;
		if(now > 200){
			t.pass();
		}
	});
});

test('Can destroy', function(t){
	t.plan(1);
	var delay = Delay({
		tick: tick
	});
	var time = Date.now();
	delay.add(100, function(){
		var now = Date.now() - time;
		if(now > 100){
			t.pass();
			delay.destroy();
		}
	});
	delay.add(200, function(){
		var now = Date.now() - time;
		if(now > 200){
			t.pass();
		}
	});
});

test('Can stop and start', function(t){
	t.plan(2);
	var delay = Delay({
		tick: tick
	});
	var time = Date.now();
	delay.add(100, function(){
		var now = Date.now() - time;
		if(now > 100){
			t.pass();
			delay.pause();
			setTimeout(function(){
				delay.start();
			}, 500);
		}
	});
	delay.add(200, function(){
		t.pass();
	});
});