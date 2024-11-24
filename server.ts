import express from 'express'
import cors from 'cors'
import routes from './src/routes';
import swaggerUi from 'swagger-ui-express'
import swaggerFile from './src/swagger.json'

const app = express()
app.use(cors())
const PORT = 3000
app.use(express.json())

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use('/',routes);

app.listen(PORT, () => {
    console.log(`Server rodando em http://localhost:${PORT}`);
})