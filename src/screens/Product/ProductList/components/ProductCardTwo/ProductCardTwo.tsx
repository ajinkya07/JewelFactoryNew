import React from 'react';
import {View, Text, Pressable, Image} from 'react-native';
import IconPack from '../../../../../utils/IconPack';
import {styles} from './ProductCardTwo.styles';
import {Observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import {constants} from '../../../../../utils/constants';
import {colors} from '../../../../../utils/colors';

const ProductCardTwo = ({
  item,
  addToWishlist,
  addToCart,
  addRemoveByPlusOne,
  onPress,
}: any) => {
  const KEYS = item.key;
  const VALUES = item.value;

  return (
    <Observer>
      {() => (
        <View
          key={`card-two${item.collection_sku_code}`}
          style={styles.imageContainer}>
          <Pressable onPress={() => onPress(item)}>
            <Image
              style={styles.imageStyle}
              source={
                item.image_name != ''
                  ? {uri: constants.ZOOM_URL + item.image_name}
                  : IconPack.APP_LOGO
              }
              resizeMode="contain"
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
                        {String(value)?.replace('_', ' ')}
                      </Text>
                    );
                  })}
                </View>
              </View>
            </View>
          </Pressable>

          <View style={styles.wishlistCartContiner}>
            {item.quantity == 0 && (
              <>
                {item.in_wishlist == 0 ? (
                  <Pressable
                    hitSlop={styles.hitSlop10}
                    style={styles.wishlistView}
                    onPress={() => addToWishlist(item)}>
                    <Image
                      source={IconPack.WISHLIST_EMPTY}
                      style={styles.wishlistIcon}
                    />
                  </Pressable>
                ) : (
                  <Pressable
                    onPress={() => addToWishlist(item)}
                    style={styles.wishlistView}>
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
                  onPress={() => addRemoveByPlusOne(item, false)}>
                  <Image source={IconPack.MINUS} style={styles.wishlistIcon} />
                </Pressable>

                <Text numberOfLines={1} style={styles.quantityText}>
                  {item.quantity >= 1 ? item.quantity : item.in_cart}
                </Text>

                <Pressable
                  hitSlop={styles.hitSlop10}
                  style={styles.wishlistView}
                  onPress={() => addRemoveByPlusOne(item, true)}>
                  <Image source={IconPack.PLUS} style={styles.wishlistIcon} />
                </Pressable>
              </View>
            )}
          </View>
        </View>
      )}
    </Observer>
  );
};

export default ProductCardTwo;
