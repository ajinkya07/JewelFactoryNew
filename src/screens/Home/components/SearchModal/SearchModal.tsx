import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';
import Entypo from 'react-native-vector-icons/Entypo';
import {observer} from 'mobx-react';
import {styles} from './SearchModal.styles';
import {colors} from '../../../../utils/colors';
import {isDefined, showToast} from '../../../../utils/helper';
import {constants, ERROR_MESSAGES} from '../../../../utils/constants';
import PressableComponent, {
  PRESSABLE_BTN_TYPE,
} from '../../../../components/PressableComponent/PressableComponent';
import HeaderComponent from '../../../../components/Header/HeaderComponent';
import DatePickerComponent from '../../../Cart/components/DatePickerComponent/DatePickerComponent';
import RootStore from '../../../../stores/RootStore';
import SearchByCodeModal from '../SearchByCodeModal/SearchByCodeModal';
import MeltingOptionModal from '../MeltingOptionsModal/MeltingOptionModal';
import AccordionModal from '../AccordionModal/AccordionModal';
import InputComponent from '../../../../components/InputComponent/InputComponent';
import ProductStatusModal from '../ProductStatusModal/ProductStatusModal';
import {strings} from '../../../../utils/strings';

const SearchModal = ({isModalVisible, setModalVisible}: any) => {
  const [grossWeightFrom, setGrossWeightFrom] = useState('');
  const [grossWeightTo, setGrossWeightTo] = useState('');
  const [netWeightFrom, setNetWeightFrom] = useState('');
  const [netWeightTo, setNetWeightTo] = useState('');
  const [dateFromSelected, setDateFromSelected] = useState(false);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [isDateModalVisible, setDateModalVisible] = useState(false);

  useEffect(() => {
    if (isModalVisible) {
      setDateFrom('');
      setDateTo('');
      setGrossWeightFrom('');
      setGrossWeightTo('');
      setNetWeightFrom('');
      setNetWeightTo('');
      RootStore.homeStore.setFields('productCategories', []);
      RootStore.homeStore.setFields('meltingOptions', []);
      RootStore.homeStore.setFields('productStatus', '1');
    }
  }, [isModalVisible]);

  const meltingOptions = isDefined(RootStore.homeStore.meltingOptions)
    ? RootStore.homeStore.meltingOptions
    : [];

  const onDateChange = (date: string) => {
    if (dateFromSelected) {
      setDateFrom(date);
    } else {
      setDateTo(date);
    }
  };

  const onSearchButtonPress = () => {
    validateFields();
    const params = new FormData();
    params.append('table', 'product_master');
    params.append('mode_type', 'filter_data');
    params.append('user_id', RootStore.appStore.userId);
    params.append('record', 10);
    params.append('page_no', 0);
    params.append(
      'collection_ids',
      RootStore.homeStore.productCategories.toString(),
    );
    params.append('sort_by', '6');
    params.append('min_gross_weight', grossWeightFrom ? grossWeightFrom : '');
    params.append('max_gross_weight', grossWeightTo ? grossWeightTo : '');
    params.append('min_net_weight', netWeightFrom ? netWeightFrom : '');
    params.append('max_net_weight', netWeightTo ? netWeightTo : '');
    params.append('product_status', RootStore.homeStore.productStatus);
    params.append('melting_id', RootStore.homeStore.meltingOptions.toString());
    params.append('created_date_from', dateFrom ? dateFrom : '');
    params.append('created_date_to', dateTo ? dateTo : '');

    RootStore.productStore.getProductSearchApi(params);
  };

  const validateFields = () => {
    const validations = [
      {
        condition: grossWeightFrom && !grossWeightTo,
        title: ERROR_MESSAGES.GROSS_WEIGHT.TITLE,
        message: ERROR_MESSAGES.GROSS_WEIGHT.TO_MISSING,
      },
      {
        condition: !grossWeightFrom && grossWeightTo,
        title: ERROR_MESSAGES.GROSS_WEIGHT.TITLE,
        message: ERROR_MESSAGES.GROSS_WEIGHT.FROM_MISSING,
      },
      {
        condition: netWeightFrom && !netWeightTo,
        title: ERROR_MESSAGES.NET_WEIGHT.TITLE,
        message: ERROR_MESSAGES.NET_WEIGHT.TO_MISSING,
      },
      {
        condition: !netWeightFrom && netWeightTo,
        title: ERROR_MESSAGES.NET_WEIGHT.TITLE,
        message: ERROR_MESSAGES.NET_WEIGHT.FROM_MISSING,
      },
      {
        condition: dateFrom && !dateTo,
        title: ERROR_MESSAGES.DATE.TITLE,
        message: ERROR_MESSAGES.DATE.TO_MISSING,
      },
      {
        condition: !dateFrom && dateTo,
        title: ERROR_MESSAGES.DATE.TITLE,
        message: ERROR_MESSAGES.DATE.FROM_MISSING,
      },
    ];

    for (const {condition, title, message} of validations) {
      if (condition) {
        showToast({
          title: title,
          subtitle: message,
        });
        return false;
      }
    }

    return true;
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
      propagateSwipe>
      <View style={styles.modalContent}>
        <SafeAreaView style={styles.container}>
          <HeaderComponent
            rightIcon1={false}
            isBack={true}
            onBackPress={() => setModalVisible(false)}
          />
          <KeyboardAvoidingView
            style={styles.flexContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ScrollView
              style={styles.content}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled">
              <View style={styles.section}>
                <Text style={styles.parentSectionTitle}>
                  {strings.CodeSearch}
                </Text>
                <Pressable
                  onPress={() => {
                    RootStore.homeStore.setFields(
                      'isSearchByCodeModalVisible',
                      true,
                    );
                  }}
                  style={styles.searchBox}>
                  <Text style={styles.placeholderText}>
                    {strings.Searchbycode}
                  </Text>
                </Pressable>
              </View>

              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>{strings.OR}</Text>
                <View style={styles.dividerLine} />
              </View>

              <View style={styles.section}>
                <Text style={styles.parentSectionTitle}>
                  {strings.AdvancedSearch}
                </Text>

                <Text style={styles.sectionTitle}>{strings.GrossWeight}</Text>
                <View style={styles.inputRow}>
                  <InputComponent
                    value={grossWeightFrom}
                    onChangeText={setGrossWeightFrom}
                    style={styles.input}
                    placeholder={'From'}
                    keyboardType="decimal-pad"
                  />
                  <Text style={styles.andText}>{strings.AND}</Text>
                  <InputComponent
                    style={styles.input}
                    placeholder="To"
                    placeholderTextColor={colors.gray}
                    value={grossWeightTo}
                    onChangeText={setGrossWeightTo}
                    keyboardType="decimal-pad"
                  />
                </View>

                <Text style={styles.sectionTitle}>{strings.NetWeight}</Text>
                <View style={styles.inputRow}>
                  <InputComponent
                    style={styles.input}
                    placeholder="From"
                    placeholderTextColor={colors.gray}
                    value={netWeightFrom}
                    onChangeText={setNetWeightFrom}
                    keyboardType="decimal-pad"
                  />
                  <Text style={styles.andText}>{strings.AND}</Text>
                  <InputComponent
                    style={styles.input}
                    placeholder="To"
                    placeholderTextColor={colors.gray}
                    value={netWeightTo}
                    onChangeText={setNetWeightTo}
                    keyboardType="decimal-pad"
                  />
                </View>

                <Text style={styles.sectionTitle}>
                  {strings.ProductReleaseBetween}
                </Text>
                <View style={styles.inputRow}>
                  <Pressable
                    onPress={() => {
                      setDateModalVisible(true);
                      setDateFromSelected(true);
                    }}
                    style={styles.input}>
                    {isDefined(dateFrom) ? (
                      <Text style={styles.dropdownTextBlack}>{dateFrom}</Text>
                    ) : (
                      <Text style={styles.dropdownText}>
                        {strings.FromDate}
                      </Text>
                    )}
                  </Pressable>
                  <Text style={styles.andText}>{strings.AND}</Text>
                  <Pressable
                    onPress={() => {
                      setDateModalVisible(true);
                      setDateFromSelected(false);
                    }}
                    style={styles.input}>
                    {isDefined(dateTo) ? (
                      <Text style={styles.dropdownTextBlack}>{dateTo}</Text>
                    ) : (
                      <Text style={styles.dropdownText}>{strings.ToDate}</Text>
                    )}
                  </Pressable>
                </View>

                <View>
                  <Pressable
                    onPress={() => {
                      RootStore.homeStore.setFields(
                        'isProductStatusModalVisible',
                        true,
                      );
                    }}
                    style={styles.dropdown}>
                    <Text style={styles.sectionTitle}>
                      {strings.SelectStatus}
                    </Text>
                    <Entypo size={19} name="chevron-down" />
                  </Pressable>
                  <Text style={styles.dropdownText}>
                    {RootStore.homeStore.productStatus === '1'
                      ? constants.AVAILABLE
                      : 'Sold'}
                  </Text>
                </View>

                <View style={styles.meltingView}>
                  <Pressable
                    onPress={() => {
                      RootStore.homeStore.setFields(
                        'isMeltingOptionsModalVisible',
                        true,
                      );
                    }}
                    style={styles.dropdown}>
                    <Text style={styles.sectionTitle}>{strings.Melting}</Text>
                    <Entypo size={19} name="chevron-down" />
                  </Pressable>
                  <Text style={styles.dropdownText}>
                    <Text style={styles.dropdownText}>
                      {meltingOptions.length > 0
                        ? meltingOptions.join(', ')
                        : strings.Selectmelting}
                    </Text>
                  </Text>
                </View>

                {/* Accordion Selection Modal */}
                <AccordionModal
                  isModalVisible={RootStore.homeStore.isAccordionModalVisible}
                  setModalVisible={(toggleValue: boolean) => {
                    RootStore.homeStore.setFields(
                      'isAccordionModalVisible',
                      toggleValue,
                    );
                  }}
                />
              </View>
            </ScrollView>

            <View style={styles.stickySearchButtonContainer}>
              <PressableComponent
                btnType={PRESSABLE_BTN_TYPE.PRIMARY}
                text={strings.Search}
                colorConfig={{
                  pressedBgColor: colors.hyperlinkPressed,
                }}
                onPress={() => {
                  onSearchButtonPress();
                }}
              />
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>

      {/* Search by Code modal */}
      <SearchByCodeModal
        isModalVisible={RootStore.homeStore.isSearchByCodeModalVisible}
        setModalVisible={(toggleValue: boolean) => {
          RootStore.homeStore.setFields(
            'isSearchByCodeModalVisible',
            toggleValue,
          );
        }}
      />

      {/* Product status Modal */}
      <ProductStatusModal
        isModalVisible={RootStore.homeStore.isProductStatusModalVisible}
        setModalVisible={(toggleValue: boolean) => {
          RootStore.homeStore.setFields(
            'isProductStatusModalVisible',
            toggleValue,
          );
        }}
      />

      {/* Melting Options Modal */}
      <MeltingOptionModal
        isModalVisible={RootStore.homeStore.isMeltingOptionsModalVisible}
        setModalVisible={(toggleValue: boolean) => {
          RootStore.homeStore.setFields(
            'isMeltingOptionsModalVisible',
            toggleValue,
          );
        }}
      />

      {/* Date Picker */}
      <DatePickerComponent
        dateFromSelected={dateFromSelected}
        isModalVisible={isDateModalVisible}
        setModalVisible={() => {
          setDateModalVisible(false);
        }}
        setDateInput={(date: string) => onDateChange(date)}
        selectedDate={dateFromSelected ? dateFrom : dateTo}
      />
      <Toast />
    </Modal>
  );
};

export default observer(SearchModal);
