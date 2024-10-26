import Main from "./components/Main";

export default function Home() {
  return (
    <>
    <div className="my-2 font-bold underline">** Data will be reset when you refresh/exit this page **</div>
      <div className="text-6xl text-bold underline">To-Do</div>
      <div className="text-xl font-serif opacity-50 italic">application</div>
      <Main></Main>
    </>
  );
}
