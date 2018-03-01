import { MongoClient } from 'mongodb'

const URL = 'mongodb://localhost:27017'

export let db

export function connect() {
    MongoClient.connect(URL, (err, client) => {
        if (err) {
            console.error('Could not connect to db')
            return
        }

        console.log('Connected successfully to db')

        db = client.db('wcp')
    })
}
