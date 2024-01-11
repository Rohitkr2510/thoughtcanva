const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');

const sequelize = require('./util/database');
const Post = require('./models/post');
const User = require('./models/user')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images');
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4())
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }

}


const authRoutes = require('./routes/auth');
const feedRoutes = require('./routes/feed');

const app = express();

//app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json())
app.use(
    multer({ storage: storage, fileFilter: fileFilter }).single('image')
)
app.use('/images', express.static(path.join(__dirname, 'images')))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use('/feed', feedRoutes);
app.use('/auth', authRoutes)

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data })
})

Post.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Post);

sequelize
//   .sync({force: true})
  .sync()
  .then(result => {
    console.log('connected to server')
    const server = app.listen(8080);
    const io = require('./socket').init(server)
    io.on('connection', socket => {
        console.log('Client connected');
    })
})
.catch(err => console.log(err));

// mongoose.connect(MONGODB_URI)
//     .then(result => {
//         console.log('connected to server')
//         const server = app.listen(8080);
//         const io = require('./socket').init(server)
//         io.on('connection', socket => {
//             console.log('Client connected');
//         })
//     })
//     .catch(err => console.log(err));