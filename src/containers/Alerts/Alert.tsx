import { FC } from 'react';
import styled from 'styled-components';

import { AlertsActions } from '~/store';
import { useAppDispatch, useAppSelector } from '~/hooks';

import { SPACING_12, SPACING_4, Icon, Typography } from '~/components/shared';
import { getTheme } from '~/components/shared';
import { AlertTypes } from '~/types';

const StyledAlert = styled.div<{ type: AlertTypes }>`
  margin-right: 5rem;
  overflow: hidden;
  overflow-y: auto;
  padding: 1.5rem 2.8rem;
  position: relative;
  pointer-events: all;
  z-index: 1200;
  width: 32rem;
  max-height: 13rem;
  position: relative;
  transform: translate3d(0, 0, 0);

  ${({ type, theme }) => {
    let background = theme.alerts.alertBackground;
    let color = theme.alerts.alertColor;

    if (type === 'error') {
      background = theme.alerts.errorBackground;
      color = theme.alerts.errorColor;
    } else if (type === 'success') {
      background = theme.alerts.successBackground;
      color = theme.alerts.successColor;
    } else if (type === 'info') {
      background = theme.alerts.infoBackground;
      color = theme.alerts.infoColor;
    } else if (type === 'warning') {
      background = theme.alerts.warningBackground;
      color = theme.alerts.warningCSolor;
    }
    return `background: ${background}; color: ${color}; fill: ${color}`;
  }}
`;

const CloseAlert = styled.div`
  padding: 0.1rem;
  position: absolute;
  right: 0.1rem;
  top: 0rem;
  cursor: pointer;
  transition: opacity 200ms ease-in-out;

  :hover {
    opacity: 0.8;
  }
`;

const MessageAlert = styled(Typography).attrs({
  variant: 'medium',
})``;

export interface AlertProps {
  id: string;
  className?: string;
  onClose?: () => void;
  type: AlertTypes;
  message: string;
}

export const Alert: FC<AlertProps> = ({ className, onClose, message, id, type, ...props }) => {
  const dispatch = useAppDispatch();
  const closeAlert = () => dispatch(AlertsActions.closeAlert({ alertId: id }));
  const currentTheme = useAppSelector(({ theme }) => theme.current);

  const theme = getTheme(currentTheme);

  const closeButton = (
    <CloseAlert onClick={closeAlert}>
      <Icon name='close' size={SPACING_12()} padding={SPACING_4()} color={theme.textSecondary} />
    </CloseAlert>
  );

  return (
    <StyledAlert className={className} id={`alert-${id}`} type={type} {...props}>
      {closeButton}
      <MessageAlert>{message}</MessageAlert>
    </StyledAlert>
  );
};
