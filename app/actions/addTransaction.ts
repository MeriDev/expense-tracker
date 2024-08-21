'use server';

type TransactionData = {
  text: string;
  amount: number;
};

type TransactionResult = {
  data?: TransactionData;
  error?: string;
};

async function addTransaction(formData: FormData): Promise<TransactionResult> {
  const textValue = formData.get('text');
  const amountValue = formData.get('amount');

  //check for input values
  if (!textValue || textValue === '' || !amountValue) {
    return { error: 'Text or amount is missing' };
  }

  const text: string = textValue.toString();
  const amount: number = parseFloat(amountValue.toString());

  const transactionData: TransactionData = {
    text,
    amount,
  };

  return { data: transactionData };
}

export default addTransaction;
