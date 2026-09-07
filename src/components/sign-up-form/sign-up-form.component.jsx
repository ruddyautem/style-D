import { useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "../../stores/languageStore";

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
  const { t } = useTranslation();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error(t("auth.passwordMismatchToast"));
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });

      toast.success(t("auth.signUpSuccessToast", { name: displayName || user.email }));
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error(t("auth.emailInUseToast"));
      } else if (error.code === "auth/weak-password") {
        toast.error(t("auth.weakPasswordToast"));
      } else {
        console.error("user creation encountered an error", error);
        toast.error(t("auth.signUpErrorToast"));
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignUpContainer>
      <h2>{t("auth.signUpTitle")}</h2>
      <span>{t("auth.signUpSubtitle")}</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label={t("auth.displayNameLabel")}
          type='text'
          required
          onChange={handleChange}
          name='displayName'
          value={displayName}
        />

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

        <FormInput
          label={t("auth.confirmPasswordLabel")}
          type='password'
          required
          onChange={handleChange}
          name='confirmPassword'
          value={confirmPassword}
        />
        <Button type='submit'>{t("auth.signUpBtn")}</Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
