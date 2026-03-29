'use server'

import { ServiceServidor } from "@/lib/service-servidor"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Card, CardContent } from "./ui/card"
import { GridMovimentacoes } from "./ui/grid-movimentacoes"
import { GridArquivos } from "./ui/grid-arquivos"
import { Item, ItemContent, ItemDescription, ItemTitle } from "./ui/item"

export async function ProcessoDetalhe({ numero }: { numero: string }) {
    const service = ServiceServidor.factory()

    const logged = await service.isLogged()

    if (!logged) {
        await service.login('157600', 'Deltex@123')
    }

    const data = await service.getProcesso(numero.replace('_', '/'))

    return <div>
        <div className="flex">
            <Item>
                <ItemContent>
                    <ItemDescription>Manifestante</ItemDescription>
                    <ItemTitle>{data.processo.manifestante.nome}</ItemTitle>
                </ItemContent>
            </Item>
            <Item>
                <ItemContent>

                    <ItemDescription>Data abertura</ItemDescription>
                    <ItemTitle>{data.processo.dadosGerais.dataAbertura}</ItemTitle>
                </ItemContent>
            </Item>


        </div>
        <Tabs defaultValue="movimentacoes" className="w-full mt-4">
            <TabsList className="w-full">
                <TabsTrigger value="movimentacoes">Movimentações</TabsTrigger>
                <TabsTrigger value="arquivos">Arquivos</TabsTrigger>
                <TabsTrigger value="dados">Dados</TabsTrigger>
            </TabsList>
            <TabsContent value="movimentacoes">
                <Card className="p-0">
                    <CardContent className="p-0 h-96">
                        <GridMovimentacoes processo={data} />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="arquivos">
                <Card className="p-0">
                    <CardContent className="p-0 h-96">
                        <GridArquivos processo={data} />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="dados">
                <Card className="p-0">
                    <CardContent className="p-0 h-96">
                        <Item>
                            <ItemContent>
                                <ItemDescription>Corpo</ItemDescription>
                                <ItemTitle>{data.processo.dadosGerais.observacaoProcesso}</ItemTitle>
                            </ItemContent>
                        </Item>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>

    </div>
}