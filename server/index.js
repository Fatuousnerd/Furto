const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();

app.use(cors({
    origin: '*',
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

//Import Routes


mongoose.connect(`${process.env.CONNECTION_STRING_LOCALHOST}/${process.env.DB}`,)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('MongoDB connection error', err));

//Use Routes


app.listen(process.env.PORT, () => {
    console.log(`Server is running. Port: ${process.env.PORT}`);
});