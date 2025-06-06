import AboutSection from '@/components/AboutSection'
// import ContactSection from '@/components/ContactSection'
import HomeSection from '@/components/HomeSection'
import ServiceSection from '@/components/ServiceSection'
import StudentSection from '@/components/StudentSection'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_unprotected/')({
  component: App,
})

function App() {
  return (
    <div>
      <HomeSection />
      <AboutSection />
      <StudentSection />
      <ServiceSection />
      {/* <ContactSection /> */}
    </div>
  )
}
