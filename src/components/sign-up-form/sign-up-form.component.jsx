import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { signUpStart } from '../../store/user/user.action';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './sign-up-form.styles.scss';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const dispatch = useDispatch();

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('passwords do not match');
      return;
    }
    dispatch(signUpStart(email, password, displayName));
    resetFormFields();
  };

  const InputChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className='sign-up-container'>
      <h2> Don't have an account? </h2>
      <span> Sign up with your email and password </span>

      <form onSubmit={handleSubmit}>
        <FormInput
          label='Display Name'
          type='text'
          required
          name='displayName'
          onChange={InputChangeHandler}
          value={displayName}
        />

        <FormInput
          label='Email'
          type='email'
          required
          name='email'
          onChange={InputChangeHandler}
          value={email}
        />

        <FormInput
          label='Password'
          type='password'
          autoComplete='on'
          minLength='6'
          required
          name='password'
          onChange={InputChangeHandler}
          value={password}
        />

        <FormInput
          label='Confirm Password'
          type='password'
          autoComplete='on'
          minLength='6'
          required
          name='confirmPassword'
          onChange={InputChangeHandler}
          value={confirmPassword}
        />

        <Button type='submit'>Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
