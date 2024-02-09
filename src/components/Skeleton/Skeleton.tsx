import clsx from "clsx"
import ContentLoader from "react-content-loader"
import styles from "./Skeleton.module.scss"

type SkeletonProps = {
  className?: string
}

const Skeleton: React.FC<SkeletonProps> = ({ className }) => (
  <ContentLoader
    speed={2}
    // width={400}
    // height={358}
    viewBox="0 0 400 358"
    backgroundColor="#bdbdbd"
    foregroundColor="#ecebeb"
    className={clsx(styles.skeleton, className)}
  >
    <rect x="382" y="560" rx="10" ry="10" width="95" height="30" />
    <rect x="299" y="497" rx="0" ry="0" width="30" height="3" />
    <rect x="280" y="497" rx="0" ry="0" width="19" height="1" />
    <rect x="1" y="331" rx="0" ry="0" width="400" height="40" />
    <rect x="1" y="9" rx="0" ry="0" width="400" height="311" />
  </ContentLoader>
)

export default Skeleton
