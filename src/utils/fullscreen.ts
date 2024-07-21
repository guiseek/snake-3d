export const getFullscreen = (element: HTMLElement) => {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  }
};

const cancelFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  }
};

export const toggleFullscreen = (element: HTMLElement) => {
  if (!document.fullscreenElement) {
    getFullscreen(element);
  } else {
    cancelFullscreen();
  }
};
