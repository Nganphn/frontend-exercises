import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {

  const [employees, setEmployees] = useState([])

  async function fetchData() {
    try {
      let response = await axios.get('http://localhost:3001/employees');
      setEmployees(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  function Employee({employee}) {
  return (
    <div className="Employee">
      <img src={employee.image} alt={employee.firstName} />
      <h4>{employee.lastName} {employee.firstName}</h4>
      <p>{employee.title}</p>
      <p>{employee.department}</p>
      <p>{employee.phone}</p>
      <a href={`mailto:${employee.email}`}>{employee.email}</a>
    </div>
  )
  }

  const employeeItems = employees.map((employee,index) =>
  <Employee key={index} employee={employee}/>
  )

  return (
    <>
      <h1>Employee Directory</h1>
      <div className="EmployeeList">
        {employeeItems}
      </div>
    </>
)
}

export default App

// This part helped me understand the connection between the function, the call of the function, and its return value.

// I can now see more clearly what it means when a function returns JSX.
// It's not a "return value" in the traditional programming sense, but rather a description of what should appear on the UI.
// In React, the returned JSX defines what will be rendered (in this case, lastName firstName).
// That's why JSX feels intuitive, because it looks similar to HTML.

// I picture it like this: when .map() returns JSX, it's calling a function (Employee) for each element in the array.
// Each call needs "materials" to work with, here, that's the 'employee' object and all its properties.
// The function (Employee) then uses those properties to decide what to display on the screen.
// Finally, it returns the JSX structure that represents one employee element on the UI.

// One thing I'm still learning about is why React needs unique keys. 
// It's said that keys help React identify the same elements between renders, so it can efficiently update or reuse them.

// I also didn't understand at first why the 'employeeItems' variable becomes an array.
// There's no explicit definition of it as an array, but that's because .map() always returns a new array.
// So React sees 'employeeItems' as an array of elements, each one representing an <Employee /> component.


// Interestingly, it's like when React receives an "order" for one {employeeItems},
// it makes sure to deliver what was promised: it reconciles the elements, 
// calls Employee for each one, and finally produces the final "product", the rendered DOM on the screen.