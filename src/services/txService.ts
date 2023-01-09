import { Contract } from 'ethers';

import { getConfig } from '~/config';
import { AlertsActions } from '~/store';
import { useAppDispatch } from '~/hooks';

export class TxService {
  dispatch = useAppDispatch();
  confirmations = getConfig().CONFIRMATIONS;
  // TODO: remove this as soon as contracts are deployed, or tenderly implements automine in forks
  isDev = getConfig().ALLOW_DEV_MODE;
  chainId: number;

  constructor(chainId: number) {
    this.chainId = chainId;
  }

  async handleTx(tx: Promise<Contract>, successMessage?: string, errorMessage?: string) {
    return tx
      .then(async (txResponse) => {
        const txReceipt = await txResponse.wait(this.isDev ? 0 : this.confirmations[this.chainId]);

        this.dispatch(AlertsActions.openAlert({ message: successMessage || 'Transaction success!', type: 'success' }));
        return txReceipt;
      })
      .catch((e) => {
        this.dispatch(AlertsActions.openAlert({ message: errorMessage || 'Transaction failed', type: 'error' }));
        throw e;
      });
  }
}
