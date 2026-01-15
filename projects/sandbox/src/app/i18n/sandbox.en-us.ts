export const SANDBOX_EN_US = {
  sandbox: {
    nav: {
      home: 'Home',
      getStarted: 'Start',
      installation: 'Installation',
      usage: 'Usage',
      components: 'Components',
      services: 'Services',
      translation: 'Translation (i18n)',
      notifications: 'Notifications',
      toast: 'Toast',
      updates: 'Updates',
    },
    pages: {
      shell: {
        search: 'Search docs'
      },
      toast: {
        title: 'Notifications',
        subtitle: 'Temporary notifications for user feedback. Supports variants, actions, expandable details and positions.',
        resume: 'Use the buttons above to trigger different toast types. Hover to pause the duration bar.',
        description: 'Methods follow the pattern:',
        pattern: 'info/success/warning/error/neutral(message, options).',
        info:'Information',
        infoMessage: 'Hello world!',
        success:'Upload successful',
        successMessage: 'File sent successfully!',
        successDetails: 'The invoice.pdf file has been sent and indexed. You can undo it within 30 seconds.',
      },
      cards: {
        title: 'Cards',
        subtitle: 'Displays in static or animated card formats for page styling.',
        resume: 'Use cards to highlight information, separate sections, and present related actions in the footer.',
        description: 'Container component for grouping content with optional header/footer, visual variants, and interactive mode (tabindex/role).',
        cardContentMessage: 'Card content'
      },
      buttons: {
        title: 'Buttons',
        subtitle: 'Variants, colors, sizes, and states for Atlas Button',
        examplesDesc: 'Usage examples in different compositions.',
        apiDesc: 'API and usage examples.',
        hints: {
          loading: 'Tip: loading preserves button width to avoid layout jumps.',
        },
        actions: {
          toggleTheme: 'Toggle theme',
          toggleLoading: 'Toggle loading',
        },
        examples: {
          textOnly: 'Text only',
          textIcon: 'Text + icon',
          iconText: 'Icon + text',
          iconOnly: 'Icon only',
          colors: 'Colors',
          gradient: 'Gradient',
          sizes: 'Sizes',
          states: 'States',
          grouped: 'Button group',
          fullWidth: 'Full width',
        },
      },
      translation: {
        title: 'Translation (i18n)',
        subtitle: 'Internationalization in Atlas UI using Transloco + per-app contributions.',
        installTitle: 'Install',
        installDesc: 'Install Transloco in the workspace (Atlas uses Transloco runtime).',
        setupTitle: 'Setup',
        setupDesc: 'Configure Atlas provider and inject sandbox translations via contributions.',
        usageDesc: 'Use the pipe in templates and the *Key variants in TypeScript (toasts, actions, etc.).',
      }
    },
  },
};
