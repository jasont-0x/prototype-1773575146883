const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

function generateReference (prefix) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let ref = prefix + '-'
  for (let i = 0; i < 8; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)]
  }
  return ref
}

router.get('/', function (req, res) {
  res.redirect('/start')
})

router.get('/vehicle-registration', function (req, res) {
  res.render('vehicle-registration')
})

router.post('/vehicle-registration', function (req, res) {
  const answer = req.session.data['vehicle-registration']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'vehicle-registration': 'Enter your vehicle registration number.' }
    return res.render('vehicle-registration')
  }
  res.redirect('/vehicle-owner')
})

router.get('/vehicle-owner', function (req, res) {
  res.render('vehicle-owner')
})

router.post('/vehicle-owner', function (req, res) {
  const answer = req.session.data['vehicle-owner']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'vehicle-owner': 'Select yes if you are the registered keeper.' }
    return res.render('vehicle-owner')
  }
  if (answer === 'no') {
    return res.redirect('/ineligible-vehicle-owner')
  }
  res.redirect('/check-answers')
})

router.get('/ineligible-vehicle-owner', function (req, res) {
  res.render('ineligible-vehicle-owner')
})

router.get('/check-answers', function (req, res) {
  res.render('check-answers')
})

router.post('/check-answers', function (req, res) {
  if (!req.session.data['reference']) {
    req.session.data['reference'] = generateReference('FPN')
  }
  res.redirect('/confirmation')
})

router.get('/confirmation', function (req, res) {
  res.render('confirmation')
})

module.exports = router
