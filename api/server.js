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
    // await addUser(client);
    // await findUsers(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

// main().catch(console.error);


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

async function addTaskPost(req) { //insert user from form from TaskForm.vue
  const uri = "mongodb+srv://admin:admin@cluster0.uvxe1.mongodb.net/task_manager?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  const taskToAdd = req.body;

  try {
    await client.connect();
    const collection = client.db("task_manager").collection("tasks");
    //user ID based on number of docs in collection "tasks"
    taskToAdd._id = await collection.countDocuments() + 1;
    taskToAdd.status = 'new';
    const taskArr = await collection.insertOne(taskToAdd);
    console.log(taskArr);

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }

}

async function getAllTasks() {
  const uri = "mongodb+srv://admin:admin@cluster0.uvxe1.mongodb.net/task_manager?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  let allTasks = [];

  try {
    await client.connect();
    const collection = client.db("task_manager").collection("tasks");
    allTasks = await collection.find({}).toArray(); // await collection.find({}).toArray()
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
  addTaskPost(req);
  return res.sendStatus(200);
});

// get all tasks from collection
app.get('/api/allTasks', (req, res) => {
  async function callGetAllTasks(){
    console.log('api/allTasks called !!!');
    var allTasks = await getAllTasks(); //await getAllTasks();
    res.json(allTasks);
    console.log(allTasks);
    console.log('app.get(/api/allTasks - finished');
  }
  callGetAllTasks()
});


app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});
