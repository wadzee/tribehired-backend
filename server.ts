import express from 'express'
import * as routes from 'src/routers'

const app = express()
const port = 3000

routes.init(app)
app.listen(port, () => console.log(`Node running in port ${port}`))
