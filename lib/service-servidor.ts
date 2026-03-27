import { Got } from "got";
import { Client } from "./client";
import { parseHTML } from "linkedom";

export class ServiceServidor {
    client!: Got;
    html = ''

    get document() {
        return parseHTML(this.html).document;

    }

    static factory() {
        const instance = new ServiceServidor();
        instance.client = Client.factory('servidor')

        return instance;
    }

    async isLogged() {
        const { body, headers } = await this.client.get(`https://ssp.sepog.fortaleza.ce.gov.br/sistema`);

        await Bun.write('html/sistema1.html', body)
        this.html = body;
        const dados = this.document.querySelector('#dados-info dd')

        return dados?.textContent.trim() ?? null

    }

    async login(matricula: string, senha: string) {
        const { body } = await this.client.get(`https://ssp.sepog.fortaleza.ce.gov.br/sistema/login`);

        this.html = body;

        const formData: Record<string, string> = {}

        Array.from(this.document.querySelectorAll<HTMLInputElement>('#form-login input')).forEach(input => {
            formData[input.name] = input.value
        });

        formData['usuario[matricula_cpf]'] = matricula;
        formData['usuario[password]'] = senha;
        formData['usuario[remember]'] = '1';

        const checar = await this.client.post(`https://ssp.sepog.fortaleza.ce.gov.br/sistema/checar`, {
            followRedirect: false,
            form: formData
        });

        await Bun.write('html/login.html', checar.body)
    }

    async getProcesso(numero: string) {
        const csrf = await this.client.get(`https://ssp.sepog.fortaleza.ce.gov.br/sistema/processos`)
        this.html = csrf.body;

        const token = this.document.querySelector('[name=csrf-token]')?.getAttribute('content') ?? '';
        
        const find = await this.client.post(`https://ssp.sepog.fortaleza.ce.gov.br/sistema/processos/find`, {
            json: {
                numero
            },
            headers: {
                "x-csrf-token": token
            },

        })

        return JSON.parse(find.body) as ProcessoServidor;
    }
}


export type ProcessoServidor = {
  processo: {
    dadosGerais: {
      numero: string
      processo_travado: boolean
      localAtual: string
      localAtualId: number
      caixaAtual: string
      status: string
      proprietario: string
      tipo: string
      assunto: string
      dataAbertura: string
      path_alfresco: string
      caso_alfresco: number
      observacaoProcesso: string
      prioridade: string
      dataPrazo: string
      corpo: string
      virtual: boolean
    }
    manifestante: {
      tipo: string
      cpf_cnpj: string
      nome: string
      sexo: string
      localidade: string
      endereco: string
    }
    arquivos: Array<{
      nome: string
      noderef: string
      noderef_old: any
      parent: any
      movimentacao: number
      publicar: boolean
      publicado: boolean
      despacho: string
      cancelado: boolean
      tipo: string
      url: string
      grupo_publicacao: Array<any>
      versions: Array<any>
    }>
    assineja: {
      publicacao: Array<any>
      historico: Array<any>
    }
    movimentacoes: Array<{
      id: number
      procedimento: string
      responsavel: string
      data: string
      mensagem: string
      caixa: string
      status: string
      lotacao_origem_id: number
      lotacao_destino_id: number
      lotacao_origem: string
      lotacao_destino: string
    }>
  }
}
