public with sharing class MemberSkillsController {
    
    @AuraEnabled(Cacheable=true)
    public static List<Team__c> getListOfTeams() {
        return [
            SELECT Id, Name
            FROM Team__c
            ORDER BY Name
        ];
    }
}
