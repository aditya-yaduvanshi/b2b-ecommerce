const Order = require('./models')


class Orders {
  static async list (userId=null) {
    try {
      let orders = await Order.find(userId ? { buyer: userId } : {})
      return {
        ok: 1,
        stats: 200,
        orders: orders 
      }
    } catch (err) {
      console.log(err)
      return {
        ok: 0,
        stats: 500,
        msg: "Orders cannot not be loaded!"
      }
    }
  }

  static async get (orderId) {
    try {
      let order = await Order.findById(orderId)
      return {
        ok: 1,
        stats: 200,
        order: await order
      }
    } catch (err) {
      console.log(err)
      return {
        ok: 0,
        stats: 404,
        msg: "Order details not found!"
      }
    }
  }

  static async create (prodId, buyerId, address) {
    try {
      if(await isPincode(address.pincode)){
        let newOrder = new Order({
          product: prodId,
          buyer: buyerId,
          address
        })
        let order = await newOrder.save()
        if(await order){
          return {
            ok: 1,
            stats: 200,
            msg: "Order placed successfully!",
            order: order
          }
        }
      } else {
        return {
          ok: 0,
          stats: 400,
          msg: "Invalid pincode"
        }
      }
    } catch (err) {
      console.log(err)
      return {
        ok: 0,
        stats: 500,
        msg: "Order cannot be placed please try again!"
      }
    }
  }
}


async function isPincode (pin) {
  let code = /^\d{6}$/
  return Number(code.test(String(pin).toLowerCase()))
}



module.exports = {
  Orders,
  isPincode
}