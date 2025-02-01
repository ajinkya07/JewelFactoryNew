import React, {useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import Modal from 'react-native-modal';
import {observer} from 'mobx-react';
import RootStore from '../../../../stores/RootStore';
import {styles} from './MeltingOptionsModal.styles';
import Divider from '../../../../components/Divider';
import PressableComponent, {
  PRESSABLE_BTN_TYPE,
} from '../../../../components/PressableComponent/PressableComponent';
import {colors} from '../../../../utils/colors';
import {strings} from '../../../../utils/strings';

const MeltingOptionsModal = ({isModalVisible, setModalVisible}: any) => {
  const [isInputFocused, setInputFocused] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const onCloseModal = () => {
    setModalVisible(false);
    setInputFocused(false);
    setSelectedOptions([]);
  };

  const MELTING_DATA = [
    {
      id: 0,
      option: 84,
    },
    {
      id: 1,
      option: 92,
    },
    {
      id: 2,
      option: 75,
    },
  ];

  console.log(RootStore.homeStore.isMeltingOptionsModalVisible);

  const handleOptionSelect = option => {
    setSelectedOptions(prevState =>
      prevState.includes(option)
        ? prevState.filter(optionId => optionId !== option)
        : [...prevState, option],
    );
  };

  const renderSeparator = () => <View style={styles.divider} />;

  return (
    <>
      <Modal
        isVisible={isModalVisible}
        backdropTransitionOutTiming={0}
        style={styles.modalStyle}
        animationInTiming={500}
        animationOutTiming={500}
        onBackdropPress={onCloseModal}
        onBackButtonPress={onCloseModal}
        onSwipeComplete={onCloseModal}
        swipeDirection="down"
        propagateSwipe>
        <View style={styles.modalContent}>
          <Divider style={styles.upperDivider} />
          <Text style={styles.sectionTitle}>Select Melting</Text>
          <View
            style={[
              styles.searchContainer,
              isInputFocused && styles.searchContainerFocused,
            ]}>
            {isInputFocused && <Text style={styles.searchLabel}>Search</Text>}
          </View>
          <FlatList
            data={MELTING_DATA}
            keyExtractor={(item, index) => `melting-options${index}`}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => handleOptionSelect(item.option)}>
                <View style={styles.checkboxContainer}>
                  <View
                    style={[
                      styles.checkbox,
                      selectedOptions.includes(item.option) &&
                        styles.checkboxSelected,
                    ]}
                  />
                  <Text style={styles.listItemText}>{item.option}</Text>
                </View>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={renderSeparator}
            ListFooterComponent={renderSeparator}
          />
          <View style={styles.section}>
            <PressableComponent
              btnType={PRESSABLE_BTN_TYPE.PRIMARY}
              text={strings.Continue}
              colorConfig={{
                pressedBgColor: colors.hyperlinkPressed,
              }}
              onPress={() => {
                RootStore.homeStore.setFields(
                  'meltingOptions',
                  selectedOptions,
                );
                RootStore.homeStore.setFields(
                  'isMeltingOptionsModalVisible',
                  false,
                );
              }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default observer(MeltingOptionsModal);
