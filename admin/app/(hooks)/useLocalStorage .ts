'use client'

import { useEffect, useState } from 'react'

type StoredValue<T> = any | File

const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): [
  StoredValue<T>,
  React.Dispatch<React.SetStateAction<StoredValue<T>>>,
  () => void,
] => {
  const isClient = typeof window !== 'undefined'

  const storedValue = isClient ? localStorage.getItem(key) : null
  const initial: StoredValue<T> = storedValue
    ? isFile(storedValue)
      ? new File([], 'placeholder')
      : JSON.parse(storedValue)
    : initialValue

  const [value, setValue] = useState<StoredValue<T>>(initial)

  useEffect(() => {
    if (isClient) {
      if (value instanceof File) {
        // Handle file storage differently
        const reader = new FileReader()
        reader.onloadend = () => {
          localStorage.setItem(key, reader.result as string)
        }
        reader.readAsDataURL(value)
      } else {
        localStorage.setItem(key, JSON.stringify(value))
      }
    }
  }, [isClient, key, value])

  const clearLocalStorage = () => {
    if (isClient) {
      localStorage.removeItem(key)
    }
  }

  return [value, setValue, clearLocalStorage]
}

// Helper function to check if a string is a Data URL representing a file
const isFile = (str: string | null): str is string => {
  return !!str && str.startsWith('data:') && str.includes(';base64,')
}

export default useLocalStorage
