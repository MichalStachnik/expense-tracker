'use server';
import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

interface UpdateTransactionData {
  id: string;
  text: string;
  amount: number;
}

interface TransactionResult {
  data?: UpdateTransactionData;
  error?: string;
}

const updateTransaction = async (
  data: UpdateTransactionData
): Promise<TransactionResult> => {
  const { id, text, amount } = data;

  if (!text || text.trim() === '') {
    return {
      error: 'Description is required',
    };
  }

  if (!amount) {
    return {
      error: 'Amount must be greater than 0',
    };
  }

  const { userId } = await auth();

  if (!userId) {
    return {
      error: 'User not found',
    };
  }

  try {
    const existingTransaction = await db.transaction.findUnique({
      where: {
        id,
        userId,
      },
    });

    if (!existingTransaction) {
      return {
        error: 'Transaction not found',
      };
    }

    await db.transaction.update({
      where: { id, userId },
      data: { text, amount },
    });

    revalidatePath('/');

    return { data: { id, text, amount } };
  } catch (error) {
    console.error('error', error);
    return {
      error: 'Failed to update transaction',
    };
  }
};

export default updateTransaction;
