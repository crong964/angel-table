import { Table } from 'angel-table';

import './App.css';
export type Room = {
  id: number;
  name: string;
  code: string;

  // Room information
  floor: number;
  type: 'Standard' | 'Deluxe' | 'Suite' | 'Family';
  status: 'available' | 'occupied' | 'maintenance' | 'reserved';

  // Capacity
  capacity: number;
  beds: number;
  area: number;
  // Pricing
  price: number;
  discount: number;
  // Customer
  customerName: string | null;
  customerEmail: string | null;
  customerPhone: string | null;
  // Management
  manager: string;
  description: string;
  amenities: string[];
  // Status
  isActive: boolean;
  isFeatured: boolean;
  // Dates
  checkInDate: string | null;
  checkOutDate: string | null;
  createdAt: string;
  updatedAt: string;
  // Images
  thumbnail: string;
};
const statusMap: Record<Room['status'], { label: string; className: string }> =
  {
    available: {
      label: 'Available',
      className:
        'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    },
    occupied: {
      label: 'Occupied',
      className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    },
    maintenance: {
      label: 'Under Maintenance',
      className:
        'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    },
    reserved: {
      label: 'Reserved',
      className:
        'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    },
  };
function App() {
  return (
    <div style={{ padding: 2 }}>
      <Table
        className=''
        setup={{
          url: 'http://localhost:3000/api',
          mode: 'dark',
          viewDefault: 'card',
          showColumns: true,
          keyObject: 'id',
          heightTable: 600,
          typePagination: 'numbered',
        }}
        perPages={[10, 20, 50]}
        columns={[
          {
            title: 'ID',
            field: 'id',
            width: '70px',
          },
          {
            field: 'check_field',
            title: 'Select',
          },
          {
            title: 'Room Image',
            field: 'thumbnail',
            render(row: any) {
              return (
                <img
                  src={row.thumbnail}
                  alt={row.name}
                  style={{
                    height: '3rem',
                    width: '4rem',
                    borderRadius: '0.5rem',
                    objectFit: 'cover',
                  }}
                />
              );
            },
          },
          {
            title: 'Room Name',
            field: 'name',
            sort: true,
          },
          {
            title: 'Room Code',
            field: 'code',
            sort: true,
          },
          {
            title: 'Floor',
            field: 'floor',
            sort: true,
          },
          {
            title: 'Room Type',
            field: 'type',
          },
          {
            title: 'Status',
            field: 'status',
            sort: true,
            render(row) {
              const status = statusMap[row.status as Room['status']];
              return (
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${status.className}`}
                >
                  {status.label}
                </span>
              );
            },
          },
          {
            title: 'Capacity',
            field: 'capacity',
            sort: true,
            render(row) {
              return `${row.capacity} guests`;
            },
          },
          {
            title: 'Number of Beds',
            field: 'beds',
            sort: true,
          },
          {
            title: 'Area',
            field: 'area',
            sort: true,
            render(row) {
              return `${row.area} m²`;
            },
          },
          {
            title: 'Room Price',
            field: 'price',
            sort: true,
            render(row) {
              return (
                <span className='font-semibold text-blue-600 dark:text-blue-400'>
                  {row.price.toLocaleString('en-US')} VND
                </span>
              );
            },
          },
          {
            title: 'Discount',
            field: 'discount',
            render(row) {
              return (
                <span className={row.discount > 0 ? 'text-red-500' : ''}>
                  {row.discount}%
                </span>
              );
            },
            show: false,
          },
          {
            title: 'Customer',
            field: 'customerName',
            render(row) {
              return (
                row.customerName || (
                  <span className='text-gray-400'>No customer</span>
                )
              );
            },
            show: false,
          },
          {
            title: 'Customer Email',
            field: 'customerEmail',
            show: false,
          },
          {
            title: 'Phone Number',
            field: 'customerPhone',
            show: false,
          },
          {
            title: 'Manager',
            field: 'manager',
            show: false,
          },
          {
            title: 'Amenities',
            field: 'amenities',
            show: false,
            render(row) {
              return (
                <div className='flex max-w-64 flex-wrap gap-1'>
                  {row.amenities.map((item: any) => (
                    <span
                      key={item}
                      className='rounded bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300'
                    >
                      {item}
                    </span>
                  ))}
                </div>
              );
            },
          },
          {
            title: 'Description',
            field: 'description',
            render(row) {
              return (
                <span
                  className='block max-w-56 truncate'
                  title={row.description}
                >
                  {row.description}
                </span>
              );
            },
          },
          {
            title: 'Check-in Date',
            field: 'checkInDate',
            render(row) {
              return row.checkInDate
                ? new Date(row.checkInDate).toLocaleDateString('en-US')
                : '-';
            },
            show: false,
          },
          {
            title: 'Check-out Date',
            field: 'checkOutDate',
            render(row) {
              return row.checkOutDate
                ? new Date(row.checkOutDate).toLocaleDateString('en-US')
                : '-';
            },
            show: false,
          },
          {
            title: 'Featured',
            field: 'isFeatured',
            render(row) {
              return row.isFeatured ? (
                <span className='text-yellow-500'>★ Featured</span>
              ) : (
                <span className='text-gray-400'>No</span>
              );
            },
            show: false,
          },
          {
            title: 'Active',
            field: 'isActive',
            render(row) {
              return (
                <span
                  className={row.isActive ? 'text-green-600' : 'text-red-500'}
                >
                  {row.isActive ? 'Active' : 'Inactive'}
                </span>
              );
            },
            show: false,
          },
          {
            title: 'Created At',
            field: 'createdAt',
            render(row) {
              return new Date(row.createdAt).toLocaleString('en-US');
            },
            show: false,
          },
          {
            title: 'Updated At',
            field: 'updatedAt',
            render(row) {
              return new Date(row.updatedAt).toLocaleString('en-US');
            },
            show: false,
          },
          {
            title: 'Actions',
            field: 'action_field',
            className: 'text-center',
            render(row) {
              return (
                <div className='flex items-center justify-center gap-3'>
                  <button
                    type='button'
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Add:', row);
                    }}
                    className='text-green-600 hover:text-green-700'
                  >
                    Add
                  </button>

                  <button
                    type='button'
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Edit:', row);
                    }}
                    className='text-blue-600 hover:text-blue-700'
                  >
                    Edit
                  </button>

                  <button
                    type='button'
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Delete:', row);
                    }}
                    className='text-red-600 hover:text-red-700'
                  >
                    Delete
                  </button>
                </div>
              );
            },
            show: false,
          },
        ]}
        selector={[
          {
            field: 'type',
            title: 'Room Type',
            options: [
              { value: 'Standard', title: 'Standard' },
              { value: 'Deluxe', title: 'Deluxe' },
              { value: 'Suite', title: 'Suite' },
              { value: 'Family', title: 'Family' },
            ],
          },
          {
            field: 'status',
            title: 'Room Status',
            options: [
              { value: 'available', title: 'Available' },
              { value: 'occupied', title: 'Occupied' },
              { value: 'maintenance', title: 'Under Maintenance' },
              { value: 'reserved', title: 'Reserved' },
            ],
          },
          {
            field: 'floor',
            title: 'Floor',
            options: Array.from({ length: 15 }, (_, i) => ({
              value: String(i + 1),
              title: `Floor ${i + 1}`,
            })),
          },
          {
            field: 'capacity',
            title: 'Capacity',
            options: Array.from({ length: 6 }, (_, i) => ({
              value: String(i + 1),
              title: `${i + 1} Guests`,
            })),
          },
          {
            field: 'isActive',
            title: 'Activity Status',
            options: [
              { value: 'true', title: 'Active' },
              { value: 'false', title: 'Inactive' },
            ],
          },
        ]}
      />
    </div>
  );
}

export default App;
