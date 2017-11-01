import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { CodePush } from '@ionic-native/code-push';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
   // declare const codePush:any

  
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar,public codepush: CodePush,public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];
    this.platform.ready().then(() => {
      console.log("CodePush!!")
this.codepush.sync().subscribe((val) => {
        console.log(val);
      });

    })
  //  this.platform.ready().then(() => {
  // this.codepush.sync().subscribe((val) => {
  //       console.log(val);
  //     });

  //   })
  }
 
  initializeApp() {
    this.platform.ready().then(() => {
        // this.codepush.sync().subscribe((val) => {
        // console.log(val); });
      // });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // this.codePush.sync().subscribe((syncStatus) => console.log(syncStatus));
//       const downloadProgress = (progress) => { console.log(`Downloaded ${progress.receivedBytes} of ${progress.totalBytes}`); }
// this.codePush.sync({}, downloadProgress).subscribe((syncStatus) => console.log(syncStatus)
//    alert("m working"));
      
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    })
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
