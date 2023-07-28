import { ShopDbProvider } from "./ShopDbProvider";

const DbProvider = ({ children }) => {
  return (
    <>
      <ShopDbProvider>{children}</ShopDbProvider>
    </>
  );
}

export {DbProvider}