function setStorage(arr: [], item: string) {
  const arrToStr = JSON.stringify(arr);
  localStorage.setItem(item, arrToStr);
}

export { setStorage };
