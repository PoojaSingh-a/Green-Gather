import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import Select from 'react-select';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterForm = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({ label: '', score: 0, colorClass: 'text-gray-500' });
  const [selectedState, setSelectedState] = useState(null);
  const [error, setError] = useState('');

  const indianStates = [
    { value: 'Andhra Pradesh', label: 'Andhra Pradesh' },
    { value: 'Arunachal Pradesh', label: 'Arunachal Pradesh' },
    { value: 'Assam', label: 'Assam' },
    { value: 'Bihar', label: 'Bihar' },
    { value: 'Chhattisgarh', label: 'Chhattisgarh' },
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Goa', label: 'Goa' },
    { value: 'Gujarat', label: 'Gujarat' },
    { value: 'Haryana', label: 'Haryana' },
    { value: 'Himachal Pradesh', label: 'Himachal Pradesh' },
    { value: 'Jharkhand', label: 'Jharkhand' },
    { value: 'Karnataka', label: 'Karnataka' },
    { value: 'Kerala', label: 'Kerala' },
    { value: 'Madhya Pradesh', label: 'Madhya Pradesh' },
    { value: 'Maharashtra', label: 'Maharashtra' },
    { value: 'Manipur', label: 'Manipur' },
    { value: 'Meghalaya', label: 'Meghalaya' },
    { value: 'Mizoram', label: 'Mizoram' },
    { value: 'Nagaland', label: 'Nagaland' },
    { value: 'Odisha', label: 'Odisha' },
    { value: 'Punjab', label: 'Punjab' },
    { value: 'Rajasthan', label: 'Rajasthan' },
    { value: 'Sikkim', label: 'Sikkim' },
    { value: 'Tamil Nadu', label: 'Tamil Nadu' },
    { value: 'Telangana', label: 'Telangana' },
    { value: 'Tripura', label: 'Tripura' },
    { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
    { value: 'Uttarakhand', label: 'Uttarakhand' },
    { value: 'West Bengal', label: 'West Bengal' },
  ];

  // --- password strength evaluator ---
  const evaluatePassword = (pw) => {
    if (!pw) return { label: 'Very weak', score: 0, colorClass: 'text-red-600', suggestions: ['Use 12+ characters'] };

    const hasLower = /[a-z]/.test(pw);
    const hasUpper = /[A-Z]/.test(pw);
    const hasNumber = /\d/.test(pw);
    const hasSymbol = /[@$!%*?&^#()_\-+={}[\]|:;'",.<>/~`]/.test(pw);
    const commonPattern = /(.)\1{2,}|1234|qwerty|password|letmein|iloveyou/i.test(pw);

    let score = 0;
    if (pw.length >= 12) score += 1;
    else if (pw.length >= 8) score += 0.5;
    if (hasLower && hasUpper) score += 1;
    if (hasNumber) score += 1;
    if (hasSymbol) score += 1;
    if (pw.length >= 16) score += 0.5;
    if (commonPattern) score = Math.max(0, score - 1);

    let label = 'Very weak';
    let colorClass = 'text-red-600';
    if (score >= 4) { label = 'Very strong'; colorClass = 'text-emerald-600'; }
    else if (score >= 3) { label = 'Strong'; colorClass = 'text-green-600'; }
    else if (score >= 2) { label = 'Fair'; colorClass = 'text-yellow-600'; }
    else if (score >= 1) { label = 'Weak'; colorClass = 'text-orange-600'; }

    const suggestions = [];
    if (pw.length < 12) suggestions.push('use 12+ chars');
    if (!hasUpper) suggestions.push('add uppercase');
    if (!hasLower) suggestions.push('add lowercase');
    if (!hasNumber) suggestions.push('add a number');
    if (!hasSymbol) suggestions.push('add a symbol');
    if (commonPattern) suggestions.push('avoid common patterns');

    return { label, score: Math.min(4, score), colorClass, suggestions };
  };

  const onPasswordChange = (val) => {
    setPassword(val);
    setPasswordStrength(evaluatePassword(val));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      const msg = 'Passwords do not match.';
      setError(msg);
      toast.error(msg, { position: 'top-right', autoClose: 3000, theme: 'colored' });
      return;
    }

    if (passwordStrength.score < 3) {
      const msg = 'Please choose a stronger password (at least "Strong").';
      setError(msg);
      toast.error(msg, { position: 'top-right', autoClose: 3000, theme: 'colored' });
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          name,
          email,
          password,
          state: selectedState?.value,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || 'Registration failed');

      toast.success(
        <div>
          <strong>Registration Successful!</strong>
          <div>You may login now.</div>
        </div>,
        { position: 'top-right', autoClose: 3000, pauseOnHover: true, draggable: true, theme: 'colored' }
      );

      setTimeout(() => { onClose(); }, 1500);
    } catch (err) {
      setError(err.message);
      toast.error(`${err.message}`, { position: 'top-right', autoClose: 3000, pauseOnHover: true, draggable: true, theme: 'colored' });
    }
  };

  const passwordsMatch = confirmPassword.length > 0 && confirmPassword === password;
  const passwordsMismatch = confirmPassword.length > 0 && confirmPassword !== password;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 px-2">
      <h2 className="text-2xl font-bold text-start text-green-800 mb-2">Create Your Account</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
        <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm">
          <FaUser className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="John Doe"
            className="w-full outline-none bg-transparent"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm">
          <FaEnvelope className="text-gray-400 mr-2" />
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full outline-none bg-transparent"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm">
          <FaLock className="text-gray-400 mr-2" />
          <input
            type="password"
            placeholder="••••••••"
            className="w-full outline-none bg-transparent"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            required
            aria-describedby="password-strength"
          />
        </div>
        <p id="password-strength" className={`text-sm mt-2 ${passwordStrength.colorClass}`} aria-live="polite">
          <span className="font-medium">Strength:</span> {passwordStrength.label || '—'}
          {password && passwordStrength.suggestions?.length > 0 && (
            <span className="text-gray-600"> • Try {passwordStrength.suggestions.slice(0, 2).join(', ')}</span>
          )}
        </p>
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
        <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm">
          <FaLock className="text-gray-400 mr-2" />
          <input
            type="password"
            placeholder="Repeat your password"
            className="w-full outline-none bg-transparent"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            aria-describedby="password-match"
          />
        </div>
        {passwordsMatch && (
          <p id="password-match" className="text-sm mt-2 text-green-600" aria-live="polite">Passwords match ✓</p>
        )}
        {passwordsMismatch && (
          <p id="password-match" className="text-sm mt-2 text-red-600" aria-live="polite">Passwords do not match</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
        <Select
          options={indianStates}
          value={selectedState}
          onChange={setSelectedState}
          placeholder="Select your state"
          isSearchable
        />
      </div>

      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-green-700 to-lime-600 hover:from-lime-600 hover:to-green-700 text-white font-semibold py-2 rounded-lg transition-all duration-300 shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
        disabled={!name || !email || !selectedState || !password || !confirmPassword}
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
