import { useNetwork } from 'wagmi';
import { Contract } from 'ethers';

import { getConfig } from '~/config';
import { AlertsActions } from '~/store';
import { useAppDispatch } from '~/hooks';

export class TxService {
  network = useNetwork();
  dispatch = useAppDispatch();
  confirmations = getConfig().CONFIRMATIONS;
  chainId = this.network.chain?.id || 1;

  async handleTx(tx: Promise<Contract>, successMessage?: string, errorMessage?: string) {
    return tx
      .then(async (txResponse) => {
        const txReceipt = await txResponse.wait(this.confirmations[this.chainId]);
        this.dispatch(AlertsActions.openAlert({ message: successMessage || 'Transaction success!', type: 'success' }));
        return txReceipt;
      })
      .catch((e) => {
        return this.dispatch(AlertsActions.openAlert({ message: errorMessage || 'Transaction failed', type: 'error' }));
      });
  }
}
