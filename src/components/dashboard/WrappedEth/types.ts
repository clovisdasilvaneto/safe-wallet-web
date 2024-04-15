export type TTransaction = {
  to: string
  data: string
  value: string
}

export type TWrapAndUnWrapEthFn = (amount: bigint, config: { to: string }) => TTransaction

export type TWethAddressMap = {
  '137': string
  '11155111': string
  '1': string
}
