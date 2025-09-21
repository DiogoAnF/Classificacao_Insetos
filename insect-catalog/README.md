# InsectCatalog - Catálogo de Insetos

Um site responsivo para filtragem de insetos por suas características, desenvolvido com HTML5, CSS3, JavaScript e Bootstrap 5.

## 🚀 Características Principais

- **Interface Responsiva**: Adaptável a desktop, tablets e smartphones
- **Sistema de Filtragem Avançado**: 4 filtros principais (Tipo, Habitat, Tamanho, Cor)
- **Visualizações Múltiplas**: Grade e lista
- **Modal de Detalhes**: Informações completas de cada inseto
- **Animações Suaves**: Transições e efeitos visuais
- **Design Moderno**: Interface limpa e intuitiva

## 📁 Estrutura do Projeto

```
insect-catalog/
├── index.html              # Página principal
├── css/
│   └── style.css           # Estilos personalizados
├── js/
│   └── app.js              # Funcionalidades JavaScript
├── images/                 # Banco de imagens dos insetos
│   ├── butterfly_*.jpg/webp
│   ├── beetle_*.jpg
│   ├── bee_*.jpg
│   └── ant_*.jpg
├── data/
│   ├── filters.json        # Configuração dos filtros
│   └── images.json         # Dados dos insetos
└── README.md              # Documentação
```

## 🔧 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilização avançada com animações
- **JavaScript ES6+**: Funcionalidades interativas
- **Bootstrap 5**: Framework responsivo
- **Bootstrap Icons**: Ícones vetoriais

## 🎯 Funcionalidades

### Sistema de Filtros
- **Tipo de Inseto**: Borboleta, Besouro, Abelha, Formiga, etc.
- **Habitat**: Jardim, Floresta, Aquático, Urbano, Campo, Montanha
- **Tamanho**: Muito Pequeno, Pequeno, Médio, Grande, Muito Grande
- **Cor Predominante**: Vermelho, Azul, Verde, Amarelo, etc.

### Recursos Interativos
- Filtragem em tempo real
- Contador dinâmico de resultados
- Botão "Limpar Filtros"
- Modal com detalhes completos
- Alternância entre visualização em grade e lista
- Animações de carregamento

## 📱 Responsividade

O site é totalmente responsivo e se adapta a diferentes tamanhos de tela:

- **Desktop**: Layout em grade com 3 colunas
- **Tablet**: Layout em grade com 2 colunas
- **Mobile**: Layout em coluna única

## 🚀 Como Usar

### Instalação Local

1. Clone ou baixe o projeto
2. Navegue até o diretório do projeto
3. Inicie um servidor HTTP local:
   ```bash
   python3 -m http.server 8000
   ```
4. Acesse `http://localhost:8000` no navegador

### Navegação

1. **Filtros**: Use os dropdowns para filtrar insetos por características
2. **Visualização**: Alterne entre grade e lista usando os botões no canto superior direito
3. **Detalhes**: Clique em "Ver Detalhes" para informações completas
4. **Limpar**: Use o botão "Limpar Filtros" para resetar todos os filtros

## 🔄 Como Atualizar o Catálogo

### Adicionar Novos Insetos

1. **Adicionar Imagem**: Coloque a nova imagem na pasta `images/`
2. **Atualizar Dados**: Edite o arquivo `data/images.json`:
   ```json
   {
     "id": "novo_inseto",
     "src": "images/novo_inseto.jpg",
     "alt": "Nome do Inseto",
     "type": "Tipo",
     "habitat": "Habitat",
     "size": "Tamanho",
     "color": "Cor"
   }
   ```

### Adicionar Novos Filtros

1. **Editar Configuração**: Modifique o arquivo `data/filters.json`:
   ```json
   {
     "filters": {
       "novo_filtro": {
         "name": "Nome do Filtro",
         "options": ["Todos", "Opção 1", "Opção 2"]
       }
     }
   }
   ```

2. **Atualizar JavaScript**: Adicione a lógica no arquivo `js/app.js` na função `matchesFilter()`

### Personalizar Cores e Estilos

Edite as variáveis CSS no arquivo `css/style.css`:

```css
:root {
    --primary-color: #2c5530;
    --secondary-color: #4a7c59;
    --accent-color: #ffc107;
    /* ... outras variáveis */
}
```

## 🎨 Customização

### Cores das Badges
- **Tipo**: Verde escuro (`--primary-color`)
- **Habitat**: Verde (`--success-color`)
- **Tamanho**: Azul (`--info-color`)
- **Cor**: Amarelo (`--warning-color`)

### Animações
- Fade-in para cards
- Hover effects nos botões
- Transições suaves nos filtros
- Loading spinner durante filtragem

## 📊 Dados Incluídos

O catálogo inclui 12 espécies de insetos:

- **3 Borboletas**: Colorida, Jardim, Flor
- **3 Besouros**: Colorido, Floresta, Grande
- **3 Abelhas**: Flor, Polinizando, Jardim
- **3 Formigas**: Jardim, Trabalhando, Pequena

## 🔍 SEO e Acessibilidade

- Tags semânticas HTML5
- Alt text em todas as imagens
- Navegação por teclado
- Contraste adequado de cores
- Meta tags otimizadas

## 📈 Performance

- Lazy loading de imagens
- CSS e JS minificados via CDN
- Animações otimizadas
- Debounce em eventos de resize

## 🐛 Solução de Problemas

### Imagens não carregam
- Verifique se as imagens estão na pasta `images/`
- Confirme os caminhos no arquivo `images.json`

### Filtros não funcionam
- Verifique se o servidor HTTP está rodando
- Confirme se os arquivos JSON estão acessíveis

### Layout quebrado
- Verifique se o Bootstrap está carregando corretamente
- Confirme se o CSS personalizado está sendo aplicado

## 📄 Licença

Este projeto é de código aberto e pode ser usado livremente para fins educacionais e comerciais.

## 👥 Contribuição

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Abra um Pull Request

## 📞 Suporte

Para dúvidas ou suporte, entre em contato através do email: contato@insectcatalog.com

---

**InsectCatalog** - Explore o fascinante mundo dos insetos! 🐛

