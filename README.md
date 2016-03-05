# eqh

This is a simple vanilla JavaScript, which helps HTML elements being of equal height. Which can be an annoying issue while managing dynamic content.

## Installation
```bower install eqh```

## How to use
```
window.onload = function(){
	_eqh('.product',{
		rowAware: true,
		siblings: false
	});
};
```

You simply call the _eqh() method. First parameter being a selector (You can use almost any css selector). Second parameter is an options object.
It is recommended to run the script after the HTML and CSS has been loaded.

### Options
1. ```rowAware``` (default = false). This will attempt to find the tallest html element, in the same row.
2. ```useMinHeight``` (default = false). This basically styles the targetet elements with the min-height css property, rather than the height property
3. ```siblings``` (default = true). This option will need to be changed, based on the structure of your HTML.
  To put it in [Emmet syntax](http://docs.emmet.io/abbreviations/syntax/): 
    * div>div*4>.target = siblings: false
    * div>.target*4 = siblings: true
