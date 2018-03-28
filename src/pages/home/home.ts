import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { CarPage } from '../car/car';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  key: string;
  topic: string;
  dueDate: string;

  constructor(private af: AngularFireDatabase, public navCtrl: NavController) {

  }
  ionViewWillEnter() {
    this.showData();
  }
  //แสดงข้อมูลทั้งหมดจากฐานข้อมูลสดงข้อมูลทั้งหมดจากฐานข้อมูล
  showData() {
    this.itemsRef = this.af.list('/');
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({
        key: c.payload.key, ...c.payload.val()
      }));
    });
  }
  select() {
    this.navCtrl.push(CarPage);
  }
}
