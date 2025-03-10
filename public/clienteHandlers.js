export async function get_all_clientes() {
    try {
        const clientes = await fetch("http://localhost:3000/api/clientes", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const resultado = await clientes.json();
        console.log(resultado);
        return resultado;
    } catch (error) {
        console.log(error);
    }
}

export async function get_cliente(id) {
    try {
        const clientes = await fetch(`http://localhost:3000/api/clientes/single/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const resultado = await clientes.json();
        console.log(resultado);
        return resultado;
    } catch (error) {
        console.log(error);
    }
}

export async function create_cliente(nome, telefone, cpf) {
    try {
        const clientes = await fetch("http://localhost:3000/api/clientes/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, telefone, cpf }),
        });

        const resultado = await clientes.json();
        console.log(resultado);
        return resultado;
    } catch (error) {
        console.log(error);
    }
}


export async function update_cliente(id, nome, telefone, cpf) {
    try {
        const clientes = await fetch("http://localhost:3000/api/clientes/", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, nome, telefone, cpf }),
        });

        const resultado = await clientes.json();
        console.log(resultado);
        return resultado;
    } catch (error) {
        console.log(error);
    }
}
