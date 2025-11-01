import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function App() {
  const [page, setPage] = useState<"home" | "page">("home");

  return (
    <>
      {page === "home" && <Home />}
      {page === "page" && <Page />}
    </>
  );
}

type SearchResult = {
  title: string;
  image: string;
  id?: number;
};

const lists = [4, 12, 16, 17, 11, 3, 19, 15, 6, 2, 9, 10, 25, 18];
// 5, 20, 24, 14, 21, 22, 13, 23,

const findDemonById = (id: number) => {
  return demonsList.find((demon) => demon.id === id);
};

const demonsList: SearchResult[] = [
  { id: 1, title: "[]", image: "Creepy.jpg" },
  { id: 2, title: "いつでもお腹が空いています", image: "Creepy2.jpg" },
  { id: 3, title: "あなたの妻はデモンです", image: "Creepy3.jpg" },
  { id: 4, title: "不眠症", image: "Creepy4.jpg" },
  { id: 5, title: "６枚目の扉", image: "IMG_2051.JPG" },
  { id: 6, title: "南南西から来た男", image: "IMG_2052.JPG" },
  // { id: 8, title: "[写真] デモンの食卓", image: "IMG_3318.JPG" },
  { id: 9, title: "気をつけてください", image: "IMG_3349.JPG" },
  {
    id: 10,
    title: "猫を見つけたら、目を閉じて、ゆっくり",
    image: "IMG_4984.JPG",
  },
  { id: 11, title: "タタール人の植物のヒツジ", image: "IMG_5230.JPG" },
  { id: 12, title: "中学生の娘", image: "IMG_5724.JPG" },
  { id: 13, title: "三十七人目の悔悟者", image: "nigaoe.png" },
  { id: 14, title: "肉体", image: "nikutai.png" },
  {
    id: 15,
    title:
      "その日私は、そこに立っていた。その時のことは、誰も覚えていないが、私はたしかにここで声をあげていた",
    image: "station.png",
  },
  { id: 16, title: "諦めた時、虫の記憶", image: "IMG_6307.jpg" },
  { id: 17, title: "番犬", image: "IMG_6798.jpg" },
  { id: 18, title: "死刑台", image: "IMG_6810.jpg" },
  { id: 19, title: "清涼飲料水", image: "IMG_6838.jpg" },
  { id: 20, title: "七日後の空", image: "IMG_7262.jpg" },
  { id: 21, title: "溶かして、体の、外殻", image: "IMG_7287.jpg" },
  { id: 22, title: "ワールドヒーロー", image: "IMG_8027.jpg" },
  { id: 23, title: "献花台", image: "IMG_8207.jpg" },
  { id: 24, title: "スメラノミコが潜む闇", image: "IMG_8552.jpg" },
  { id: 25, title: "孤独", image: "IMG_8874.jpg" },
];

const Home = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchResult[]>([]);
  const [debug, setDebug] = useState(false);
  // const [creepyCounter, setCreepyCounter] = useState(0);
  const ref = useRef<number>(0);

  useEffect(() => {
    if (window.location.search.includes("debug")) {
      setSearchResult(demonsList);
      setDebug(true);
    }
  }, []);

  const addCreepyCounter = useCallback(async (counter: number) => {
    // setCreepyCounter(counter);
    ref.current = counter;

    const id = lists.filter((id) => id !== 1)[counter];
    if (counter > 50) {
      console.log("creepy counter end");

      await sleep(100);
      ref.current++;
      addCreepyCounter(ref.current);
      return;
    }

    if (!id) {
      console.log("demon end");
      const demon = findDemonById(1);
      setSearchResult((prev) => [...prev, demon!]);
      setLoading(true);
      await sleep(300);
      setLoading(false);
      ref.current++;
      addCreepyCounter(counter + 1);
      return;
    }

    setLoading(true);
    await sleep(300);
    setLoading(false);

    const demon = findDemonById(id);
    setSearchResult((prev) => [...prev, demon!]);

    // recursive call
    // addCreepyCounter(counter + 1);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "z") {
        console.log("z");
        // setCreepyCounter(creepyCounter + 1);
        ref.current++;
        addCreepyCounter(ref.current);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [addCreepyCounter]);

  const handleSearch = async () => {
    if (search.length === 0) return;
    if (search === "creepy" || search === "a") {
      setLoading(true);
      await sleep(1500);
      setLoading(false);

      // setSearchResult([{ title: "Creepy Photo", image: "Creepy.jpg" }]);
      // kick
      addCreepyCounter(0);
    }
  };

  return (
    <div
      className="container"
      style={{ paddingBottom: "500px", marginBottom: "500px" }}
    >
      <h1>Demon</h1>

      <div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ height: "40px", fontSize: "20px", textAlign: "center" }}
        />
        <br />
        <button
          style={{ marginTop: "30px", fontWeight: "bold" }}
          onClick={handleSearch}
        >
          検索
        </button>
      </div>

      <div>
        <div style={{ marginTop: "15px" }}>
          {searchResult.map((result, i) => (
            <div
              key={i}
              style={{
                maxWidth: "400px",
                marginTop: "30px",
                textAlign: "left",
              }}
            >
              <center>
                <img
                  style={{ width: "100%", height: "100%" }}
                  src={result.image}
                  alt={result.title}
                />
              </center>
              <div style={{ marginTop: "1px" }}>{result.title}</div>
              {debug && <div style={{ marginTop: "1px" }}>{result.id}</div>}
            </div>
          ))}
        </div>
        {loading && (
          <div style={{ marginTop: "15px" }}>
            <div className="loader"></div>
          </div>
        )}
      </div>
    </div>
  );
};

const Page = () => {
  return <div>Page</div>;
};

export default App;
