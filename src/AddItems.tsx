import { FaPlus } from 'react-icons/fa';
import Modal from './Modal';
import { useState, useRef, FormEvent } from 'react';

interface AddItemProps {
  newItem: string;
  setNewItem: (item: string) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  existingItems: string[];
}

const AddItem: React.FC<AddItemProps> = ({ newItem, setNewItem, handleSubmit, existingItems }) => {
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const checkForDuplicate = (): boolean => {
    if (existingItems.includes(newItem)) {
      setShowModal(true);
      return true;
    }
    return false;
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!checkForDuplicate()) {
      handleSubmit(e);
      setNewItem('');
      inputRef.current?.focus();
    }
  };

  return (
    <>
      <form className='addform' onSubmit={handleFormSubmit}>
        <label className='label' htmlFor="addItem">Add Item</label>
        <input
          type="text"
          className='addItem'
          id='addItem'
          autoFocus
          ref={inputRef}
          placeholder='Add Item'
          required
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button
          className='button'
          type='submit'
          aria-label='Add Item'
          onClick={() => inputRef.current?.focus()}
        >
          <FaPlus />
        </button>
      </form>
      {showModal && (
        <Modal 
          message="This item already exists in the list." 
          onClose={() => setShowModal(false)} 
        />
      )}
    </>
  );
};

export default AddItem;
