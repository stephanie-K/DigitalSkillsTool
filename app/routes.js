const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

module.exports = router


//  enter your new routes here *****************************************************************

// Register to Vote ****************************************************************************
router.post('/forms/govuk-forms/register-to-vote/RTVCountryOfResidence', function (req, res) {
res.redirect('/forms/govuk-forms/register-to-vote/RTVNationality')
})

router.post('/forms/govuk-forms/register-to-vote/RTVNationality', function (req, res) {
  res.redirect('/forms/govuk-forms/register-to-vote/RTVDateOfBirth')
})

router.post('/forms/govuk-forms/register-to-vote/RTVDateOfBirth', function (req, res) {
  res.redirect('/forms/govuk-forms/register-to-vote/RTVName')
})

router.post('/forms/govuk-forms/register-to-vote/RTVName', function (req, res) {
  res.redirect('/forms/govuk-forms/register-to-vote/RTVNInumber')
})

router.post('/forms/govuk-forms/register-to-vote/RTVNInumber', function (req, res) {
  res.redirect('/forms/govuk-forms/register-to-vote/RTVaddress')
})
router.post('/forms/govuk-forms/register-to-vote/RTVaddress', function (req, res) {
  res.redirect('/forms/govuk-forms/register-to-vote/RTVaddressNext')
})

router.post('/forms/govuk-forms/register-to-vote/RTVaddressNext', function (req, res) {
  res.redirect('/forms/govuk-forms/register-to-vote/RTVaddress2nd')
})

router.post('/forms/govuk-forms/register-to-vote/RTVaddressFull', function (req, res) {
  res.redirect('/forms/govuk-forms/register-to-vote/RTVaddress2nd')
})

router.post('/forms/govuk-forms/register-to-vote/RTVaddress2nd', function (req, res) {
  res.redirect('/forms/govuk-forms/register-to-vote/RTVmoved')
})

router.post('/forms/govuk-forms/register-to-vote/RTVmoved', function (req, res) {
  var moved = req.session.data['rtv-moved']
  var hadUKadd = req.session.data['registered-abroad']
  
  if (moved === "Yes, from a UK address") {
return res.redirect('/forms/govuk-forms/register-to-vote/RTVpreviousUKadd')
  } else {
    if ((moved === "Yes, from abroad" ) && (hadUKadd ==="Yes")) {
      res.redirect('/forms/govuk-forms/register-to-vote/RTVpreviousUKpostcode')
    }
  }
  res.redirect('/forms/govuk-forms/register-to-vote/RTVoptOut')
})

router.post('/forms/govuk-forms/register-to-vote/RTVpreviousUKpostcode', function (req, res) {
  res.redirect('/forms/govuk-forms/register-to-vote/RTVpreviousUKaddNext')
})

router.post('/forms/govuk-forms/register-to-vote/RTVpreviousUKadd', function (req, res) {
  res.redirect('/forms/govuk-forms/register-to-vote/RTVpreviousUKaddNext')
})

router.post('/forms/govuk-forms/register-to-vote/RTVpreviousUKaddNext', function (req, res) {
  res.redirect('/forms/govuk-forms/register-to-vote/RTVoptOut')
})

router.post('/forms/govuk-forms/register-to-vote/RTVoptOut', function (req, res) {
  res.redirect('/forms/govuk-forms/register-to-vote/RTVpostalVote')
})

router.post('/forms/govuk-forms/register-to-vote/RTVpostalVote', function (req, res) {
  res.redirect('/forms/govuk-forms/register-to-vote/RTVcontact')
})

router.post('/forms/govuk-forms/register-to-vote/RTVcontact', function (req, res) {
  res.redirect('/forms/govuk-forms/register-to-vote/RTVsummary')
})

// Apply for a provisional licence ***************************************************

router.post('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLdetails', function (req, res) {
  req.session.data['APLdetailsError'] = false
  let titles = true
  let title = req.session.data['APL-user-title']
  let titleOther = req.session.data['APL-user-title-other']
  let forename = req.session.data['APL-user-forenames']
  let surname = req.session.data['APL-user-surname']
  let gender = req.session.data['APL-user-gender']
  let dobDay = req.session.data['dvla-APL-dob-day']
  let dobMonth = req.session.data['APL-dob-month']
  let dobYear = req.session.data['APL-dob-year']
  let countryOfBirth = req.session.data['APL-user-country-of-birth']

  if(title === "" || (title === "other" && titleOther === "")) {
    titles = false
  }

  if (titles === false || forename === "" || surname === "" || gender === "" || dobDay === ""
      || dobMonth === "" || dobYear === "" || countryOfBirth === "") {
    req.session.data['APLdetailsError'] = true
    return res.redirect('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLdetails')
  }
  res.redirect('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLaddressSearch')
})

router.post('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLaddressSearch', function (req, res) {
  req.session.data['APLaddressSearchError'] = false
  let houseno = req.session.data['APL-user-house-no']
  let postcode = req.session.data['APL-user-postcode']

  if (houseno === "" || postcode === "") {
    req.session.data['APLaddressSearchError'] = true
    return res.redirect('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLaddressSearch')
  }
  req.session.data['APLaddressConfirm-prevPage'] = 'APLaddressSearch'
  res.redirect('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLaddressConfirm')
})

router.post('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLstreetTown', function (req, res) {
  req.session.data['APLstreetTownError'] = false
  let houseno = req.session.data['APL-user-house-no']
  let street = req.session.data['APL-user-street']
  let town = req.session.data['APL-user-town']

  if (houseno === "" || street === "" || town === "") {
    req.session.data['APLstreetTownError'] = true
    return res.redirect('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLstreetTown')
  }
  req.session.data['APLaddressConfirm-prevPage'] = 'APLstreetTown'
  res.redirect('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLaddressConfirm')
})

router.post('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLaddressEntry', function (req, res) {
  req.session.data['APLaddressEntryError'] = false
  let addressEntry = req.session.data['APL-address-entry']

  if (addressEntry !== "postcode" && addressEntry !== "street&town" && addressEntry !== "bfpo") {
    req.session.data['APLaddressEntryError'] = true
    return res.redirect('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLaddressEntry')
  } else if(addressEntry === "street&town") {
      return res.redirect('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLstreetTown')
  } else if(addressEntry === "bfpo") {
      return res.redirect('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLbfpoAddress')
  }
  res.redirect('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLaddressSearch')
})

router.post('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLaddressConfirm', function (req, res) {
  let supInfo = req.session.data['APL-supplementary-info']

  if (supInfo) {
    return res.redirect('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLsupInfo')
  }
  req.session.data['APLaddressYearsLived-prevPage'] = 'APLaddressConfirm'
  res.redirect('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLaddressYearsLived')
})

router.post('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLsupInfo', function (req, res) {
  req.session.data['APLaddressYearsLived-prevPage'] = 'APLsupInfo'
  res.redirect('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLaddressYearsLived')
})

router.post('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLaddressYearsLived', function (req, res) {
  req.session.data['APLaddressYearsLivedError'] = false
  let aplAddressYears = req.session.data['APL-address-no-years']
  let aplAddressMonths = req.session.data['APL-address-no-months']

  if (aplAddressYears === "" && aplAddressMonths === "") {
    req.session.data['APLaddressYearsLivedError'] = true
    return res.redirect('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLaddressYearsLived')
  }
  res.redirect('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLaddressHistory')
})

router.post('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLsupInfo', function (req, res) {
  res.redirect('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLaddressHistory')
})

router.post('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLsecurityDetails', function (req, res) {
  req.session.data['APLsecurityDetailsError'] = false
  let birthSurname = req.session.data['APL-birth-surname']
  let motherMaidenName = req.session.data['APL-mothers-maiden-name']
  let placeOfBirth = req.session.data['APL-place-of-birth']

  if (birthSurname === "" || motherMaidenName === "" || placeOfBirth === "") {
    req.session.data['APLsecurityDetailsError'] = true
    return res.redirect('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLsecurityDetails')
  }
  res.redirect('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLnatIns')
})

router.post('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLnatIns', function (req, res) {
  req.session.data['APLnatInsError'] = false
  let niNo = req.session.data['APL-ni-no']
  let niNoCheck = req.session.data['APL-ni-no-check']

  if (niNo !== niNoCheck) {
    req.session.data['APLnatInsError'] = true
    return res.redirect('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLnatIns')
  }
  res.redirect('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLpassportNo')
})

router.post('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLpassportNo', function (req, res) {
  req.session.data['APLpassportNoError'] = false
  let passNo = req.session.data['APL-passport-no']
  let passNoCheck = req.session.data['APL-passport-no-check']

  if (passNo !== passNoCheck) {
    req.session.data['APLpassportNoError'] = true
    return res.redirect('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLpassportNo')
  }
  res.redirect('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLeligibility')
})

router.post('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLeligibility', function (req, res) {
  req.session.data['APLeligibilityError'] = false
  let livedInEu = req.session.data['APL-lived-in-eu']
  let disqualified = req.session.data['APL-disqualified']
  let checkLivedInEu = false
  let checkDisqualified = false

  if(livedInEu === 'yes' || livedInEu === 'no') {
    checkLivedInEu = true
  }

  if(disqualified === 'yes' || disqualified === 'no') {
    checkDisqualified = true
  }

  if (checkLivedInEu === false || checkDisqualified === false) {
    req.session.data['APLeligibilityError'] = true
    return res.redirect('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLeligibility')
  }
  else if(livedInEu === 'yes') {
    return res.redirect('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLeuResidence')
  }
  else if(disqualified === 'yes') {
    req.session.data['APLdisqualified-prevPage'] = 'APLeligibility'
    return res.redirect('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLdisqualified')
  }
  req.session.data['APLeyesight-prevPage'] = 'APLeligibility'
  res.redirect('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLeyesight')
})

router.post('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLeuResidence', function (req, res) {
  req.session.data['APLeuResidenceError'] = false
  let euCountry = req.session.data['APL-eu-residence-country']
  let ukStartDay = req.session.data['APL-uk-start-day']
  let ukStartMonth = req.session.data['APL-uk-start-month']
  let ukStartYear = req.session.data['APL-uk-start-year']
  let disqualified = req.session.data['APL-disqualified']


  if (euCountry === '' || ukStartDay === '' || ukStartMonth === '' || ukStartYear === '') {
    req.session.data['APLeuResidenceError'] = true
    return res.redirect('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLeuResidence')
  }
  else if(disqualified === 'yes') {
    req.session.data['APLdisqualified-prevPage'] = 'APLeuResidence'
    return res.redirect('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLdisqualified')
  }
  req.session.data['APLeyesight-prevPage'] = 'APLeuResidence'
  res.redirect('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLeyesight')
})

router.post('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLdisqualified', function (req, res) {
  req.session.data['APLdisqualifiedError'] = false
  let disqualifiedCountry = req.session.data['APL-disqualification-country']


  if (disqualifiedCountry === '') {
    req.session.data['APLdisqualifiedError'] = true
    return res.redirect('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLdisqualified')
  }
  req.session.data['APLeyesight-prevPage'] = 'APLdisqualified'
  res.redirect('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLeyesight')
})

router.post('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLeyesight', function (req, res) {
  req.session.data['APLeyesightError'] = false
  let eyesight = req.session.data['APL-eyesight']
  let glasses = req.session.data['APL-glasses']
  let checkEyesight = false
  let checkGlasses = false

  if(eyesight === 'yes' || eyesight === 'no') {
    checkEyesight = true
  }

  if(glasses === 'yes' || glasses === 'no') {
    checkGlasses = true
  }

  if (checkEyesight === false || checkGlasses === false) {
    req.session.data['APLeyesightError'] = true
    return res.redirect('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLeyesight')
  }
  else if(eyesight === 'no') {
    return res.redirect('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLminEyesight')
  }
  req.session.data['APLfitToDrive-prevPage'] = 'APLeyesight'
  res.redirect('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLfitToDrive')
})

router.post('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLminEyesight', function (req, res) {
  req.session.data['APLminEyesightError'] = false
  let minEyesight = req.session.data['APL-min-eyesight']
  let checkMinEyesight = false

  if(minEyesight === 'yes' || minEyesight === 'no') {
    checkMinEyesight = true
  }

  if (checkMinEyesight === false) {
    req.session.data['APLminEyesightError'] = true
    return res.redirect('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLminEyesight')
  }
  else if(minEyesight === 'no') {
    return res.redirect('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLminEyesightRequirement')
  }
  req.session.data['APLfitToDrive-prevPage'] = 'APLminEyesight'
  res.redirect('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLfitToDrive')
})

router.post('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLfitToDrive', function (req, res) {
  let medConditions = req.session.data['med-conditions']

  if (!medConditions) {
    return res.redirect('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLmedDec')
  }
  res.redirect('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLmedReferral')
})

router.post('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLmedDec', function (req, res) {
  req.session.data['APLmedDecError'] = false
  let medDec = req.session.data['APL-med-declaration']

  if (!medDec) {
    req.session.data['APLmedDecError'] = true
    return res.redirect('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLmedDec')
  }
  res.redirect('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLorgDon')
})

router.post('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLorganForm', function (req, res) {
  req.session.data['APLorganFormError'] = false
  let organDonation = req.session.data['APL-organ-donation']

  if (!organDonation) {
    req.session.data['APLorganFormError'] = true
    return res.redirect('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLorganForm')
  }
  req.session.data['APLemail-prevPage'] = 'APLorganForm'
  res.redirect('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLemail')
})

router.post('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLemail', function (req, res) {
  req.session.data['APLemailError'] = false
  req.session.data['APLemailError-mismatch'] = false
  let email = req.session.data['APL-email']
  let emailCheck = req.session.data['APL-email-check']
  let emailsEntered = true

  if(email === '' || emailCheck === '') {
    req.session.data['APLemailError'] = true
    return res.redirect('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLemail')
  }

  if (email !== emailCheck) {
    req.session.data['APLemailError-mismatch'] = true
    return res.redirect('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLemail')
  }
  res.redirect('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLdeclare')
})

router.post('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLdeclare', function (req, res) {
  req.session.data['APLdeclareError'] = false
  let declare = req.session.data['APL-declaration']

  if (!declare) {
    req.session.data['APLdeclareError'] = true
    return res.redirect('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLdeclare')
  }
  res.redirect('/forms/govuk-forms/learn-to-drive/apply-provisional-licence/APLfinish')
})

// book a theory test - if other support is needed and selected, then we stop and don't do the rest of the form - we show a Thank you screen.

router.post('/forms/govuk-forms/learn-to-drive/book-theory-test/BTT2support', function (req, res) {
  var otherSupport = req.session.data['support-other']
  if (otherSupport === 'yes-other') {
    return res.redirect('/forms/govuk-forms/learn-to-drive/book-theory-test/BTTthankyou')
  }
  res.redirect('/forms/govuk-forms/learn-to-drive/book-theory-test/BTT3find-centre')
})

router.get('forms/govuk-forms/learn-to-drive/book-theory-test/BTT2support', function (req, res) {
  req.session.otherSupport = null // this is set to null when we render the page to clear the data of this variable if we are coming back to that page with a value already set for it
  return res.render('forms/govuk-forms/learn-to-drive/book-theory-test/BTT2support')
})

// Book Driving test **************************************************************************

router.post('/forms/govuk-forms/learn-to-drive/book-driving-test/BDTsector', function (req, res) {
  var sector = req.session.data['sector'] 
  if (sector === 'other') {
    return res.redirect('/forms/govuk-forms/learn-to-drive/book-driving-test/BDTsorry')
  } else {
    return res.redirect('/forms/govuk-forms/learn-to-drive/book-driving-test/BDTreason')
  }
})

router.post('/forms/govuk-forms/learn-to-drive/book-driving-test/BDTreason', function (req, res) {
  var reason = req.session.data['reason'] 
  if (reason === 'other') {
    return res.redirect('/forms/govuk-forms/learn-to-drive/book-driving-test/BDTreason-text')
  } else {
    return res.redirect('/forms/govuk-forms/learn-to-drive/book-driving-test/BDTjob')
  }
})

router.post('/forms/govuk-forms/learn-to-drive/book-driving-test/BDTtestbooked', function (req, res) {
  var isCancelled = req.session.data['test-cancelled'] 
  if (isCancelled === 'yes') {
    return res.redirect('/forms/govuk-forms/learn-to-drive/book-driving-test/BDTcancelNumber')
  } else {
    return res.redirect('/forms/govuk-forms/learn-to-drive/book-driving-test/BDTtheoryNumber')
  }
})

// Universal Credit ***************************************************************************

router.post('/forms/govuk-forms/universal-credit/UCalreadyGetBenefit', function (req, res) {
  var hasRead = req.session.data['ucread']
  if (hasRead == "read") {
    return res.redirect('/forms/govuk-forms/universal-credit/UCyourDisabilityBenefit')
  }
  req.session.data['ucread'] = 'error'
  res.redirect('/forms/govuk-forms/universal-credit/UCalreadyGetBenefit')
})


router.post('/forms/govuk-forms/universal-credit/UCdisabilityBenefits', function (req, res) {
  var gettingDisabilityBenefits = req.session.data['getting-disability-benefits']
  if (gettingDisabilityBenefits === 'no') {
    req.session.uc_create_account_1st_time = true // this is set to true when we render the page the first time
    return res.redirect('/forms/govuk-forms/universal-credit/UCcreateAccount')
  }
  res.redirect('/forms/govuk-forms/universal-credit/UCyourDisabilityBenefit')
})

router.post('/forms/govuk-forms/universal-credit/UCyourDisabilityBenefit', function (req, res) {
  var yourDisabilityBenefit = req.session.data['your-disability-benefit']
  if (yourDisabilityBenefit === 'no') {
    req.session.uc_create_account_1st_time = true // this is set to true when we render the page the first time
    return res.redirect('/forms/govuk-forms/universal-credit/UCcreateAccount')
  }
  res.redirect('/forms/govuk-forms/universal-credit/UCyourPartner')
})

router.post('/forms/govuk-forms/universal-credit/UCyourPartner', function (req, res) {
  var yourPartner = req.session.data['your-partner']
  if (yourPartner === 'yes') {
    req.session.uc_create_account_1st_time = true // this is set to true when we render the page the first time
    return res.redirect('/forms/govuk-forms/universal-credit/UCcreateAccount')
  }
  res.redirect('/forms/govuk-forms/universal-credit/UCotherBenefits')
})

router.post('/forms/govuk-forms/universal-credit/UCotherBenefits', function (req, res) {
  var otherBenefits = req.session.data['other-benefits']
  if (otherBenefits === 'no') {
    req.session.uc_create_account_1st_time = true // this is set to true when we render the page the first time
    return res.redirect('/forms/govuk-forms/universal-credit/UCcreateAccount')
  }
  res.redirect('/forms/govuk-forms/universal-credit/UCsevere')
})

router.post('/forms/govuk-forms/universal-credit/UCsevere', function (req, res) {
  var severe= req.session.data['severe']
  if (severe === 'no') {
    req.session.uc_create_account_1st_time = true // this is set to true when we render the page the first time
    return res.redirect('/forms/govuk-forms/universal-credit/UCcreateAccount')
  }
  if (severe === 'dontknow') {
    return res.redirect('/forms/govuk-forms/universal-credit/UCcontactus')
  }
  res.redirect('/forms/govuk-forms/universal-credit/UCcannotClaim')
})

router.get('/forms/govuk-forms/universal-credit/UCcreateAccount', function (req, res) {
  if (req.session.uc_create_account_1st_time) {// first time we render the page, don't display any errors yet
    return res.render('forms/govuk-forms/universal-credit/UCcreateAccount', {error: false})
  } else {
    var regExpUsername = /[a-zA-Z0-9]{6,30}/;
    var regExpPassword= /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    var create_username = req.session.data ['username']
    var create_password = req.session.data ['password']
    var create_answwer1 = req.session.data ['answer1']
    var create_answwer2 = req.session.data ['answer2']
    var select_q1 = req.session.data ['question1']
    var select_q2 = req.session.data ['question2']
    var password_match = (req.session.data ['password2'] === create_password)
    var uc_error_create_account = ( // receive the value of all the potential errors on that page
      create_username === '' ||
      create_password === '' ||
      create_answwer1 === '' ||
      create_answwer2 === '' ||
      select_q1 === 'Please select a question' ||
      select_q2 === 'Please select a question' ||
      !password_match ||
      !regExpUsername.test(create_username)||
      !regExpPassword.test(create_password)
    )
    return res.render('forms/govuk-forms/universal-credit/UCcreateAccount', {error: uc_error_create_account})
  }
})

router.post('/forms/govuk-forms/universal-credit/UCcreateAccount', function (req, res) {
  req.session.uc_create_account_1st_time = false; // we have render that page once, we need to check if there is any errors now
  var regExpUsername = /[a-zA-Z0-9]{6,30}/;
  var regExpPassword= /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
  var create_username = req.session.data ['username']
  var create_password = req.session.data ['password']
  var create_answwer1 = req.session.data ['answer1']
  var create_answwer2 = req.session.data ['answer2']
  var select_q1 = req.session.data ['question1']
  var select_q2 = req.session.data ['question2']
  var password_match = (req.session.data ['password2'] === create_password)
  var uc_error_create_account = ( // receive the value of all the potential errors on that page
    create_username === '' ||
    create_password === '' ||
    create_answwer1 === '' ||
    create_answwer2 === '' ||
    select_q1 === 'Please select a question' ||
    select_q2 === 'Please select a question' ||
    !password_match ||
    !regExpUsername.test(create_username)||
    !regExpPassword.test(create_password)
  )
  if (uc_error_create_account){
    return res.redirect('/forms/govuk-forms/universal-credit/UCcreateAccount')
  } else {
    return res.redirect('/forms/govuk-forms/universal-credit/UCaboutYou')
  }
})

router.post('/forms/govuk-forms/universal-credit/UCforgotUsername', function (req, res) {
  var emailAddress = req.session.data['email-to-resend-username']
  var regExpEmail = /^[a-zA-Z0-9=*!$&_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (emailAddress === '' || !regExpEmail.test(emailAddress))
  {
    return res.redirect('/forms/govuk-forms/universal-credit/UCforgotUsernameError')
  }
  res.redirect('/forms/govuk-forms/universal-credit/UCforgotUsernameSent')
})

router.post('/forms/govuk-forms/universal-credit/UCforgotUsernameError', function (req, res) {
  var emailAddress = req.session.data['email-to-resend-username']
  var regExpEmail = /^[a-zA-Z0-9=*!$&_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (emailAddress === '' || !regExpEmail.test(emailAddress))
  {
    return res.redirect('/forms/govuk-forms/universal-credit/UCforgotUsernameError')
  }
  res.redirect('/forms/govuk-forms/universal-credit/UCforgotUsernameSent')
})

router.post('/forms/govuk-forms/universal-credit/UCsignIn', function (req, res) {
  var username_entered = req.session.data ['username-sign-in']
  var password_entered = req.session.data ['password-sign-in']

  if (username_entered && password_entered){
    return res.redirect('/forms/govuk-forms/universal-credit/UCsignedIn')
  } else {
    return res.redirect('/forms/govuk-forms/universal-credit/UCsignIn')
  }
})

// this is just so the value of the email address if entered can be stored and re-used on the next page
router.post('/forms/govuk-forms/universal-credit/UCaboutYou', function (req, res) {
  return res.redirect('/forms/govuk-forms/universal-credit/UCconfirmEmail')
})



// Universal credit - apply ******************************************************************************

// this is just so the value of the email address if entered can be stored and re-used on the next page
router.post('/forms/govuk-forms/universal-credit-apply/UCAsecurityQuestion', function (req, res) {
  //we create a session variable to know it's the first visit and another one to say we need to display green message about Previous address
  req.session.data['1st-display'] = true
  req.session.data['green-to-display'] = "previous-address"
  return res.redirect('/forms/govuk-forms/universal-credit-apply/UCAtoDoList')
})

router.post('/forms/govuk-forms/universal-credit-apply/UCAnationality', function (req, res) {
  req.session.data['nationality-done'] = true
  req.session.data['1st-display'] = false
  req.session.data['green-to-display'] = "nationality"
  return res.redirect('/forms/govuk-forms/universal-credit-apply/UCAtoDoList')
})

router.post('/forms/govuk-forms/universal-credit-apply/UCAeducation', function (req, res) {
  // we update the 1st display variable as it's not the 1st time any more so = false
  // we create a session variable to say education is done = true
  // we update the session variable for green to display when we load the to do list page
  req.session.data['education-done'] = true
  req.session.data['1st-display'] = false
  req.session.data['green-to-display'] = "education"
  return res.redirect('/forms/govuk-forms/universal-credit-apply/UCAtoDoList')
})

router.post('/forms/govuk-forms/universal-credit-apply/UCAcaring', function (req, res) {
  // we update the 1st display variable as it's not the 1st time any more so = false
  // we create a session variable to say caring is done = true
  // we update the session variable for green to display when we load the to do list page
  req.session.data['caring-done'] = true
  req.session.data['1st-display'] = false
  req.session.data['green-to-display'] = "caring"
  return res.redirect('/forms/govuk-forms/universal-credit-apply/UCAtoDoList')
})

router.post('/forms/govuk-forms/universal-credit-apply/UCAbank', function (req, res) {
  // we update the 1st display variable as it's not the 1st time any more so = false
  // we create a session variable to say bank is done = true
  // we update the session variable for green to display when we load the to do list page
  req.session.data['bank-done'] = true
  req.session.data['1st-display'] = false
  req.session.data['green-to-display'] = "bank"
  return res.redirect('/forms/govuk-forms/universal-credit-apply/UCAtoDoList')
})

router.post('/forms/govuk-forms/universal-credit-apply/UCAhousingWhereYouLive', function (req, res) {
  var whereYouLive = req.session.data['UC-where-you-live']
  if ((whereYouLive === 'rentFromCouncil') ||
      (whereYouLive === 'rentFromPrivateLandlord')
      ) {
        res.redirect('/forms/govuk-forms/universal-credit-apply/UCAhousingRentPayments')
      }
      if (whereYouLive === 'tempAcc'){
          res.redirect('/forms/govuk-forms/universal-credit-apply/UCAhousingTempAccommodation')
          } else {
                  res.redirect('/forms/govuk-forms/universal-credit-apply/UCAhousingNotSure')
                  }
})

router.post('/forms/govuk-forms/universal-credit-apply/UCAhousingTempAccommodation', function (req, res) {
  req.session.data['housing-done'] = true
  req.session.data['1st-display'] = false
  req.session.data['green-to-display'] = "housing"
  res.redirect('/forms/govuk-forms/universal-credit-apply/UCAtoDoList')
})

router.post('/forms/govuk-forms/universal-credit-apply/UCAhousingRentPayments', function (req, res) {
  req.session.data['housing-done'] = true
  req.session.data['1st-display'] = false
  req.session.data['green-to-display'] = "housing"
  res.redirect('/forms/govuk-forms/universal-credit-apply/UCAtoDoList')
})

router.post('/forms/govuk-forms/universal-credit-apply/UCAhousingNotSure', function (req, res) {
  req.session.data['housing-done'] = true
  req.session.data['1st-display'] = false
  req.session.data['green-to-display'] = "housing"
  res.redirect('/forms/govuk-forms/universal-credit-apply/UCAtoDoList')
})


router.post('/forms/govuk-forms/universal-credit-apply/UCAwithChildDetails', function (req, res) {
  req.session.data['withyou-done'] = true
  req.session.data['1st-display'] = false
  req.session.data['green-to-display'] = "withyou"
  res.redirect('/forms/govuk-forms/universal-credit-apply/UCAtoDoList')
})

router.post('/forms/govuk-forms/universal-credit-apply/UCAsavingsValue', function (req, res) {
  req.session.data['saving-done'] = true
  req.session.data['1st-display'] = false
  req.session.data['green-to-display'] = "saving"
  res.redirect('/forms/govuk-forms/universal-credit-apply/UCAtoDoList')
})

router.post('/forms/govuk-forms/universal-credit-apply/UCAincome', function (req, res) {
  req.session.data['income-done'] = true
  req.session.data['1st-display'] = false
  req.session.data['green-to-display'] = "income"
  res.redirect('/forms/govuk-forms/universal-credit-apply/UCAtoDoList')
})

router.post('/forms/govuk-forms/universal-credit-apply/UCAworkEarnings', function (req, res) {
  req.session.data['work-done'] = true
  req.session.data['1st-display'] = false
  req.session.data['green-to-display'] = "work"
  res.redirect('/forms/govuk-forms/universal-credit-apply/UCAtoDoList')
})

router.post('/forms/govuk-forms/universal-credit-apply/UCAhealthSupport', function (req, res) {
  req.session.data['health-done'] = true
  req.session.data['1st-display'] = false
  req.session.data['green-to-display'] = "health"
  res.redirect('/forms/govuk-forms/universal-credit-apply/UCAtoDoList')
})


// Report a repair ******************************************************************************

router.post('/forms/erc-forms/report-repair/RRonlineAboutYou', function (req, res) {
  var name_entered = req.session.data ['repair-name']
  var address_entered = req.session.data ['repair-address']
  var phone_entered = req.session.data ['repair-phone']
  var email_entered = req.session.data ['repair-email']
  var regExpEmail = /^[a-zA-Z0-9=*!$&_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  var all_entered = name_entered && address_entered && phone_entered && email_entered
  if (all_entered && regExpEmail.test(email_entered)) {
    res.redirect('/forms/erc-forms/report-repair/RRonlineRepairDetails')
  } else {
    res.redirect('/forms/erc-forms/report-repair/RRonlineAboutYou')
  }
})


router.post('/forms/erc-forms/report-repair/RRonlineRepairDetails', function (req, res) {
  var location_missing = req.session.data['repair-location'] === 'L0';
  var person_missing = req.session.data['repair-person'] === 'P0';
  var details_missing = req.session.data['repair-details'] === '';
  var something_mising =  person_missing || details_missing || location_missing;
  if (something_mising) {
    res.redirect('/forms/erc-forms/report-repair/RRonlineRepairDetails')
  } else {
    res.redirect('/forms/erc-forms/report-repair/RRonlineConfirmation')
  }
})

// Council tax form - register *****************************************************************

router.post('/forms/erc-forms/council-tax-online/register-for-council-tax/RCTstart', function (req, res) {
  var hasRead = req.session.data['rctread']
  if (hasRead == "read") {
    return res.redirect('/forms/erc-forms/council-tax-online/register-for-council-tax/RCTemailaddress')
  }
  req.session.data['rctread'] = 'error'
  res.redirect('/forms/erc-forms/council-tax-online/register-for-council-tax/RCTstart')
})

router.post('/forms/erc-forms/council-tax-online/register-for-council-tax/RCTemailaddress', function (req, res) {
  var email_entered = req.session.data ['registering-email']
  var regExpEmail = /^[a-zA-Z0-9=*!$&_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (email_entered && regExpEmail.test(email_entered)) {
    res.redirect('/forms/erc-forms/council-tax-online/register-for-council-tax/RCTconfirmCode')
  } else {
    res.redirect('/forms/erc-forms/council-tax-online/register-for-council-tax/RCTemailaddress')
  }
})

// Council tax form - sign up *****************************************************************

router.post('/forms/erc-forms/council-tax-online/sign-up-council-tax/SCTstart', function (req, res) {
  var username_entered = req.session.data ['sign-in-username']
  if (username_entered) {
    res.redirect('/forms/erc-forms/council-tax-online/sign-up-council-tax/SCTsigned-in')
  } else {
    res.redirect('/forms/erc-forms/council-tax-online/sign-up-council-tax/SCTstart')
  }
})


router.post('/forms/erc-forms/council-tax-online/sign-up-council-tax/SCTforgotBoth', function (req, res) {
  var name_entered = req.session.data ['ct-sign-name']
  var address_entered = req.session.data ['ct-sign-address']
  var phone_entered = req.session.data ['ct-sign-phone']
  var email_entered = req.session.data ['ct-sign-email']
  var regExpEmail = /^[a-zA-Z0-9=*!$&_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  var all_entered = name_entered && address_entered && phone_entered && email_entered
  if (all_entered && regExpEmail.test(email_entered)) {
    res.redirect('/forms/erc-forms/council-tax-online/sign-up-council-tax/SCTforgotBothSent')
  } else {
    res.redirect('/forms/erc-forms/council-tax-online/sign-up-council-tax/SCTforgotBoth')
  }
})

// Council tax form - pay *****************************************************************

router.get('/forms/erc-forms/council-tax-online/pay-council-tax/PCTpaymentEntry', function (req, res) {
  var used_cancel = req.session.data ['usedcancel']
  if (used_cancel) {
    // delete all session data
    req.session.data = {}
  }
  res.render('forms/erc-forms/council-tax-online/pay-council-tax/PCTpaymentEntry')
})

router.post('/forms/erc-forms/council-tax-online/pay-council-tax/PCTpaymentEntry', function (req, res) {
  req.session.data ['ct-payment-entry-cancelled'] = false
  var reference_entered = req.session.data ['ct-reference']
  var amount_entered = req.session.data ['ct-amount']
  var name_entered = req.session.data ['ct-name']
  var houseno_entered = req.session.data ['ct-houseno']
  var street_entered = req.session.data ['ct-street']
  var town_entered = req.session.data ['ct-town']
  var postcode_entered = req.session.data ['ct-postcode']
  var all_entered = reference_entered && amount_entered && name_entered && houseno_entered && street_entered && town_entered && postcode_entered
  if (all_entered) {
    res.redirect('/forms/erc-forms/council-tax-online/pay-council-tax/PCTpaymentAdded')
  } else {
    req.session.data ['usedcancel'] = false
    res.redirect('/forms/erc-forms/council-tax-online/pay-council-tax/PCTpaymentEntry')
  }
})

router.post('/forms/erc-forms/council-tax-online/pay-council-tax/PCTpayment', function (req, res) {
  var cardnumber_entered = req.session.data ['ct-cardnumber']
  var code_entered = req.session.data ['ct-security-code']
  var name_entered = req.session.data ['ct-name-on-card']
  var houseno_entered = req.session.data ['ct-houseno-on-card']
  var street_entered = req.session.data ['ct-street-on-card']
  var town_entered = req.session.data ['ct-town-on-card']
  var postcode_entered = req.session.data ['ct-postcode-on-card']
  var all_entered = cardnumber_entered && code_entered && name_entered && houseno_entered && street_entered && town_entered && postcode_entered
  if (all_entered) {
    res.redirect('/forms/erc-forms/council-tax-online/pay-council-tax/PCTpaymentAccepted')
  } else {
    res.redirect('/forms/erc-forms/council-tax-online/pay-council-tax/PCTpayment')
  }
})

// Pay rent form *****************************************************************

router.get('/forms/erc-forms/pay-rent/PRpaymentEntry', function (req, res) {
  var used_cancel = req.session.data ['usedcancel']
  if (used_cancel) {
    // delete all session data
    req.session.data = {}
  }
  res.render('forms/erc-forms/pay-rent/PRpaymentEntry')
})

router.post('/forms/erc-forms/pay-rent/PRpaymentEntry', function (req, res) {
  req.session.data ['pr-payment-entry-cancelled'] = false
  var reference_entered = req.session.data ['pr-reference']
  var amount_entered = req.session.data ['pr-amount']
  var name_entered = req.session.data ['pr-name']
  var houseno_entered = req.session.data ['pr-houseno']
  var street_entered = req.session.data ['pr-street']
  var town_entered = req.session.data ['pr-town']
  var postcode_entered = req.session.data ['pr-postcode']
  var all_entered = reference_entered && amount_entered && name_entered && houseno_entered && street_entered && town_entered && postcode_entered
  if (all_entered) {
    res.redirect('/forms/erc-forms/pay-rent/PRpaymentAdded')
  } else {
    req.session.data ['usedcancel'] = false
    res.redirect('/forms/erc-forms/pay-rent/PRpaymentEntry')
  }
})

router.post('/forms/erc-forms/pay-rent/PRpayment', function (req, res) {
  var cardnumber_entered = req.session.data ['pr-cardnumber']
  var code_entered = req.session.data ['pr-security-code']
  var name_entered = req.session.data ['pr-name-on-card']
  var houseno_entered = req.session.data ['pr-houseno-on-card']
  var street_entered = req.session.data ['pr-street-on-card']
  var town_entered = req.session.data ['pr-town-on-card']
  var postcode_entered = req.session.data ['pr-postcode-on-card']
  var all_entered = cardnumber_entered && code_entered && name_entered && houseno_entered && street_entered && town_entered && postcode_entered
  if (all_entered) {
    res.redirect('/forms/erc-forms/pay-rent/PRpaymentAccepted')
  } else {
    res.redirect('/forms/erc-forms/pay-rent/PRpayment')
  }
})

// Free school meals and clothing grants *****************************************************************

router.post('/forms/erc-forms/free-school-meals/FSMgeneralInfo', function (req, res) {
  var have_bank_account = req.session.data['have-bank-acc']
  // we are not testing living in East Renfewshire value because it doesn't change anything for the routing
  if (have_bank_account === 'yes') {
    return res.redirect('/forms/erc-forms/free-school-meals/FSMbenefits')
  }
  if (have_bank_account === 'no') {
    return res.redirect('/forms/erc-forms/free-school-meals/FSMnoBankAcc')
  }
  // give the variable a value so we know there is an error to display
  req.session.data['have-bank-acc'] = 'not-selected'
  res.redirect('/forms/erc-forms/free-school-meals/FSMgeneralInfo')
})

router.post('/forms/erc-forms/free-school-meals/FSMbenefits', function (req, res) {
  var benefit = req.session.data['fsm-benefits']
  var benefitNext = req.session.data['fsm-benefits-next']
// we test if all checkboxes are empty
  if (benefit || benefitNext)  {
    req.session.data['FSMqualify-prevPage'] = 'FSMbenefits'
    return res.redirect('/forms/erc-forms/free-school-meals/FSMqualify')
  }
  res.redirect('/forms/erc-forms/free-school-meals/FSMtaxCredits')
})

router.post('/forms/erc-forms/free-school-meals/FSMtaxCredits', function (req, res) {
  var tax = req.session.data['which-tax']
  var income = req.session.data['income']
if (income === 'more'){
  return res.redirect('/forms/erc-forms/free-school-meals/FSMcouncilTaxReduction')
}
if (income === 'less' ) {
  if (tax === 'neither') {
    return res.redirect('/forms/erc-forms/free-school-meals/FSMcouncilTaxReduction')
  } else {
    if (tax === 'child-tax-only' || tax === 'working-tax-too') {
      req.session.data['FSMqualify-prevPage'] = 'FSMtaxCredits'
      return res.redirect('/forms/erc-forms/free-school-meals/FSMqualify')
    }
    else {
       // give the variable a value so we know there is an error to display
        req.session.data['which-tax'] = 'tax-not-selected'
        res.redirect('/forms/erc-forms/free-school-meals/FSMtaxCredits')
    }
  }
}
if (income === 'between' ) {
  if (tax === 'neither') {
    return res.redirect('/forms/erc-forms/free-school-meals/FSMcouncilTaxReduction')
  } else {
    if (tax === 'child-tax-only' || tax === 'working-tax-too') {
      return res.redirect('/forms/erc-forms/free-school-meals/FSMqualify')
    }
    else {
       // give the variable a value so we know there is an error to display
        req.session.data['which-tax'] = 'tax-not-selected'
        res.redirect('/forms/erc-forms/free-school-meals/FSMtaxCredits')
    }
  }
}
// give the variables a value so we know there is an error to display
req.session.data['income'] = 'income-not-select'
res.redirect('/forms/erc-forms/free-school-meals/FSMtaxCredits')
})

// Ashir added routes for validation-------------------------------------------------------------

router.post('/forms/erc-forms/free-school-meals/FSMqualify', function (req, res) {
  req.session.data['FSMyourDetails-prevPage'] = 'FSMqualify'
  res.redirect('/forms/erc-forms/free-school-meals/FSMyourDetails')
})

router.post('/forms/erc-forms/free-school-meals/FSMqualifyClothingGrant', function (req, res) {
  req.session.data['FSMyourDetails-prevPage'] = 'FSMqualifyClothingGrant'
  res.redirect('/forms/erc-forms/free-school-meals/FSMyourDetails')
})


router.post('/forms/erc-forms/free-school-meals/FSMyourDetails', function (req, res) {
  let name = req.session.data['FSM-applicant-name']
  let address = req.session.data['FSM-applicant-address']
  let tel = req.session.data['FSM-applicant-tel-no']
  let email = req.session.data['FSM-applicant-email']
  let emailValid = true;
  req.session.data['FSMemailValid'] = 'true';
  let niNo = req.session.data['FSM-applicant-NI-no']

  var regExpEmail = /^[a-zA-Z0-9=*!$&_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (email === '' || !regExpEmail.test(email))
  {
    emailValid = false;
    req.session.data['FSMemailValid'] = 'false';
  }

  if(name === '' || address === '' || tel === '' || !emailValid || niNo === '') {
    req.session.data['FSMyourDetailsError'] = 'true';
    res.redirect('/forms/erc-forms/free-school-meals/FSMyourDetails')
  } else {
    req.session.data['FSMyourDetailsError'] = 'false';
    res.redirect('/forms/erc-forms/free-school-meals/FSMbankDetails')
  }
})

router.post('/forms/erc-forms/free-school-meals/FSMbankDetails', function (req, res) {
  let nameOfBank = req.session.data['FSM-bank-name']
  let accHolderName = req.session.data['FSM-acc-holder-name']
  let sortCode = req.session.data['FSM-sort-code']
  let accNo = req.session.data['FSM-bank-acc-no']


  if(nameOfBank === '' || accHolderName === '' || sortCode === '' || accNo === '') {
    req.session.data['FSMbankDetailsError'] = 'true';
    res.redirect('/forms/erc-forms/free-school-meals/FSMbankDetails')
  } else {
    req.session.data['FSMbankDetailsError'] = 'false';
    res.redirect('/forms/erc-forms/free-school-meals/FSMaboutChild')
  }
})

router.post('/forms/erc-forms/free-school-meals/FSMaboutChild', function (req, res) {
  let firstName = req.session.data['FSM-child-first-name']
  let surname = req.session.data['FSM-child-surname']
  let dob = req.session.data['FSM-child-dob']
  let sex = req.session.data['FSM-child-sex']
  let school = req.session.data['FSM-child-school']
  let sexInvalid = 'false';
  req.session.data['FSM-sexInvalid'] = 'false';

  if(sex !== 'male' && sex !== 'female') {
    sexInvalid = 'true'
    req.session.data['FSM-sexInvalid'] = 'true';
  }


  if(firstName === '' || surname === '' || dob === '' || sexInvalid === 'true' || school === '') {
    req.session.data['FSMaboutChildError'] = 'true';
    res.redirect('/forms/erc-forms/free-school-meals/FSMaboutChild')
  } else {
    req.session.data['FSMaboutChildError'] = 'false';
    res.redirect('/forms/erc-forms/free-school-meals/FSMsubmitted')
  }
})
// Ashir end ------------------------------------------------------------------------------------

router.post('/forms/erc-forms/free-school-meals/FSMcouncilTaxReduction', function (req, res) {
  var benefitExtra = req.session.data['fsm-benefits-extra']
// we test if one of the checkbox at list is checked
  if (benefitExtra) {
    return res.redirect('/forms/erc-forms/free-school-meals/FSMqualifyClothingGrant')
  }
  res.redirect('/forms/erc-forms/free-school-meals/FSMnoGrant')
})

// Bulb *****************************************************************

router.post('/forms/other-forms/bulb/bulb-intro', function (req, res) {
  var name = req.session.data['bulb-name']
  if (name === '') {
    res.redirect('/forms/other-forms/bulb/bulb-intro')
  }
  res.redirect('/forms/other-forms/bulb/bulb-signin')
})

router.post('/forms/other-forms/bulb/bulb-signin', function (req, res) {
  var email = req.session.data['bulb-email']
  if (email === '') {
    req.session.data['bulb-email'] = 'error'
    res.redirect('/forms/other-forms/bulb/bulb-signin')
  }
  res.redirect('/forms/other-forms/bulb/bulb-link-sent')
})


// Equality and diversity form *****************************************************************

router.post('/forms/erc-forms/equal-opportunities/age', function (req, res) {
  var age = req.session.data['age']
  if (age === '0-15') {
    return res.redirect('/forms/erc-forms/equal-opportunities/religion1')
  }
  res.redirect('/forms/erc-forms/equal-opportunities/status')
})

// CBL form **********************************************************************************

router.post('/forms/erc-forms/housing/CBLstart', function (req, res) {
  var isApplicant = req.session.data['is-applicant']
  if (isApplicant === 'no') {
    return res.redirect('/forms/erc-forms/housing/CBLrep-info')
  }
  res.redirect('/forms/erc-forms/housing/CBLdeclaration2')
})

router.post('/forms/erc-forms/housing/CBLrep-info', function (req, res) {
  var repInfo = req.session.data['permission']
  if (repInfo && repInfo.includes('agreed')
)  {
  return res.redirect('/forms/erc-forms/housing/CBLdeclaration2')
}
res.redirect('/forms/erc-forms/housing/CBLrep-info-error')
})

router.post('/forms/erc-forms/housing/CBLrep-info-error', function (req, res) {
  var repInfo = req.session.data['permission']
  if (repInfo && repInfo.includes('agreed')
)  {
  return res.redirect('/forms/erc-forms/housing/CBLdeclaration2')
}
res.redirect('/forms/erc-forms/housing/CBLrep-info-error')
})

router.post('/forms/erc-forms/housing/CBLdeclaration2', function (req, res) {
  var declaration = req.session.data['declaration2']
  if (declaration && declaration.includes('has-read')
)  {
  return res.redirect('/forms/erc-forms/housing/CBL16')
}
res.redirect('/forms/erc-forms/housing/CBLdeclaration2-error')
})

router.post('/forms/erc-forms/housing/CBLdeclaration2-error', function (req, res) {
  var declaration = req.session.data['declaration2']
  if (declaration && declaration.includes('has-read')
)  {
  return res.redirect('/forms/erc-forms/housing/CBL16')
}
res.redirect('/forms/erc-forms/housing/CBLdeclaration2-error')
})


router.post('/forms/erc-forms/housing/CBL16', function (req, res) {
  var is16 = req.session.data['is-16']
  if (is16 === 'no') {
    return res.redirect('/forms/erc-forms/housing/CBLout')
  }
  res.redirect('/forms/erc-forms/housing/CBLimmigration')
})

router.post('/forms/erc-forms/housing/CBLimmigration', function (req, res) {
  var immigrationControl = req.session.data['immigration']
  if (immigrationControl === 'no') {
    return res.redirect('/forms/erc-forms/housing/CBLhomeless-question')
  }
  res.redirect('/forms/erc-forms/housing/CBLrecourse')
})

router.post('/forms/erc-forms/housing/CBLrecourse', function (req, res) {
  var isrecourse = req.session.data['is-recourse']
  if (isrecourse === 'yes') {
    return res.redirect('/forms/erc-forms/housing/CBLout')
  }
  res.redirect('/forms/erc-forms/housing/CBLhomeless-question')
})

router.post('/forms/erc-forms/housing/CBLhomeless-question', function (req, res) {
  var homeless = req.session.data['homeless']
  if (homeless=== 'yes') {
    return res.redirect('/forms/erc-forms/housing/CBLhomeless')
  }
  res.redirect('/forms/erc-forms/housing/CBLaddress')
})

router.post('/forms/erc-forms/housing/CBLaddress', function (req, res) {
  res.redirect('/forms/erc-forms/housing/CBLaboutyou')
})

router.post('/forms/erc-forms/housing/CBLaboutyou', function (req, res) {
  res.redirect('/forms/erc-forms/housing/CBLcontact')
})


router.post('/forms/erc-forms/housing/CBLcontact', function (req, res) {
  res.redirect('/forms/erc-forms/housing/CBLdob')
})

router.post('/forms/erc-forms/housing/CBLcontact1', function (req, res) {
  res.redirect('/forms/erc-forms/housing/CBLdob')
})

router.post('/forms/erc-forms/housing/CBLdob', function (req, res) {
  res.redirect('/forms/erc-forms/housing/CBLgender')
})

router.post('/forms/erc-forms/housing/CBLgender', function (req, res) {
  res.redirect('/forms/erc-forms/housing/CBLsummary-aboutyou')
})

router.post('/forms/erc-forms/housing/CBLwho-moving', function (req, res) {
  res.redirect('/forms/erc-forms/housing/CBLliving-alone')
})

router.post('/forms/erc-forms/housing/CBLliving-alone', function (req, res) {
  var livingAlone = req.session.data['living-alone']
  var gender = req.session.data['gender-applicant']
  if (livingAlone === 'yes') {
    if (gender === 'male') {
      return res.redirect('/forms/erc-forms/housing/CBLother-children')
    }
    return res.redirect('/forms/erc-forms/housing/CBLbabies')
  }
  res.redirect('/forms/erc-forms/housing/CBLinfo-housed')
})


router.post('/forms/erc-forms/housing/CBLinfo-housed2', function (req, res) {
  var needAdd = req.session.data['need-add']
  if (needAdd ==='no') {
    return res.redirect('/forms/erc-forms/housing/CBLother-children')
  }
  return res.redirect('/forms/erc-forms/housing/CBLadd-person1-loop')
})


router.post('/forms/erc-forms/housing/CBLadd-person1-loop', function (req, res) {
  var addPerson2 = req.session.data['add-person2']
  if (addPerson2 === 'yes') {
    return res.redirect('/forms/erc-forms/housing/CBLadd-person2-loop')
  }
  res.redirect('/forms/erc-forms/housing/CBLbabies')
})

router.post('/forms/erc-forms/housing/CBLadd-person2-loop', function (req, res) {
  var addPerson3 = req.session.data['add-person3']
  if (addPerson3 === 'yes') {
    return res.redirect('/forms/erc-forms/housing/CBLadd-person3-loop')
  }
  res.redirect('/forms/erc-forms/housing/CBLbabies')
})

router.post('/forms/erc-forms/housing/CBLadd-person3-loop', function (req, res) {
  res.redirect('/forms/erc-forms/housing/CBLbabies')
})

router.post('/forms/erc-forms/housing/CBLbabies', function (req, res) {
  var livingAlone = req.session.data['living-alone']
  if (livingAlone === 'yes') {
    return res.redirect('/forms/erc-forms/housing/CBLother-children')
  }
  res.redirect('/forms/erc-forms/housing/CBLjoint')
})


router.post('/forms/erc-forms/housing/CBLjoint', function (req, res) {
  res.redirect('/forms/erc-forms/housing/CBLother-children')
})

router.post('/forms/erc-forms/housing/CBLother-children', function (req, res) {
  var otherChidren = req.session.data['other-children']
  if (otherChidren === 'yes') {
    return res.redirect('/forms/erc-forms/housing/CBLadd-child1-loop')
  }
  res.redirect('/forms/erc-forms/housing/CBLcurrent-address')
})

router.post('/forms/erc-forms/housing/CBLadd-child1-loop', function (req, res) {
  var addPerson2 = req.session.data['add-child2']
  if (addPerson2 === 'yes') {
    return res.redirect('/forms/erc-forms/housing/CBLadd-child2-loop')
  }
  res.redirect('/forms/erc-forms/housing/CBLcurrent-address')
})

router.post('/forms/erc-forms/housing/CBLadd-child2-loop', function (req, res) {
  res.redirect('/forms/erc-forms/housing/CBLcurrent-address')
})

router.post('/forms/erc-forms/housing/CBL5yearsadd-question', function (req, res) {
  var addAddress = req.session.data['add-address']
  var hasJoint = req.session.data['is-joint']
  if (addAddress === 'yes') {
    return res.redirect('/forms/erc-forms/housing/CBL5yearsadd')
  }
  if (hasJoint === 'yes'){
    return res.redirect('/forms/erc-forms/housing/CBLjoint-info')
  }
  res.redirect('/forms/erc-forms/housing/CBLlegal')
})

router.post('/forms/erc-forms/housing/CBL5yearsadd', function (req, res) {
  var addAddress2 = req.session.data['add-address2']
  var hasJoint = req.session.data['is-joint']
  if (addAddress2 === 'yes') {
    return res.redirect('/forms/erc-forms/housing/CBLaddress2-loop')
  }
  if (hasJoint === 'yes'){
    return res.redirect('/forms/erc-forms/housing/CBLjoint-info')
  }
  res.redirect('/forms/erc-forms/housing/CBLlegal')
})

router.post('/forms/erc-forms/housing/CBLaddress2-loop', function (req, res) {
  var hasJoint = req.session.data['is-joint']
  if (hasJoint === 'yes'){
    return res.redirect('/forms/erc-forms/housing/CBLjoint-info')
  }
  res.redirect('/forms/erc-forms/housing/CBLlegal')
})

router.post('/forms/erc-forms/housing/CBLjoint-info', function (req, res) {
  var sameAddresses = req.session.data['same-addresses']
  if (sameAddresses=== 'yes') {
    return res.redirect('/forms/erc-forms/housing/CBLlegal')
  }
  res.redirect('/forms/erc-forms/housing/CBL5yearsadd-joint')
})

router.post('/forms/erc-forms/housing/CBL5yearsadd-joint', function (req, res) {
  var addAddress2Joint = req.session.data['add-address2-joint']
  if (addAddress2Joint === 'yes') {
    return res.redirect('/forms/erc-forms/housing/CBLaddress2-loop-joint')
  }
  res.redirect('/forms/erc-forms/housing/CBLlegal')
})

router.post('/forms/erc-forms/housing/CBLaddress2-loop-joint', function (req, res) {
  res.redirect('/forms/erc-forms/housing/CBLlegal')
})

router.post('/forms/erc-forms/housing/CBLbedroom', function (req, res) {
  var notMoving = req.session.data['who-not-moving']
  if (notMoving === 'yes') {
    return res.redirect('/forms/erc-forms/housing/CBLbedroom-used')
  }
  res.redirect('/forms/erc-forms/housing/CBLreasons')
})

router.post('/forms/erc-forms/housing/CBLdeclaration1', function (req, res) {
  var know = req.session.data['know-erc']
  if (know === 'yes') {
    return res.redirect('/forms/erc-forms/housing/CBLdeclaration1-details')
  }
  res.redirect('/forms/erc-forms/housing/CBLextra-reason-abuse')
})

router.post('/forms/erc-forms/housing/CBLextra-reason-medical', function (req, res) {
  res.redirect('/forms/erc-forms/housing/CBLend')
})
// --------------------------------------- Patient access routes ------------------------------//

router.post('/forms/other-forms/patient-access/pa-intro', function (req, res) {
  var name = req.session.data['pa-account-name']
  if (name === '') {
    res.redirect('/forms/other-forms/patient-access/pa-intro')
  }
  res.redirect('/forms/other-forms/patient-access/pa-homepage')
})

router.post('/forms/other-forms/patient-access/pa-register', function (req, res) {
  res.redirect('/forms/other-forms/patient-access/pa-register2')
})

router.post('/forms/other-forms/patient-access/pa-register2', function (req, res) {
  res.redirect('/forms/other-forms/patient-access/pa-success')
})

router.post('/forms/other-forms/patient-access/pa-update-details', function (req, res) {
  res.redirect('/forms/other-forms/patient-access/pa-my-account')
})

router.post('/forms/other-forms/patient-access/pa-change-pwd', function (req, res) {
  res.redirect('/forms/other-forms/patient-access/pa-my-account')
})

router.post('/forms/other-forms/patient-access/pa-change-details', function (req, res) {
  res.redirect('/forms/other-forms/patient-access/pa-contact-details')
})

router.post('/forms/other-forms/patient-access/pa-reset-password', function (req, res) {
  res.redirect('/forms/other-forms/patient-access/pa-link-sent')
})

router.post('/forms/other-forms/patient-access/pa-signin', function (req, res) {
  res.redirect('/forms/other-forms/patient-access/pa-dashboard')
})

// ---------------------------------------- Best Start Grant routes ---------------------------//
router.post('/forms/sss-forms/best-start/BS-location', function (req, res) {
  var whereYouLive = req.session.data['BSG-location-name'];

  if ((whereYouLive === 'Scotland')) {
     res.redirect('/forms/sss-forms/best-start/BS-start');
  } else if (whereYouLive === 'eWNI') {
      res.redirect('/forms/sss-forms/best-start/BS-england');
  } else {
      res.redirect('/forms/sss-forms/best-start/BS-outside');
  }

})

router.post('/forms/sss-forms/best-start/BS-child-check-3', function (req, res) {
  var childCheck = req.session.data['pregnant-check'];

  if ((childCheck === 'yesBut')) {
     res.redirect('/forms/sss-forms/best-start/BS-bad');
  } else {
      res.redirect('/forms/sss-forms/best-start/BS-about-you');
  }

})

router.post('/forms/sss-forms/best-start/BS-start', function (req, res) {
  res.redirect('/forms/sss-forms/best-start/BS-child-check')
})

router.post('/forms/sss-forms/best-start/BS-child-check', function (req, res) {
  res.redirect('/forms/sss-forms/best-start/BS-child-check-2')
})

router.post('/forms/sss-forms/best-start/BS-child-check-2', function (req, res) {
  res.redirect('/forms/sss-forms/best-start/BS-pregnant')
})

router.post('/forms/sss-forms/best-start/BS-pregnant', function (req, res) {
  res.redirect('/forms/sss-forms/best-start/BS-child-check-3')
})

router.post('/forms/sss-forms/best-start/BS-about-you', function (req, res) {
  res.redirect('/forms/sss-forms/best-start/BS-your-details')
})

router.post('/forms/sss-forms/best-start/BS-your-details', function (req, res) {
  res.redirect('/forms/sss-forms/best-start/BS-your-address')
})

router.post('/forms/sss-forms/best-start/BS-your-address', function (req, res) {
  res.redirect('/forms/sss-forms/best-start/BS-sending-letters')
})

router.post('/forms/sss-forms/best-start/BS-sending-letters', function (req, res) {
  res.redirect('/forms/sss-forms/best-start/BS-partner')
})

router.post('/forms/sss-forms/best-start/BS-partner', function (req, res) {
  res.redirect('/forms/sss-forms/best-start/BS-partner-details')
})

router.post('/forms/sss-forms/best-start/BS-partner-details', function (req, res) {
  res.redirect('/forms/sss-forms/best-start/BS-about-child')
})

router.post('/forms/sss-forms/best-start/BS-about-child', function (req, res) {
  res.redirect('/forms/sss-forms/best-start/BS-pregnancy-details')
})

router.post('/forms/sss-forms/best-start/BS-pregnancy-details', function (req, res) {
  res.redirect('/forms/sss-forms/best-start/BS-pregnancy-due-date')
})

router.post('/forms/sss-forms/best-start/BS-pregnancy-due-date', function (req, res) {
  res.redirect('/forms/sss-forms/best-start/BS-baby-under-6mo')
})

router.post('/forms/sss-forms/best-start/BS-baby-under-6mo', function (req, res) {
  res.redirect('/forms/sss-forms/best-start/BS-baby-box')
})

router.post('/forms/sss-forms/best-start/BS-baby-box', function (req, res) {
  res.redirect('/forms/sss-forms/best-start/BS-child-under-6years')
})

router.post('/forms/sss-forms/best-start/BS-child-under-6years', function (req, res) {
  res.redirect('/forms/sss-forms/best-start/BS-other-children')
})

router.post('/forms/sss-forms/best-start/BS-other-children', function (req, res) {
  res.redirect('/forms/sss-forms/best-start/BS-contact-you')
})

router.post('/forms/sss-forms/best-start/BS-contact-you', function (req, res) {
  res.redirect('/forms/sss-forms/best-start/BS-contact-details')
})

router.post('/forms/sss-forms/best-start/BS-contact-details', function (req, res) {
  res.redirect('/forms/sss-forms/best-start/BS-notifications')
})

router.post('/forms/sss-forms/best-start/BS-notifications', function (req, res) {
  res.redirect('/forms/sss-forms/best-start/BS-letters')
})

router.post('/forms/sss-forms/best-start/BS-letters', function (req, res) {
  res.redirect('/forms/sss-forms/best-start/BS-language')
})

router.post('/forms/sss-forms/best-start/BS-language', function (req, res) {
  res.redirect('/forms/sss-forms/best-start/BS-payment-details')
})

router.post('/forms/sss-forms/best-start/BS-payment-details', function (req, res) {
  res.redirect('/forms/sss-forms/best-start/BS-payment-account')
})

router.post('/forms/sss-forms/best-start/BS-payment-account', function (req, res) {
  res.redirect('/forms/sss-forms/best-start/BS-anything-else')
})

router.post('/forms/sss-forms/best-start/BS-anything-else', function (req, res) {
  res.redirect('/forms/sss-forms/best-start/BS-check-answers')
})

// ---------------------------------------- Job application routes ---------------------------//

router.post('/forms/other-forms/job/job-personal-details', function (req, res) {
  res.redirect('/forms/other-forms/job/job-contact')
})

router.post('/forms/other-forms/job/job-contact', function (req, res) {
  res.redirect('/forms/other-forms/job/job-work-rights')
})

router.post('/forms/other-forms/job/job-work-rights', function (req, res) {
  res.redirect('/forms/other-forms/job/job-partB')
})

router.post('/forms/other-forms/job/job-declaration', function (req, res) {
  var agreed = req.session.data['job-read']
  if (agreed && agreed.includes('Yes')) {
    return res.redirect('/forms/other-forms/job/job-partC')
  }
  req.session.data['job-read'] = 'error'
  res.redirect('/forms/other-forms/job/job-declaration')
})

router.post('/forms/other-forms/job/job-qualifications', function (req, res) {
  res.redirect('/forms/other-forms/job/job-membership')
})

router.post('/forms/other-forms/job/job-membership', function (req, res) {
  res.redirect('/forms/other-forms/job/job-post')
})

router.post('/forms/other-forms/job/job-post', function (req, res) {
  res.redirect('/forms/other-forms/job/job-history')
})

router.post('/forms/other-forms/job/job-history', function (req, res) {
  res.redirect('/forms/other-forms/job/job-referees')
})

router.post('/forms/other-forms/job/job-referees', function (req, res) {
  res.redirect('/forms/other-forms/job/job-disability')
})

router.post('/forms/other-forms/job/job-disability', function (req, res) {
  res.redirect('/forms/other-forms/job/job-driving')
})

router.post('/forms/other-forms/job/job-driving', function (req, res) {
  res.redirect('/forms/other-forms/job/job-statement')
})

router.post('/forms/other-forms/job/job-statement', function (req, res) {
  res.redirect('/forms/other-forms/job/job-partD')
})
