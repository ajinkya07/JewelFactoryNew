import React from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import Modal from 'react-native-modal';
import {observer} from 'mobx-react';
import FontAwesome from 'react-native-vector-icons/FontAwesome6';
import RootStore from '../../../../stores/RootStore';
import {styles} from './ProductStatusModal.styles.jsx';
import Divider from '../../../../components/Divider';
import {colors} from '../../../../utils/colors';
import PressableComponent, {
  PRESSABLE_BTN_TYPE,
} from '../../../../components/PressableComponent/PressableComponent';
import {strings} from '../../../../utils/strings.ts';

const ProductStatusModal = ({isModalVisible, setModalVisible}: any) => {
  const onCloseModal = () => {
    setModalVisible(false);
  };

  const STATUS_DATA = [
    {
      id: '1',
      option: strings.Available,
    },
    {
      id: '2',
      option: strings.Sold,
    },
  ];

  const handleOptionSelect = id => {
    RootStore.homeStore.setFields('productStatus', id);
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
          <Text style={styles.sectionTitle}>Select Option</Text>
          <FlatList
            style={styles.listContaier}
            data={STATUS_DATA}
            keyExtractor={(item, index) => `melting-options${index}`}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => handleOptionSelect(item.id)}>
                <FontAwesome
                  name="check"
                  size={20}
                  color={
                    RootStore.homeStore.productStatus === item.id
                      ? colors.iconsTintColor
                      : 'transparent'
                  }
                  style={styles.checkmarkIcon}
                />
                <Text style={styles.listItemText}>{item.option}</Text>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={renderSeparator}
            ListFooterComponent={renderSeparator}
          />
          <View style={styles.section}>
            <PressableComponent
              btnType={PRESSABLE_BTN_TYPE.PRIMARY}
              text={strings.Contine}
              colorConfig={{
                pressedBgColor: colors.hyperlinkPressed,
              }}
              onPress={() => {
                RootStore.homeStore.setFields(
                  'isProductStatusModalVisible',
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

export default observer(ProductStatusModal);
