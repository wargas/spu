import { ServiceSPU } from "@/lib/service-spu";
import Image from "next/image";
import { Fragment } from "react/jsx-runtime";

export default async function Home() {

  const service = ServiceSPU.factory('P059892_2026')

  const data = await service.data()

  return (
    <div>
      <h1>{data.dataTree.processo.numero}</h1>

      <table className="w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Setor</th>
            <th>Nome</th>
          </tr>
        </thead>
        <tbody>
          {data.dataTree.processo.itens.setores.map((setor, i) => (
            <Fragment key={i}>
              {setor.documentos.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.setor}</td>
                  <td>{item.nome}</td>
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
