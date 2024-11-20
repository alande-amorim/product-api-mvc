As funcionalidades deverão ser disponibilizadas através de API RESTful. 

Entidade ```produto```:
```
[S] id: bigint gerenciada pelo sistema.
[S] uuid: string gerenciada pelo sistema. Chave imutável e única através da organização.
[S] created_at: datetime gerenciada pelo sistema. Timestamp ISO-8601 com timezone UTC representando data e hora da criação do produto em BD.
[S] updated_at: datetime gerenciada pelo sistema. Timestamp ISO-8601 com timezone UTC representando data e hora da atualização do produto em BD.
[U] name: string gerenciada por usuário. Representa o nome do produto.
[U] price: float gerenciada por usuário. Representa o preço do produto.
[U] description: string gerenciada por usuário. Representa a descrição do produto.
[U] image: string gerenciada por usuário. Representa a URL da imagem do produto.
[U] sku: string gerenciado por usuário. Representa o código de barras do produto.
```

# Funcionalidades
Deverão ser disponibilizadas seguindo padrão RESTful com combinação de verbos HTTP (GET, POST, PUT, PATCH, DELETE) e padrões de URL.

## Endpoints
- Criação de produto: <br />
  ```POST /api/products```
  ```
  REQUEST
  POST /api/products
  BODY:
  {
    name: 'XYZ',
    price: 10.25,
    description: 'Lorem ipsum dolor sit amet...',
    image: 'https://placehold.co/600x400',
    sku: '7890000000001'
  }
  ```

  ```
  RESPONSE
  201 Created
  {
    id: 3210n,
    uuid: 'ab719192-c99c-4b90-8c69-f21233c40c77',
    name: 'XYZ',
    price: 10.25,
    description: 'Lorem ipsum dolor sit amet...',
    image: 'https://placehold.co/600x400',
    sku: '7890000000001',
    created_at: '2024-11-20T17:13:57Z',
    updated_at: null
  }
  ```

- Listagem de produtos: <br />
  ```GET /api/products```
  ```
  REQUEST
  GET /api/products
  ```

  ```
  RESPONSE
  200 ok
  [
    {
      id: 3210n,
      uuid: 'ab719192-c99c-4b90-8c69-f21233c40c77',
      name: 'XYZ',
      price: 10.25,
      description: 'Lorem ipsum dolor sit amet...',
      image: 'https://placehold.co/600x400',
      sku: '7890000000001',
      created_at: '2024-11-20T17:13:57Z',
      updated_at: null
    },
     {
      id: 3211n,
      uuid: 'd7660558-9aca-478f-bb2e-c1869d26e0dc',
      name: 'ABC',
      price: 101.25,
      description: 'Lorem ipsum dolor sit amet...',
      image: 'https://placehold.co/600x400',
      sku: '7890000000002',
      created_at: '2024-11-20T17:13:58Z',
      updated_at: null
    }
  ]
  ```

- Leitura de produto: <br />
  ```GET /api/products/:uuid```

  ```
  REQUEST
  GET /api/products/ab719192-c99c-4b90-8c69-f21233c40c77
  ```
  ```
  RESPONSE
  200 ok
  {
    id: 3210n,
    uuid: 'ab719192-c99c-4b90-8c69-f21233c40c77',
    name: 'XYZ',
    price: 10.25,
    description: 'Lorem ipsum dolor sit amet...',
    image: 'https://placehold.co/600x400',
    sku: '7890000000001',
    created_at: '2024-11-20T17:13:57Z',
    updated_at: null
  }
  ```

- Edição de produto: Campos não fornecidos deverão ser atualizados. <br />
  ```PUT /api/products/:uuid```

  ```
  REQUEST
  PUT /api/products/ab719192-c99c-4b90-8c69-f21233c40c77
  BODY:
  {
    name: 'XYZ',
    price: 101.25,
    sku: '7890000000001'
  }
  ```
  ```
  RESPONSE
  200 ok
  {
    id: 3210n,
    uuid: 'ab719192-c99c-4b90-8c69-f21233c40c77',
    name: 'XYZ',
    price: 10.25,
    description: null,
    image: null,
    sku: '7890000000001',
    created_at: '2024-11-20T17:13:57Z',
    updated_at: '2024-11-20T17:18:57Z'
  }
  ```

- Edição parcial: Campos não fornecidos deverão ser mantidos. <br />
  ```PATCH /api/products/:uuid```

  ```
  REQUEST
  PATCH /api/products/ab719192-c99c-4b90-8c69-f21233c40c77
  BODY:
  {
    name: 'XYZ',
    price: 101.25,
    sku: '7890000000001'
  }
  ```
  ```
  RESPONSE
  200 ok
  {
    id: 3210n,
    uuid: 'ab719192-c99c-4b90-8c69-f21233c40c77',
    name: 'XYZ',
    price: 10.25,
    description: 'Lorem ipsum dolor sit amet...',
    image: 'https://placehold.co/600x400',
    sku: '7890000000001',
    created_at: '2024-11-20T17:13:57Z',
    updated_at: '2024-11-20T17:23:57Z'
  }
  ```

- Deleção: <br />
  ```DELETE /api/products/:uuid```

  REQUEST
  ```
  DELETE /api/products/ab719192-c99c-4b90-8c69-f21233c40c77
  ```

  RESPONSE:
  ```
  204 ok
  ```

- Contagem: <br />
  ```GET /api/products/count```

  REQUEST
  ```
  GET /api/products/count
  ```

  RESPONSE:
  ```
  200 ok
  { count: 2 }
  ```

- Busca por nome: <br />
  ```GET /api/products/?search=:name```

  REQUEST
  ```
  GET /api/products/?search=a
  ```

  RESPONSE:
  ```
  200 ok
  [
    'ab719192-c99c-4b90-8c69-f21233c40c77',
    'd7660558-9aca-478f-bb2e-c1869d26e0dc'
  ]
  ```

  # Persistência de dados
Dados deverão ser persistidos em memória, utilizando estruturas de dados que permitam acesso imediato, preferencialmente hash table. A utilização de padrão de projeto Repository facilitará uma futura adoção de outro método de persistência de dados.