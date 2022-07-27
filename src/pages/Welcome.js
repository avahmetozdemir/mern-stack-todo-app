import React from 'react'
import {Link} from "react-router-dom"
import { useGlobalContext } from '../context'
import Todos from "../components/Todos"
import Button from 'react-bootstrap/Button';

function Welcome() {
    const {credentials,setCredentials} = useGlobalContext()
    const logout= ()=> {
      setCredentials(null)
    }
  return (
    <div className=''>
        {credentials && <Button variant="danger" onClick={logout}>Logout</Button>}
        <h1 className={{textAlign: 'center'}}>ToDo App</h1>
        <h1 className=''>Welcome {credentials && `"${credentials.username}"`}</h1>
        {!credentials && <Link to="/register"><Button className='mb-3 ' variant="secondary">Register</Button></Link>}
        <br/>
        {!credentials && <Link to="/login"><Button className='' variant="success">Login</Button></Link>}
        {credentials && <Todos/>}
    </div>
  )
}

export default Welcome