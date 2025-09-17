// Trading Portal Integration Example
// Copy this to your trading portal's main App.js or App.tsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import CSP-compatible providers from @tamyla/ui-components-react
import { 
  AutoCSPProvider,           // 🔒 Fixes CSP issues automatically
  TamylaThemeProvider,      // 🎨 Provides theming
  Button,                   // 📱 Components you want to use
  Card,
  DataTable 
} from '@tamyla/ui-components-react';

// Your existing trading portal components
import TradingDashboard from './pages/TradingDashboard';
import Portfolio from './pages/Portfolio';
import Analytics from './pages/Analytics';

function App() {
  return (
    // 🔒 CSP Provider MUST be the outermost wrapper
    <AutoCSPProvider>
      
      {/* 🎨 Theme provider for consistent styling */}
      <TamylaThemeProvider>
        
        {/* Your existing routing setup */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TradingDashboard />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </BrowserRouter>
        
      </TamylaThemeProvider>
    </AutoCSPProvider>
  );
}

// Example: Using components in your pages
function TradingDashboard() {
  return (
    <div>
      <h1>Trading Dashboard</h1>
      
      {/* ✅ These will now work with CSP policies */}
      <Card>
        <h2>Market Overview</h2>
        <Button variant="primary">Trade Now</Button>
      </Card>
      
      <DataTable 
        data={[/* your trading data */]}
        columns={[/* your columns */]}
      />
    </div>
  );
}

export default App;
