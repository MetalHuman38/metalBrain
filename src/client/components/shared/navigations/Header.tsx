// ** This is a Header component but only available to Admin Dashboard ** //
import { HeaderProps } from "@/client/types";

const Header = ({ title }: HeaderProps) => {
  return (
    <header className="bg-sky-900 bg-opacity-20 backdrop-blur-md shadow-lg border-b border-gray-700">
      <div className="flex-1 max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <h1 className="h4-bold md:h3-bold text-gray-100 space-y-4 w-full">
          {title}
        </h1>
      </div>
    </header>
  );
};

export default Header;
