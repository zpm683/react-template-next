import { FC } from "react";

import logo from "app/assets/img/logo.png";
import { BaseLayout, Image, PrimaryButton } from "app/components";

/**
 * Home
 */
const Home: FC = () => {
  return (
    <BaseLayout>
      <Image src={logo} />
      <div>
        <h1 className="text-6xl font-bold">Hello World!</h1>
        <p className="py-6">This is a demo used react-template-next!!</p>
        <PrimaryButton>Get Started</PrimaryButton>
      </div>
    </BaseLayout>
  );
};

export { Home };
