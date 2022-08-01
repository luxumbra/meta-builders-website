import { useState, useEffect } from "react"
import {useQuery } from "@tanstack/react-query"

export default function useBalances(address: string): [string, string] {
  // const [balances, setBalances] = useState<Balance[]>([])
  const { isLoading } = useQuery('getTokenBalances', () => fetch('https://polygon-mumbai.g.alchemy.com/v2/N6I1vMx2hiWVsQa7tsg68OqmvejSmj0m').then(res => res.json()
  ))


  useEffect(() => {
    async function fetchBalances() {
      const balances = await getBalances(address)
      setBalances(balances)
      setLoading(false)
    }
    fetchBalances()
  }, [address])

  return { balances, loading }
}