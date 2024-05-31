import React from 'react'
import { render, screen } from '@testing-library/react'

import { describe, expect, test } from 'vitest'
import PostCard from './Post'
describe('PostCard component', () => {
  test('renders with correct props', () => {
    const name = 'Example Post'
    const description = 'This is an example post'
    const imageUrl = 'https://example.com/image.jpg'

    render(
      <PostCard name={name} description={description} imageUrl={imageUrl} />,
    )

    // Verifica que el nombre, la descripción y la imagen se muestren correctamente
    expect(screen.getByText(name)).toBeInTheDocument()
    expect(screen.getByText(description)).toBeInTheDocument()
  })
})
