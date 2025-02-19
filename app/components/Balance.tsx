import getUserBalance from '../actions/getUserBalance';

const Balance = async () => {
  const { balance } = await getUserBalance();
  return (
    <div>
      Balance{' '}
      {new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(balance ?? 0)}
    </div>
  );
};

export default Balance;
