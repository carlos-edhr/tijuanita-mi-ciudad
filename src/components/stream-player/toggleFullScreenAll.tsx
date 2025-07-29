/**
 * Toggle fullscreen function who work with webkit and firefox.
 * @function toggleFullscreen
 * @param {Object} event
 */
//@ts-nocheck
export function toggleFullscreenAll(event: any) {
  const element = document.body;
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    // Firefox
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    // Safari
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    // IE/Edge
    element.msRequestFullscreen();
  }

  // var isFullscreen =
  //   document.webkitIsFullScreen || document.mozFullScreen || false;

  // element.requestFullScreen =
  //   element.requestFullScreen ||
  //   element.webkitRequestFullScreen ||
  //   element.mozRequestFullScreen ||
  //   function () {
  //     return false;
  //   };
  // document.cancelFullScreen =
  //   document.cancelFullScreen ||
  //   document.webkitCancelFullScreen ||
  //   document.mozCancelFullScreen ||
  //   function () {
  //     return false;
  //   };

  // isFullscreen ? document.cancelFullScreen() : element.requestFullScreen();
}
