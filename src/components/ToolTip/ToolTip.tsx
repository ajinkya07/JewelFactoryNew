import {observer} from 'mobx-react';
import React, {useEffect, useRef, useState} from 'react';
import {DeviceEventEmitter, Pressable, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useTheme} from '../../../utils/Theme';
import IconPack from '../../../utils/IconPack';
import ToolTipArrow from './ToolTipArrow';
import {EmitterSubscription} from 'react-native';
import {TOOLTIP_TOGGLE_EVENT} from './tool-tip.utils';
import {logDepositsClickEvents} from '../../../screens/Deposits/QuickFD/utils/Events.utils';

type ToolTipProps = {
  isVisible: boolean;
  title: string;
  styles?: any;
  onPressToolTip: () => void;
  onPressClose: () => void;
  topArrowStyle?: any;
  screenName?: string;
  eventName?: string;
  eventsObj?: object;
};

const ToolTip = observer(
  ({
    isVisible,
    title,
    styles,
    onPressToolTip,
    onPressClose,
    topArrowStyle,
    screenName,
    eventName,
    eventsObj,
  }: ToolTipProps) => {
    const {colorsV2} = useTheme();
    const [isTooltipVisible, toggleTooltip] = useState(isVisible);
    let tooltipStateListener = useRef<EmitterSubscription | null>(null);

    const {
      container,
      innerContainer,
      hitSlop,
      tooltipTitle,
      closeImgTintColor,
      closeImg,
    } = styles;

    useEffect(() => {
      toggleTooltip(isVisible);
    }, [isVisible]);

    useEffect(() => {
      if (!tooltipStateListener.current) {
        tooltipStateListener.current = DeviceEventEmitter.addListener(
          TOOLTIP_TOGGLE_EVENT,
          ({flag}) => {
            toggleTooltip(oldFlag => {
              if (oldFlag && !flag && screenName) {
                logDepositsClickEvents(screenName, eventName, eventsObj);
              }
              return flag;
            });
          },
        );
      }

      return () => {
        tooltipStateListener.current && tooltipStateListener.current.remove();
      };
    }, []);

    return (
      isTooltipVisible && (
        <View style={container}>
          <View>
            <Pressable style={innerContainer} onPress={onPressToolTip}>
              <ToolTipArrow
                propStyles={topArrowStyle}
                arrowColor={closeImgTintColor}
              />
              <Text style={tooltipTitle}>{title}</Text>

              <Pressable onPress={onPressClose} hitSlop={hitSlop}>
                <FastImage
                  tintColor={colorsV2.WHITE_BLACK}
                  source={IconPack.CANCEL_ICON}
                  style={closeImg}
                  resizeMode="contain"
                />
              </Pressable>
            </Pressable>
          </View>
        </View>
      )
    );
  },
);

export default ToolTip;
