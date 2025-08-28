import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initializeSampleData } from './utils/sampleData'

// Initialize sample data on app start
initializeSampleData();

createRoot(document.getElementById("root")!).render(<App />);
