function _eqh( selector , options ){
	'use strict';
	
	var default_options = {
        rowAware: false,
        siblings: true,
        useMinHeight: false
    };

    if(typeof options == 'undefined')
        var options = default_options;

    //Do not change these
    options.rowAware = typeof options.rowAware !== 'undefined' ? options.rowAware : default_options.rowAware;
    options.siblings = typeof options.siblings !== 'undefined' ? options.siblings : default_options.siblings;
    options.useMinHeight = typeof options.useMinHeight !== 'undefined' ? options.useMinHeight : default_options.useMinHeight;

	//Prepare variables
	var s = document.querySelectorAll( selector );
	var groups = [];

	var getChildIndex = function(child){
		var i = 0;
		while( (child = child.previousElementSibling) != null ) 
			i++;
		return i;
	};
	var eqhByGrp = function(group){
		var newHeightForGroup = 0;
		for(var i=0;i<group.length;i++){
			if(group[i].offsetHeight > newHeightForGroup)
				newHeightForGroup = group[i].offsetHeight;
		}

		for(var i=0;i<group.length;i++){
			if(options.useMinHeight)
                group[i].style.minHeight = newHeightForGroup + 'px';
            else
                group[i].style.height = newHeightForGroup + 'px';
		}
	};
	

	if(options.rowAware === false){//Height = highest of all with same class
		eqhByGrp(s);
	}else{//Height = highest in row
		if(options.siblings === true){
			//Group by offsetTop
			for(var i=0,r=0,rowOffset=0;i<s.length;i++){
				if(s[i].offsetTop > rowOffset){ //Is a new row
					if(i!=0) eqhByGrp(groups[r]);

					if(i!=0) r++;

					groups[r] = new Array( s[i] );
					rowOffset=s[i].offsetTop;
				}else{
					groups[r].push(s[i]);
				}

				if(i==s.length-1){
					eqhByGrp(groups[r]);
				}
			}
		}else{
			//Group by child index
			for(var i=0;i<s.length;i++){
				var sibling_index = getChildIndex(s[i]);
				if( groups[sibling_index] )
					groups[sibling_index].push(s[i]);
				else
					groups[sibling_index] = new Array( s[i] );
			}

			//eqh by group
			for(var i=0;i<groups.length;i++){
				eqhByGrp(groups[i]);
			}
		}

	}
}
