public with sharing class TeamsAppController {
	
	@AuraEnabled(Cacheable=true)
	public static List<Team__c> getListOfTeams() {
		return [
			SELECT Id, Name
			FROM Team__c
			ORDER BY Name
		];
	}

	@AuraEnabled(Cacheable=true)
	public static List<TeamMember__c> getTeamMembers(String team) {
		return [ 
			SELECT Id, Name, Team__r.Name, Skills__c 
			FROM TeamMember__c 
			WHERE Team__c =: team 
			ORDER BY Name 
			LIMIT 50 
		];
	}
}
