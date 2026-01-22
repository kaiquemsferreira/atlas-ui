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
        search: 'Pesquisar documentação',
      },
      toast: {
        title: 'Notificações',
        subtitle:
          'Notificações temporárias para feedback de ações do usuário. Suporta variantes, ações, detalhes expansíveis e posições.',
        resume:
          'Use os botões acima para disparar diferentes tipos de toast. Passe o mouse para pausar a barra de duração.',
        description: 'Os métodos seguem o padrão:',
        pattern: 'info/success/warning/error/neutral(message, options).',
        info: 'Informação',
        infoMessage: 'Olá mundo!',
        success: 'Upload realizado com sucesso',
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
        cardContentMessage: 'Conteúdo do card',
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
      inputs: {
        title: 'Inputs',
        subtitle: 'Campos de texto com label, ícone e variações de comportamento.',
        examplesDesc: 'Exemplos de composição do Atlas Form Field e Atlas Input.',
        apiDesc: 'API e exemplos de uso.',
        actions: {
          toggleDisabled: 'Alternar disabled',
          toggleInvalid: 'Alternar invalid',
        },
        examples: {
          basic: 'Básico',
          prefixIcon: 'Ícone à esquerda + divisor',
          floatLabel: 'Label flutuante',
          floatLabelIcon: 'Label flutuante + ícone',
          disabled: 'Disabled',
          invalid: 'Invalid (preview)',
          hintText: 'Usaremos seu email apenas para login e recuperação de conta.',
        },
        fields: {
          email: 'Email',
          search: 'Buscar',
          name: 'Nome',
          company: 'Empresa',
          disabled: 'Desabilitado',
          password: 'Senha',
          selectOption: 'Selecionar opção',
          selectOptionWithFilter: 'Selecionar opção com filtro',
          multiSelect: 'Multi seleção',
          multiSelectWithIcon: 'Multi seleção com ícone',
        },
        hints: {
          floatLabel: 'A label vira placeholder e sobe ao focar ou ao preencher.',
          invalid: 'Estado inválido será integrado ao Reactive Forms.',
        },
      },
      datePicker: {
        title: 'Date picker',
        subtitle: 'Seleção de data única ou intervalo com painel de calendário e ações de aplicar/cancelar.',
        examplesDesc: 'Exemplos do componente em modo single e range.',
        apiDesc: 'API e exemplos de uso.',
        examples: {
          single: 'Data (única)',
          range: 'Data (intervalo)',
        },
      },
      phoneInput: {
        title: 'Telefone',
        subtitle: 'Input de telefone com seleção de país, DDI, bandeira e validação (via intl-tel-input).',
        examplesDesc: 'Exemplos de uso do input de telefone com detecção de país por locale do navegador.',
        examples: {
          basic: 'Básico',
          withHint: 'Formato do valor',
        },
        hints: {
          valueShape: 'O valor é um objeto (E.164, nacional, internacional, iso2, dialCode e validade).',
        },
      },
      fileUpload: {
        title: 'Upload de arquivo',
        subtitle: 'Upload com dropzone, modo compacto e envio por URL. Suporta lista com progresso e ações.',
        examplesDesc: 'Exemplos de combinações entre layout e seletor, com formatos aceitos dinâmicos.',
        apiDesc: 'API e exemplos de uso.',
        helper: 'Arraste e solte ou selecione arquivos para enviar.',
        actions: {
          toggleUploading: 'Alternar carregamento',
        },
        examples: {
          inlineDropzone: 'Inline · Dropzone',
          inlineCompact: 'Inline · Compact',
          dialogDropzoneUrl: 'Dialog · Dropzone + URL',
          dialogCompactUrl: 'Dialog · Compact + URL',
        },
        dialog: {
          title: 'Upload de arquivos',
          primary: 'Enviar arquivos',
          cancel: 'Cancelar',
        },
        errors: {
          failed: 'Falha ao enviar. Tente novamente.',
        }
      },
      translation: {
        title: 'Tradução (i18n)',
        subtitle: 'Integração de internacionalização no Atlas UI com Transloco + contribuições por app.',
        installTitle: 'Instalação',
        installDesc: 'Instale o Transloco no workspace (o Atlas usa o runtime do Transloco).',
        setupTitle: 'Configuração',
        setupDesc: 'Configure o provider do Atlas e injete traduções do sandbox via contributions.',
        usageDesc: 'Use o pipe no template e as variantes *Key no TypeScript (toasts, actions, etc.).',
      },
      skeleton: {
        title: 'Skeleton',
        subtitle: 'Placeholders para estados de carregamento (wave/pulse/static) com composição flexível.',
        examplesDesc: 'Exemplos do atlas-skeleton em variantes e composições comuns.',
        apiDesc: 'API e exemplos de uso.',
        actions: {
          wave: 'Wave',
          pulse: 'Pulse',
          static: 'Static',
        },
        examples: {
          rect: 'Retângulos',
          text: 'Texto (linhas)',
          circle: 'Círculo (avatar)',
          card: 'Composição (card)',
        },
      }
    }
  }
} as const;
