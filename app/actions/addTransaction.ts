'use server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

interface TransactionData {
  text: string;
  amount: number;
}

interface TransactionResult {
  data?: TransactionData;
  error?: string;
}

const addTransaction = async (
  formData: FormData
): Promise<TransactionResult> => {
  const textValue = formData.get('text');
  const amountValue = formData.get('amount');

  if (!textValue || textValue === '' || !amountValue) {
    return {
      error: 'value missing',
    };
  }

  const text: string = textValue.toString();
  const amount: number = parseFloat(amountValue.toString());

  const { userId } = await auth();

  if (!userId) {
    return { error: 'user not found' };
  }

  // const transactionData: TransactionData = {
  //   text,
  //   amount,
  // };
  try {
    const transactionData: TransactionData = await db.transaction.create({
      data: {
        text,
        amount,
        userId,
      },
    });

    revalidatePath('/');

    return { data: transactionData };
  } catch (error) {
    console.error('error', error);
    return {
      error: 'Transaction failed',
    };
  }
};

export default addTransaction;
