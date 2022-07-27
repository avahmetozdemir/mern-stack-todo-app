import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Loginform({login,setUsername,setPassword}) {
  return (
    <Form onSubmit={login}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control onChange={(e)=>setUsername(e.target.value)} type="text" placeholder="Enter username" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
}

export default Loginform;