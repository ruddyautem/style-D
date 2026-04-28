import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import {

  signInWithGooglePopup
} from "../../libs/firebase/firebase.utils.js";

import { ButtonContainer, SignUpContainer } from "./sign-in-form.styles.jsx";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const navigate = useNavigate();


  const signInWithGoogle = async () => {
    try {
      await signInWithGooglePopup();
      navigate("/");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {

      navigate("/");
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Adresse email ou mot de passe incorrect");
          break;
        case "auth/user-not-found":
          alert("Aucun utilisateur associé à cet email");
          break;
        default:
          console.log(error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignUpContainer>
      <h2>Vous avez déjà un compte?</h2>
      <span>Connectez-Vous Avec Votre Email Et Votre Mot De Passe</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />

        <FormInput
          label='Mot de Passe'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />
        <ButtonContainer>
          <Button type='submit'>Se Connecter</Button>
          <Button
            type='button'
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
          >
            Connexion Google
          </Button>
        </ButtonContainer>
      </form>
    </SignUpContainer>
  );
};

export default SignInForm;
