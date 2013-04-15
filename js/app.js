/*
Copyright 2012 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Author: Eric Bidelman (ericbidelman@chromium.org)
*/

// document.addEventListener('load', function() {
//  if(!!window.webkitIntent) {
//    var action = window.webkitIntent.action;
//    var data = window.webkitIntent.data;
//    var type = window.webkitIntent.type;
// //window.webkitIntent.postResult(data); 
// //window.webkitIntent.postError();
// console.log(webkitIntent, action, data, type)
//  }
// }, false);

// // var intent = new WebKitIntent("http://webintents.org/edit", "image/png", "dataUri://");

// // window.navigator.webkitStartActivity(intent, function(data) {
// // // The data from the remote application is returned here.
// // });

/*
var chosenFileEntry = null;
var writeFileButton = document.querySelector('#write_file');
var chooseFileButton = document.querySelector('#choose_file');
var saveFileButton = document.querySelector('#save_file');
var output = document.querySelector('output');
var textarea = document.querySelector('textarea');
*/


function errorHandler(e) {
  console.error(e);
}

function displayPath(fileEntry) {
  chrome.fileSystem.getDisplayPath(fileEntry, function(path) {
    document.querySelector('#file_path').value = path;
  });
}

function readAsText(fileEntry, callback) {
  fileEntry.file(function(file) {
    var reader = new FileReader();

    reader.onerror = errorHandler;
    reader.onload = function(e) {
      callback(e.target.result);
    };

    reader.readAsText(file);
  });
}

function writeFileEntry(writableEntry, opt_blob, callback) {
  if (!writableEntry) {
    console.log('Nothing selected.');
    return;
  }

  writableEntry.createWriter(function(writer) {

    writer.onerror = errorHandler;
    writer.onwriteend = callback;

    // If we have data, write it to the file. Otherwise, just use the file we
    // loaded.
    if (opt_blob) {
      writer.truncate(opt_blob.size);
      waitForIO(writer, function() {
        writer.seek(0);
        writer.write(opt_blob);
      });
    } else {
      chosenFileEntry.file(function(file) {
        writer.truncate(file.fileSize);
        waitForIO(writer, function() {
          writer.seek(0);
          writer.write(file);
        });
      });
    }
  }, errorHandler);
}

function waitForIO(writer, callback) {
  // set a watchdog to avoid eventual locking:
  var start = Date.now();
  // wait for a few seconds
  var reentrant = function() {
    if (writer.readyState===writer.WRITING && Date.now()-start<4000) {
      setTimeout(reentrant, 100);
      return;
    }
    if (writer.readyState===writer.WRITING) {
      console.error("Write operation taking too long, aborting!"+
        " (current writer readyState is "+writer.readyState+")");
      writer.abort();
    } else {
      callback();
    }
  };
  setTimeout(reentrant, 100);
}


document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('choose_file');
    // onClick's logic below:
    link.addEventListener('click', function() {
        chooseFileButton();
    });
});

function chooseFileButton()
{
  // "type/*" mimetypes aren't respected. Explicitly use extensions for now.
  // See crbug.com/145112.
  var accepts = [{
    //mimeTypes: ['text/*'],
    extensions: ['js', 'css', 'txt', 'html', 'xml', 'tsv', 'csv', 'rtf']
  }];
  chrome.fileSystem.chooseEntry({type: 'openFile', accepts: accepts}, function(readOnlyEntry) {
    if (!readOnlyEntry) {
      output.textContent = 'No file selected.';
      return;
    }

    chosenFileEntry = readOnlyEntry;

    chosenFileEntry.file(function(file) {
      readAsText(readOnlyEntry, function(result) {
		loadnewstage(result);
      });
      // Update display.
      //writeFileButton.disabled = false;
      //saveFileButton.disabled = false;
      displayPath(chosenFileEntry);
    });
  });
};

/*
document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('write_file');
    // onClick's logic below:
    link.addEventListener('click', function() {
        writeFileButton();
    });
});
function writeFileButton()
{
   if (chosenFileEntry) {
    chrome.fileSystem.getWritableEntry(chosenFileEntry, function(writableEntry) {
       writeFileEntry(writableEntry, null, function(e) {
         console.log('Write completed.');
       });
    });
   }
};
*/
document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('save_file');
    // onClick's logic below:
    link.addEventListener('click', function() {
        saveFileButton();
    });
});

function saveAs() {
  chrome.fileSystem.chooseEntry({type: 'saveFile'}, function(entry) {
    if (chrome.runtime.lastError) {
      showError(chrome.runtime.lastError.message);
      return;
    }
    console.log('Write completed.');
  });
}

function saveFileButton()
{
  var config = {type: 'saveFile', suggestedName: 'blockdiagram.txt'};
  chrome.fileSystem.chooseEntry(config, function(entry) {
	jsontxt = stage.toJSON();
    var blob = new Blob([jsontxt], {type: 'text/plain'});
    writeFileEntry(entry, blob, function(e) {
      console.log('Write completed.');
    });
  });
};

document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('save_file');
    // onClick's logic below:
    link.addEventListener('click', function() {
        saveFileJPG();
    });
});
function saveFileJPG(jpgdata)
{
  var config = {type: 'saveFile', suggestedName: 'blockdiagram.ong'};
  chrome.fileSystem.chooseEntry(config, function(entry) {
    var blob = new Blob([jpgdata], {type: 'image/png'});
    writeFileEntry(entry, blob, function(e) {
      console.log('Write completed.');
    });
  });
};

