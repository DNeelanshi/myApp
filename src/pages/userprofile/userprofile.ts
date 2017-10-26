import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
 import {LoadingController} from 'ionic-angular';
import { Appsetting } from '../../providers/appsetting';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular';
import { HomePage } from '../home/home';


/**
 * Generated class for the UserprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-userprofile',
  templateUrl: 'userprofile.html',
})

export class UserprofilePage {
	profile;srcImage;imgTosend;

 // public Loading = this.loadingCtrl.create({
 //    content: 'Please wait...'
 //  })
  constructor(public navCtrl: NavController, public navParams: NavParams,
  	           public http:Http,
               public appsetting: Appsetting,
               private camera: Camera,
                public actionSheetCtrl: ActionSheetController,
                loadingCtrl:LoadingController
               ) {
  	this.UserprofilePage()
  }
  
  UserprofilePage(){
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
      
			console.log(data)
			 this.profile = data.data.User
			 this.srcImage=this.profile.image
			 console.log(this.profile);

		})
  }
   serializeObj(obj) {
    var result = [];
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }


CameraAction() {
		console.log('opening');
		let actionsheet = this.actionSheetCtrl.create({
			title: "Choose Album",
			buttons: [{

				text: 'Camera',
				handler: () => {
					//this.Loader.present();
					const options: CameraOptions = {
						quality: 8,
            sourceType: 1,
            correctOrientation: true,
						destinationType: this.camera.DestinationType.DATA_URL,
						encodingType: this.camera.EncodingType.JPEG,
						mediaType: this.camera.MediaType.PICTURE
					}
					this.camera.getPicture(options).then((imageUri) => {
						this.srcImage = 'data:image/jpeg;base64,' + imageUri;
						this.imgTosend = imageUri;
						//this.Loader.dismiss();
                        alert('camera working');
						//this.changeimage();

					}, (err) => {
						alert(JSON.stringify(err));
						//this.Loader.dismiss();
						console.log(err);
					});
				}
			},
			{
				text: 'Gallery',
				handler: () => {
					console.log("Gallery Clicked");
				//	alert("get Picture")
					//this.Loader.present();

					const options: CameraOptions = {
						quality: 20,
            sourceType: 0,   
            correctOrientation: true,
						destinationType: this.camera.DestinationType.DATA_URL,
						encodingType: this.camera.EncodingType.JPEG,
						mediaType: this.camera.MediaType.PICTURE
					}
					this.camera.getPicture(options).then((imageData) => {
						this.srcImage = 'data:image/jpeg;base64,' + imageData;
						this.imgTosend = imageData;
					//	this.Loader.dismiss();
						//this.changeimage();
						  alert('gallery working');
					}, (err) => {
						//this.Loader.dismiss();
						alert(JSON.stringify(err));
						// Handle error
					});
				}
			},
			{
				text: 'Cancel',
				role: 'cancel',
				handler: () => {
					console.log('Cancel clicked');
					//  actionsheet.dismiss();

				}
			}]
		});

		actionsheet.present();
	}

//     const options: CameraOptions = {
//   quality: 100,
//   destinationType: this.camera.DestinationType.DATA_URL,
//   encodingType: this.camera.EncodingType.JPEG,
//   mediaType: this.camera.MediaType.PICTURE
// }

// this.camera.getPicture(options).then((imageData) => {
//  // imageData is either a base64 encoded string or a file URI
//  // If it's base64:
//  let base64Image = 'data:image/jpeg;base64,' + imageData;
// }, (err) => {
//  // Handle error
// });

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserprofilePage');
  }

    homePage(){
      
  this.navCtrl.push(HomePage);
}
