function _eqh( selector , options ){
    'use strict';

    var default_options = {
        rowAware: false,
        useMinHeight: false,
        callBack: false
    };

    if(typeof options === 'undefined')
        var options = default_options;

    //Do not change these
    options.rowAware = typeof options.rowAware !== 'undefined' ? options.rowAware : default_options.rowAware;
    options.useMinHeight = typeof options.useMinHeight !== 'undefined' ? options.useMinHeight : default_options.useMinHeight;
    options.callBack = typeof options.callBack === 'function' ? options.callBack : default_options.callBack;

    //Prepare variables
    var s = document.querySelectorAll( selector );

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

    var findPos = function(obj){
        if(obj.offsetParent){
            var curleft = obj.offsetTop || 0,
                curtop = obj.offsetLeft || 0;
            while(obj = obj.offsetParent){
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
            }
            return {
                left: curleft,
                top: curtop
            };
        }
    }

    if(options.rowAware === false){//Height = highest of all with same class
        eqhByGrp(s);
    }else{//highest in row
        //Convert NodeList to Array
        var group = Array.prototype.slice.call(s);
        //Loop though s
        var i=0;
        while(group.length){
            //Take current s and find others with same offset top, and eqh them.
            var queue = new Array();
            var templateOffset = group[i].getBoundingClientRect().y;
            for(var j=0;j<group.length;j++){
                if(group[j].getBoundingClientRect().y === templateOffset){
                    queue.push( group[j] );
                }
            }
            //After eqhing, remove them from the loop, to avoid unnessesary loops
            eqhByGrp(queue);
            for(var k=0;k<queue.length;k++){
                group.splice(
                    group.indexOf(queue[k])
                    , 1);
            }
        }
    }

    //Run callback method
    if(options.callBack)
        options.callBack();
}