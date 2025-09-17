# CSP Integration Guide for Trading Portals

## 🚨 **Problem: Content Security Policy Blocking styled-components**

If you're seeing this error:
```
The Content Security Policy (CSP) prevents the evaluation of arbitrary strings as JavaScript
script-src directive blocked
```

This is because **styled-components** (used by @tamyla/ui-components-react) generates dynamic CSS that violates strict CSP policies.

## ✅ **Solution: Use CSP-Compatible Mode**

### **Option 1: Wrap Your App with CSP Provider** *(Recommended)*

```javascript
// App.js or main.js
import { AutoCSPProvider } from '@tamyla/ui-components-react';

function App() {
  return (
    <AutoCSPProvider>
      {/* Your trading portal components */}
      <TradingDashboard />
    </AutoCSPProvider>
  );
}
```

This automatically:
- ✅ Detects CSP nonce from your environment
- ✅ Configures styled-components safely
- ✅ Prevents CSP violations

### **Option 2: Manual CSP Configuration**

If your portal provides a specific nonce:

```javascript
import { CSPProvider, getCSPNonce } from '@tamyla/ui-components-react';

function App() {
  const nonce = getCSPNonce() || window.__CSP_NONCE__ || 'your-nonce-here';
  
  return (
    <CSPProvider nonce={nonce}>
      <TradingDashboard />
    </CSPProvider>
  );
}
```

### **Option 3: Update Your CSP Headers**

Add these directives to your Content Security Policy:

```http
Content-Security-Policy: 
  script-src 'self' 'nonce-YOUR_NONCE_HERE';
  style-src 'self' 'unsafe-inline' 'nonce-YOUR_NONCE_HERE';
```

**OR** if you control the CSP policy, add:

```http
Content-Security-Policy: 
  script-src 'self' 'unsafe-eval';
  style-src 'self' 'unsafe-inline';
```

⚠️ **Note**: `unsafe-eval` and `unsafe-inline` reduce security. Use nonce-based approach when possible.

## 🔧 **Trading Portal Implementation Examples**

### **React Router Setup**
```javascript
// App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AutoCSPProvider, TamylaThemeProvider } from '@tamyla/ui-components-react';

function App() {
  return (
    <AutoCSPProvider>
      <TamylaThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/dashboard" element={<TradingDashboard />} />
            <Route path="/portfolio" element={<Portfolio />} />
          </Routes>
        </BrowserRouter>
      </TamylaThemeProvider>
    </AutoCSPProvider>
  );
}
```

### **Redux/State Management Setup**
```javascript
// main.js
import { Provider } from 'react-redux';
import { AutoCSPProvider } from '@tamyla/ui-components-react';
import { store } from './store';

ReactDOM.render(
  <Provider store={store}>
    <AutoCSPProvider>
      <App />
    </AutoCSPProvider>
  </Provider>,
  document.getElementById('root')
);
```

### **Next.js Setup**
```javascript
// pages/_app.js
import { AutoCSPProvider } from '@tamyla/ui-components-react';

function MyApp({ Component, pageProps }) {
  return (
    <AutoCSPProvider>
      <Component {...pageProps} />
    </AutoCSPProvider>
  );
}

export default MyApp;
```

## 🔍 **Debugging CSP Issues**

### **Check if CSP is Active**
```javascript
import { useCSPConfig } from '@tamyla/ui-components-react';

function DebugCSP() {
  const { nonce, hasCSP, isCompatible } = useCSPConfig();
  
  console.log('CSP Status:', {
    nonce,           // Current nonce detected
    hasCSP,          // CSP policy detected
    isCompatible     // Safe to use styled-components
  });
  
  return isCompatible ? 
    <div>✅ CSP Compatible</div> : 
    <div>❌ CSP Issue - Wrap with CSPProvider</div>;
}
```

### **Manual Nonce Detection**
```javascript
import { getCSPNonce } from '@tamyla/ui-components-react';

// Check what nonce is detected
console.log('Detected nonce:', getCSPNonce());

// Check various nonce sources
console.log('Meta nonce:', document.querySelector('meta[name="csp-nonce"]')?.content);
console.log('Script nonce:', document.querySelector('script[nonce]')?.nonce);
console.log('Window nonce:', window.__CSP_NONCE__);
```

## 🎯 **Common Trading Portal Setups**

### **Webpack Configuration**
If you control webpack, add to `webpack.config.js`:
```javascript
module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      '__CSP_NONCE__': JSON.stringify(process.env.CSP_NONCE)
    })
  ]
};
```

### **Vite Configuration**
For Vite-based portals:
```javascript
// vite.config.js
export default {
  define: {
    '__CSP_NONCE__': JSON.stringify(process.env.CSP_NONCE)
  }
};
```

## 📋 **Integration Checklist**

- [ ] Wrapped app with `<AutoCSPProvider>`
- [ ] Verified nonce detection works
- [ ] Tested in production environment  
- [ ] No CSP console errors
- [ ] styled-components rendering correctly
- [ ] Trading portal components display properly

## 🆘 **Still Having Issues?**

1. **Check browser console** for specific CSP violations
2. **Verify nonce** is properly detected: `getCSPNonce()`
3. **Test without CSP** temporarily to confirm it's the issue
4. **Contact your DevOps team** about CSP nonce configuration

This should resolve all CSP-related integration issues with @tamyla/ui-components-react in trading portals! 🚀
