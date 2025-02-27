import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, ScrollView, Pressable, Text} from 'react-native';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';
import {observer} from 'mobx-react';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import {styles} from './EditProfileModal.styles';
import HeaderComponent from '../../../components/Header/HeaderComponent';
import IconPack from '../../../utils/IconPack';
import InputFieldWithIcon from '../../../components/InputComponent/InputFieldWithIconComponent/InputFieldWithIcon';
import RootStore from '../../../stores/RootStore';
import ResidentialModalComponent from '../../../components/ResidentialModalComponent/ResidentialModalComponent';
import PressableComponent, {
  PRESSABLE_BTN_TYPE,
} from '../../../components/PressableComponent/PressableComponent';
import {strings} from '../../../utils/strings';
import {colors} from '../../../utils/colors';
import DatePickerComponent from '../../Cart/components/DatePickerComponent/DatePickerComponent';
import {isDefined} from '../../../utils/helper';

const EditProfileModal = ({isModalVisible, setModalVisible}: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [designation, setDesignation] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [pincode, setPincode] = useState('');
  const [dob, setDob] = useState('');
  const [anniversaryDate, setAnniversaryDate] = useState('');
  const [isDateModalVisible, setDateModalVisible] = useState(false);
  const [dateType, setDateType] = useState('');

  const profileData = RootStore.homeStore?.getProfileData;
  const residentialData = RootStore.menuStore?.residentialData;

  useEffect(() => {
    if (isModalVisible && profileData) {
      setName(profileData.full_name || '');
      setEmail(profileData.email_id || '');
      setMobileNumber(profileData.mobile_number || '');
      setDesignation(profileData.designation || '');
      setCompanyName(profileData.organisation || '');
      setGstNumber(profileData.gst || '');
      setPincode(profileData.pincode || '');

      setDob(
        profileData.birthday !== '0000-00-00'
          ? moment(profileData.birthday).format('DD-MM-YYYY')
          : '',
      );
      setAnniversaryDate(
        profileData.anniversary_date !== '0000-00-00'
          ? moment(profileData.anniversary_date).format('DD-MM-YYYY')
          : '',
      );
    }
  }, [isModalVisible, profileData]);

  const openDatePicker = (type: string) => {
    setDateType(type);
    setDateModalVisible(true);
  };

  const handleDateSelect = (date: string) => {
    if (dateType === 'dob') {
      setDob(date);
    } else if (dateType === 'anniversaryDate') {
      setAnniversaryDate(date);
    }
    setDateModalVisible(false);
  };

  const handleContinue = () => {
    const updateData = new FormData();

    updateData.append('user_id', RootStore.appStore.userId);
    updateData.append('delivery_mode', 'Cash');
    updateData.append('payment_terms', 'Return');
    updateData.append('pan', '');
    updateData.append('designation', designation);
    updateData.append('birthday', dob);
    updateData.append('anniversary_date', anniversaryDate);
    updateData.append('full_name', name);
    updateData.append('organization', companyName);
    updateData.append('gst', gstNumber);
    updateData.append('country_id', residentialData?.countryIndex);
    updateData.append('state_id', residentialData?.stateIndex);
    updateData.append('city_id', residentialData?.cityIndex);
    updateData.append('pincode', pincode);
    RootStore.menuStore.updateProfileApi(updateData);
    const params = new FormData();
    params.append('user_id', RootStore.appStore.userId);
    RootStore.homeStore.getProfilApi(params);
  };

  return (
    <Modal
      isVisible={isModalVisible}
      backdropTransitionOutTiming={0}
      style={styles.modalStyle}
      animationInTiming={500}
      animationOutTiming={500}
      onBackButtonPress={() => setModalVisible(false)}
      onSwipeComplete={() => setModalVisible(false)}
      swipeDirection="down"
      propagateSwipe
      avoidKeyboard={true}>
      <View style={styles.modalContent}>
        <SafeAreaView style={styles.container}>
          <HeaderComponent
            rightIcon1={false}
            isBack={true}
            onBackPress={() => setModalVisible(false)}
            text={'Edit Profile'}
          />

          <ScrollView>
            <InputFieldWithIcon
              iconSource={IconPack.PROFILE}
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
            />
            <InputFieldWithIcon
              iconSource={IconPack.EMAIL}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <InputFieldWithIcon
              iconSource={IconPack.MOBILE}
              placeholder="Mobile No."
              value={mobileNumber}
              onChangeText={setMobileNumber}
              keyboardType="phone-pad"
            />
            <InputFieldWithIcon
              iconSource={IconPack.DSG}
              placeholder="Designation"
              value={designation}
              onChangeText={setDesignation}
            />
            <InputFieldWithIcon
              iconSource={IconPack.ORGANISATION}
              placeholder="Company Name"
              value={companyName}
              onChangeText={setCompanyName}
            />
            <InputFieldWithIcon
              iconSource={IconPack.GSTNO}
              placeholder="GST No"
              value={gstNumber}
              onChangeText={setGstNumber}
              keyboardType="number-pad"
            />
            <InputFieldWithIcon
              iconSource={IconPack.PINCODE}
              placeholder="Pincode"
              value={pincode}
              onChangeText={setPincode}
              keyboardType="number-pad"
            />
            <InputFieldWithIcon
              iconSource={IconPack.DATEEDIT}
              placeholder={
                isDefined(dob) ? dob : `${profileData?.birthday} (DOB optional)`
              }
              value={dob}
              readOnly={true}
              onPress={() => openDatePicker('dob')}
            />
            <InputFieldWithIcon
              iconSource={IconPack.DATEEDIT}
              placeholder={
                isDefined(anniversaryDate)
                  ? anniversaryDate
                  : `${profileData?.anniversary_date} (Anniversary optional)`
              }
              value={anniversaryDate}
              readOnly={true}
              onPress={() => openDatePicker('anniversaryDate')}
            />
            <View>
              <Pressable
                onPress={() => {
                  RootStore.menuStore.setFields(
                    'isResidentialModalVisible',
                    true,
                  );
                }}
                style={styles.dropdown}>
                <Text style={styles.sectionTitle}>
                  {strings.SelectResidential}
                </Text>
                <Entypo size={19} name="chevron-down" />
              </Pressable>
            </View>
            <PressableComponent
              btnType={PRESSABLE_BTN_TYPE.PRIMARY}
              text={strings.UpdateProfile}
              colorConfig={{
                pressedBgColor: colors.hyperlinkPressed,
              }}
              onPress={() => {
                handleContinue();
              }}
            />
          </ScrollView>
        </SafeAreaView>
      </View>

      {/* Country, State, and City picker */}
      <ResidentialModalComponent
        isModalVisible={RootStore.menuStore.isResidentialModalVisible}
        setModalVisible={(toggleValue: boolean) => {
          RootStore.menuStore.setFields(
            'isResidentialModalVisible',
            toggleValue,
          );
        }}
        initialCountryId={profileData?.country_id}
        initialStateId={profileData?.state_id}
        initialCityId={profileData?.city_id}
      />

      {/* Date Picker */}
      <DatePickerComponent
        isModalVisible={isDateModalVisible}
        setModalVisible={() => setDateModalVisible(false)}
        setDateInput={handleDateSelect}
        selectedDate={dateType === 'dob' ? dob : anniversaryDate}
      />

      <Toast />
    </Modal>
  );
};

export default observer(EditProfileModal);
