import 'dotenv/config'

import cors from 'cors'
import express from 'express'
import BullBoard from 'bull-board'

import Queue from "./lib/Queue"
import UserController from "./app/controllers/UserController"

const app = express()

BullBoard.setQueues(Queue.queues.map(({bull}) => bull))

app.use(express.json())
app.use(cors())

app.post('/users', UserController.store)

app.use('/admin/queues', BullBoard.UI)

app.listen(3333, () => {
    console.log(`Server running on http://localhost:3333`)
})