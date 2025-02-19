import getUserBalance from '../actions/getUserBalance';

const Balance = async () => {
  const { balance } = await getUserBalance();
  return <div>balance {balance ?? 0}</div>;
};

export default Balance;
