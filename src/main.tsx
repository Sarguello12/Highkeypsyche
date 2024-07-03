import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ErrorPage from './pages/ErrorPage.tsx'
import CalendarPage from './pages/CalendarPage.tsx'
import Header from './components/header/Header.tsx'
import ProfilePage from './pages/ProfilePage.tsx'
import AboutPage from './pages/AboutPage.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: "/calendar",
    element: <CalendarPage />,
    errorElement: <ErrorPage />
  },
  {
    path: "/about",
    element: <AboutPage />,
    errorElement: <ErrorPage />
  },
  {
    path: "/profile",
    element: <ProfilePage />,
    errorElement: <ErrorPage />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Header />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
