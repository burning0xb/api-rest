import FormData from 'form-data';

function json2form(jsonBody) {
  const form = new FormData();
  for (let prop in jsonBody) {
    if (prop !== '') {
      form.append(prop, jsonBody[prop]);
    }
  }
  return form;
}

export default json2form;
