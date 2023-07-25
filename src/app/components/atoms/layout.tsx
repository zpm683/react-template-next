type BaseLayoutProps = {} & React.PropsWithChildren;

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        {children}
      </div>
    </div>
  );
};

export { BaseLayout };
