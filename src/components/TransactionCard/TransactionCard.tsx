import { IonCard, IonLabel, IonIcon } from '@ionic/react'
import { arrowDown, arrowUp } from 'ionicons/icons'
import React, { useEffect, useState } from 'react'
import SpaceBetween from '../style/SpaceBetween'
import { getHumanReadableDate } from '../../helpers/utils'
import { EarningModalType, TransactionItem, WithdrawModalType } from '../../@types/transactions'





interface TransactionCardProps {
    isEarning: boolean
    isWithdraw: boolean
    amount: number
    timestamp: string
    transactionObject: TransactionItem
    setEarningOpenModal: React.Dispatch<React.SetStateAction<EarningModalType>>
    setWithdrawOpenModal: React.Dispatch<React.SetStateAction<WithdrawModalType>>
}


const TransactionCard: React.FC<TransactionCardProps> = ({ isEarning, isWithdraw, amount, timestamp, setEarningOpenModal, setWithdrawOpenModal, transactionObject: transaction  }) => {
    //TODO: show currency symbol based on users preference from registration.

    const [timeStampString, setTimeStampString] = useState('')

    // Set human readable timestamp for transaction card
    useEffect(() => {
        const dateTime = new Date(timestamp)
        const { day, monthAbbreviation } = getHumanReadableDate(dateTime)
        const _ = `${dateTime.getHours()}:${dateTime.getMinutes()} ${day} ${monthAbbreviation}`
        setTimeStampString(_)
    }, [])



    if (isEarning) {
        return (
            <IonCard
                className="rounded-4 p-3 my-3"
                style={{ backgroundColor: "var(--primary)" }}
                onClick={() => setEarningOpenModal({
                    location: transaction?.expand?.apartment?.state_location!,
                    imageUrl: '',
                    is_enabled: true,
                    numberOfGuests: transaction?.expand?.booking?.number_of_guests!,
                    amount,
                    rating: 0,
                    title: transaction.expand?.apartment?.title!,
                    apartmentPrice: transaction?.expand?.apartment?.price!
                })}
            >
                <SpaceBetween className='mt-2'>
                    {
                        isWithdraw && (
                            <>
                                <div>
                                    <small className="text-muted">You withdrew <big className='fw-bold'>₦{amount}</big></small>
                                </div>
                                <div>
                                    <small className="text-warning">{timeStampString} <IonIcon icon={arrowDown} color={"danger"} /> </small>
                                    {/* <small className="text-warning">21:00 24 March <IonIcon icon={arrowUp} color={"success"} /> </small> */}
                                </div>
                            </>
                        )
                    }
                    {
                        isEarning && (
                            <>
                                <div>
                                    <small className="text-muted">You earned <big className='fw-bold'>₦{amount}</big></small>
                                </div>
                                <div>
                                    <small className="text-warning">{timeStampString} <IonIcon icon={arrowUp} color={"success"} /> </small>
                                </div>
                            </>
                        )
                    }
                </SpaceBetween>
            </IonCard>
        )
    }


    return (
        <IonCard
            className="rounded-4 p-3 my-3"
            style={{ backgroundColor: "var(--primary)" }}
            onClick={() => setWithdrawOpenModal({
                is_enabled: true,
                amountWithdrew: 0,
                bank: {
                    account_name: '',
                    account_number: '',
                    bank_name: '',
                    bvn: ''
                },
                amount: 0
            })}
        >
            <SpaceBetween className='mt-2'>
                {
                    isWithdraw && (
                        <>
                            <div>
                                <small className="text-muted">You withdrew <big className='fw-bold'>₦{amount}</big></small>
                            </div>
                            <div>
                                <small className="text-warning">{timeStampString} <IonIcon icon={arrowDown} color={"danger"} /> </small>
                                {/* <small className="text-warning">21:00 24 March <IonIcon icon={arrowUp} color={"success"} /> </small> */}
                            </div>
                        </>
                    )
                }
                {
                    isEarning && (
                        <>
                            <div>
                                <small className="text-muted">You earned <big className='fw-bold'>₦{amount}</big></small>
                            </div>
                            <div>
                                <small className="text-warning">{timeStampString} <IonIcon icon={arrowUp} color={"success"} /> </small>
                            </div>
                        </>
                    )
                }
            </SpaceBetween>
        </IonCard>
    )
}

export default TransactionCard