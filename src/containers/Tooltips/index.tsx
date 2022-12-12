import { useState } from 'react';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
} from '@floating-ui/react';
import styled from 'styled-components';

import { FONT_SIZE_12, SPACING_12, SPACING_192 } from '~/components/shared';

const SContainer = styled.div`
  cursor: pointer;
  width: fit-content;
  margin-left: auto;
`;

const STooltip = styled.div`
  background: ${(props) => props.theme.buttonBackground};
  color: ${(props) => props.theme.background};
  width: ${SPACING_192};
  padding: ${SPACING_12};
  font-size: ${FONT_SIZE_12};
  line-height: 1.8rem;
  font-family: PlusJakartaSans;
`;

export function Tooltip({ content, children }: { content: string; children: any }) {
  const [open, setOpen] = useState(false);

  const { x, y, reference, floating, strategy, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: 'top',
    // Make sure the tooltip stays on the screen
    whileElementsMounted: autoUpdate,
    middleware: [offset(5), flip(), shift()],
  });

  // Event listeners to change the open state
  const hover = useHover(context, { move: false });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  // Role props for screen readers
  const role = useRole(context, { role: 'tooltip' });

  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role]);

  return (
    <SContainer>
      <div ref={reference} {...getReferenceProps()}>
        {children}
      </div>
      <FloatingPortal>
        {open && (
          <div
            ref={floating}
            style={{
              // Positioning styles
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
            }}
            {...getFloatingProps()}
          >
            <STooltip>{content}</STooltip>
          </div>
        )}
      </FloatingPortal>
    </SContainer>
  );
}
