export const SANDBOX_EN_US = {
  sandbox: {
    nav: {
      home: 'Home',
      getStarted: 'Get started',
      installation: 'Installation',
      usage: 'Usage',
      components: 'Components',
      services: 'Services',
      translation: 'Translation (i18n)',
      notifications: 'Pop-up',
      updates: 'Updates',
    },
    pages: {
      shell: {
        search: 'Search documentation',
      },
      toast: {
        title: 'Notifications',
        subtitle:
          'Temporary notifications for user feedback. Supports variants, actions, expandable details, and positions.',
        resume:
          'Use the buttons above to trigger different toast types. Hover to pause the duration bar.',
        description: 'Methods follow the pattern:',
        pattern: 'info/success/warning/error/neutral(message, options).',
        info: 'Info',
        infoMessage: 'Hello world!',
        success: 'Upload completed successfully',
        successMessage: 'File uploaded successfully!',
        successDetails: 'invoice.pdf was uploaded and indexed. You can undo within 30s.',
      },
      cards: {
        title: 'Cards',
        subtitle: 'Static or animated card layouts for page styling.',
        resume: 'Use cards to highlight information, separate sections, and present related actions.',
        overviewTitle: 'Overview',
        usageTitle: 'Basic usage',
        usageDesc: 'Create cards with optional header, body, and footer.',
        variantsTitle: 'Variants',
        variantsDesc: 'Atlas Card supports different visual styles.',
        a11yTitle: 'Accessibility',
        a11yDesc: 'When interactive, the card exposes role and tabindex.',
        description: 'Container component to group content.',
        cardContentMessage: 'Card content',
      },
      buttons: {
        title: 'Buttons',
        subtitle: 'Variants, colors, sizes, and states of Atlas Button',
        examplesDesc: 'Examples of using the button in different compositions.',
        apiDesc: 'API and usage examples.',
        hints: {
          loading: 'Tip: loading keeps the button width to avoid layout jumps.',
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
        }
      },
      inputs: {
        title: 'Inputs',
        subtitle: 'Text fields with label, icon, and behavior variations.',
        examplesDesc: 'Examples of composing Atlas Form Field and Atlas Input.',
        apiDesc: 'API and usage examples.',
        actions: {
          toggleDisabled: 'Toggle disabled',
          toggleInvalid: 'Toggle invalid',
        },
        examples: {
          basic: 'Basic',
          prefixIcon: 'Left icon + divider',
          floatLabel: 'Floating label',
          floatLabelIcon: 'Floating label + icon',
          disabled: 'Disabled',
          invalid: 'Invalid (preview)',
          hintText: 'We will use your email only for login and account recovery.',
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
          multiSelectWithIcon: 'Multi select with icon',
        },
        hints: {
          floatLabel: 'The label becomes a placeholder and floats on focus or when filled.',
          invalid: 'Invalid state will be integrated with Reactive Forms.',
        }
      },
      datePicker: {
        title: 'Date picker',
        subtitle: 'Single date or range selection with calendar panel and apply/cancel actions.',
        examplesDesc: 'Examples for single and range modes.',
        apiDesc: 'API and usage examples.',
        examples: {
          single: 'Date (single)',
          range: 'Date (range)',
        }
      },
      phoneInput: {
        title: 'Phone',
        subtitle: 'Phone input with country selector, dial code, flag, and validation (via intl-tel-input).',
        examplesDesc: 'Examples using browser locale-based country detection.',
        examples: {
          basic: 'Basic',
          withHint: 'Value format',
        },
        hints: {
          valueShape: 'The value is an object (E.164, national, international, iso2, dialCode, and validity).',
        },
      },
      fileUpload: {
        title: 'File upload',
        subtitle: 'Upload with dropzone, compact mode, and URL submission. Supports list with progress and actions.',
        examplesDesc: 'Examples combining layout and selector, with dynamic accepted formats.',
        apiDesc: 'API and usage examples.',
        helper: 'Drag & drop or browse files to upload.',
        actions: {
          toggleUploading: 'Toggle uploading',
        },
        examples: {
          inlineDropzone: 'Inline · Dropzone',
          inlineCompact: 'Inline · Compact',
          dialogDropzoneUrl: 'Dialog · Dropzone + URL',
          dialogCompactUrl: 'Dialog · Compact + URL',
        },
        dialog: {
          title: 'Upload files',
          primary: 'Upload files',
          cancel: 'Cancel',
        },
        errors: {
          failed: 'Upload failed. Please try again.',
        },
      },
      translation: {
        title: 'Translation (i18n)',
        subtitle: 'Internationalization in Atlas UI with Transloco + app contributions.',
        installTitle: 'Installation',
        installDesc: 'Install Transloco in the workspace (Atlas uses Transloco runtime).',
        setupTitle: 'Setup',
        setupDesc: 'Configure the Atlas provider and inject sandbox translations via contributions.',
        usageDesc: 'Use the pipe in templates and the *Key variants in TypeScript (toasts, actions, etc.).',
      },
    },
    skeleton: {
      title: 'Skeleton',
      subtitle: 'Placeholders for loading states (wave/pulse/static) with flexible composition.',
      examplesDesc: 'Examples of atlas-skeleton in common variants and compositions.',
      apiDesc: 'API and usage examples.',
      actions: {
        wave: 'Wave',
        pulse: 'Pulse',
        static: 'Static',
      },
      examples: {
        rect: 'Rectangles',
        text: 'Text (lines)',
        circle: 'Circle (avatar)',
        card: 'Composition (card)',
      },
    },
    overlay: {
      title: 'Overlay',
      subtitle: 'Infrastructure for floating content: tooltip, popover, and menu. Built on AtlasOverlayService.',
      examplesDesc: 'Examples using overlay consumers.',
      apiDesc: 'Components and patterns exposed by atlas-ui-overlay.',
      examples: {
        tooltip: {
          title: 'Tooltip',
          label: 'Hover or focus the icon',
          aria: 'Help',
          content: 'This is a tooltip (non-interactive).',
        },
        popover: {
          title: 'Popover',
          label: 'Click to open interactive content',
          aria: 'Open popover',
          contentTitle: 'Tips',
          contentBody: 'Use filters and actions inside the popover.',
          actionPrimary: 'Apply',
          actionSecondary: 'Cancel',
        },
        menu: {
          title: 'Menu',
          trigger: 'Open menu',
          hint: 'Keyboard support (↑ ↓, Enter, Esc) and disabled items.',
          items: {
            search: 'Search',
            filters: 'Advanced filters',
            removeDisabled: 'Remove (disabled)',
          },
        },
      },
    }
  }
} as const;
