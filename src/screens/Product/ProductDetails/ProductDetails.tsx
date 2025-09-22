import React, {useState, useEffect, useRef, useMemo} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Pressable,
  Platform,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import ImageViewer from 'react-native-image-zoom-viewer';
import HeaderComponent from '../../../components/Header/HeaderComponent';
import LinearGradient from 'react-native-linear-gradient';
import IconPack from '../../../utils/IconPack';
import {styles} from './ProductDetails.styles';
import {strings} from '../../../utils/strings';
import PressableComponent, {
  PRESSABLE_BTN_TYPE,
} from '../../../components/PressableComponent/PressableComponent';
import RootStore from '../../../stores/RootStore';
import {colors} from '../../../utils/colors';
import {observer} from 'mobx-react';
import LoadingComponent from '../../../components/LoadingComponent/LoadingComponent';
import {urls} from '../../../network/urls';
import {isDefined} from '../../../utils/helper';
import InputComponent from '../../../components/InputComponent/InputComponent';
import Divider from '../../../components/Divider';
import Modal from 'react-native-modal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const {width} = Dimensions.get('window');
const platform = Platform.OS === 'ios' ? 'ios' : 'android';

const ProductDetails = observer((props: any) => {
  const carouselRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [remarks, setRemarks] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [customInputs, setCustomInputs] = useState({
    length: '',
    weight: '',
    size: '',
  });

  const insets = useSafeAreaInsets();
  const userId = RootStore.appStore.userId;
  const productItem = props.route.params?.productItem || {};
  const fromHome = props.route.params?.fromHome || false;
  const fromScanQRCode = props.route.params?.fromScanQRCode || false;

  const data = RootStore.productStore.productDetailsData as any;

  // Product Images
  // const productImages = [
  //   {
  //     url: 'https://images.pexels.com/photos/3756353/pexels-photo-3756353.jpeg?auto=compress&cs=tinysrgb&w=800',
  //   },
  //   {
  //     url: 'https://images.pexels.com/photos/29816652/pexels-photo-29816652/free-photo-of-elegant-gold-ring-in-velvet-box-with-roses.jpeg?auto=compress&cs=tinysrgb&w=800',
  //   },
  //   {
  //     url: 'https://images.pexels.com/photos/3756353/pexels-photo-3756353.jpeg?auto=compress&cs=tinysrgb&w=800',
  //   },
  //   {
  //     url: 'https://images.pexels.com/photos/811047/pexels-photo-811047.jpeg?auto=compress&cs=tinysrgb&w=800',
  //   },
  // ];

  useEffect(() => {
    callApi();
  }, []);

  const callApi = () => {
    if (fromHome) {
      const params = new FormData();
      params.append('table', 'product_master');
      params.append('mode_type', 'home_products');
      params.append('collection_id', 0);
      params.append('user_id', userId);
      params.append('product_id', productItem.product_id);

      RootStore.productStore.productDetailsApi(params);
    } else {
      const params = new FormData();
      params.append('table', 'product_master');
      params.append('mode_type', 'normal');
      params.append('collection_id', productItem.collection_id);
      params.append('user_id', userId);
      params.append(
        'product_id',
        fromScanQRCode
          ? productItem.product_id
          : productItem.product_inventory_id,
      );

      RootStore.productStore.productDetailsApi(params);
    }
  };

  const openZoom = (index: number) => {
    setCurrentIndex(index);
    setModalVisible(true);
  };

  const renderCarouselItem = ({item, index}: any) => {
    let url = RootStore.homeStore.allParameterData?.base_url + data.zoom_image;

    return (
      <TouchableOpacity onPress={() => openZoom(index)}>
        <Image source={{uri: url + item}} style={styles.image} />
      </TouchableOpacity>
    );
  };

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const onPressAddToCart = () => {
    const {length, size, weight} = customInputs;
    const data = RootStore.productStore.productDetailsData as any;

    let addCartData = new FormData();
    let adData = JSON.stringify([
      {
        user_id: userId,
        table: 'cart',
        product_id: data.product_master_id,
        product_inventory_table: 'product_master',
        melting_id: '',
        no_quantity: quantity,
        device_type: platform,
        remarks: remarks,
        size: size,
        weight: weight,
        length: length,
        approx_weight: weight,
      },
    ]);

    addCartData.append('Add_To_Cart', adData);
    RootStore.productStore.addToCartFromDetailsApi(addCartData, true);
  };

  const onPressAddToWishList = () => {
    const {length, size, weight} = customInputs;
    const data = RootStore.productStore.productDetailsData as any;

    const params = new FormData();
    let wshData = JSON.stringify([
      {
        user_id: userId,
        table: 'wishlist',
        product_id: data.product_master_id,
        product_inventory_table: 'product_master',
        melting_id: '',
        no_quantity: quantity,
        device_type: platform,
        remarks: remarks,
        weight: weight,
        length: length,
        size: size,
        approx_weight: weight,
      },
    ]);
    params.append('Add_To_Cart', wshData);
    RootStore.productStore.addToCartFromDetailsApi(params, false);
  };

  const onChangeText = (key: string, value: string) => {
    setCustomInputs({
      ...customInputs,
      [key]: value,
    });
  };

  const getProductZoomImages = useMemo(() => {
    let baseUrl =
      RootStore.homeStore.allParameterData?.base_url +
      (data !== null && data.zoom_image);
    const images = data?.image_name || [];
    let arr = [];
    for (let i = 0; i < images.length; i++) {
      arr.push({
        url: baseUrl + images[i],
      });
    }
    console.log('arr', arr);

    return arr;
  }, [data]);

  const productImages = data?.image_name || [];

  return (
    <>
      <SafeAreaView style={styles.flex}>
        <HeaderComponent rightIcon3={true} />
        {RootStore.productStore.isProductDetailsApiLoading ? (
          <LoadingComponent />
        ) : (
          <>
            <ScrollView
              style={styles.container}
              showsVerticalScrollIndicator={false}>
              {/* Image Carousel */}
              <View style={styles.carouselView}>
                <Carousel
                  ref={carouselRef}
                  data={productImages}
                  renderItem={(item: any) => renderCarouselItem(item)}
                  sliderWidth={width}
                  itemWidth={width}
                  onSnapToItem={index => setCurrentIndex(index)}
                />
              </View>

              <View style={styles.pagination}>
                {productImages.length > 1 &&
                  productImages.map((_, i) => (
                    <View
                      key={i}
                      style={[
                        styles.dot,
                        i === currentIndex
                          ? styles.activeDot
                          : styles.inactiveDot,
                      ]}
                    />
                  ))}
              </View>
              <View style={styles.contentView}>
                <Text style={styles.categoryName}>{data?.product_name}</Text>

                <View style={styles.quantityContainer}>
                  {/* <Text style={styles.quantityLabel}>QUANTITY</Text> */}
                  <View style={styles.quantityBox}>
                    <TouchableOpacity
                      disabled={quantity === 1}
                      onPress={handleDecrement}
                      style={styles.quantityButton}>
                      <LinearGradient
                        colors={[colors.brandColor, colors.primaryGray]}
                        start={{x: 0.1, y: 0}}
                        end={{x: 1, y: 1}}
                        style={styles.quantityView}>
                        <Text style={styles.quantityNo}>-</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                    <Text style={styles.quantityValue}>{quantity}</Text>
                    <TouchableOpacity
                      onPress={handleIncrement}
                      style={styles.quantityButton}>
                      <LinearGradient
                        colors={[colors.brandColor, colors.primaryGray]}
                        start={{x: 0.1, y: 0}}
                        end={{x: 1, y: 1}}
                        style={styles.quantityView}>
                        <Text style={styles.quantityNo}>+</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.wishListIconView}>
                    <View style={styles.flexRow}>
                      {data?.in_wishlist > 0 && (
                        <Image
                          source={IconPack.WISHLIST}
                          style={styles.wishListIcon}
                        />
                      )}
                      {data?.in_cart > 0 && (
                        <Image
                          source={IconPack.CART}
                          style={styles.wishListIcon}
                        />
                      )}
                    </View>
                  </View>
                </View>
                <View style={styles.remarkContainerView}>
                  <TextInput
                    style={styles.remarksInput}
                    placeholder="Enter Detail"
                    value={remarks}
                    onChangeText={text => setRemarks(text)}
                  />
                  <LinearGradient
                    colors={[colors.brandColor, colors.primaryGray]}
                    start={{x: 0.1, y: 0}}
                    end={{x: 1, y: 1}}
                    style={styles.gradient}>
                    <Text style={styles.text}>{strings.remark}</Text>
                  </LinearGradient>
                </View>
                <View style={styles.descriptionContainer}>
                  <Text style={styles.descriptionTitle}>
                    {strings.productDesc}
                  </Text>

                  <View style={styles.descriptionSubContainer}>
                    <View>
                      {isDefined(data?.key_label) &&
                        data?.key_label.map((key: string, i: number) => {
                          return (
                            <Text key={`key-${i}`} style={styles.detailLabel}>
                              {key.replace('_', ' ')}
                            </Text>
                          );
                        })}
                    </View>

                    <View>
                      {isDefined(data?.key_value) &&
                        data?.key_value.map((value: string, j: number) => {
                          return (
                            <Text key={`value-${j}`} style={styles.detailValue}>
                              {value ? value : '-'}
                            </Text>
                          );
                        })}
                    </View>
                  </View>
                </View>

                <Divider />

                <View style={styles.descriptionContainer}>
                  <Text style={styles.descriptionTitle}>
                    {strings.customizableDetails}
                  </Text>
                  <InputComponent
                    placeholder="Approx. weight (gm)"
                    value={customInputs.weight}
                    onChangeText={(value: string) =>
                      onChangeText('weight', value)
                    }
                    keyboardType="numeric"
                    returnKeyType="done"
                    style={styles.customInput}
                  />

                  <InputComponent
                    placeholder="Length (Inches)"
                    value={customInputs.length}
                    onChangeText={(value: string) =>
                      onChangeText('length', value)
                    }
                    keyboardType="numeric"
                    returnKeyType="done"
                    style={styles.customInput}
                  />

                  <InputComponent
                    placeholder="Size (Inches)"
                    value={customInputs.size}
                    onChangeText={(value: string) =>
                      onChangeText('size', value)
                    }
                    keyboardType="numeric"
                    returnKeyType="done"
                    style={styles.customInput}
                  />
                </View>
              </View>
            </ScrollView>
            <View style={styles.addToCartBtnContainer}>
              <PressableComponent
                btnType={PRESSABLE_BTN_TYPE.PRIMARY}
                text={strings.addToWishlist}
                containerStyle={styles.btn}
                pressableStyle={styles.btn}
                onPress={onPressAddToWishList}
                isLoading={
                  RootStore.productStore.isAddToWishlistFromDetailsLoading
                }
              />
              <PressableComponent
                btnType={PRESSABLE_BTN_TYPE.PRIMARY}
                text={strings.addToCart}
                containerStyle={styles.btn}
                pressableStyle={styles.btn}
                onPress={onPressAddToCart}
                isLoading={RootStore.productStore.isAddToCartFromDetailsLoading}
              />
            </View>
          </>
        )}
      </SafeAreaView>
      <Modal
        isVisible={modalVisible}
        style={{marginHorizontal: 0, marginBottom: 0, marginTop: insets?.top}}>
        <ImageViewer
          imageUrls={getProductZoomImages}
          index={currentIndex}
          enableSwipeDown
          onSwipeDown={() => setModalVisible(false)}
          renderHeader={() => (
            <HeaderComponent
              rightIcon1={false}
              onPress={() => setModalVisible(false)}
              // renderChildText={`${currentIndex + 1}/${productImages?.length}`}
            />
          )}
          backgroundColor={colors.white}
        />
      </Modal>
    </>
  );
});

export default ProductDetails;
