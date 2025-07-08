import { UploadSection } from './components/UploadSection';
import { PreviewPanel } from './components/PreviewPanel';
import { AnalysisDashboard } from './components/AnalysisDashboard';
import { ColorRecommendations } from './components/ColorRecommendations';
import { ReportGenerator } from './components/ReportGenerator';
import { ScrollAnimation } from './components/ScrollAnimation';
import { ThemeProvider, useTheme } from './components/ThemeProvider';
import { MoonIcon, SunIcon, ShieldCheckIcon } from 'lucide-react';
function AppContent() {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 w-full transition-colors duration-300">
      <header className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 dark:from-purple-950 dark:via-purple-900 dark:to-purple-950 text-white py-6 px-4 animate-fade-in animate-gradient-shift">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold animate-slide-down">Visual Accessibility Analyzer</h1>
            <p className="text-purple-100 mt-2 animate-slide-up">
              AI-powered color vision deficiency analysis for marketing professionals
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-purple-800 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto p-4 space-y-8">
        <ScrollAnimation animation="fade-up" delay={100}>
          <UploadSection />
        </ScrollAnimation>
        <div className="grid lg:grid-cols-2 gap-8">
          <ScrollAnimation animation="fade-left" delay={200}>
            <PreviewPanel />
          </ScrollAnimation>
          <ScrollAnimation animation="fade-right" delay={300}>
            <AnalysisDashboard />
          </ScrollAnimation>
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          <ScrollAnimation animation="slide-up" delay={100}>
            <ColorRecommendations />
          </ScrollAnimation>
          <ScrollAnimation animation="zoom-in" delay={200}>
            <ReportGenerator />
          </ScrollAnimation>
        </div>
      </main>
      <ScrollAnimation animation="fade-up" delay={100}>
        <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16 py-8 px-4 transition-colors duration-300">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <ShieldCheckIcon className="h-5 w-5 text-purple-600" />
              <p className="text-gray-600 dark:text-gray-300 animate-floating">
                Ensuring digital accessibility for all users
              </p>
            </div>
            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              <p className="mb-2">
                <strong>Privacy Notice:</strong> Your uploaded files are
                processed locally and never stored on our servers.
              </p>
              <p>
                WCAG 2.1 AA Compliant • Color Vision Deficiency Friendly •
                Keyboard Accessible
              </p>
            </div>
          </div>
        </footer>
      </ScrollAnimation>
    </div>
  );
}
export function App() {
  return <ThemeProvider>
      <AppContent />
    </ThemeProvider>;
}