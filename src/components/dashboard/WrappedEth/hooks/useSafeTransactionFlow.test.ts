import { ethers } from 'ethers'
import { unwrapEth, wrapEth } from './useSafeTransactionFlow'

const mockedAddress = '0x12397'

describe('useSafeTransactionFlow', () => {
  it('should return a valid wrap ether transaction config', () => {
    const amount = ethers.parseUnits('100', 18)
    const config = wrapEth(amount, {
      to: mockedAddress,
    })

    expect(config).toMatchObject({
      data: '0xd0e30db0',
      to: mockedAddress,
      value: amount.toString(),
    })
  })

  it('should return a valid unwrap ether transaction config', () => {
    const amount = ethers.parseUnits('100', 18)
    const config = unwrapEth(amount, {
      to: mockedAddress,
    })

    expect(config).toMatchObject({
      data: '0x2e1a7d4d0000000000000000000000000000000000000000000000056bc75e2d63100000',
      to: mockedAddress,
      value: '0',
    })
  })
})
