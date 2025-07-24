# Vue Document Picture-in-Picture

A Vue 3 component library for creating Picture-in-Picture windows using the Document Picture-in-Picture API.

![Vue PIP Demo](./demo.gif)

## Browser Support

- This feature may not work in some browsers. Browser compatibility can be checked at [CanIUse](https://caniuse.com/mdn-api_documentpictureinpicture).

- This feature is only available in [Secure Contexts](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts) (HTTPS or localhost).

## Installation

```bash
npm install vue-pip
```

## Usage

### Basic Example

```vue
<template>
  <DocumentPip
    :isPipOpen="isPipOpen"
    :size="{ width: 500, height: 400 }"
    @onClose="handleClose"
  >
    <MyComponent />
  </DocumentPip>
</template>

<script setup lang="ts">
import { DocumentPIP } from "vue-pip";

const isPipOpen = ref(false);

const togglePip = () => {
  isPipOpen.value = !isPipOpen.value;
};

const handleClose = () => {
  isPipOpen.value = false;
};
</script>
```

### With Tailwind CSS

```vue
<template>
  <DocumentPip
    mode="copy"
    :isPipOpen="isPipOpen"
    :size="{ width: 500, height: 400 }"
    :copyAllStyles="false"
    :cdnScripts="cdnScripts"
    @onClose="handleClose"
  >
    <MyComponent />
  </DocumentPip>
</template>

<script setup lang="ts">
import { DocumentPIP } from "vue-pip";

const isPipOpen = ref(false);

const cdnScripts = ["https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"];

const togglePip = () => {
  isPipOpen.value = !isPipOpen.value;
};

const handleClose = () => {
  isPipOpen.value = false;
};
</script>
```

## API Reference

### DocumentPIP Props

| Prop                           | Type                     | Default      | Description                                                                      |
| ------------------------------ | ------------------------ | ------------ | -------------------------------------------------------------------------------- |
| `isPipOpen`                    | `boolean`                | -            | Controls whether the PIP window is open                                          |
| `size`                         | `Partial<PIPWindowSize>` | -            | Size of the PIP window                                                           |
| `mode`                         | `'clone' \| 'transfer'`  | `'transfer'` | Content display mode<br>`clone`: keep original + copy<br>`transfer`: move to PIP |
| `copyAllStyles`                | `boolean`                | `true`       | Whether to copy all styles to PIP window                                         |
| `cdnScripts`                   | `string[]`               | -            | Array of CDN script URLs to load in PIP window                                   |
| `disallowReturnToOpener`       | `boolean`                | `false`      | Whether to disallow returning to the opener window                               |
| `preferInitialWindowPlacement` | `boolean`                | `false`      | Whether to prefer initial window placement                                       |

### DocumentPIP Events

| Event     | Description                           |
| --------- | ------------------------------------- |
| `onClose` | Emitted when the PIP window is closed |

### Types

```typescript
interface PIPWindowSize {
  width: number;
  height: number;
}

type Mode = "clone" | "transfer";
```

## Browser Support

This library uses the [Document Picture-in-Picture API](https://developer.chrome.com/docs/web-platform/document-picture-in-picture/), which is currently supported in:

- Chrome 116+
- Edge 116+
- Opera 102+

## License

MIT
