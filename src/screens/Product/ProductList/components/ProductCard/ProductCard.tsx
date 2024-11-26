import React, {Component} from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import IconPack from '../../../../../utils/IconPack';
import {styles} from './ProductCard.styles';
import {Observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';

const ProductCard = ({item}: any) => {
  const navigation = useNavigation();

  const addToWishlist = (item: any) => {};
  const addToCart = (item: any) => {};

  const KEYS = ['Weight', 'Status', 'Price', 'Nt. Wt'];
  const VALUES = ['10', 'Available', '3000', '40'];

  return (
    <Observer>
      {() => (
        <Pressable
          key={`card-${item.id}`}
          style={styles.imageContainer}
          onPress={() => {
            // @ts-ignore
            navigation.navigate('ProductDetails', {
              collectionId: item.collection_id,
              productId: item.product_inventory_id,
            });
          }}>
          <Image style={styles.imageStyle} source={item.source} />

          <View style={styles.productInfo}>
            <View style={styles.flexRow2}>
              <View>
                {KEYS.map((item, index) => {
                  return (
                    <Text key={index} style={styles.infoTitle}>
                      {item}
                    </Text>
                  );
                })}
              </View>
              <View>
                {VALUES.map((item, index) => {
                  return (
                    <Text
                      key={index}
                      style={[styles.infoTitle, {textAlign: 'right'}]}>
                      {item}
                    </Text>
                  );
                })}
              </View>
            </View>
          </View>

          <View style={styles.wishlistCartContiner}>
            {item.in_wishlist == 0 ? (
              <Pressable
                hitSlop={styles.hitSlop10}
                style={styles.wishlistView}
                onPress={() => addToWishlist(item)}>
                <Image source={IconPack.WISHLIST} style={styles.wishlistIcon} />
              </Pressable>
            ) : (
              <Pressable disabled={true} style={styles.wishlistView}>
                <Image source={IconPack.WISHLIST} style={styles.wishlistIcon} />
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
          </View>
        </Pressable>
      )}
    </Observer>
  );
};

export default ProductCard;
