import { Suspense } from 'react'
import { RouterProvider } from 'react-router'
import { router } from '@app/config/router'
import { ToastContainer } from 'react-toastify'
import { ThemeProvider } from './theme'

import './App.scss'
import 'react-toastify/dist/ReactToastify.css'
import './theme/styles/index.scss'

const App = () => {
  return (
    <ThemeProvider>
      <Suspense fallback="">
        <RouterProvider router={router} />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Suspense>
    </ThemeProvider>
  )
}

export default App
