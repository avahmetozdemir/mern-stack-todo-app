import React,{useState} from 'react'
import {useNavigate} from "react-router-dom"
import { useGlobalContext } from '../context'
import Loginform from '../components/Login'



function Login() {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState("")    
    const navigate= useNavigate()
    const {setCredentials,setActiveId}= useGlobalContext()
    const login =(e)=> {
        e.preventDefault()
        fetch('http://localhost:3500/api/v1/auth/login',{
            method:'POST',
            headers: {
                'Content-Type' : "application/json"
            },
            body: JSON.stringify({
                username,
                password
            }),
        }).then((response)=>{return response.json()}).then(data=>setActiveId(data.id)).then(()=> {
            setCredentials({
                username,
                password
            })
            navigate("/")
        }).catch((error)=> {
            console.log(error);
            setError(error.message)
        })
    }

  return (
            <Loginform login={login} setUsername={setUsername} setPassword={setPassword} />
         )
}

export default Login