import { Skeleton, Typography } from '@mui/material'
import { Card, WidgetBody, WidgetContainer } from '../styled'
import useSafeTransactionFlow, { unwrapEth, wrapEth } from './hooks/useSafeTransactionFlow'
import useBalances from '@/hooks/useBalances'
import { parseUnits } from 'ethers'
import { WETH_ADDRESS } from './constants'
import useWrappedBalances from './hooks/useWrappedBalances'
import WrapEtherForm from './forms/ExchangeForm'

const LoadingWrappedWidget = () => (
  <>
    <Skeleton variant="text" width={100} height={30} />
    <Skeleton variant="rectangular" width="100%" height={200} />
  </>
)

const WrappedEth = () => {
  const onTxSubmit = useSafeTransactionFlow()
  const { loading } = useBalances()
  const { ethBalance, wethBalance } = useWrappedBalances()

  const sendTransaction = (fn: any) => (data: { amount: number }) => {
    const amount = parseUnits(data.amount.toString(), 18)

    onTxSubmit(
      fn(amount, {
        to: WETH_ADDRESS,
      }),
    )
  }

  return (
    <WidgetContainer>
      <Typography component="h2" variant="subtitle1" fontWeight={700} mb={2}>
        Wrapped ETH
      </Typography>

      {loading ? (
        <LoadingWrappedWidget />
      ) : (
        <WidgetBody>
          <Card>
            <Typography component="h3" variant="subtitle1" fontWeight={700} mb={1}>
              Your ETH balance is {ethBalance}
            </Typography>

            <WrapEtherForm onSubmit={sendTransaction(wrapEth)} submitLabel="Wrap" balance={ethBalance} />

            <Typography component="h3" variant="subtitle1" fontWeight={700} mb={1}>
              Your WETH balance is {wethBalance}
            </Typography>

            <WrapEtherForm onSubmit={sendTransaction(unwrapEth)} submitLabel="Unwrap" balance={wethBalance} />
          </Card>
        </WidgetBody>
      )}
    </WidgetContainer>
  )
}

export default WrappedEth
