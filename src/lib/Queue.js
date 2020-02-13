import Queue from 'bull'
import { init, captureException } from '@sentry/node'
import redisConfig from "../../config/redis"
import * as jobs from "../app/jobs"

init({ dsn: 'https://a6db4d93ffc34dbdb178198b198f44bd@sentry.io/2495632' });

const queues = Object
  .values(jobs)
  .map(({key, handle}) => ({
    handle,
    name: key,
    bull: new Queue(key, redisConfig),
  }))

export default {
  queues,
  add(name, data) {
    const queue = this.queues.find(queue => queue.name === name)

    return queue.bull.add(data)
  },
  process(){
    return this.queues.forEach(queue => {
      queue.bull.process(queue.handle)

      queue.bull.on('failed', (job, err) => {
        captureException(err)
      })

    })
  }
}