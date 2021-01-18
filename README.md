# Salesforce DX Project: Next Steps

Now that you’ve created a Salesforce DX project, what’s next? Here are some documentation resources to get you started.

## How Do You Plan to Deploy Your Changes?

Go through the following steps to setup the project on your org
1. Clone directory: git clone https://github.com/meta-shashank-runthala/GoalAssignment.git
2. Navigate to the new GoalAssignment directory: cd GoalAssignment
3. Authorise your org: sfdx force:auth:web:login -s -a alias
4. Deploy the code to you org: sfdx force:source:deploy -p force-app/main/default
5. Assign the permission set to current user: sfdx force:user:permset:assign -n Teams_App_User
6. Import data: sfdx force:data:tree:import -p data/plan.json
7. Open your org: sfdx force:org:open
