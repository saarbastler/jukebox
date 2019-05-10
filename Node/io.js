// using wiringpi-node instead of wiring-pinMode
// https://github.com/WiringPi/WiringPi-Node/issues/70

const wpi = require('wiringpi-node');
const inputK2 = 0;
const inputS1 = 2;
const inputS2 = 3;
const inputS3 = -1; //21;
const inputK3 = 22;

const execFile = require('child_process').execFile;

module.exports=
{
  playing : boolean = false,

  init : function( buttonClicked )
  {
    var inputs= [inputK3, inputS3, inputS2, inputS1, inputK2 ];
    
    wpi.setup('wpi');
    inputs.forEach(function(input, idx)
    {
      if(input >= 0)
      {
        wpi.pinMode(input, wpi.INPUT);
        wpi.pullUpDnControl(input, wpi.PUD_UP);
        wpi.wiringPiISR(input, wpi.INT_EDGE_FALLING, function(delta) 
        {
          //console.log('Pin ' + idx + ' changed to LOW (', delta, ')');
          if( delta > 2000 )
            buttonClicked( idx );
        });
      }
    });
  },
  
  play : function(file, finishedFunction)
  {
    if(!this.playing)
    {
      this.playing= true;
      const child= execFile('mpg123', [ "--frames", "300", file ], (error, stdout, stderr) =>
      {      
        if( error )
          console.log(error);
        
        console.log(stdout);
      });
      
      child.on('close', (code) =>
      {
        //console.log("Process closed:" + code);
        this.playing= false;

        if( finishedFunction )
           finishedFunction();
      });
    }
    else
    {
      console.warn("not ringing again, still running ...");
    }
  }
}

