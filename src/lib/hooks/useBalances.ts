import Honeybadger from "@honeybadger-io/js";

export default function useBalances(address: string): Error {
  try {

    throw new Error(`useBalances: method not implemented. Address ${address}`);
  } catch (error) {
    Honeybadger.notify(error as Error);
    return error as Error;
  }
  // // const [balances, setBalances] = useState<Balance[]>([])
  // const { isLoading } = useQuery('getTokenBalances', () => fetch('https://polygon-mumbai.g.alchemy.com/v2/N6I1vMx2hiWVsQa7tsg68OqmvejSmj0m').then(res => res.json()
  // ))


  // useEffect(() => {
  //   async function fetchBalances() {
  //     const balances = await getBalances(address)
  //     setBalances(balances)
  //     setLoading(false)
  //   }
  //   fetchBalances()
  // }, [address])

  // return { balances, loading }
}