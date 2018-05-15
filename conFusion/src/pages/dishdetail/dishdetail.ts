import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';
import { FavoriteProvider } from '../../providers/favorite/favorite';


/**
 * Generated class for the DishdetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {
  dish: Dish;
  errMess: string;
  avgstars: string;
  numcomments: number;
  favorite: boolean;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    @Inject('BaseURL') private BaseURL,
    private favoriteservice: FavoriteProvider,
    private toastCtrl: ToastController) {

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }

  addToFavorites() {
    console.log('Adding to Favorites', this.dish.id);
    this.favorite = this.favoriteservice.addFavorite(this.dish.id);
  }

  this.toastCtrl.create({
    message: 'Dish ' + this.dish.id + ' added as favorite successfully',
    position: 'middle',
    duration: 3000}).present();

}

deleteFavorite(item: ItemSliding, id: number) {
  console.log('delete', id);

  let alert = this.alertCtrl.create({
    title: 'Confirm Delete',
    message: 'Do you want to delete Dish '+ id,
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Delete cancelled');
        }
      },
      {
        text: 'Delete',
        handler: () => {
          let loading = this.loadingCtrl.create({
            content: 'Deleting . . .'
          });
          let toast = this.toastCtrl.create({
            message: 'Dish ' + id + ' deleted successfully', 
            duration: 3000});
          loading.present();
          this.favoriteservice.deleteFavorite(id)
            .subscribe(favorites => {this.favorites = favorites; loading.dismiss(); toast.present(); } ,
              errmess =>{ this.errMess = errmess; loading.dismiss(); });
        }
      }
    ]
  });

  alert.present();

  item.close();

}

}