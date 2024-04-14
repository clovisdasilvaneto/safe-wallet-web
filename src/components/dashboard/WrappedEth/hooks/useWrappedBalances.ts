import useAsync from '@/hooks/useAsync'
import useBalances from '@/hooks/useBalances'
import useChainId from '@/hooks/useChainId'
import { safeFormatUnits } from '@/utils/formatters'
import { TokenType } from '@safe-global/safe-apps-sdk'
import { useMemo } from 'react'
import { WETH_ADDRESS, EMPTY_VALUE } from '../constants'
import { getWeb3ReadOnly } from '@/hooks/wallets/web3'
import useSafeAddress from '@/hooks/useSafeAddress'
import { Interface } from 'ethers'

const fetchWETHBalance = async (safeAddress: string): Promise<string> => {
  try {
    const tokenInterface = new Interface(['function balanceOf(address _owner) public view returns (uint256 balance)'])
    const web3ReadOnly = getWeb3ReadOnly()

    if (!web3ReadOnly) return EMPTY_VALUE

    const wethHexBalance = await web3ReadOnly.call({
      to: WETH_ADDRESS,
      data: tokenInterface.encodeFunctionData('balanceOf', [safeAddress]),
    })

    if (!wethHexBalance) return EMPTY_VALUE

    const balance = BigInt(wethHexBalance).toString()

    return safeFormatUnits(balance, 18)
  } catch (err) {
    throw Error(`Error fetching Safe Token balance:  ${err}`)
  }
}

const useWrappedBalances = () => {
  const { balances, loading } = useBalances()
  const chainId = useChainId()
  const address = useSafeAddress()

  const ethBalance = useMemo(
    () =>
      balances.items.reduce((acc, balance) => {
        if (balance.tokenInfo.type !== TokenType.NATIVE_TOKEN) return acc

        return safeFormatUnits(balance.balance, balance.tokenInfo.decimals)
      }, EMPTY_VALUE),
    [balances],
  )

  const [wethBalance = EMPTY_VALUE, loadingBalance] = useAsync(
    () => fetchWETHBalance(address),
    [chainId, ethBalance, address],
  )

  return { ethBalance, wethBalance, loading: loading || loadingBalance }
}

export default useWrappedBalances
