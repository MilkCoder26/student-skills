import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_unprotected/services/$serviceId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/services/$serviceId"!</div>
}
