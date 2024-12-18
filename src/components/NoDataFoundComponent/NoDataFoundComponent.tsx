import React from 'react';
import {
  ActivityIndicator,
  View,
  StyleProp,
  ViewStyle,
  Text,
} from 'react-native';
import {observer, Observer} from 'mobx-react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {colors} from '../../utils/colors';
import {strings} from '../../utils/strings';
import {fontFamilySemiBold} from '../../utils/constants';

type ContainerStyleProp = {
  msg?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

const NoDataFoundComponent = observer(
  ({msg, containerStyle}: ContainerStyleProp) => {
    return (
      <Observer>
        {() => (
          <>
            <View style={[styles.container, containerStyle]}>
              <Text style={styles.noDataText}>
                {/* {msg || strings.noDataFound} */}
                ok
              </Text>
            </View>
          </>
        )}
      </Observer>
    );
  },
);

const styles = EStyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: `${colors.white}80`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: '14rem',
    fontFamily: fontFamilySemiBold,
    color: colors.black,
  },
});

export default NoDataFoundComponent;
