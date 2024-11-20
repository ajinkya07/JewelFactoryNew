import {observer} from 'mobx-react';
import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {View} from 'react-native';
import RootStore from '../../../stores/RootStore';

const ToolTipArrow = ({propStyles, arrowColor}) => {
  return (
    <View style={propStyles}>
      <Svg
        width={RootStore.appStore.wRem * 20}
        height={RootStore.appStore.wRem * 9}
        fill="none">
        <Path
          fill={arrowColor}
          d="M7.852 1.706a3 3 0 0 1 4.58 0l5.27 6.229A3.01 3.01 0 0 0 20 9H0h.753a2 2 0 0 0 1.527-.708l5.572-6.586Z"
        />
      </Svg>
    </View>
  );
};

export default observer(ToolTipArrow);
