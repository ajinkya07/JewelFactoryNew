import {observer} from 'mobx-react';
import React from 'react';
import {View} from 'react-native';
import ComingSoon from './ComingSoon';
import ContactUs from '../../components/ContactUs/ContactUs';
import RootStore from '../../stores/RootStore';
import SearchModal from '../../screens/Home/components/SearchModal/SearchModal';

const TopLevelModal = observer(() => {
  return (
    <View>
      <ComingSoon
        isModalVisible={RootStore.appStore.isComingSoonVisible}
        setModalVisible={(toggleValue: boolean) => {
          RootStore.appStore.setFields('isComingSoonVisible', toggleValue);
        }}
      />
      <SearchModal
        isModalVisible={RootStore.homeStore.isSearchModalVisible}
        setModalVisible={(toggleValue: boolean) => {
          RootStore.homeStore.setFields('isSearchModalVisible', toggleValue);
        }}
      />
      <ContactUs
        isModalVisible={RootStore.appStore.isContactUsModalVisible}
        setModalVisible={(toggleValue: boolean) => {
          RootStore.appStore.setFields('isContactUsModalVisible', toggleValue);
        }}
      />
    </View>
  );
});

export default TopLevelModal;
