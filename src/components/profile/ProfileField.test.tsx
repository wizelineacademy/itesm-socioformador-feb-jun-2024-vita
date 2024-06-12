import React from 'react'
import { render, screen } from '@testing-library/react'
import ProfileField from './ProfileField'
import { expect } from 'vitest'

describe('ProfileField Component', () => {
  it('renders the label correctly', () => {
    render(
      <ProfileField
        label='Name'
        value='John Doe'
        editMode={false}
        name='name'
        onChange={() => {}}
      />,
    )
    const labelElement = screen.getByText('Name')
    expect(labelElement).toBeInTheDocument()
  })

  it('displays "Sin datos" when value is null', () => {
    render(
      <ProfileField
        label='Name'
        value={null}
        editMode={false}
        name='name'
        onChange={() => {}}
      />,
    )
    const noDataElement = screen.getByText('Sin datos')
    expect(noDataElement).toBeInTheDocument()
  })

  it('renders the input in edit mode', () => {
    render(
      <ProfileField
        label='Name'
        value='John Doe'
        editMode={true}
        name='name'
        onChange={() => {}}
      />,
    )
    const inputElement = screen.getByDisplayValue('John Doe')
    expect(inputElement).toBeInTheDocument()
  })
})
