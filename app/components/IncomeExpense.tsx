import { Card, CardContent } from '@/components/ui/card';
import getIncomeExpense from '../actions/getIncomeExpense';

const IncomeExpense = async () => {
  const { income, expense } = await getIncomeExpense();
  return (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardContent className="p-6">
          <h4 className="text-sm font-semibold uppercase mb-2">Income</h4>
          <p className="text-2xl font-bold text-emerald-500">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(income ?? 0)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h4 className="text-sm font-semibold uppercase mb-2">Expenses</h4>
          <p className="text-2xl font-bold text-rose-500">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(expense ?? 0)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default IncomeExpense;
