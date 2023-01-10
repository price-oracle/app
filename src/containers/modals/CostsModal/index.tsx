import { FC } from 'react';

import { Modal } from '~/components/shared';
import { Cost } from './CostModal';
import { Address } from '~/types';

export interface CreateProps {
  cardinality: number | undefined;
  tokenAddress: Address;
  tokenSymbol: string;
  fee: number;
  liquidity: string;
  sqrtPriceX96: string;
  poolExist: boolean;
}

export interface CostModalProps {
  onClose: () => void;
  modalProps: CreateProps;
}

export const CostModal: FC<CostModalProps> = ({ onClose, modalProps: createProps, ...props }) => {
  return (
    <Modal onClose={onClose}>
      <Cost createProps={createProps} {...props} />
    </Modal>
  );
};
