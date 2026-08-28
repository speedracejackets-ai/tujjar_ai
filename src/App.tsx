import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import WelcomePage from './pages/WelcomePage';
import AuthPage from './pages/AuthPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardLayout from './pages/dashboard/DashboardLayout';

type AppRoute = 'welcome' | 'auth' | 'builder' | 'onboarding' | 'dashboard';

function AppRouter() {
  const { user, store, loading } = useAuth();
  const [route, setRoute] = useState<AppRoute>('welcome');
  const [initialized, setInitialized] = useState(false);
  const [pendingPrompt, setPendingPrompt] = useState('');

  useEffect(() => {
    if (loading) return;
    if (!initialized) {
      setInitialized(true);
      if (user && store) {
        setRoute('dashboard');
      } else {
        setRoute('welcome');
      }
      return;
    }
    // After auth state changes (e.g. user just logged in)
    if (user && store) {
      setRoute('dashboard');
    } else if (user && !store && pendingPrompt) {
      // User logged in and had a pending prompt — go to builder
      setRoute('builder');
    } else if (user && !store) {
      setRoute('builder');
    }
  }, [user, store, loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <img src="/1777583164569.png" alt="Tujjar" className="w-16 h-16 animate-pulse" />
          <div className="flex gap-2">
            <span className="typing-dot" />
            <span className="typing-dot" />
            <span className="typing-dot" />
          </div>
        </div>
      </div>
    );
  }

  if (route === 'welcome') {
    return (
      <WelcomePage
        onGetStarted={() => setRoute('auth')}
        onGenerate={(prompt) => {
          setPendingPrompt(prompt);
          if (user) {
            setRoute('builder');
          } else {
            setRoute('auth');
          }
        }}
      />
    );
  }
  if (route === 'auth') return <AuthPage onBack={() => setRoute('welcome')} />;
  if (route === 'builder') {
    return (
      <OnboardingPage
        initialPrompt={pendingPrompt}
        onClose={() => setRoute('welcome')}
      />
    );
  }
  if (route === 'onboarding') return <OnboardingPage />;
  if (route === 'dashboard') return <DashboardLayout />;

  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}
