'use server'

import { ServiceServidor } from "@/lib/service-servidor"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Button } from "./ui/button"
import { FileTextIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Card, CardContent } from "./ui/card"
import { Grid } from "./grid"
import { GridMovimentacoes } from "./ui/grid-movimentacoes"
import { GridArquivos } from "./ui/grid-arquivos"

export async function ProcessoDetalhe({ numero }: { numero: string }) {
    const service = ServiceServidor.factory()
    
    const logged = await service.isLogged()

    if(!logged) {
        await service.login('157600', 'Deltex@123')
    }

    const data = await service.getProcesso(numero.replace('_', '/'))

    return <div>
        <Tabs defaultValue="movimentacoes" className="w-full mt-4">
            <TabsList className="w-full">
                <TabsTrigger value="movimentacoes">Movimentações</TabsTrigger>
                <TabsTrigger value="arquivos">Arquivos</TabsTrigger>
            </TabsList>
            <TabsContent value="movimentacoes">
                <Card>
                    <CardContent className="p-0 h-96">
                        <GridMovimentacoes processo={data} />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="arquivos">
                <Card>
                    <CardContent className="p-0 h-96">
                       <GridArquivos processo={data} />
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>

    </div>
}