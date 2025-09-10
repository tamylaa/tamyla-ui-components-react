import type { Preview } from '@storybook/react';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../src/store/store';
import { TamylaThemeProvider } from '../src/core/theme-provider-new';
import '../src/core/design-tokens.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <TamylaThemeProvider>
          <Story />
        </TamylaThemeProvider>
      </Provider>
    ),
  ],
};

export default preview;
