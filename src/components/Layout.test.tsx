import React from 'react';
import { render, screen } from '@testing-library/react';
import Layout from './Layout';

describe('Layout Component', () => {
  test('renders children correctly', () => {
    render(
      <Layout>
        <div data-testid="test-child">Test Child</div>
      </Layout>
    );
    
    const childElement = screen.getByTestId('test-child');
    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent('Test Child');
  });

  test('renders footer with copyright text', () => {
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    );
    
    const footerElement = screen.getByText(/Pathfinder. All rights reserved./i);
    expect(footerElement).toBeInTheDocument();
  });
});