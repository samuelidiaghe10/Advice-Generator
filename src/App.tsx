import { useState } from "react";
import dice from "../src/advice-generator-app-main/images/icon-dice.svg";
import divider from "../src/advice-generator-app-main/images/pattern-divider-desktop.svg";

interface Advice {
  id: number;
  advice: string;
}

function App() {
  const Base_Url = "https://api.adviceslip.com/advice";
  const [advice, setAdvice] = useState<Advice>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleFetch = async () => {
    setLoading(true);
    try {
      const response = await fetch(Base_Url);
      const data = await response.json();
      setAdvice(data.slip);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center px-5 bg-Dark-Blue min-h-screen">
      <div className="flex items-center justify-center">
        <div className=" h-[15rem] bg-Dark-Grayish-Blue flex flex-col justify-between p-8  items-center lg:w-[30rem] lg:h-[15rem] rounded-lg">
          <h4 className=" text-Neon-Green text-sm font-semibold tracking-widest">
            ADVICE #{advice?.id}
          </h4>
          <div>
            {loading ? (
              <div>
                <div className="loader"></div>
              </div>
            ) : (
              <h2 className=" text-Light-Cyan font-medium text-center text-xl">
                {advice?.advice}
              </h2>
            )}
          </div>

          <div>
            <img src={divider} alt="" />
          </div>
        </div>

        <button
          onClick={() => handleFetch()}
          className="absolute translate-y-10 duration-500 self-end bg-Neon-Green p-4 rounded-full"
        >
          <img className="w-[30px] h-[30px]" src={dice} alt="" />
        </button>
      </div>
    </div>
  );
}

export default App;
