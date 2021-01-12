import { LightningElement, track, wire } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getListOfTeams from '@salesforce/apex/MemberSkillsController.getListOfTeams'
import TEAM_MEMBER_OBJECT from '@salesforce/schema/TeamMember__c';
import NAME_FIELD from '@salesforce/schema/TeamMember__c.Name';
import TEAM_FIELD from '@salesforce/schema/TeamMember__c.Team__c';
import SKILLS_FIELD from '@salesforce/schema/TeamMember__c.Skills__c';

export default class MemberSkills extends LightningElement {
    name = '';
    team = '';
    skills = '';
    @track teamOptions = [];

    handleNameChange(event) {
        this.name = event.target.value;
    }

    handleTeamChange(event) {
        this.team = event.target.value;
    }

    handleSkillsChange(event) {
        this.skills = event.target.value;
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

    createTeamMember(){
        const fields = {};
        fields[NAME_FIELD.fieldApiName] = this.name;
        fields[TEAM_FIELD.fieldApiName] = this.team;
        fields[SKILLS_FIELD.fieldApiName] = this.skills;
        const recordInput = { apiName: TEAM_MEMBER_OBJECT.objectApiName, fields };
        createRecord(recordInput)
            .then(member => {
                this.name = '';
                this.team = '';
                this.skills = '';
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Member joined the team.',
                        variant: 'success',
                    }),
                );
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating member',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
            });
    }
}