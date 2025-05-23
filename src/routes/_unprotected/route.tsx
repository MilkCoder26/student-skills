import { createFileRoute } from '@tanstack/react-router'
import { Outlet } from '@tanstack/react-router'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const Route = createFileRoute('/_unprotected')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}
