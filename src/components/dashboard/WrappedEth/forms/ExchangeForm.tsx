import { Box, Button, TextField } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'

interface ExchangeFormProps {
  balance: string
  onSubmit: (data: { amount: number }) => void
  submitLabel: string
}

function ExchangeForm({ balance, onSubmit, submitLabel }: ExchangeFormProps) {
  const { register, handleSubmit, formState, watch } = useForm<{ amount: number }>({
    mode: 'onChange',
  })

  const watchedBalance = watch('amount')

  return (
    <Box display="flex" noValidate onSubmit={handleSubmit(onSubmit)} component="form" mb={3} gap={2}>
      <TextField
        type="number"
        placeholder={balance}
        label="Amount"
        inputProps={{ max: Number(balance) }}
        error={!!formState.errors?.amount}
        {...register('amount', {
          validate: (val) => val !== undefined,
          max: Number(balance),
        })}
      />

      <Button variant="contained" disabled={!watchedBalance} type="submit">
        {submitLabel}
      </Button>
    </Box>
  )
}

export default ExchangeForm
