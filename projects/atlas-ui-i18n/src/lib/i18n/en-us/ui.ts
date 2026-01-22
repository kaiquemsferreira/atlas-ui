export const ATLAS_UI_EN_US = {
  common: {
    ui: {
      or: 'or',
      examples: 'Examples',
      components: 'Components',
      details: 'Details',
      preview: 'Preview',
      code: 'Code',
      copyCode: 'Copy code',
      copied: 'Copied',
      noResults: 'No results',
      documents: 'Documents',
    },
    actions: {
      confirm: 'Confirm',
      apply: 'Apply',
      cancel: 'Cancel',
      clear: 'Clear',
      remove: 'Remove',
      retry: 'Retry',
      undo: 'Undo',
      next: 'Next',
      export: 'Export',
      create: 'Create',
      save: 'Save',
      selectOptions: 'Select options',
      selectDate: 'Select date',
    },
    status: {
      loading: 'Loading',
      disabled: 'Disabled',
    },
    selection: {
      selected: 'Selected',
    },
    placeholders: {
      phone: 'Enter a phone number',
    },
    formats: {
      html: 'HTML',
      ts: 'TypeScript',
    }
  },
  components: {
    toast: {
      actions: {
        more: 'More',
        less: 'Less',
        close: 'Close',
      },
      variants: {
        info: 'Info',
        success: 'Success',
        warning: 'Warning',
        error: 'Error',
        neutral: 'Neutral',
      },
    },

    upload: {
      browse: 'Browse',
      accepts: '(accepts: {{formats}})',
      dropzone: {
        title: 'Drop files here or click to browse',
        formatsWithSize: '{{formats}} formats, up to {{size}}MB',
        formats: '{{formats}} formats',
      },
      compact: {
        label: 'Files',
      },
      url: {
        label: 'Upload file via URL',
        placeholder: 'Enter the file URL',
        action: 'Upload',
      },
    },
  }
} as const;
