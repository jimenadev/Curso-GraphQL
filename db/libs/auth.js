const jwt = require('jsonwebtoken')
const UserModel = require('../models/user')
const secret = require('./env').secret

module.exports ={
    async function({req}){
        let token = null
        let currentUser = null

        token = req.headers["Authorization"]

        if(!token) return {}

        const decodeInfo = jwt.verify(token, secret)

        if(token && decodeInfo){
            currentUser = await UserModel.findById(decodeInfo.id)

            if(!currentUser) throw new Error('Invalid token')
        }

        if(!currentUser) throw new Error('Needs Token')


        return {
            token, currentUser
        }


      }
}