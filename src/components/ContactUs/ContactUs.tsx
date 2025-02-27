import React from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import {observer} from 'mobx-react';
import Modal from 'react-native-modal';
import RootStore from '../../stores/RootStore';
import {styles} from './ContactUs.styles';
import IconPack from '../../utils/IconPack';
import {strings} from '../../utils/strings';
import Divider from '../Divider';
import {openURL} from '../../utils/helper';

type ContactUsType = {
  isModalVisible: boolean;
  setModalVisible: (value: boolean) => void;
};

const ContactUs = observer(
  ({isModalVisible, setModalVisible}: ContactUsType) => {
    const data = RootStore.homeStore.allParameterData;
    const whatsApp = (data as any)?.whatsapp || '';
    let mobileNo = (data as any)?.call || '';

    const call = () => {
      const url = RootStore.appStore.isiOS
        ? `tel://${mobileNo}`
        : `tel:${mobileNo}`;
      openURL(url);
    };

    const whatsapp = () => {
      openURL(`whatsapp://send?phone=${'91' + whatsApp}&text=${''}`);
    };

    return (
      <>
        <Modal
          isVisible={isModalVisible}
          style={styles.modalView}
          onBackdropPress={() => setModalVisible(false)}
          onBackButtonPress={() => setModalVisible(false)}
          onSwipeComplete={() => setModalVisible(false)}
          swipeDirection="down"
          propagateSwipe>
          <View style={styles.modalViewContainer}>
            <Divider style={styles.divider} />
            <Text style={styles.titleText}>{strings.contactUs}</Text>

            <Text style={styles.subtitleText}>{strings.contactUsDesc}</Text>

            <View style={styles.callusRow}>
              <Pressable onPress={() => whatsapp()} style={styles.imgContainer}>
                <Image source={IconPack.WHATS_UP} style={styles.imgStyle} />
                <Text style={styles.whatsappText}>{strings.whatsapp}</Text>
              </Pressable>
              <Pressable onPress={() => call()} style={styles.imgContainer}>
                <Image source={IconPack.HEADPHONE} style={styles.imgStyle} />
                <Text style={styles.whatsappText}>{strings.callUs}</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </>
    );
  },
);

export default ContactUs;
