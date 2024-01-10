import { faLightbulb, faMoon } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Hyperlink } from "./../hyperlink/hyperlink";

export function Footer(props: {
  label: string;
  link: string;
  darkTheme: boolean;
  toggleDarkTheme: () => void;
}) {
  const getFooterContent = () => {
    if (props.darkTheme) {
      return (
        <div className="block h-6 w-6 cursor-pointer rounded-md border border-gray-100 bg-white text-gray-900">
          <FontAwesomeIcon
            icon={faLightbulb}
            aria-hidden={true}
            fixedWidth={true}
            onClick={() => props.toggleDarkTheme()}
          />
        </div>
      );
    } else
      return (
        <div className="block h-6 w-6 cursor-pointer rounded-md border border-gray-700 bg-slate-700 text-white">
          <FontAwesomeIcon
            icon={faMoon}
            aria-hidden={true}
            fixedWidth={true}
            onClick={() => props.toggleDarkTheme()}
          />
        </div>
      );
  };

  return (
    <footer className="mx-auto max-w-4xl bg-gray-50 p-2 sm:fixed sm:bottom-0 sm:left-0 sm:right-0 sm:h-10 dark:bg-gray-800">
      <div className="flex">
        {getFooterContent()}
        <div className="flex-1 text-end">
          <Hyperlink
            title={props.label}
            href={props.link}
          />
        </div>
      </div>
    </footer>
  );
}
