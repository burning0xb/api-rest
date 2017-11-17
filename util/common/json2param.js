function json2param(json) {
  if (json.length = 0) {
    console.log('please put right jsonData and the size must > 0');
    return '';
  }
  let res = '';
  for (let prop in json) {
    if (prop !== '') {
      res += `${prop}=${json[prop]}&`
    }
  }
  res = res.substr(0, res.length - 1);
  return res;
}

export default json2param;
