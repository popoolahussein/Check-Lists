// src/ItemList.tsx
import React from 'react';
import { Item } from './types'; // Import Item type
import LineItem from './LineItems';

interface ItemListProps {
  items: Item[]; // Use Item type here
  handleCheck: (id: string) => void; // id is now string
  handleDelete: (id: string) => void; // id is now string
}

const ItemList: React.FC<ItemListProps> = ({ items, handleCheck, handleDelete }) => {
  return (
    <ul>
      {items.map((item) => (
        <LineItem
          key={item.id}
          item={item}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

export default ItemList;
