import { Component, OnInit } from '@angular/core';
import { JukeboxService } from '../jukebox.service';
import { SoundFile } from '../sound-file';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ JukeboxService ]
})
export class HomeComponent implements OnInit 
{
  actions : SoundFile [] = [null, null, null, null, null];

  fileList : SoundFile[] = [];

  constructor( private jukeboxService:JukeboxService) { }

  ngOnInit() 
  {
    this.jukeboxService.buttonActions().subscribe((actions) => 
    {
      this.actions= actions;
      console.log("actions: " + this.actions.length);
      console.log(this.actions.toString());
      console.log(JSON.stringify(this.actions[0]));
    });

    this.jukeboxService.fileList().subscribe((fileList) => this.fileList= fileList);
  }

  setAction(index:number)
  {
    console.log(index + " : " + this.actions[index].name);

    this.jukeboxService.updateActions(index, this.actions[index].name);
  }
}
