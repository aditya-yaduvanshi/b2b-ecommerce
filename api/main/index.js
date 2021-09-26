const router = require('express').Router()
const Products = require('../../dao/products')
const { Orders } = require('../../dao/orders')
const { Accounts } = require('../accounts/views')


router.get('/products', async (req,res) => {
  let result = await Products.list()
  if(result.ok){
    return res.json({
      "ok": 1,
      "products": result.products
    })
  } else {
    return res.json({
      "ok": 0,
      "msg": result.msg
    })
  }
})

router.get('/products/:id', async (req,res) => {
  let result = await Products.get(req.params.id)
  if(result.ok) {
    return res.status(result.stats).json({
      "ok": 1,
      "product": result.product
    })
  } else {
    return res.status(result.stats).json({
      "ok": 0,
      "msg": result.msg
    })
  }
})

router.post('/orders/new', async (req,res) => {
  try {
    let accToken = req.headers.authorization
    if(await Accounts.isAuth(accToken)){
      let order = req.body, 
      result = await Orders.create(order.product, order.buyer, order.address)
      if(result.ok){
        return res.status(result.stats).json({
          "ok": 1,
          "msg": result.msg,
          "order": result.order
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
      "msg": "Order cannot be placed please try again later!"
    })
  }
})

router.get('/:userId/orders', async (req,res) => {
  try {
    let accToken = req.headers.authorization
    if(await Accounts.isAuth(accToken)){
      let result = await Orders.list(req.params.userId)
      if(result.ok) {
        return res.status(result.stats).json({
          "ok": 1,
          "orders": result.orders
        })
      } else {
        return res.json({
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
      "msg": "Orders cannot be loaded please try again later!"
    })
  }
})

router.get('/orders/:id', async (req,res) => {
  try {
    let accToken = req.headers.authorization
    if(await Accounts.isAuth(accToken)){
      let result = await Orders.get(req.params.id)
      if(result.ok) {
        return res.status(result.stats).json({
          "ok": 1,
          "order": result.order
        })
      } else {
        return res.status(404).json({
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
      "msg": "Order details cannot loaded please try again later!"
    })
  }
})


module.exports = router