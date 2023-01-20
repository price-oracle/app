// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import '@price-oracle/interfaces/contracts/IPoolManagerFactory.sol';
import '@price-oracle/interfaces/contracts/IPoolManager.sol';
import '@price-oracle/interfaces/contracts/ILockManager.sol';

contract BatchPoolManagerData {
  // define data struct that will be returned
  // if order or amount of elements is changed update the service that decodes it
  struct PoolManagerData {
    IPoolManager poolManager;
    uint24 fee;
    bool isWethToken0;
    uint256 poolWethClaimable;
    uint256 poolTokenClaimable;
    uint256 poolLiquidity;
    uint256 userSeedBalanace;
    ILockManager lockManager;
    IUniswapV3Pool pool;
    uint256 lockWethClaimable;
    uint256 lockTokenClaimable;
    uint256 lockedBalance;
    uint160 sqrtPriceX96;
    IERC20 token;
    string tokenSymbol;
    string tokenName;
    uint256 tokenDecimals;
  }

  constructor(
    IPoolManagerFactory poolManagerFactory,
    uint256 startFrom,
    uint256 amount,
    address account
  ) {
    // get list of pool managers
    IPoolManager[] memory poolManagers = poolManagerFactory.listChildren(startFrom, amount);

    // create an array of data to be returned, with defined length
    uint256 poolAmount = poolManagers.length;
    PoolManagerData[] memory returnData = new PoolManagerData[](poolAmount);

    // for every pool manager
    for (uint256 i = 0; i < poolAmount; i++) {
      IPoolManager poolManager = poolManagers[i];

      {
        ILockManager lockManager = poolManager.lockManager();
        (uint256 lockWethClaimable, uint256 lockTokenClaimable) = lockManager.claimable(account);
        returnData[i].lockWethClaimable = lockWethClaimable;
        returnData[i].lockTokenClaimable = lockTokenClaimable;
        returnData[i].lockManager = lockManager;
        returnData[i].lockedBalance = lockManager.balanceOf(account);

        IUniswapV3Pool pool = lockManager.POOL();
        (uint160 sqrtPriceX96, , , , , , ) = pool.slot0();
        returnData[i].pool = pool;
        returnData[i].sqrtPriceX96 = sqrtPriceX96;
      }

      {
        (uint256 poolWethClaimable, uint256 poolTokenClaimable) = poolManager.claimable(account);
        returnData[i].poolWethClaimable = poolWethClaimable;
        returnData[i].poolTokenClaimable = poolTokenClaimable;
        returnData[i].poolLiquidity = poolManager.poolLiquidity();
        returnData[i].userSeedBalanace = poolManager.seederBalance(account);
      }

      {
        returnData[i].poolManager = poolManager;
        returnData[i].fee = poolManager.FEE();
        returnData[i].isWethToken0 = poolManager.IS_WETH_TOKEN0();
      }

      {
        IERC20 token = poolManager.TOKEN();
        returnData[i].token = token;
        returnData[i].tokenSymbol = token.symbol();
        returnData[i].tokenName = token.name();
        returnData[i].tokenDecimals = token.decimals();
      }
    }

    // encode return data
    bytes memory data = abi.encode(returnData);

    // force constructor return via assembly
    assembly {
      let dataStart := add(data, 32) // abi.encode adds an additional offset
      return(dataStart, sub(msize(), dataStart))
    }
  }
}
