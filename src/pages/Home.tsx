import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Example stat/social proof data
const stats = [
  { label: 'Active Users', value: '12,400+' },
  { label: 'Shipments Processed', value: '1.2M' },
  { label: 'Avg. Delivery Time', value: '1.8 days' },
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-linear-to-br from-slate-900 via-indigo-900 to-slate-900 overflow-x-hidden overflow-y-auto no-scrollbar">
      {/* Decorative blurred circles */}
      <div className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl z-0" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl z-0" />

      {/* Navbar */}
      <header
        className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${
          isScrolled
            ? 'bg-slate-900/95 backdrop-blur-lg border-b border-indigo-500/10 shadow-xl'
            : 'bg-transparent backdrop-blur-none border-b-0 shadow-none'
        }`}
        style={{
          willChange: 'background,backdrop-filter',
        }}
      >
        <div className="max-w-[90%] mx-auto flex items-center justify-between px-8 py-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-2xl shadow-indigo-500/30">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                viewBox="0 0 32 32"
                stroke="currentColor"
              >
                <circle cx="16" cy="16" r="14" strokeWidth="2" />
                <path
                  d="M10 16l4 4 8-8"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-white text-2xl font-extrabold tracking-tight">
              ShipFlow
            </span>
          </div>
          <nav className="flex items-center gap-6">
            {/* <Link
              to="/dashboard"
              className="text-gray-300 hover:text-white transition-all duration-300 text-base font-medium"
            >
              Dashboard
            </Link>
            <Link
              to="/settings"
              className="text-gray-300 hover:text-white transition-all duration-300 text-base font-medium"
            >
              Settings
            </Link> */}
            <Link to="/dashboard">
              <button className="ml-6 px-6 py-3 rounded-lg font-bold text-lg bg-linear-to-r from-indigo-500 to-purple-500 shadow-2xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 transition-all duration-300 text-white cursor-pointer">
                Get Started
              </button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      {/* Add padding-top to prevent content from jumping under the fixed header */}
      <section className="relative flex flex-col items-center justify-center min-h-[80vh] pt-44 pb-24 z-10 transition-all duration-500 ease-in-out">
        <h1 className="text-7xl font-extrabold text-center leading-tight mb-8 bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent drop-shadow-2xl">
          Ship Smarter.
          <br />
          <span className="bg-linear-to-r from-indigo-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Scale Faster.
          </span>
        </h1>
        <p className="text-gray-300 text-xl font-medium text-center max-w-2xl mb-12">
          The modern platform for effortless bulk shipping.
          <br />
          <span className="bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent font-semibold">
            Upload, validate, and ship in minutes.
          </span>
        </p>
        <div className="flex gap-6 mb-16">
          <Link to="/dashboard">
            <button className="px-8 py-4 rounded-xl text-xl font-bold bg-linear-to-r from-indigo-500 to-purple-500 shadow-2xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 transition-all duration-300 text-white cursor-pointer">
              Start Shipping
            </button>
          </Link>
          <Link
            to="https://github.com/Elvicharde/shipflow-web"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="px-8 py-4 rounded-xl text-xl font-bold bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:bg-white/20 text-white transition-all duration-300 cursor-pointer">
              View Docs
            </button>
          </Link>
        </div>
        {/* Social Proof Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-8 max-w-3xl w-full">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col items-center bg-slate-800/50 backdrop-blur-sm border border-indigo-500/20 rounded-2xl px-8 py-8 shadow-xl shadow-indigo-500/10 group relative transition-all duration-300 hover:border-indigo-400/40 hover:scale-105"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-linear-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl pointer-events-none" />
              <span className="text-4xl font-bold text-white drop-shadow-lg animate-pulse">
                {stat.value}
              </span>
              <span className="text-gray-400 text-base font-medium mt-2">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 max-w-7xl mx-auto py-32 px-4 grid md:grid-cols-3 gap-12">
        {/* Feature Card Example */}
        <div className="group relative bg-slate-900/50 backdrop-blur-lg border border-indigo-500/20 rounded-2xl p-10 shadow-2xl shadow-indigo-500/20 transition-all duration-300 hover:border-indigo-400/40 hover:scale-105">
          <div className="absolute inset-0 bg-linear-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl pointer-events-none" />
          <div className="w-14 h-14 bg-linear-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7" strokeWidth="2" />
              <path d="M16 3v4M8 3v4M4 11h16" strokeWidth="2" />
            </svg>
          </div>
          <h3 className="text-2xl font-extrabold text-white mb-3">
            <span className="bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Bulk CSV Upload
            </span>
          </h3>
          <p className="text-gray-400 font-medium leading-relaxed">
            Upload and process thousands of shipments at once with instant
            validation and feedback.
          </p>
        </div>
        <div className="group relative bg-slate-900/50 backdrop-blur-lg border border-indigo-500/20 rounded-2xl p-10 shadow-2xl shadow-indigo-500/20 transition-all duration-300 hover:border-indigo-400/40 hover:scale-105">
          <div className="absolute inset-0 bg-linear-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl pointer-events-none" />
          <div className="w-14 h-14 bg-linear-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <path d="M12 8v4m0 4h.01" strokeWidth="2" />
            </svg>
          </div>
          <h3 className="text-2xl font-extrabold text-white mb-3">
            <span className="bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Smart Validation
            </span>
          </h3>
          <p className="text-gray-400 font-medium leading-relaxed">
            Automatic address and data validation with real-time correction
            suggestions.
          </p>
        </div>
        <div className="group relative bg-slate-900/50 backdrop-blur-lg border border-indigo-500/20 rounded-2xl p-10 shadow-2xl shadow-indigo-500/20 transition-all duration-300 hover:border-indigo-400/40 hover:scale-105">
          <div className="absolute inset-0 bg-linear-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl pointer-events-none" />
          <div className="w-14 h-14 bg-linear-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="2" />
              <path d="M8 12h8" strokeWidth="2" />
            </svg>
          </div>
          <h3 className="text-2xl font-extrabold text-white mb-3">
            <span className="bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Instant Label Printing
            </span>
          </h3>
          <p className="text-gray-400 font-medium leading-relaxed">
            Generate and print shipping labels for all validated shipments
            instantly.
          </p>
        </div>
      </section>

      {/* Status Badges Example */}
      <section className="max-w-7xl mx-auto py-16 px-4 flex flex-wrap gap-8 items-center justify-center">
        <span className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/20 border border-indigo-400/30 rounded-full text-white animate-pulse text-lg font-semibold">
          <span className="w-2 h-2 rounded-full bg-linear-to-r from-indigo-400 to-purple-400 animate-pulse" />
          Live: 99.99% Uptime
        </span>
        <span className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/20 border border-indigo-400/30 rounded-full text-white">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          SOC2 Certified
        </span>
        <span className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/20 border border-indigo-400/30 rounded-full text-white">
          <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
          24/7 Support
        </span>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 mt-16 bg-transparent">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 gap-4">
          <span className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} ShipFlow. All rights reserved.
          </span>
          <div className="flex gap-6">
            <a
              href="https://twitter.com/"
              className="text-gray-400 hover:text-white transition-all duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
            <a
              href="https://github.com/"
              className="text-gray-400 hover:text-white transition-all duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="/privacy"
              className="text-gray-400 hover:text-white transition-all duration-300"
            >
              Privacy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
