import React from 'react';
import {View, Text, Pressable, Image} from 'react-native';
import {styles} from './CartWishlistItem.styles';
import IconPack from '../../../../utils/IconPack';
import {urls} from '../../../../network/urls';
import {strings} from '../../../../utils/strings';
import Divider from '../../../../components/Divider';

const CartWishlistItem = ({
  item,
  onPressMoveTo,
  onPressEdit,
  onPressDelete,
}: any) => {
  let baseurl2 = urls.imageUrl + item.zoom_image;

  const isToogleTwo = true;
  const openMoreDetailsIdCart = true;

  const UPDATE_CART_OPTIONS = [
    {
      id: 1,
      title: strings.edit,
      onPress: (item: any) => onPressEdit(item),
      source: IconPack.EDIT,
    },
    {
      id: 2,
      title: strings.moveToWishlist,
      onPress: (item: any) => onPressMoveTo(item),
      source: IconPack.SWAP,
    },
    {
      id: 3,
      title: strings.delete,
      onPress: (item: any) => onPressDelete(item),
      source: IconPack.DELETE,
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.flexRow}>
        <Pressable onPress={() => null}>
          <Image
            style={styles.imgStyle}
            source={
              item?.images != ''
                ? {uri: baseurl2 + item?.images}
                : IconPack.APP_LOGO
            }
            defaultSource={IconPack.APP_LOGO}
          />
        </Pressable>

        <View style={styles.rightView}>
          <View style={[styles.flexRow]}>
            <Text style={styles.title}>{strings.code}</Text>
            <Text style={[styles.title, styles.rightValueText]}>
              {item.design_number}
            </Text>
          </View>
          <View style={[styles.flexRow]}>
            <Text style={styles.title}>{strings.collection}</Text>
            <Text style={[styles.title, styles.rightValueText]}>
              {item.collection_name}
            </Text>
          </View>
        </View>
      </View>

      {/* <View style={[styles.flexRowJustify, styles.marginTop]}>
        <Text style={styles.moreDetailText}>{strings.moreDetails}</Text>
        <Image source={IconPack.RIGHT_ARROW} style={styles.downArrow} />
      </View> */}

      {isToogleTwo && openMoreDetailsIdCart !== item.cart_wish_id ? (
        <>
          <View style={[styles.flexRowJustify, styles.marginTop]}>
            <View>
              {item?.keys.map((key: string, index: string) => {
                return (
                  <Text
                    key={`cart-item-key-${index}`}
                    style={styles.keyValueText}>
                    {key.replace('_', ' ')}
                  </Text>
                );
              })}
            </View>
            <View>
              {item?.values.map((value: string, index: string) => {
                return (
                  <Text
                    key={`cart-item-value-${index}`}
                    style={styles.keyValueText}>
                    {value ? value : '-'}
                  </Text>
                );
              })}
            </View>
          </View>

          <View style={[styles.flexRowJustify, styles.marginTop]}>
            {UPDATE_CART_OPTIONS.map((item, index) => {
              return (
                <Pressable
                  key={`update-cart-options-${index}`}
                  onPress={() => item.onPress(item)}
                  style={styles.bottomImgView}>
                  <Image style={styles.tabCartBottomImg} source={item.source} />
                  <Text style={styles.updateItemText}>{item.title}</Text>
                </Pressable>
              );
            })}
          </View>
        </>
      ) : null}
      <Divider style={styles.marginTop} />
    </View>
  );
};

export default CartWishlistItem;
