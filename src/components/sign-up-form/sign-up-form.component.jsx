import { useState } from "react";
import { toast } from "sonner";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import {
  createAuthUserWithEmailAndPassword,
} from "../../libs/firebase/firebase.utils.js";

import { SignUpContainer } from "./sign-up-form.styles.jsx";
import { createUserDocumentFromAuth } from "../../utils/firestoreInteractions.js";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });

      toast.success(`Compte créé avec succès ! Bienvenue chez STYLE — D, ${displayName || user.email}.`);
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Cette adresse email est déjà utilisée.");
      } else if (error.code === "auth/weak-password") {
        toast.error("Le mot de passe doit comporter au moins 6 caractères.");
      } else {
        console.error("user creation encountered an error", error);
        toast.error("Erreur lors de la création du compte.");
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignUpContainer>
      <h2>Vous N'avez Pas Encore De Compte?</h2>
      <span>Créez Un Compte Avec Votre Email Et Votre Mot De Passe</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Pseudo Affiché'
          type='text'
          required
          onChange={handleChange}
          name='displayName'
          value={displayName}
        />

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

        <FormInput
          label='Confirmer Votre Mot De Passe'
          type='password'
          required
          onChange={handleChange}
          name='confirmPassword'
          value={confirmPassword}
        />
        <Button type='submit'>S'inscrire</Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
