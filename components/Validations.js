// src/components/Validations.js
import React, { useState } from 'react';

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password validation regex (minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character)
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const useValidations = () => {
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    if (!emailRegex.test(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Invalid email format.',
      }));
    } else {
      setErrors((prevErrors) => {
        const { email, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  const validateUsername = (username) => {
    if (username.trim().length < 3) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: 'Username must be at least 3 characters long.',
      }));
    } else {
      setErrors((prevErrors) => {
        const { username, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  const validatePassword = (password) => {
    if (!passwordRegex.test(password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password:
          'Password must be at least 8 characters long, include uppercase, lowercase, number, and a special character.',
      }));
    } else {
      setErrors((prevErrors) => {
        const { password, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  return { errors, validateEmail, validateUsername, validatePassword };
};
