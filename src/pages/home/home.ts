import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import{LoginPage} from '../login/login';
import{AboutPage} from '../about/about';
import{SignupPage} from '../signup/signup';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  aboutPage=AboutPage;
 
  constructor(public navCtrl: NavController) {

  }
  helllo(){
alert("hhhhh");
  }
login(){
	this.navCtrl.push(LoginPage);
}
signup(){
	this.navCtrl.push(SignupPage);
}





}
