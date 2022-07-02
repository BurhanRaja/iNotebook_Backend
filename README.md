# Backend of iNotebook

1. Description

This repo contains the BackEnd (REST API) i.e. server side rendering for the iNotebook app. This api is based on the CRUD application , i.e. Create Read Update Delete. The use of this application is to help people to save their thoughts, TODOs, quick note and many more. You can add your note with title, description and tag/tags. You have to be logged in to use all CRUD functionalities.

2. Folder Structure
```
- middleware
    |--------> fecthuser.js
- models
    |------------> Note.js
    |------------> User.js


- rotes
    |------------> auth.js
    |------------> notes.js
- .gitignore
- db.js
- index.js
- package-lock.json
- package.json
- README.md
```

3. To install all the dependencies from package.json

```npm install```

4. Technologies used for this REST API

![image](https://user-images.githubusercontent.com/76507095/176988409-f921fa53-1122-4b3e-abce-3761510a59b5.png)

![image](https://user-images.githubusercontent.com/76507095/176988413-b276b231-be48-4705-9a86-ec05900dbbf8.png)

![image](https://user-images.githubusercontent.com/76507095/176988439-28a480e6-c30a-4361-b0a7-1ff70c2df990.png)
