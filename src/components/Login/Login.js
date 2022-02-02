import React, { useEffect, useState, useReducer } from 'react'

import Card from '../UI/Card/Card'
import classes from './Login.module.css'
import Button from '../UI/Button/Button'

const emailReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return {
			value: action.val,
			isValid: action.val.includes('@'),
		}
	}
	if (action.type === 'INPUT_BLUR') {
		return {
			value: state.value,
			isValid: state.value.includes('@'),
		}
	}

	return {
		value: '',
		isValid: false,
	}
}

const passwordReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return {
			value: action.val,
			isValid: action.val.trim().length > 6,
		}
	}
	if (action.type === 'INPUT_BLUR') {
		return {
			value: state.value,
			isValid: state.value.trim().length > 6,
		}
	}

	return {
		value: '',
		isValid: false,
	}
}

const Login = (props) => {
	const [emailState, dispatchEmail] = useReducer(emailReducer, {
		value: '',
		isValid: false,
	})
	const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
		value: '',
		isValid: false,
	})
	// const [enteredEmail, setEnteredEmail] = useState('');
	// const [emailIsValid, setEmailIsValid] = useState(false);
	// const [enteredPassword, setEnteredPassword] = useState('');
	// const [passwordIsValid, setPasswordIsValid] = useState(false);
	const [formIsValid, setFormIsValid] = useState(false) //также true и здесь сохранится

	const { isValid: emailIsValid } = emailState
	const { isValid: passwordIsValid } = passwordState

	useEffect(() => {
		//debouncing
		const identifier = setTimeout(() => {
			// буну биз переменныйга салгыча жана return го чейин. enteredEmailге бир нерсе жазсак, useEffect бир жолу иштейт, бирок таймери отсчет кылды. Таймер буткондо кайра иштеп кетти. Бирок биз коп жолу клавиатураны басып салсак, ага озунчо таймер ачылып калды.
			console.log('valid') //1раз он сработает всегда
			setFormIsValid(emailIsValid && passwordIsValid)
		}, 1000)

		// clean up function with debouncing
		return () => {
			//это функция очистки. Теперь функция очистки каждый раз очищает логику useEffect. Каждый раз когда таймер вызывается, столько раз он очищается, до того момента когда последний таймер сработает!
			console.log('clean up')
			clearTimeout(identifier) // бул таймерди тазалап турат
		}
	}, [emailIsValid, passwordIsValid]) // Здесь useEffect сработает только когда enteredEmail и enteredPassword изменится.
	//Также проверяя содержит ли он имейл "@" и пароль больше 6. И он возвратит true

	const emailChangeHandler = (event) => {
		// setEnteredEmail(event.target.value);
		dispatchEmail({ type: 'USER_INPUT', val: event.target.value })
		// setFormIsValid(event.target.value.includes('@') && passwordState.value.trim().length > 6)
	}

	const passwordChangeHandler = (event) => {
		// setEnteredPassword(event.target.value);
		// setFormIsValid(emailState.isValid && event.target.value.trim().length > 6)
		dispatchPassword({ type: 'USER_INPUT', val: event.target.value })
	}

	const validateEmailHandler = () => {
		dispatchEmail({ type: 'INPUT_BLUR' })
		// setEmailIsValid(enteredEmail.includes('@'));
	}

	const validatePasswordHandler = () => {
		dispatchPassword({ type: 'INPUT_BLUR' })
		// setPasswordIsValid(enteredPassword.trim().length > 6);
	}

	const submitHandler = (event) => {
		event.preventDefault()
		props.onLogin(emailState.value, passwordState.value)
	}

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<div
					className={`${classes.control} ${
						passwordState.isValid === false ? classes.invalid : ''
					}`}
				>
					<label htmlFor='email'>E-Mail</label>
					<input
						type='email'
						id='email'
						value={emailState.value}
						onChange={emailChangeHandler}
						onBlur={validateEmailHandler}
					/>
				</div>
				<div
					className={`${classes.control} ${
						passwordIsValid === false ? classes.invalid : ''
					}`}
				>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						id='password'
						value={passwordState.value}
						onChange={passwordChangeHandler}
						onBlur={validatePasswordHandler}
					/>
				</div>
				<div className={classes.actions}>
					<Button
						type='submit'
						className={classes.btn}
						disabled={!formIsValid}
					>
						Login
					</Button>
				</div>
			</form>
		</Card>
	)
}

export default Login
