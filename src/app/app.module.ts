import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { HttpModule } from '@angular/http';
import { Appsetting } from '../providers/appsetting';
import { LoginPage } from '../pages/login/login';
import { AboutPage } from '../pages/about/about';
import { SignupPage } from '../pages/signup/signup';
import { UserprofilePage } from '../pages/userprofile/userprofile';
import { EditprofilePage } from '../pages/editprofile/editprofile';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { Facebook } from '@ionic-native/facebook';
import { FbprofilePage } from '../pages/fbprofile/fbprofile';
 import { CodePush } from '@ionic-native/code-push';
// 
// import firebase from 'firebase';
// import { ToastController } from 'ionic-angular';
//import { Firebase } from '@ionic-native/firebase';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    AboutPage,
    SignupPage,
    UserprofilePage,
    EditprofilePage,
    FbprofilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
     
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    AboutPage,
    SignupPage,
     UserprofilePage,
     EditprofilePage,
     FbprofilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CodePush,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
     Appsetting,
      Camera,
     Facebook
   
  ]
})
export class AppModule {}
