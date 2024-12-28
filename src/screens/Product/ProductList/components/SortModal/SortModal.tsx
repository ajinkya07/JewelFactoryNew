import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import RootStore from '../../../../../stores/RootStore';
import PressableComponent, {
  PRESSABLE_BTN_TYPE,
} from '../../../../../components/PressableComponent/PressableComponent';
import IconPack from '../../../../../utils/IconPack';
import {strings} from '../../../../../utils/strings';
import {styles} from './SortModal.styles';
import Divider from '../../../../../components/Divider';
import {observer} from 'mobx-react';

const SortModal = observer(
  ({
    isModalVisible,
    setModalVisible,
    data,
    sortById,
    setSortById,
    applySort,
  }: any) => {
    return (
      <Modal
        isVisible={isModalVisible}
        style={styles.modalView}
        animationInTiming={600}
        animationOutTiming={500}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection="down"
        propagateSwipe>
        <View style={styles.modalViewContainer}>
          <Divider style={styles.divider} />
          <Text style={styles.titleText}>{strings.sortBy}</Text>

          <Text style={styles.subtitleText}>{strings.sortByDesc}</Text>

          <ScrollView>
            {data.map((item, index) => {
              return (
                <View key={`sort-${index}`} style={styles.sortView}>
                  <Pressable
                    hitSlop={styles.hitSlop10}
                    style={({pressed}) =>
                      pressed ? styles.sortByRowPressed : styles.sortByRow
                    }
                    onPress={() => {
                      setSortById(item.value);
                    }}>
                    <>
                      {sortById === item.value ? (
                        <View style={styles.radioCircle}>
                          <View style={styles.selectedRb} />
                        </View>
                      ) : (
                        <View style={styles.radioCircle} />
                      )}
                      <Text style={styles.radioText}>{item.label}</Text>
                      <Image
                        source={IconPack.DOWN_ARROW_LIGHT}
                        style={
                          item.type === 'desc'
                            ? styles.downArrow
                            : styles.upArrow
                        }
                        resizeMode="contain"
                      />
                    </>
                  </Pressable>
                </View>
              );
            })}
          </ScrollView>
          <View style={styles.btnContainer}>
            <PressableComponent
              btnType={PRESSABLE_BTN_TYPE.PRIMARY}
              text={strings.apply}
              containerStyle={styles.btnContainer}
              onPress={() => {
                setModalVisible(false);
                applySort(data);
              }}
              isLoading={false}
            />
          </View>
        </View>
      </Modal>
    );
  },
);

export default SortModal;
