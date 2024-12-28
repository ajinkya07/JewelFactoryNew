import React from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {observer} from 'mobx-react';
import Modal from 'react-native-modal';
import {styles} from './CartWeightModal.styles';
import {strings} from '../../../../utils/strings';
import Divider from '../../../../components/Divider';

type CartWeightModalType = {
  isModalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  data?: any;
};

const CartWeightModal = observer(
  ({isModalVisible, setModalVisible, data}: CartWeightModalType) => {
    const totalWT = data.total_weight || 0;

    const totalQuantity = data?.total_quantity || 0;

    return (
      <>
        <Modal
          isVisible={isModalVisible}
          style={styles.modalView}
          onBackdropPress={() => setModalVisible(false)}
          onBackButtonPress={() => setModalVisible(false)}
          // onSwipeComplete={() => setModalVisible(false)}
          // swipeDirection="down"
          propagateSwipe={true}>
          <View style={styles.modalViewContainer}>
            {/* <Divider style={styles.divider} /> */}
            <Text style={styles.titleText}>{strings.cartSummary}</Text>
            <Text style={styles.subtitleText}>{strings.cartWeightDesc}</Text>

            <ScrollView>
              {data?.cart_data.map((item: any, index: number) => (
                <View key={index} style={styles.content}>
                  <Text style={styles.categoryTitle}>{item.key}</Text>

                  {item.cat_data.map((item: any, index: number) => {
                    return (
                      <Text key={`details-${index}`} style={styles.detailsText}>
                        {index + 1}. {strings.designNo}: {item.product_id}
                        {'\n'}
                        <Text style={styles.detailsSubText}>
                          {strings.grossWt}: {item.gross_wt}, {strings.netWt}:{' '}
                          {item.net_wt}, {strings.quantity}: {item.quantity}
                        </Text>
                      </Text>
                    );
                  })}

                  <Divider style={styles.itemDivider} />
                </View>
              ))}
            </ScrollView>

            <View style={styles.buttonContainer}>
              <Text style={styles.categoryTitle}>
                {strings.totalWeight}: {totalWT}
              </Text>

              <Text style={[styles.categoryTitle, styles.marginTop10]}>
                {strings.totalQuantity}: {totalQuantity}
              </Text>
            </View>
          </View>
        </Modal>
      </>
    );
  },
);

export default CartWeightModal;
