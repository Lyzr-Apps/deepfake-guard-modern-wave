import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AgentInterceptorProvider } from '@/components/AgentInterceptorProvider'
import ErrorBoundary, { GlobalErrorModal } from '@/components/ErrorBoundary'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import History from './pages/History'
import Compliance from './pages/Compliance'
import Settings from './pages/Settings'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <AgentInterceptorProvider>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/compliance" element={<Compliance />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AgentInterceptorProvider>
        <GlobalErrorModal />
      </ErrorBoundary>
    </BrowserRouter>
  )
}
