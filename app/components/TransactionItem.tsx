'use client';
import { toast } from 'react-toastify';
import { Transaction } from '@/types/Transaction';
import deleteTransaction from '../actions/deleteTransaction';
import { useRef, useState } from 'react';
import updateTransaction from '../actions/updateTransaction';
import Image from 'next/image';

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  const [formData, setFormData] = useState({
    text: transaction.text,
    amount: transaction.amount,
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    transaction.imageUrl || null
  );

  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleDeleteTransaction = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this');
    if (!confirmed) return;

    const { message, error } = await deleteTransaction(id);

    if (error) {
      toast.error(error);
      return;
    }

    toast.success(message);
  };

  const openEditDialog = () => {
    dialogRef.current?.showModal();
    setFormData({
      text: transaction.text,
      amount: transaction.amount,
    });
    setPreviewUrl(transaction.imageUrl || null);
  };

  const closeEditDialog = () => {
    dialogRef.current?.close();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await updateTransaction({
      id: transaction.id,
      text: formData.text,
      amount: formData.amount,
    });

    if (error) {
      toast.error(error);
      return;
    }

    console.log('data', data);
    toast.success('Successfully updated');
    closeEditDialog();
  };

  return (
    <>
      <li
        key={transaction.id}
        className={transaction.amount < 0 ? 'minus' : 'plus'}
      >
        <div className="transaction-content">
          <span className="transaction-text">{transaction.text}</span>
          <span className="transaction-amount">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(transaction.amount)}
          </span>

          {transaction.imageUrl && (
            <div>
              <button
                className="view-receipt-btn"
                onClick={() =>
                  transaction.imageUrl &&
                  window.open(transaction.imageUrl, '_blank')
                }
              >
                <div className="image-preview">
                  <Image
                    src={transaction.imageUrl}
                    alt="Receipt preview"
                    width={200}
                    height={250}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </button>
            </div>
          )}
        </div>

        <div className="transaction-actions">
          <button
            onClick={openEditDialog}
            className="edit-btn"
            aria-label="Edit transaction"
          >
            ✎
          </button>
          <button
            onClick={() => handleDeleteTransaction(transaction.id)}
            className="delete-btn"
            aria-label="Delete transaction"
          >
            x
          </button>
        </div>
      </li>

      <dialog ref={dialogRef} className="edit-dialog">
        <form onSubmit={handleSubmit}>
          <h3>Edit Transaction</h3>
          <div className="form-control">
            <label htmlFor="edit-text">Description</label>
            <input
              type="text"
              id="edit-text"
              name="text"
              value={formData.text}
              onChange={handleInputChange}
              placeholder="Enter description"
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="edit-amount">
              Amount (+ for income, - for expense)
            </label>
            <input
              type="number"
              id="edit-amount"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              placeholder="Enter amount"
              step="0.01"
              required
            />
          </div>

          <div className="form-control">
            <label htmlFor="edit-receipt">Receipt Image</label>

            <input
              type="file"
              id="edit-receipt"
              name="receipt"
              accept="image/*"
              onChange={handleFileChange}
            />

            {previewUrl && (
              <div className="image-preview">
                <Image
                  src={previewUrl}
                  alt="Receipt preview"
                  width={200}
                  height={250}
                  style={{ objectFit: 'contain' }}
                />
              </div>
            )}
          </div>

          <div className="dialog-actions">
            <button
              type="button"
              className="btn cancel-btn"
              onClick={closeEditDialog}
            >
              Cancel
            </button>
            <button type="submit" className="btn update-btn">
              Update
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default TransactionItem;
