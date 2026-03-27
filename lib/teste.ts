import { ServiceServidor } from "./service-servidor";

const service = ServiceServidor.factory()

// await service.login('157600', 'Deltex@123')
const isLogged = await service.getProcesso('P126911/2026')

console.log(isLogged.processo.movimentacoes)

// await Bun.write('data/processo.json', JSON.stringify(isLogged, null, 4))