import { expect, test } from 'vitest'
import { flushSync } from 'react-dom'
import { createRoot } from 'react-dom/client'

// Toolchain smoke test: proves Vitest + browser DOM + React + the TSX transform
// all work end-to-end. Intentionally self-contained (no design-system imports) so
// it stays green as components come and go.
function Hello({ name }: { name: string }) {
  return <p>Hello, {name}!</p>
}

test('renders a React component into a real DOM', () => {
  const host = document.createElement('div')
  document.body.appendChild(host)
  flushSync(() => createRoot(host).render(<Hello name="design system" />))
  expect(host.textContent).toBe('Hello, design system!')
  host.remove()
})
