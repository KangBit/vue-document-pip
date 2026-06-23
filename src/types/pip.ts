export type PIPMode = "clone" | "transfer" | "transfer-only";
export type PIPWindowSize = { width: number; height: number };

// Document Picture-in-Picture "enter" event. Not part of TypeScript's bundled
// lib.dom typings yet, so it is declared here as part of the public API.
export interface DocumentPictureInPictureEvent extends Event {
  window: Window;
}

export type DocumentPIPProps = {
  size?: Partial<PIPWindowSize>;
  mode?: PIPMode;
  copyAllStyles?: boolean;
  isPipOpen: boolean;
  cdnScripts?: string[];
  disallowReturnToOpener?: boolean; // '탭으로 돌아가기' 버튼 숨기기
  preferInitialWindowPlacement?: boolean; // 항상 초기 위치에 설정 크기로 열림 (Chrome 130+)
};

export type DocumentPIPEmits = {
  (e: "onClose"): void;
  (e: "update:isPipOpen", param: boolean): void;
  (e: "onEnter", param: DocumentPictureInPictureEvent): void;
};
