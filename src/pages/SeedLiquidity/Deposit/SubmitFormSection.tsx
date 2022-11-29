import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BigNumberish, BigNumber } from 'ethers';
import { useAccount } from 'wagmi';

import { ERC20Service, PoolManagerFactoryService } from '~/services';
import { BoxButton, Loading } from '~/components/shared';
import { Address, Token } from '~/types';
import { getConfig } from '~/config';

const Container = styled.section`
  display: grid;
  flex-direction: column;
  justify-content: center;
`;

const SBoxButton = styled(BoxButton)`
  width: 25rem;
`;

interface AmountsProps {
  tokenAmount: BigNumber;
  tokenBalance: BigNumber;
  wethAmount: BigNumber;
  wethBalance: BigNumber;
  selectedToken: Token | undefined;
}

const SubmitFormSection = ({ tokenAmount, wethAmount, tokenBalance, wethBalance, selectedToken }: AmountsProps) => {
  const erc20Service = new ERC20Service();
  const poolManagerFactoryService = new PoolManagerFactoryService();
  const { address } = useAccount();
  const [isInvalid, setIsInvalid] = useState(false);
  const [wethAllowance, setWethAllowance] = useState<BigNumberish>('0');
  const [tokenAllowance, setTokenAllowance] = useState<BigNumberish>('0');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [poolManagerAddress, setPoolManagerAddress] = useState<Address>('');
  const {
    ADDRESSES: { WETH_ADDRESS },
  } = getConfig();

  const ethIsApproved = wethAmount.lte(wethAllowance);
  const isApproved = ethIsApproved && tokenAmount.lte(tokenAllowance);

  // temporary fixed values
  const feeCardProps = {
    created: false,
  };

  const isDisabled = () => isLoading || isInvalid || !address || tokenAmount.isZero() || wethAmount.isZero();

  const updateAllowanceAmount = (poolManagerAddress: Address) => {
    if (address && selectedToken?.address) {
      setIsLoading(true);
      erc20Service
        .fetchTokenAllowance(WETH_ADDRESS, poolManagerAddress, address)
        .then((allowance) => setWethAllowance(allowance))
        .finally(() => {
          setIsLoading(false);
        });
      erc20Service
        .fetchTokenAllowance(selectedToken.address, poolManagerAddress, address)
        .then((allowance) => setTokenAllowance(allowance))
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleApprove = () => {
    setIsLoading(true);
    if (!ethIsApproved)
      erc20Service.approveTokenAmount(WETH_ADDRESS, poolManagerAddress, wethAmount.toString()).then(() => {
        setIsLoading(false);
        updateAllowanceAmount(poolManagerAddress);
      });

    if (ethIsApproved)
      if (selectedToken?.address) {
        erc20Service.approveTokenAmount(selectedToken?.address, poolManagerAddress, tokenAmount.toString()).then(() => {
          setIsLoading(false);
          updateAllowanceAmount(poolManagerAddress);
        });
      }
  };

  useEffect(() => {
    if (tokenAmount.gt(tokenBalance) || wethAmount.gt(wethBalance)) {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
    }
  }, [tokenAmount, wethAmount, tokenBalance, wethBalance]);

  useEffect(() => {
    if (selectedToken?.address)
      // TODO: CHANGE FIXED FEE TIER VALUE: 3000
      poolManagerFactoryService.getPoolManagerAddress(selectedToken?.address, 3000).then((poolManagerAddress) => {
        updateAllowanceAmount(poolManagerAddress);
        setPoolManagerAddress(poolManagerAddress);
      });
  }, [selectedToken]);

  return (
    <Container>
      {/* Approval Logic */}
      {!isApproved && (
        <SBoxButton
          onClick={() => {
            handleApprove();
          }}
          disabled={isDisabled()}
        >
          {isLoading && <Loading />}
          {!isLoading && <>{!ethIsApproved ? 'Approve WETH' : `Approve ${selectedToken?.symbol}`}</>}
        </SBoxButton>
      )}

      {/* Initialize/Add-Liquidity Pool Logic */}
      {isApproved && (
        <SBoxButton
          onClick={() => {
            console.log('handleCreatePool');
          }}
          disabled={isDisabled()}
        >
          {isLoading && <Loading />}
          {!isLoading && (feeCardProps?.created ? 'Add Liquidity' : 'Create Pool')}
        </SBoxButton>
      )}
    </Container>
  );
};

export default SubmitFormSection;
