# ng-project
angular
---

in order to start backend start MongoDB 

and run 
 
    SET DEBUG=ng-project:* & npm start

default URI for database is mongodb://localhost:27017/testDB

In order to start MongoDB please run following command:

    mongod --dbpath="[project-folder]\mongodb\data"
    
If mongod service is already running, you can stop it and try previous command again (in Windows `net stop MongoDB`)    


TODO
---
- set DB schemes seperately;
- link tables in one DB (one-to-many, etc);
- protect REST api requests from unathorized access;
- set admin account;
- set authorization for users;
- (optionally) set up admin panel;

MEAN stack
---
MongoDB (Mongoose) + Express + AngularJS + Node.js