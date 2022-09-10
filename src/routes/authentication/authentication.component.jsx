import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

import Button from '../../components/button/button.component';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';

const Authentication = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign In Page</h1>

      <SignInForm />

      <Button buttonType='google' onClick={logGoogleUser}>
        Sign in with Google Popup
      </Button>

      <SignUpForm />
    </div>
  );
};

export default Authentication;
