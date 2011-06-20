//js profiler
(function(){
    var log = [], first, last;
    
    time = function(message, since){
        var now = +new Date;
        var seconds = (now - (since || last )) / 1000;
        log.push(seconds.toFixed(3) + ": " + message + "<br/>");
        return last = +new Date;
    };
    
    time.done = function(selector){
      time("total", first);
      $(selector).html(log.join(''));
    };
    
    first = last = +new Date;

})();

//usage:
/*
//do stuff
time('first');
//do stuff
time('second');
//do stuff
time('third');
time.done('#log'); 
*/

//and include the div to populate on the page:
$(document).ready(function(){
  $('body').append("<div id=\"log\"></div>");
});
