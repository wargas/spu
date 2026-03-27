'use client'
import { ProcessoServidor } from "@/lib/service-servidor";
import { Grid } from "../grid";
import { formatDate } from "date-fns";

export function GridMovimentacoes({ processo }: { processo: ProcessoServidor }) {
    return <Grid rowData={processo.processo.movimentacoes} columnDefs={[
        {
            field: 'id',
            width: 100
        },
        {
            field: 'data',
            valueGetter: ({data}) => formatDate(new Date(data.data), 'dd/MM/yyyy HH:mm')
        },
        {
            field: 'procedimento',
            flex: 1
        },
        {
            field: 'responsavel'
        },
        {
            field: 'lotacao_origem'
        },
        {
            field: 'lotacao_destino'
        }

    ]} />
}