import PnwKitAPI from './api';
import memoize from 'memoizee';

/**
 * The main application class
 */
export class Kit extends PnwKitAPI {
  [key: string]: any;

  apiKey = '';

  /**
   * Set the pnwkit instance's key.
   * @param key
   */
  setKey(key: string): void {
    this.apiKey = key;
  }

  /**
   * Let's you cache results of a query call
   *
   * It returns a cached version of the function that accepts the same arguments but caches it for a certain period of time
   * @param {(...args: any[]) => any} queryFunc The query function you want to cache
   * @param {number} maxAgeMinutes The max number of minutes to cache it for
   *
   * @return {Function} returns a cached version of the function
   */
  cached(queryFunc: (...args: any[]) => any, maxAgeMinutes: number) {
    return memoize(queryFunc.bind(this), {maxAge: maxAgeMinutes * 60 * 1000, promise: true, primitive: true});
  }
}

const kit = new Kit();

for (const [key] of Object.entries(kit)) {
  exports[key] = kit[key];
}

exports.setKey = kit.setKey;
exports.cached = kit.cached;

export default kit;
