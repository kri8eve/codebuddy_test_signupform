/* eslint-disable prettier/prettier */
function validateEmail(email) {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (email.match(validRegex)) {
    return true;
  }
  return false;
}

function validatePassword(password) {
  const validRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?!.*?[^A-Za-z0-9#?!@$%^&*-]).{8,63}$|^(?=.*?[A-Z])(?=.*?[0-9])(?!.*?[^A-Za-z0-9#?!@$%^&*-]).{8,63}$|^(?=.*?[A-Z])(?=.*?[#?!@$%^&*-])(?!.*?[^A-Za-z0-9#?!@$%^&*-]).{8,63}$|^(?=.*?[a-z])(?=.*?[0-9])(?!.*?[^A-Za-z0-9#?!@$%^&*-]).{8,63}$|^(?=.*?[a-z])(?=.*?[#?!@$%^&*-])(?!.*?[^A-Za-z0-9#?!@$%^&*-]).{8,63}$|^(?=.*?[0-9])(?=.*?[#?!@$%^&*-])(?!.*?[^A-Za-z0-9#?!@$%^&*-]).{8,63}$/;
  if (password.match(validRegex)) {
    return true;
  }
  return false;
}

function validateFirstName(fname) {
  var pattern = /^[A-Za-z]+$/;

  if (!fname.match(pattern) || fname.length < 2 || fname.length > 50) {
    return false;
  }
  return true;
}
function validateLastName(lname) {
  var pattern = /^[A-Za-z]+$/;

  if (lname.match(pattern)) {
    return true;
  }
  return false;
}
function validateAddress(addr) {
  if (addr.length < 10) {
    return false;
  }
  return true;
}
function validatePhonenumber(phone) {
  if (phone.length !== 10) {
    return false;
  }
  return true;
}
export {
  validateEmail,
  validatePassword,
  validateFirstName,
  validateLastName,
  validateAddress,
  validatePhonenumber,
};
