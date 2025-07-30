require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const treatmentRoutes = require('./routes/treatments');
const dateTimeRoutes = require('./routes/dateTime');
const sendEmailRoutes = require('./routes/sendEmail');
const bookingRoutes = require('./routes/booking');

const app = express();

const corsOptions = {
    origin: ['https://bookmyhair.netlify.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/treatments', treatmentRoutes);
app.use('/api/dateTime', dateTimeRoutes);
app.use('/api/sendEmail', sendEmailRoutes);
app.use('/api/booking', bookingRoutes);


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
    res.send('Frisörbokning backend är igång!');
});

app.listen(PORT, () => {
    console.log(`Servern kör på port ${PORT}`);
});