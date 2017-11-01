import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Appsetting } from '../../providers/appsetting';
// import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { UserprofilePage } from '../userprofile/userprofile';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
public data = ''; id;
  public tokenid = '';
 
  constructor(public navCtrl: NavController, 
  public navParams: NavParams, 
  public http: Http,
    public appsetting: Appsetting ) {
  }
  login(form){
  	let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        let options = new RequestOptions({ headers: headers });

         var data = {
            email: form.value.email,
            password: form.value.password,
            //tokenid: this.tokenid,
            tokenid: "hh",
            reg_status: 1
          }
           var Serialized = this.serializeObj(data);
        console.log(data);

this.http.post(this.appsetting.myGlobalVar + 'users/login', Serialized, options).map(res => res.json()).subscribe(data => {
    
    console.log(data);

 //this.navCtrl.push(UserprofilePage);
  
   if(data.error == 0){
   this.data = data;
   this.id =  data.data.User.id
   localStorage.setItem("userid", data.data.User.id);
   console.log(localStorage.getItem("userid"));
    this.navCtrl.push(UserprofilePage);

  // alert(data.msg);
  // this.navCtrl.push(TabsPage);
}
// else {
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  // homePage() {
  //   this.navCtrl.push(HomePage);
  // }
  signupPage() {
    this.navCtrl.push(SignupPage);
  }


}
