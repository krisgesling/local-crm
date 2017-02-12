function readSingleFile(e) {
  console.log(e);
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    var contents = e.target.result;
    // Display file content
    displayContents(contents);
  };
  reader.readAsText(file);
}

function displayContents(contents) {
  var element = document.getElementById('file-content');
  element.innerHTML = contents;
}

function addEvent(evnt, elem, func) {
   if (elem.addEventListener)  // W3C DOM
      elem.addEventListener(evnt,func,false);
   else if (elem.attachEvent) { // IE DOM
      elem.attachEvent("on"+evnt, func);
   }
   else { // No much to do
      elem[evnt] = func;
   }
}

var file = document.getElementById('file-input');
addEvent('change', file, readSingleFile);
