export type TTransaction = {
  to: string
  data: string
  value: string
}

export type TWrapAndUnWrapEthFn = (amount: bigint, config: { to: string }) => TTransaction
