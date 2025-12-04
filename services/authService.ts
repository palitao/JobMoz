import { User, UserRole } from '../types';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const validatePassword = (password: string): boolean => {
  // Min 8 chars, at least one letter and one number
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return re.test(password);
};

export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const authService = {
  login: async (email: string, password: string): Promise<User> => {
    await delay(1000);
    
    // Mock login logic
    if (!validateEmail(email)) {
      throw new Error("Formato de e-mail inválido.");
    }
    
    if (password.length < 6) {
      throw new Error("Senha incorreta.");
    }

    // Success response
    return {
      id: 'u-' + Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0], // Use part of email as name for demo
      email,
      role: 'candidate', // Default mock role
      avatar: 'https://ui-avatars.com/api/?name=' + email.split('@')[0] + '&background=0D9488&color=fff',
      verified: true
    };
  },

  register: async (data: { 
    name: string; 
    email: string; 
    phone: string; 
    password: string; 
    role: UserRole;
    termsAccepted: boolean 
  }): Promise<{ requiresVerification: boolean, email: string }> => {
    await delay(1000);

    if (!data.termsAccepted) {
      throw new Error("Deve aceitar os termos e política de privacidade.");
    }

    if (!validateEmail(data.email)) {
      throw new Error("E-mail inválido.");
    }

    if (!validatePassword(data.password)) {
      throw new Error("A senha deve ter no mínimo 8 caracteres, incluindo letras e números.");
    }

    // Determine if verification is needed (always true for this requirement)
    return { requiresVerification: true, email: data.email };
  },

  verifyAccount: async (code: string): Promise<boolean> => {
    await delay(1500);
    if (code.length !== 6) {
      throw new Error("Código inválido. Digite os 6 números.");
    }
    return true; // Success
  },

  resendCode: async (email: string): Promise<void> => {
    await delay(1000);
    console.log(`Code resent to ${email}`);
  },

  recoverPassword: async (email: string): Promise<void> => {
    await delay(1000);
    if (!validateEmail(email)) {
      throw new Error("E-mail inválido.");
    }
    console.log(`Password reset link sent to ${email}`);
  }
};