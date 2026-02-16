import express from 'express'
import { port } from '../config/config.service.js'
import { authentiacteDB } from './DB/connection.js'
import { bookCrud } from './modules/books/index.js'
import { collectionsCrud } from './modules/collections/index.js'
import { logsCrud } from './modules/logs/index.js'

const app=express()

const appBootstrap=async()=>{
    app.use(express.json())
    app.use('/books',bookCrud)
    app.use('/collections',collectionsCrud)
    app.use('/logs',logsCrud)
    await authentiacteDB()
    app.get('/',(req,res,next)=>{
        res.status(200).json({message:'welcome from server'})
    })
    app.listen(port,()=>{
        console.log(`server is running on ${port} `)
    })
}

export default appBootstrap