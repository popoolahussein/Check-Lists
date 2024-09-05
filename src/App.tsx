// src/App.tsx
import React, { useState, useEffect } from 'react';
import Header from './Header';
import SearchItem from './Search';
import AddItem from './AddItems';
import Content from './Content';
import Footer from './Footer';
import { Item } from './types'; // Import Item type

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>(() => {
    const savedItems = localStorage.getItem('generallist');
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');

  const generateId = (): string => `id-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  useEffect(() => {
    const savedItems = localStorage.getItem('generallist');
    const parsedItems: Item[] = savedItems ? JSON.parse(savedItems) : [];
  
    const uniqueItems: Item[] = Array.from(new Map(parsedItems.map((item) => [item.id, item])).values());
    
    if (uniqueItems.length !== parsedItems.length) {
      console.warn('Duplicate IDs found in local storage:', parsedItems.map((item) => item.id));
      localStorage.setItem('generallist', JSON.stringify(uniqueItems));
      setItems(uniqueItems);
    } else {
      setItems(parsedItems);
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('generallist', JSON.stringify(items));
  }, [items]);

  const addItem = (item: string) => {
    const itemExists = items.some(existingItem => existingItem.item.toLowerCase() === item.toLowerCase());

    if (itemExists) {
      alert('This item already exists in the list.');
      return;
    }

    const id = generateId();
    const myNewItem: Item = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setItems(listItems);
  };

  const handleCheck = (id: string) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);
  };

  const handleDelete = (id: string) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem('');
  };

  return (
    <main className="App">
      <Header title="Lists" />
      <SearchItem
        search={search}
        setSearch={setSearch}
      />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
        existingItems={items.map(item => item.item)}
      />
      <Content
        items={items.filter(item => item.item.toLowerCase().includes(search.toLowerCase()))}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer length={items.length} />
    </main>
  );
}

export default App;
