import React from 'react'
import { Bitcoin } from 'lucide-react';
import { useState } from 'react';
import { useContext } from 'react';
import { CryptoContext } from '../context/CryptoContext';
import { Search } from 'lucide-react';

export default function Navbar() {

    const [input, setInput] = useState('');
    const [filteredCoins, setFilteredCoins] = useState([]);
    const { cryptoList =  [], setSearchTerm} = useContext(CryptoContext);

    const searchHandler = (e) => {
        e.preventDefault();
       setSearchTerm(input);
       setFilteredCoins([]);
    }

    const inputHandler = (e) => {
        const value = e.target.value;
        setInput(value);

        if (value === '') {
            setSearchTerm("");
            setFilteredCoins([]);
        }
        else {
            const suggestions = cryptoList.filter((coin) =>
                coin.name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredCoins(suggestions.slice(0, 5));
        }
    }

  return (
   <nav className='flex flex-wrap md:flexnowrap items-center justify-between gap-4 px-[5%] md:px[8%] lg:px-[10%] py-5 bg-gray-900/80 backdrop-blur-md border-b border-gray-700/30 sticky top-0 z-50'>
      <a href="/" className='order-1 flex-shrink-0 flex items-centre gap-2 hover:scale-105 transition-transform'>
      <Bitcoin  className='w-8 h-8 text-emerald-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.6)]'/>
      <span className='text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent '>
        CryptoTracker
      </span>
      </a>

      <form onSubmit={searchHandler} className='order-3 w-full md:order-2 md:w-full flex-1 max-w-2xl mx-0 md:mx-4 relative'>
        <div className='relative group'>
          <div className='inset-0.5 bg-gradient-to-r from-emerald-600/60 to-cyan-500/40 rounded-full 
          opacity-30 group-hover:opacity-50 transition duration-300'>

          <div className='relative flex items-center'>
            <input type="text" placeholder='Search Crypto...' value={input} onChange={inputHandler} required
            className='w-full  px-4 py-3 bg-gray-800/60 border-gray-600/80 rounded-full
            focus:outline-none focus:ring-2 focus:ring-emerald-500/80 placeholder-gray-200 text-gray-100
            backdrop-blur-sm'/>
            <button type='submit' className='px-4 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-full text-white
            hover:scale-105 transition-transform overflow-hidden'>
                <Search className='w-full h-full pointer-events-none'/>
            </button>
           </div>
          </div>
          </div>

          {filteredCoins.length > 0 && (
            <ul className='absolute  w-full bg-gray-800/95 border border-gray-700  rounded-lg 
            shadow-xl mt-2 z-10 backdrop-blur-md'>
                    {filteredCoins.map((coin, idx) => (
                        <li key={idx} className='px-4 py-2 hover:bg-emerald-600/30 cursor-pointer text-gray-100'
                            onClick={() => {
                                setInput(coin.name);
                                setFilteredCoins([]);
                            }}>
                            {coin.name}
                        </li>
                    ))}
            </ul>
          )}
      </form>
   </nav>
  )
}

