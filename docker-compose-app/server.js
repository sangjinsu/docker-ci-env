const express = require('express')
const redis = require('redis')

const PORT = 8080

const client = redis.createClient({
  host: 'redis-server',
  prot: 6379,
})

const app = express()

client.set('number', 0)

app.get('/', (req, res) => {
  client.get('number', (err, number) => {
    res.send('숫자가 1씩 증가합니다. ' + number)
    client.set('number', parseInt(number) + 1)
  })
})

app.listen(PORT, () => {
  console.log('Server start in http://localhost:' + PORT)
})
