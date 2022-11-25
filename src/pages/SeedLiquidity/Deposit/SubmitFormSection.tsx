import { useEffect, useState } from 'react';
import styled from 'styled-components';
import BigNumber from 'bignumber.js';
import { useAccount } from 'wagmi';

import { ERC20Service, PoolManagerFactoryService } from '~/services';
import { BoxButton, Loading } from '~/components/shared';
import { ethersValueToBN, toUnit, toWei, unitToWei } from '~/utils';
import { Address, Token } from '~/types';
import { getConfig } from '~/config';
import { BigNumberish } from 'ethers';

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

  // temporary fixed values
  const feeCardProps = {
    created: false,
  };

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
      erc20Service.approveTokenAmount(WETH_ADDRESS, poolManagerAddress, unitToWei(wethAmount.toString())).then(() => {
        setIsLoading(false);
        updateAllowanceAmount(poolManagerAddress);
      });

    if (ethIsApproved)
      if (selectedToken?.address) {
        setIsLoading(true);
        erc20Service
          .approveTokenAmount(selectedToken?.address, poolManagerAddress, toWei(tokenAmount.toString()))
          .then(() => {
            setIsLoading(false);
            updateAllowanceAmount(poolManagerAddress);
          });
      }
  };

  const ethIsApproved = wethAmount?.lte(ethersValueToBN(wethAllowance));
  const isApproved = ethIsApproved && tokenAmount?.lte(ethersValueToBN(tokenAllowance));

  useEffect(() => {
    if (tokenAmount.gt(tokenBalance) || wethAmount.gt(wethBalance)) {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
    }
  }, [tokenAmount, wethAmount, tokenBalance, wethBalance]);

  useEffect(() => {
    if (selectedToken?.address)
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
          disabled={isLoading || isInvalid || !address || tokenAmount.isEqualTo(0) || wethAmount.isEqualTo(0)}
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
          disabled={isLoading || isInvalid || !address || tokenAmount.isEqualTo(0) || wethAmount.isEqualTo(0)}
        >
          {isLoading && <Loading />}
          {!isLoading && (feeCardProps?.created ? 'Add Liquidity' : 'Create Pool')}
        </SBoxButton>
      )}
    </Container>
  );
};

export default SubmitFormSection;
