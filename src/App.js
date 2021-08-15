import React, { useState } from 'react';
import axios from 'axios';

import './app.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { ImPencil, ImCross } from 'react-icons/im';
import { IconContext } from 'react-icons';

function App() {
	const [allUsers, setAllUsers] = useState();
	const [toggle, setToggle] = useState(false);
	const [edit, setEdit] = useState();

	const [user, setUser] = useState({
		firstname: '',
		lastname: '',
		email: '',
		password: '',
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		e.stopPropagation();
		// console.log('form event :', e);
		// console.log('post data', JSON.stringify(user));
		const postData = await axios.post(
			'https://js9290dnvf.execute-api.ap-southeast-1.amazonaws.com/prod/user',
			JSON.stringify(user)
		);
		setUser({ firstname: '', lastname: '', email: '', password: '' });
	};

	const handleUpdate = async (e) => {
		e.preventDefault();
		e.stopPropagation();
		const response = await axios.patch(
			'https://js9290dnvf.execute-api.ap-southeast-1.amazonaws.com/prod/user',
			JSON.stringify(user)
		);
		setToggle(false);
	};

	const handleUsers = async () => {
		const response = await axios.get(
			'https://js9290dnvf.execute-api.ap-southeast-1.amazonaws.com/prod/users'
		);
		console.log('response', response);
		setAllUsers(response.data.users);
		setToggle(true);
	};

	const handleEdit = (e, user) => {
		e.preventDefault();
		e.stopPropagation();
		setToggle(false);
		setEdit(true);
		console.log('user', user);
		setUser({
			firstname: user.firstname,
			lastname: user.lastname,
			email: user.email,
			password: user.password,
		});
	};

	const handleOnChange = (e) => {
		console.log(e);
		setUser((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};
	const handleDelete = async (e, user) => {
		e.stopPropagation();
		e.preventDefault();
		const response = await axios.delete(
			'https://js9290dnvf.execute-api.ap-southeast-1.amazonaws.com/prod/user',
			{
				userId: user.userId.toString(),
			}
		);
		console.log(response);
		// console.log('id', user.userId.toString());
		// console.log(typeof user.userId);

		const filteredUsers = allUsers.filter(
			(item) => item.userId !== user.userId
		);
		setAllUsers(filteredUsers);
	};
	const handleCreateUser = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setToggle(false);
		setEdit(false);

		setUser({ firstname: '', lastname: '', email: '', password: '' });
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
				<Button
					className='intro__button'
					variant='outline-info'
					onClick={handleCreateUser}>
					Create User
				</Button>
			</div>
			<div className='data__container'>
				{/* start 1st Part */}
				{toggle ? (
					<div>
						<Table striped bordered hover variant='dark'>
							<thead>
								<tr>
									<th>#</th>
									<th>First Name</th>
									<th>Last Name</th>
									<th>Email</th>
									<th>Password</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{allUsers &&
									allUsers.map((user) => {
										return (
											<tr key={user.id}>
												<td>{user.userId}</td>
												<td>{user.firstname}</td>
												<td>{user.lastname}</td>
												<td>{user.email}</td>
												<td>{user.password}</td>
												<td
													style={{
														display: 'flex',
														justifyContent:
															'space-around',
													}}>
													<IconContext.Provider
														value={{
															style: {
																cursor: 'pointer',
															},
														}}>
														<div
															onClick={(e) =>
																handleEdit(
																	e,
																	user
																)
															}>
															<ImPencil />
														</div>
														<div
															onClick={(e) => {
																handleDelete(
																	e,
																	user
																);
															}}>
															<ImCross />
														</div>
													</IconContext.Provider>
												</td>
											</tr>
										);
									})}
							</tbody>
						</Table>
					</div>
				) : (
					<div>
						<Form>
							<Row className='mb-3'>
								<Form.Group as={Col} controlId='firstname'>
									<Form.Label>First Name</Form.Label>
									<Form.Control
										as='input'
										value={user.firstname}
										name='firstname'
										onChange={(e) => {
											handleOnChange(e);
										}}
										placeholder='Enter First Name'
									/>
								</Form.Group>

								<Form.Group as={Col} controlId='lastname'>
									<Form.Label>Last Name</Form.Label>
									<Form.Control
										as='input'
										value={user.lastname}
										name='lastname'
										onChange={(e) => {
											handleOnChange(e);
										}}
										placeholder='Enter Last Name'
									/>
								</Form.Group>
							</Row>

							<Row className='mb-3'>
								<Form.Group as={Col} controlId='email'>
									<Form.Label>Email</Form.Label>
									<Form.Control
										value={user.email}
										name='email'
										onChange={(e) => {
											handleOnChange(e);
										}}
										type='email'
										placeholder='Enter email'
									/>
								</Form.Group>

								<Form.Group as={Col} controlId='password'>
									<Form.Label>Password</Form.Label>
									<Form.Control
										value={user.password}
										name='password'
										onChange={(e) => {
											handleOnChange(e);
										}}
										// type='password'
										placeholder='Password'
									/>
								</Form.Group>
							</Row>

							<Form.Group controlId='file' className='mb-3'>
								<Form.Label>Upload Profile Picture</Form.Label>
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
									onClick={edit ? handleUpdate : handleSubmit}
									className='intro__button'>
									{edit ? 'Update' : 'Submit'}
								</Button>
							</Row>
						</Form>
					</div>
				)}
				{/* end Second Part */}
			</div>
			{JSON.stringify(user)}
		</div>
	);
}

export default App;
