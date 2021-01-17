import { LightningElement, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getListOfTeams from '@salesforce/apex/TeamsAppController.getListOfTeams'
import getTeamMembers from '@salesforce/apex/TeamsAppController.getTeamMembers';

export default class TeamList extends LightningElement {
	team;
	@track teamOptions = [];
	@track teamMembers = [];


	handleTeamChange(event) {
		this.team = event.target.value;
		getTeamMembers({
			team: this.team 
		})
		.then((result) => {
			this.teamMembers = result;
		})
		.catch((error) => {
			this.teamMembers = undefined;
			this.dispatchEvent(
				new ShowToastEvent({
					title: 'Error fetching team members',
					message: error.body.message,
					variant: 'error',
				}),
			);
		})
	}
	
	@wire(getListOfTeams)
	listOfTeams({error, data}){
		if (data) {
			for (let i = 0; i < data.length; i++) {
				this.teamOptions = [...this.teamOptions, { value: data[i].Id, label: data[i].Name }];
			}
			this.error = undefined;
		} else if (error) {
			this.dispatchEvent(
				new ShowToastEvent({
					title: 'Error fetching teams',
					message: error.body.message,
					variant: 'error',
				}),
			);
			this.teamOptions = [];
		}
	}
}