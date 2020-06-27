import React from 'react'
import {Router, Route, Switch} from 'react-router-dom'
import Login from '../Routes/Login'
import Task from '../Routes/Task'
import AddTask from '../Routes/AddTask'

import Register from '../Routes/Register'
import Logout from '../Routes/Logout'
import history from '../history'

class App extends React.Component {


     render() {

          return (

               <Router history={history}>
                    <Switch>
                         <Route path='/'  exact component={Login}/>
                         <Route path='/register' component={Register}/>
                         <Route path='/tasks' component={Task} />
                         <Route path='/addtask' component={AddTask} />
                         <Route path='/logout' component={Logout} />
                         
                         
                    </Switch>
               </Router>

          )
     }
}
export default App;