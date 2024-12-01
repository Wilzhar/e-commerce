// src/components/Logo.test.js

import { render, screen } from '@testing-library/react'
import { Logo } from './Logo'

describe('Logo', () => {
  it('renders appropriately', () => {
    render(<Logo />)
    expect(screen.getByText(/chat/i)).toBeInTheDocument()
  })
})
