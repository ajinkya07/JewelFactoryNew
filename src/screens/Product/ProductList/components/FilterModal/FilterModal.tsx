import React, {useState} from 'react';
import {View, Text} from 'react-native';
import Modal from 'react-native-modal';
import RootStore from '../../../../../stores/RootStore';
import PressableComponent, {
  PRESSABLE_BTN_TYPE,
} from '../../../../../components/PressableComponent/PressableComponent';
import {strings} from '../../../../../utils/strings';
import {styles} from './FilterModal.styles';
import Divider from '../../../../../components/Divider';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {isDefined} from '../../../../../utils/helper';

const FilterModal = ({
  isModalVisible,
  setModalVisible,
  data,
  applyFilter,
}: any) => {
  // For gross filter
  const GrossWeightComponent = ({data}: any) => {
    const [grossValueOne, setGrossValueOne] = useState(
      data[0].min_gross_weight,
    );
    const [grossValueTwo, setGrossValueTwo] = useState(
      data[0].max_gross_weight,
    );
    const grossWeight = data[0];

    const multiSliderValuesChangeTwo = (values: any) => {
      setGrossValueOne(values[0]);
      setGrossValueTwo(values[1]);

      RootStore.productStore.setFields('minGrossWeight', values[0]);
      RootStore.productStore.setFields('maxGrossWeight', values[1]);
    };

    return (
      <View style={styles.content}>
        {data ? (
          <View>
            <MultiSlider
              values={[
                grossWeight?.min_gross_weight,
                grossWeight?.max_gross_weight,
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
              <Text style={styles.valueText}>{Number(grossValueOne)}</Text>

              <Text style={styles.valueText}>{Number(grossValueTwo)}</Text>
            </View>
          </View>
        ) : null}
      </View>
    );
  };

  // For netweight filter
  const NetWeightComponent = ({data}: any) => {
    const [netValueOne, setNetValueOne] = useState(data[0].min_net_weight);
    const [netValueTwo, setNetValueTwo] = useState(data[0].max_net_weight);

    const netweight = data[0];

    const multiSliderValuesChangeTwo = (values: any) => {
      setNetValueOne(values[0]);
      setNetValueTwo(values[1]);

      RootStore.productStore.setFields('minNetWeight', values[0]);
      RootStore.productStore.setFields('maxNetWeight', values[1]);
    };

    return (
      <View style={styles.content}>
        {data ? (
          <View>
            <MultiSlider
              values={[netweight?.min_net_weight, netweight?.max_net_weight]}
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
              <Text style={styles.valueText}>{Number(netValueOne)}</Text>

              <Text style={styles.valueText}>{Number(netValueTwo)}</Text>
            </View>
          </View>
        ) : null}
      </View>
    );
  };

  const grossWeightData =
    RootStore.productStore.filterByParamsData?.gross_weight;
  const netWeightData = RootStore.productStore.filterByParamsData?.net_weight;

  return (
    <Modal
      isVisible={isModalVisible}
      style={styles.modalView}
      onBackdropPress={() => setModalVisible(false)}
      onBackButtonPress={() => setModalVisible(false)}
      onSwipeComplete={() => setModalVisible(false)}
      animationInTiming={600}
      animationOutTiming={500}
      swipeDirection="down"
      propagateSwipe>
      <View style={styles.modalViewContainer}>
        <Divider style={styles.divider} />
        <Text style={styles.titleText}>{strings.filter}</Text>

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
  );
};

export default FilterModal;
