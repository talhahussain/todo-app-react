import React from 'react'
import Layout from '../components/Layout';
import axios from '../api/axios';
import { Link, Redirect } from 'react-router-dom';


class Task extends React.Component {

     state = {tasks: [] }

     constructor(props) {
          super(props);
          this.inputRef = React.createRef();
     }
     async componentDidMount() {

          try{

               const response = await axios.get('/todo', { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
               this.setState({tasks: response.data.data})
               
          }
          catch(err){}

          
     }
     handleToggle = async (e) => {

          let tasks = this.state.tasks
          tasks.forEach(task => {
  
            if (task._id === e.target.value){
                  task.completed =  e.target.checked
              }
          })
          this.setState({tasks: tasks})
          
          var endpoint = `/todo/update/${e.target.value}`;
  
          const body = {
              completed: e.target.checked ? true : false 
          }

          await axios.put(endpoint, body, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}} )
      
     }
     deleteTask = async (e, id) => {

          e.preventDefault();
          try{

               await axios.delete(`/todo/delete/${id}`, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
               
               const updatedTask = this.state.tasks.filter( task => task._id !== id)
               this.setState({tasks: updatedTask})
          }
          catch(err){
          }
     }
     renderTask = () => {

          return this.state.tasks.map( task => {

               return (

                    <div className="row card my-4" key={task._id}>
                         <div className="card-body">
                              description: {task.description}
                              <br />
                              <div className="form-check">
                                   <label className="form-check-label">
                                        
                                        <input 
                                             type="checkbox" 
                                             className="form-check-input mt-2" 
                                             value={task._id}
                                             checked={task.completed}
                                             onChange={this.handleToggle}
                                        
                                        />
                                        <span className="pt-2">Completed</span>
                                   </label>
                              </div>
                              <button onClick={(e) => this.deleteTask(e,task._id)} className="btn btn-sm btn-danger py-0 float-right">
                                   <i className="fas fa-trash" style={{width: '10px'}} />
                              </button>
                         </div>
                    </div>
               )
          })

     }
     filterBy = async (e) => {

          e.preventDefault();

          try{

               const response = await axios.get(`/todo?completed=${e.target.value}`, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
               this.setState({tasks: response.data.data})
               
          }
          catch(err){}

     }
     render() {

          if(!localStorage.getItem('token'))
               return <Redirect to="/" />
               

          return (

               <Layout>
                    <div className="container">
     
                         <div className="row">
                              <div className="form-group">
                                   <label htmlFor="filter">Filter by</label>
                                   <select 
                                        className="form-control" 
                                        id="filter"
                                        onChange={this.filterBy}
                                        value={this.state.completed}
                                   >
                                        <option value="true">Completed</option>
                                        <option value="false">Not Completed</option>
                                   </select>
                              </div>

                         </div>
                         <div className="row">
                              <div className="col-sm-8">
                                   {this.renderTask()}
                              </div>
                              <div className="col-sm-4">
                                   <Link className="btn btn-lg btn-primary float-right mt-5" to='/addtask'>
                                        <i className="fas fa-plus" />&nbsp;
                                        Add task
                                   </Link>

                              </div>
                         </div>
                    </div>
                    
               </Layout>
          )

     }
}

export default Task;