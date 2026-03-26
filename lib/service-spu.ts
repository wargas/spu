import { Got } from "got";
import { Client } from "./client";
import { parseHTML } from "linkedom";
import { pipeline } from "stream/promises";
import { createWriteStream } from "fs";

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

  async download(id: string) {
    const url = `https://spumaterializar.sepog.fortaleza.ce.gov.br/processos/${this.processo}/documento_so/${id}/pdf`
    
    console.log(url)
    const request = this.client
      .stream(url)
    
    return request;
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
            id: number|string
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