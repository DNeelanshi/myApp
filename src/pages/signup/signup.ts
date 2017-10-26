import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import { LoginPage } from '../login/login';
import 'rxjs/add/operator/map';
import {LoadingController} from 'ionic-angular';
import { Appsetting } from '../../providers/appsetting';


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

public data='';id;token;

public Loading=this.loadingCtrl.create({
 content: 'Please wait...'});

  constructor(public navCtrl: NavController, 
  	          public navParams: NavParams ,
              public  loadingCtrl:LoadingController,
              public http:Http,
               public appsetting: Appsetting
  // private firebase: Firebase,
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

  this.navCtrl.push(LoginPage);
    

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
  
  loginPage(){
      
  this.navCtrl.push(LoginPage);
}

}
