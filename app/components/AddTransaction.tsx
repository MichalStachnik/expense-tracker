'use client';
import { useRef } from 'react';
import addTransaction from '../actions/addTransaction';
import { toast } from 'react-toastify';

const AddTransaction = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const clientAction = async (formData: FormData) => {
    const { data, error } = await addTransaction(formData);
    console.log('data', data);

    if (error) {
      toast.error(error);
    } else {
      toast.success('Transaction added');
      formRef.current?.reset();
    }
  };
  return (
    <div>
      <h3>Add Transaction</h3>
      <form ref={formRef} action={clientAction}>
        <div className="form-control">
          <label htmlFor="text">Income or Expense</label>
          <input
            type="text"
            id="text"
            name="text"
            placeholder="Enter Icome or Expense"
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">Amount (+ for income, - for expense)</label>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="Enter amount"
            step="0.01"
          />
        </div>
        <button className="btn">Add Transaction</button>
      </form>
    </div>
  );
};

export default AddTransaction;
