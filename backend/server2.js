require('./config/db')

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const usersRouter = require('./routes/users');

const bodyParser = require('express').json;
app.user(bodyParser());

app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});