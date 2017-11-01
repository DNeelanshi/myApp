import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import { LoginPage } from '../login/login';
import 'rxjs/add/operator/map';
import {LoadingController} from 'ionic-angular';
import { Appsetting } from '../../providers/appsetting';
 import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
 import { FbprofilePage } from '../fbprofile/fbprofile';
 // import { LoginPage } from '../loginpage/loginpage';
// import firebase from 'firebase';
//import { Firebase } from '@ionic-native/firebase';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

public data='';id;token;profilepicface;facebook_data;

public Loading=this.loadingCtrl.create({
 content: 'Please wait...'});

  constructor(public navCtrl: NavController, 
  	          public navParams: NavParams ,
              public  loadingCtrl:LoadingController,
              public http:Http,
               public appsetting: Appsetting,
                private fb: Facebook
  // private firebase: Firebase
   ) {

    
  }

  public register(signup){
  let headers = new Headers();
headers.append('Content-Type',  'application/x-www-form-urlencoded;charset=utf-8');
let options= new RequestOptions({ headers: headers });
var data = {
  first_name:signup.value.name,
  phone:signup.value.phone,
  email:signup.value.email,
  password:signup.value.password,
  cpassword: signup.value.cpassword,
  tokenid: this.token
   }
 
 var Serialized = this.serializeObj(data);
 console.log(data);
  this.http.post(this.appsetting.myGlobalVar + 'users/registration', Serialized, options).map(res=>res.json()).subscribe(data=>{


  console.log(data);

 this.navCtrl.push(FbprofilePage);
    

//     if(data.error == 0){
//    this.data = data;
//    this.id =  data.data.User.id
//    localStorage.setItem("USERID", data.data.User.id);
//    this.Loading.dismiss();
//   // alert(data.msg);
//   // this.navCtrl.push(TabsPage);
// }else{
//   let toast = this.toastCtrl.create({
//     message: data.msg,
//     duration: 3000,
//     position: 'middle'
//   });
//   toast.present();
//  // alert(data.msg)
// }   
     
    })
 }

   serializeObj(obj) {
    var result = [];
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }
  
loginfb(){

alert("facebook login working");
this.fb.login(['public_profile', 'user_friends', 'email'])
  .then((res: FacebookLoginResponse) => { this.fb.api('me/?fields=id,email,last_name,first_name', ["public_profile", "email"])
.then((result) => {
alert("success");
alert(JSON.stringify(res));

this.profilepicface = "https://graph.facebook.com/" + result.id + "/picture?type=large";
localStorage.setItem('facebook_pic', this.profilepicface);
localStorage.setItem('facebook_login', JSON.stringify(result));
this.facebook_data = localStorage.getItem('facebook_login');
var url: string = this.appsetting.GlobalVar + 'users/Djfblogin';
alert(this.facebook_data);
localStorage.setItem('facebook_data', this.facebook_data);
alert("data storage saved");
this.navCtrl.push(FbprofilePage);


var signindata = {
email: result.email,
fb_id: result.id,
name: result.first_name + " " + result.last_name,
img: this.profilepicface,

}
alert("neelanshi")
//this.navCtrl.push(LoginPage);
// var signedata= {
// email: result.email,
// fb_id: result.id,
// name: result.first_name + " " + result.last_name,
// img: this.profilepicface,
// }
 var serialized_data = this.serializeObj(signindata);

 let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' });
 let options = new RequestOptions({ headers: headers });

 this.http.post(url, serialized_data, options).map(res => res.json()).subscribe(resolve => {
 if (resolve.isSucess == "true") {
  //alert("isha")

localStorage.setItem('userid', resolve.data.User.id);
localStorage.setItem("USER_DATA", JSON.stringify(resolve.data.User));
 this.appsetting.profile = resolve.data.User;
 localStorage.setItem('loginfb', 'fbloginfrm');

// let alert = this.alertCtrl.create({
// title: 'Logged in',
// subTitle: resolve.msg
// });
// alert.present();

//alert("succesfuly login");


this.navCtrl.push(FbprofilePage);
// }

// }) 

}
}) }) })
}

// this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);




  loginPage(){
      
  this.navCtrl.push(LoginPage);
}

}
