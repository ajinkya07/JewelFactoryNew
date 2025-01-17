import React, {useEffect, useState} from 'react';
import {View, Text, Keyboard, Pressable} from 'react-native';
import {observer} from 'mobx-react';
import Modal from 'react-native-modal';
import {styles} from './PlaceOrderModal.styles';
import {strings} from '../../../../utils/strings';
import Divider from '../../../../components/Divider';
import PressableComponent, {
  PRESSABLE_BTN_TYPE,
} from '../../../../components/PressableComponent/PressableComponent';
import InputComponent from '../../../../components/InputComponent/InputComponent';
import {showToast, validateMobNum} from '../../../../utils/helper';
import RootStore from '../../../../stores/RootStore';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import DatePickerComponent from '../DatePickerComponent/DatePickerComponent';
import {colors} from '../../../../utils/colors';

type PlaceOrderModalType = {
  isModalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  userDetails: any;
};

const PlaceOrderModal = observer(
  ({isModalVisible, setModalVisible, userDetails}: PlaceOrderModalType) => {
    console.log('userDetails', userDetails);

    const [inputs, setLoginInputs] = useState({
      fullName: userDetails?.fullName,
      mobileNo: userDetails?.mobileNo,
      email: userDetails?.email,
      comments: '',
      date: '',
    });
    const [keyboardShowing, setKeyboardShowing] = useState(false);
    const [isDateModalVisible, setDateModalVisible] = useState(false);

    useEffect(() => {
      const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
        setKeyboardShowing(true);
      });
      const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
        setKeyboardShowing(false);
      });

      return () => {
        showSubscription.remove();
        hideSubscription.remove();
      };
    }, []);

    const onChangeText = (key: string, value: string) => {
      setLoginInputs({
        ...inputs,
        [key]: value,
      });
    };

    const placeOrderFromCart = () => {
      const {comments, date, fullName, email, mobileNo} = inputs;
      const deviceType = RootStore.appStore.isiOS ? 'ios' : 'android';

      if (fullName == '') {
        showToast({title: strings.enterName});
        return true;
      }
      if (mobileNo == '') {
        showToast({title: strings.enterMobileNo});
        return true;
      }
      if (mobileNo != '' && !validateMobNum(mobileNo)) {
        showToast({title: strings.enterValidMobileNo});
        return true;
      }
      if (date !== '') {
        const params = new FormData();

        params.append('user_id', RootStore.appStore.userId);
        params.append('full_name', fullName);
        params.append('email_id', email);
        params.append('mobile_number', mobileNo);
        params.append('which_device', deviceType);
        params.append('remarks', comments);

        var timeStamp = new Date().getTime() + 13 * 24 * 60 * 60 * 1000;
        var timeStampDate = moment(
          new Date(timeStamp).toISOString().slice(0, 10),
        ).format('DD-MM-YYYY');

        var date1 = moment(timeStampDate, 'DD-MM-YYYY').valueOf();
        var date2 = moment(date, 'DD-MM-YYYY').valueOf();

        if (date1 > date2) {
          showToast({title: strings.deliveryDateMsg});
        } else {
          params.append('delivery_date', date);
          RootStore.cartStore.placeOrderFromCartApi(params);
        }
      } else {
        showToast({title: strings.deliveryDateMsg});
      }
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
          propagateSwipe
          avoidKeyboard>
          <View style={styles.modalViewContainer}>
            <Divider style={styles.divider} />
            <Text style={styles.titleText}>{strings.confirmOrder}</Text>
            <Text style={styles.subtitleText}>
              {strings.placeOrderSubtitle}
            </Text>

            <View style={styles.content}>
              <InputComponent
                value={inputs.fullName}
                onChangeText={(value: string) =>
                  onChangeText('fullName', value)
                }
                style={styles.marginTop10}
                placeholder={strings.name}
                returnKeyType="done"
              />

              <InputComponent
                value={inputs.email}
                onChangeText={(value: string) => onChangeText('email', value)}
                style={styles.marginTop10}
                placeholder={strings.email}
                returnKeyType="done"
                keyboardType="email-address"
              />

              <InputComponent
                value={inputs.mobileNo}
                onChangeText={(value: string) =>
                  onChangeText('mobileNo', value)
                }
                style={styles.marginTop10}
                placeholder={strings.mobileNo}
                returnKeyType="done"
                keyboardType="phone-pad"
              />

              <InputComponent
                value={inputs.comments}
                onChangeText={(value: string) =>
                  onChangeText('comments', value)
                }
                style={styles.marginTop10}
                placeholder={strings.comments}
                returnKeyType="done"
              />

              <Pressable
                style={styles.dateInput}
                onPress={() => setDateModalVisible(true)}>
                <Text
                  style={
                    (styles.dateText,
                    {
                      color:
                        inputs.date == '' ? colors.lightGray : colors.black,
                    })
                  }>
                  {inputs.date == '' ? strings.deliveryDate : inputs.date}
                </Text>
              </Pressable>
            </View>

            {!keyboardShowing && (
              <PressableComponent
                btnType={PRESSABLE_BTN_TYPE.PRIMARY}
                text={strings.placeOrder}
                containerStyle={styles.buttonContainer}
                onPress={placeOrderFromCart}
                isLoading={RootStore.cartStore.isPlaceOrderFromCartApiLoading}
              />
            )}
          </View>
          <Toast />

          <DatePickerComponent
            isModalVisible={isDateModalVisible}
            setModalVisible={() => {
              setDateModalVisible(false);
            }}
            setDateInput={(date: string) => onChangeText('date', date)}
          />
        </Modal>
      </>
    );
  },
);

export default PlaceOrderModal;
