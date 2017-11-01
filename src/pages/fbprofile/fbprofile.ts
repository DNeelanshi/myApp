import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Appsetting } from '../../providers/appsetting';
import {Http, Headers, RequestOptions} from '@angular/http';


/**
 * Generated class for the FbprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fbprofile',
  templateUrl: 'fbprofile.html',
})
export class FbprofilePage {
profile;srcImage;
  constructor(public navCtrl: NavController, 
  public navParams: NavParams, public http:Http,
               public appsetting: Appsetting) {
 
                this.FbprofilePage();
  }

 
  FbprofilePage(){
  	let headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
		let options = new RequestOptions({ headers: headers });
		var user_id = localStorage.getItem("userid")
		// var url = 'http://rakesh.crystalbiltech.com/fash/api/lookbooks/productoflookbook'; 
		var postdata = {
			id: user_id
		};
		

      var serialized = this.serializeObj(postdata);
      console.log(postdata);
this.http.post(this.appsetting.myGlobalVar + 'users/user', serialized, options).map(res => res.json()).subscribe(data => {
			// this.Loading.dismiss();
      
		//	console.log(this.fb_data)
			// this.profile = data.data.User
			//this.srcImage=this.profile.image;
			 this.profile = localStorage.getItem('facebook_data');
			  this.srcImage = localStorage.getItem('facebook_pic');
			 console.log(this.profile);

		})
  }
   serializeObj(obj) {
    var result = [];
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad FbprofilePage');
  }

}
