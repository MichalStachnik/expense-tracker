import { currentUser } from '@clerk/nextjs/server';
import Guest from './components/Guest';
import AddTransaction from './components/AddTransaction';
import Balance from './components/Balance';
import IncomeExpense from './components/IncomeExpense';
import TransactionList from './components/TransactionList';
import Chat from './components/Chat';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import { ChatButton } from './components/ChatButton';

const HomePage = async () => {
  const user = await currentUser();

  if (!user) return <Guest />;

  return (
    <div className="bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Welcome, {user.firstName}</h1>
        <div className="max-w-3xl mx-auto space-y-8 my-4">
          <Balance />
          <IncomeExpense />
          <AddTransaction />
          <TransactionList />
          <Chat />
          <ChatButton />
        </div>
      </main>
      <ToastContainer theme="dark" />
    </div>
  );
};

export default HomePage;
