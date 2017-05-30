// adds the livereload script, this should never get into none development build
$(document).ready(function() {
  $( "body" ).append('<script src="//localhost:1337/livereload.js"></script>')
});
