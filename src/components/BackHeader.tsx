import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Image, TouchableHighlight, View, Keyboard, Text} from 'react-native';
import {Observer} from 'mobx-react';
import RootStore from '../stores/RootStore';
import {colors} from '../utils/colors';
import IconPack from '../utils/IconPack';

const BackHeader = ({
  onPress,
  style,
  touchContainerStyle,
  tintColor,
  rightText,
  onPressRight,
  rightTextStyle,
  leftIcon,
  leftIconStyle,
  rightIconUnderlayColor,
}) => {
  return (
    <Observer>
      {() => (
        <View style={[style, rightText && styles.rightTextContainer]}>
          <TouchableHighlight
            hitSlop={styles.hitSlop}
            onPress={() => {
              Keyboard.dismiss();
              setTimeout(
                () =>
                  onPress
                    ? onPress()
                    : RootStore.appStore.handleScreenNavigationGoBack(),
                200,
              );
            }}
            underlayColor={rightIconUnderlayColor || colors.touchHighlightGray}
            style={[styles.touchContainer, touchContainerStyle || null]}>
            <Image
              source={leftIcon ? leftIcon : IconPack.LEFT_ARROW}
              style={[
                leftIconStyle,
                styles.backArrow,
                {tintColor: tintColor ? tintColor : colors.black},
              ]}
            />
          </TouchableHighlight>
          {Boolean(rightText) && (
            <TouchableHighlight
              onPress={onPressRight ? onPressRight : () => {}}
              underlayColor={
                rightIconUnderlayColor || colors.touchHighlightGray
              }
              style={styles.rightText}>
              <Text style={[rightTextStyle && rightTextStyle]}>
                {rightText}
              </Text>
            </TouchableHighlight>
          )}
        </View>
      )}
    </Observer>
  );
};

export default BackHeader;

const styles = EStyleSheet.create({
  touchContainer: {
    padding: '8rem',
    marginHorizontal: '4rem',
    borderRadius: 30,
  },
  hitSlop: {
    top: 30,
    right: 30,
    bottom: 10,
    left: 30,
  },
  backArrow: {
    height: '16rem',
    width: null,
    aspectRatio: 1,
  },
  rightText: {
    marginRight: '20rem',
    paddingHorizontal: '6rem',
    paddingVertical: '8rem',
    borderRadius: '10rem',
  },
  rightTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
});
