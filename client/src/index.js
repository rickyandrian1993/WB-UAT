import React from 'react'
import ReactDOM from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import App from './App'
import './assets/style/index.css'
import 'remixicon/fonts/remixicon.css'

ReactDOM.createRoot(document.getElementById('app')).render(
  <MantineProvider withGlobalStyles withNormalizeCSS>
    <NotificationsProvider position="top-right" zIndex={2077}>
      <App />
    </NotificationsProvider>
  </MantineProvider>
)
