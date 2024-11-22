'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface QuoteButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const QuoteButton = ({ className, ...props }: QuoteButtonProps) => {
  const router = useRouter()

  async function handleClick() {
    await router.push('/contact')
  }

  return (
    <Button
      className={cn('bg-white text-accent-100 hover:text-white', className)}
      onClick={handleClick}
      {...props}
    >
      Solicitar um orçamento
    </Button>
  )
}

export default QuoteButton
