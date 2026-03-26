import { Got } from "got";
import { Client } from "./client";
import { parseHTML } from "linkedom";

export class ServiceSPU {

    client!: Got;
    processo!: string;

    static factory(processo: string) {
        const instance = new ServiceSPU();
        instance.client = Client.factory(`${processo}`)

        instance.processo = processo;

        return instance;
    }

    async data() {
        const request = await this.client.get(`https://spuevolucao.fortaleza.ce.gov.br/api/spu/processos/${this.processo}/materializar.pdf`)

        const document = parseHTML(request.body).document;

        const dataJSON: any = document.querySelector('[data-react-class=FolderProcessoSo]')?.getAttribute('data-react-props')!

        return JSON.parse(dataJSON) as Processo;
    }
}

export type Processo = {
  dataTree: {
    processo: {
      numeroAno: string
      numero: string
      itens: {
        capa: {
          id: string
          nome: string
        }
        setores: Array<{
          setor: string
          documentos: Array<{
            id: number
            setor: string
            nome: string
          }>
        }>
        resumo: {
          id: string
          nome: string
        }
      }
    }
  }
}