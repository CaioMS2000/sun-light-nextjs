import { cn } from '@/lib/utils'

interface FormFieldProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode
}

export default function FormField({
  children,
  className,
  ...props
}: FormFieldProps) {
  return (
    <>
      <div className={cn('form-field', className)} {...props}>
        {children}
      </div>
    </>
  )
}
