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

  async handleTx(tx: Promise<Contract>, successMessage?: string, errorMessage?: string): Promise<boolean> {
    const txResult = tx
      .then(async (txResponse) => {
        await txResponse.wait(this.confirmations[this.chainId]);
        this.dispatch(AlertsActions.openAlert({ message: successMessage || 'Transaction success!', type: 'success' }));
        return true;
      })
      .catch((e) => {
        this.dispatch(AlertsActions.openAlert({ message: errorMessage || 'Transaction failed', type: 'error' }));
        return false;
      });

    return txResult;
  }
}
