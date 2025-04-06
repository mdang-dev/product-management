import Skeleton from "react-loading-skeleton";
export default function ProductCardSkeleton () {
    return (
        <div className="product-card">
          <Skeleton height={200} />
          <div className="product-card__content">
            <Skeleton height={20} width="70%" />
            <Skeleton height={40} width="90%" />
            <div className="product-card__details">
              <Skeleton height={16} width="50%" />
            </div>
            <div className="product-card__footer">
              <Skeleton height={18} width="40%" />
              <Skeleton height={34} width={100} />
            </div>
            <Skeleton height={14} width="60%" />
          </div>
        </div>
      );

}