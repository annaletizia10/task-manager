function setStorage(arr: [], item: string) {
  const arrToStr = JSON.stringify(arr);
  localStorage.setItem(item, arrToStr);
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export { setStorage, capitalize };
