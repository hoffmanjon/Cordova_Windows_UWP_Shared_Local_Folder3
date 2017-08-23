import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var FileSavePlugin: any

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
message = "started"

  constructor(public navCtrl: NavController, private zone: NgZone) {

  }

  pickFile() {
    this.message = 'clicked'
     FileSavePlugin['saveFileWithPicker']('Test File Data.', (retValue) => {
      this.zone.run(() => {
        this.message = "Return- " + retValue
      })
    }, (errValue) => {
      this.zone.run(() => {
        this.message = "XError: " + errValue
      })
    })  
  }

  saveFile() {
    this.message = 'clicked'
    var args = {'filename':'myfile.txt', 'data':'Testing test testy'}
     FileSavePlugin['saveFileLocal'](args, (retValue) => {
       this.zone.run(() => {
         this.message = "Return- " + retValue
       })
    }, (errValue) => {
      this.zone.run(() => {
        this.message = "XError: " + errValue
      })
    })  
  }

  saveSharedFile() {
    this.message = 'clicked'
    var args = {'filename':'myfile.txt', 'data':'Testing test testy'}
     FileSavePlugin['saveFileLocal'](args, (retValue) => {
       this.zone.run(() => {
         this.message = "Return- " + retValue
       })
        var args = {'filename':'mysharedfile.txt', 'data':'Testing test testy'}
        FileSavePlugin['saveFileShared'](args, (retValue) => {
          this.zone.run(() => {
            this.message = "Return- " + retValue
          })
        }, (errValue) => {
          this.message = "XError: " + errValue
        })  
    }, (errValue) => {
      this.zone.run(() => {
        this.message = "XError: " + errValue
      })
    })  

    
  }
  
}
