import express from 'express';

import usersRouter from './routes/users.router.js'

const PORT = 4000;
const app = express();
app.use( express.json());
app.use( express.static('public'));

app.use('/api/users', usersRouter);

app.listen(PORT, () => {
    console.log(`Servidor Web con Express en el puerto ${PORT}`);
});