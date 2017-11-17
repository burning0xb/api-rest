import { logger } from '../../util/logger';

export default class BaseHandler {

  /**
   * [info description]
   * @method info
   * @param  {[type]} msg [description]
   * @return {[type]}     [description]
   */
  info(msg) {
    logger.info(msg);
  }

  /**
   * [err description]
   * @method err
   * @param  {[type]} msg [description]
   * @return {[type]}     [description]
   */
  err(msg) {
    logger.err(msg);
  }

  /**
   * [warn description]
   * @method warn
   * @param  {[type]} msg [description]
   * @return {[type]}     [description]
   */
  warn(msg) {
    logger.warn(msg);
  }

  initServer(server) {
    return server(global.ch, global.ok);
  }
}
