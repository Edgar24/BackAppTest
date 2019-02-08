import { Component, ViewChild } from '@angular/core';
import { MediaCapture } from "@ionic-native/media-capture/ngx";
import { Media } from "@ionic-native/media/ngx";
import { File } from "@ionic-native/file/ngx";
import { CaptureVideoOptions, MediaFile } from "@ionic-native/media-capture";
import { Storage } from '@ionic/storage';

const MEDIA_FILES_KEY = 'mediafiles';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
    @ViewChild('myvideo') myVideo: any;
    mediaFiles = [];

    constructor(private mediaCapture: MediaCapture, private storage: Storage, private media: Media, private file: File) {

    }

    captureAudio() {
        this.mediaCapture.captureAudio().then(res => {
            this.storeMediaFiles(res);
        })
    }

    captureVideo() {
        let options: CaptureVideoOptions = {
            limit: 1,
            duration: 30
        }
        this.mediaCapture.captureVideo(options).then((res: MediaFile[]) => {
            this.storeMediaFiles(res);
        })
    }

    storeMediaFiles(files) {
        this.storage.get(MEDIA_FILES_KEY).then(res=> {
            if(res){
                let arr = JSON.parse(res);
                arr = arr.concat(files);
                this.storage.set(MEDIA_FILES_KEY, JSON.stringify(arr));
            }else{
                this.storage.set(MEDIA_FILES_KEY, JSON.stringify(files));
            }
            this.mediaFiles = this.mediaFiles.concat(files);
        })
    }
}




