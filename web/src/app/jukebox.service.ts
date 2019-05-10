import { Injectable } from '@angular/core';
import { Headers, Http } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { SoundFile } from './sound-file';

@Injectable()
export class JukeboxService 
{
  private headers : Headers;
  private readonly buttonActionsUrl:string = "api/actions";
  private readonly filesUrl:string = "api/files";
  private readonly playUrl:string = "api/play";

  constructor(private http: Http) 
  {
    this.headers= new Headers();
    this.headers.append("Content-Type","application/json");
    this.headers.append("Accept","application/json");    
  }

  deleteFile( file:string)
  {
    //console.log("delete File:" + file);
    return this.http.delete(this.filesUrl + '/' + file, {headers: this.headers})
      .map(response =>
      {
      })
      .subscribe();
  }

  fileList() : Observable<SoundFile[]>
  {
    //console.log("filelist()");
    return this.http.get(this.filesUrl, {headers: this.headers})
      .map(response =>
      {
        return response.json().map( (soundFile) => new SoundFile(soundFile));
      });
  }

  buttonActions() : Observable<SoundFile[]>
  {
    //console.log("buttonActions()");
    return this.http.get(this.buttonActionsUrl, {headers: this.headers})
      .map(response =>
      {
        return response.json().map( (soundFile) => new SoundFile(soundFile));
      });
  }

  playFile( file : string) 
  {
    //console.log("play File:" + file);
    return this.http.post(this.playUrl + '/' + file,'', {headers: this.headers})
      .map(response =>
      {
      })
      .subscribe();
  }

  updateActions( index : number, file : string) 
  {
    //console.log("update Action" + index + " : " + file);
    return this.http.put(this.buttonActionsUrl + '/' + index + '/' + file,'', {headers: this.headers})
      .map(response =>
      {
      })
      .subscribe();
  }
}
