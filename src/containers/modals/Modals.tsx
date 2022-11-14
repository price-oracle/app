import styled from 'styled-components';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { useAppSelector, useAppDispatch } from '~/hooks';
import { ModalsActions, ModalSelectors } from '~/store';

import { TestModal } from './TestModal';
import { LockModal } from './LockModal';

const modalTimeout = 300;

const StyledModals = styled(TransitionGroup)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 1000;

  .slideBottom-enter {
    opacity: 0;
    transform: translate3d(0, 100vh, 0);
    transition: opacity ${modalTimeout}ms ease, transform ${modalTimeout}ms ease;
  }
  .slideBottom-enter-active {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  .slideBottom-exit-active {
    opacity: 0;
    transform: translate3d(0, 100vh, 0);
    transition: opacity ${modalTimeout}ms ease, transform ${modalTimeout}ms cubic-bezier(1, 0.5, 0.8, 1);
  }

  .opacity-enter {
    opacity: 0;
    transition: opacity ${modalTimeout}ms ease-in-out;
  }
  .opacity-enter-active {
    opacity: 1;
  }
  .opacity-exit-active {
    opacity: 0;
    transition: opacity ${modalTimeout}ms ease-in-out;
  }
`;

const StyledBackdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  pointer-events: all;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 0;

  @media (min-width: 960px) {
    backdrop-filter: blur(11px);
  }
`;

// TODO dynamic modals list
// This will fix the development warning for strict mode if we apply nodeRef like
// in alerts
// const MODALS = [
//   {
//     name: 'test',
//     component: TestModal,
//   },
// ];

interface BackdropProps {
  onClick?: () => void;
}

export const Backdrop = ({ onClick }: BackdropProps) => {
  return <StyledBackdrop onClick={onClick} />;
};

export const Modals = () => {
  const dispatch = useAppDispatch();
  const activeModal = useAppSelector(ModalSelectors.selectActiveModal);
  const modalProps = useAppSelector(ModalSelectors.selectActiveModalProps);

  const closeModal = () => dispatch(ModalsActions.closeModal());

  let backdrop;

  if (activeModal) {
    backdrop = <Backdrop onClick={closeModal} />;
  }

  return (
    <StyledModals>
      {/* //////////////////////////// MODALS ///////////////////////////// */}

      {activeModal === 'test' && (
        <CSSTransition key={'test'} timeout={modalTimeout} classNames='slideBottom'>
          <TestModal modalProps={modalProps} onClose={closeModal} />
        </CSSTransition>
      )}

      {activeModal === 'lock' && (
        <CSSTransition key={'lock'} timeout={modalTimeout} classNames='slideBottom'>
          <LockModal modalProps={modalProps} onClose={closeModal} />
        </CSSTransition>
      )}

      {/* //////////////////////////// BACKDROP ///////////////////////////// */}

      {backdrop && (
        <CSSTransition key={'backdrop'} timeout={modalTimeout} classNames='opacity'>
          {backdrop}
        </CSSTransition>
      )}
    </StyledModals>
  );
};
