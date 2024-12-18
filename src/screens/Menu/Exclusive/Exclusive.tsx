import React, {useEffect} from 'react';
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  RefreshControl,
  ScrollView,
} from 'react-native';
import {styles} from '../Menu.styles';
import {observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import RootStore from '../../../stores/RootStore';
import HeaderComponent from '../../../components/Header/HeaderComponent';
import LoadingComponent from '../../../components/LoadingComponent/LoadingComponent';
import NoDataFoundComponent from '../../../components/NoDataFoundComponent/NoDataFoundComponent';

const Exclusive = observer(() => {
  const navigation = useNavigation();

  useEffect(() => {
    callApi();
  }, []);

  const callApi = () => {
    const data = new FormData();
    data.append('user_id', RootStore.appStore.userId);

    RootStore.menuStore.exclusiveDataApi(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <>
        <HeaderComponent showAppIcon={false} isBack={true} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={callApi} />
          }
          style={styles.scrollStyle}
          contentContainerStyle={styles.contentContainerStyle}>
          <>
            {RootStore.menuStore.isExclusiveDataApiLoading ? (
              <LoadingComponent />
            ) : RootStore.menuStore.exclusiveData === null &&
              !RootStore.menuStore.isExclusiveDataApiLoading ? (
              <NoDataFoundComponent msg="no data found" />
            ) : RootStore.menuStore.exclusiveData != null &&
              RootStore.menuStore.exclusiveData?.final_collection?.length >
                0 ? (
              RootStore.menuStore.exclusiveData?.final_collection.map(
                (item, index) => {
                  return (
                    <Pressable
                      key={`exclusive-${index}`}
                      onPress={() =>
                        // @ts-ignore
                        navigation.navigate('ProductList', {
                          gridData: item,
                          fromExclusive: true,
                          title: item.collection_name,
                        })
                      }>
                      <View style={styles.row}>
                        <View style={styles.countContainer}>
                          <Text style={styles.collectionCount}>
                            {item.product_count}
                          </Text>
                        </View>
                        <View style={styles.textContainer}>
                          <Text style={styles.title}>
                            {item.collection_name}
                          </Text>
                          <View style={styles.borderStyle} />
                        </View>
                      </View>
                    </Pressable>
                  );
                },
              )
            ) : (
              <></>
            )}
          </>
        </ScrollView>
      </>
    </SafeAreaView>
  );
});

export default Exclusive;
