import getUserBalance from '@/app/actions/getUserBalance';
import { addComma } from '@/lib/utils';

const Balance = async () => {
  const { balance } = await getUserBalance();

  return (
    <>
      <h4>Your balance</h4>
      <h1>$ {addComma(Number(balance?.toFixed(2) ?? 0))}</h1>
    </>
  );
};

export default Balance;
