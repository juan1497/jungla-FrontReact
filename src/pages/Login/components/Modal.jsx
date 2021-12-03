import React, { useState } from 'react'
import "./Modal.css"
import { register } from "../../../api/fetch_user"
import { useHistory } from "react-router"
import { useFormik } from "formik"
const Modal = () => {
  const history = useHistory();
  const validate=(values) => {
    const errors = {};
    if(!values.name){
      errors.name = "Required";
    }
    if (!values.email) {
      errors.email = "Required";
    } else if (values.email.length < 4) {
      errors.email = "Must be 5 characters or more";
    }
    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 8) {
      errors.password = "Must be 8 characters or more";
    } 

    if (!values.repeatPassword) {
      errors.repeatPassword = "Required";
    } else if (values.repeatPassword !== values.password) {
      errors.repeatPassword = "Second password doesn't match";
    }
    return errors;
  }

  const registerForm = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      repeatPassword: ""
    },validate, onSubmit: async  (values) => {
      try{
        await register(values)
        registerForm.resetForm();
        alert("Registrado ")
      }catch(err){
        alert(err)
      }
    }
  })
  return (
    <>
      <div class="modal fade" id="Register" tabindex="-1" aria-labelledby="RegisterLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="RegisterLabel">Registro</h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="">
                <form onSubmit={registerForm.handleSubmit}>
                  <p>Ingresa Tus datos para registrarte</p>
                  <input name="name" onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} value={registerForm.values.name} type="text" placeholder="Nombre" />
                  {registerForm.touched.name && registerForm.errors.name ? (
                    <p className="error">{registerForm.errors.name}</p>
                  ) : null}
                  <input name="email" onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} value={registerForm.values.email} type="email" placeholder="Email" />
                  {registerForm.touched.email && registerForm.errors.email ? (
                    <p className="error">{registerForm.errors.email}</p>
                  ) : null}
                  <input name="password" onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} value={registerForm.values.password} type="password" placeholder="Contraseña" />
                  {registerForm.touched.password && registerForm.errors.password ? (
                    <p className="error">{registerForm.errors.password}</p>
                  ) : null}
                  <input name="repeatPassword" onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} value={registerForm.values.repeatPassword} type="password" placeholder="Repite la Contraseña" />
                  {registerForm.touched.repeatPassword && registerForm.errors.repeatPassword ? (
                    <p className="error">{registerForm.errors.repeatPassword}</p>
                  ) : null}
                  <button type="submit" data-bs-dismiss="modal">Registrarse</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Modal
