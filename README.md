# Angel Table

A flexible, customizable, and responsive React Table component with built-in sorting, pagination, search, row selection, column visibility, remote data fetching, and responsive card layouts.

**[Live Demo](https://demo-table-seven.vercel.app/)**

## ✨ Features

- **Responsive Design** – Automatically adapts to different screen sizes.
- **Table & Card Views** – Switch between traditional table and card layouts.
- **Sorting** – Sort columns in ascending or descending order.
- **Pagination** – Supports single and numbered pagination layouts.
- **Search** – Search and filter table data.
- **Row Selection** – Select individual rows or multiple rows.
- **Column Visibility** – Dynamically show or hide columns.
- **Custom Rendering** – Customize cell content with render functions.
- **Remote Data Fetching** – Load data directly from an API endpoint.
- **Custom Styling** – Customize the appearance with CSS classes.
- **Dark Mode Support** – Supports dark theme styling.
- **TypeScript Support** – Includes TypeScript type declarations.
- **Pagination** – Supports compact and numbered pagination layout

## 📦 Installation

Install using your preferred package manager.

**npm**

```bash
npm install @crong964/angel-table
```

**yarn**

```bash
yarn add @crong964/angel-table
```

**pnpm**

```bash
pnpm add @crong964/angel-table
```

## 🚀 Quick Start

Import the `Table` component and its stylesheet:

```tsx
import { Table } from '@crong964/angel-table';
import '@crong964/angel-table/style.css';

function App() {
  const columns = [
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
  ];

  const rows = [
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
  ];

  return <Table columns={columns} rows={rows} />;
}

export default App;
```

## 🌐 API Integration

Angel Table supports remote data fetching through the `setup.url` property.

```tsx
import { Table } from '@crong964/angel-table';
import '@crong964/angel-table/style.css';

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

## ⚙️ Advanced Usage

Angel Table allows you to configure the table layout, customize columns, render custom content, and control column visibility.

```tsx
import { Table } from '@crong964/angel-table';
import '@crong964/angel-table/style.css';

function App() {
  return (
    <Table
      className='custom-table'
      setup={{
        keyObject: '_id',
        viewDefault: 'card',
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
          title: 'Price',
          field: 'price',
          sort: true,
          render: (row) => `$${row.price}`,
        },
        {
          title: 'Stock',
          field: 'stock',
          sort: true,
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

## 📋 Column Configuration

Each column can be configured using the following properties:

| Property    | Type       | Description                 |
| ----------- | ---------- | --------------------------- |
| `title`     | `string`   | Column heading              |
| `field`     | `string`   | Data field or special field |
| `width`     | `string`   | Column width                |
| `className` | `string`   | Custom CSS class            |
| `sort`      | `boolean`  | Enable sorting              |
| `sortLabel` | `object`   | Customize sorting labels    |
| `show`      | `boolean`  | Control column visibility   |
| `render`    | `function` | Custom cell rendering       |

### Special Fields

Angel Table provides special fields for common table functionality.

| Field          | Description                    |
| -------------- | ------------------------------ |
| `index_field`  | Display row index              |
| `check_field`  | Display row selection checkbox |
| `action_field` | Display an action column       |

### Custom Cell Rendering

Use the `render` function to customize how cell content is displayed.

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

## 🛠️ Table Configuration

The `setup` property controls the table's behavior and appearance.

| Property      | Type      | Description                       |
| ------------- | --------- | --------------------------------- |
| `keyObject`   | `string`  | Unique identifier for each row    |
| `url`         | `string`  | API endpoint for remote data      |
| `viewDefault` | `string`  | Default view: `table` or `card`   |
| `showColumns` | `boolean` | Enable column visibility controls |

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

## 🎨 Styling & Themes

Angel Table requires its stylesheet to be imported separately.

```tsx
import '@crong964/angel-table/style.css';
```

Import the stylesheet once in your application entry point or global layout.

The component also supports dark theme styling through its theme configuration.

## 🔗 Links

- **Demo:** https://demo-table-seven.vercel.app/
- **npm:** https://www.npmjs.com/package/@crong964/angel-table
- **Repository:** https://github.com/crong964/angel-table

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## ⭐ Support

If you find this library helpful, please consider giving it a ⭐ on GitHub. Your support is greatly appreciated!
