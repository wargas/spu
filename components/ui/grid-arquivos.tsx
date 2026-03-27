'use client'
import { ProcessoServidor } from "@/lib/service-servidor";
import { Grid } from "../grid";
import { CellDoubleClickedEvent, ColDef } from "ag-grid-community";
import { formatDate } from "date-fns";


export function GridArquivos({ processo }: { processo: ProcessoServidor }) {



    function handleClick(event: CellDoubleClickedEvent<ProcessoServidor['processo']['arquivos']['0'], any, any>): void {
        const id = event.data?.url.replace(/\D/g, "")
        const numero = processo.processo.dadosGerais.numero.replace('/', '_')

        window.open(`api/download?id=${id}&processo=${numero}`)
    }

    const columns = [
        {
            headerName: 'data',
            valueGetter: p => {
                const date = new Date(processo.processo.movimentacoes.find(m => m.id == p.data.movimentacao)?.data || '')
               return formatDate(date, 'dd/MM/yyyy hh:mm')
            }
        },
        {
            headerName: 'origem',
            valueGetter: p => processo.processo.movimentacoes.find(m => m.id == p.data.movimentacao)?.lotacao_origem
        },
        {
            field: 'nome',
            flex: 1
        },


    ] satisfies ColDef[]

    return <Grid rowData={processo.processo.arquivos}
        onCellDoubleClicked={handleClick} columnDefs={columns} />
}