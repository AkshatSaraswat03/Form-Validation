import React, { useEffect, useState } from 'react'
import axios from 'axios'


const DisplayInfo = () => {
  const [loading, setLoading] = useState(true)
  const [forms, setForms] = useState(null)


  useEffect(() => {

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const allForms = async () => {
      const { data } = await axios.get('/getForms', config);
      console.log(data)
      setForms(data)
      setLoading(false)

    }

    allForms()


  }, []);



  return (
    <div className='m-5 text-center'>
      <h2> Forms Submitted </h2>
      {loading ? <></> :
        <table className="table table-striped mt-5 table-hover">
          <thead>
            <tr>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>PHONE NUMBER</th>
              <th>DATE OF BIRTH</th>
            </tr>
          </thead>
          <tbody>
            {forms.map(form => (
              <tr key={form._id}>
                <td>{form.name}</td>
                <td>{form.email}</td>
                <td>{form.number}</td>
                <td>{form.dob}</td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </div>
  )
}

export default DisplayInfo
