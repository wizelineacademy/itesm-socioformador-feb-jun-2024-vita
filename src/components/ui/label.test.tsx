import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Label } from './label'

describe('Label Component', () => {
  it('renders the label correctly', () => {
    render(<Label>Test Label</Label>)
    const labelElement = screen.getByText('Test Label')
    expect(labelElement).toBeInTheDocument()
  })
})
