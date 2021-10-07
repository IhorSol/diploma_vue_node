const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { MongoClient } = require('mongodb');


const port = 3080;

const app = express();

app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({extended: false});

const users = [
  {name: 'Ihor', age: 29}
];

//-------------DB connection Start------------------//
async function main() {  // first DB function. Get users drom base -> findUsers()

  const uri = "mongodb+srv://admin:admin@cluster0.uvxe1.mongodb.net/task_manager?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  try {
    await client.connect();
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}


async function findUsers(client){ // get all users drom DB
  const collection = client.db("task_manager").collection("users");
  const usersArr = await collection.find({}).toArray();
  const numberOfUsers = await collection.countDocuments();
  console.log(usersArr);
  console.log('Number of users - ' + numberOfUsers);
  console.log('Next user ID = ' + (numberOfUsers + 1));
}

async function addUser(client) { // insert test user into DB. TEST function
  const collection = client.db("task_manager").collection("users");
  const usersArr = await collection.insertOne(
    {
      "name":"George",
      "position":"admin",
      "email":"admin@test.ru",
      "department":"IT",
    }
  );
  console.log(usersArr);
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

    const taskArr = await collection.insertOne(taskToAdd);
    console.log(taskArr);

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }

}
//---------- запрос в базу на додавання задачі кінець ----------//

async function allTasksSetByMe(userIdObj) {
  const uri = "mongodb+srv://admin:admin@cluster0.uvxe1.mongodb.net/task_manager?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  let allTasks = [];

  try {
    await client.connect();
    const collection = client.db("task_manager").collection("tasks");
    // allTasks = await collection.find({creator: userIdObj.id, status: 'new', }).toArray();
    allTasks = await collection.find({creator: userIdObj.id, $or: [ { status: 'new' }, { status: 'finished' } ] }).toArray();
    
    // $or: [ { <expression1> }, { <expression2> }, ... , { <expressionN> } ]
    return allTasks;

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }

}

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
app.post('/api/contacts', urlencodedParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);
  console.log(req.body);
  addUserPost(req);
  return res.sendStatus(200);
});

// receives info for POST from TaskForm.vue
app.post('/api/createTask', urlencodedParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);
  console.log(req.body);

  async function callAddTaskPost(req){
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
