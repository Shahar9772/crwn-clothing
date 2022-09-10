import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { signInUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';

import './sign-in-form.styles.scss';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  console.log(formFields);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInUserWithEmailAndPassword(email, password);

      console.log(user);
      console.log(user.email);

      resetFormFields();
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        alert('Cannot sign-in user, wrong-password');
      } else if (error.code === 'auth/user-not-found') {
        alert('Cannot sign-in user, user-not-found');
      } else {
        console.log('user sign-in encountered an error', error);
      }
    }
  };

  const InputChangeHandler = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className='sign-in-container'>
      <h2> I already have an account </h2>
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

        <Button type='submit'>SIGN IN</Button>
      </form>
    </div>
  );
};

export default SignInForm;
