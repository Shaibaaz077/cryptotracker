import { createContext, useEffect, useState } from 'react';

export const CryptoContext = createContext();

const CryptoContextProvider = (props) => {
   const [cryptoList, setCryptolist] = useState([]);
   const [filteredcryptos, setFilteredcryptos] = useState([]);
   const [searchTerm, setSearchTerm] = useState("");
   const [currentCurrency, setCurrentCurrency] = useState({
    name: "USD",
    symbol: "$",
    
   });

//    API- CG-Pc3Y4fjgYt8ZUhbYqjLZGQot
       const fetchCryptoData = async () => {
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-Pc3Y4fjgYt8ZUhbYqjLZGQot'}
          };

          try{
            const res = await fetch(
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currentCurrency.name}`,
                options
            );
            const data = await res.json();
            setCryptolist(data);
          }catch(err){
            console.error("Error fetching crypto data:", err);
          }
        }

        //   RE FEATCH WHEN CURRENCY CHANGES
        useEffect(() => {
            fetchCryptoData();
        }, [currentCurrency]);

       //  REFILTER WHEN RAW LIST OR SEARCH TERM CHANGES
          useEffect(() => {
            if (searchTerm.trim() === ""){
                setFilteredcryptos(cryptoList);
            }
            else{
                setFilteredcryptos(
                    cryptoList.filter((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
                )
            }
        }, [cryptoList, searchTerm]);



    const contextValue = {
        cryptoList,
        filteredcryptos,
        currentCurrency,
        setCurrentCurrency,
        searchTerm,
        setSearchTerm,
    }

    return(
        <CryptoContext.Provider value={contextValue}>
            {props.children}
        </CryptoContext.Provider>

    )
}

export default CryptoContextProvider;

