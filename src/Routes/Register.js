import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from '../api/axios'

class Register extends React.Component {


     state = {
          name:'',
          email: '',
          password: '',
          confirmPassword: '',
          errorMessage: '',
          successMessage: ''
     }

     onSubmit = async (e) => {

          e.preventDefault();

          this.setState({errorMessage: '', successMessage: ''})
          if(this.state.password !== this.state.confirmPassword)
               this.setState({errorMessage: 'Confirm Password field does not match'})
          else{

               try{

                    const body = {name: this.state.name, email: this.state.email, password: this.state.password, confirmPassword: this.state.password}
                    await axios.post('/user/signup',body)
                    this.setState({successMessage: "Successfully register, You can now login"})

               }
               catch(err){

                    this.setState({errorMessage: "User already exist please try with other email"})

               }


          }
     }

     render() {

          if(localStorage.getItem('token'))
               return <Redirect to="/tasks" />
               
          return(

               <div className="container mt-5">
                    <div className="card ">
                         <h2 className="card-header text-center">Signup</h2>
                         <form onSubmit={this.onSubmit}>
                              <div className="card-body py-0">
                                   <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input 
                                             type="text" 
                                             className="form-control" 
                                             placeholder="Enter Name" 
                                             id="name"
                                             required
                                             value={this.state.name}
                                             onChange={e => this.setState({name: e.target.value})}
                                        />
                                   </div>
                                   <div className="form-group">
                                        <label htmlFor="email">Email address:</label>
                                        <input 
                                             type="email" 
                                             className="form-control" 
                                             placeholder="Enter email" 
                                             id="email"
                                             required
                                             value={this.state.email}
                                             onChange={e => this.setState({email: e.target.value})}
                                        />
                                   </div>
                                   <div className="form-group">
                                        <label htmlFor="pwd">Password:</label>
                                        <input 
                                             type="password" 
                                             className="form-control" 
                                             placeholder="Enter password" 
                                             id="pwd"
                                             required
                                             value={this.state.password}
                                             onChange={e => this.setState({password: e.target.value})} 
                                        />
                                   </div>
                                   <div className="form-group">
                                        <label htmlFor="c-pwd">Confirm Password:</label>
                                        <input 
                                             type="password" 
                                             className="form-control" 
                                             placeholder="Enter confirm password" 
                                             id="c-pwd"
                                             required
                                             value={this.state.confirmPassword}
                                             onChange={e => this.setState({confirmPassword: e.target.value})}
                                        />
                                   </div>
                              </div>
                              <small className="text-danger p-0 ml-4">{this.state.errorMessage}</small>
                              <small className="text-success p-0 ml-3">{this.state.successMessage}</small>
                              
                              <div className="card-footer">
                                   <div className="d-flex justify-content-center">                   
                                        <div>
                                             <button type="submit" className="btn btn-primary">Register</button>
                                        </div>
                                        <div>
                                             <Link to="/" className="btn btn-secondary ml-4">Back</Link>
                                        </div>
                                   </div>
                                   
                              </div>
                         </form>
                    </div>
               </div>
          )
     }
}

export default Register;