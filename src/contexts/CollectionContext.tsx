import React, { createContext } from 'react'


export type CollectionType = {

}


export const CollectionContext = createContext<CollectionType | null>(null)


function CollectionProvider({ children }: { children: any }) {
    return (
        <CollectionContext.Provider value={{ 

        }}>
            { children }
        </CollectionContext.Provider>
    )
}

export default CollectionProvider