import { IonAvatar, IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonSearchbar, IonSelect, IonSelectOption, IonSkeletonText, IonText, IonTitle, IonToast, IonToolbar, useIonRouter } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import BackHeader from '../../components/BackHeader';
import { useQuery } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { BankSelectAtom } from '../../atoms/bankAtoms';
import Settings from '../../helpers/settings';
import { _get } from '../../helpers/api';



const { serverBaseUrl } = Settings()



interface BankObject {
    id: string
    code: string
    name: string
}

type FetchBankResponse = {
    status: string
    message: string
    data: BankObject[]
}



const SelectNairaBanks: React.FC = () => {
    const setSelectBank = useSetRecoilState(BankSelectAtom)

    const router = useIonRouter()

    const [searchText, setSearchText] = useState('')


    const { data: banks, isError, isLoading } = useQuery({
        queryKey: ['select_bank', searchText],
        queryFn: () => fetchBanks(searchText)
    })



    async function fetchBanks(params: string) {
        const url = `${serverBaseUrl}/flw/get_banks`

        try {
            let { data: responseData } = await _get(url)
            let fetchBankList: FetchBankResponse = responseData;

            if (fetchBankList?.status !== 'success') {
                throw new Error('Error fetching banks')
            }

            if (params !== '') {
                const filteredBankList = await filterBankLists(fetchBankList, params)
                return filteredBankList
            }
            return fetchBankList.data
        }
        catch (error: any) {
            throw new Error('Error fetching banks')
        }
    }


    async function filterBankLists(bankList: FetchBankResponse, params: string) {

        const filteredBanks = bankList?.data.filter(value => {
            const lowerCaseBankNames = value.name.toLowerCase()
            return lowerCaseBankNames.includes(params.toLocaleLowerCase())
        })
        return filteredBanks
    }


    return (
        <IonPage>
            <IonHeader className='ion-no-border'>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonBackButton defaultHref='/add_bank' mode='ios'></IonBackButton>
                    </IonButtons>
                    <IonTitle>Select Bank</IonTitle>
                </IonToolbar>
                <IonToolbar>
                    <IonSearchbar mode='ios' showClearButton='focus' onKeyUp={(e) => setSearchText(e.currentTarget?.value as string)} />
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <IonToast isOpen={isError} position='top' color={'danger'} message={'error loading banks'} duration={4000} />
                {
                    isLoading ?
                        <>
                            {
                                [...new Array(4).keys()].map((index) => (
                                    <IonItem lines='none' key={index}>
                                        <IonLabel className='ml-2'>
                                            <IonSkeletonText animated />
                                            <p><IonSkeletonText style={{ width: '10%' }} animated /></p>
                                        </IonLabel>
                                    </IonItem>
                                ))

                            }
                        </> : (
                            <IonList className='ion-margin-top'>
                                {
                                    banks?.map((bank, index) => (
                                        <IonItem key={index} onClick={() => {
                                            console.log({ id: bank.id, name: bank.name })
                                            setSelectBank({ id: bank.id, name: bank.name })
                                            router.push('/add_bank')
                                        }}>
                                            <IonLabel>
                                                {bank?.name}
                                                <p className='text-muted'>code: {bank?.id}</p>
                                            </IonLabel>
                                        </IonItem>
                                    ))
                                }
                            </IonList>
                        )
                }
            </IonContent>
        </IonPage>
    );
};

export default SelectNairaBanks;