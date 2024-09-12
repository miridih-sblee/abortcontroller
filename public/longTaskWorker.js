self.onmessage = function(e) {
  setInterval(() => {
    self.postMessage('Task resolved');
  }, 1000);
};