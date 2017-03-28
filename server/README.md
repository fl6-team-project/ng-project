# ng-project
angular
---

in order to start backend install required packages `npm install` & run
 
    SET DEBUG=ng-project:* & npm start

Default database set up at mLabs.

When user registers - his role by default is 'user'. Admin would be able to change it

New student's default pass: 'temporary_password'; teacher's default pass: 'teacher_tmp'

TODO
---
- set DB schemes seperately; - done
- link tables in one DB (one-to-many, etc); - in progress
- protect REST api requests from unathorized access; - in progress
- set admin account; - done
- set authorization for users; - done
- (optionally) set up admin panel; - in progress

MEAN stack
---
MongoDB (Mongoose) + Express + AngularJS + Node.js