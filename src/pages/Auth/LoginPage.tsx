import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { apiService } from '../../services/api';
import { UserRole } from '../../types';
import { Mail, Lock, User, ArrowRight, AlertCircle } from 'lucide-react';

interface AuthFormData {
  name?: string;
  email: string;
  password: string;
  selectedRole: UserRole;
  rememberMe?: boolean;
}

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<AuthFormData>({
    defaultValues: {
      email: '',
      password: '',
      selectedRole: 'student',
      rememberMe: false
    }
  });

  const onSubmit = async (data: AuthFormData) => {
    setIsLoading(true);

    if (isRegister) {
      // REGISTER FLOW: Validates and saves new user strictly in MongoDB database
      const res = await apiService.registerApi(data.name || data.email.split('@')[0], data.email, data.password, data.selectedRole);
      setIsLoading(false);

      if (res.success) {
        toast.success(res.message || 'Account registered successfully');
        setIsRegister(false);
        reset({ email: data.email, password: '', selectedRole: 'student' });
      } else {
        toast.error(res.message || 'Registration failed');
      }
    } else {
      // SIGN IN FLOW: Validates credentials strictly against MongoDB database
      const res = await apiService.loginApi(data.email, data.password);
      setIsLoading(false);

      if (res.success && res.token && res.user) {
        login(data.email, res.user.role, res.user, res.token);
        toast.success(res.message || 'Logged in successfully');
        navigate('/dashboard');
      } else {
        toast.error(res.message || 'Incorrect email or password');
      }
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast.error(`SSO login via ${provider} requires enterprise OAuth setup.`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md space-y-6 z-10">
        {/* Top Header Logo & Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 shadow-lg shadow-indigo-500/10">
            <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
              <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19.5c.2.2.51.2.71 0l1.77-1.77C8.26 18.49 10.06 18.9 12 18.9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 14c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
            </svg>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {isRegister ? 'Create your account' : 'Sign in to your account'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            {isRegister ? 'Register your account in Enterprise School ERP' : 'Enter your registered email & password below'}
          </p>
        </div>

        {/* Centered Auth Card */}
        <div className="bg-slate-900/90 border border-slate-800/90 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-5">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    placeholder="e.g. Alex Morgan"
                    {...register('name', {
                      required: isRegister ? 'Full name is required' : false
                    })}
                    className={`w-full bg-slate-950/80 border text-slate-100 text-xs rounded-xl pl-10 pr-4 py-3 focus:outline-none transition-all ${errors.name
                        ? 'border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                        : 'border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                      }`}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-400 text-[11px] font-medium mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 text-red-400 flex-shrink-0" />
                    <span>{errors.name.message}</span>
                  </p>
                )}
              </div>
            )}

            {isRegister && (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Select Account Type</label>
                <select
                  {...register('selectedRole')}
                  className="w-full bg-slate-950/80 border border-slate-800 text-slate-100 text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 font-medium"
                >
                  <option value="student">Student Account</option>
                  <option value="employee">Employee / Staff Account</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Email address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  placeholder="name@school.edu"
                  {...register('email', {
                    required: 'Email address is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Please enter a valid email address'
                    }
                  })}
                  className={`w-full bg-slate-950/80 border text-slate-100 text-xs rounded-xl pl-10 pr-4 py-3 focus:outline-none transition-all ${errors.email
                      ? 'border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                      : 'border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                    }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-[11px] font-medium mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 text-red-400 flex-shrink-0" />
                  <span>{errors.email.message}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 digits long'
                    }
                  })}
                  className={`w-full bg-slate-950/80 border text-slate-100 text-xs rounded-xl pl-10 pr-4 py-3 focus:outline-none transition-all ${errors.password
                      ? 'border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                      : 'border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                    }`}
                />
              </div>
              {errors.password && (
                <p className="text-red-400 text-[11px] font-medium mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 text-red-400 flex-shrink-0" />
                  <span>{errors.password.message}</span>
                </p>
              )}
            </div>

            {!isRegister && (
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-slate-300">
                  <input
                    type="checkbox"
                    {...register('rememberMe')}
                    className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
                  Forgot password?
                </Link>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span>{isLoading ? 'Authenticating...' : isRegister ? 'Create Account' : 'Sign in'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Social SSO Divider & Buttons */}
          <div className="space-y-4 pt-2">
            <div className="relative flex items-center justify-center">
              <div className="w-full border-t border-slate-800"></div>
              <span className="bg-slate-900 px-3 text-[11px] text-slate-500 uppercase tracking-wider font-semibold absolute">
                Or continue with
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                type="button"
                onClick={() => handleSocialLogin('Google')}
                className="py-2.5 px-4 bg-slate-950/80 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-semibold text-slate-300 transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.2 9 5 12 5z" />
                  <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
                  <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12s.7 2.3 1.9 4.7l3.7-1.9z" />
                  <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.2-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z" />
                </svg>
                <span>Google</span>
              </button>

              <button
                type="button"
                onClick={() => handleSocialLogin('GitHub')}
                className="py-2.5 px-4 bg-slate-950/80 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-semibold text-slate-300 transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>GitHub</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Link */}
        <div className="text-center text-xs text-slate-400">
          {isRegister ? (
            <span>
              Already a member?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsRegister(false);
                  reset();
                }}
                className="text-indigo-400 hover:text-indigo-300 font-bold hover:underline transition-colors"
              >
                Sign in to your account
              </button>
            </span>
          ) : (
            <span>
              Not a member?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsRegister(true);
                  reset();
                }}
                className="text-indigo-400 hover:text-indigo-300 font-bold hover:underline transition-colors"
              >
                Create an account
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
