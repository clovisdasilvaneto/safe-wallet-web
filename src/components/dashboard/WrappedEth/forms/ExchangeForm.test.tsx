import { act, fireEvent, getByText, render, screen } from '@/tests/test-utils'
import ExchangeForm from './ExchangeForm'

describe('ExchangeForm', () => {
  it('should not enable the submit option in case user has not added any value', () => {
    const handleSubit = jest.fn()
    const submitLabel = 'Wrap'

    const { container } = render(<ExchangeForm balance={'100'} onSubmit={handleSubit} submitLabel={submitLabel} />)

    expect(getByText(container, submitLabel).classList.contains('Mui-disabled')).toBe(true)
  })

  it('should not allow user add a value greater than his or her balance', () => {
    const handleSubmit = jest.fn()
    const submitLabel = 'Wrap'

    jest.useFakeTimers()

    const { container } = render(<ExchangeForm balance={'100'} onSubmit={handleSubmit} submitLabel={submitLabel} />)

    act(() => {
      const input = container.querySelector('input') as HTMLElement

      fireEvent.change(input, { target: { value: 123 } })
      container.querySelector('button')?.click()
    })

    expect(handleSubmit).not.toBeCalled()
  })

  // TODO: Remove the skip test. for some reason react-form-hook validations is not working on unit tests
  // not sure if it has something todo with the project tests setup
  it.skip('should allow user add a value less or equal than his or her balance', () => {
    const handleSubmit = jest.fn()
    const submitLabel = 'Wrap'
    const amount = 22

    jest.useFakeTimers()

    const { container } = render(<ExchangeForm balance={'100'} onSubmit={handleSubmit} submitLabel={submitLabel} />)

    act(() => {
      const input = container.querySelector('input') as HTMLElement

      fireEvent.change(input, { target: { value: amount } })
      container.querySelector('button')?.click()
    })

    expect(handleSubmit).toBeCalledWith({ amount: amount })
  })
})
