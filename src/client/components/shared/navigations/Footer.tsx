import { useCopyright } from "@/client/components/hooks/use-copyright";

export const Footer = () => {
  const { copyrightMessage, poweredBy } = useCopyright();
  return (
    <footer className="footer">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center py-4">
          <p className="text-sm body-medium text-light-3">{poweredBy}</p>
          <p className="text-sm body-medium text-light-3">{copyrightMessage}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
