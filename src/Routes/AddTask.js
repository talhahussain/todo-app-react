import React from 'react'
import { Redirect } from 'react-router-dom'
import axios from '../api/axios';
import history from '../history'
import Layout from '../components/Layout';

class AddTask extends React.Component {

     state = {
          description: '',
          completed: false,
          errorMessage: ''
          
     }

     onSubmit =async e => {

          e.preventDefault();

          this.setState({errorMessage: ''})
          const body = {description: this.state.description, completed: this.state.completed}
          const response = await axios.post('/todo/new', body, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})

          if(response.data.status === "Success"){

               history.push('/tasks')
          }
          else{

               this.setState({errorMessage: "Cannot Add the task"})
          }

     }

     render() {

          if(!localStorage.getItem('token'))
               return <Redirect to="/" />

          return(

               <Layout>
                    <div className="container my-5">
                         <div className="card ">
                              <h2 className="card-header text-center">Add New Task</h2>
                              <form onSubmit={this.onSubmit}>
                                   <div className="card-body">
                                        
                                        <div className="form-group">
                                             <label htmlFor="description">Description</label>
                                             <input 
                                                  type="description" 
                                                  className="form-control" 
                                                  placeholder="Enter description" 
                                                  id="description"
                                                  required
                                                  value={this.state.description}
                                                  onChange={e => this.setState({description: e.target.value})}
                                             />
                                        </div>
                                        <label className="form-check-label ml-4">
                                             
                                             <input 
                                                  type="checkbox" 
                                                  className="form-check-input mt-2"
                                                  checked={this.state.completed}
                                                  onChange={ e => this.setState({completed: e.target.checked})}
                                             
                                             />
                                             <span className="pt-2">Completed</span>
                                        </label>
                                        
                                   </div>
                                   <small className="text-danger ml-4">{this.state.errorMessage}</small>
                                   <div className="card-footer">
                                        <div className="d-flex justify-content-center">                   
                                             <div>
                                                  <button type="submit" className="btn btn-primary">Add</button>
                                             </div>
                                        </div>
                                        
                                   </div>
                              </form>
                         </div>
                    </div>
               </Layout>
          )
     }
}

export default AddTask;