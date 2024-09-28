import { useState, useEffect } from "react";

export const useCopyright = () => {
  const [year, setYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    setYear(currentYear);
  }, []);

  const copyrightMessage = `© ${year} MetalBrain Inc. All rights reserved.`;
  const poweredBy = "Powered by MetalBrain Inc.";

  return { year, copyrightMessage, poweredBy };
};

export default useCopyright;
