/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';
import {useContext} from 'react';
import {SignUpContext} from '../providers/SignUpProvider';

const styles = StyleSheet.create({
  modalView: {
    width: Dimensions.get('window').width * 0.9,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  textStyle: {
    fontSize: 17,
    marginBottom: 5,
  },
});

const FormSubmitSuccessModal = ({visible, onClose}) => {
  const {user} = useContext(SignUpContext);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#2525252C',
        }}>
        <View style={styles.modalView}>
          <Text style={[styles.textStyle]}>EmailId : {user.emailId}</Text>
          <Text style={[styles.textStyle]}>Password : {user.password}</Text>
          <Text style={[styles.textStyle]}>First name : {user.firstName}</Text>
          <Text style={[styles.textStyle]}>Last name : {user.lastName}</Text>
          <Text style={[styles.textStyle]}>Address : {user.address}</Text>
          <Text style={[styles.textStyle]}>
            Country code : {user.countryCode}
          </Text>
          <Text style={[styles.textStyle]}>
            Phone number : {user.phoneNumber}
          </Text>
          <View style={{paddingVertical: 20}}>
            <Text>JSON </Text>
            <Text>{JSON.stringify(user)}</Text>
          </View>
          <View style={{paddingTop: 20}}>
            <TouchableOpacity
              onPress={onClose}
              style={{
                paddingVertical: 10,
                backgroundColor: '#1A47ED',
                borderRadius: 10,
              }}>
              <Text style={{color: '#fff', textAlign: 'center'}}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FormSubmitSuccessModal;
