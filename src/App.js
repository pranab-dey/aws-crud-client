import React from 'react';
import axios from 'axios';

import './app.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
	const handleSubmit = (e) => {
		e.preventDefault();
	};
	const handleUsers = async () => {
		const response = await axios.get(
			'https://js9290dnvf.execute-api.ap-southeast-1.amazonaws.com/prod/users'
		);
		console.log('response', response);
	};
	return (
		<div className='intro__container'>
			<div className='intro__menu'>
				<Button
					className='intro__button'
					variant='outline-info'
					onClick={handleUsers}>
					Users
				</Button>
				<Button className='intro__button' variant='outline-info'>
					Create User
				</Button>
			</div>
			<div className='data__container'>
				{/* start 1st Part */}
				<div>
					<Table striped bordered hover variant='dark'>
						<thead>
							<tr>
								<th>#</th>
								<th>First Name</th>
								<th>Last Name</th>
								<th>Username</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>1</td>
								<td>Mark</td>
								<td>Otto</td>
								<td>@mdo</td>
							</tr>
						</tbody>
					</Table>
				</div>
				{/* Ends 1st Part  */}
				{/* start Second Part */}
				{/* <div>
					<Form>
						<Row className='mb-3'>
							<Form.Group as={Col} controlId='formGridEmail'>
								<Form.Label>First Name</Form.Label>
								<Form.Control
									type='text'
									placeholder='Enter First Name'
								/>
							</Form.Group>

							<Form.Group as={Col} controlId='formGridPassword'>
								<Form.Label>Last Name</Form.Label>
								<Form.Control
									type='text'
									placeholder='Enter Last Name'
								/>
							</Form.Group>
						</Row>

						<Row className='mb-3'>
							<Form.Group as={Col} controlId='formGridEmail'>
								<Form.Label>Email</Form.Label>
								<Form.Control
									type='email'
									placeholder='Enter email'
								/>
							</Form.Group>

							<Form.Group as={Col} controlId='formGridPassword'>
								<Form.Label>Password</Form.Label>
								<Form.Control
									type='password'
									placeholder='Password'
								/>
							</Form.Group>
						</Row>

						<Form.Group controlId='formFile' className='mb-3'>
							<Form.Label>Default file input example</Form.Label>
							<Form.Control type='file' />
						</Form.Group>
						<Row
							md={4}
							style={{
								margin: '0 auto',
								display: 'flex',
								justifyContent: 'center',
							}}>
							<Button
								variant='outline-info'
								type='submit'
								onClick={handleSubmit}
								className='intro__button'>
								Submit
							</Button>
						</Row>
					</Form>
				</div> */}
				{/* end Second Part */}
			</div>
		</div>
	);
}

export default App;
