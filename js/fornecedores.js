const ref = db.ref("fornecedores");

$("#salvar").click(function () {
    let nome = $("#nome").val();
    let cnpj = $("#cnpj").val();
    let email = $("#email").val();
    let estado = $("input[name='estado']:checked").val();

    if (nome === "" || cnpj === "" || email === "" || !estado) {
        alert('Preencha todos os campos');
        return;
    }

    ref.push({ nome, email, cnpj, estado });

    limpar();
});

ref.on("value", dados_tabela => {
    $("#lista").empty();

    $("#lista").append(`
        <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>cnpj</th>
            <th>e-mail</th>
            <th>estado</th>
            <th colspan="2">Opções</th>
        </tr>
        `);

    dados_tabela.forEach(registro => {
        let reg = registro.val();
        let id = registro.key;

        $("#lista").append(`
            <tr>
                <td>${id}</td>
                <td>${reg.nome}</td>
                <td>${reg.cnpj}</td>
                <td>${reg.email}</td>
                <td>${reg.estado}</td>
                <td>
                    <button class="btn btn-outline-danger btn-sm">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
                <td>
                    <button class="btn btn-outline-warning btn-sm">
                        <i class="bi bi-pencil"></i>
                    </button>
                </td>
            </tr>
            `);
    });
});

function limpar() {
    $("#nome").val("");
    $("#cnpj").val("");
    $("#email").val("");
    $("input[name='estado']").prop("checked", false);
    $("#cnpj").val();
    $("#nome").focus();
    
};