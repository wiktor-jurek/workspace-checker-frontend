import { useState } from "react";
import Head from "next/head";
import { useSession, signIn, signOut } from "next-auth/react";

import DomainSearch from "../components/DomainSearch";
import ResultsTable from "../components/ResultsTable";

export default function Home() {
  const [domainsStatus, setDomainsStatus] = useState([]);
  const { data: session } = useSession();
  console.log(session);

  return (
    <div className="h-full min-h-screen flex flex-col justify-between bg-gradient-to-b from-[#F89629] to-[#FEC46F]">
      <Head>
        <title>Are they on Workspace?</title>
        <meta
          name="description"
          content="Checks whether a domain is on workspace."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="   z-10">
        <div className="container mx-auto px-6 text-center z-20 relative">
          <div className="header text-orange-dark py-12 ">
            <div className="text-4xl font-bold pb-14 leading-relaxed">
              Are they on Workspace?
            </div>
            <div className="font-medium text-lg pb-4">
              A simple tool for checking whether an organisation is using Google
              Workspace.
            </div>
            <div className="text-sm font-bold ">(An API is in progress!)</div>
          </div>
          {!session ? (
            <div onClick={() => signIn()} className="pb-4">
              Sign in
            </div>
          ) : (
            <div onClick={() => signOut()} className="pb-4">
              Sign out
            </div>
          )}

          <div className="flex justify-center">
            <DomainSearch
              setDomainsStatus={setDomainsStatus}
              domainsStatus={domainsStatus}
            />
          </div>

          {domainsStatus?.length ? (
            <ResultsTable resultsTable={domainsStatus} />
          ) : (
            <div></div>
          )}
        </div>
      </main>

      <footer className=" max-w-6xl  flex flex-col justify-center align-middle self-center px-2">
        <img className=" z-0" src="/images/bg-image.svg" alt="" />
        <div className="bg-black pb-3 text-white text-sm text-center md:h-20 ">
          This was built for Cobry, by Cobry | &copy; 2023
        </div>
      </footer>
    </div>
  );
}
