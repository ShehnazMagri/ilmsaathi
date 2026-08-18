import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Award,
  BookOpen,
  Users,
  Building2,
  Calendar,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 w-full bg-slate-900/80 border-b border-slate-800 backdrop-blur-xl px-4 lg:px-12 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-indigo-600/30">
            A
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-300 bg-clip-text text-transparent">
              Aura International School
            </span>
            <span className="block text-[10px] text-slate-400 font-semibold tracking-widest uppercase">Excellence in Education</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-300">
          <a href="#about" className="hover:text-indigo-400 transition-colors">About Us</a>
          <a href="#academics" className="hover:text-indigo-400 transition-colors">Academics</a>
          <a href="#facilities" className="hover:text-indigo-400 transition-colors">Facilities</a>
          <a href="#admissions" className="hover:text-indigo-400 transition-colors">Admissions</a>
          <a href="#events" className="hover:text-indigo-400 transition-colors">Events</a>
          <a href="#contact" className="hover:text-indigo-400 transition-colors">Contact</a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/25 transition-all hover:scale-105"
          >
            <span>Sign In / Login</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 lg:px-12 max-w-7xl mx-auto overflow-hidden">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl -z-10" />
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Admissions Open for Academic Session 2026-2027</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Nurturing Tomorrow's <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Global Leaders</span> Today
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Empowering students through holistic education, cutting-edge STEM laboratories, world-class sports arenas, and an AI-enabled smart learning management environment.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#admissions"
              className="px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-600/30 transition-all transform hover:-translate-y-0.5"
            >
              Apply for Admission
            </a>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-8 py-3.5 rounded-xl text-sm font-bold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-all"
            >
              Explore Live ERP Demo
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
            <h3 className="text-3xl font-black text-indigo-400">2,500+</h3>
            <p className="text-xs font-medium text-slate-400 mt-1">Enrolled Students</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
            <h3 className="text-3xl font-black text-purple-400">180+</h3>
            <p className="text-xs font-medium text-slate-400 mt-1">Expert Faculty</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
            <h3 className="text-3xl font-black text-emerald-400">100%</h3>
            <p className="text-xs font-medium text-slate-400 mt-1">Pass Ratio</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
            <h3 className="text-3xl font-black text-amber-400">45+</h3>
            <p className="text-xs font-medium text-slate-400 mt-1">National Awards</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 lg:px-12 max-w-7xl mx-auto border-t border-slate-900">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">About Aura International</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              A Legacy of Innovation, Ethics & Academic Greatness
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Founded in 2005, Aura International School provides an enriched environment that fosters curiosity, critical thinking, and character development. Our modern curriculum blends rigorous academic standards with creative arts and competitive athletics.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>State-of-the-art Science & AI Robotics Laboratories</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Smart Touchscreen Classrooms with Digital Curriculum</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Olympic-size Swimming Pool & Indoor Sports Complex</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-video rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 relative">
              <img
                src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&auto=format&fit=crop&q=80"
                alt="School Campus"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Showcase */}
      <section id="facilities" className="py-20 bg-slate-900/40 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 lg:px-12 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Campus Facilities</span>
            <h2 className="text-3xl font-bold text-white">World-Class Infrastructure</h2>
            <p className="text-sm text-slate-400">Designed to support every child's physical, intellectual, and social growth.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 hover:border-indigo-500/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Digital Library</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Over 25,000 physical volumes along with digital subscriptions to global journals and e-books.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 hover:border-purple-500/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">STEM & AI Labs</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Dedicated 3D printing, robotics, chemistry, and physics labs equipped with modern sensors and computers.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 hover:border-emerald-500/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Sports Complex</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Turf football stadium, basketball courts, badminton hall, and professional coaching staff.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Admissions Stepper */}
      <section id="admissions" className="py-20 px-4 lg:px-12 max-w-7xl mx-auto border-t border-slate-900">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Admission Process</span>
          <h2 className="text-3xl font-bold text-white">4 Simple Steps to Join Aura</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 relative">
            <span className="text-4xl font-black text-indigo-500/30 absolute top-4 right-4">01</span>
            <h4 className="text-base font-bold text-white">Online Application</h4>
            <p className="text-xs text-slate-400 mt-2">Fill out the student registration form on our ERP portal.</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 relative">
            <span className="text-4xl font-black text-indigo-500/30 absolute top-4 right-4">02</span>
            <h4 className="text-base font-bold text-white">Campus Interaction</h4>
            <p className="text-xs text-slate-400 mt-2">Meet our counselor and tour the academic facilities.</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 relative">
            <span className="text-4xl font-black text-indigo-500/30 absolute top-4 right-4">03</span>
            <h4 className="text-base font-bold text-white">Aptitude Assessment</h4>
            <p className="text-xs text-slate-400 mt-2">Short evaluation to determine proper grade placement.</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 relative">
            <span className="text-4xl font-black text-indigo-500/30 absolute top-4 right-4">04</span>
            <h4 className="text-base font-bold text-white">Final Enrollment</h4>
            <p className="text-xs text-slate-400 mt-2">Document verification, fee payment, and welcome orientation.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-slate-950 border-t border-slate-900 pt-16 pb-8 px-4 lg:px-12 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black">A</div>
              <span className="text-base font-bold text-white">Aura International School</span>
            </div>
            <p className="text-slate-400">Shaping minds, building leaders, inspiring futures.</p>
          </div>

          <div className="space-y-2">
            <h5 className="font-bold text-white uppercase tracking-wider text-[11px]">Quick Links</h5>
            <ul className="space-y-1.5">
              <li><a href="#about" className="hover:text-indigo-400">About Us</a></li>
              <li><a href="#admissions" className="hover:text-indigo-400">Admissions 2026</a></li>
              <li><a href="#facilities" className="hover:text-indigo-400">Campus Facilities</a></li>
              <li><Link to="/login" className="hover:text-indigo-400">Parent/Student Portal Login</Link></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h5 className="font-bold text-white uppercase tracking-wider text-[11px]">Contact Us</h5>
            <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-indigo-400" /> 100 University Parkway, Tech City</p>
            <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-indigo-400" /> +1 (800) 555-AURA</p>
            <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-indigo-400" /> admissions@aurasms.edu</p>
          </div>

          <div className="space-y-2">
            <h5 className="font-bold text-white uppercase tracking-wider text-[11px]">ERP Portal</h5>
            <p>Access attendance, fee receipts, examination report cards, and notices.</p>
            <button
              onClick={() => navigate('/login')}
              className="mt-2 w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all"
            >
              Sign In to ERP
            </button>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-6 text-center text-slate-500">
          © 2026 Aura International School ERP. Enterprise School Management System.
        </div>
      </footer>
    </div>
  );
};
