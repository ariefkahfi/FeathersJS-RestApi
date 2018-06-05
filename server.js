const feathers = require('@feathersjs/feathers')
const express = require('@feathersjs/express')
const service = require('feathers-sequelize')
const errors = require('@feathersjs/errors')
const PersonModel = require('./models/person')

const app = express(feathers())





app.use(express.json())
app.configure(express.rest())
app.use('api/person', service({
    Model:new PersonModel().Person,
    id: 'person_id'
}))

app.service('api/person').hooks({
    after:{
        create:(hookCtx)=>{ 
            console.log('after_create::','hook')
            hookCtx.statusCode = 200
            hookCtx.result = {
                msg:'Success create new person',
                code: 200,
                type:'OK'
            }
            return hookCtx
        },
        find:(hookCtx)=>{
            let currentResult = hookCtx.result
            hookCtx.result = {
                msg:currentResult,
                code:200,
                type: 'OK'
            }
        }
    },
    error:{
        create:(hookCtx)=>{
            console.log('error_create::','hook')
            hookCtx.statusCode = 400
            hookCtx.result = {
                code: 400,
                msg:'Error create new request',
                type:'Bad Request'
            }
            return hookCtx
        }
    }
})

app.listen(9600,()=> console.log('Rest API server on 9600'))


