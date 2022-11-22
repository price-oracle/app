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

  async handleTx(tx: Promise<Contract>, messages?: string[] | undefined) {
    tx.then(async (txResponse) => {
      const txReceipt = await txResponse.wait(this.confirmations[this.chainId]);
      this.dispatch(AlertsActions.openAlert({ message: messages![1] || 'Transaction success!', type: 'success' }));
      return txReceipt;
    }).catch((e) => {
      this.dispatch(AlertsActions.openAlert({ message: messages![0] || 'Transaction failed', type: 'error' }));
    });
  }
}
