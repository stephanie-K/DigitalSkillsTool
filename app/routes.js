const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

module.exports = router

// Equality and diversity form *****************************************************************

router.post('/forms/erc-forms/equal-opportunities/age', function (req, res) {
    var age = req.session.data['age']
    if (age === '0-15') {
        return res.redirect('/forms/erc-forms/equal-opportunities/religion1')
    }
    res.redirect('/forms/erc-forms/equal-opportunities/status')
  })

  // CBL form **********************************************************************************

router.post('/forms/erc-forms/housing/CBLapplicant', function (req, res) {
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
  