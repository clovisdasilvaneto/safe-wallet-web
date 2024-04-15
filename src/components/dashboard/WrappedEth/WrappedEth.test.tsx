import { safeParseUnits } from '@/utils/formatters'
import { TokenType } from '@safe-global/safe-apps-sdk'
import { toBeHex } from 'ethers'
import { act, fireEvent, getByText, render } from '@/tests/test-utils'
import WrappedEth from '.'

const mockBalances = {
  data: {
    fiatTotal: '300',
    items: [
      {
        balance: safeParseUnits('100', 18)!.toString(),
        fiatBalance: '100',
        fiatConversion: '1',
        tokenInfo: {
          address: toBeHex('0x2', 20),
          decimals: 18,
          logoUri: '',
          name: 'DAI',
          symbol: 'DAI',
          type: TokenType.NATIVE_TOKEN,
        },
      },
    ],
  },
  loading: false,
  error: undefined,
}

describe('WrappedEth', () => {
  it('should render the WrapEth widget', () => {
    const { container } = render(<WrappedEth />, {
      initialReduxState: {
        balances: mockBalances,
      },
    })

    expect(getByText(container, 'Wrap').classList.contains('Mui-disabled')).toBe(true)
    expect(getByText(container, 'Unwrap').classList.contains('Mui-disabled')).toBe(true)
  })

  // TODO: Remove the skip test. for some reason react-form-hook validations is not working on unit tests
  // not sure if it has something todo with the project tests setup
  it.skip('should allow user add a value less or equal than his or her balance', () => {
    const amount = 22

    jest.useFakeTimers()

    const { container } = render(<WrappedEth />)

    act(() => {
      const input = container.querySelector('input') as HTMLElement

      fireEvent.change(input, { target: { value: amount } })
    })

    expect(getByText(container, 'Wrap').classList.contains('Mui-disabled')).toBe(false)
  })
})
