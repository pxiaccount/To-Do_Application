"use client";
import React, { useState } from "react";
import Image from "next/image";

let ID: number = 0;

interface dataType {
  content: string;
  id: number;
  due: string;
  description: string;
  checked: boolean;
}
const Main = () => {
  const [text, setText] = useState("");
  const [data, setData] = useState<dataType[]>([]);
  const [popup, setPopup] = useState<number | null>(null);
  const [descNum, setDescNum] = useState<number | null>(null);
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const [query, setQuery] = useState("");
  const [check, setCheck] = useState(false);

  const update = () => {
    if (text != "") {
      setData([
        ...data,
        {
          id: ID++,
          content: text,
          due: date,
          description: desc,
          checked: false
        },
      ]);
    }
    setText("");
    setDate("");
    setDesc("");
  };

  const handleCheck = (id: number) => {
    setData(data.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const searchItem = data.filter((keyword) => keyword.content.includes(query));

  const showPopup = (id: number) => {
    setPopup(popup === id ? null : id);
  };

  const showDesc = (id: number) => {
    setDescNum(descNum === id ? null : id);
  };

  const updateDesc = (id: number, descA: string) => {
    setData(data.map((z) => (z.id === id ? { ...z, description: descA } : z)));
  };

  return (
    <>
      <form className="mt-5">
        <label
          htmlFor="todoText"
          className="absolute font-serif italic top-48 opacity-50"
        >
          To-Do
        </label>
        <input
          id="todoText"
          className="mx-2 text-xl mt-10 text-center outline-none theme-dark"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <label
          htmlFor="todoText"
          className="absolute font-serif italic top-48 opacity-50"
        >
          Due Date (optional)
        </label>
        <input
          id="date"
          className="mx-2 w-28 text-xl mt-10 outline-none theme-dark"
          type="text"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </form>
      <button
        type="submit"
        className="mx-5 bg-slate-100 text-slate-900 rounded-lg font-bold w-64 py-3 my-5 hover:bg-slate-300 hover:text-slate-950 outline-none"
        onClick={update}
      >
        Add
      </button>
      <div className="flex p-3 border-2 border-white rounded-3xl mr-52">
        <Image
          src="search.svg"
          alt="search-icon"
          width="30"
          height="30"
          className="inline-block"
        ></Image>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Search"
            className="mx-2 text-xl text-start outline-none theme-dark w-48"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
        </form>
      </div>
      <ul className="text-start align-middle">
        {searchItem.map((x) => (
          <li
            className="flex flex-wrap gap-4 justify-between text-xl py-5 w-96 my-5 rounded-lg text-white pl-5 bg transition-all items-center"
            key={x.id}
          >
            <input
              type="checkbox"
              checked={x.checked}
              onChange={() => handleCheck(x.id)}
              className="w-5 h-5 cursor-pointer self-center"
            />
            <div
              className={`flex-1 hover:text-gray-300 hover:underline cursor-pointer select-none ${x.checked ? 'line-through opacity-50' : ''
                }`}
              onClick={() => showDesc(x.id)}
            >
              {x.content}
            </div>
            <div className="absolute mt-7 font-serif italic opacity-50 ml-56">
              {x.due}
            </div>
            <div className="inline-block">
              <div
                className="p-2 inline-block cursor-pointer select-none"
                onClick={() => showPopup(x.id)}
              >
                <Image
                  src="dots.svg"
                  alt="dots"
                  width={30}
                  height={30}
                  className="mr-5 my-2 cursor-pointer"
                />
              </div>
              {popup === x.id && (
                <div className="absolute z-10 text-white border-2 border-white bg rounded-lg">
                  <button
                    className="hover:bg-red-700 z-20 w-full p-3 rounded-lg"
                    onClick={() => {
                      setData(data.filter((y) => y.id !== x.id));
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
            {descNum === x.id && (
              <div className="flex-1">
                <label
                  htmlFor="description"
                  className="opacity-50 italic font-serif text-sm"
                >
                  Description (optional)
                </label>
                <textarea
                  id="description"
                  className="bg-zinc-800 rounded-lg w-64"
                  value={x.description}
                  onChange={(e) => updateDesc(x.id, e.target.value)}
                ></textarea>
              </div>
            )}
          </li>
        ))}
      </ul>
      <footer>
        Font Credits: <br />
        <a className="underline" href="https://fonts.google.com/specimen/Inter">
          Inter
        </a>
      </footer>
    </>
  );
};

export default Main;
