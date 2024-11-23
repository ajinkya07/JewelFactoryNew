import React, {memo} from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  ViewStyle,
  StyleProp,
  ImageStyle,
  ColorValue,
  Image,
  ImageSourcePropType,
} from 'react-native';
import {Observer} from 'mobx-react';
import {styles} from './ListItemComponent.styles';
import {colors} from '../../utils/colors';
import IconPack from '../../utils/IconPack';
import Divider from '../Divider';

type ListItemComponentProps = {
  icon?: React.ReactNode;
  iconColor?: ColorValue | undefined;
  iconRight?: ImageSourcePropType;
  iconRightStyle?: StyleProp<ImageStyle>;
  iconRightTintColor?: ColorValue | undefined;
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  title: string;
  titleColor?: string;
  description?: string;
  textRight?: string;
  viewRightStyle?: StyleProp<ViewStyle>;
  isDividerVisible: boolean;
};
const ListItemComponent = ({
  icon,
  iconColor,
  iconRight,
  iconRightStyle,
  iconRightTintColor,
  onPress,
  containerStyle,
  title,
  titleColor,
  description,
  textRight,
  viewRightStyle,
  isDividerVisible,
}: ListItemComponentProps) => {
  const ICON_DIMENTION = 24;

  return (
    <Observer>
      {() => (
        <View key={title}>
          <TouchableHighlight
            underlayColor={colors.lightGrayClicked}
            onPress={onPress}
            style={[styles.touchContainer, containerStyle]}>
            <View>
              <View style={styles.itemContainer}>
                <View style={styles.rowContainer}>
                  {icon ? (
                    <View
                      style={[
                        styles.iconContainer,
                        {backgroundColor: colors.lightGray},
                      ]}>
                      <Image
                        style={{
                          tintColor: iconColor ? iconColor : colors.black,
                          height: ICON_DIMENTION,
                          width: ICON_DIMENTION,
                        }}
                      />
                    </View>
                  ) : null}
                  <Text style={[styles.titleStyle, {color: titleColor}]}>
                    {title}
                  </Text>
                </View>
                <View style={styles.rightContainer}>
                  {textRight && (
                    <View
                      style={
                        viewRightStyle ? viewRightStyle : styles.viewRightStyle
                      }>
                      <Text style={[styles.titleStyle, {color: titleColor}]}>
                        {textRight}
                      </Text>
                    </View>
                  )}

                  <Image
                    source={iconRight ? iconRight : IconPack.FORWARD_ARROW}
                    style={[
                      styles.rightArrowSide,
                      iconRightStyle,
                      {
                        tintColor: iconRightTintColor
                          ? iconRightTintColor
                          : colors.black,
                      },
                    ]}
                  />
                </View>
              </View>
              {description && (
                <Text style={[styles.titleStyle, {color: titleColor}]}>
                  {description}
                </Text>
              )}
            </View>
          </TouchableHighlight>
          {isDividerVisible && <Divider />}
        </View>
      )}
    </Observer>
  );
};

export default memo(ListItemComponent);
