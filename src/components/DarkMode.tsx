import "../css/DarkMode.css";
import { userConfigurationAdd } from "../Context/UserConfiguration";
import { UserProfile } from "../models/User";
import { useAuth } from "../Context/useAuth";

//Type  have the event that changed the theme and the user to save his id inside our cache
type DarkModeProps = {
  toggleTheme: (selectedTheme: string) => void;
  user: UserProfile;
};

const DarkMode: React.FC<DarkModeProps> = ({ toggleTheme, user }) => {
  const { Configuration, updateConfiguration } = useAuth();
  let clickedClass = "clicked";
  const lighTheme = "light";
  const darkTheme = "dark";
  let theme = Configuration.theme;

  //Method that calling an API change the value of the cache from Azurite
  const switchTheme = async () => {
    if (theme === darkTheme) {
      await userConfigurationAdd("light", user.id);
      theme = lighTheme;
    } else {
      await userConfigurationAdd("dark", user.id);
      theme = darkTheme;
    }
    updateConfiguration({ theme: theme, idUser: user.id });
    toggleTheme(theme);
  };

  return (
    <button
      className={theme === "dark" ? clickedClass : ""}
      id = "darkMode"
      onClick={() => switchTheme()}
    ></button>
  );
};

export default DarkMode;
