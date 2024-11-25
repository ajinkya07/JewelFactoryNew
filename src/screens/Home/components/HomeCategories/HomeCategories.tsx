import React, {Component} from 'react';
import {View, Pressable, FlatList, Image, Text} from 'react-native';
import {observer} from 'mobx-react';
import {styles} from './HomeCategories.styles';
import IconPack from '../../../../utils/IconPack';
import {strings} from '../../../../utils/strings';
import {isDefined} from '../../../../utils/helper';

const HomeCategories = ({data}: any) => {
  if (!isDefined(data)) {
    return null;
  }

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
              onPress={() => null}>
              <View style={styles.imageView}>
                <Image source={IconPack.BG} style={styles.categoryImage} />
              </View>
            </Pressable>
          );
        }}
      />
    </>
  );
};

export default observer(HomeCategories);
