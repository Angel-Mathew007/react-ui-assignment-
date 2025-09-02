import React from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

/*
  📱 React JS — Internship Qualifier Starter
  -------------------------------------------------
  - Pixel-perfect centered mobile frame (375x812)
  - Multi-page routing (Splash → Onboarding → Login → Home → Details → Profile)
  - Reusable UI primitives (Button, Input, Card, TopBar, BottomNav)
  - Framer Motion page transitions
  - Tailwind utility classes for styling (no setup needed in this canvas preview)

  How to use for your submission:
  1) Create a Vite app: npm create vite@latest react-ui-assignment -- --template react-ts
  2) npm i react-router-dom framer-motion
  3) Add Tailwind (optional but recommended for pixel tweaks)
  4) Replace src/App.tsx with this file's content (and ensure index.css resets are in place)
  5) Push to GitHub and deploy to Vercel/Netlify
*/

// ---------- Theme tokens (quick tweaks for matching the XD design) ----------
const tokens = {
  width: 375,
  height: 812,
  radius: 24,
  primary: "#3B82F6", // tweak to match XD brand color
  primaryDark: "#2563EB",
  text: "#0F172A",
  muted: "#64748B",
  bg: "#FFFFFF",
  surface: "#F8FAFC",
  border: "#E2E8F0",
};

// ---------- Layout: Centered phone frame ----------
function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-slate-100 flex items-center justify-center p-4">
      <div
        className="relative shadow-2xl overflow-hidden"
        style={{
          width: tokens.width,
          height: tokens.height,
          borderRadius: tokens.radius,
          background: tokens.bg,
        }}
      >
        {/* notch / status bar hint */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-center py-2">
          <div className="h-6 w-40 bg-slate-200 rounded-full" />
        </div>
        {children}
      </div>
    </div>
  );
}

// ---------- UI Primitives ----------
function TopBar({ title, backTo }: { title?: string; backTo?: string }) {
  const nav = useNavigate();
  return (
    <div className="h-14 px-4 flex items-center gap-3 border-b" style={{ borderColor: tokens.border }}>
      {backTo ? (
        <button
          onClick={() => (backTo ? nav(backTo) : nav(-1))}
          className="h-9 w-9 grid place-items-center rounded-full border active:scale-95"
          style={{ borderColor: tokens.border }}
          aria-label="Go back"
        >
          ←
        </button>
      ) : (
        <div className="h-9 w-9" />
      )}
      <div className="text-base font-semibold text-slate-900 truncate">{title}</div>
      <div className="ml-auto flex items-center gap-2">
        <div className="h-6 w-6 rounded-full bg-slate-200" />
      </div>
    </div>
  );
}

function PrimaryButton({ children, to, onClick, className = "" }: any) {
  const Cmp: any = to ? Link : "button";
  const props: any = to ? { to } : { onClick };
  return (
    <Cmp
      {...props}
      className={`w-full py-3 rounded-2xl text-white font-semibold active:scale-[0.99] ${className}`}
      style={{ background: tokens.primary }}
    >
      {children}
    </Cmp>
  );
}

function GhostButton({ children, to, onClick, className = "" }: any) {
  const Cmp: any = to ? Link : "button";
  const props: any = to ? { to } : { onClick };
  return (
    <Cmp
      {...props}
      className={`w-full py-3 rounded-2xl font-semibold border text-slate-700 active:scale-[0.99] ${className}`}
      style={{ borderColor: tokens.border }}
    >
      {children}
    </Cmp>
  );
}

function Input({ label, placeholder, type = "text" }: { label: string; placeholder?: string; type?: string }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm text-slate-600">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="h-12 px-4 rounded-xl border focus:outline-none focus:ring-2"
        style={{ borderColor: tokens.border }}
      />
    </label>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border p-4 bg-white ${className}`} style={{ borderColor: tokens.border }}>
      {children}
    </div>
  );
}

function BottomNav() {
  const items = [
    { to: "/home", label: "Home" },
    { to: "/search", label: "Search" },
    { to: "/profile", label: "Profile" },
  ];
  return (
    <nav className="absolute bottom-0 left-0 right-0 h-16 border-t bg-white grid grid-cols-3" style={{ borderColor: tokens.border }}>
      {items.map((it) => (
        <Link key={it.to} to={it.to} className="grid place-items-center text-sm font-medium text-slate-700">
          {it.label}
        </Link>
      ))}
    </nav>
  );
}

// ---------- Page transition wrapper ----------
const pageVariants = {
  initial: { opacity: 0, y: 8 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -8 },
};
const pageTransition = { type: "spring", stiffness: 260, damping: 24 };

function Screen({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      className="absolute inset-0 overflow-y-auto pb-20"
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      transition={pageTransition}
    >
      {children}
    </motion.main>
  );
}

// ---------- Screens (map these to the XD artboards) ----------
function Splash() {
  return (
    <Screen>
      <div className="h-full w-full grid place-items-center p-6">
        <div className="grid place-items-center gap-6">
          <div className="h-28 w-28 rounded-3xl" style={{ background: tokens.primary }} />
          <div className="text-2xl font-bold tracking-tight text-slate-900">Your App Name</div>
          <div className="text-center text-slate-600">Welcome! Loading your experience…</div>
          <PrimaryButton to="/onboarding" className="mt-2">Get Started</PrimaryButton>
        </div>
      </div>
    </Screen>
  );
}

function Onboarding() {
  return (
    <Screen>
      <TopBar title="Welcome" />
      <div className="p-5 grid gap-5">
        <Card className="grid gap-3">
          <div className="h-40 rounded-xl bg-slate-100" />
          <div className="text-lg font-semibold">Headline from XD</div>
          <div className="text-sm text-slate-600">Short supporting copy matching the design mock.</div>
        </Card>
        <PrimaryButton to="/login">Continue</PrimaryButton>
        <GhostButton to="/home">Skip for now</GhostButton>
      </div>
    </Screen>
  );
}

function Login() {
  return (
    <Screen>
      <TopBar title="Sign in" backTo="/onboarding" />
      <div className="p-5 grid gap-4">
        <Input label="Email" placeholder="you@example.com" type="email" />
        <Input label="Password" placeholder="••••••••" type="password" />
        <PrimaryButton to="/home">Sign in</PrimaryButton>
        <GhostButton to="/signup">Create an account</GhostButton>
      </div>
    </Screen>
  );
}

function SignUp() {
  return (
    <Screen>
      <TopBar title="Create account" backTo="/login" />
      <div className="p-5 grid gap-4">
        <Input label="Full Name" placeholder="Angel Mathew" />
        <Input label="Email" placeholder="angel@example.com" type="email" />
        <Input label="Password" placeholder="At least 8 characters" type="password" />
        <PrimaryButton to="/home">Create account</PrimaryButton>
      </div>
    </Screen>
  );
}

function Home() {
  return (
    <Screen>
      <TopBar title="Home" />
      <div className="p-5 grid gap-5">
        <div className="text-xl font-semibold">Good evening, Angel 👋</div>
        <div className="grid gap-3">
          <Card className="grid gap-2">
            <div className="text-sm text-slate-500">Overview</div>
            <div className="text-2xl font-bold">Main metric / balance</div>
            <div className="text-sm text-slate-600">Secondary KPI from the XD card</div>
            <Link to="/details" className="text-sm font-semibold" style={{ color: tokens.primary }}>View details →</Link>
          </Card>
          <div className="grid grid-cols-2 gap-3">
            <Card>
              <div className="text-sm text-slate-500">Stat A</div>
              <div className="text-lg font-semibold">1,234</div>
            </Card>
            <Card>
              <div className="text-sm text-slate-500">Stat B</div>
              <div className="text-lg font-semibold">567</div>
            </Card>
          </div>
        </div>
      </div>
      <BottomNav />
    </Screen>
  );
}

function Details() {
  return (
    <Screen>
      <TopBar title="Details" backTo="/home" />
      <div className="p-5 grid gap-4">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="flex items-center justify-between">
            <div className="grid">
              <div className="font-medium">List item {i + 1}</div>
              <div className="text-xs text-slate-500">Subtitle / metadata</div>
            </div>
            <div className="text-sm font-semibold" style={{ color: tokens.primary }}>View</div>
          </Card>
        ))}
      </div>
    </Screen>
  );
}

function Search() {
  return (
    <Screen>
      <TopBar title="Search" backTo="/home" />
      <div className="p-5 grid gap-4">
        <Input label="Search" placeholder="Type to search" />
        <Card>
          <div className="text-sm text-slate-600">Search results will appear here…</div>
        </Card>
      </div>
      <BottomNav />
    </Screen>
  );
}

function Profile() {
  return (
    <Screen>
      <TopBar title="Profile" backTo="/home" />
      <div className="p-5 grid gap-5">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-slate-200" />
          <div>
            <div className="font-semibold">Angel Mathew</div>
            <div className="text-sm text-slate-500">angel@example.com</div>
          </div>
        </div>
        <Card className="grid gap-3">
          <div className="font-medium">Settings</div>
          <div className="grid gap-2 text-sm text-slate-600">
            <div className="flex items-center justify-between">
              <span>Notifications</span>
              <span>On</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Dark mode</span>
              <span>Off</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Language</span>
              <span>English</span>
            </div>
          </div>
        </Card>
      </div>
      <BottomNav />
    </Screen>
  );
}

// ---------- Router with animated transitions ----------
function AnimatedRoutes() {
  return (
    <AnimatePresence mode="popLayout">
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/details" element={<Details />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </AnimatePresence>
  );
}

// ---------- App Root ----------
export default function App() {
  return (
    <BrowserRouter>
      <PhoneFrame>
        <AnimatedRoutes />
      </PhoneFrame>
    </BrowserRouter>
  );
}
