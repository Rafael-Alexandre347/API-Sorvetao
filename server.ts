import express from 'express'
import routes from './src/routes';

const app = express()
const PORT = 3000
app.use(express.json())

app.use('/',routes);

app.listen(PORT, () => {
    console.log(`Server rodando em http://localhost:${PORT}`);
})