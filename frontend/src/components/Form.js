import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios'

const Form = ({ history }) => {
  const validationSchema = Yup.object().shape({

    name: Yup.string()
      .required('Name is required'),
    dob: Yup.string()
      .required('Date of Birth is required')
      .matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, 'Date of Birth must be a valid date in the format YYYY-MM-DD'),
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const [ageError, setAgeError] = useState(false);
  const [numberError, setNumberError] = useState(false);

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }


  const onSubmit = async (info) => {

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    let val = JSON.stringify(info);
    let age = getAge(info.dob);
    if (age < 18) {
      setAgeError(true);
      return;
    }

    setAgeError(false);
    let { data } = await axios.post('/verify', val, config)
    console.log(data)
    if (data === "Invalid Number") {
      setNumberError(true);
    }
    else {
      setNumberError(false);
      history.push('/displayInfo')
    }
  }

  return (
    <div className='m-5'>

      <div className="card m-3">
        <h3 className="card-header text-center">Form Validation</h3>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row">
              <div className="form-group col-4"></div>
              <div className="form-group col-4">
                <label>Name</label>
                <input name="name" type="text" {...register('name')} className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                <div className="invalid-feedback">{errors.name?.message}</div>
              </div>
              <div className="form-group col-4"></div>
            </div>
            <div className="form-row">
              <div className="form-group col-4"></div>
              <div className="form-group col-4">
                <label>Date of Birth</label>
                <input name="dob" type="date" {...register('dob')} className={`form-control ${errors.dob || ageError ? 'is-invalid' : ''}`} />
                <div className="invalid-feedback">{ageError ? 'Age should be above 18' : errors.dob?.message}</div>
              </div>
              <div className="form-group col-4"></div>
            </div>
            <div className="form-row">
              <div className="form-group col-4"></div>
              <div className="form-group col-4">
                <label>Email</label>
                <input name="email" type="text" {...register('email')} className={`form-control ${errors.email || numberError ? 'is-invalid' : ''}`} />
                <div className="invalid-feedback">{numberError ? 'Invalid Number' : errors.email?.message}</div>
              </div>
              <div className="form-group col-4"></div>
            </div>
            <div className="form-row">
              <div className="form-group col-4"></div>
              <div className="form-group col-4">
                <label>Phone Number with '+91' </label>
                <input name="phone" type="text" {...register('number')} className='form-control' />
              </div>
              <div className="form-group col-4"></div>
            </div>
            <div className="form-group text-center mt-3">
              <button type="submit" className="btn btn-primary mr-1">Register</button>
              <button type="button" onClick={() => reset()} className="btn btn-secondary">Reset</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Form
