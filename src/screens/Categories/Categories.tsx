import React from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  Pressable,
  FlatList,
} from 'react-native';
import {styles} from './Categories.styles';
import IconPack from '../../utils/IconPack';
import {colors} from '../../utils/colors';
import {observer} from 'mobx-react';
import RootStore from '../../stores/RootStore';
import {constants} from '../../utils/constants';
import {navigateToCategoryOrSubCategory} from '../Home/Home.utils';
import HeaderComponent from '../../components/Header/HeaderComponent';

const Categories = (props: any) => {
  const isFromSubcategory = props.route.params?.isFromSubcategory || false;
  const categoryData = isFromSubcategory
    ? props.route.params?.categoryData
    : RootStore.homeStore.collectionData;

  let categoryImageBaseUrl =
    RootStore.homeStore.allParameterData?.base_url +
    'public/backend/collection/';

  const categoryDataSource = [
    {
      id: '1',
      bgColor: colors.bg1,
    },
    {
      id: '2',
      bgColor: colors.bg2,
    },
    {
      id: '3',
      bgColor: colors.bg3,
    },
    {
      id: '4',
      bgColor: colors.bg4,
    },
    {
      id: '5',
      bgColor: colors.bg5,
    },
    {
      id: '6',
      bgColor: colors.bg6,
    },
    {
      id: '7',
      bgColor: colors.bg7,
    },
    {
      id: '8',
      bgColor: colors.bg2,
    },
  ];

  const onPressCategory = (data: any) => {
    navigateToCategoryOrSubCategory(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent
        showAppIcon={!isFromSubcategory}
        isBack={isFromSubcategory}
      />

      <FlatList
        data={categoryData}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollStyle}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}: any) => {
          return (
            <Pressable
              key={`category-tab${index}`}
              style={() => [
                styles.cardView,
                {
                  backgroundColor:
                    categoryDataSource[
                      Number(index % categoryDataSource.length)
                    ]?.bgColor,
                },
              ]}
              onPress={() => onPressCategory(item)}>
              <>
                <Text adjustsFontSizeToFit={true} style={styles.categoryTitle}>
                  {item.col_name}
                </Text>

                <Image
                  source={
                    item.image_name != ''
                      ? {uri: categoryImageBaseUrl + item.image_name}
                      : IconPack.APP_LOGO
                  }
                  style={styles.categoryImage}
                  resizeMode={item.image_name != '' ? 'cover' : 'stretch'}
                />
              </>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default observer(Categories);
