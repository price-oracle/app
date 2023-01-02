import styled from 'styled-components';

import {
  Logo,
  BoxButton,
  SPACING_16,
  SPACING_32,
  SPACING_64,
  SPACING_256,
  SPACING_384,
  MOBILE_MAX_WIDTH,
} from '~/components/shared';

export const Container = styled.div<{ height: number }>`
  background-color: ${(props) => props.theme.background};
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

export const TopContent = styled.div``;

export const MiddleContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100vw;

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    align-self: center;
  }
`;

export const DataTitle = styled.div`
  font-family: PlusJakartaSans;
  font-size: 40px;
  font-weight: 800;
  line-height: 50px;
  margin-bottom: 0.5rem;
  text-align: center;

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    font-size: 30px;
    line-height: unset;
  }
`;

export const DataSubtitle = styled.div`
  font-family: PlusJakartaSans;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  text-align: center;

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    font-weight: unset;
  }
`;

export const BottomContent = styled.div`
  margin: 1rem;
  position: absolute;
  bottom: 0;
  right: 0;

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
  }
`;

export const DocsContainer = styled.div`
  align-items: center;
  box-sizing: border-box;
  color: ${(props) => props.theme.textPrimary};
  display: flex;
  font-family: PlusJakartaSans;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  justify-content: center;
  line-height: 20px;
  padding: 16px 0;
  text-decoration: none;
  width: 180px;

  div {
    border-bottom: 2px solid ${(props) => props.theme.background};
  }

  &:hover {
    div {
      border-bottom-color: ${(props) => props.theme.textPrimary};
    }
  }
`;

export const StyledLogo = styled(Logo)`
  width: ${SPACING_384};
  text-shadow: 2px 2px;
  padding-bottom: ${SPACING_16};

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    width: ${SPACING_256} !important;
  }
`;

export const EnterBoxButton = styled(BoxButton)`
  padding: ${SPACING_16} ${SPACING_64};
  width: fit-content;
`;

export const TextContainer = styled.div`
  text-align: center;
  max-width: 50rem;
  line-height: 2rem;
  margin: 2rem auto;
  padding-bottom: ${SPACING_32};

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    flex-direction: column;

    & > div {
      width: 18rem;
      margin: ${SPACING_16} auto;
      text-align: center;
    }
  }
`;
