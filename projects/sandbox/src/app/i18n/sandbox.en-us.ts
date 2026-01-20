export const SANDBOX_EN_US = {
  sandbox: {
    nav: {
      home: 'Home',
      getStarted: 'Get Started',
      installation: 'Installation',
      usage: 'How to Use',
      components: 'Components',
      services: 'Services',
      translation: 'Translation (i18n)',
      notifications: 'Pop-up',
      updates: 'Updates',
    },
    pages: {
      shell: {
        search: 'Search documentation'
      },
      toast: {
        title: 'Notifications',
        subtitle: 'Temporary notifications to provide feedback on user actions. Supports variants, actions, expandable details, and positions.',
        resume: 'Use the buttons above to trigger different toast types. Hover to pause the duration bar.',
        description: 'Methods follow the pattern:',
        pattern: 'info/success/warning/error/neutral(message, options).',
        info: 'Information',
        infoMessage: 'Hello world!',
        success: 'Upload completed successfully',
        successMessage: 'File uploaded successfully!',
        successDetails: 'invoice.pdf was uploaded and indexed. You can undo within 30s.',
      },
      cards: {
        title: 'Cards',
        subtitle: 'Displays in static or animated card formats for page styling.',
        resume: 'Use cards to highlight information, separate sections, and present related actions.',
        overviewTitle: 'Overview',
        usageTitle: 'Basic Usage',
        usageDesc: 'Create cards with optional header, body, and footer.',
        variantsTitle: 'Variants',
        variantsDesc: 'Atlas Card supports different visual styles.',
        a11yTitle: 'Accessibility',
        a11yDesc: 'When interactive, the card exposes role and tabindex.',
        description: 'Container component to group content.',
        cardContentMessage: 'Card content'
      },
      buttons: {
        title: 'Buttons',
        subtitle: 'Variants, colors, sizes, and states of the Atlas Button',
        examplesDesc: 'Examples of button usage in different compositions.',
        apiDesc: 'API and usage examples.',
        hints: {
          loading: 'Tip: loading keeps the button width to prevent layout “jumps”.',
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
          grouped: 'Grouped buttons',
          fullWidth: 'Full width',
        },
      },
      inputs: {
        title: 'Inputs',
        subtitle: 'Text fields with label, icon, and behavior variations.',
        examplesDesc: 'Examples of Atlas Form Field and Atlas Input composition.',
        apiDesc: 'API and usage examples.',
        children: {
          text: 'Text',
          date: 'Date',
        },
        actions: {
          toggleDisabled: 'Toggle disabled',
          toggleInvalid: 'Toggle invalid'
        },
        examples: {
          basic: 'Basic',
          prefixIcon: 'Left icon + divider',
          floatLabel: 'Floating label',
          floatLabelIcon: 'Floating label + icon',
          disabled: 'Disabled',
          invalid: 'Invalid (preview)',
          hintText: 'We will use your email only for login and account recovery.'
        },
        fields: {
          email: 'Email',
          search: 'Search',
          name: 'Name',
          company: 'Company',
          disabled: 'Disabled',
          password: 'Password',
          selectOption: 'Select option',
          selectOptionWithFilter: 'Select option with filter',
          multiSelect: 'Multi select',
          multiSelectWithIcon: 'Multi select with icon'
        },
        hints: {
          floatLabel: 'The label becomes a placeholder and floats on focus or when filled.',
          invalid: 'Invalid state will be integrated with Reactive Forms.'
        }
      },
      translation: {
        title: 'Translation (i18n)',
        subtitle: 'Internationalization integration in Atlas UI with Transloco + app contributions.',
        installTitle: 'Installation',
        installDesc: 'Install Transloco in the workspace (Atlas uses Transloco runtime).',
        setupTitle: 'Setup',
        setupDesc: 'Configure the Atlas provider and inject sandbox translations via contributions.',
        usageDesc: 'Use the pipe in templates and the *Key variants in TypeScript (toasts, actions, etc.).',
      }
    },
  }
};
