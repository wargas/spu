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

export default async function Home({ searchParams }: { searchParams: Promise<any> }) {

  const processo = (await searchParams).processo

  let data: Processo | null = null;
  if (processo) {

    const service = ServiceSPU.factory(processo)

    data = await service.data();

    

    data.dataTree.processo.itens.setores.unshift({
      documentos: [
        {
          id: 'CAPA',
          setor: '',
          nome: 'CAPA'
        },
        {
          id: 'RESUMO',
          setor: '',
          nome: 'RESUMO'
        }
      ],
      setor: 'INFORMAÇÕES'
    })
  }

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

      {data && (
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Setor</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.dataTree.processo.itens.setores.map((setor, i) => (
              <Fragment key={i}>
                {setor.documentos.map(item => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.setor}</TableCell>
                    <TableCell>{item.nome}</TableCell>
                    <TableCell>
                      <div className="flex justify-end">

                        <Button size={'icon-sm'} variant={'ghost'} asChild>
                          <a target="_blank" href={`/api/download?id=${item.id}&processo=${processo}`}>
                            <FileTextIcon />
                          </a>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </Fragment>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
