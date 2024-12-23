import React from 'react';
import {View, Text, SafeAreaView, Image, Pressable} from 'react-native';
import Modal from 'react-native-modal';
import IconPack from '../../utils/IconPack';
import {strings} from '../../utils/strings';
import {styles} from './ComingSoon.styles';
import {observer} from 'mobx-react';

const ComingSoon = ({isModalVisible, setModalVisible}: any) => {
  return (
    <Modal
      isVisible={isModalVisible}
      backdropTransitionOutTiming={0}
      style={styles.modalStyle}
      animationInTiming={800}
      animationOutTiming={500}
      onBackButtonPress={() => setModalVisible(false)}
      onSwipeComplete={() => setModalVisible(false)}
      swipeDirection="down"
      propagateSwipe>
      <View style={styles.modalContent}>
        <SafeAreaView style={styles.container}>
          <View style={styles.closeButtonContainer}>
            <Pressable onPress={() => setModalVisible(false)}>
              <Image source={IconPack.CLOSE} style={styles.closeBtn} />
            </Pressable>
          </View>

          <View style={styles.subContainer}>
            <Image source={IconPack.TIMER} style={styles.timer} />
            <Text style={styles.headerText}>{strings.coming_soon_title}</Text>
            <Text style={styles.descText}>{strings.coming_soon_subtitle}</Text>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

export default observer(ComingSoon);
