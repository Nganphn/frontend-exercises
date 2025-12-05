import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {

  interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    title: string;
    department: string;
    image: string;
  }

  const [employees, setEmployees] = useState<Employee[]>([])

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

  function Employee({employee}: {employee: Employee}) {
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

  const employeeItems = employees.map((employee) =>
  <Employee key={employee.id} employee={employee}/>
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