import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import { InventoryItem } from '../../types';
import { DataTable, Column } from '../../components/common/DataTable';
import { Package, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const InventoryPage: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);

  useEffect(() => {
    apiService.getInventory().then(setItems);
  }, []);

  const columns: Column<InventoryItem>[] = [
    {
      header: 'Item Description',
      cell: row => <span className="font-bold text-white">{row.itemName}</span>
    },
    {
      header: 'Category',
      cell: row => (
        <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
          {row.category}
        </span>
      )
    },
    { header: 'Quantity', accessorKey: 'quantity' },
    {
      header: 'Unit Price',
      cell: row => <span>${row.unitPrice}</span>
    },
    {
      header: 'Asset Value',
      cell: row => <span className="font-bold text-emerald-400">${row.totalValue.toLocaleString()}</span>
    },
    {
      header: 'Condition Status',
      cell: row => (
        <span
          className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
            row.condition === 'Good' || row.condition === 'New'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
          }`}
        >
          {row.condition}
        </span>
      )
    },
    { header: 'Location / Room', accessorKey: 'location' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-white">School Inventory & Asset Tracker</h1>
        <p className="text-xs text-slate-400 mt-1">Track classroom furniture, computer lab workstations, sports gear, and science equipment.</p>
      </div>

      <DataTable
        title="Asset Stock Register"
        description="Physical inventory units and asset valuation"
        columns={columns}
        data={items}
        exportFileName="school_inventory_2026"
      />
    </div>
  );
};
