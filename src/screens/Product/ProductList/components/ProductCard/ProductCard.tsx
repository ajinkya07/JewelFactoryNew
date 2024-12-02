import React, {Component} from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import IconPack from '../../../../../utils/IconPack';
import {styles} from './ProductCard.styles';
import {Observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import {urls} from '../../../../../network/urls';
import {constatnts} from '../../../../../utils/constants';
import {colors} from '../../../../../utils/colors';

const ProductCard = ({
  item,
  addToWishlist,
  addToCart,
  removeProductFromCartByOne,
  addProductToCartPlusOne,
}: any) => {
  const navigation = useNavigation();

  const onPress = () => {
    // @ts-ignore
    navigation.navigate('ProductDetails', {
      collectionId: item.collection_id,
      productId: item.product_inventory_id,
    });
  };

  const KEYS = item.key;
  const VALUES = item.value;

  console.log('item', item);

  return (
    <Observer>
      {() => (
        <Pressable
          key={`card-${item.id}`}
          style={styles.imageContainer}
          onPress={() => onPress()}>
          <Image
            style={styles.imageStyle}
            source={
              item.image_name != ''
                ? {uri: constatnts.THUMB_URL + item.image_name}
                : IconPack.APP_LOGO
            }
          />

          <View style={styles.productInfo}>
            <View style={styles.flexRow2}>
              <View>
                {KEYS.map((key: any, index: number) => {
                  return (
                    <Text key={`key-${index}`} style={styles.infoTitle}>
                      {key.replace('_', ' ')}
                    </Text>
                  );
                })}
              </View>
              <View>
                {VALUES.map((value: any, index: number) => {
                  return (
                    <Text
                      key={`value-${index}`}
                      style={[
                        styles.infoTitle,
                        {
                          textAlign: 'right',
                          color:
                            value?.toLowerCase() == 'on order'
                              ? colors.darkBlue
                              : value?.toLowerCase() == 'ready'
                              ? colors.success
                              : colors.black,
                        },
                      ]}>
                      {value.replace('_', ' ')}
                    </Text>
                  );
                })}
              </View>
            </View>
          </View>

          <View style={styles.wishlistCartContiner}>
            {item.quantity == 0 && (
              <>
                {item.in_wishlist == 0 ? (
                  <Pressable
                    hitSlop={styles.hitSlop10}
                    style={styles.wishlistView}
                    onPress={() => addToWishlist(item)}>
                    <Image
                      source={IconPack.WISHLIST}
                      style={styles.wishlistIcon}
                    />
                  </Pressable>
                ) : (
                  <Pressable disabled={true} style={styles.wishlistView}>
                    <Image
                      source={IconPack.WISHLIST}
                      style={styles.wishlistIcon}
                    />
                  </Pressable>
                )}
                {item.in_cart == 0 ? (
                  <Pressable
                    hitSlop={styles.hitSlop10}
                    style={styles.wishlistView}
                    onPress={() => addToCart(item)}>
                    <Image source={IconPack.CART} style={styles.wishlistIcon} />
                  </Pressable>
                ) : (
                  <Pressable disabled={true} style={styles.wishlistView}>
                    <Image source={IconPack.CART} style={styles.wishlistIcon} />
                  </Pressable>
                )}
              </>
            )}

            {item.quantity > 0 && (
              <View style={styles.wishlistCartContiner}>
                <Pressable
                  hitSlop={styles.hitSlop10}
                  style={styles.wishlistView}
                  onPress={() => removeProductFromCartByOne(item)}>
                  <Image source={IconPack.MINUS} style={styles.wishlistIcon} />
                </Pressable>

                <Text numberOfLines={1} style={styles.quantityText}>
                  {item.quantity >= 1 ? item.quantity : item.in_cart}
                </Text>

                <Pressable
                  hitSlop={styles.hitSlop10}
                  style={styles.wishlistView}
                  onPress={() => addProductToCartPlusOne(item)}>
                  <Image source={IconPack.PLUS} style={styles.wishlistIcon} />
                </Pressable>
              </View>
            )}
          </View>
        </Pressable>
      )}
    </Observer>
  );
};

export default ProductCard;
