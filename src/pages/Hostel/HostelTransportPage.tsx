import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import { HostelRoomItem, TransportRouteItem } from '../../types';
import { DataTable, Column } from '../../components/common/DataTable';
import { Building2, Bus, Phone, Users } from 'lucide-react';

export const HostelTransportPage: React.FC = () => {
  const [hostels, setHostels] = useState<HostelRoomItem[]>([]);
  const [routes, setRoutes] = useState<TransportRouteItem[]>([]);
  const [activeTab, setActiveTab] = useState<'hostel' | 'transport'>('hostel');

  useEffect(() => {
    apiService.getHostels().then(setHostels);
    apiService.getTransport().then(setRoutes);
  }, []);

  const hostelColumns: Column<HostelRoomItem>[] = [
    {
      header: 'Hostel Building',
      cell: row => <span className="font-bold text-white">{row.hostelName}</span>
    },
    { header: 'Room No', accessorKey: 'roomNo' },
    { header: 'Room Type', accessorKey: 'type' },
    {
      header: 'Occupancy',
      cell: row => (
        <span className="font-bold text-indigo-400">
          {row.occupied} / {row.capacity} Occupied
        </span>
      )
    },
    {
      header: 'Monthly Fee',
      cell: row => <span className="font-bold text-emerald-400">${row.monthlyFee} / month</span>
    }
  ];

  const routeColumns: Column<TransportRouteItem>[] = [
    {
      header: 'Route Name',
      cell: row => <span className="font-bold text-white">{row.routeName}</span>
    },
    { header: 'Vehicle Bus No', accessorKey: 'vehicleNo' },
    { header: 'Assigned Driver', accessorKey: 'driverName' },
    { header: 'Driver Contact', accessorKey: 'driverPhone' },
    {
      header: 'Stops & Capacity',
      cell: row => (
        <span className="text-xs text-slate-300">
          {row.stopsCount} Stops • {row.studentsCount} / {row.capacity} Students mapped
        </span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-white">Hostel & Transport Operations</h1>
          <p className="text-xs text-slate-400 mt-1">Manage student boarding rooms, mess fee schedules, bus routes, and driver contacts.</p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-2xl p-1.5">
          <button
            onClick={() => setActiveTab('hostel')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'hostel' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            Hostel Rooms ({hostels.length})
          </button>
          <button
            onClick={() => setActiveTab('transport')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'transport' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            Transport Routes ({routes.length})
          </button>
        </div>
      </div>

      {activeTab === 'hostel' ? (
        <DataTable
          title="Hostel Room Allocations"
          description="Campus residential buildings and room availability"
          columns={hostelColumns}
          data={hostels}
          exportFileName="hostel_allocations"
        />
      ) : (
        <DataTable
          title="Bus Routes & Vehicle Fleet"
          description="School transport vehicles, pickup stops, and student mapping"
          columns={routeColumns}
          data={routes}
          exportFileName="transport_routes"
        />
      )}
    </div>
  );
};
