import React, {useState, useEffect} from 'react';
import {View, ScrollView, Text} from 'react-native';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';
import {observer} from 'mobx-react';
import {styles} from './CartEditModal.styles';
import RootStore from '../../../../stores/RootStore';
import InputFieldWithIcon from '../../../../components/InputComponent/InputFieldWithIconComponent/InputFieldWithIcon';
import IconPack from '../../../../utils/IconPack';
import {strings} from '../../../../utils/strings';
import PressableComponent, {
  PRESSABLE_BTN_TYPE,
} from '../../../../components/PressableComponent/PressableComponent';
import {colors} from '../../../../utils/colors';
import Divider from '../../../../components/Divider';

const CartEditModal = ({isModalVisible, setModalVisible, productData}: any) => {
  const [code, setCode] = useState('');
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [comments, setComments] = useState('');
  const [weight, setWeight] = useState('');
  const [length, setLength] = useState('');

  useEffect(() => {
    if (isModalVisible && productData) {
      setCode(productData?.design_number || '');
      setProductName(productData?.collection_name || '');

      if (productData?.keys && productData?.values) {
        const quantityIndex = productData.keys.indexOf('quantity');
        if (quantityIndex !== -1) {
          setQuantity(productData.values[quantityIndex] || '');
        }

        const commentsIndex = productData.keys.indexOf('remarks');
        if (commentsIndex !== -1) {
          setComments(productData.values[commentsIndex] || '');
        }

        const weightIndex = productData.keys.indexOf('weight');
        if (weightIndex !== -1) {
          setWeight(productData.values[weightIndex] || '');
        }

        const lengthIndex = productData.keys.findIndex((key: any) =>
          key.includes('length'),
        );
        if (lengthIndex !== -1) {
          setLength(productData.values[lengthIndex] || '');
        }
      }
    }
  }, [isModalVisible, productData]);

  const handleUpdate = () => {
    if (!productData) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'No product selected for update',
      });
      return;
    }

    const updateData = new FormData();
    updateData.append('table', 'cart');
    updateData.append('user_id', RootStore.appStore.userId);
    updateData.append('cart_wish_id', productData?.cart_wish_id);
    updateData.append('quantity', quantity);
    updateData.append('remarks', comments);
    updateData.append('weight', weight);
    updateData.append('length', length);

    RootStore.cartStore.updateCardProduct(updateData);

    setModalVisible();
    setWeight('');
    setLength('');
  };

  return (
    <Modal
      isVisible={isModalVisible}
      backdropTransitionOutTiming={0}
      style={styles.modalStyle}
      animationInTiming={500}
      animationOutTiming={500}
      onBackButtonPress={() => setModalVisible()}
      onSwipeComplete={() => setModalVisible()}
      onBackdropPress={() => setModalVisible()}
      swipeDirection="down"
      propagateSwipe
      avoidKeyboard={true}>
      <View style={styles.modalContent}>
        <View style={styles.container}>
          <Divider style={styles.upperDivider} />
          <Text style={styles.sectionTitle}>Edit Product</Text>
          <ScrollView>
            {/* @ts-ignore */}
            <InputFieldWithIcon
              iconSource={IconPack.CODE}
              placeholder="Code"
              value={code}
              onChangeText={setCode}
              editable={false}
            />
            <InputFieldWithIcon
              iconSource={IconPack.ABC}
              placeholder="Product Name"
              value={productName}
              onChangeText={setProductName}
              editable={false}
            />
            <InputFieldWithIcon
              iconSource={IconPack.QUANTITY}
              placeholder="Quantity"
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="decimal-pad"
            />
            <InputFieldWithIcon
              iconSource={IconPack.COMMENT}
              placeholder="Comments"
              value={comments}
              onChangeText={setComments}
            />
            <InputFieldWithIcon
              vectorIcon={{
                library: 'MaterialCommunityIcons',
                name: 'weight-kilogram',
                size: 24,
              }}
              placeholder="Weight"
              value={weight}
              onChangeText={setWeight}
              keyboardType="decimal-pad"
            />
            <InputFieldWithIcon
              vectorIcon={{
                library: 'FontAwesome5',
                name: 'ruler',
                size: 24,
              }}
              placeholder="Length"
              value={length}
              onChangeText={setLength}
              keyboardType="decimal-pad"
            />

            <PressableComponent
              containerStyle={styles.topMargin}
              btnType={PRESSABLE_BTN_TYPE.PRIMARY}
              text={strings.Update}
              colorConfig={{
                pressedBgColor: colors.hyperlinkPressed,
              }}
              onPress={handleUpdate}
              isLoading={RootStore.cartStore.isUpdateCardProductApiLoading}
            />
          </ScrollView>
        </View>
      </View>
      <Toast />
    </Modal>
  );
};

export default observer(CartEditModal);
