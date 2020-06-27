import React from 'react'
import { Link } from 'react-router-dom'


const Layout = (props) => {

     return(

          <>
               <nav className="navbar navbar-expand-md bg-dark navbar-dark">
                    <div className="container">
                         <Link className="navbar-brand" to="/tasks">Todo</Link>

                         <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                              <span className="navbar-toggler-icon"></span>
                         </button>

                         <div className="collapse navbar-collapse" id="collapsibleNavbar">
                              <ul className="navbar-nav ml-auto">
                                   <li className="nav-item mx-4">
                                        <Link className="nav-link text-white" to="/" onClick={e => e.preventDefault()}>
                                             <i className="fa fa-user" />&nbsp;
                                             Hello! {JSON.parse(localStorage.getItem("user")).name}
                                        </Link>
                                   </li>
                                   <li className="nav-item mx-2">
                                        <Link className="nav-link btn btn-warning text-white" to="/logout" >logout</Link>
                                   </li>
                              </ul>
                         </div>

                    </div>
               </nav>
               <div className="container wrapper" style={{ height: "100%"}}>
                    {props.children}
                    <div className="push"></div>
               </div>
               
          </>
     )
}

export default Layout;