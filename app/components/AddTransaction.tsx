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
      alert(error);
      toast.error(error);
    } else {
      toast.success('Transaction added');
      formRef.current?.reset();
    }
  };
  return (
    <div>
      <h3>add transaction</h3>
      <form ref={formRef} action={clientAction}>
        <div className="form-control">
          <label htmlFor="text">text</label>
          <input type="text" id="text" name="text" placeholder="enter text" />
        </div>
        <div className="form-control">
          <label htmlFor="amount">amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="enter amount"
            step="0.01"
          />
        </div>
        <button className="btn">add transaction</button>
      </form>
    </div>
  );
};

export default AddTransaction;
