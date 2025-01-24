import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import {
  signInAuthUserWithEmailAndPassword,
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

  // const resetFormFields = () => {
  //   setFormFields(defaultFormFields);
  // };

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
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
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

  //   const addShopData = async () => {
  //     const categoriesCollectionRef = collection(db, "categories");

  //     SHOP_DATA.forEach(async (category) => {
  //       const categoryDocRef = doc(
  //         categoriesCollectionRef,
  //         category.title.toLowerCase()
  //       );
  //       await setDoc(categoryDocRef, { ...category });

  //       console.log(`Added ${category.title} category`);

  //       category.items.forEach(async (item) => {
  //         const itemDocRef = doc(
  //           collection(db, `${category.title.toLowerCase()}/items`)
  //         );
  //         await setDoc(itemDocRef, { ...item });

  //         console.log(`Added ${item.name} item`);
  //       });
  //     });

  //     console.log("All shop data added successfully");
  //   };

  //   const handlePopulateDb = async () => {
  //     try {
  //       await addShopData();
  //       alert("Database populated successfully!");
  //     } catch (error) {
  //       console.error("Error populating database:", error);
  //       alert(`Failed to populate database: ${error.message}`);
  //     }
  //   };

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
