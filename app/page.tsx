import { currentUser } from '@clerk/nextjs/server';
import Guest from './components/Guest';
import AddTransaction from './components/AddTransaction';
import Balance from './components/Balance';
import IncomeExpense from './components/IncomeExpense';
import TransactionList from './components/TransactionList';
import Chat from './components/Chat';

const HomePage = async () => {
  const user = await currentUser();

  if (!user) return <Guest />;

  return (
    <main>
      <h1>Welcome, {user.firstName}</h1>
      <Balance />
      <IncomeExpense />
      <AddTransaction />
      <TransactionList />
      <Chat />
    </main>
  );
};

export default HomePage;
