export const SANDBOX_PT_BR = {
  sandbox: {
    nav: {
      home: 'Início',
      getStarted: 'Começar',
      installation: 'Instalação',
      usage: 'Como usar',
      components: 'Componentes',
      services: 'Serviços',
      translation: 'Tradução (i18n)',
      notifications: 'Pop-up',
      updates: 'Atualizações',
    },
    pages: {
      shell: {
        search: 'Pesquisar documentação'
      },
      toast: {
        title: 'Notificações',
        subtitle: 'Notificações temporárias para feedback de ações do usuário. Suporta variantes, ações, detalhes expansíveis e posições.',
        resume: 'Use os botões acima para disparar diferentes tipos de toast. Passe o mouse para pausar a barra de duração.',
        description: 'Os métodos seguem o padrão:',
        pattern: 'info/success/warning/error/neutral(message, options).',
        info:'Informação',
        infoMessage: 'Olá mundo!',
        success:'Upload realizado com sucesso',
        successMessage: 'Arquivo enviado com sucesso!',
        successDetails: 'invoice.pdf foi enviado e indexado. Você pode desfazer dentro de 30s.',
      },
      cards: {
        title: 'Cards',
        subtitle: 'Displays em formatos de cards estáticos ou animados para estilização de página.',
        resume: 'Use cards para destacar informações, separar seções e apresentar ações relacionadas.',
        overviewTitle: 'Visão geral',
        usageTitle: 'Uso básico',
        usageDesc: 'Crie cards com header, body e footer opcionais.',
        variantsTitle: 'Variantes',
        variantsDesc: 'O Atlas Card suporta diferentes estilos visuais.',
        a11yTitle: 'Acessibilidade',
        a11yDesc: 'Quando interativo, o card expõe role e tabindex.',
        description: 'Componente de contêiner para agrupar conteúdo.',
        cardContentMessage: 'Conteúdo do card'
      },
      buttons: {
        title: 'Botões',
        subtitle: 'Variações, cores, tamanhos e estados do Atlas Button',
        examplesDesc: 'Exemplos de uso do botão em diferentes composições.',
        apiDesc: 'API e exemplos de uso.',
        hints: {
          loading: 'Dica: loading mantém a largura do botão para evitar “pulos” no layout.',
        },
        actions: {
          toggleTheme: 'Alternar tema',
          toggleLoading: 'Alternar loading',
        },
        examples: {
          textOnly: 'Somente texto',
          textIcon: 'Texto + ícone',
          iconText: 'Ícone + texto',
          iconOnly: 'Somente ícone',
          colors: 'Cores',
          gradient: 'Gradiente',
          sizes: 'Tamanhos',
          states: 'Estados',
          grouped: 'Botões agrupados',
          fullWidth: 'Largura total',
        },
      },
      translation: {
        title: 'Tradução (i18n)',
        subtitle: 'Integração de internacionalização no Atlas UI com Transloco + contribuições por app.',
        installTitle: 'Instalação',
        installDesc: 'Instale o Transloco no workspace (o Atlas usa o runtime do Transloco).',
        setupTitle: 'Configuração',
        setupDesc: 'Configure o provider do Atlas e injete traduções do sandbox via contributions.',
        usageDesc: 'Use o pipe no template e as variantes *Key no TypeScript (toasts, actions, etc.).',
      }
    },
  },
};
