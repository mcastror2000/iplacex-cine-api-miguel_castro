import {MongoClient, ServerApiVersion} from 'mongodb'

const uri = 'mongodb+srv://usuario1:usuario1@eva-u3-express.y3vgi.mongodb.net/?retryWrites=true&w=majority&appName=eva-u3-express'
const client = new MongoClient(uri, {
    serverApi:{version:ServerApiVersion.v1,
        strict:true,
        deprecationErrors: true
    }
})

export default client