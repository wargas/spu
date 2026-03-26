import { ServiceSPU } from "@/lib/service-spu";
import { Table, TableBody, TableCell, TableHead, TableRow, TableHeader } from '@/components/ui/table'
import { Fragment } from "react/jsx-runtime";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";

export default async function Home({ searchParams }: {searchParams: Promise<any>}) {

  const service = ServiceSPU.factory('P059892_2026')

  const data = await service.data()

  return (
    <div className="p-4">
      <form action="" className="flex gap-4">
        <Field>
          <FieldLabel>Numero</FieldLabel>
          <Input />
        </Field>
         <Field>
          <FieldLabel>Ano</FieldLabel>
          <Input />
        </Field>
      </form>

      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Setor</TableHead>
            <TableHead>Nome</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.dataTree.processo.itens.setores.map((setor, i) => (
            <Fragment key={i}>
              {setor.documentos.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.setor}</TableCell>
                  <TableCell>{item.nome}</TableCell>
                </TableRow>
              ))}
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
