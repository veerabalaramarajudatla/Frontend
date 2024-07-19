import React, { useState } from 'react';

function App() {
  const [userName, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [employees, setEmployees] = useState([]);

  const handleSubmit = async () => {
    const employee = { userName, phone };
    try {
      const response = await fetch('http://localhost:8080/api/employee/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
      });
      if (response.ok) {
        alert('Employee added successfully');
      } else {
        alert('Failed to add employee');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  const handleList = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/employee/getall/employees');
      if (response.ok) {
        const data = await response.json();
        setEmployees(data);
      } else {
        alert('Failed to fetch employees');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  return (
    <div className="App">
      <h1>Employee Form</h1>
      <div>
        <label>
          User Name:
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Phone:
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
      </div>
      <div>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleList}>List</button>
      </div>
      <div>
        <h2>Employees List</h2>
        <ul>
          {employees.map((employee, index) => (
            <li key={index}>{employee.userName} - {employee.phone}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;