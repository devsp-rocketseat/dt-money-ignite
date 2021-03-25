import { FormEvent, useContext, useState } from 'react'
import Modal from 'react-modal'
import { TransactionContext } from '../../TransactionsContext'

import { Container, TransactionTypeContainer, RadioButton } from './styles'

import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'

Modal.setAppElement('#root')

interface NewTransactionModalProps {
    isOpen: boolean
    onRequestClose: () => void
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
    const { createTransaction } = useContext(TransactionContext)

    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState(0)
    const [type, setType] = useState('deposit')
    const [category, setCategory] = useState('')

    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault()

        await createTransaction({
            title,
            amount,
            type,
            category
        })

        onRequestClose()
        setTitle('')
        setAmount(0)
        setType('deposit')
        setCategory('')
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button onClick={onRequestClose} className="react-modal-close">
                <img src={closeImg} alt="Fechar Modal" />
            </button>

            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar transação</h2>

                <input placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} />

                <input placeholder="Valor" type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} />

                <TransactionTypeContainer>
                    <RadioButton type="button" onClick={() => setType('deposit')} isActive={type === 'deposit'} activeColor='green'>
                        <img src={incomeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioButton>

                    <RadioButton type="button" onClick={() => setType('withdraw')} isActive={type === 'withdraw'} activeColor='red'>
                        <img src={outcomeImg} alt="Saída" />
                        <span>Saída</span>
                    </RadioButton>
                </TransactionTypeContainer>

                <input placeholder="Categoria" value={category} onChange={e => setCategory(e.target.value)} />

                <button type="submit">Cadastrar</button>
            </Container>
        </Modal>
    )
}
