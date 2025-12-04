"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AlterarAvatar() {
  return (
    <div className="bg-[#7c3aed] min-h-screen flex flex-col items-center px-6">
      <div className="w-full flex flex-col items-center mt-4 mb-1">
        <h1 className="text-5xl font-extrabold text-white mb-2 text-center">
          Alterar Avatar
        </h1>
        <span className="text-white text-lg text-center">
          Atualize sua informações de perfil.
        </span>
      </div>

      <div className="relative bg-white w-[60rem] h-[37rem] mt-3 rounded-3xl p-10">

        
        <Link
          href="/Telaconfig"
          className="absolute left-6 top-2 text-purple-600 text-4xl font-normal hover:text-purple-800"
        >
          &lt;
        </Link>

        <div className="flex h-40 gap-20">
          <button className="w-40 h-40">
            <Image src="/images/amanda.png" width={150} height={150} />
          </button>
          <button className="w-40 h-40">
            <Image src="/images/andressa.png" width={150} height={150} />
          </button>
          <button className="w-40 h-40">
            <Image src="/images/Ariana.png" width={150} height={150} />
          </button>
          <button className="w-40 h-40">
            <Image src="/images/bruno.png" width={150} height={150} />
          </button>
        </div>

        
        <div className="flex h-40 mt-8 gap-20">
          <button className="w-40 h-40">
            <Image src="/images/marcela.png" width={150} height={150} />
          </button>
          <button className="w-40 h-40">
            <Image src="/images/marquinhos.png" width={150} height={150} />
          </button>
          <button className="w-40 h-40">
            <Image src="/images/phellipe.png" width={150} height={150} />
          </button>
          <button className="w-40 h-40">
            <Image src="/images/vitinho.png" width={150} height={150} />
          </button>
        </div>

        
        <div className="flex h-40 mt-8 gap-20">
          <button className="w-40 h-40 ">
            <Image src="/images/carlos.png" width={150} height={150} />
          </button>
          <button className="w-40 h-40">
            <Image src="/images/lele.png" width={150} height={150} />
          </button>



          <button className="w-30 h-30 ml-2 ">
            <Image src="/images/foto.png" width={190} height={190} />
          </button>



        
          <Button className="ml-4 bg-[#7c3aed] hover:bg-purple-800 px-16 py-5 mt-24 rounded-full text-white font-semibold shadow-none">
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
}
