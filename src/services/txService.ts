import { useNetwork } from 'wagmi';
import { getConfig } from '~/config';
import { AlertsActions } from '~/store';
import { useAppDispatch } from '~/hooks';
import { Contract } from 'ethers';

export class TxService {
  network = useNetwork();
  dispatch = useAppDispatch();
  confirmations = getConfig().CONFIRMATIONS;
  chainId = this.network.chain?.id || 1;

  async handleTx(tx: Promise<Contract>) {
    tx.then(async (txResponse) => {
      const txReceipt = await txResponse.wait(this.confirmations[this.chainId]);
      this.dispatch(AlertsActions.openAlert({ message: 'Transaction success!', type: 'success' }));
      return txReceipt;
    }).catch((e) => {
      this.dispatch(AlertsActions.openAlert({ message: 'Transaction failed', type: 'error' }));
    });
  }
}
