import { Contract } from 'ethers';

import { getConfig } from '~/config';
import { AlertsActions } from '~/store';
import { useAppDispatch } from '~/hooks';

export class TxService {
  dispatch = useAppDispatch();
  confirmations = getConfig().CONFIRMATIONS;
  defaultConfirmations = getConfig().DEFAULT_CONFIRMATIONS;
  chainId: number;

  constructor(chainId: number) {
    this.chainId = chainId;
  }

  async handleTx(tx: Promise<Contract>, successMessage?: string, errorMessage?: string) {
    return tx
      .then(async (txResponse) => {
        const confirmations = this.confirmations[this.chainId] || this.defaultConfirmations;
        const txReceipt = await txResponse.wait(confirmations);

        this.dispatch(AlertsActions.openAlert({ message: successMessage || 'Transaction success!', type: 'success' }));
        return txReceipt;
      })
      .catch((e) => {
        this.dispatch(AlertsActions.openAlert({ message: errorMessage || 'Transaction failed', type: 'error' }));
        throw e;
      });
  }
}
