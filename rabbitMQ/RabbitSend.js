import config from '../config.json';
import uuid from 'node-uuid';

export default class RabbitSend {
  constructor(ch, ok) {
    this.ch = ch;
    this.ok = ok;
    this.ramdom = Date.now();
  }

  mabeAnswer(msg) {
    if (global.msgQueue.includes(msg.properties.correlationId)) {
      console.log(msg.content.toString());
      const index = global.msgQueue.indexOf(msg.properties.correlationId);
      global.msgQueue.splice(index, 1);
      global.resolveRabbit[msg.properties.correlationId].resolve({
        finalRes: JSON.parse(msg.content.toString())
      });
      delete global.resolveRabbit[msg.properties.correlationId];
    } else {
      if (global.resolveRabbit[msg.properties.correlationId]) {
        global.resolveRabbit[msg.properties.correlationId].reject({
          err: 'Unexpected message'
        });
        delete global.resolveRabbit[msg.properties.correlationId];
      } else {
        console.log('未找到对应的MQ');
      }
    }
  }

  send(content, type) {
    console.log(' [x] Requesting is ', content);
    let queue = config.MQ_QUEUE_COMMON;
    // let queue = config.MQ_QUEUE_COMMON_TEST;
    switch (type) {
      case 'order':
        queue = config.MQ_QUEUE_ORDER;
        break;
      case 'pay':
        queue = config.MQ_QUEUE_PAY;
        break;
      default:
        queue = config.MQ_QUEUE_COMMON;
        // queue = config.MQ_QUEUE_COMMON_TEST;
        break;
    }
    return new Promise((resolve, reject) => {
      const correlationId = uuid();
      global.msgQueue.push(correlationId);
      global.resolveRabbit[correlationId] = {
        resolve: resolve,
        reject: reject
      };
      if (!global.readyListener.includes(queue)) {
        global.readyListener.push(queue);
        this.ch.consume(this.ok.queue, (msg) => {
          this.mabeAnswer(msg);
        }, { noAck: true });
      }
      this.ch.sendToQueue(queue, new Buffer(JSON.stringify(content)), {
        replyTo: this.ok.queue,
        correlationId: correlationId
      });
    }).catch((err) => {
      console.log(err);
    });
  }

}
