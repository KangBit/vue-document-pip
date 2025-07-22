# Vue Document Picture-in-Picture

Document Picture-in-Picture API를 사용하여 Picture-in-Picture 창을 생성하는 Vue 3 컴포넌트 라이브러리입니다.

![Vue PIP Demo](./demo.gif)

## 설치

```bash
npm install vue-pip
```

## 사용법

### 예제

```vue
<template>
  <DocumentPIP
    :isPipOpen="isPipOpen"
    :size="{ width: 500, height: 400 }"
    mode="transfer"
    :copyAllStyles="true"
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

## API 참조

### DocumentPIP Props

| Prop            | Type                     | 기본값       | 설명                                                                    |
| --------------- | ------------------------ | ------------ | ----------------------------------------------------------------------- |
| `isPipOpen`     | `boolean`                | -            | PIP 창이 열려있는지 제어                                                |
| `size`          | `Partial<PIPWindowSize>` | -            | PIP 창의 크기                                                           |
| `mode`          | `'clone' \| 'transfer'`  | `'transfer'` | 콘텐츠 표시 모드<br>`clone`: 원본 유지 + 복사<br>`transfer`: PIP로 이동 |
| `copyAllStyles` | `boolean`                | `true`       | 모든 스타일을 PIP 창에 복사할지 여부                                    |

### DocumentPIP Events

| Event     | 설명                  |
| --------- | --------------------- |
| `onClose` | PIP 창이 닫힐 때 발생 |

### Types

```typescript
interface PIPWindowSize {
  width: number;
  height: number;
}

type Mode = "clone" | "transfer";
```

## 브라우저 지원

이 라이브러리는 [Document Picture-in-Picture API](https://developer.chrome.com/docs/web-platform/document-picture-in-picture/)를 사용하며, 현재 다음 브라우저에서 지원됩니다:

- Chrome 116+
- Edge 116+
- Opera 102+

## 라이선스

MIT
