'use server'
import { Processo, ServiceSPU } from "@/lib/service-spu";
import { Table, TableBody, TableCell, TableHead, TableRow, TableHeader } from '@/components/ui/table'
import { Fragment } from "react/jsx-runtime";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { FileTextIcon } from "lucide-react";
import Link from "next/link";
import { ServiceServidor } from "@/lib/service-servidor";
import { ProcessoDetalhe } from "@/components/processo-detalhe";

export default async function Home({ searchParams }: { searchParams: Promise<any> }) {

  const processo = (await searchParams).processo

  // const service = ServiceServidor.factory() 

  // let data: Processo | null = null;
  // if (processo) {

  //   const service = ServiceSPU.factory(processo)

  //   data = await service.data();

    

  //   data.dataTree.processo.itens.setores.unshift({
  //     documentos: [
  //       {
  //         id: 'CAPA',
  //         setor: '',
  //         nome: 'CAPA'
  //       },
  //       {
  //         id: 'RESUMO',
  //         setor: '',
  //         nome: 'RESUMO'
  //       }
  //     ],
  //     setor: 'INFORMAÇÕES'
  //   })
  // }

  async function handleBusca(data: FormData) {
    'use server'

    const processo = data.get('processo')?.toString()
      .replace(/\D/g, "").padStart(10, '0')
      .replace(/^(\d{6})(\d{4})$/, "P$1_$2")

    redirect(`?processo=${processo}`)
  }

  return (
    <div className="p-4">
      <form action={handleBusca} className="flex gap-4 justify-end">
        <Input defaultValue={processo?.replace('_', '/')} name="processo" className="max-w-60" placeholder="P999999/2026" />
        <Button type="submit">Buscar</Button>
      </form>

      {processo && (
        <ProcessoDetalhe numero={processo} />
      )}

    </div>
  );
}
