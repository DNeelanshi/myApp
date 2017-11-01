import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { UserprofilePage } from '../userprofile/userprofile';
import { Appsetting } from '../../providers/appsetting';
import { ActionSheetController } from 'ionic-angular';
import {LoadingController} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})

 export class EditprofilePage{
	 id;user_id;profile;srcImage;imgTosend;
	
	public data = {
    first_name: "",
    phone: "",
    email:"",
    
    id: "",

  }
constructor( public navCtrl: NavController, public navParams: NavParams,
  	          public http:Http,
              public appsetting: Appsetting,
              private camera: Camera,
               public actionSheetCtrl: ActionSheetController,
               loadingCtrl:LoadingController
               ){
   

   	this.getdata()
   	
   	

  }



getdata(){
  let headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
  var options = new RequestOptions({ headers: headers }); 
  var user_id = JSON.parse(localStorage.getItem("userid"));
  var postdata = {
      id:user_id
    };
    console.log(postdata)
  var serialized = this.serializeObj(postdata);
  //this.Loading.present();
  this.http.post(this.appsetting.myGlobalVar + 'users/user', serialized, options).map(res => res.json()).subscribe(data1 => {
  //this.Loading.dismiss();
  console.log(data1);
   if(data1.data) {
           this.profile = data1.data.User
           this.srcImage = this.profile.image
           this.data = this.profile;
        }
        })

        }

edituserprofile(edit){
  
  let headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
  var options = new RequestOptions({ headers: headers }); 
  var Userid = JSON.parse(localStorage.getItem("userid"));
  console.log(Userid);

  if (edit.value.first_name == null) {
    edit.value.first_name = "";
  }
  if (edit.value.phone == null) {
    edit.value.phone = "";
  }
  // if (edit.value.email == null) {
  //   edit.value.email = "";
  // }
  // if (edit.value.address == null) {
  //   edit.value.address = "";
  // }
  // if (edit.value.city == null) {
  //   edit.value.city = "";
  // }
  // if (edit.value.state == null) {
  //   edit.value.state = "";
  // }
  // if (edit.value.zip == null) {
  //   edit.value.zip = "";
  // }
  // if (edit.value.country == null) {
  //   edit.value.country = "";
  // }



        this.data = {
                   first_name: edit.value.first_name,
                   phone: edit.value.phone,
                   email:edit.value.email,
                   // address: edit.value.address,
                   // city:edit.value.city,
                   // state:edit.value.state,
                   // zip: edit.value.zip,
                   // country: edit.value.country,
                   id: Userid,
    }
    console.log(this.data);
  var serialized = this.serializeObj(this.data);
 // this.Loading.present();
  this.http.post(this.appsetting.myGlobalVar + 'users/editprofile', serialized, options)
  .map(res => res.json())
  .subscribe(data => {
  if (data.isSucess == "true") {
    //this.Loading.dismiss();
    // let toast = this.toastCtrl.create({
    //   message: "Profile is updated",
    //   duration: 3000,
    //   position: 'middle'
    // });
    // toast.present();
 alert("Profile is updated")
  
  this.navCtrl.push(UserprofilePage)
        } 
    }) }

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
						this.saveimage();

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
						this.saveimage();
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
					  actionsheet.dismiss();

				}
			}]
		});

		actionsheet.present();
	}

	
	


 saveimage() {
let headers = new Headers();
headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
let options = new RequestOptions({ headers: headers });
		var user_id = localStorage.getItem("userid")
	    var postdata = {
			id: user_id,
			img: this.imgTosend
		};
		console.log(postdata)
		var serialized = this.serializeObj(postdata);
		this.http.post(this.appsetting.myGlobalVar + 'users/saveimage', serialized, options).map(res => res.json()).subscribe(data => {
			//this.Loading.dismiss();

			console.log(data)
			alert("saving image")

		}) }
    

      
  


ionViewDidLoad() {
    console.log('ionViewDidLoad EditprofilePage');
  }
serializeObj(obj) {
    var result = [];
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }
} 