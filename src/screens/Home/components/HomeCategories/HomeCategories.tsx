import React from 'react';
import {View, Pressable, Image, Text} from 'react-native';
import {observer} from 'mobx-react';
import {styles} from './HomeCategories.styles';
import IconPack from '../../../../utils/IconPack';
import {strings} from '../../../../utils/strings';
import {isDefined} from '../../../../utils/helper';
import {useNavigation} from '@react-navigation/native';
import {constants} from '../../../../utils/constants';
import {navigateToCategoryOrSubCategory} from '../../Home.utils';

const HomeCategories = ({data}: any) => {
  const navigation = useNavigation();

  if (!isDefined(data)) {
    return null;
  }

  const onPressCategory = (data: any) => {
    navigateToCategoryOrSubCategory(data);
  };

  return (
    data.length > 0 && (
      <>
        <Text style={styles.categoriesText}>{strings.categories}</Text>
        {data.map((item: any, index: number) => {
          return (
            <Pressable
              key={`category${index}`}
              style={({pressed}) => styles.cardView}
              onPress={() => onPressCategory(item)}>
              <Image
                source={
                  item.image_name != ''
                    ? {uri: constants.IMAGE_URL + item.image_name}
                    : IconPack.APP_LOGO
                }
                style={styles.categoryImage}
              />
            </Pressable>
          );
        })}
      </>
    )
  );
};

export default observer(HomeCategories);
