import ContentLoader from "react-content-loader";

const Skeleton: React.FC = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={480}
    className="product-block"
    viewBox="0 0 280 480"
    backgroundColor="#313131"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="266" rx="3" ry="3" width="280" height="28" />
    <circle cx="140" cy="130" r="130" />
    <rect x="0" y="314" rx="10" ry="10" width="280" height="86" />
    <rect x="4" y="430" rx="0" ry="0" width="90" height="28" />
    <rect x="120" y="422" rx="30" ry="30" width="160" height="46" />
  </ContentLoader>
);

export default Skeleton;
