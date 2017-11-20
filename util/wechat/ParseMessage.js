import xml2js from 'xml2js';
const parser = new xml2js.Parser();

export default class ParseMessage {

  constructor() {

  }

  convertPost(req) {
    let post_data = '';
    return new Promise((resolve, reject) => {
        req.on('data', (chunk) => {
            post_data += chunk;
        });
        req.on('end', () => {
            resolve(post_data);
        });
    });
  }

  parseXml(data) {
    return new Promise((resolve, reject) => {
      parser.parseString(data.toString(), (err, result) => {
        if (err) {
          reject({
            err: err,
            res: false
          });
        } else {
          resolve({
            xml: result.xml,
            res: true
          });
        }
      });
    });
  }

}
