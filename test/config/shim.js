// React depends on requestAnimationFrame (even in test environments).
// Here is a simple shim:
global.requestAnimationFrame = callback => {
  setTimeout(callback, 0);
}
