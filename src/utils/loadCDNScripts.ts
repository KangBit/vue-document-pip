/**
 * Load CDN scripts into a target window
 * @param targetWindow - The window to load scripts into
 * @param scriptUrls - Array of CDN script URLs to load
 */
export const loadCDNScripts = async (
  targetWindow: Window,
  scriptUrls: string[]
) => {
  const loadScript = (url: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const script = targetWindow.document.createElement("script");
      script.src = url;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${url}`));
      targetWindow.document.head.appendChild(script);
    });
  };

  try {
    await Promise.all(scriptUrls.map(loadScript));
  } catch (error) {
    console.warn("Error loading CDN scripts:", error);
  }
};
