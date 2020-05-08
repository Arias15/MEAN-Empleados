const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();



const { mongoose } = require('./database');

//settings
app.set('port', process.env.PORT || 3000 );

//Middlewares
app.use(morgan('dev'));
app.use(cors({origin: 'http://localhost:4200'}));
app.use(express.json());

//Routers
app.use('/api/empleados',require('./routers/empleados.routes'));

app.listen(app.get('port'), () =>{
    console.log(`server on port ${app.get('port')}`);
});