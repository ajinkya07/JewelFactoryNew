import React, {useState} from 'react';
import {View, Text} from 'react-native';
import Modal from 'react-native-modal';
import {styles} from './DeleteAccountModal.styles';
import {strings} from '../../../utils/strings';
import {observer} from 'mobx-react';
import Divider from '../../../components/Divider';
import InputComponent from '../../../components/InputComponent/InputComponent';
import PressableComponent, {
  PRESSABLE_BTN_TYPE,
} from '../../../components/PressableComponent/PressableComponent';
import RootStore from '../../../stores/RootStore';
import ConfirmationModal from '../../../components/ConfirmationModal/ConfirmationModal';

const DeleteAccountModal = ({isModalVisible, setModalVisible}: any) => {
  const [inputText, setInputText] = useState('');
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);

  const onContinuePress = () => {
    setConfirmationVisible(true);
  };

  const handleDeleteAccount = () => {
    const params = new FormData();
    params.append('user_id', RootStore.appStore.userId);
    params.append('feedback', inputText);

    RootStore.loginStore.deleteAccountApi(params);
    setInputText('');
    setModalVisible(false);
    setConfirmationVisible(false);
  };

  return (
    <>
      <Modal
        isVisible={isModalVisible}
        backdropTransitionOutTiming={0}
        style={styles.modalStyle}
        animationInTiming={500}
        animationOutTiming={500}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection="down"
        propagateSwipe
        avoidKeyboard>
        <View style={styles.modalContent}>
          <Divider style={styles.upperDivider} />
          <Text style={styles.sectionTitle}>Delete Account</Text>

          <View style={styles.paraView}>
            <Text style={styles.paraText}>{strings.DeleteAccountPara}</Text>
          </View>

          <View style={styles.inputRow}>
            <InputComponent
              style={styles.input}
              placeholder={strings.EnterYourMessageHere}
              onChangeText={(text: string) => setInputText(text)}
              keyboardType="default"
              multiline={true}
              numberOfLines={10}
            />
          </View>

          <View style={styles.section}>
            <PressableComponent
              btnType={PRESSABLE_BTN_TYPE.PRIMARY}
              text={strings.continue}
              containerStyle={styles.btn}
              pressableStyle={styles.btn}
              onPress={onContinuePress}
            />
          </View>
        </View>
        {/* Confirmation Modal */}
        <ConfirmationModal
          isVisible={isConfirmationVisible}
          onClose={() => setConfirmationVisible(false)}
          title="Are you sure?"
          subtitle="Do you really want to delete your account? This action cannot be undone."
          onConfirm={handleDeleteAccount}
          onCancel={() => setConfirmationVisible(false)}
          confirmText="Delete"
          cancelText="Cancel"
          showCancel
        />
      </Modal>
    </>
  );
};

export default observer(DeleteAccountModal);
