import React, { useState } from 'react'
import Button from './Button'
import { TiLocationArrow } from 'react-icons/ti'
import { FiEye, FiEyeOff, FiUser, FiMail, FiLock } from 'react-icons/fi'

const Account = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: ''
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log('Form submitted:', formData)
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="special-font font-zentry font-black text-4xl text-blue-50 mb-2">
            {isLogin ? 'WELCOME BACK' : 'JOIN US'}
          </h1>
          <p className="font-circular-web text-blue-50/70 text-sm">
            {isLogin ? 'Sign in to continue your journey' : 'Create your account to get started'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-blue-200/10 rounded-lg p-1 mb-8 border border-white/20">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3 px-4 rounded-md font-general text-sm uppercase transition-all duration-300 ${
              isLogin 
                ? 'bg-yellow-300 text-black shadow-lg' 
                : 'text-blue-50 hover:text-white'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 px-4 rounded-md font-general text-sm uppercase transition-all duration-300 ${
              !isLogin 
                ? 'bg-yellow-300 text-black shadow-lg' 
                : 'text-blue-50 hover:text-white'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-50/60">
                <FiUser size={20} />
              </div>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Username"
                className="w-full bg-blue-200/10 border border-white/20 rounded-lg py-4 pl-12 pr-4 text-blue-50 placeholder-blue-50/60 font-circular-web focus:outline-none focus:border-yellow-300/50 focus:bg-blue-200/20 transition-all duration-300"
                required={!isLogin}
              />
            </div>
          )}

          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-50/60">
              <FiMail size={20} />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email address"
              className="w-full bg-blue-200/10 border border-white/20 rounded-lg py-4 pl-12 pr-4 text-blue-50 placeholder-blue-50/60 font-circular-web focus:outline-none focus:border-yellow-300/50 focus:bg-blue-200/20 transition-all duration-300"
              required
            />
          </div>

          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-50/60">
              <FiLock size={20} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="w-full bg-blue-200/10 border border-white/20 rounded-lg py-4 pl-12 pr-12 text-blue-50 placeholder-blue-50/60 font-circular-web focus:outline-none focus:border-yellow-300/50 focus:bg-blue-200/20 transition-all duration-300"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-50/60 hover:text-blue-50 transition-colors duration-200"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          {!isLogin && (
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-50/60">
                <FiLock size={20} />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm password"
                className="w-full bg-blue-200/10 border border-white/20 rounded-lg py-4 pl-12 pr-12 text-blue-50 placeholder-blue-50/60 font-circular-web focus:outline-none focus:border-yellow-300/50 focus:bg-blue-200/20 transition-all duration-300"
                required={!isLogin}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-50/60 hover:text-blue-50 transition-colors duration-200"
              >
                {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          )}

          {isLogin && (
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-blue-50/70 font-circular-web">
                <input type="checkbox" className="mr-2 rounded border-white/20 bg-blue-200/10 text-yellow-300 focus:ring-yellow-300/50" />
                Remember me
              </label>
              <a href="#" className="text-yellow-300 hover:text-yellow-100 font-circular-web transition-colors duration-200">
                Forgot password?
              </a>
            </div>
          )}

          {/* Submit Button */}
          <Button
            tital={isLogin ? "Sign In" : "Create Account"}
            lefticon={<TiLocationArrow />}
            containerClass="w-full !bg-yellow-300 gap-2 flex-center justify-center py-4 text-base font-medium"
          />

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black text-blue-50/60 font-circular-web">Or continue with</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 px-4 bg-blue-200/10 border border-white/20 rounded-lg text-blue-50 font-circular-web hover:bg-blue-200/20 transition-all duration-300">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3 px-4 bg-blue-200/10 border border-white/20 rounded-lg text-blue-50 font-circular-web hover:bg-blue-200/20 transition-all duration-300">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
              Twitter
            </button>
          </div>

          {/* Footer Text */}
          <p className="text-center text-blue-50/60 font-circular-web text-sm">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-yellow-300 hover:text-yellow-100 transition-colors duration-200"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Account