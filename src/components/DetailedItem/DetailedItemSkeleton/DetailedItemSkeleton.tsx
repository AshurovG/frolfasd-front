import React from "react"
import ContentLoader from "react-content-loader"

type DetailedItemSkeletonProps = {
  className?: string
}

const DetailedItemSkeleton: React.FC<DetailedItemSkeletonProps> = ({
  className,
}) => (
  <ContentLoader
    speed={2}
    // width={width}
    // height={height}
    viewBox="0 0 1000 600"
    backgroundColor="#bdbdbd"
    foregroundColor="#ecebeb"
    className={className}
  >
    <rect x="2" y="1" rx="30" ry="30" width="1000" height="600" />
  </ContentLoader>
)

export default DetailedItemSkeleton
