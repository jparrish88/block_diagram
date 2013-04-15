chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('window.html', {
    'bounds': {
      'width': 1024,
      'height': 768
    },
	minWidth: 600,
    minHeight: 500,
    frame: 'none'
  });
});