import { RootState } from '~/types/State';

const selectActiveModal = (state: RootState) => state.modals.activeModal;
const selectActiveModalProps = (state: RootState) => state.modals.modalProps;

export const ModalSelectors = {
  selectActiveModal,
  selectActiveModalProps,
};
