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
      translation: {
        title: 'Translation (i18n)',
        subtitle: 'Internationalization in Atlas UI using Transloco + per-app contributions.',
        installTitle: 'Install',
        installDesc: 'Install Transloco in the workspace (Atlas uses Transloco runtime).',
        setupTitle: 'Setup',
        setupDesc: 'Configure Atlas provider and inject sandbox translations via contributions.',
        usageTitle: 'Usage',
        usageDesc: 'Use the pipe in templates and the *Key variants in TypeScript (toasts, actions, etc.).',
      }
    },
  },
};
