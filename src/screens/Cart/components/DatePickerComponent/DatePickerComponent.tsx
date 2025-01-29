import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import {colors} from '../../../../utils/colors';
import CalendarPicker from 'react-native-calendar-picker';
import {styles} from './DatePickerComponent.styles';
import {isDefined} from '../../../../utils/helper';

const DatePickerComponent = ({
  isModalVisible,
  setModalVisible,
  setDateInput,
  selectedDate,
  dateFromSelected,
}: any) => {
  const [date, setDate] = useState('');
  const selectedDayColor = dateFromSelected
    ? colors.iconsTintColor
    : colors.bg6;

  const handleDatePicked = (date: string) => {
    const dateSelected = moment(
      new Date(date).toISOString().slice(0, 10),
    ).format('DD-MM-YYYY');
    setDateInput(dateSelected);
    setModalVisible(false);
  };

  useEffect(() => {
    if (isDefined(selectedDate)) {
      const formattedDate = moment(selectedDate, 'DD-MM-YYYY').toDate();
      setDate(formattedDate);
    } else {
      setDate('');
    }
  }, [selectedDate]);

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
                selectedDayColor={selectedDayColor}
                scrollable={true}
                headerWrapperStyle={{marginVertical: 30}}
                selectedStartDate={date}
                initialDate={date || new Date()}
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
