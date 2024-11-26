import { CloudUpload, FileIcon } from 'lucide-react'
import React from 'react'
import {
  Controller,
  Control,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from 'react-hook-form'

interface FileInputProps {
  name: string
  control: Control<any>
  label?: string
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
}

export function FileInput({ name, control, label, error }: FileInputProps) {
  const errorMessage =
    error && 'message' in error
      ? error.message
      : Array.isArray(error)
        ? error
            .map(err => (err && 'message' in err ? err.message : null))
            .join(', ')
        : null

  return (
    <div>
      <div className="div">
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, ref, value } }) => (
            <div
              onClick={() => document.getElementById(name)?.click()}
              className="flex cursor-pointer items-center gap-2"
            >
              <input
                type="file"
                id={name}
                ref={ref}
                multiple
                onChange={e => onChange(e.target.files)}
                className="hidden"
              />
              <CloudUpload className="size-10" />
              {value && value.length > 0 ? (
                <>
                  {value.length}
                  <FileIcon className="size-4" />
                </>
              ) : (
                <span>{label}</span>
              )}
            </div>
          )}
        />
      </div>

      {errorMessage && (
        <span style={{ color: 'red' }}>{errorMessage.toString()}</span>
      )}
    </div>
  )
}
