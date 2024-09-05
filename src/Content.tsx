// src/Content.tsx
import React from 'react';
import ItemList from './ItemList';
import { Item } from './types'; // Import Item type

interface ContentProps {
  items: Item[]; // Use Item type here
  handleCheck: (id: string) => void; // id is now string
  handleDelete: (id: string) => void; // id is now string
}

const Content: React.FC<ContentProps> = ({ items, handleCheck, handleDelete }) => {
  return (
    <div className='content-div'>
      {items.length ? (
        <ItemList
          items={items}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ) : (
        <p className='empty-message'>Your list is empty.</p>
      )}
    </div>
  );
};

export default Content;
