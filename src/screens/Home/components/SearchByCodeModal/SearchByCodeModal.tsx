import React, {useState} from 'react';
import {View, Text, KeyboardAvoidingView} from 'react-native';
import Modal from 'react-native-modal';
import {observer} from 'mobx-react';
import RootStore from '../../../../stores/RootStore';
import {styles} from './SearchByCodeModal.styles';
import Divider from '../../../../components/Divider';
import PressableComponent, {
  PRESSABLE_BTN_TYPE,
} from '../../../../components/PressableComponent/PressableComponent';
import InputComponent from '../../../../components/InputComponent/InputComponent';
import {strings} from '../../../../utils/strings';

const SearchByCodeModal = ({isModalVisible, setModalVisible}: any) => {
  const [isInputFocused, setInputFocused] = useState(false);
  const [inputText, setInputText] = useState('');

  const onCloseModal = () => {
    setModalVisible(false);
    setInputFocused(false);
  };

  // find search by code function
  const onContinuePress = () => {
    const params = new FormData();
    params.append('table', 'product_master');
    params.append('mode_type', 'filter_data');
    params.append('user_id', RootStore.appStore.userId);
    params.append('design_number', inputText);
    RootStore.productStore.getSearchByCodeApi(params);
    RootStore.homeStore.setFields('isSearchByCodeModalVisible', false);
  };
  return (
    <Modal
      isVisible={isModalVisible}
      backdropTransitionOutTiming={0}
      style={styles.modalStyle}
      animationInTiming={500}
      animationOutTiming={500}
      onBackdropPress={() => onCloseModal()}
      onBackButtonPress={() => onCloseModal()}
      onSwipeComplete={() => onCloseModal()}
      swipeDirection="down"
      propagateSwipe>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.modalContent}>
          <Divider style={styles.upperDivider} />
          <Text style={styles.sectionTitle}>Search By Code</Text>
          <View
            style={[
              styles.searchContainer,
              isInputFocused && styles.searchContainerFocused,
            ]}>
            {isInputFocused && <Text style={styles.searchLabel}>Search</Text>}
            <View style={styles.inputRow}>
              <InputComponent
                style={styles.input}
                placeholder={!isInputFocused ? strings.Search : ''}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                onChangeText={text => setInputText(text)}
                keyboardType="default"
              />
            </View>
          </View>
          <View style={styles.section}>
            <PressableComponent
              btnType={PRESSABLE_BTN_TYPE.PRIMARY}
              text={strings.Contine}
              containerStyle={styles.btn}
              pressableStyle={styles.btn}
              onPress={() => {
                onContinuePress();
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default observer(SearchByCodeModal);
