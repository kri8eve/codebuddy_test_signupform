/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

const formStyles = StyleSheet.create({
  formInput: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#969696',
  },
  label:{
    fontSize:15,
    marginBottom:5
  },
  info: {
    fontSize: 12,
    color:'red'
  },
  btn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    textAlign:'center'
  },
  backBtnEnabled: {
    backgroundColor: '#E1E1E1',
    color: '#3F3F3F',
  },
  btnDisabled: {
    backgroundColor: '#E3E3E3',
    color: '#ACACAC',
  },
  saveBtnEnabled: {
    backgroundColor: '#1A47ED',
    color: '#FFFFFF',
  },
});

export default formStyles;
