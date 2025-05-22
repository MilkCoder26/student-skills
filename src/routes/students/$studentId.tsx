import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/students/$studentId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "students/$studentId"!</div>
}
