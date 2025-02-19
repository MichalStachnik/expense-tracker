import getIncomeExpense from '../actions/getIncomeExpense';

const IncomeExpense = async () => {
  const { income, expense } = await getIncomeExpense();
  return (
    <div className="inc-exp-container">
      <div>
        <h4>Income</h4>
        <p className="money plus">
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(income ?? 0)}
        </p>
      </div>
      <div>
        <h4>Expenses</h4>
        <p className="money minus">
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(expense ?? 0)}
        </p>
      </div>
    </div>
  );
};

export default IncomeExpense;
