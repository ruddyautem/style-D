import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useTranslation } from "../../stores/languageStore";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../libs/firebase/firebase.utils.js";

import { ButtonContainer, SignUpContainer } from "./sign-in-form.styles.jsx";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const { t } = useTranslation();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const navigate = useNavigate();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithGooglePopup();
      const displayName = result?.user?.displayName || "Bienvenue";
      toast.success(t("auth.googleSuccessToast", { name: displayName }));
      navigate("/");
    } catch (error) {
      if (error.code !== "auth/popup-closed-by-user") {
        console.error("Error signing in with Google:", error);
        toast.error(t("auth.googleErrorToast"));
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userCredential = await signInAuthUserWithEmailAndPassword(email, password);
      const name = userCredential?.user?.displayName || email.split("@")[0];
      toast.success(t("auth.signInSuccessToast", { name }));
      resetFormFields();
      navigate("/");
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
        case "auth/invalid-credential":
          alert(t("auth.wrongPasswordAlert"));
          break;
        case "auth/user-not-found":
          alert(t("auth.userNotFoundAlert"));
          break;
        case "auth/too-many-requests":
          alert(t("auth.tooManyRequestsAlert"));
          break;
        default:
          console.error("Erreur de connexion :", error);
          alert(t("auth.loginFailedAlert"));
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignUpContainer>
      <h2>{t("auth.signInTitle")}</h2>
      <span>{t("auth.signInSubtitle")}</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label={t("auth.emailLabel")}
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />

        <FormInput
          label={t("auth.passwordLabel")}
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />
        <ButtonContainer>
          <Button type='submit'>{t("auth.signInBtn")}</Button>
          <Button
            type='button'
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
          >
            {t("auth.signInWithGoogle")}
          </Button>
        </ButtonContainer>
      </form>
    </SignUpContainer>
  );
};

export default SignInForm;
