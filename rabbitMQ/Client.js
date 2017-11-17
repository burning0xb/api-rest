import amqp from 'amqplib/callback_api';
import { basename } from 'path';
import RabbitSend from './RabbitSend';
import config from '../config.json';

export default class Client {

  constructor() {
    return new Promise((resolve, reject) => {
      amqp.connect('amqp://' + config.rabbitMq_user + ':' + config.rabbitMq_password + '@' + config.rabbitMq_host + ':' + config.rabbitMq_port, this.on_connect.bind(this, resolve));
    }).catch((err) => {
      console.log(err);
    });
  }

  init(ch, ok) {
    const server = new RabbitSend(ch, ok)
    return server;
  }

  bail(err) {
    console.error(err);
  }

  init_client(resolve, RabbitSend) {
    resolve({
      RabbitSend: RabbitSend
    });
  }

  on_connect(resolve, err, conn) {
    if (err !== null) return this.bail(err);
    conn.createChannel((err, ch) => {
      if (err !== null) return this.bail(err);

      ch.assertQueue('', { exclusive: true }, (err, ok) => {
        if (err !== null) return this.bail(err);
        global.ch = ch;
        global.ok = ok;
        this.init_client(resolve, (ch, ok) => { return this.init(ch, ok); });
      });
    });
  }
}
