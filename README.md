# Agl Table

A flexible and customizable React Table component with built-in sorting, pagination, search, column visibility, row selection, and responsive card layout.

## Features

- **Responsive Layout** – Automatically adapts between table and card views.
- **Card View** – Display data as cards on smaller screens.
- **Sorting** – Sort columns in ascending and descending order.
- **Pagination** – Built-in pagination controls.
- **Search** – Search and filter table data.
- **Row Selection** – Select individual rows or multiple rows.
- **Column Visibility** – Show or hide columns dynamically.
- **Custom Rendering** – Customize cell content using render functions.
- **Remote Data** – Fetch data from an API using a URL.
- **Custom Styling** – Customize the appearance using CSS.
- **TypeScript Support** – Built-in TypeScript declarations.

## Installation

Install the package using npm:

```bash
npm install @crong964/angel-table
```

Or using yarn:

```bash
yarn add @crong964/angel-table
```

Or using pnpm:

```bash
pnpm add @crong964/angel-table
```

## Basic Usage

Import the `Table` component:

```tsx
import { Table } from '@crong964/angel-table';
import '@crong964/angel-table/style.css';
function App() {
  return (
    <Table
      columns={[
        {
          title: 'Name',
          field: 'name',
        },
        {
          title: 'Email',
          field: 'email',
        },
        {
          title: 'Age',
          field: 'age',
        },
      ]}
      rows={[
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          age: 25,
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
          age: 28,
        },
      ]}
    />
  );
}

export default App;
```

## API Integration

agl Table supports loading data from an API through `setup.url`.

```tsx
import { Table } from '@crong964/angel-table';

function App() {
  return (
    <Table
      setup={{
        keyObject: '_id',
        url: 'https://fakestoreapi.noksha.dev/api/products',
      }}
      columns={[
        {
          title: 'Product',
          field: 'title',
          sort: true,
        },
        {
          title: 'Category',
          field: 'category',
          sort: true,
        },
        {
          title: 'Price',
          field: 'price',
          sort: true,
        },
      ]}
    />
  );
}

export default App;
```

## Advanced Usage

The following example demonstrates custom columns, responsive card view, column visibility, sorting, and custom cell rendering.

```tsx
import { Table } from '@crong964/angel-table';
import './App.css';

function App() {
  return (
    <Table
      className='e'
      setup={{
        viewDefault: 'card',
        keyObject: '_id',
        showColumns: true,
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
              src={row.image}
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
```

## Column Configuration

Each column supports the following properties:

| Property    | Type       | Description                 |
| ----------- | ---------- | --------------------------- |
| `title`     | `string`   | Column heading              |
| `field`     | `string`   | Data field or special field |
| `width`     | `string`   | Column width                |
| `className` | `string`   | Custom CSS class            |
| `sort`      | `boolean`  | Enable sorting              |
| `sortLabel` | `object`   | Custom sorting labels       |
| `show`      | `boolean`  | Control column visibility   |
| `render`    | `function` | Custom cell rendering       |

### Special Fields

agl Table provides special fields for common table functionality:

| Field          | Description            |
| -------------- | ---------------------- |
| `index_field`  | Display row index      |
| `check_field`  | Row selection checkbox |
| `action_field` | Action column          |

### Custom Rendering

Use `render` to customize how cell values are displayed.

```tsx
{
  title: 'Status',
  field: 'status',
  render: (row) => (
    <span className={`status status-${row.status}`}>
      {row.status}
    </span>
  ),
}
```

## Table Configuration

The `setup` property controls the table's behavior.

| Property      | Type      | Description                              |
| ------------- | --------- | ---------------------------------------- |
| `keyObject`   | `string`  | Unique identifier for each row           |
| `url`         | `string`  | API endpoint for remote data             |
| `viewDefault` | `string`  | Default display mode (`table` or `card`) |
| `showColumns` | `boolean` | Enable column visibility controls        |

Example:

```tsx
<Table
  setup={{
    keyObject: 'id',
    viewDefault: 'table',
    showColumns: true,
    url: 'https://example.com/api/data',
  }}
  columns={columns}
/>
```

## Import Styles

agl Table requires its stylesheet to be imported separately.

```tsx
import { Table } from '@crong964/angel-table';
import '@crong964/angel-table/style.css';
```

Make sure to import the stylesheet once in your application entry point or main component.

Without importing the stylesheet, the table may not display correctly.

For dark mode, the component supports theme styling through:

```tsx
import { Table } from '@crong964/angel-table';
```

## License

Mit

# Demo

link [demo-table-seven.vercel.app](https://demo-table-seven.vercel.app/)
