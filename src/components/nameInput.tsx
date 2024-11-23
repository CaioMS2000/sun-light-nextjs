'use client'

import { InputElement, InputIcon, InputRoot } from './input'
import { ALargeSmall } from 'lucide-react'
import { useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface NameInputProps {
  hookFormReference: UseFormRegisterReturn
}

export default function NameInput({ hookFormReference }: NameInputProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <InputRoot className="p-2" isFocused={isFocused}>
      <InputIcon>
        <ALargeSmall size={40} className="text-sun-light-blue" />
      </InputIcon>
      <InputElement
        className="font-bold text-lg text-white"
        placeholder="Nome completo"
        onIsFocused={setIsFocused}
        {...hookFormReference}
      />
    </InputRoot>
  )
}
