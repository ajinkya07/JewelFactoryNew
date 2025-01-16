//import liraries
import React, {useEffect, useMemo, useState} from 'react';
import {View, Text, FlatList, SafeAreaView} from 'react-native';
import {styles} from './ProductList.styles';
import {observer} from 'mobx-react';
import {isDefined, showToast} from '../../../utils/helper';
import {colors} from '../../../utils/colors';
import LoadingComponent from '../../../components/LoadingComponent/LoadingComponent';
import PressableComponent, {
  PRESSABLE_ALIGN,
  PRESSABLE_BTN_TYPE,
} from '../../../components/PressableComponent/PressableComponent';
import ProductCard from './components/ProductCard/ProductCard';
import Modal from 'react-native-modal';
import {strings} from '../../../utils/strings';
import HeaderComponent from '../../../components/Header/HeaderComponent';
import RootStore from '../../../stores/RootStore';
import NoDataFoundComponent from '../../../components/NoDataFoundComponent/NoDataFoundComponent';
import IconPack from '../../../utils/IconPack';
import {useNavigation} from '@react-navigation/native';
import SortModal from './components/SortModal/SortModal';
import FilterModal from './components/FilterModal/FilterModal';
import ViewAsModal from './components/ViewAsModal/ViewAsModal';
import ProductCardTwo from './components/ProductCardTwo/ProductCardTwo';
import ProductCardThree from './components/ProductCardThree/ProductCardThree';
import ProductCardFour from './components/ProductCardFour/ProductCardFour';

const ProductList = (props: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [selectedSortById, setSortById] = useState('6');
  const [selectedPriceId, setSelectedPriceId] = useState('0');
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [productInventoryId, setProductInventoryId] = useState(false);
  const [isViewAsModalVisible, setViewAsModalVisible] = useState(false);
  const [selectedViewStyleId, setSelectedViewStyleId] = useState('1');

  const [netWeight, setNetWeight] = useState({
    minNetWeight: '',
    maxNetWeight: '',
  });
  const [grossWeight, setGrossWeight] = useState({
    minGrossWeight: '',
    maxGrossWeight: '',
  });

  const navigation = useNavigation();

  const userId = RootStore.appStore.userId;

  const {
    collectionId: id,
    modeType: type,
    gridData: categoryData,
    title,
    fromExclusive,
    collectionName,
    isFromSearch,
  } = props.route.params;

  const BOTTOM_FOOTER_OPTIONS = [
    {
      id: 1,
      title: strings.sort,
      onPress: () => displayModal(true),
      source: IconPack.SORT,
    },
    {
      id: 2,
      title: strings.filter,
      onPress: () => displayModal(true),
      source: IconPack.FILTER,
    },
    {
      id: 3,
      title: strings.viewAs,
      onPress: () => displayModal(true),
      source: IconPack.VIEW_AS,
    },
  ];

  useEffect(() => {
    getProducts();

    return () => {
      RootStore.productStore.resetFields();
    };
  }, []);

  useEffect(() => {
    if (RootStore.productStore.isProductUpdated) {
      getDataAfterProductUpdate();
    }
  }, [RootStore.productStore.isProductUpdated]);

  const getProducts = () => {
    if (isFromSearch && isDefined(categoryData)) {
      return true;
    } else if (
      isDefined(categoryData) &&
      !fromExclusive &&
      categoryData?.subcategory.length === 0
    ) {
      const params = new FormData();
      params.append('table', 'product_master');
      params.append('mode_type', 'normal');
      params.append('collection_id', categoryData.id);
      params.append('user_id', userId);
      params.append('record', 10);
      params.append('page_no', 0);
      params.append('sort_by', selectedSortById);

      RootStore.productStore.getProductListApi(params);
    } else if (isDefined(categoryData) && fromExclusive) {
      const params = new FormData();
      params.append('table', 'product_master');
      params.append('mode_type', 'my_collection');
      params.append('collection_id', 0);
      params.append('user_id', userId);
      params.append('record', 10);
      params.append('page_no', 0);
      params.append('sort_by', selectedSortById);
      params.append('my_collection_id', categoryData.id);

      RootStore.productStore.getProductListApi(params);
    }

    let params2 = new FormData();
    params2.append('collection_id', categoryData.id);
    params2.append('table', 'product_master');
    params2.append('user_id', userId);
    params2.append('mode_type', 'all_filter');

    RootStore.productStore.getSortByParameters();
    RootStore.productStore.getFilterByParameters(params2);
  };

  const displayModal = (show: boolean) => {
    setModalVisible(show);
  };

  const addToWishlist = (item: any) => {
    if (item.in_wishlist > 0) {
      showToast({title: strings.alreadyAddedToWishlist});
      return;
    }
    let wishlistData = new FormData();

    wishlistData.append('product_id', item.product_inventory_id);
    wishlistData.append('user_id', userId);
    wishlistData.append('cart_wish_table', 'wishlist');
    wishlistData.append('no_quantity', 1);
    wishlistData.append('product_inventory_table', 'product_master');

    RootStore.productStore.addProductToWishlist(wishlistData);
  };

  const addToCart = (item: any) => {
    let cartData = new FormData();

    cartData.append('product_id', item.product_inventory_id);
    cartData.append('user_id', userId);
    cartData.append('cart_wish_table', 'cart');
    cartData.append('no_quantity', 1);
    cartData.append('product_inventory_table', 'product_master');

    RootStore.productStore.addProductToCart(cartData);

    // const countData = new FormData();
    // countData.append('user_id', userId);
    // countData.append('table', 'cart');

    // await  RootStore.productStore.getTotalCartCount(countData);

    setProductInventoryId(item.product_inventory_id);
  };

  const addRemoveByPlusOne = (item: any, isAddToCart: boolean) => {
    let cart = new FormData();

    cart.append('product_id', item.product_inventory_id);
    cart.append('user_id', userId);
    cart.append('cart_wish_table', 'cart');
    cart.append('no_quantity', 1);
    cart.append('product_inventory_table', 'product_master');
    cart.append('plus', isAddToCart ? 1 : 0);

    RootStore.productStore.addRemoveProductToCartByOne(cart);

    // if (item.quantity == 1&&!isAddToCart) {
    //   const countData1 = new FormData();
    //   countData1.append('user_id', userId);
    //   countData1.append('table', 'cart');

    //   await RootStore.productStore.getTotalCartCount(countData1);
    // }

    setProductInventoryId(item.product_inventory_id);
  };

  const getDataAfterProductUpdate = () => {
    if (!fromExclusive) {
      const params = new FormData();
      params.append('table', 'product_master');
      params.append('mode_type', 'normal');
      params.append('collection_id', categoryData.id);
      params.append('user_id', userId);
      params.append('record', 10);
      params.append('page_no', 0);
      params.append('sort_by', selectedSortById);
      params.append('min_gross_weight', grossWeight.minGrossWeight);
      params.append('max_gross_weight', grossWeight.maxGrossWeight);
      params.append('min_net_weight', netWeight.minNetWeight);
      params.append('max_net_weight', netWeight.maxNetWeight);

      RootStore.productStore.getProductListApi(params);
    }
    if (categoryData && fromExclusive) {
      const params = new FormData();
      params.append('table', 'product_master');
      params.append('mode_type', 'my_collection');
      params.append('collection_id', 0);
      params.append('user_id', userId);
      params.append('record', 10);
      params.append('page_no', 0);
      params.append('sort_by', selectedSortById);
      params.append('my_collection_id', categoryData.id);

      RootStore.productStore.getProductListApi(params);
    }
  };

  const onPressBottomItem = (id: number) => {
    switch (id) {
      case 1:
        setSortModalVisible(true);
        break;
      case 2:
        setFilterModalVisible(true);
        setFilterData();

        break;
      case 3:
        setViewAsModalVisible(true);
        break;
      default:
        RootStore.appStore.setFields('isComingSoonVisible', true);
        break;
    }
  };

  const resetGrossWt = () => {
    const grossWeightData =
      RootStore.productStore.filterByParamsData?.gross_weight;

    RootStore.productStore.setFields(
      'minGrossWeight',
      grossWeightData[0].min_gross_weight,
    );
    RootStore.productStore.setFields(
      'maxGrossWeight',
      grossWeightData[0].max_gross_weight,
    );
  };

  const resetNetWt = () => {
    const netWeightData = RootStore.productStore.filterByParamsData?.net_weight;

    RootStore.productStore.setFields(
      'minNetWeight',
      netWeightData[0].min_net_weight,
    );
    RootStore.productStore.setFields(
      'maxNetWeight',
      netWeightData[0].max_net_weight,
    );
  };

  const setFilterData = () => {
    if (RootStore.productStore.minGrossWeight == '') {
      resetGrossWt();
    }

    if (RootStore.productStore.minNetWeight == '') {
      resetNetWt();
    }
  };

  const onPressReset = () => {
    resetGrossWt();
    resetNetWt();
  };

  const applySortBy = () => {
    const isFromfilter = false;
    if (isFromfilter) {
      const params = new FormData();
      params.append('table', 'product_master');
      params.append('mode_type', 'filter_data');
      params.append('collection_id', categoryData.id);
      params.append('user_id', isDefined(userId) ? userId : '');
      params.append('record', 10);
      params.append('page_no', 0);
      params.append('sort_by', selectedSortById);
      params.append('min_gross_weight', RootStore.productStore.minGrossWeight);
      params.append('max_gross_weight', RootStore.productStore.maxGrossWeight);
      params.append('min_net_weight', RootStore.productStore.minNetWeight);
      params.append('max_net_weight', RootStore.productStore.maxNetWeight);

      RootStore.productStore.applyFilterProducts(params);
    } else if (!isFromfilter) {
      const data = new FormData();
      data.append('table', 'product_master');
      data.append('mode_type', 'normal');
      data.append('collection_id', categoryData.id);
      data.append('user_id', userId);
      data.append('record', 10);
      data.append('page_no', 0);
      data.append('sort_by', selectedSortById);

      RootStore.productStore.getProductListApi(data);
    }
  };

  // Apply filter
  const applyFilter = async () => {
    const params = new FormData();
    params.append('collection_id', categoryData.id);
    params.append('table', 'product_master');
    params.append('user_id', isDefined(userId) ? userId : '');
    params.append('mode_type', 'filter_data');
    params.append('record', 10);
    params.append('sort_by', selectedSortById);
    params.append('page_no', 0);
    params.append('min_gross_weight', RootStore.productStore.minGrossWeight);
    params.append('max_gross_weight', RootStore.productStore.maxGrossWeight);
    params.append('min_net_weight', RootStore.productStore.minNetWeight);
    params.append('max_net_weight', RootStore.productStore.maxNetWeight);
    params.append('min_price', RootStore.productStore.minPrice);
    params.append('max_price', RootStore.productStore.maxPrice);
    params.append('price_type', selectedPriceId);

    RootStore.productStore.getProductListApi(params);
  };

  const onPressProduct = (item: any) => {
    console.log('item.collection_id', item.collection_id);

    // @ts-ignore
    navigation.navigate('ProductDetails', {
      collectionId: item.collection_id,
      productId: item.product_inventory_id,
      productItem: item,
    });
  };

  const data = isFromSearch
    ? categoryData
    : RootStore.productStore.productListData;
  const sortByData = RootStore.productStore.sortByParamsData;

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent />

      <View style={styles.container}>
        {RootStore.productStore.isProductListApiLoading ? (
          <LoadingComponent />
        ) : RootStore.productStore.productListData.length > 0 ? (
          <View style={styles.container}>
            <View style={styles.flex}>
              <FlatList
                key={
                  selectedViewStyleId == '2'
                    ? '&'
                    : selectedViewStyleId == '3'
                    ? '_'
                    : selectedViewStyleId == '4'
                    ? '@'
                    : '#'
                }
                extraData={selectedViewStyleId}
                contentContainerStyle={styles.columnWrapperStyle}
                showsVerticalScrollIndicator={false}
                data={data}
                horizontal={selectedViewStyleId == '3'}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) =>
                  selectedViewStyleId == '2'
                    ? `products-view-two${index}`
                    : selectedViewStyleId == '3'
                    ? `products-view-three${index}`
                    : selectedViewStyleId == '4'
                    ? `products-view-four${index}`
                    : `products-${index}`
                }
                numColumns={
                  selectedViewStyleId == '2' ||
                  selectedViewStyleId == '3' ||
                  selectedViewStyleId == '4'
                    ? 0
                    : 2
                }
                renderItem={({item, index}) =>
                  selectedViewStyleId == '1' ? (
                    <ProductCard
                      key={`product-card-${index}`}
                      item={item}
                      addToWishlist={addToWishlist}
                      addToCart={addToCart}
                      addRemoveByPlusOne={addRemoveByPlusOne}
                      onPress={(item: any) => onPressProduct(item)}
                    />
                  ) : selectedViewStyleId == '2' ? (
                    <ProductCardTwo
                      key={`product-card-two-${index}`}
                      item={item}
                      addToWishlist={addToWishlist}
                      addToCart={addToCart}
                      addRemoveByPlusOne={addRemoveByPlusOne}
                      onPress={(item: any) => onPressProduct(item)}
                    />
                  ) : selectedViewStyleId == '3' ? (
                    <ProductCardThree
                      key={`product-card-three-${index}`}
                      item={item}
                      addToWishlist={addToWishlist}
                      addToCart={addToCart}
                      addRemoveByPlusOne={addRemoveByPlusOne}
                      onPress={(item: any) => onPressProduct(item)}
                    />
                  ) : selectedViewStyleId == '4' ? (
                    <ProductCardFour
                      key={`product-card-four-${index}`}
                      item={item}
                      addToWishlist={addToWishlist}
                      addToCart={addToCart}
                      addRemoveByPlusOne={addRemoveByPlusOne}
                      onPress={(item: any) => onPressProduct(item)}
                    />
                  ) : (
                    <></>
                  )
                }
                ListHeaderComponent={() =>
                  selectedViewStyleId !== '3' && (
                    <>
                      <Text style={styles.categoryTextStyle}>
                        {title || ''}
                      </Text>
                      {data.length > 0 && (
                        <Text style={styles.productsCountText}>
                          {data.length} {strings.productsFound}
                        </Text>
                      )}
                    </>
                  )
                }
              />
            </View>
          </View>
        ) : RootStore.productStore.productListData.length === 0 ? (
          <NoDataFoundComponent />
        ) : (
          <></>
        )}

        {/*   Sort + Filters + View as CTA */}
        {!RootStore.productStore.isProductListApiLoading && !isFromSearch && (
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
                    source={styles.imageSource}
                    imageStyle={styles.filterImageStyle}
                  />
                );
              })}
            </View>
          </View>
        )}
      </View>
      {sortModalVisible && (
        <SortModal
          isModalVisible={sortModalVisible}
          setModalVisible={() => setSortModalVisible(false)}
          data={sortByData}
          sortById={selectedSortById}
          setSortById={(id: string) => setSortById(id)}
          applySort={() => applySortBy()}
        />
      )}
      {isFilterModalVisible && (
        <FilterModal
          isModalVisible={isFilterModalVisible}
          setModalVisible={() => setFilterModalVisible(false)}
          applyFilter={() => applyFilter()}
          onPressReset={() => onPressReset()}
        />
      )}
      {isViewAsModalVisible && (
        <ViewAsModal
          isModalVisible={isViewAsModalVisible}
          setModalVisible={() => setViewAsModalVisible(false)}
          setSelectedViewStyleId={(value: string) => {
            setSelectedViewStyleId(value);
            setViewAsModalVisible(false);
          }}
        />
      )}
    </SafeAreaView>
  );
};

const BottomComponent = ({
  id,
  title,
  onPress,
  style,
  source,
  imageStyle,
}: any) => {
  const getSource = useMemo(() => {
    return id == 1
      ? IconPack.SORT
      : id == 2
      ? IconPack.FILTER
      : id == 3
      ? IconPack.VIEW_AS
      : '';
  }, []);

  return (
    <PressableComponent
      btnType={PRESSABLE_BTN_TYPE.TEXT}
      align={PRESSABLE_ALIGN.LEFT}
      text={title}
      pressableStyle={style}
      textStyle={styles.filterTextStyle}
      colorConfig={{
        pressedBgColor: colors.pressedColorOpacity,
      }}
      imageConfig={{
        imageSource: getSource,
        imageStyle: imageStyle,
      }}
      onPress={() => onPress(id)}
    />
  );
};

export default observer(ProductList);
