const AccountSchema = require('./models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const tokenKey = process.env.TOKEN_KEY
const saltRounds = 10


class Accounts {

  static async login (userData) {
    try {
      let email = (await isEmail(userData.username)) ? userData.username : null,
      phone = (await isPhone(userData.username)) ? userData.username : null,
      password = userData.password
      if(email) {
        let user = await AccountSchema.findOne({email}),
        match = await bcrypt.compare(password,user.password),
        accToken = await genAccToken(user.email),
        refToken = await genRefToken(user.phone)
        if(match===true) {
          user.access = accToken
          user.refresh = refToken
          let ok = await user.save()
          if(ok) {
            return {
              ok: 1,
              stats: 200,
              refresh: refToken,
              access: accToken,
            }
          }
        } else {
          throw new Error('Invalid username or password!')
        }
      } else if (phone) {
        let user = await AccountSchema.findOne({phone}),
        match = await bcrypt.compare(password,user.password),
        accToken = await genAccToken(user.email),
        refToken = await genRefToken(user.phone)
        if(match===true) {
          user.access = accToken
          user.refresh = refToken
          let ok = await user.save()
          if(ok) {
            return {
              ok: 1,
              stats: 200,
              refresh: refToken,
              access: accToken,
            }
          }
        } else {
          throw new Error('Invalid username or password!')
        }
      } else {
        throw new Error('Invalid username or password!')
      }
    } catch (err) {
      console.log(err)
      return {
        ok: 0,
        stats: 400,
        msg: "Invalid username or password!"
      }
    }
  }

  static async create (newUser) {
    try {
      if (!newUser.name) {
        return {
          ok: 0,
          stats: 400,
          msg: "Name cannot be empty!"
        }
      } else if (!(await isPhone(newUser.phone))) {
        return {
          ok: 0,
          stats: 400,
          msg: "Invalid phone number!"
        }
      } else if(!(await isEmail(newUser.email))) {
        return {
          ok: 0,
          stats: 400,
          msg: "Invalid email address!"
        }
      } else if (newUser.password.length < 6 && newUser.password === newUser.confirmPassword) {
        return {
          ok: 0,
          stats: 400,
          msg: "Password do not matches or less than 6 characters!"
        }
      } else if (await AccountSchema.findOne({email: newUser.email})) {
        return {
          ok: 0,
          stats: 400,
          msg: "Email address is already registered with another account!"
        }
      } else if (await AccountSchema.findOne({phone: newUser.phone})) {
        return {
          ok: 0,
          stats: 400,
          msg: "Phone number is already registered with another account!"
        }
      } else {
        let passHash = await genHash(newUser.password), ok
        if(passHash) {
          let newAcc = new AccountSchema({
            name: newUser.name,
            email: newUser.email,
            phone: newUser.phone,
            password: passHash,
            superUser: (newUser.superUser===true ? true : false)
          })
          ok = await newAcc.save()
        }
        if(await ok){
          return {
            ok: 1,
            stats: 200,
            msg: "Account created successfully!"
          }
        }else {
          return {
            ok: 0,
            stats: 500,
            msg: "Account cannot be created please try again later!"
          }
        }
      }
    } catch (err) {
      console.log(err)
      return {
        ok: 0,
        stats: 500,
        msg: "Account cannot be created please try again later!"
      }
    }
  }

  static async isAdminAuth (accToken) {
    try {
      let userObj = jwt.verify(accToken,tokenKey, (err, user) => {
        console.log(err)
        return user 
      }),
      user = await AccountSchema.findOne({email: userObj.username})
      if(user && user.superUser)
        return true
      else 
        return false
    } catch (err) {
      console.log(err)
      return false
    }
  }

  static async isAuth (accToken) {
    try {
      let userObj = await verifyToken(accToken),
      user = await AccountSchema.findOne({email: userObj.username})
      if(user)
        return true
      else 
        return false
    } catch (err) {
      console.log(err)
      return false
    }
  }
}




async function genHash (pass) {
  let hash = bcrypt.hashSync(pass,saltRounds,(err,hash)=>{
    console.log(err)
    return hash
  })
  return hash
}

async function genAccToken (username) {
  return jwt.sign({username},tokenKey, { expiresIn: '7200s' })
}

async function genRefToken (username) {
  return jwt.sign({username},tokenKey, { expiresIn: '54000s' })
}

async function verifyToken (token) {
  let usr = jwt.verify(token,tokenKey, (err, user) => {
    if(err) 
      console.log(err)
    return user 
  })
  return usr
} 

async function isEmail (email) {
  let mail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return mail.test(String(email).toLowerCase())
}

async function isPhone (phone) {
  let num = /^\d{10}$/
  return num.test(String(phone).toLowerCase())
}


module.exports = { 
  Accounts,
  isPhone,
  isEmail,
  genAccToken,
  genRefToken,
  verifyToken,
  genHash
}