# eqh

This is a simple vanilla JavaScript, which helps HTML elements being of equal height. Which can be an annoying issue while managing dynamic content.

## Installation
```bower install eqh```

## How to use
```
window.onload = function(){
	_eqh('.product',{
		rowAware: true
	});
};
```

You simply call the _eqh() method. First parameter being a selector (You can use almost any CSS3 selector). Second parameter is an options object.
It is recommended to run the script after the HTML and CSS has been loaded.

### Options
1. ```rowAware``` (default = false). This will attempt to find the tallest html element, in the same row.
2. ```useMinHeight``` (default = false). This changes the applied css property to ```min-height```instead of ```height```.
3. ```callBack``` (default = false). This is an optional callback method that will be called after the script has completed.
