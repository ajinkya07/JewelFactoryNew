import React from 'react';
import {View, Text, Pressable, Image} from 'react-native';
import {styles} from './CartWishlistItem.styles';
import IconPack from '../../../../utils/IconPack';
import {urls} from '../../../../network/urls';
import {strings} from '../../../../utils/strings';
import Divider from '../../../../components/Divider';
import RootStore from '../../../../stores/RootStore';
import LoadingComponent from '../../../../components/LoadingComponent/LoadingComponent';

const CartWishlistItem = ({
  item,
  onPressMoveTo,
  onPressEdit,
  onPressDelete,
}: any) => {
  let baseurl2 = urls.imageUrl + item.zoom_image;

  const isToogleTwo = true;
  const openMoreDetailsIdCart = true;
  const index = RootStore.cartStore.selectedCartWishlistTabIndex;

  const UPDATE_CART_OPTIONS = [
    {
      id: 1,
      title: strings.edit,
      onPress: (data: any) => onPressEdit(data),
      source: IconPack.EDIT,
      isLoading: false,
    },
    {
      id: 2,
      title: index == 0 ? strings.moveToWishlist : strings.moveToCart,
      onPress: (data: any) => onPressMoveTo(data),
      source: IconPack.SWAP,
      isLoading: RootStore.cartStore.isMoveProductApiLoading,
    },
    {
      id: 3,
      title: strings.delete,
      onPress: (data: any) => onPressDelete(data),
      source: IconPack.DELETE,
      isLoading: false,
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
            {UPDATE_CART_OPTIONS.map((i, index) => {
              return (
                <>
                  {i.isLoading ? (
                    <LoadingComponent />
                  ) : (
                    <Pressable
                      key={`update-cart-options-${index}`}
                      onPress={() => i.onPress(item)}
                      style={styles.bottomImgView}>
                      <Image
                        style={styles.tabCartBottomImg}
                        source={i.source}
                      />
                      <Text style={styles.updateItemText}>{i.title}</Text>
                    </Pressable>
                  )}
                </>
              );
            })}
          </View>
        </>
      ) : null}
      <Divider style={styles.divider} />
    </View>
  );
};

export default CartWishlistItem;
