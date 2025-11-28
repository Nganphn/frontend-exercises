import React, { useState, useEffect } from 'react'
import { MdDelete, MdEdit } from "react-icons/md"
import { db, auth } from './firebase'
import { 
  collection, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  doc 
} from 'firebase/firestore';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import './App.css'

// banner component
function Banner() {
  return (
    <h1>Todo Example with React</h1>
  )
}

// form - button - list component
function ToDoFormAndList() {
  const [itemText, setItemText] = useState("")
  const [items, setItems] = useState([])
  const [editingItemId, setEditingItemId] = useState(null)

  // data is loading
  const [loading, setLoading] = useState(true);
  
  // load todo list items
  useEffect(() => {
    const fetchData = async () => {
      // connect todos collection
      const todosCol = collection(db, 'todos');
      const todoSnapshot = await getDocs(todosCol);
      // todo text and id 
      // document id is unique, so it can be used with deleting todo
      const todos = todoSnapshot.docs.map(doc => {
        return  { 
          text: doc.data().text,
          id: doc.id 
        };
      });
      // set states
      console.log(todos);
      setItems(todos);
      setLoading(false);
    }
    // start loading data
    console.log("fetch data...")
    fetchData();
  },[]); // called only once

  async function handleSubmit(e) {
    // prevent normal submit event
    e.preventDefault()
    const text = itemText.trim()
    if (!text) return  // prevent empty todos

    // if editing, update existing item
    if (editingItemId) {
      const updatedItems = items.map(item => {
        if (item.id === editingItemId) {
          return {...item, text: text};
        }
        else {
          return item
        }
      })
      // item = {
      //   id: 31231,
      //   asdasd: "12312",
      //   property1: 1,

      //   text: "something"
   
      // }
      setItems(updatedItems)
      setEditingItemId(null)
    }

    // otherwise, add a new item
    else {
      // add item to Firebase
      let newItem =  { text: text };
      const docRef = await addDoc(collection(db, "todos"), newItem);
      // get added doc id and set id to newItem
      newItem.id = docRef.id;
      // update states in App
      setItems( [...items, newItem]);
    }

    // clear input, back to default
    setItemText("")
  }

  const removeItem = (item) => {
    // delete from firebase
    deleteDoc(doc(db, "todos", item.id));
    // delete from items state and update state
    let filteredArray = 
      items.filter(collectionItem => collectionItem.id !== item.id);
    setItems(filteredArray); 
  }
  
  function startEditing(item) {
    setItemText(item.text)
    setEditingItemId(item.id)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type='text'
          placeholder="Write a new todo here"
          value={itemText}  // value is empty as default (only placeholder shown), changed by the setter which gets the data through value of the event when onChange.
          onChange={event => setItemText(event.target.value)}
        />
        <input
          type='submit'
          value={editingItemId ? "Update" : "Add"} // if editingItemId is true the value is "Update" otherwise the value is "Add"
        />
      </form>
      <ul>
        { loading  && 
        <p>Loading...</p>
        }

        {items.map(item => (
          <li key={item.id}>
            {item.text+" "}
            <MdEdit onClick={() => startEditing(item)} />
            <MdDelete onClick={() => removeItem(item)}/>
          </li>
        ))}
      </ul>
      <input
          type='button'
          value="Logout"
          onClick={() => signOut(auth)}
        />
    </>
  )
}

function LoginForm() {
  const [emailText, setEmailText] = useState('');
  const [passwordText, setPasswordText] = useState('');

  async function handleLogin(e) {
    e.preventDefault()
    const email = emailText.trim() 
    const password = passwordText.trim() 
    if (!email || !password)
      return
    await signInWithEmailAndPassword(auth, email, password)
    setEmailText('')
    setPasswordText('')
  }

  return (
    <>
      <form onSubmit={handleLogin} className="auth-form">
        <div className="form-row">
          <label htmlFor="email">Email:</label>
          <input
            id='email'
            type='text'
            value={emailText}  // value is empty as default
            onChange={event => setEmailText(event.target.value)}
          />
        </div>

        <div className="form-row">
          <label htmlFor="password">Password:</label>
          <input
            id='password'
            type='password'
            value={passwordText}  // value is empty as default
            onChange={event => setPasswordText(event.target.value)}
          />
        </div>

        <div className="form-actions">
          <input
            type='submit'
            value="Login"
          />
        </div>
      </form>
    </>
  )
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user)
    } else {
      setUser(null)
    }
    })
  }, [])

  return (
    <>
      <Banner/>
      {user ? <ToDoFormAndList/> : <LoginForm />}
    </>
  )
}

export default App