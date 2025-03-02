const section = document.querySelectorAll("li[panel]");
import { loadOS, loadCliente, loadVeiculo } from './loaders.js'

const panels = {
    os: {
        name: "ordens de serviço",
        function: loadOS,
    },
    cliente: {
        name: "clientes",
        function: loadCliente,
    },
    estoque: {
        name: "estoque",
        function: loadVeiculo,
    },
};
