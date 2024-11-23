import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  ImageStyle,
  Pressable,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React, {ReactNode, useMemo} from 'react';
import {observer} from 'mobx-react';
import {ResizeMode} from 'react-native-fast-image';
import {styles} from './PressableComponent.styles';
import {isDefined} from '../../utils/helper';
import {colors} from '../../utils/colors';

export const PRESSABLE_ALIGN_CONFIG = {
  TOP: 'column',
  RIGHT: 'row-reverse',
  BOTTOM: 'column-reverse',
  LEFT: 'row',
};

export enum PRESSABLE_ALIGN {
  TOP = 'TOP',
  RIGHT = 'RIGHT',
  BOTTOM = 'BOTTOM',
  LEFT = 'LEFT',
}

export enum PRESSABLE_BTN_TYPE {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  BORDERED = 'bordered',
  WHITE_BG = 'white_bg',
  TEXT = 'text',
}

type ColorConfigProp = {
  pressedBgColor?: string;
  bgColor?: string;
};

type ImageConfigProp = {
  imageSource?: ImageSourcePropType;
  imageStyle?: StyleProp<ImageStyle>;
  imageBgStyle?: StyleProp<ImageStyle>;
  resizeMode?: StyleProp<ResizeMode>;
};

type PressableComponentProps = {
  btnType?: PRESSABLE_BTN_TYPE;
  disabled?: boolean;
  text?: string;
  onPress: () => void;
  onLongPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  colorConfig?: ColorConfigProp | any;
  imageConfig?: ImageConfigProp | any;
  pressableStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  renderCustomChild?: () => ReactNode;
  align?: PRESSABLE_ALIGN;
  isLoading?: boolean;
};

/**
 * margin to container style
 * padding to pressable style
 */

const PressableComponent = observer(
  ({
    btnType,
    disabled = false,
    text,
    onPress,
    onLongPress,
    containerStyle,
    colorConfig = {},
    imageConfig = {},
    pressableStyle,
    textStyle,
    renderCustomChild,
    align,
    isLoading = false,
  }: PressableComponentProps) => {
    const getAlign = useMemo(() => {
      return align
        ? PRESSABLE_ALIGN_CONFIG[align]
        : PRESSABLE_ALIGN_CONFIG[PRESSABLE_ALIGN_CONFIG.TOP];
    }, [align]);

    const getStyleBasedOnType = useMemo(() => {
      switch (btnType) {
        case PRESSABLE_BTN_TYPE.PRIMARY:
          return [
            styles.primaryBtnContainer,
            containerStyle,
            disabled && styles.primaryBtnDisabled,
          ];
        case PRESSABLE_BTN_TYPE.SECONDARY:
          return [
            styles.primaryBtnContainer,
            containerStyle,
            disabled && styles.primaryBtnDisabled,
            styles.secBtnContainer,
          ];
        default:
          return containerStyle;
      }
    }, [
      btnType,
      containerStyle,
      disabled,
      styles.primaryBtnContainer,
      styles.primaryBtnDisabled,
      styles.secBtnContainer,
    ]);

    const getPressableStyleBasedOnType = (pressed: boolean) => {
      switch (btnType) {
        case PRESSABLE_BTN_TYPE.PRIMARY:
          return [
            styles.primaryBtnPressable,
            pressableStyle,
            {
              backgroundColor: pressed
                ? styles.primaryBtnPressable.backgroundColor
                : styles.primaryBtnContainer.backgroundColor,
              flexDirection: getAlign,
            },
          ];
        case PRESSABLE_BTN_TYPE.SECONDARY:
          return [
            styles.primaryBtnPressable,
            pressableStyle,
            {
              backgroundColor: pressed
                ? styles.secBtnPressable.backgroundColor
                : styles.secBtnContainer.backgroundColor,
              flexDirection: getAlign,
            },
          ];

        default:
          return [
            pressableStyle,
            {
              backgroundColor: pressed
                ? colorConfig.pressedBgColor
                : colorConfig.bgColor,
              flexDirection: getAlign,
            },
          ];
      }
    };

    const getTextStyleBasedOnType = useMemo(() => {
      switch (btnType) {
        case PRESSABLE_BTN_TYPE.PRIMARY:
          return [styles.primaryBtnText, textStyle];
        case PRESSABLE_BTN_TYPE.SECONDARY:
          return [styles.primaryBtnText, styles.secBtnText, textStyle];
        case PRESSABLE_BTN_TYPE.TEXT:
          return [styles.textButton, textStyle];
        default:
          return textStyle;
      }
    }, [
      btnType,
      styles.primaryBtnText,
      styles.secBtnText,
      styles.textButton,
      textStyle,
    ]);

    const loadingColor = useMemo(() => {
      switch (btnType) {
        case PRESSABLE_BTN_TYPE.PRIMARY:
          return colors.white;
        case PRESSABLE_BTN_TYPE.SECONDARY:
        case PRESSABLE_BTN_TYPE.TEXT:
          return colors.gray;
      }
    }, [btnType, colors]);

    return (
      <View style={getStyleBasedOnType}>
        <Pressable
          disabled={disabled || isLoading}
          onPress={onPress}
          onLongPress={onLongPress}
          style={({pressed}) => [
            getPressableStyleBasedOnType(pressed),
            styles.defaultStyle,
          ]}>
          {isLoading ? (
            <ActivityIndicator color={loadingColor} />
          ) : (
            <>
              {renderCustomChild ? (
                renderCustomChild()
              ) : (
                <>
                  {isDefined(imageConfig.imageSource) && (
                    <View style={imageConfig.imageBgStyle}>
                      <Image
                        source={imageConfig.imageSource}
                        style={imageConfig.imageStyle}
                        resizeMode={imageConfig.resizeMode}
                      />
                    </View>
                  )}
                  <Text style={getTextStyleBasedOnType}>{text}</Text>
                </>
              )}
            </>
          )}
        </Pressable>
      </View>
    );
  },
);

export default PressableComponent;
