import React, {Component} from 'react';
import {View, Pressable, FlatList, Image, Text} from 'react-native';
import {observer} from 'mobx-react';
import {styles} from './HomeCategories.styles';
import IconPack from '../../../../utils/IconPack';
import {strings} from '../../../../utils/strings';
import {isDefined} from '../../../../utils/helper';
import {useNavigation} from '@react-navigation/native';

const HomeCategories = ({data}: any) => {
  const navigation = useNavigation();

  if (!isDefined(data)) {
    return null;
  }

  const onPressCategory = (data: any) => {
    // @ts-ignore
    navigation.navigate('ProductList', {title: data.product_name});
  };

  return (
    <>
      <Text style={styles.categoriesText}>{strings.categories}</Text>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.bottom10}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          return (
            <Pressable
              key={`category${index}`}
              style={({pressed}) => styles.cardView}
              onPress={() => onPressCategory(item)}>
              <Image source={item.source} style={styles.categoryImage} />
            </Pressable>
          );
        }}
      />
    </>
  );
};

export default observer(HomeCategories);
