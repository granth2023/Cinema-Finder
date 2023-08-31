// utils/loadScript.ts

export const loadScript = (src: string, id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (document.getElementById(id)) {
        resolve();
        return;
      }
  
      const script = document.createElement('script');
      script.src = src;
      script.id = id;
      script.onload = () => resolve();
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };
  