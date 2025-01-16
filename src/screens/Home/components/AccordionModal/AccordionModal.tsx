import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {observer} from 'mobx-react';
import {styles} from './AccordionModal.styles';
import RootStore from '../../../../stores/RootStore';
import {strings} from '../../../../utils/strings';

const AccordionModal = ({isModalVisible, setModalVisible}: any) => {
  const [tempSelectedItems, setTempSelectedItems] = useState([]);

  useEffect(() => {
    if (isModalVisible) {
      setTempSelectedItems([...RootStore.homeStore.productCategories]);
    }
  }, [isModalVisible, RootStore.homeStore.productCategories]);

  const onCloseModal = () => {
    setModalVisible(false);
  };

  const onSelectedItemsChange = items => {
    setTempSelectedItems(items);

    if (items.length === 0) {
      RootStore.homeStore.setFields('productCategories', []);
    }

    const isDeleted = RootStore.homeStore.productCategories.some(
      item => !items.includes(item),
    );

    if (isDeleted) {
      RootStore.homeStore.setFields('productCategories', items);
    }
  };

  const handleCancel = () => {
    setTempSelectedItems([...RootStore.homeStore.productCategories]);
    onCloseModal();
  };

  const handleConfirm = () => {
    RootStore.homeStore.setFields('productCategories', tempSelectedItems);
    onCloseModal();
  };

  const DATA = RootStore.homeStore.collectionData.map(category => ({
    name: category.col_name,
    id: category.id,
    children: category.subcategory.map(subcat => ({
      name: subcat.col_name,
      id: subcat.id,
    })),
  }));

  return (
    <View style={styles.container}>
      <SectionedMultiSelect
        items={DATA}
        uniqueKey="id"
        subKey="children"
        showRemoveAll={true}
        selectText={strings.SelectCategories}
        showCancelButton={true}
        showDropDowns={true}
        readOnlyHeadings={false}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        onSelectedItemsChange={onSelectedItemsChange}
        selectedItems={tempSelectedItems}
        IconRenderer={Icon}
        styles={{
          selectToggle: styles.selectToggle,
          selectToggleText: styles.selectToggleText,
          container: {
            maxHeight: 700,
            marginTop: 50,
          },
        }}
      />
    </View>
  );
};

export default observer(AccordionModal);
