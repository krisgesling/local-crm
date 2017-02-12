function readFile(e) {
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

function saveFile(text) {
  // courtesy of https://stackoverflow.com/questions/21012580/is-it-possible-to-write-data-to-file-using-only-javascript

  var textFile = null;
  var makeTextFile = function (text) {
    var data = new Blob([text], {type: 'text/plain'});

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);

    // returns a URL you can use as a href
    return textFile;
  };

  // Create download link, emulate click and remove it
  var link = document.createElement('a');
  link.setAttribute('download', 'output.txt');
  link.href = makeTextFile(text);
  //link.innerHTML = "Download file";
  document.body.appendChild(link);
  window.requestAnimationFrame(function () {
    var event = new MouseEvent('click');
    link.dispatchEvent(event);
    document.body.removeChild(link);
  });
}

function addEvent(evnt, elem, func) {
  // EventListener fix for IE
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
addEvent('change', file, readFile);
var saveBtn = document.getElementById('save-btn');
addEvent('click', saveBtn, function() {saveFile();});
