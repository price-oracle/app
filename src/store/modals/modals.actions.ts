import { createAction } from '@reduxjs/toolkit';

import { ModalName } from '~/types/Modals';

const openModal = createAction<{ modalName: ModalName; modalProps?: any }>('modals/openModal');
const closeModal = createAction('modals/closeModal');

export const ModalsActions = {
  openModal,
  closeModal,
};
