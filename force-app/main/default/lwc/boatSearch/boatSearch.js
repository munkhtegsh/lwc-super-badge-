import { LightningElement, track, wire } from 'lwc';
import getBoats from '@salesforce/apex/BoatDataService.getBoats';
 // imports
 export default class BoatSearch extends LightningElement {
  @track isLoading = false;
  @track boats = [];

  constructor() {
    super();
    this.template.addEventListener('search', this.searchBoats.bind(this));
  }

  // Handles loading event
  handleLoading() {
    this.isLoading = true;
   }

  // Handles done loading event
  handleDoneLoading() {
    this.isLoading = false;
  }

  // Handles search boat event
  // This custom event comes from the form
  searchBoats(event) {
    this.handleLoading();
    console.log('EVENT: ', event.detail)
    getBoats({ boatTypeId: event.detail }).then(res => {
      console.log(res)
      if (res) {
        this.boats = res;
        this.handleDoneLoading();
      } else {
        throw new Error('Error occured');
      }
    })


  }

  createNewBoat() { }
}
