
import React, { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';

// Error Boundary Component to catch crashes and show a fallback UI
interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: any;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  // FIX: Explicitly declare the state property to satisfy TypeScript's strict property initialization rules.
  // This resolves errors indicating that 'state' and subsequently 'props' do not exist on the component instance.
  state: ErrorBoundaryState;
  
  // FIX: Explicitly declare `props` to resolve "Property 'props' does not exist on type 'ErrorBoundary'".
  // While inherited, some strict TypeScript configurations require this. The `declare` keyword
  // tells TypeScript that this property will be initialized by the runtime (React).
  declare props: ErrorBoundaryProps;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: any): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
          height: '100vh', backgroundColor: '#020617', color: '#ef4444', fontFamily: 'sans-serif', textAlign: 'center', padding: '20px'
        }}>
          <h1 style={{fontSize: '2rem', marginBottom: '1rem'}}>حدث خطأ غير متوقع</h1>
          <p style={{color: '#94a3b8', marginBottom: '2rem'}}>نعتذر عن هذا الخلل. يرجى إعادة تشغيل التطبيق.</p>
          <button 
            onClick={() => window.location.reload()} 
            style={{
              padding: '12px 24px', backgroundColor: '#22d3ee', color: 'black', border: 'none', 
              borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem',
              boxShadow: '0 0 15px rgba(34, 211, 238, 0.4)'
            }}
          >
            إعادة التشغيل
          </button>
          <pre style={{marginTop: '30px', fontSize: '0.8rem', opacity: 0.5, maxWidth: '100%', overflow: 'auto', color: '#475569'}}>
            {this.state.error?.toString()}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}

const container = document.getElementById('root');

if (!container) {
  throw new Error("Could not find root element to mount to");
}

// Ensure container is clean before creating root (helps with HMR and double-load prevention)
container.innerHTML = '';

// Clean mounting for React 18
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
