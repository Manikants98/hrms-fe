import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { FaGoogle, FaMicrosoft, FaShieldAlt } from 'react-icons/fa';
import {
  RxCheckCircled,
  RxEnvelopeClosed,
  RxExclamationTriangle,
  RxEyeClosed,
  RxEyeOpen,
  RxLockClosed,
  RxPerson,
  RxReload,
} from 'react-icons/rx';
import * as Yup from 'yup';

interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'email' | 'sso'>('email');

  const validationSchema = Yup.object({
    email: Yup.string().email('Please enter a valid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const handleLogin = async (values: LoginFormValues, { setSubmitting, setFieldError }: any) => {
    try {
      console.log('Login attempt:', values);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Handle successful login
      console.log('Login successful');
    } catch (error) {
      setFieldError('password', 'Invalid email or password');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSSOLogin = (provider: 'google' | 'microsoft') => {
    console.log(`SSO login with ${provider}`);
    // Handle SSO login logic
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <div className="w-full flex min-h-screen border-gray-200 bg-white overflow-hidden">
        {/* Left Side - Brand & Illustration */}
        <div className="hidden lg:flex lg:w-1/2 bg-primary p-12 flex-col justify-between relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
            <div className="absolute bottom-20 right-10 w-24 h-24 bg-white rounded-full"></div>
            <div className="absolute top-1/2 right-20 w-16 h-16 bg-white rounded-full"></div>
          </div>

          {/* Logo & Brand */}
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center">
                <RxPerson className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">TechVision HRMS</h1>
                <p className="text-blue-100 text-sm">Human Resource Management System</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-white mb-6">Welcome Back to Your Workspace</h2>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Streamline your HR operations with our comprehensive management system. Access employee data, manage
              payroll, track performance, and more.
            </p>

            {/* Features List */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <RxCheckCircled className="w-5 h-5 text-green-300" />
                <span className="text-blue-100">Complete Employee Management</span>
              </div>
              <div className="flex items-center space-x-3">
                <RxCheckCircled className="w-5 h-5 text-green-300" />
                <span className="text-blue-100">Advanced Payroll Processing</span>
              </div>
              <div className="flex items-center space-x-3">
                <RxCheckCircled className="w-5 h-5 text-green-300" />
                <span className="text-blue-100">Real-time Analytics & Reports</span>
              </div>
              <div className="flex items-center space-x-3">
                <RxCheckCircled className="w-5 h-5 text-green-300" />
                <span className="text-blue-100">Secure Data Management</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="relative z-10">
            <div className="flex items-center space-x-2 text-blue-100">
              <FaShieldAlt className="w-4 h-4" />
              <span className="text-sm">Enterprise-grade security & compliance</span>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg shadow-sm flex items-center justify-center">
                <RxPerson className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">TechVision HRMS</h1>
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
            <p className="text-gray-600">Access your HRMS dashboard and manage your organization efficiently</p>
          </div>

          {/* Login Method Toggle */}
          <div className="mb-6">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                type="button"
                onClick={() => setLoginMethod('email')}
                className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-colors ${
                  loginMethod === 'email' ? 'bg-white text-primary shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Email Login
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod('sso')}
                className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-colors ${
                  loginMethod === 'sso' ? 'bg-white text-primary shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Single Sign-On
              </button>
            </div>
          </div>

          {/* Email Login Form */}
          {loginMethod === 'email' && (
            <Formik
              initialValues={{
                email: '',
                password: '',
                rememberMe: false,
              }}
              validationSchema={validationSchema}
              onSubmit={handleLogin}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form className="space-y-6">
                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <RxEnvelopeClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Field
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email address"
                        className={`w-full pl-10 outline-none pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                          errors.email && touched.email
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-300 hover:border-gray-400 focus:border-primary-500'
                        }`}
                      />
                    </div>
                    <ErrorMessage name="email">
                      {(errorMessage) => (
                        <div className="mt-1 text-sm text-red-600 flex items-center">
                          <RxExclamationTriangle className="w-4 h-4 mr-1" />
                          <span>{errorMessage}</span>
                        </div>
                      )}
                    </ErrorMessage>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <RxLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Field
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        className={`w-full pl-10 outline-none pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                          errors.password && touched.password
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-300 hover:border-gray-400 focus:border-primary-500'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <RxEyeClosed className="w-5 h-5" /> : <RxEyeOpen className="w-5 h-5" />}
                      </button>
                    </div>
                    <ErrorMessage name="password">
                      {(errorMessage) => (
                        <div className="mt-1 text-sm text-red-600 flex items-center">
                          <RxExclamationTriangle className="w-4 h-4 mr-1" />
                          <span>{errorMessage}</span>
                        </div>
                      )}
                    </ErrorMessage>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <Field
                        type="checkbox"
                        name="rememberMe"
                        className="h-4 w-4 text-primary focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Remember me</span>
                    </label>
                    <button type="button" className="text-sm text-primary hover:text-primary-700 font-medium">
                      Forgot password?
                    </button>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <RxReload className="w-5 h-5 mr-2 animate-spin" />
                        Signing In...
                      </div>
                    ) : (
                      'Sign In'
                    )}
                  </button>
                </Form>
              )}
            </Formik>
          )}

          {/* SSO Login Options */}
          {loginMethod === 'sso' && (
            <div className="space-y-4">
              <button
                onClick={() => handleSSOLogin('google')}
                className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
              >
                <FaGoogle className="w-5 h-5 text-red-500" />
                <span className="font-medium text-gray-700">Continue with Google</span>
              </button>

              <button
                onClick={() => handleSSOLogin('microsoft')}
                className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
              >
                <FaMicrosoft className="w-5 h-5 text-blue-500" />
                <span className="font-medium text-gray-700">Continue with Microsoft</span>
              </button>

              <div className="text-center text-sm text-gray-600 mt-6">
                <p>Contact your system administrator for SSO setup assistance</p>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="pt-6">
            <div className="text-center text-xs text-gray-500">
              <p>© 2025 TechVision Solutions. All rights reserved.</p>
              <div className="mt-2 space-x-4">
                <button className="hover:text-gray-700">Privacy Policy</button>
                <button className="hover:text-gray-700">Terms of Service</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
