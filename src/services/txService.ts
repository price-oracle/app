import { TransactionResponse } from '@ethersproject/providers';
import { useNetwork } from 'wagmi';

import { getConfig } from '~/config';

export class TxService {
  network = useNetwork();
  confirmations = getConfig().CONFIRMATIONS;
  chainId = this.network.chain?.id || 1;

  async handleTx(tx: TransactionResponse) {
    return tx.wait(this.confirmations[this.chainId]);
  }
}
