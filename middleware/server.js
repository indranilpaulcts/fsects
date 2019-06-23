// Import section
const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/server-config');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const crypto = require('crypto');
const path = require('path');

// Create express app
const app = express();

// Allows cross-origin domains to access this API
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin' , config.server.clienthosturi);
    res.append('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.append("Access-Control-Allow-Headers", "Origin, Accept,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.append('Access-Control-Allow-Credentials', true);
    next();
});

// Parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: true }));
// Parse requests of content-type: application/json
app.use(bodyparser.json());
// Setting the port
app.set('port', config.server.port);
// Setting the hostname
app.set('hostname', config.server.host); 

require('./routes/user-route.js')(app); 

mongoose.Promise = global.Promise;
// Connecting to the mongodb
mongoose.connect(config.db.url, {
    useNewUrlParser: true
}).then(()=>{
    console.log('Successfully connected to the database: ' + config.db.dbname);
}).catch(err =>{
    console.log('Failed to connect to the database due to: ', err);
    process.exit();
});

Grid.mongo = mongoose.mongo;
// Set the GridFS
const conn = mongoose.connection;
let gfs;
conn.once('open', () =>{
    // Init Stream
	gfs = Grid(conn.db, mongoose.mongo);
	gfs.collection(config.db.dbnamefilestore);
});

var storage = new GridFsStorage({
    url: config.db.url,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: config.db.dbnamefilestore,
            metadata:  { originalname: file.originalname, description: req.body.description, sso: req.body.sso },
          };
          resolve(fileInfo);
        });
      });
    }
});

const upload = multer({ storage }).single('file', 'desc');

// -------------------------------------[ ROUTERS FOR FILES ]--------------------------------------
// ------------------------------------------------------------------------------------------------
// Route for file upload
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if(err) console.log(err);
    });    
});

// Downloading a single file
app.get('/file/:filename', (req, res) => {
    gfs.collection(config.db.dbnamefilestore); //set collection name to lookup into
    gfs.files.find({filename: req.params.filename}).toArray(function(err, files){
        // create read stream
        var readstream = gfs.createReadStream({
            filename: files[0].filename,
            root: config.db.dbnamefilestore
        });
        // set the proper content type 
        res.set('Content-Type', files[0].contentType)
        // Return response
        return readstream.pipe(res);
    });
});

// Route for getting all the files based on SSO ID
app.get('/files/:id', (req, res) => {
    let filesData = [];
    let count = 0;
    
    gfs.collection(config.db.dbnamefilestore); //set collection name to lookup into
    gfs.files.find({'metadata.sso': req.params.id}).toArray(function (err, files) {
        if (err) res.send(err);

        files.forEach((file) => {
            filesData[count++] = {
                sl: count,
                originalname: file.metadata.originalname,
                filename: file.filename,
                contentType: file.contentType,
                description: file.metadata.description
            }
        });
        res.json(filesData);
    });
});

// Router for deleting files having file id (params)
app.delete('/file/:fileid', (req, res) => {
    gfs.remove({_id: req.params.fileid, root: config.db.dbnamefilestore}, (err, gs) => {
        if (err) res.send(err);
        res.send({'removed': req.params.fileid})
    });
});
    
// Create App Server 
app.listen(app.get('port'), app.get('hostname'), ()=>{
    console.log(`\nStarted server at http://${app.get('hostname')}:${app.get('port')}/`);
});
// - EOF -