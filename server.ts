<<<<<<< HEAD
import express from 'express';
=======
import express from 'express'
import routes from './src/routes';
>>>>>>> 59753fa9e57f5f597bfe488bd52251e02b2aa903

const app = express()
const PORT = 3000

app.use('/api',routes);

app.listen(PORT, () => {
    console.log(`Server rodando em http://localhost:${PORT}`);
})