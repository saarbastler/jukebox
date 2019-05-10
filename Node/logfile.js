const os = require('os');
const fs = require('fs');
const readline = require('readline');

module.exports=
{
  log : function(file, text)
  {
    line = new Date().toLocaleString('de-DE') + ";" + text + os.EOL;
    fs.appendFile(file, line);
  },

  readFile : function(file, resultFunc)
  {
    var result=[];

    fs.access( file, fs.constants.F_OK, (err) =>
    {
      if( err )
      {
        resultFunc(result);
      }
      else
      {
        var rd = readline.createInterface(
        {
          input: fs.createReadStream(file),
          //output: process.stdout,
          console: false
        });

        rd.on('line', function(line) 
        {
          var parts= line.split(";");

          result.push({time:parts[0], line:parts[1]});
        });

        rd.on('close', function()
        {
          resultFunc(result);
        });
      }
    });
  }
};
