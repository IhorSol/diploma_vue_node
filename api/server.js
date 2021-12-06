const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { MongoClient } = require('mongodb');
const multer  = require('multer')

//-------- config multer ---------//
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'E:/Front-end/task_manager_and_server_part/diploma_vue_node/my-app/src/assets/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
//-------- config multer ---------//

const port = 3080;

const upload = multer({ storage: storage }) // using multer
const app = express();

app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({extended: false});

//-------------DB connection Start------------------//
async function findUsers(client){ // get all users drom DB
  const collection = client.db("task_manager").collection("users");
  const usersArr = await collection.find({}).toArray();
  const numberOfUsers = await collection.countDocuments();
  console.log(usersArr);
  console.log('Number of users - ' + numberOfUsers);
  console.log('Next user ID = ' + (numberOfUsers + 1));
}

async function addUserPost(req) { //insert user from form from AddUserForm.vue
  const uri = "mongodb+srv://admin:admin@cluster0.uvxe1.mongodb.net/task_manager?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  const userToAdd = req.body;

  try {
    await client.connect();
    const collection = client.db("task_manager").collection("users");
    //user ID based on number of docs in collection "users"
    userToAdd._id = await collection.countDocuments() + 1;
    const usersArr = await collection.insertOne(userToAdd);
    console.log(usersArr);

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }

}

//---------- запрос в базу на додавання задачі початок ----------//
async function addTaskPost(req) {
  const uri = "mongodb+srv://admin:admin@cluster0.uvxe1.mongodb.net/task_manager?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  const taskToAdd = req.body;

  try {
    await client.connect();
    const collection = client.db("task_manager").collection("tasks");
    taskToAdd._id = await collection.countDocuments() + 1;
    taskToAdd.status = 'new'; // до задачі додається статус "new"
    taskToAdd.isLooked = false; // чи задача переглянута виконвцем
    taskToAdd.isAccepted = false; // чи задача прийнята постановником
    taskToAdd.comments = []; // масив для коментарів

    const taskArr = await collection.insertOne(taskToAdd);
    console.log(taskArr);

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
//---------- запрос в базу на додавання задачі кінець ----------//

//---------- allTasksSetByMe started ------------//
async function allTasksSetByMe(userIdObj) { // find all tasks set by me with statuses 'new' or 'finished' and isAccepted: 'false'
  const uri = "mongodb+srv://admin:admin@cluster0.uvxe1.mongodb.net/task_manager?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  let allTasks = [];

  try {
    await client.connect();
    const collection = client.db("task_manager").collection("tasks");
    allTasks = await collection.find({creator: userIdObj.id, isAccepted: false, $or: [ { status: 'new' }, { status: 'finished' } ] }).toArray();
    return allTasks;

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
//---------- allTasksSetByMe finihsed ------------//

//---------- getAllUsers started ------------//
async function getAllUsers() {
  const uri = "mongodb+srv://admin:admin@cluster0.uvxe1.mongodb.net/task_manager?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  let allUsers = [];

  try {
    await client.connect();
    const collection = client.db("task_manager").collection("users");
    allUsers = await collection.find({}).toArray();
    return allUsers;

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
//---------- getAllUsers finihsed ------------//

// ----------- task update start ---------//
async function updateTask(taskObj) {
  const uri = "mongodb+srv://admin:admin@cluster0.uvxe1.mongodb.net/task_manager?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  console.log('Log from updateTask. Inc obj');
  console.log(taskObj);

  try {
    await client.connect();
    const collection = client.db("task_manager").collection("tasks");
    await collection.updateOne({_id: taskObj.taskId}, {$set: {title: taskObj.taskTitle, deadline: taskObj.taskDeadline, complication: taskObj.taskComplexity, taskDescription: taskObj.taskDescription, performer: taskObj.taskPerformer}});

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }

}
// ----------- task update end ---------//

// ----------- set task status is Finished start ---------//
async function setTaskFinished(taskObj) {
  const uri = "mongodb+srv://admin:admin@cluster0.uvxe1.mongodb.net/task_manager?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  console.log('Log from updateTask. Inc obj');
  console.log(taskObj);

  try {
    await client.connect();
    const collection = client.db("task_manager").collection("tasks");
    await collection.updateOne({_id: taskObj._id}, {$set: {status: "finished"}});

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
// ----------- set task status is Finished end ---------//

// ----------- set task isLooked start ---------//
async function setTaskIsLooked(taskObj) {
  const uri = "mongodb+srv://admin:admin@cluster0.uvxe1.mongodb.net/task_manager?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  console.log('Log from updateTask. Inc obj');
  console.log(taskObj);

  try {
    await client.connect();
    const collection = client.db("task_manager").collection("tasks");
    await collection.updateOne({_id: taskObj._id}, {$set: {isLooked: true}});

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
// ----------- set task isLooked end ---------//

// ----------- set task isAccepted start ---------//
async function setTaskIsAccepted(taskObj) {
  const uri = "mongodb+srv://admin:admin@cluster0.uvxe1.mongodb.net/task_manager?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  console.log('Log from updateTask. Inc obj');
  console.log(taskObj);

  try {
    await client.connect();
    const collection = client.db("task_manager").collection("tasks");
    await collection.updateOne({_id: taskObj._id}, {$set: {isAccepted: true}});

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
// ----------- set task isAccepted end ---------//

// ----------- add task comments start ---------//
async function addComentToTask(taskObj) {
  const uri = "mongodb+srv://admin:admin@cluster0.uvxe1.mongodb.net/task_manager?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  console.log('Log from addComentToTask. Inc obj');
  console.log(taskObj);

  try {
    await client.connect();
    const collection = client.db("task_manager").collection("tasks");
    await collection.updateOne({_id: taskObj._id}, {$set: {comments: taskObj.comments}});

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
// ----------- add task comments end ---------//

//------------ delete task start -------//
async function deleteTask(taskObj) {
  const uri = "mongodb+srv://admin:admin@cluster0.uvxe1.mongodb.net/task_manager?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  console.log('Log from delete task. Inc obj');
  console.log(taskObj);

  try {
    await client.connect();
    const collection = client.db("task_manager").collection("tasks");
    await collection.deleteOne({_id: taskObj.id});

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }

}
//------------ delete task end -------//


// ------- get all current user tasks with NEW status ------/
async function allMyTasks(userIdObj) {
  const uri = "mongodb+srv://admin:admin@cluster0.uvxe1.mongodb.net/task_manager?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  let allTasks = [];

  try {
    await client.connect();
    const collection = client.db("task_manager").collection("tasks");
    allTasks = await collection.find({performer: userIdObj.id, status: 'new'}).toArray();
    return allTasks;

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
// ------- get all current user tasks with NEW status finished -------- //

// ------- update user field - employee_workload start ------//
async function updateUser(userObj) {
  const uri = "mongodb+srv://admin:admin@cluster0.uvxe1.mongodb.net/task_manager?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  console.log('Log from updateUser. Inc obj');
  console.log(userObj);

  try {
    await client.connect();
    const collection = client.db("task_manager").collection("users");
    await collection.updateOne({_id: userObj.id}, {$set: {employee_workload: userObj.new_employee_workload}});

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }

}
// ------- update user field - employee_workload finish ------//

// ---------- check user avtirization started ------------ //
async function checkUser(userObj) {
  const uri = "mongodb+srv://admin:admin@cluster0.uvxe1.mongodb.net/task_manager?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  let checkedUser = '';

  try {
    await client.connect();
    const collection = client.db("task_manager").collection("users");
    checkedUser = await collection.find({login: userObj.login, password: userObj.password}).toArray();
    return checkedUser;

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }

}
// ---------- check user avtirization finished ------------ //

//------------ delete user start -------//
async function deleteUser(userIdObj) {
  const uri = "mongodb+srv://admin:admin@cluster0.uvxe1.mongodb.net/task_manager?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  console.log('Log from delete User. Inc obj');
  console.log(userIdObj);

  try {
    await client.connect();
    const collection = client.db("task_manager").collection("users");
    await collection.deleteOne({_id: userIdObj.id});

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }

}
//------------ delete user end -------//

//---------- getAllNews started ------------//
async function getAllNews() {
  const uri = "mongodb+srv://admin:admin@cluster0.uvxe1.mongodb.net/task_manager?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  let allNews = [];

  try {
    await client.connect();
    const collection = client.db("task_manager").collection("news");
    allNews = await collection.find({}).toArray();
    return allNews;

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
//---------- getAllNews finihsed ------------//

//---------- add news started ----------//
async function addNews(req) {
  const uri = "mongodb+srv://admin:admin@cluster0.uvxe1.mongodb.net/task_manager?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const collection = client.db("task_manager").collection("news");
    req.body._id = await collection.countDocuments() + 1;
    await collection.insertOne(req.body);

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
//---------- add news finished ----------//

//-------------DB connection END ------------------//


app.get('/api/allUsers', (req, res) => {
  async function callGetAllUsers(){
    console.log('api/allUsers called !!!');
    var allUsers = await getAllUsers();
    res.json(allUsers);
    console.log(allUsers);
    console.log('app.get(/api/allUsers - finished');
  }
  callGetAllUsers()
});

// receives info for POST from AddUserForm.vue
// upload.single('avatar') - uploads image using multer
app.post('/api/contacts', upload.single('avatar'), urlencodedParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);
  console.log(req.body);
  console.log(req.file);
  // console.log(req.body.image = req.file.originalname);
  // console.log(req.body);
  req.body.image = req.file.originalname
  req.body.employee_workload = parseInt(req.body.employee_workload);
  addUserPost(req);
  res.redirect("/settings.html");
});

// receives info for POST from TaskForm.vue
app.post('/api/createTask', urlencodedParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);
  console.log(req.body);

  let userObj = {'id': parseInt(req.body.performer), 'new_employee_workload': req.body.new_employee_workload}
  delete req.body.new_employee_workload

  console.log(req.body);
  console.log(userObj);

  async function callAddTaskPost(req){
    await updateUser(userObj);
    await addTaskPost(req);
    res.redirect("/set_task.html")
  }
  callAddTaskPost(req)
});

// get all tasks from collection //
app.post('/api/tasksSetByMe', (req, res) => {

  async function callTasksSetByMe(){
    console.log('api/tasksSetByMe called !!!');
    console.log(req.body);
    var tasksSetByMe = await allTasksSetByMe(req.body);
    res.json(tasksSetByMe);
    console.log(tasksSetByMe);
    console.log('/api/tasksSetByMe - finished');
  }
  callTasksSetByMe()
});

// ------------ task update start ---------------//
app.post('/api/updateTask', urlencodedParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);
  console.log('/api/updateTask receiced');
  console.log(req.body);
  let userObj = req.body.user;
  console.log(userObj);
  delete req.body.user;
  if (req.body.userBeforeEdit) {
    var userBeforeEdit = req.body.userBeforeEdit;
    console.log(userBeforeEdit);
    delete req.body.userBeforeEdit;
  }
  let taskObj = req.body;

  async function callUpdateTask(taskObj, userObj, userBeforeEdit = 'undifined'){
    console.log('api/updateTask called !!!');
    await updateUser(userObj);
    if (userBeforeEdit !== 'undifined') {
      try {
        await updateUser(userBeforeEdit);
      } catch (e) {
        console.error(e);
      }
    }
    await updateTask(taskObj);
    res.sendStatus(200);
    console.log('/api/updateTask - finished');
  }
  if (userBeforeEdit) {
    callUpdateTask(taskObj, userObj, userBeforeEdit)
  } else {
    callUpdateTask(taskObj, userObj)
  }

});
// ------------ task update end ---------------//

// ------------ set task finished start ---------------//
app.post('/api/finishTask', urlencodedParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);
  console.log('/api/finishTask receiced');
  console.log(req.body);
  console.log(req.body._id);

  async function callSetTaskFinished(reqBody){
    console.log('api/finishTask called !!!');

    await setTaskFinished(reqBody);
    res.sendStatus(200);
    console.log('/api/updateTask - finished');
  }
  callSetTaskFinished(req.body)

});
// ------------ set task finished end ---------------//

// ------------ set task isLooked start ---------------//
app.post('/api/markAsLooked', urlencodedParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);
  console.log('/api/markAsLooked receiced');
  console.log(req.body);
  console.log(req.body._id);

  async function callSetTaskIsLooked(reqBody){
    console.log('api/finishTask called !!!');

    await setTaskIsLooked(reqBody);
    res.sendStatus(200);
    console.log('/api/updateTask - finished');
  }
  callSetTaskIsLooked(req.body)

});
// ------------ set task isLooked end ---------------//

// ------------ set task isAccepted start ---------------//
app.post('/api/acceptTask', urlencodedParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);
  console.log('/api/acceptTask receiced');
  console.log(req.body);
  console.log(req.body._id);

  async function callSetTaskIsAccepted(reqBody){
    console.log('api/finishTask called !!!');

    await setTaskIsAccepted(reqBody);
    res.sendStatus(200);
    console.log('/api/updateTask - finished');
  }
  callSetTaskIsAccepted(req.body)

});
// ------------ set task isAccepted end ---------------//

// ---------- get all my tasks started----------//
app.post('/api/myTasks', (req, res) => {
  async function callGetMyTasks(){
    console.log('api/myTasks called !!!');
    console.log(req.body);
    var myTasks = await allMyTasks(req.body); //await getAllMyTasks();
    res.json(myTasks);

    console.log(myTasks);
    console.log('api/myTasks called - finished');
  }
  callGetMyTasks()
});
// ---------- get all my tasks finifshed----------//

// ---------- delete task started --------------//
app.post('/api/deleteTask', (req, res) => {
  async function callDeleteTask(){
    console.log('api/deleteTask - called !!!');
    console.log(req.body);
    await deleteTask(req.body);
    res.sendStatus(200);
    console.log('api/deleteTask - finished !!!');
  }
  callDeleteTask()
});
// ---------- delete task finihsed -------------//

// ---------- add comment to task started -------------//
app.post('/api/addComment', urlencodedParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);
  console.log('/api/addComment receiced');
  console.log(req.body);

  async function calladdComentToTask(reqBody){
    console.log('api/addComentToTask called !!!');

    await addComentToTask(reqBody);
    res.sendStatus(200);
    console.log('/api/addComentToTask - finished');
  }
  calladdComentToTask(req.body)

});
// ---------- add comment to task finihsed -------------//

//------ check user while autorization -------//
app.post('/api/checkUser', urlencodedParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);
  console.log('/api/checkUser started');
  console.log(req.body);

  async function callCheckUser(reqBody){
    console.log('api/checkUser called !!!');
    var checkedUser = await checkUser(reqBody);
    res.json(checkedUser);
    console.log(checkedUser);
    console.log('/api/checkUser - finished');
  }
  callCheckUser(req.body)
});
//------ check user while autorization finished -------//

//------ deleteUser started --------//
app.post('/api/deleteUser', (req, res) => {
  async function callDeleteUser(){
    console.log('api/deleteUser - called !!!');
    console.log(req.body);
    await deleteUser(req.body);
    res.sendStatus(200);
    console.log('api/deleteUser - finished !!!');
  }
  callDeleteUser()
});
//------ deleteUser finished --------//

// ------- get allNews started ------------//
app.get('/api/allNews', (req, res) => {
  async function callGetAllNews(){
    console.log('api/allNews called !!!');
    var allNews = await getAllNews();
    res.json(allNews);
    console.log('app.get(/api/allNews - finished');
  }
  callGetAllNews()
});

// ------- get allNews finished ------------//

// ----------- create news started --------- //
app.post('/api/createNews', urlencodedParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);
  console.log(req.body);

  async function callAddNews(req){
    await addNews(req);
    res.redirect("/news.html");
  }
  callAddNews(req)
});
// ----------- create news finished --------- //

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});
