import React, { useState } from 'react'
import { MdDelete, MdEdit } from "react-icons/md"
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

  function handleSubmit(e) {
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

    // otherwise, add a new item normally
    else {
      setItems([...items, {id: Math.random(), text: itemText}])
    }

    // clear input, back to default
    setItemText("")
  }

  function removeItem(id) {
    // filter/remove item with id
    const newItems = items.filter(item => item.id !== id);
    // set new items
    setItems(newItems);
  }
  
  function startEditing(item) {
    setItemText(item.text)
    setEditingItemId(item.id)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
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
        {items.map(item => (

          <li key={item.id}>
            {item.text+" "}
            <MdEdit onClick={() => startEditing(item)} />
            <MdDelete onClick={() => removeItem(item.id)}/>
          </li>
          
        ))}
      </ul>
    </>
  )
}

function App() {
  return (
    <>
      <Banner/>
      <ToDoFormAndList/>
    </>
  )
}

export default App