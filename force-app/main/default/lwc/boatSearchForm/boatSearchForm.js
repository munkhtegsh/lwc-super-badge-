import { LightningElement, wire, track } from 'lwc';
// import getBoatTypes from the BoatDataService => getBoatTypes method';
import getBoatTypes from '@salesforce/apex/BoatDataService.getBoatTypes'
export default class BoatSearchForm extends LightningElement {
  selectedBoatTypeId = '';

  // Private
  error = undefined;

  searchOptions;

  // Wire a custom Apex method
    @wire(getBoatTypes)
    getBoatTypes({ error, data }) {
    if (data) {
      this.searchOptions = data.map(type => {
        // TODO: complete the logic
        let newObj = {};
        newObj.label = type.Name;
        newObj.value = type.Id;
        // newObj.id = type.Id;
        return newObj
      });
      this.searchOptions.unshift({ label: 'All Types', value: '' });
    } else if (error) {
      this.searchOptions = undefined;
      this.error = error;
    }
  }

  // Fires event that the search option has changed.
  // passes boatTypeId (value of this.selectedBoatTypeId) in the detail
  handleSearchOptionChange(event) {
    // Create the const searchEvent
    // searchEvent must be the new custom event search
    const { value } = event.target;
    this.selectedBoatTypeId = value;
    const searchEvent = new CustomEvent('search', {detail: { boatTypeId: this.selectedBoatTypeId }, bubbles: true})
    this.dispatchEvent(searchEvent);
  }
}
