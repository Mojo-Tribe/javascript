/* @flow */

import PubNubCore from '../core/pubnub-common.js';
import { InternalSetupStruct } from '../core/flow_interfaces';

/**
 * LOCAL STORAGE
 */
let db = {
  get(key: string) {
    return localStorage.getItem(key);
  },

  set(key: string, data: any) {
    return localStorage.setItem(key, data);
  }
};

function sendBeacon(url: string) {
  if (navigator && navigator.sendBeacon) {
    navigator.sendBeacon(url);
  } else {
    return false;
  }
}


export default class extends PubNubCore {

  constructor(setup: InternalSetupStruct) {
    setup.db = db;
    setup.sendBeacon = sendBeacon;
    setup.sdkFamily = 'Web';

    super(setup);

    window.addEventListener('offline', () => {
      this._signalNetworkDisconnected();
    });

    window.addEventListener('online', () => {
      this._signalNetworkReconnected();
    });
  }

}
