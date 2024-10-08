'use client';

import { Transaction } from '@/types/types';
import { addComma } from '@/lib/utils';
import { toast } from 'react-toastify';
import deleteTransaction from '@/app/actions/deleteTransaction';

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  const sign = transaction.amount < 0 ? '-' : '+';

  const handleDeleteTransaction = async (transactionId: string) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this transaction?'
    );
    if (!confirmed) return;

    const { message, error } = await deleteTransaction(transactionId);

    if (error) {
      toast.error(error);
    }

    toast.success(message);
  };

  return (
    <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
      {transaction.text}
      <span>
        {sign}
        {addComma(Math.abs(transaction.amount))}
      </span>
      <button
        className="delete-btn"
        onClick={() => handleDeleteTransaction(transaction.id)}
      >
        X
      </button>
    </li>
  );
};

export default TransactionItem;
