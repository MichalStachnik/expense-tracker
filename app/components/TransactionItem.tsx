'use client';
import { toast } from 'react-toastify';
import deleteTransaction from '../actions/deleteTransaction';
import { Transaction } from '@/types/Transaction';

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
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
  return (
    <li
      key={transaction.id}
      className={transaction.amount < 0 ? 'minus' : 'plus'}
    >
      {transaction.text}
      {transaction.amount}
      <button
        onClick={() => handleDeleteTransaction(transaction.id)}
        className="delete-btn"
      >
        x
      </button>
    </li>
  );
};

export default TransactionItem;
