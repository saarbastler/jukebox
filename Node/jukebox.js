// allow node to listen on port 80:
// sudo apt-get install libcap2-bin
// sudo setcap cap_net_bind_service=+ep `readlink -f \`which node\``

const express = require("express");
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const configStore = require('configstore');
const process = require('process');

const osWindows= process.platform.startsWith('win');
const web= path.resolve(process.cwd() + (osWindows ? '/../web/dist' : '/web'));
const files= path.resolve(process.cwd() + (osWindows ? '/../uploads' : '/uploads'));
const port= 8080;

const io= require(osWindows ? './io-sim.js' : './io.js');

var DBFile = (function () {
    function DBFile(name) {
        this.name = name;
    }
    return DBFile;
}());

var config= new configStore("jukebox");
console.log("path: " + config.path);

var buttonAction= [null,null,null,null,null];
for(i=0;i < buttonAction.length;i++)
{
  if(config.has("ba" + i))
    buttonAction[i]= new DBFile(config.get("ba" + i));
  else
    buttonAction[i]= new DBFile(null);
  
  console.log("ba " + i + " : " + buttonAction[i].name) ;
}

io.init( function( button ) 
{
  console.log('Button ' + button);
  if( button < buttonAction.length && buttonAction[button] && buttonAction[button].name )
    io.play( files + '/' + buttonAction[button].name);
});


var app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router(); 

/*router.use(function(req, res, next) {
    console.log('%s %s %s', req.method, req.url, req.path);
    next();
});*/

router.get('/*', function(req, res, next) {
  res.setHeader('Last-Modified', (new Date()).toUTCString());
  next();
});

router.route('/files')
  .get(function(req, res) 
  {
    fs.readdir( files , (err, files) => 
    {
      var result = []
      files.forEach(function (f) { if(f.substr(-4) == '.mp3' )result.push(new DBFile(f)); });

      res.json( result );
    });
  });
router.route('/files/:file')
  .get(function(req,res)
  {
    fs.access( files + '/' + req.params.file, fs.constants.F_OK, (err) =>
    {
        if( err )
        {
            console.log(err);
            res.sendStatus(404);
        }
        else
        {
            res.sendFile(files + '/' + req.params.file);
        }
    })
  })
  .delete(function(req,res)
  {
    fs.unlink(files + '/' + req.params.file, (err) =>
    {
      if( err )
      {
        console.log(err);
        res.sendStatus(500);
      }
      else
    {
        console.log("delete File: " + req.params.file);
        res.send("delete File: " + activeFile);
      }
    });
  })

router.route('/actions')
  .get(function(req, res) 
  {
    res.json( buttonAction );
  });
router.route('/actions/:action/:file')
  .put(function(req,res)
  {
    var id= parseInt(req.params.action);
    if(!isNaN(id) && id  >= 0 && id < 5)
    {
      fs.access( files + '/' + req.params.file, fs.constants.F_OK, (err) =>
      {
        if( err )
        {
          //console.log(err);
          res.status(404).send( req.params.file + ' not found');
        }
        else
        {
          buttonAction[id]= new DBFile( req.params.file);
          config.set("ba" + id, req.params.file);
          
          console.log("ba" + id + " " + req.params.file);
          res.sendStatus(200);
        }
      })
    }
    else
    {
      res.status(400).send('action must be 0..4');
    }
  });

router.route('/play/:file')
  .post(function(req,res)
  {
    fs.access( files + '/' + req.params.file, fs.constants.F_OK, (err) =>
    {
        if( err )
        {
            console.log(err);
            res.sendStatus(500);
        }
        else
        {
            io.play( files + '/' + req.params.file );
            console.log("play File: " + req.params.file);
            res.send("Play File: " + req.params.file);
        }
    });
  });

app.use('/api', router);

var storage = multer.diskStorage(
{
  destination: function (req, file, cb) 
  {
      cb(null, files)
  },
  filename: function (req, file, cb) 
  {
      cb(null, file.originalname);
  }
});
var upload = multer({ storage: storage });

app.post('/upload', upload.single('file[]'), function(req, res) 
{
  console.log(req.file);
  res.send("file saved on server");
});

/*app.post('/upload', upload.single('file[]'), function (err, req, res, next) {
  console.log('This is the invalid field ->', err.field)
  next(err)
});*/

app.use(express.static(web));
app.get('*', function(req, res) 
{
    console.log( req.params.name);
    res.sendFile(web + '/index.html'); 
});

app.listen(port, function () 
{
  console.log('Doorbell app listening on port ' + port)
})
