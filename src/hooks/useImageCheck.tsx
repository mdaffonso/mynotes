export const useImageCheck = (url: string, timeoutT: number) => {
  return new Promise((resolve) => {
      const timeout = timeoutT || 5000;
      const img = new Image();
      let timer: ReturnType<typeof setTimeout>
      img.onerror = img.onabort = () => {
          clearTimeout(timer);
          resolve("error");
      };
      img.onload = () => {
          clearTimeout(timer);
          resolve("success");
      };
      timer = setTimeout(() => {
          img.src = "//!!!!/test.jpg";
          resolve("timeout");
      }, timeout);
      img.src = url;
  });
}