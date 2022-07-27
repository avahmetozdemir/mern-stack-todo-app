import React,{useState} from 'react'
import {useNavigate} from "react-router-dom"
import Registerform from '../components/Register'
import { useGlobalContext } from '../context'


export const handleError  =async(response)=> {
if(!response.ok) {
    const {message}  =await response.json()
    throw Error(message)
}
return response.json()
}

function Register() {
    const {setCredentials}= useGlobalContext()
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState("")  
    const navigate= useNavigate()

    const register =(e)=> {
        e.preventDefault()
        fetch('http://localhost:3500/api/v1/auth/register',{
            method:'POST',
            headers: {
                'Content-Type' : "application/json"
            },
            body: JSON.stringify({
                username,
                password
            }),
        }).then(handleError).then(()=> {
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
    <Registerform register={register} setUsername={setUsername} setPassword={setPassword} />
  )
}

export default Register