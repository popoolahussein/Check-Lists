// LineItems.tsx
import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { Item } from './types';

interface LineItemProps {
  item: Item;
  handleCheck: (id: string) => void;
  handleDelete: (id: string) => void;
}

const LineItem: React.FC<LineItemProps> = ({ item, handleCheck, handleDelete }) => {
  return (
    <li className="item">
      <input
        type="checkbox"
        checked={item.checked}
        onChange={() => handleCheck(item.id)}
      />
      <label
        style={item.checked ? { textDecoration: 'line-through' } : undefined}
        onDoubleClick={() => handleCheck(item.id)}
      >
        {item.item}
      </label>
      <div
        onClick={() => handleDelete(item.id)}
        role="button"
        tabIndex={0}
        aria-label={`Delete ${item.item}`}
        style={{ cursor: 'pointer' }}
      >
        <FaTrashAlt />
      </div>
    </li>
  );
};

export default LineItem;
