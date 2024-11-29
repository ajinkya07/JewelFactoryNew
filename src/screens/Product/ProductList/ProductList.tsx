//import liraries
import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {styles} from './ProductList.styles';
import {observer} from 'mobx-react';
import {toUpperCase} from '../../../utils/helper';
import {colors} from '../../../utils/colors';
import LoadingComponent from '../../../components/LoadingComponent/LoadingComponent';
import PressableComponent, {
  PRESSABLE_BTN_TYPE,
} from '../../../components/PressableComponent/PressableComponent';
import ProductCard from './components/ProductCard/ProductCard';
import Modal from 'react-native-modal';
import {PRODUCT_DATA} from './productsData';
import {strings} from '../../../utils/strings';
import HeaderComponent from '../../../components/Header/HeaderComponent';

const ProductList = (props: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [selectedPriceIndex, setSelectedPrice] = useState(0);
  const [selectedPriceId, setSelectedPriceId] = useState('0');
  const [sortById, setSortById] = useState('1');

  const [isFilterModalVisible, setFilterModalVisible] = useState(false);

  const [isImageNotFound, setNoImageFound] = useState(false);
  const [isContactUsModalVisible, setContactUsModal] = useState(false);

  const [userId, setUserId] = useState('');

  const collectionId = props.route.params?.collectionId;
  const modeType = props.route.params?.modeType;
  const title = props.route.params?.title;

  const displayModal = (show: boolean) => {
    setModalVisible(show);
  };
  const displaySortModal = (show: boolean) => {
    setSortModalVisible(show);
  };

  const navigateTofilters = () => {
    // AppStore.handleScreenNavigation('Filters', {
    //   collectionId: collectionId,
    //   sortById: sortById,
    //   selectedPriceId: selectedPriceId,
    // });
  };

  const noDataFound = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>No Data Found</Text>
      </View>
    );
  };

  const onPressBottomItem = (id: number) => {
    // id
  };

  const state = 'done';
  const DATA = PRODUCT_DATA();

  const BOTTOM_FOOTER_OPTIONS = [
    {
      id: 1,
      title: strings.sort,
      onPress: () => displayModal(true),
    },
    {
      id: 2,
      title: strings.filter,
      onPress: () => displayModal(true),
    },
    {
      id: 3,
      title: strings.viewAs,
      onPress: () => displayModal(true),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent rightIcon1={true} onFirstIconPress={() => null} />

      <View style={styles.container}>
        {state == 'done' ? (
          <View style={styles.container}>
            <View style={styles.flex}>
              <FlatList
                contentContainerStyle={styles.columnWrapperStyle}
                showsVerticalScrollIndicator={false}
                data={DATA}
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => `products-${index.toString()}`}
                numColumns={2}
                renderItem={({item, index}) => (
                  <ProductCard
                    key={`products-card-${index.toString()}`}
                    item={item}
                    index={index}
                  />
                )}
                ListHeaderComponent={() => (
                  <>
                    <Text style={styles.categoryTextStyle}>
                      {toUpperCase(title)}
                    </Text>
                    <Text style={styles.productsCountText}>
                      {DATA.length} {strings.productsFound}
                    </Text>
                  </>
                )}
              />
            </View>
            {/*   Sort + Filters + View as CTA */}
            <View style={styles.bottomViewContainer}>
              <View style={styles.filterRowContainer}>
                {BOTTOM_FOOTER_OPTIONS.map((item: any, index: number) => {
                  return (
                    <BottomComponent
                      key={index}
                      id={item.id}
                      title={item.title}
                      onPress={(value: number) => onPressBottomItem(value)}
                      style={styles.filterTextView}
                    />
                  );
                })}
              </View>
            </View>
          </View>
        ) : false ? (
          noDataFound()
        ) : (
          <LoadingComponent />
        )}
      </View>
    </SafeAreaView>
  );
};

const BottomComponent = ({id, title, onPress, style}: any) => {
  return (
    <PressableComponent
      btnType={PRESSABLE_BTN_TYPE.TEXT}
      text={title}
      pressableStyle={style}
      textStyle={styles.filterTextStyle}
      colorConfig={{
        pressedBgColor: colors.hyperlinkPressed,
      }}
      onPress={() => onPress(id)}
    />
  );
};

export default observer(ProductList);
