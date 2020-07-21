const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

module.exports = router


//  enter your new routes here *****************************************************************

// Register to Vote ****************************************************************************
router.post('/forms/govuk-forms/register-to-vote/RTVCountryOfResidence', function (req, res) {
  var wheredoyouliveSelected = req.session.data['where-do-you-live']
  if (wheredoyouliveSelected  === 'england','scotland','wales', 'northern-ireland') {
      return res.redirect('/forms/govuk-forms/register-to-vote/RTVNationality')
  }
  if (wheredoyouliveSelected  === 'abroad-england','abroad-scotland','abroad-wales', 'abroad-northern-ireland') {
    return res.redirect('/forms/govuk-forms/register-to-vote/RTVDateOfBirth')
}
  res.redirect('/forms/govuk-forms/register-to-vote/RTVDateOfBirth')
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

router.post('/forms/other-forms/patient-access/pa-register2', function (req, res) {
  var email = req.session.data['pa-email']
  res.redirect('/forms/other-forms/patient-access/pa-success')
})


// ---------------------------------------- Best Start Grant routes ---------------------------//
router.post('/forms/sss-forms/best-start/BS-location', function (req, res) {
  var whereYouLive = req.session.data['BSG-location-name'];

  if ((whereYouLive === 'scotland')) {
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
