# Stupid Delay
A stupid RAF controlled delay.

## Usage


```javascript
var Delay = require('stupid-delay');
var Tick = require('stupid-tick');

var tick = Tick();
var delay = Delay({
	tick: tick
});

delay.add(1000, function(){
	// Do something after 1000ms
});

```

## Methods

```javascript
delay.add(1000, function(){
	// Do something after 1000ms
});

// Pause all delays.
delay.pause();

// Start all delays (use when paused).
delay.start();

// Destroy all delays.
delay.destroy();

```

### Pause / Start

```javascript
delay.add(1000, function(){
	delay.pause();
	setTimeout(function(){
		delay.start();
	}, 2000);
});

// Is stoppped by 'delay.pause()'
// and started again by 'delay.start()'.	
delay.add(1500, function(){
	// Do something
});

```

### Destroy

```javascript
delay.add(1000, function(){
	delay.destroy();
});

// All delays are destroyed and will not run.
delay.add(1500, function(){
	// Does nothing
});

```