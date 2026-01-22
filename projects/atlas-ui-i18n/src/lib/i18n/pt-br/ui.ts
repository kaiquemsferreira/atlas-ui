export const ATLAS_UI_PT_BR = {
  common: {
    ui: {
      or: 'ou',
      examples: 'Exemplos',
      components: 'Componentes',
      details: 'Detalhes',
      preview: 'Prévia',
      code: 'Código',
      copyCode: 'Copiar código',
      copied: 'Copiado',
      noResults: 'Nenhum resultado',
      documents: 'Documentos',
    },
    actions: {
      confirm: 'Confirmar',
      apply: 'Aplicar',
      cancel: 'Cancelar',
      clear: 'Limpar',
      remove: 'Remover',
      retry: 'Tentar novamente',
      undo: 'Desfazer',
      next: 'Próximo',
      export: 'Exportar',
      create: 'Criar',
      save: 'Salvar',
      selectOptions: 'Selecionar opções',
      selectDate: 'Selecionar data',
    },
    status: {
      loading: 'Carregando',
      disabled: 'Desabilitado',
    },
    selection: {
      selected: 'Selecionados',
    },
    placeholders: {
      phone: 'Digite um telefone',
    },
    formats: {
      html: 'HTML',
      ts: 'TypeScript',
    },
  },
  components: {
    toast: {
      actions: {
        more: 'Mais',
        less: 'Menos',
        close: 'Fechar',
      },
      variants: {
        info: 'Informação',
        success: 'Sucesso',
        warning: 'Aviso',
        error: 'Erro',
        neutral: 'Neutro',
      },
    },

    upload: {
      browse: 'Procurar',
      accepts: '(aceita: {{formats}})',
      dropzone: {
        title: 'Solte arquivos aqui ou clique para selecionar',
        formatsWithSize: 'Formatos {{formats}}, até {{size}}MB',
        formats: 'Formatos {{formats}}',
      },
      compact: {
        label: 'Arquivos',
      },
      url: {
        label: 'Enviar arquivo por URL',
        placeholder: 'Digite a URL do arquivo',
        action: 'Enviar',
      },
    },
  },
} as const;
