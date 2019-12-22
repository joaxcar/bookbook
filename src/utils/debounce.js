function debounce(callback, time) {
  let timer;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      callback();
    }, time);
  };
}

export default debounce;
