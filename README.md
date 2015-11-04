ASP.NET 5/ VS2015 env, AngularJS/Bootstrap.

Navigate to /OmegaTask folder where prackage.json and project json are:
$ npm install - installs /Dependencies based on package.json
$ dnu restore - restore /References.

In Depenedencies: Grunt files, used by Gruntfile. 
in order to minimize and uglify AngularJS scrips (/OmegaTask/Scripts folder)
and deploy on Client-side: /wwwroot/app.js

In /db folder: .mdf and .ldf db files. According to ConnectionString from /OmegaTask/Config.json, ContactsDatabase.mdf and .ldf files are created. 
(you can copy these files somewhere on your computer, based on SQL Servera configuration)

WEB APP
local:   localhost:port/api/contacts/, localhost:port/api/contacts/id
		 localhost:port/api/numbers/, localhost:port/api/numbers/contactId
