import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import { LibraryBookItem } from '../../types';
import { DataTable, Column } from '../../components/common/DataTable';
import { Library, BookOpen, Plus, Search } from 'lucide-react';

export const LibraryPage: React.FC = () => {
  const [books, setBooks] = useState<LibraryBookItem[]>([]);

  useEffect(() => {
    apiService.getBooks().then(setBooks);
  }, []);

  const columns: Column<LibraryBookItem>[] = [
    { header: 'ISBN Number', accessorKey: 'isbn' },
    {
      header: 'Book Title',
      cell: row => <span className="font-bold text-white">{row.title}</span>
    },
    { header: 'Author', accessorKey: 'author' },
    {
      header: 'Category',
      cell: row => (
        <span className="px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-300 text-xs font-semibold">
          {row.category}
        </span>
      )
    },
    {
      header: 'Copies Available',
      cell: row => (
        <span className="font-bold text-emerald-400">
          {row.availableCopies} / {row.copies} Available
        </span>
      )
    },
    { header: 'Rack Shelf', accessorKey: 'rackLocation' },
    {
      header: 'Issue Book',
      cell: row => (
        <button
          disabled={row.availableCopies === 0}
          onClick={() => {
            setBooks(prev =>
              prev.map(b => (b.id === row.id ? { ...b, availableCopies: b.availableCopies - 1 } : b))
            );
          }}
          className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold text-xs rounded-lg transition-all"
        >
          Issue Book
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-white">Library Management Portal</h1>
        <p className="text-xs text-slate-400 mt-1">Manage physical book catalog, borrowing issue transactions, late fines and rack inventory.</p>
      </div>

      <DataTable
        title="Library Books Catalog"
        description="Comprehensive list of active titles and available physical copies"
        columns={columns}
        data={books}
        exportFileName="library_books_catalog"
      />
    </div>
  );
};
