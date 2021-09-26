const Product = require('./models')


class Products {
  static async list () {
    try {
      let products = await Product.find({})
      return {
        ok: 1,
        stats: 200,
        products: products
      }
    } catch (err) {
      console.log(err)
      return {
        ok: 0,
        stats: 500,
        msg: "Failed to load products!"
      }
    }
  }

  static async get (prodId) {
    try {
      let product = await Product.findById(prodId)
      return {
        ok: 1,
        stats: 200,
        product: await product
      }
    } catch (err) {
      console.log(err)
      return {
        ok: 0,
        stats: 404,
        msg: "Product not found!"
      }
    }
  }

  static async add (product) {
    try {
      if(!product.name || 
        !product.price || 
        !product.brand || 
        !product.currency || 
        !product.stock || 
        !product.specs || 
        !product.sellerId) {
          return {
            ok: 0,
            stats: 400,
            msg: "All are fields are required!"
          }
        }
      let newProduct = new Product({
        name: product.name,
        brand: product.brand,
        price: product.price,
        currency: product.currency,
        stock: product.stock,
        specs: product.specs,
        seller: product.sellerId
      })
      let ok = await newProduct.save()
      if(await ok) {
        return {
          ok: 1,
          stats: 200,
          msg: "Product added successfully!"
        }
      }
    } catch (err) {
      console.log(err)
      return {
        ok: 0,
        stats: 500,
        msg: "Product cannot be added!"
      }
    }
  }
}

module.exports = Products