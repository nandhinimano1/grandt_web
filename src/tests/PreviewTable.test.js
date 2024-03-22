import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PreviewTable from '../components/PreviewTable';

const sampleTableData = [
  { id: 1, name: 'Alice', age: 30 },
  { id: 2, name: 'Bob', age: 25 },
  { id: 3, name: 'Charlie', age: 35 },
];

describe('PreviewTable', () => {
  it('renders the table with data', () => {
    render(<PreviewTable tableData={sampleTableData} />);

    expect(screen.getByText('id')).toBeInTheDocument();
    expect(screen.getByText('name')).toBeInTheDocument();
    expect(screen.getByText('age')).toBeInTheDocument();

    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Charlie')).toBeInTheDocument();
  });

  it('renders the hash column when showhash is true', () => {
    render(<PreviewTable tableData={sampleTableData} showhash />);
    expect(screen.getByText('#')).toBeInTheDocument();
    expect(screen.getByTestId('hash-1')).toBeInTheDocument();
    expect(screen.getByTestId('hash-2')).toBeInTheDocument();
    expect(screen.getByTestId('hash-3')).toBeInTheDocument();
  });

  it('renders the row count when showrowscount is true', () => {
    render(<PreviewTable tableData={sampleTableData} showrowscount />);

    expect(screen.getByText('3 Rows (including header)')).toBeInTheDocument();
  });

  it('handles editable fields correctly', () => {
    render(
      <PreviewTable tableData={sampleTableData} editableFields={['name']} />
    );

    fireEvent.click(screen.getByText('Alice'));

    const input = screen.getByDisplayValue('Alice');
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'Alice Updated' } });
    fireEvent.blur(input);

    expect(screen.getByText('Alice Updated')).toBeInTheDocument();
  });
});
