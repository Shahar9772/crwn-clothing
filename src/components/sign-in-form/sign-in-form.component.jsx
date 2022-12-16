import { useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  emailSignInStart,
  googleSignInStart,
} from '../../store/user/user.action';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import './sign-in-form.styles.scss';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const dispatch = useDispatch();

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const SignInWithGoogle = () => {
    dispatch(googleSignInStart());
    resetFormFields();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(emailSignInStart(email, password));
    resetFormFields();
  };

  const InputChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className='sign-in-container'>
      <h2> Already have an account? </h2>
      <span> Sign in with your email and password </span>

      <form onSubmit={handleSubmit}>
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

        <div className='buttons-container'>
          <Button type='submit'>Sign In</Button>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.google}
            type='button'
            onClick={SignInWithGoogle}
          >
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
