import { useState } from 'react'
import { TransactionProvider } from './hooks/useTransactions'

import { Header } from './components/Header'
import { Dashboard } from './components/Dashboard'
import { NewTransactionModal } from './components/NewTransactionModal'
import { GlobalStyle } from './styles/global'

function App() {
    const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false)

    function handleOpenNewTransactionModal() {
        setIsNewTransactionModalOpen(true)
    }

    function handleCloseNewTransactionModal() {
        setIsNewTransactionModalOpen(false)
    }

    return (
        <TransactionProvider>
            <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />

            <Dashboard />

            <NewTransactionModal isOpen={isNewTransactionModalOpen} onRequestClose={handleCloseNewTransactionModal} />

            <GlobalStyle />
        </TransactionProvider>
    )
}

export default App
