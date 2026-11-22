# Meu Legado Masculino

Loja de afiliados de **meulegadomasculino.com.br**: jogos, nostalgia, roupas, relógios e computadores.
Sem estoque, sem checkout e sem banco de dados. Cada produto leva direto para a loja parceira pelo link de afiliado.

**Stack:** Next.js 16 (App Router, páginas estáticas), React 19, Tailwind CSS 4, TypeScript.

## Rodar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção (também valida o catálogo)
npm start
```

## Onde mexer

| O que | Arquivo |
| --- | --- |
| Produtos, categorias, lojas, tags | `src/data/catalog.ts` |
| Domínios permitidos por loja | `stores[].hosts` em `src/data/catalog.ts` |
| Headers de segurança e redirects `/ir/*` | `next.config.ts` |
| Cores e estilos de pixel | `src/app/globals.css` |
| Mascote Léo (pixel art em texto) | `src/components/Mascot.tsx` |
| Ícones de pixel | `src/components/PixelIcon.tsx` |

### Adicionar um produto

1. Copie um objeto em `products` e troque o `slug` (só letras minúsculas, números e hífen).
2. Cole o link de afiliado em `affiliateUrl`. O domínio precisa estar em `hosts` da loja escolhida.
3. Em `image`, use o ID de uma foto do Unsplash (`photo-...`) ou adapte `unsplash()` para outra origem
   (e libere o domínio em `images.remotePatterns` e no `img-src` da CSP).
4. `npm run build`. Se o slug repetir ou o link apontar para um domínio fora da lista, o build falha de propósito.

> Os links atuais são **buscas de exemplo** com um parâmetro de afiliado fictício (`tag=meulegado-20`).
> Troque pelos seus links reais antes de publicar. Preços, notas e avaliações também são de exemplo.

## Segurança

- **Sem open redirect:** `/ir/<slug>` é gerado no build a partir do catálogo. Não existe parâmetro na URL que mude o destino.
- **Lista de domínios:** o build quebra se um link de afiliado sair dos domínios da loja ou não for `https`.
- **Headers:** CSP, HSTS (com preload), `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`, COOP.
- **Imagens:** o otimizador do Next só aceita `images.unsplash.com/photo-*` (outras origens recebem 400).
- **Links de saída:** `rel="sponsored nofollow noopener noreferrer"` e `/ir/` bloqueado no `robots.txt`.
- **Sem dados do usuário:** não há formulário que envie dados, cadastro nem cookies de rastreamento.
- A CSP usa `'unsafe-inline'` em scripts para manter as páginas 100% estáticas (a versão com nonce exige renderização
  por requisição). Como o site não exibe conteúdo enviado por usuários, o risco é baixo. Revise se adicionar comentários
  ou scripts de terceiros (Analytics, pixel do Meta etc.); eles também precisam ser liberados na CSP.

## Publicar

Recomendado: **Vercel** (plano gratuito atende). Importe o repositório, aponte o domínio `meulegadomasculino.com.br`
nas configurações do projeto e ajuste o DNS no Registro.br conforme a Vercel indicar.

## Aparecer no Google

O site já sai pronto para indexação: `sitemap.xml` com todas as páginas e fotos, `robots.txt`, URL canônica em
cada página, dados estruturados (organização, busca do site, trilha de navegação, produto e listas), imagem de
compartilhamento gerada para cada produto e manifesto do app.

Depois de publicar:

1. Entre no [Google Search Console](https://search.google.com/search-console) e adicione a propriedade
   `https://meulegadomasculino.com.br` (opção "Prefixo do URL").
2. Escolha a verificação por **tag HTML**, copie só o código do `content="..."` e salve na Vercel como variável de
   ambiente `GOOGLE_SITE_VERIFICATION`. Faça um novo deploy e clique em "Verificar".
   (Alternativa: verificação por DNS no Registro.br, que cobre o domínio inteiro.)
3. Em **Sitemaps**, envie `sitemap.xml`.
4. Em **Inspeção de URL**, peça a indexação da home e da página `/gta-6` para acelerar.
5. Quando criar as redes sociais da loja, adicione os links em `SITE.sameAs` (`src/lib/format.ts`).

Para conferir os dados estruturados de uma página: [Teste de pesquisa aprimorada](https://search.google.com/test/rich-results).
