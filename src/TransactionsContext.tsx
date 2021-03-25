import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from './services/api'

interface TransactionProps {
    id: number
    title: string
    amount: number
    type: string
    category: string
    createdAt: string
}

type TransactionInput = Omit<TransactionProps, 'id' | 'createdAt'>

interface TransactionProviderProps {
    children: ReactNode
}

interface TransactionContextData {
    transactions: TransactionProps[]
    createTransaction: (transaction: TransactionInput) => void
}

export const TransactionContext = createContext<TransactionContextData>({} as TransactionContextData)

export function TransactionProvider({ children }: TransactionProviderProps) {
    const [transactions, setTransactions] = useState<TransactionProps[]>([])

    useEffect(() => {
        api.get('transactions')
            .then(response => setTransactions(response.data.transitions))
    }, [])

    function createTransaction(transaction: TransactionInput) {
        api.post('/transactions', transaction)
    }

    return (
        <TransactionContext.Provider value={{ transactions, createTransaction }}>
            {children}
        </TransactionContext.Provider>
    )
}
