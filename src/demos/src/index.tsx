import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store.ts';
import AppRedux from './AppRedux.tsx';
import AppNonRedux from './AppNonRedux.tsx';
import { TamylaThemeProvider } from '@tamyla/ui-components-react';

const useRedux = process.env.REACT_APP_USE_REDUX === 'true';

const App = useRedux ? AppRedux : AppNonRedux;
// Always provide Redux store since the UI components require it
const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>
    <TamylaThemeProvider>
      {children}
    </TamylaThemeProvider>
  </Provider>
);

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Wrapper>
      <App />
    </Wrapper>
  </React.StrictMode>
);
