import React from 'react';
import {View, Text} from 'react-native';
import Modal from 'react-native-modal';
import PressableComponent, {
  PRESSABLE_BTN_TYPE,
} from '../PressableComponent/PressableComponent';
import {styles} from './ConfirmationModal.styles';
import Divider from '../Divider';

const ConfirmationModal = ({
  isVisible,
  title = 'Confirm',
  subtitle,
  onConfirm,
  onCancel,
  confirmText = 'Yes',
  cancelText = 'No',
  singleButton = false,
}: any) => {
  return (
    <Modal
      isVisible={isVisible}
      backdropTransitionOutTiming={0}
      animationInTiming={300}
      animationOutTiming={300}
      style={styles.modalStyle}
      onBackdropPress={onCancel}
      onBackButtonPress={onCancel}
      propagateSwipe>
      <View style={styles.modalContent}>
        <Divider style={styles.upperDivider} />
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>

        <View style={styles.buttonContainer}>
          {singleButton ? (
            <PressableComponent
              btnType={PRESSABLE_BTN_TYPE.PRIMARY}
              text={confirmText}
              containerStyle={styles.singleButton}
              onPress={onConfirm}
            />
          ) : (
            <>
              <PressableComponent
                btnType={PRESSABLE_BTN_TYPE.PRIMARY}
                text={cancelText}
                isPairButton={true}
                isRightButton={false}
                onPress={onCancel}
              />
              <PressableComponent
                btnType={PRESSABLE_BTN_TYPE.PRIMARY}
                text={confirmText}
                isPairButton={true}
                isRightButton={true}
                onPress={onConfirm}
              />
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;
