/* @flow */

import { GrantArguments } from '../../flow_interfaces';

export function getOperation(): string {
  return 'PNAccessManagerGrant';
}

export function validateParams(modules) {
  let { config } = modules;

  if (!config.subscribeKey) return 'Missing Subscribe Key';
}

export function getURL(modules): string {
  let { config } = modules;
  return '/v1/auth/grant/sub-key/' + config.subscribeKey;
}

export function prepareParams(modules, incomingParams: GrantArguments): Object {
  const { channels = [], channelGroups = [], ttl, read = false, write = false, manage = false, authKeys = [] } = incomingParams;
  const params = {};

  params.r = (read) ? '1' : '0';
  params.w = (write) ? '1' : '0';
  params.m = (manage) ? '1' : '0';
  params.timestamp = Math.floor(new Date().getTime() / 1000);

  if (channels.length > 0) {
    params.channel = channels.join(',');
  }

  if (channelGroups.length > 0) {
    params['channel-group'] = channelGroups.join(',');
  }

  if (authKeys.length > 0) {
    params.auth = authKeys.join(',');
  }

  if (ttl || ttl === 0) {
    params.ttl = ttl;
  }

  return params;
}

export function handleResponse(): Object {
  return {};
}