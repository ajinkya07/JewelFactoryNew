import React, {useState} from 'react';
import {View, Text, FlatList, Pressable, Alert} from 'react-native';
import Modal from 'react-native-modal';
import RootStore from '../../../../../stores/RootStore';
import PressableComponent, {
  PRESSABLE_ALIGN,
  PRESSABLE_BTN_TYPE,
} from '../../../../../components/PressableComponent/PressableComponent';
import {strings} from '../../../../../utils/strings';
import {styles} from './FilterModal.styles';
import Divider from '../../../../../components/Divider';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {isDefined} from '../../../../../utils/helper';
import {Observer, observer} from 'mobx-react';
import {colors} from '../../../../../utils/colors';

const FilterModal = observer(
  ({isModalVisible, setModalVisible, data, applyFilter, onPressReset}: any) => {
    const [selectedProductName, setSelectedProductName] = useState('');

    const setProductName = (name: string) => {
      RootStore.productStore.setFields('selectedProductName', name);
    };

    // For gross filter
    const GrossWeightComponent = ({data}: any) => {
      const grossWeight = data[0];

      const multiSliderValuesChangeTwo = (values: any) => {
        RootStore.productStore.setFields('minGrossWeight', values[0]);
        RootStore.productStore.setFields('maxGrossWeight', values[1]);
      };

      return (
        <Observer>
          {() => (
            <View style={styles.content}>
              {data ? (
                <View>
                  <MultiSlider
                    values={[
                      Number(RootStore.productStore.minGrossWeight),
                      Number(RootStore.productStore.maxGrossWeight),
                    ]}
                    sliderLength={RootStore.appStore.screenWidth - 100}
                    onValuesChange={multiSliderValuesChangeTwo}
                    min={Number(grossWeight?.min_gross_weight)}
                    max={Number(grossWeight?.max_gross_weight)}
                    step={1}
                    selectedStyle={{backgroundColor: '#303030'}}
                    unselectedStyle={{backgroundColor: 'silver'}}
                    trackStyle={styles.markerHeight}
                    markerStyle={styles.marker}
                  />
                  <View style={styles.valueRow}>
                    <Text style={styles.valueText}>
                      {Number(RootStore.productStore.minGrossWeight)}
                    </Text>

                    <Text style={styles.valueText}>
                      {Number(RootStore.productStore.maxGrossWeight)}
                    </Text>
                  </View>
                </View>
              ) : null}
            </View>
          )}
        </Observer>
      );
    };

    // For netweight filter
    const NetWeightComponent = ({data}: any) => {
      const netweight = data[0];

      const multiSliderValuesChangeTwo = (values: any) => {
        RootStore.productStore.setFields('minNetWeight', values[0]);
        RootStore.productStore.setFields('maxNetWeight', values[1]);
      };

      return (
        <Observer>
          {() => (
            <View style={styles.content}>
              {data ? (
                <View>
                  <MultiSlider
                    values={[
                      Number(RootStore.productStore.minNetWeight),
                      Number(RootStore.productStore.maxNetWeight),
                    ]}
                    sliderLength={RootStore.appStore.screenWidth - 100}
                    onValuesChange={multiSliderValuesChangeTwo}
                    min={Number(netweight?.min_net_weight)}
                    max={Number(netweight?.max_net_weight)}
                    step={1}
                    selectedStyle={{backgroundColor: '#303030'}}
                    unselectedStyle={{backgroundColor: 'silver'}}
                    trackStyle={styles.markerHeight}
                    markerStyle={styles.marker}
                  />
                  <View style={styles.valueRow}>
                    <Text style={styles.valueText}>
                      {Number(RootStore.productStore.minNetWeight)}
                    </Text>

                    <Text style={styles.valueText}>
                      {Number(RootStore.productStore.maxNetWeight)}
                    </Text>
                  </View>
                </View>
              ) : null}
            </View>
          )}
        </Observer>
      );
    };

    const ProductNameComponent = ({data}) => {
      return (
        <Observer>
          {() => (
            <Pressable
              onPress={() => setProductName(data?.product_name)}
              style={({pressed}) => [
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 7,
                  marginHorizontal: 10,
                },
              ]}>
              {RootStore.productStore.selectedProductName ===
              data?.product_name ? (
                <View style={styles.radioCircle}>
                  <View style={styles.selectedRb} />
                </View>
              ) : (
                <View style={styles.radioCircle} />
              )}
              <Text
                style={{
                  fontSize: 16,
                  marginLeft: 10,
                  flex: 1,
                  textTransform: 'capitalize',
                }}>
                {data?.product_name}
              </Text>
            </Pressable>
          )}
        </Observer>
      );
    };

    const grossWeightData =
      RootStore.productStore?.filterByParamsData?.gross_weight;
    const netWeightData =
      RootStore.productStore?.filterByParamsData?.net_weight;
    const productNameData =
      RootStore.productStore?.filterByParamsData?.product_name;

    return (
      <Observer>
        {() => (
          <Modal
            isVisible={isModalVisible}
            style={styles.modalView}
            onBackdropPress={() => setModalVisible(false)}
            onBackButtonPress={() => setModalVisible(false)}
            // onSwipeComplete={() => setModalVisible(false)}
            animationInTiming={500}
            animationOutTiming={500}
            // swipeDirection="down"
            // propagateSwipe
          >
            <View style={styles.modalViewContainer}>
              <Divider style={styles.divider} />
              <View style={styles.flexRow}>
                <Text style={styles.titleText}>{strings.filter}</Text>
                <PressableComponent
                  btnType={PRESSABLE_BTN_TYPE.TEXT}
                  onPress={onPressReset}
                  text={strings.reset}
                  align={PRESSABLE_ALIGN.LEFT}
                  colorConfig={{
                    pressedBgColor: colors.hyperlinkPressed,
                  }}
                  pressableStyle={styles.resetPressed}
                  textStyle={styles.reset}
                />
              </View>
              <Text style={styles.subtitleText}>{strings.filterDesc}</Text>

              <View>
                {isDefined(grossWeightData) && (
                  <View style={styles.itemContainer}>
                    <Text style={styles.weightText}>Gross Weight </Text>
                    <GrossWeightComponent data={grossWeightData} />
                  </View>
                )}
                {isDefined(netWeightData) && (
                  <View style={[styles.itemContainer, styles.marginTop]}>
                    <Text style={styles.weightText}>Net Weight </Text>
                    <NetWeightComponent data={netWeightData} />
                  </View>
                )}
              </View>

              {isDefined(productNameData) && (
                <View style={[styles.itemContainer2, styles.marginTop]}>
                  <Text style={[styles.weightText, styles.productName]}>
                    Product Name
                  </Text>
                  <FlatList
                    style={{
                      height: 250,
                    }}
                    scrollEventThrottle={16}
                    contentContainerStyle={{
                      overflow: 'hidden',
                      paddingVertical: 20,
                    }}
                    data={productNameData}
                    renderItem={({item}) => (
                      <ProductNameComponent data={item} />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>
              )}

              <View style={styles.btnContainer}>
                <PressableComponent
                  btnType={PRESSABLE_BTN_TYPE.PRIMARY}
                  text={strings.apply}
                  containerStyle={styles.btnContainer}
                  onPress={() => {
                    setModalVisible(false);
                    applyFilter(data);
                  }}
                  isLoading={false}
                />
              </View>
            </View>
          </Modal>
        )}
      </Observer>
    );
  },
);

export default FilterModal;
