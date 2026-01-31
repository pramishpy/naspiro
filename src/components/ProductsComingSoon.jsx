import React from 'react';
import { Rocket, Sparkles, Bell, X } from 'lucide-react';

const ProductsComingSoon = ({ isOpen, user, onSignOut, onClose }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-6" onClick={onClose}>
      <div className="max-w-2xl w-full relative animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors z-10"
        >
          <X size={24} />
        </button>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center border border-gray-100">
          {/* Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center">
                <Rocket className="text-white w-12 h-12" />
              </div>
              <div className="absolute -top-2 -right-2">
                <Sparkles className="text-yellow-400 w-8 h-8 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Greeting */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Welcome, {user?.user_metadata?.name || user?.email?.split('@')[0] || 'Valued Customer'}!
          </h1>

          {/* Message */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 mb-4">
              Products Launching Soon
            </h2>
            <p className="text-lg text-gray-600 max-w-lg mx-auto">
              We're putting the finishing touches on Naspiro. Get ready to experience the future of respiratory protection.
            </p>
          </div>

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 border border-blue-200 rounded-full mb-8">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-blue-700 font-semibold">Development in Progress</span>
          </div>

          {/* Features Preview */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Pre-Order Access', icon: '🎯' },
              { label: 'Early Bird Pricing', icon: '💰' },
              { label: 'Exclusive Updates', icon: '📧' }
            ].map((item, i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="text-3xl mb-2">{item.icon}</div>
                <p className="text-sm font-semibold text-gray-700">{item.label}</p>
              </div>
            ))}
          </div>

          {/* Notify Me */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Bell className="text-white" size={24} />
              <h3 className="text-xl font-bold text-white">Get Notified</h3>
            </div>
            <p className="text-blue-100 mb-4">
              You're on the list! We'll email you at <strong className="text-white">{user?.email}</strong> when we launch.
            </p>
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur rounded-lg text-white text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                Notifications Enabled
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onClose}
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all"
            >
              Continue Browsing
            </button>
            <button
              onClick={onSignOut}
              className="text-gray-500 hover:text-gray-700 px-8 py-3 rounded-full font-semibold transition-colors border border-gray-200 hover:border-gray-300"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-white text-sm mt-6 drop-shadow-lg">
          Expected launch: Q2 2026 • Questions? Email us at shinnningsea@gmail.com
        </p>
      </div>
    </div>
  );
};

export default ProductsComingSoon;
