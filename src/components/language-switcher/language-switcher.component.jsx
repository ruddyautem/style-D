import React from "react";
import { useTranslation } from "../../stores/languageStore";
import {
  SwitcherContainer,
  LanguageButton,
  Separator,
} from "./language-switcher.styles";

const LanguageSwitcher = ({ variant = "nav", className = "" }) => {
  const { currentLanguage, setLanguage } = useTranslation();

  return (
    <SwitcherContainer $variant={variant} className={className} role="group" aria-label="Sélecteur de langue">
      <LanguageButton
        type="button"
        $isActive={currentLanguage === "fr"}
        $variant={variant}
        onClick={() => setLanguage("fr")}
        aria-pressed={currentLanguage === "fr"}
        title="Passer en Français"
      >
        FR
      </LanguageButton>
      <Separator $variant={variant}>|</Separator>
      <LanguageButton
        type="button"
        $isActive={currentLanguage === "en"}
        $variant={variant}
        onClick={() => setLanguage("en")}
        aria-pressed={currentLanguage === "en"}
        title="Switch to English"
      >
        EN
      </LanguageButton>
    </SwitcherContainer>
  );
};

export default LanguageSwitcher;
