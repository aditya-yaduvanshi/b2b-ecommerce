const router = require('express').Router()
const { Accounts } = require('../accounts/views')
const Products = require('../../dao/products')
const { Orders } = require('../../dao/orders')


router.post('/accounts/add', async (req,res) => {
  try {
    let accToken = req.headers.authorization
    if(await Accounts.isAdminAuth(accToken)){
      let result = await Accounts.create(req.body)
      return res.status(result.stats).json({
        "ok": result.ok,
        "msg": result.msg
      })
    } else {
      return res.status(401).json({
        "ok": 0,
        "msg": "Could not authenticate you please login again!"
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

router.get('/orders', async (req,res) => {
  try {
    let accToken = req.headers.authorization
    if(await Accounts.isAdminAuth(accToken)){
      let result = await Orders.list()
      if(result.ok){
        return res.status(result.stats).json({
          "ok": 1,
          "orders": result.orders
        })
      } else {
        return res.status(result.stats).json({
          "ok": 0,
          "msg": result.msg
        })
      }
    } else {
      return res.status(401).json({
        "ok": 0,
        "msg": "Could not authenticate you please login again!"
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

router.post('/products/add', async (req,res) => {
  try {
    let accToken = req.headers.authorization
    if(await Accounts.isAdminAuth(accToken)){
      let result = await Products.add(req.body)
      return res.status(result.stats).json({
        "ok": result.ok,
        "msg": result.msg
      })
    } else {
      return res.status(401).json({
        "ok": 0,
        "msg": "Could not authenticate you please login again!"
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


module.exports = router