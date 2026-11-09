import { Table } from 'angel-table';

import './App.css';

function App() {
  return (
    <Table
      className='e'
      setup={{
        viewDefault: 'card',
        keyObject: '_id',
        showColumns: true,
        mode: 'dark',
        url: 'https://fakestoreapi.noksha.dev/api/products',
      }}
      columns={[
        {
          title: 'No.',
          field: 'index_field',
          width: '70px',
        },
        {
          title: 'Image',
          field: 'image',
          width: '100px',
          render: (row) => (
            <img
              src={''}
              loading='lazy'
              alt={row.title}
              style={{
                width: '50px',
                height: '50px',
                objectFit: 'cover',
                borderRadius: '6px',
              }}
            />
          ),
        },
        {
          title: 'Product',
          field: 'title',
          width: '200px',
          sort: true,
        },
        {
          title: 'Category',
          field: 'category',
          sort: true,
        },
        {
          title: 'Type',
          field: 'type',
          sort: true,
        },
        {
          title: 'Brand',
          field: 'brand',
          sort: true,
        },
        {
          title: 'Old Price',
          field: 'oldPrice',
          sort: true,
          render: (row) => `$${row.oldPrice}`,
        },
        {
          title: 'Price',
          field: 'price',
          sort: true,
          render: (row) => `$${row.price}`,
        },
        {
          title: 'Discounted Price',
          field: 'discountedPrice',
          sort: true,
          render: (row) => `$${row.discountedPrice}`,
        },
        {
          title: 'Stock',
          field: 'stock',
          sort: true,
        },
        {
          title: 'Size',
          field: 'size',
          render: (row) => row.size?.join(', '),
        },
        {
          title: 'New',
          field: 'isNew',
          render: (row) => (row.isNew ? 'Yes' : 'No'),
        },
        {
          title: 'Description',
          field: 'description',
          show: false,
        },
        {
          title: 'Actions',
          field: 'action_field',
          width: '120px',
        },
      ]}
    />
  );
}

export default App;
