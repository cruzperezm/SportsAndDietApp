import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent,
  IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonBadge,
  IonRange, IonDatetime, IonRefresherContent, IonRefresher,
  RefresherCustomEvent} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,
    IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonBadge,
    IonRange, IonDatetime, IonRefresher, IonRefresherContent],
})
export class HomePage {
  constructor() {}
   handleRefresh(event: RefresherCustomEvent) {
      setTimeout(() => {
        // Any calls to load data go here
        event.target.complete();
      }, 2000);
    }
}
