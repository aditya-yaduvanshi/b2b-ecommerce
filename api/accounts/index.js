const router = require('express').Router()
const { Accounts } = require('./views')


router.post('/create', async (req,res) => {
  try {
    let user = req.body,
    result = await Accounts.create(user)
    if(result){
      return res.status(result.stats).json({
        "ok": result.ok,
        "msg": result.msg
      })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      "ok": 0,
      "msg": "Account cannot be created please try again later!"
    })
  }
})

router.post('/login', async (req,res) => {
  try { 
    let result = await Accounts.login(req.body)
    if(result.ok) {
      return res.status(result.stats).json({
        "ok": 1,
        "refresh": result.refresh,
        "access": result.access
      })
    } else {
      return res.status(result.stats).json({
        "ok": 0,
        "msg": result.msg
      })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      "ok": 0,
      "msg": "Cannot login please try again later!"
    })
  }
})


module.exports = router