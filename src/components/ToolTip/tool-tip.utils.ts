import {DeviceEventEmitter} from 'react-native';

export const TOOLTIP_TOGGLE_EVENT = 'toggleTooltip';

export const toggleToolTip = flag => {
  DeviceEventEmitter.emit(TOOLTIP_TOGGLE_EVENT, {flag});
};
