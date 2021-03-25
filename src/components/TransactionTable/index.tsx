import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { Container } from './styles'

interface TransactionProps {
    id: number
    title: string
    amount: number
    type: string
    category: string
    createdAt: string
}

export function TransactionTable() {
    const [transactions, setTransactions] = useState<TransactionProps[]>([])

    useEffect(() => {
        api.get('transactions')
            .then(response => setTransactions(response.data.transitions))
    }, [])

    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>

                <tbody>
                    {transactions.map(transition => (
                        <tr key={transition.id}>
                            <td>{transition.title}</td>
                            <td className={transition.type}>{transition.amount}</td>
                            <td>{transition.category}</td>
                            <td>{transition.createdAt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Container>
    )
}
