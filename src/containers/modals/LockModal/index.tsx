import { FC } from 'react';

import Lock from './Lock';
import { Modal } from '~/components/shared';
import { PoolManager } from '~/types';

export interface LockModalProps {
  onClose: () => void;
  modalProps: PoolManager;
}

export const LockModal: FC<LockModalProps> = ({ onClose, modalProps: pool, ...props }) => {
  return (
    <Modal onClose={onClose}>
      <Lock pool={pool} {...props} />
    </Modal>
  );
};
