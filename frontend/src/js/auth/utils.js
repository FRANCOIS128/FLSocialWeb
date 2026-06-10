function isInputHasContent(domList = []) {
  if (!(Array.isArray(domList) && domList.length > 0)) return -1;

  let statusCode = 0; // success

  domList.forEach(dom => {
    if (dom.value === '') {
      statusCode = 1; // dom empty error
    }
  });

  return statusCode;
}

function clearDomValue(domList = []) {
  if (Array.isArray(domList) && domList.length > 0) {
    domList.forEach(dom => {
      dom.value = '';
    });
  }
}

export {
  isInputHasContent, clearDomValue
}
