import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import getUserBalance from '../actions/getUserBalance';

const Balance = async () => {
  const { balance } = await getUserBalance();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Balance</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(balance ?? 0)}
        </p>
      </CardContent>
    </Card>
  );
};

export default Balance;
