// src/components/buttons/SecondaryButton.test.tsx

import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Button } from './secondaryButton'
import { expect } from 'vitest'

describe('SecondaryButton Component', () => {
  it('renders the button with the correct label', () => {
    render(<Button variant='secondary'>Click Me</Button>)

    expect(screen.getByText('Click Me')).toBeInTheDocument()
  })
})
