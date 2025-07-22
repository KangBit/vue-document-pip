# Vue Document Picture-in-Picture

A Vue 3 component library for creating Picture-in-Picture windows using the Document Picture-in-Picture API.

![Vue PIP Demo](./demo.gif)

## Installation

```bash
npm install vue-pip
```

## Usage

### Basic Example

```vue
<template>
  <DocumentPIP
    :isPipOpen="isPipOpen"
    :size="{ width: 500, height: 400 }"
    @onClose="handleClose"
  >
    <PIPContent />
  </DocumentPIP>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { DocumentPIP, PIPContent } from "vue-pip";

const isPipOpen = ref(false);

const handleClose = () => {
  isPipOpen.value = false;
};
</script>
```

### With Tailwind CSS

```vue
<template>
  <DocumentPIP
    mode="copy"
    :isPipOpen="isPipOpen"
    :size="{ width: 500, height: 400 }"
    :copyAllStyles="false"
    :cdnScripts="cdnScripts"
    @onClose="handleClose"
  >
    <div class="bg-blue-500 text-white p-4 rounded-lg">
      <h2 class="text-xl font-bold">Tailwind CSS in PIP</h2>
      <p class="mt-2">This content uses Tailwind CSS classes!</p>
    </div>
  </DocumentPIP>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { DocumentPIP } from "vue-pip";

const isPipOpen = ref(false);

const cdnScripts = ["https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"];

const handleClose = () => {
  isPipOpen.value = false;
};
</script>
```

## API Reference

### DocumentPIP Props

| Prop            | Type                     | Default      | Description                                                                      |
| --------------- | ------------------------ | ------------ | -------------------------------------------------------------------------------- |
| `isPipOpen`     | `boolean`                | -            | Controls whether the PIP window is open                                          |
| `size`          | `Partial<PIPWindowSize>` | -            | Size of the PIP window                                                           |
| `mode`          | `'clone' \| 'transfer'`  | `'transfer'` | Content display mode<br>`clone`: keep original + copy<br>`transfer`: move to PIP |
| `copyAllStyles` | `boolean`                | `true`       | Whether to copy all styles to PIP window                                         |
| `cdnScripts`    | `string[]`               | -            | Array of CDN script URLs to load in PIP window                                   |

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
