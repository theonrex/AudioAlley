import React from "react";
import { useState , useEffect} from "react";
import { useAccount, useBalance } from "wagmi";
import "flowbite";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import FTMlogo from "../../public/assets/ftm.png";
const LowBalance = () => {
  const [connected, setConnected] = useState(false);
  const { connector: isConnected } = useAccount();
  useEffect(() => {
    // This code will only run after the server has rendered the page
    setConnected(isConnected);
  }, []);
  const AccountBalance = () => {
    const { address } = useAccount();
    const { data, refetch } = useBalance({
      address,
      watch: true,
    });
    return (
      <div
        className={
          (  isConnected && data?.formatted < 2   ) 
            ? `AccountBalance_active`
            : `AccountBalance`
        }
      >
        <section className=" container-xxl">
          {( isConnected && data?.formatted < 2 )  ? (
            <Marquee gradient={false} style={false}>
              <a
                href="https://faucet.fantom.network/"
                target="_blank"
                rel="noreferrer"
                className="low_ftm"
              >
                {" "}
                Running low on funds? – you can get free FTM testnet to help you
                get started!{" "}
                <Image src={FTMlogo} alt="ftm logo" width={20} height={20} />
              </a>{" "}
              <a
                href="https://faucet.fantom.network/"
                target="_blank"
                rel="noreferrer"
                className="low_ftm"
              >
                {" "}
                Running low on funds? – you can get free FTM testnet to help you
                get started!{" "}
                <Image src={FTMlogo} alt="ftm logo" width={20} height={20} />
              </a>
            </Marquee>
          ) : null}
        </section>
      </div>
    );
  };

  return (
    <>
      <nav className="">
        <AccountBalance />
      </nav>
    </>
  );
};

export default LowBalance;
