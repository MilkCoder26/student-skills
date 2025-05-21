import AboutSection from '@/components/AboutSection'
import HomeSection from '@/components/HomeSection'
import StudentSection from '@/components/StudentSection'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div>
      <HomeSection />
      <AboutSection />
      <StudentSection />
    </div>
  )
}
