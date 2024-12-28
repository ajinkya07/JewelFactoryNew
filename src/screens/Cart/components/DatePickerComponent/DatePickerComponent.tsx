import moment from 'moment';
import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import {colors} from '../../../../utils/colors';
import CalendarPicker from 'react-native-calendar-picker';
import {styles} from './DatePickerComponent.styles';

const DatePickerComponent = ({
  isModalVisible,
  setModalVisible,
  setDateInput,
}: any) => {
  const handleDatePicked = (date: string) => {
    let dateSelected = moment(new Date(date).toISOString().slice(0, 10)).format(
      'DD-MM-YYYY',
    );

    console.log('dateSelected', dateSelected);
    setDateInput(dateSelected);
    setModalVisible(false);
  };

  return (
    <Modal
      isVisible={isModalVisible}
      style={styles.container}
      onBackdropPress={() => setModalVisible(false)}
      onBackButtonPress={() => setModalVisible(false)}
      onSwipeComplete={() => setModalVisible(false)}
      swipeDirection="down"
      propagateSwipe>
      <View style={styles.content}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <>
            <View>
              <CalendarPicker
                onDateChange={(d: any) => handleDatePicked(d)}
                selectedDayColor={colors.gray}
                scrollable={true}
                headerWrapperStyle={{marginVertical: 30}}
              />
            </View>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <View style={styles.closeContainer}>
                <Text style={styles.close}>Close</Text>
              </View>
            </TouchableOpacity>
          </>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};

export default DatePickerComponent;
