import { useEffect, useState } from 'react'

export const useFetchData = (callFunc: any) => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const data = await callFunc
        setData(data)
      } catch (e) {
        setError(e)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  return {
    data,
    isLoading,
    error,
  }
}
