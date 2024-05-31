import React from 'react'
import { render, screen } from '@testing-library/react'

import { describe, expect, test } from 'vitest'
import SelectableCardWrapper from './SelectableCardWrapper'

describe('SelectableCardWrapper component', () => {
  test('renders children correctly', () => {
    render(
      <SelectableCardWrapper>
        <div data-testid='child-1'>Child 1</div>
        <div data-testid='child-2'>Child 2</div>
        <div data-testid='child-3'>Child 3</div>
      </SelectableCardWrapper>,
    )

    // Verifica que los niños estén presentes en el componente
    expect(screen.getByTestId('child-1')).toBeInTheDocument()
    expect(screen.getByTestId('child-2')).toBeInTheDocument()
    expect(screen.getByTestId('child-3')).toBeInTheDocument()
  })
})
