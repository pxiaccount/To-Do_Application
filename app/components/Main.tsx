'use client'
import React, { useState } from 'react'
import Image from 'next/image'

let ID: any = 0

interface dataType {
  content: String,
  id: any
}
const Main = () => {
    const [text, setText] = useState('')
    const [data, setData] = useState<dataType[]>([])
    const [popup, setPopup] = useState<number | null>(null)

    const update = () => {
        if (text != "") {
          setData(
            [
                ...data,
                {id: ID++, content: text}
            ]
        )
        }
    }

    const showPopup = (id: number) => {
      setPopup(popup === id ? null : id)
    }

  return (
    <>
    <form>
      <input className="text-xl mt-10 text-center outline-none" type="text" value={text} onChange={(e) => setText(e.target.value)}/>
    </form>
      <button className='mx-5 bg-slate-100 text-slate-900 rounded-lg font-bold w-64 py-3 my-5 hover:bg-slate-300 hover:text-slate-950 outline-none' onClick={update}>Add</button>
      <ul className='text-start'>
        {data.map(x => (
          <li className="flex justify-between text-xl py-5 w-96 my-5 rounded-lg text-white pl-5 bg" key={x.id}>
                <div className='my-1'>{x.content}</div>
              <div className='relative inline-block group'>
                <div className='p-2 cursor-pointer select-none' onClick={() => showPopup(x.id)}>
                  <Image src='dots.svg' alt='dots' width={30} height={30} className='mr-5 my-2 cursor-pointer'/>
                  </div>
                  {popup === x.id && (
                  <div className='absolute z-10 text-white border-2 border-white bg rounded-lg'>
                    {/* Working on Reminder button */}
                  {/* <button className="hover:bg-slate-500 z-20 w-full p-3 rounded-lg">
                    Reminder
                  </button> */}
                  <button className="hover:bg-red-700 z-20 w-full p-3 rounded-lg" onClick={() => {setData(data.filter(y => y.id !== x.id))}}>
                    Delete
                  </button>
                  </div>
            )}
            </div>
            </li>
        ))}
      </ul>
    </>
  )
}

export default Main