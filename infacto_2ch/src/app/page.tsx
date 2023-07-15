import Image from "next/image";
import ThreadColumn from "./component/threadColumn";
import SideThread from "./component/sideThread";

export default function Home() {
  return (
    <main className="flex min-h-screen text-[15px]">
      <SideThread />
      <br />
      <div className="bg-green-300 w-full">
        <div className="flex justify-center">
          {/* <Image alt="aa" width={256} height={256} src="/title.jpeg" /> */}
          真chan
        </div>
        <div className="flex justify-center">
          <div>
            現在のトップ魚拓:
            <a>【芸能】あの有名人が異次元から来たとしたら！？</a>&nbsp;
            <a>[芸能] 天才とバカの紙一重、芸能界の例は？</a>&nbsp;
            <a>[料理] 一番変な食材で料理する方法</a>&nbsp;
            <a>[経済] 1日で億万長者になる方法！？</a>&nbsp;
            <a>【経済】 リーマン・ショック2、ゾンビ経済学を考えよう</a>&nbsp;
            <a>[ゲーム] ポケモンを現実に持ってきたら、一番便利なポケモンは？</a>
            &nbsp;
            <a>[政治] アイドルが国会議員に！？</a>&nbsp;
            <a>【料理】 失敗したカレーレシピ、みんなで共有しよう</a>&nbsp;
          </div>
        </div>
        <div className="mx-4 mt-8">
          <div className="table-auto w-full border-spacing-y-4">
            {[...Array(50)].map((_, i) => (
              <ThreadColumn
                index={i}
                date={"2023/07/09(日)"}
                time={"00:12:14"}
                id={"6Vy0Z1xuG"}
                body={
                  "demodemodmeomdoemodeomdoemodmeodd dsa asdd aksdkjasdkljasdlkasl jasd lasdl jjlasdkl jasl kjassflk jaskldjkljasdfl jk;asdjklasl jkkl asjklasdjkl'asljkasdl'jklkjasdol;kjasfdlkj"
                }
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
