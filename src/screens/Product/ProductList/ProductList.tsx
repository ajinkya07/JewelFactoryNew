//import liraries
import React, {Component, useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';
import {styles} from './ProductList.styles';
import {observer} from 'mobx-react';
import {isDefined, toUpperCase} from '../../../utils/helper';
import {colors} from '../../../utils/colors';
import LoadingComponent from '../../../components/LoadingComponent/LoadingComponent';
import PressableComponent, {
  PRESSABLE_ALIGN,
  PRESSABLE_ALIGN_CONFIG,
  PRESSABLE_BTN_TYPE,
} from '../../../components/PressableComponent/PressableComponent';
import ProductCard from './components/ProductCard/ProductCard';
import Modal from 'react-native-modal';
import {PRODUCT_DATA} from './productsData';
import {strings} from '../../../utils/strings';
import HeaderComponent from '../../../components/Header/HeaderComponent';
import RootStore from '../../../stores/RootStore';
import NoDataFoundComponent from '../../../components/NoDataFoundComponent/NoDataFoundComponent';
import IconPack from '../../../utils/IconPack';

const ProductList = (props: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [selectedPriceIndex, setSelectedPrice] = useState(0);
  const [selectedPriceId, setSelectedPriceId] = useState('0');
  const [selectedSortById, setSortById] = useState('6');

  const [isFilterModalVisible, setFilterModalVisible] = useState(false);

  const [isImageNotFound, setNoImageFound] = useState(false);
  const [productInventoryId, setProductInventoryId] = useState(false);
  const userId = global.userId;

  const {
    collectionId: id,
    modeType: type,
    gridData: categoryData,
    title,
    fromExclusive,
    collectionName,
  } = props.route.params;

  console.log('categoryData', categoryData);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    if (
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
      const exclParams = new FormData();
      exclParams.append('table', 'product_master');
      exclParams.append('mode_type', 'my_collection');
      exclParams.append('collection_id', 0);
      exclParams.append('user_id', userId);
      exclParams.append('record', 10);
      exclParams.append('page_no', 0);
      exclParams.append('sort_by', selectedSortById);
      exclParams.append('my_collection_id', categoryData.id);

      // RootStore.productStore.getProductListApi(exclParams);
    }

    let params2 = new FormData();
    params2.append('collection_id', categoryData.id);
    params2.append('table', 'product_master');
    params2.append('user_id', userId);
    params2.append('mode_type', 'all_filter');

    // RootStore.productStore.getSortByParameters();
    // RootStore.productStore.getfilterParameters(params2);
  };

  const displayModal = (show: boolean) => {
    setModalVisible(show);
  };
  const displaySortModal = (show: boolean) => {
    setSortModalVisible(show);
  };

  const addToWishlist = (item: any) => {
    let wishlistData = new FormData();

    wishlistData.append('product_id', item.product_inventory_id);
    wishlistData.append('user_id', userId);
    wishlistData.append('cart_wish_table', 'wishlist');
    wishlistData.append('no_quantity', 1);
    wishlistData.append('product_inventory_table', 'product_master');

    RootStore.productStore.addProductToWishlist(wishlistData);
  };

  const addToCart = async (item: any) => {
    const {categoryData, page, selectedSortById} = this.state;

    let cartData = new FormData();

    cartData.append('product_id', item.product_inventory_id);
    cartData.append('user_id', userId);
    cartData.append('cart_wish_table', 'cart');
    cartData.append('no_quantity', 1);
    cartData.append('product_inventory_table', 'product_master');

    await RootStore.productStore.addProductToCart(cartData);

    // const countData = new FormData();
    // countData.append('user_id', userId);
    // countData.append('table', 'cart');

    // await  RootStore.productStore.getTotalCartCount(countData);

    setProductInventoryId(item.product_inventory_id);
  };

  const addProductToCartPlusOne = async (item: any) => {
    let cart = new FormData();

    cart.append('product_id', item.product_inventory_id);
    cart.append('user_id', userId);
    cart.append('cart_wish_table', 'cart');
    cart.append('no_quantity', 1);
    cart.append('product_inventory_table', 'product_master');
    cart.append('plus', 1);

    RootStore.productStore.addRemoveProductFromCartByOne(cart);

    setProductInventoryId(item.product_inventory_id);
  };

  const removeProductFromCartByOne = async (item: any) => {
    let cart1 = new FormData();

    cart1.append('product_id', item.product_inventory_id);
    cart1.append('user_id', userId);
    cart1.append('cart_wish_table', 'cart');
    cart1.append('no_quantity', 1);
    cart1.append('product_inventory_table', 'product_master');
    cart1.append('plus', 0);

    await RootStore.productStore.addRemoveProductFromCartByOne(cart1);

    if (item.quantity == 1) {
      const countData1 = new FormData();
      countData1.append('user_id', userId);
      countData1.append('table', 'cart');

      await RootStore.productStore.getTotalCartCount(countData1);
    }

    setProductInventoryId(item.product_inventory_id);
  };

  const onPressBottomItem = (id: number) => {
    // id
  };

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

  const data = RootStore.productStore.productListData;
  console.log('data', data);
  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent rightIcon1={true} onFirstIconPress={() => null} />

      <View style={styles.container}>
        {RootStore.productStore.isProductListApiLoading ? (
          <LoadingComponent />
        ) : RootStore.productStore.productListData.length > 0 ? (
          <View style={styles.container}>
            <View style={styles.flex}>
              <FlatList
                contentContainerStyle={styles.columnWrapperStyle}
                showsVerticalScrollIndicator={false}
                data={data}
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => `products-${index.toString()}`}
                numColumns={2}
                renderItem={({item, index}) => (
                  <ProductCard
                    key={`products-card-${index.toString()}`}
                    item={item}
                    index={index}
                    addToWishlist={addToWishlist}
                    addToCart={addToCart}
                    removeProductFromCartByOne={removeProductFromCartByOne}
                    addProductToCartPlusOne={addProductToCartPlusOne}
                  />
                )}
                ListHeaderComponent={() => (
                  <>
                    <Text style={styles.categoryTextStyle}>{title || ''}</Text>
                    {data.length > 0 && (
                      <Text style={styles.productsCountText}>
                        {data.length} {strings.productsFound}
                      </Text>
                    )}
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
                      source={styles.imageSource}
                      imageStyle={styles.filterImageStyle}
                    />
                  );
                })}
              </View>
            </View>
          </View>
        ) : RootStore.productStore.productListData.length === 0 ? (
          <NoDataFoundComponent />
        ) : (
          <></>
        )}
      </View>
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
        pressedBgColor: colors.hyperlinkPressed,
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
