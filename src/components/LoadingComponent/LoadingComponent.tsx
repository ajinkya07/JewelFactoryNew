import React from 'react';
import {ActivityIndicator, View, StyleProp, ViewStyle} from 'react-native';
import {Observer} from 'mobx-react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {colors} from '../../utils/colors';

type ContainerStyleProp = {
  containerStyle?: StyleProp<ViewStyle>;
};

const LoadingComponent = ({containerStyle}: ContainerStyleProp) => {
  return (
    <Observer>
      {() => (
        <>
          <View style={[styles.container, containerStyle]}>
            <ActivityIndicator size={'small'} color={colors.brandColor} />
          </View>
        </>
      )}
    </Observer>
  );
};

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
});

export default LoadingComponent;
