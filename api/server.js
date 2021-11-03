const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { MongoClient } = require('mongodb');
const multer  = require('multer')

//-------- config multer ---------//
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'F:/Програмування/JavaScript/diploma-vue-node/my-app/src/assets/images')
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
    await collection.replaceOne({_id: taskObj._id}, taskObj);

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

// ------- update user start ------//
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
// ------- update user finish ------//

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
//-------------DB connection END ------------------//



app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '../my-app/public/test.html'));
});

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
  addUserPost(req);
  return res.sendStatus(200);
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
  console.log(req.body._id);

  async function callUpdateTask(reqBody){
    console.log('api/updateTask called !!!');

    await updateTask(reqBody);
    res.sendStatus(200);
    console.log('/api/updateTask - finished');
  }
  callUpdateTask(req.body)

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


app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});
