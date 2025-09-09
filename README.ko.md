# Vue Document Picture-in-Picture

Document Picture-in-Picture API를 사용하여 Picture-in-Picture 창을 생성하는 Vue 3 컴포넌트 라이브러리입니다.

![Vue PIP Demo](./demo.gif)

## 브라우저 지원

- 일부 브라우저에서 동작하지 않을 수 있습니다. 브라우저 호환성은 [CanIUse](https://caniuse.com/mdn-api_documentpictureinpicture)에서 확인할 수 있습니다.
- [Secure_Contexts](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts)에서만 사용할 수 있습니다 (HTTPS 또는 localhost).

## 설치

```bash
npm install vue-pip
```

## 사용법

### 기본 예제

```vue
<template>
  <DocumentPip
    :isPipOpen="isPipOpen"
    :size="{ width: 500, height: 400 }"
    mode="transfer"
    :copyAllStyles="true"
    @onClose="handleClose"
  >
    <MyComponent />
  </DocumentPip>
</template>

<script setup lang="ts">
import DocumentPIP from "vue-pip";

const isPipOpen = ref(false);

const togglePip = () => {
  isPipOpen.value = !isPipOpen.value;
};

const handleClose = () => {
  isPipOpen.value = false;
};
</script>
```

### Tailwind CSS 사용 예제

```vue
<template>
  <DocumentPip
    :isPipOpen="isPipOpen"
    :size="{ width: 500, height: 400 }"
    mode="transfer"
    :copyAllStyles="false"
    :cdnScripts="cdnScripts"
    @onClose="handleClose"
  >
    <MyComponent />
  </DocumentPip>
</template>

<script setup lang="ts">
import DocumentPip from "vue-pip";

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

## API 참조

### DocumentPIP Props

| Prop                           | Type                                       | 기본값       | 설명                                                                                                     |
| ------------------------------ | ------------------------------------------ | ------------ | -------------------------------------------------------------------------------------------------------- |
| `isPipOpen`                    | `boolean`                                  | -            | PIP 창이 열려있는지 제어                                                                                 |
| `size`                         | `Partial<PIPWindowSize>`                   | -            | PIP 창의 크기                                                                                            |
| `mode`                         | `'clone' \| 'transfer' \| 'transfer-only'` | `'transfer'` | 콘텐츠 표시 모드<br>`clone`: 원본 유지 + 복사<br>`transfer`: PIP로 이동<br>`transfer-only`: PIP로 이동만 |
| `copyAllStyles`                | `boolean`                                  | `true`       | 모든 스타일을 PIP 창에 복사할지 여부                                                                     |
| `cdnScripts`                   | `string[]`                                 | -            | PIP 창에 로드할 CDN 스크립트 URL 배열                                                                    |
| `disallowReturnToOpener`       | `boolean`                                  | `false`      | 원본 창으로 돌아가는 버튼 숨기기                                                                         |
| `preferInitialWindowPlacement` | `boolean`                                  | `false`      | 항상 초기 위치에 설정 크기로 열림 (Chrome 130+)                                                          |

### DocumentPIP Events

| Event     | 설명                  |
| --------- | --------------------- |
| `onClose` | PIP 창이 닫힐 때 발생 |
| `onEnter` | PIP 창이 열릴 때 발생 |

### Types

```typescript
interface PIPWindowSize {
  width: number;
  height: number;
}

type Mode = "clone" | "transfer" | "transfer-only";
```

## 브라우저 지원

이 라이브러리는 [Document Picture-in-Picture API](https://developer.chrome.com/docs/web-platform/document-picture-in-picture/)를 사용하며, 현재 다음 브라우저에서 지원됩니다:

- Chrome 116+
- Edge 116+
- Opera 102+

## 라이선스

MIT
