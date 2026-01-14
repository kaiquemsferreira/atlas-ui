export const SANDBOX_PT_BR = {
  sandbox: {
    nav: {
      home: 'Início',
      getStarted: 'Começar',
      installation: 'Instalação',
      usage: 'Uso',
      components: 'Componentes',
      services: 'Serviços',
      translation: 'Tradução (i18n)',
      notifications: 'Pop-up',
      toast: 'Notificações',
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
      translation: {
        title: 'Tradução (i18n)',
        subtitle: 'Integração de internacionalização no Atlas UI com Transloco + contribuições por app.',
        installTitle: 'Instalação',
        installDesc: 'Instale o Transloco no workspace (o Atlas usa o runtime do Transloco).',
        setupTitle: 'Configuração',
        setupDesc: 'Configure o provider do Atlas e injete traduções do sandbox via contributions.',
        usageTitle: 'Uso',
        usageDesc: 'Use o pipe no template e as variantes *Key no TypeScript (toasts, actions, etc.).',
      }
    },
  },
};
