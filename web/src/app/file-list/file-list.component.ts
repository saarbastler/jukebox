import { Component, OnInit } from '@angular/core';
import { JukeboxService } from '../jukebox.service';
import { SoundFile } from '../sound-file';

@Component({
  selector: 'file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css'],
  providers: [ JukeboxService ]
})
export class FileListComponent implements OnInit 
{
  fileList : SoundFile[] = [];

   constructor( private jukeboxService:JukeboxService) { }

  ngOnInit() 
  {
    console.log("FileListComponent::ngOnInit");
    this.loadFileList();
  }

  private loadFileList()
  {
    this.jukeboxService.fileList().subscribe((fileList) => this.fileList= fileList);
  }

  onUpload(event)
  {
    this.loadFileList();
  }
  
  playFile( file:string )
  {
    this.jukeboxService.playFile(file);
  }

  deleteFile( file:string )
  {
    this.jukeboxService.deleteFile(file);
    this.loadFileList();
  }

}
