import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from '../api/axios';

class Login extends React.Component {

     state = {
          email: '',
          password: '',
          errorMessage: '',
          
     }

     onSubmit =async e => {

          e.preventDefault();

          try{

               const body = {email: this.state.email, password: this.state.password}
               const response = await axios.post('/user/login', body)
               localStorage.setItem("token", response.data.token)
               localStorage.setItem("user", JSON.stringify(response.data.user))
               this.setState({errorMessage: ''})

          }
          catch(err){
               this.setState({errorMessage: 'Invalid user name or password'})
          }

     }

     render() {

          if(localStorage.getItem('token'))
               return <Redirect to="/tasks" />

          return(

               <div className="container mt-5">
                    <div className="card ">
                         <h2 className="card-header text-center">Login</h2>
                         <form onSubmit={this.onSubmit}>
                              <div className="card-body">
                                   
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
                                             value={this.state.password}
                                             onChange={e => this.setState({password: e.target.value})} 
                                        />
                                   </div>
                                   
                                   
                                   
                              </div>
                              <div className="card-footer">
                                   <div className="d-flex justify-content-center">                   
                                        <div>
                                             <button type="submit" className="btn btn-primary">Login</button>
                                        </div>
                                        <div>
                                             <Link to="/register" className="btn btn-secondary ml-4">Signup</Link>
                                        </div>
                                   </div>
                                   
                              </div>
                         </form>
                    </div>
               </div>
          )
     }
}

export default Login;